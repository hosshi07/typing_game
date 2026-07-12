import React, { useState } from 'react';
import { DIFFICULTIES } from '../data/config';
import { RankingBoard } from './RankingBoard';

type Props = {
  onStart: (difficultyId: string) => void;
};

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  const [rankingDiff, setRankingDiff] = useState('normal');

  return (
    <div className="start-container">
      <div className="glass-panel main-panel">
        <h1 className="title">B@Home Typing</h1>
        <p className="subtitle">難易度とかをキメてタイピングをしよう</p>
        
        <div className="difficulty-buttons">
          {DIFFICULTIES.map(diff => (
            <button 
              key={diff.id} 
              className="btn" 
              onClick={() => onStart(diff.id)}
            >
              {diff.name} ({diff.timeLimit}秒)
            </button>
          ))}
        </div>
      </div>
      
      <div className="glass-panel ranking-panel">
        <div className="ranking-tabs">
          {DIFFICULTIES.map(diff => (
            <button
              key={diff.id}
              className={`ranking-tab ${rankingDiff === diff.id ? 'active' : ''}`}
              onClick={() => setRankingDiff(diff.id)}
            >
              {diff.name}
            </button>
          ))}
        </div>
        <RankingBoard difficulty={rankingDiff} />
      </div>
    </div>
  );
};


