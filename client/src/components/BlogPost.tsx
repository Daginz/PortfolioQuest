import { BlogPost as BlogPostType } from "../store/slices/blogSlice";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface BlogPostProps {
  post: BlogPostType;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <Card className="p-6">
      <article className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString()}
            </div>
            <span>by {post.author}</span>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </article>
    </Card>
  );
}
