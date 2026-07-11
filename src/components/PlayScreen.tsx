import React from 'react';
import { TypingSession } from '../lib/romajiParser';
import type { Word } from '../data/config';
import type { GameStats } from '../hooks/useTypingGame';

type Props = {
  session: TypingSession;
  currentWord: Word;
  timeLeft: number;
  stats: GameStats;
};

export const PlayScreen: React.FC<Props> = ({ session, currentWord, timeLeft, stats }) => {
  const typed = session.getTypedRomaji();
  const untyped = session.getRemainingRomaji();

  return (
    <div className="glass-panel">
      <div className="stats-bar">
        <div>スコア: <span style={{color: 'var(--accent-color)'}}>{stats.basicScore}</span></div>
        <div className={`time-left ${timeLeft <= 10 ? 'warning' : ''}`}>
          {timeLeft}s
        </div>
        <div>KPS: {stats.averageKPS.toFixed(1)}</div>
      </div>

      <div className="word-display">
        <div className="kanji">{currentWord.display}</div>
        <div className="reading">{currentWord.reading}</div>
        
        <div className="romaji-container">
          <span className="typed">{typed}</span>
          <span className="untyped">{untyped}</span>
        </div>
      </div>
    </div>
  );
};
