export type RankingEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
};

const getStorageKey = (difficulty: string) => `typing_game_ranking_${difficulty}`;

export function getRanking(difficulty: string): RankingEntry[] {
  try {
    const data = localStorage.getItem(getStorageKey(difficulty));
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load ranking:', e);
    return [];
  }
}

export function addRanking(name: string, score: number, difficulty: string): RankingEntry[] {
  const current = getRanking(difficulty);
  const newEntry: RankingEntry = {
    id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    name: name || 'ゲスト',
    score,
    date: new Date().toISOString(),
  };
  
  const updated = [...current, newEntry];
  // スコアの高い順にソートし、最大10件まで保存
  updated.sort((a, b) => b.score - a.score);
  const top10 = updated.slice(0, 10);
  
  try {
    localStorage.setItem(getStorageKey(difficulty), JSON.stringify(top10));
  } catch (e) {
    console.error('Failed to save ranking:', e);
  }
  
  return top10;
}

