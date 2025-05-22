// components/GameInstructions.jsx

export default function GameInstructions() {
  return (
    <div className="game-instructions">
      <h2 data-testid="gameInstructions">
      Guess the correct color from the Options!</h2>
      <p>Note that only five attempts is allowed for a game session</p>
      <p>Any wrong guesses deducts 1 from your Scores. </p>
    </div>
);
}