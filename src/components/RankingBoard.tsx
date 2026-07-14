import React, { useEffect, useState } from 'react';
import { getRanking, type RankingEntry } from '../lib/ranking';

type Props = {
  difficulty: string;
  targetName?: string;
  targetScore?: number;
};

export const RankingBoard: React.FC<Props> = ({ difficulty, targetName, targetScore }) => {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getRanking(difficulty).then(data => {
      if (mounted) {
        setRanking(data);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [difficulty]);

  if (loading) {
    return <div className="ranking-empty">読み込み中...</div>;
  }

  if (ranking.length === 0) {
    return <div className="ranking-empty">まだランキングデータがありません</div>;
  }

  // 登録したスコアがある場合はその順位の周辺を表示、それ以外はTop10
  const displayList = ranking.map((entry, index) => ({ entry, rank: index + 1 }));
  
  let targetIndex = -1;
  if (targetName && targetScore !== undefined) {
    // 同姓同名・同スコアの場合、最初に見つかったものを対象とする
    targetIndex = ranking.findIndex(e => e.name === targetName && e.score === targetScore);
  }

  const filteredList = targetIndex !== -1 
    ? displayList.slice(Math.max(0, targetIndex - 2), targetIndex + 3)
    : displayList.slice(0, 10);

  return (
    <div className="ranking-board">
      <h2 className="ranking-title">
        {targetIndex !== -1 ? 'あなたのランキング' : 'Top 10 Ranking'}
      </h2>
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map(({ entry, rank }) => {
            const dateStr = new Date(entry.date).toLocaleDateString();
            const isTarget = rank - 1 === targetIndex;
            return (
              <tr 
                key={entry.id} 
                className={rank <= 3 ? `rank-${rank}` : ''}
                style={isTarget ? { backgroundColor: 'rgba(59, 130, 246, 0.2)' } : {}}
              >
                <td className="rank-col">{rank}</td>
                <td className="name-col">{entry.name}</td>
                <td className="score-col">{entry.score}</td>
                <td className="date-col">{dateStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};


