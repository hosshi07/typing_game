import React, { useState } from 'react';
import type { GameStats } from '../hooks/useTypingGame';
import { addRanking } from '../lib/ranking';
import { RankingBoard } from './RankingBoard';

type Props = {
  stats: GameStats;
  difficulty: string;
  onRetry: () => void;
};

export const ResultScreen: React.FC<Props> = ({ stats, difficulty, onRetry }) => {
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (stats.basicScore > 0 && !registered) {
      addRanking(name, stats.basicScore, difficulty);
      setRegistered(true);
    }
  };

  return (
    <div className="glass-panel result-panel">
      <h1 className="title" style={{marginBottom: '2rem'}}>Result ({difficulty.toUpperCase()})</h1>
      
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

      {!registered && stats.basicScore > 0 ? (
        <form className="ranking-form" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="名前を入力してランキングに登録" 
            value={name}
            onChange={e => setName(e.target.value)}
            className="ranking-input"
            maxLength={15}
          />
          <button type="submit" className="btn secondary">登録する</button>
        </form>
      ) : registered ? (
        <div className="ranking-section">
          <p className="ranking-success">ランキングに登録しました！</p>
          <RankingBoard difficulty={difficulty} />
        </div>
      ) : null}

      <div style={{marginTop: '2rem'}}>
        <button className="btn primary" onClick={onRetry}>タイトルへ戻る</button>
      </div>
    </div>
  );
};


