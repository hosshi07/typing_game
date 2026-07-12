import { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { PlayScreen } from './components/PlayScreen';
import { ResultScreen } from './components/ResultScreen';
import { useTypingGame } from './hooks/useTypingGame';
import { WORDS, DIFFICULTIES } from './data/config';

function App() {
  const [selectedDiff, setSelectedDiff] = useState('normal');
  const config = DIFFICULTIES.find(d => d.id === selectedDiff) || DIFFICULTIES[1];
  let wordsList = WORDS[selectedDiff] || WORDS['normal'];
  if (selectedDiff === 'normal') {
    wordsList = [...(WORDS['easy'] || []), ...(WORDS['normal'] || [])];
  } else if (selectedDiff === 'hard') {
    wordsList = [...(WORDS['normal'] || []), ...(WORDS['hard'] || [])];
  }

  const {
    gameState,
    session,
    currentWord,
    timeLeft,
    stats,
    startGame,
    resetGame
  } = useTypingGame(wordsList, config.timeLimit);

  const handleStart = (diffId: string) => {
    setSelectedDiff(diffId);
    // 難易度設定の反映を待ってからスタート
    setTimeout(() => {
      startGame();
    }, 0);
  };

  return (
    <>
      {gameState === 'idle' && (
        <StartScreen onStart={handleStart} />
      )}
      
      {gameState === 'playing' && session && currentWord && (
        <PlayScreen 
          session={session} 
          currentWord={currentWord} 
          timeLeft={timeLeft} 
          stats={stats} 
        />
      )}
      
      {gameState === 'finished' && (
        <ResultScreen 
          stats={stats} 
          difficulty={selectedDiff}
          onRetry={resetGame} 
        />
      )}
    </>
  );
}

export default App;
