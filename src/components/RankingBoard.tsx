import React, { useEffect, useState } from 'react';
import { getRanking, type RankingEntry } from '../lib/ranking';

type Props = {
  difficulty: string;
};

export const RankingBoard: React.FC<Props> = ({ difficulty }) => {
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

  return (
    <div className="ranking-board">
      <h2 className="ranking-title">Top 10 Ranking</h2>
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
          {ranking.map((entry, index) => {
            const dateStr = new Date(entry.date).toLocaleDateString();
            return (
              <tr key={entry.id} className={index < 3 ? `rank-${index + 1}` : ''}>
                <td className="rank-col">{index + 1}</td>
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


