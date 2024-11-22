import { useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RefreshCcw, AlertCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchRepositories } from "../store/slices/githubSlice";

export default function Projects() {
  const dispatch = useAppDispatch();
  const { repositories: repos, loading: isLoading, error } = useAppSelector((state) => state.github);

  useEffect(() => {
    dispatch(fetchRepositories());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchRepositories());
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Cave of Trials and Suffering</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            <span>Failed to load repositories: {error}</span>
            <Button variant="outline" size="sm" onClick={handleRetry} className="ml-4">
              <RefreshCcw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-full h-[200px] rounded-lg"
            />
          ))
        ) : repos?.length > 0 ? (
          repos.map((repo) => (
            <ProjectCard
              key={repo.id}
              name={repo.name}
              description={repo.description}
              language={repo.language}
              stars={repo.stars}
              url={repo.url}
            />
          ))
        ) : !error && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No repositories found
          </div>
        )}
      </div>
    </div>
  );
}
