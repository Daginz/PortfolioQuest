interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}

export async function fetchGitHubRepos(): Promise<Repository[]> {
  const response = await fetch('/api/github/repos');
  if (!response.ok) {
    throw new Error('Failed to fetch GitHub repositories');
  }
  return response.json();
}
