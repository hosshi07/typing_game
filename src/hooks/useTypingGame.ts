import { useState, useEffect, useCallback, useRef } from 'react';
import { TypingSession } from '../lib/romajiParser';
import type { Word } from '../data/config';
import { playTypeSound, playMissSound, playFinishSound } from '../lib/audio';

export type GameState = 'idle' | 'playing' | 'finished';

export type GameStats = {
  correctKeys: number;
  missKeys: number;
  averageKPS: number;
  basicScore: number;
  combo: number;
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
    combo: 0,
  });

  // 使い切るまで同じ単語を出さないための残機リスト
  const availableWordsRef = useRef<Word[]>([]);
  
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
    // 候補が空なら、現在の単語リストをシャッフルして補充
    if (availableWordsRef.current.length === 0) {
      availableWordsRef.current = [...wordsList].sort(() => Math.random() - 0.5);
    }
    const randomWord = availableWordsRef.current.pop()!;
    setCurrentWord(randomWord);
    setSession(new TypingSession(randomWord.reading));
    setTick(t => t + 1);
  }, [wordsList]);

  const startGame = useCallback(() => {
    setGameState('playing');
    setTimeLeft(timeLimit);
    setStats({ correctKeys: 0, missKeys: 0, averageKPS: 0, basicScore: 0, combo: 0 });
    availableWordsRef.current = []; // ゲーム開始時にバッグをリセット
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
      const newCombo = stats.combo + 1;
      let addedTime = 0;
      
      // コンボによる時間追加
      if (newCombo === 30) addedTime = 1;
      else if (newCombo === 60) addedTime = 2;
      else if (newCombo >= 90 && newCombo % 30 === 0) addedTime = 3;

      if (addedTime > 0) {
        setTimeLeft(t => t + addedTime);
      }

      setStats(prev => ({
        ...prev,
        correctKeys: prev.correctKeys + 1,
        basicScore: prev.basicScore + 10,
        combo: newCombo,
      }));

      // 単語を打ち終わったか
      if (session.isFinished()) {
        playFinishSound();
        nextWord();
      } else {
        playTypeSound();
        // 表示を更新
        setTick(t => t + 1);
      }
    } else {
      playMissSound();
      setStats(prev => ({
        ...prev,
        missKeys: prev.missKeys + 1,
        combo: 0, // ミスでコンボリセット
      }));
    }
  }, [gameState, session, nextWord, stats, endGame]);

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
