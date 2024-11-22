import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { makeMove, resetGame } from "../store/slices/gameSlice";

export default function TicTacToe() {
  const dispatch = useAppDispatch();
  const { board, isXNext, winner } = useAppSelector((state) => state.game);
  const isDraw = !winner && board.every((square) => square !== null);

  function handleClick(index: number) {
    dispatch(makeMove(index));
  }

  function handleReset() {
    dispatch(resetGame());
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <Button
            key={index}
            variant="outline"
            className="w-20 h-20 text-2xl font-bold"
            onClick={() => handleClick(index)}
          >
            {value}
          </Button>
        ))}
      </div>

      <div className="text-center">
        {winner ? (
          <p className="text-lg font-medium">Winner: {winner}</p>
        ) : isDraw ? (
          <p className="text-lg font-medium">Draw!</p>
        ) : (
          <p className="text-lg font-medium">Next player: {isXNext ? "X" : "O"}</p>
        )}
        <Button
          variant="outline"
          className="mt-2"
          onClick={handleReset}
        >
          Reset Game
        </Button>
      </div>
    </div>
  );
}

// Types are already defined at the top of the file
function calculateWinner(squares: Array<'X' | 'O' | null>): 'X' | 'O' | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
