// components/NewGameButton.jsx

export default function NewGameButton({ onReset }) {
  return (
    <button
      onClick={(onReset)}
      
      className="new-game-button"
      data-testid="newGameButton"
    >
      New Game
    </button>
  );
}