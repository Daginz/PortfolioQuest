import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Player = 'X' | 'O' | null;
type Board = Player[];

interface GameState {
  board: Board;
  isXNext: boolean;
  winner: Player;
}

const initialState: GameState = {
  board: Array(9).fill(null),
  isXNext: true,
  winner: null,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    makeMove: (state, action: PayloadAction<number>) => {
      if (state.board[action.payload] || state.winner) return;
      
      state.board[action.payload] = state.isXNext ? 'X' : 'O';
      state.isXNext = !state.isXNext;
      state.winner = calculateWinner(state.board);
    },
    resetGame: (state) => {
      state.board = Array(9).fill(null);
      state.isXNext = true;
      state.winner = null;
    },
  },
});

function calculateWinner(squares: Board): Player {
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

export const { makeMove, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
