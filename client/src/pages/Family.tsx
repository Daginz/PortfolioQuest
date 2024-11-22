import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function Family() {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Daginz Family</h1>
          <p className="text-muted-foreground">
            This section is currently under development
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Development Progress</h3>
            <Progress value={35} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">35% Complete</p>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Coming Soon</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Family Tree Visualization</li>
              <li>• Photo Gallery</li>
              <li>• Timeline Events</li>
              <li>• Stories & Memories</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
