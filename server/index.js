import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');
const RANKING_FILE = path.join(DATA_DIR, 'rankings.json');

app.use(cors());
app.use(express.json());

// データを初期化/読み込むユーティリティ
async function getRankingsData() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const data = await fs.readFile(RANKING_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // ファイルがない場合は初期構造を返す
      return {};
    }
    console.error('Failed to read rankings:', error);
    return {};
  }
}

async function saveRankingsData(data) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(RANKING_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Failed to save rankings:', error);
  }
}

// 難易度別のランキング取得API
app.get('/api/ranking/:difficulty', async (req, res) => {
  const { difficulty } = req.params;
  const allRankings = await getRankingsData();
  const difficultyRanking = allRankings[difficulty] || [];
  res.json(difficultyRanking);
});

// 新規スコアの登録API
app.post('/api/ranking/:difficulty', async (req, res) => {
  const { difficulty } = req.params;
  const { name, score } = req.body;

  if (typeof score !== 'number') {
    return res.status(400).json({ error: 'Score is required and must be a number' });
  }

  const allRankings = await getRankingsData();
  const currentRanking = allRankings[difficulty] || [];

  const newEntry = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: name || 'ゲスト',
    score,
    date: new Date().toISOString(),
  };

  currentRanking.push(newEntry);
  currentRanking.sort((a, b) => b.score - a.score);
  
  // 最大10件まで保持
  const top10 = currentRanking.slice(0, 10);
  allRankings[difficulty] = top10;

  await saveRankingsData(allRankings);

  res.json(top10);
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
