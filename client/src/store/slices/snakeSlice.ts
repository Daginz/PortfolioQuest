import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

interface SnakeState {
  snake: Position[];
  food: Position;
  direction: Direction;
  isGameOver: boolean;
  score: number;
}

const initialState: SnakeState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 5, y: 5 },
  direction: 'RIGHT',
  isGameOver: false,
  score: 0,
};

const generateFood = (snake: Position[]): Position => {
  let newFood: Position;
  do {
    newFood = {
      x: Math.floor(Math.random() * 20),
      y: Math.floor(Math.random() * 20),
    };
  } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
  return newFood;
};

export const snakeSlice = createSlice({
  name: 'snake',
  initialState,
  reducers: {
    moveSnake: (state) => {
      if (state.isGameOver) return;

      const newHead = { ...state.snake[0] };

      switch (state.direction) {
        case 'UP':
          newHead.y -= 1;
          break;
        case 'DOWN':
          newHead.y += 1;
          break;
        case 'LEFT':
          newHead.x -= 1;
          break;
        case 'RIGHT':
          newHead.x += 1;
          break;
      }

      // Check collision with walls
      if (newHead.x < 0 || newHead.x >= 20 || newHead.y < 0 || newHead.y >= 20) {
        state.isGameOver = true;
        return;
      }

      // Check collision with self
      if (state.snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        state.isGameOver = true;
        return;
      }

      // Check if snake ate food
      if (newHead.x === state.food.x && newHead.y === state.food.y) {
        state.score += 10;
        state.food = generateFood(state.snake);
      } else {
        state.snake.pop();
      }

      state.snake.unshift(newHead);
    },
    changeDirection: (state, action: PayloadAction<Direction>) => {
      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT',
      };
      
      if (opposites[action.payload] !== state.direction) {
        state.direction = action.payload;
      }
    },
    resetGame: (state) => {
      return initialState;
    },
  },
});

export const { moveSnake, changeDirection, resetGame } = snakeSlice.actions;
export default snakeSlice.reducer;
