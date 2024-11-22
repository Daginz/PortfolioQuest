import { Card } from "@/components/ui/card";
import TicTacToe from "@/components/TicTacToe";
import Snake from "@/components/Snake";

export default function Games() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Igromania</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Tic Tac Toe</h2>
          <TicTacToe />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Snake</h2>
          <Snake />
        </Card>
      </div>
    </div>
  );
}
