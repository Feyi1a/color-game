import { useState, useEffect } from 'react';
import GameInstructions from './components/GameInstructions';
import ColorBox from './components/ColorBox';
import ColorOptions from './components/ColorOptions';
import { GameStatus } from './components/GameStatus';
import { MyScores } from './components/MyScores';
import NewGameButton from './components/NewGameButton';
import './ColorGame.css';

const ORIGINAL_COLOR_OPTIONS = ['Magenta', 'pink', 'green', 'gold', 'purple', 'teal'];

const getRandomColor = (options) => {
  return options[Math.floor(Math.random() * options.length)];
};

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export default function App() {
  const [colorOptions, setColorOptions] = useState(shuffleArray(ORIGINAL_COLOR_OPTIONS));
  const [targetColor, setTargetColor] = useState(getRandomColor(colorOptions));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [status, setStatus] = useState('Playing...');
  const [animateResult, setAnimateResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [feedbackStyle, setFeedbackStyle] = useState('');
  const maxAttempts = 5;

  const handleColorClick = (color) => {
  let updatedScore = score;
  let isCorrect = color === targetColor;

  // Apply styling based on isCorrect variable
  if (isCorrect) {
    updatedScore = score + 1;
    setStatus('Correct!');
    setFeedbackStyle('correct-feedback');
  } else {
    updatedScore = score > 0 ? score - 1 : 0;
    setStatus('Wrong! -1 point');
    setAttempts(prev => prev + 1); // Only increment attempts on wrong guess
    setFeedbackStyle('incorrect-feedback');
  }

  setScore(updatedScore);
  if (updatedScore > highScore) {
    setHighScore(updatedScore);
  }

  // End game only if max wrong attempts reached
  if (!isCorrect && attempts + 1 >= maxAttempts) {
    setStatus('Game Over');
    setFeedbackStyle('game-over-feedback');
  } else {
    const newOptions = shuffleArray(ORIGINAL_COLOR_OPTIONS);
    setColorOptions(newOptions);
    setTargetColor(getRandomColor(newOptions));
  }

  setAnimateResult(true);
  setTimeout(() => {
    setAnimateResult(false);
    setFeedbackStyle(''); // Clear feedback styling after animation
  }, 800);
};


  const startNewGame = () => {
    const shuffled = shuffleArray(ORIGINAL_COLOR_OPTIONS);
    setColorOptions(shuffled);
    setTargetColor(getRandomColor(shuffled));
    setScore(0);
    setStatus('New Game Started!');
    setAttempts(0);
    setFeedbackStyle('new-game-feedback');
    setTimeout(() => setFeedbackStyle(''), 1000);
  };

  return (
    <div className={`game-container ${feedbackStyle}`}>
      <GameInstructions />
      <ColorBox targetColor={targetColor} />
      <ColorOptions options={colorOptions} onColorClick={handleColorClick} disabled={attempts >= maxAttempts} />
      <GameStatus status={status} animate={animateResult} />
      <MyScores score={score} highScore={highScore} attempts={attempts} maxAttempts={maxAttempts} />
      <NewGameButton onReset={startNewGame} onClick={setStatus} />
      <div className="footer">
        <p>Created by Feyi Ken</p>
        <p>Color Game - React Version</p>
      </div>
    </div>
  );
}