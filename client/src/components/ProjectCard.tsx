import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork } from "lucide-react";

interface ProjectCardProps {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}

export default function ProjectCard({
  name,
  description,
  language,
  stars,
  url,
}: ProjectCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block space-y-4"
      >
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-4">
          <Badge variant="secondary">{language}</Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4" />
            {stars}
          </div>
        </div>
      </a>
    </Card>
  );
}
