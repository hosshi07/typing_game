import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingSession } from '../lib/romajiParser';
import type { Word } from '../data/config';

export type GameState = 'idle' | 'playing' | 'finished';

export type GameStats = {
  correctKeys: number;
  missKeys: number;
  averageKPS: number;
  basicScore: number;
};

export function useTypingGame(wordsList: Word[], timeLimit: number) {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [session, setSession] = useState<TypingSession | null>(null);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [stats, setStats] = useState<GameStats>({
    correctKeys: 0,
    missKeys: 0,
    averageKPS: 0,
    basicScore: 0,
  });
  
  // Reactの再レンダリングを強制するためのTick
  const [, setTick] = useState(0);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const endGame = useCallback(() => {
    setGameState('finished');
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
    
    // 最終的なKPSの更新
    const timeElapsed = (Date.now() - startTimeRef.current) / 1000;
    setStats(prev => ({
      ...prev,
      averageKPS: timeElapsed > 0 ? prev.correctKeys / timeElapsed : 0
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGameState('idle');
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }
  }, []);

  const nextWord = useCallback(() => {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setCurrentWord(randomWord);
    setSession(new TypingSession(randomWord.reading));
    setTick(t => t + 1);
  }, [wordsList]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setTimeLeft(timeLimit);
    setStats({ correctKeys: 0, missKeys: 0, averageKPS: 0, basicScore: 0 });
    startTimeRef.current = Date.now();
    nextWord();

    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timeLimit, nextWord, endGame]);

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing' || !session) return;
    
    if (key === 'Escape') {
      endGame();
      return;
    }

    // ShiftやCtrlなどのメタキーを無視する (文字長が1のみ判定)
    if (key.length !== 1) return;

    const isCorrect = session.typeChar(key);

    if (isCorrect) {
      setStats(prev => ({
        ...prev,
        correctKeys: prev.correctKeys + 1,
        basicScore: prev.basicScore + 10,
      }));

      // 単語を打ち終わったか
      if (session.isFinished()) {
        nextWord();
      } else {
        // 表示を更新
        setTick(t => t + 1);
      }
    } else {
      setStats(prev => ({
        ...prev,
        missKeys: prev.missKeys + 1,
      }));
    }
  }, [gameState, session, nextWord]);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      // プレイ中にスペースキーなどで画面がスクロールするのを防ぐ
      if (gameState === 'playing' && e.key === ' ') {
        e.preventDefault();
      }
      handleKeyPress(e.key);
    };

    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [handleKeyPress, gameState]);

  // 現在のリアルタイムKPSを計算
  const currentKPS = gameState === 'playing' && Date.now() - startTimeRef.current > 0
      ? stats.correctKeys / ((Date.now() - startTimeRef.current) / 1000)
      : stats.averageKPS;

  return {
    gameState,
    session,
    currentWord,
    timeLeft,
    stats: { ...stats, averageKPS: currentKPS },
    startGame,
    resetGame
  };
}
