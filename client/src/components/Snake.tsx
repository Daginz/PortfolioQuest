import { useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { moveSnake, changeDirection, resetGame } from "../store/slices/snakeSlice";

export default function Snake() {
  const dispatch = useAppDispatch();
  const { snake, food, isGameOver, score } = useAppSelector((state) => state.snake);

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const keyMap: { [key: string]: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' } = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT',
    };

    if (keyMap[event.key]) {
      dispatch(changeDirection(keyMap[event.key]));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!isGameOver) {
      const gameInterval = setInterval(() => {
        dispatch(moveSnake());
      }, 150);
      return () => clearInterval(gameInterval);
    }
  }, [dispatch, isGameOver]);

  const handleReset = () => {
    dispatch(resetGame());
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative w-[400px] h-[400px] border-2 border-primary rounded-lg overflow-hidden"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(20, 20px)',
          gridTemplateRows: 'repeat(20, 20px)',
          backgroundColor: 'hsl(var(--muted))',
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Food */}
        <div
          className="absolute w-[18px] h-[18px] bg-red-500 rounded-full border border-red-600"
          style={{
            left: `${food.x * 20 + 1}px`,
            top: `${food.y * 20 + 1}px`,
            boxShadow: '0 0 4px rgba(239, 68, 68, 0.5)'
          }}
        />
        {/* Snake */}
        {snake.map((segment: { x: number; y: number }, index: number) => (
          <div
            key={index}
            className={`absolute w-[18px] h-[18px] rounded-sm border ${
              index === 0 
                ? 'bg-primary border-primary-foreground' 
                : 'bg-primary/80 border-primary/60'
            }`}
            style={{
              left: `${segment.x * 20 + 1}px`,
              top: `${segment.y * 20 + 1}px`,
              transition: 'all 0.15s linear'
            }}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg font-medium mb-2">Score: {score}</p>
        {isGameOver && (
          <div>
            <p className="text-lg font-medium text-red-500 mb-2">Game Over!</p>
            <Button variant="outline" onClick={handleReset}>
              Play Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
