import React from 'react';
import { DIFFICULTIES } from '../data/config';

type Props = {
  onStart: (difficultyId: string) => void;
};

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="glass-panel">
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
  );
};
