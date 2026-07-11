import React from 'react';
import type { GameStats } from '../hooks/useTypingGame';

type Props = {
  stats: GameStats;
  onRetry: () => void;
};

export const ResultScreen: React.FC<Props> = ({ stats, onRetry }) => {
  return (
    <div className="glass-panel">
      <h1 className="title" style={{marginBottom: '3rem'}}>Result</h1>
      
      <div className="result-grid">
        <div className="result-card">
          <div className="result-label">スコア</div>
          <div className="result-value score-highlight">{stats.basicScore}</div>
        </div>
        <div className="result-card">
          <div className="result-label">正しく打ったキー</div>
          <div className="result-value">{stats.correctKeys}</div>
        </div>
        <div className="result-card">
          <div className="result-label">平均キー/秒 (KPS)</div>
          <div className="result-value">{stats.averageKPS.toFixed(2)}</div>
        </div>
        <div className="result-card">
          <div className="result-label">ミスタイプ</div>
          <div className="result-value" style={{color: 'var(--error-color)'}}>{stats.missKeys}</div>
        </div>
      </div>

      <button className="btn primary" onClick={onRetry}>タイトルへ戻る</button>
    </div>
  );
};
