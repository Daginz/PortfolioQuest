import type { Express } from "express";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  visibility: string;
  fork: boolean;
}

interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
}

interface ErrorResponse {
  message: string;
  error?: string;
  documentation_url?: string;
}

// This would typically come from a database
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // In production, this would be hashed
};

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with TypeScript",
    content: "TypeScript is a powerful superset of JavaScript that adds static typing to the language...",
    date: "2024-11-22",
    author: "John Developer",
    categories: ["Programming", "Web Development"],
    tags: ["typescript", "javascript", "web"]
  },
  {
    id: "2",
    title: "Building Interactive UIs with React",
    content: "React has revolutionized how we build user interfaces. Let's explore some best practices...",
    date: "2024-11-21",
    author: "John Developer",
    categories: ["Frontend", "Web Development"],
    tags: ["react", "javascript", "ui"]
  },
  {
    id: "3",
    title: "The Art of Game Development",
    content: "Game development is a perfect blend of creativity and technical skills...",
    date: "2024-11-20",
    author: "John Developer",
    categories: ["Gaming", "Programming"],
    tags: ["games", "development", "programming"]
  }
];

export function registerRoutes(app: Express) {
  app.get('/api/github/repos', async (req, res) => {
    try {
      const username = process.env.GITHUB_USERNAME || 'default-username';
      console.log(`Fetching repositories for GitHub user: ${username}`);

      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'X-GitHub-Api-Version': '2022-11-28'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        const error = data as ErrorResponse;
        console.error('GitHub API Error:', {
          status: response.status,
          statusText: response.statusText,
          error
        });
        
        throw new Error(error.message || `GitHub API responded with status ${response.status}`);
      }

      const repos = data as GitHubRepo[];
      const formattedRepos = repos
        .filter(repo => !repo.fork && repo.visibility === 'public')
        .map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description || '',
          language: repo.language || 'Unknown',
          stars: repo.stargazers_count,
          url: repo.html_url
        }));

      console.log(`Successfully fetched ${formattedRepos.length} repositories`);
      res.json(formattedRepos);
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      res.status(500).json({ 
        message: 'Failed to fetch GitHub repositories',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.get('/api/blog/posts', (req, res) => {
    try {
      console.log('Fetching blog posts');
      res.json(mockBlogPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({ 
        message: 'Failed to fetch blog posts',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  // Authentication endpoint
  app.post('/api/auth/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      res.json({ isAdmin: true });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  // Blog management endpoints
  app.post('/api/blog/posts', (req, res) => {
    try {
      const newPost = {
        id: String(mockBlogPosts.length + 1),
        ...req.body,
      };
      mockBlogPosts.push(newPost);
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to create post',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.put('/api/blog/posts/:id', (req, res) => {
    try {
      const postIndex = mockBlogPosts.findIndex(post => post.id === req.params.id);
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      mockBlogPosts[postIndex] = {
        ...mockBlogPosts[postIndex],
        ...req.body,
        id: req.params.id,
      };
      
      res.json(mockBlogPosts[postIndex]);
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update post',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  app.delete('/api/blog/posts/:id', (req, res) => {
    try {
      const postIndex = mockBlogPosts.findIndex(post => post.id === req.params.id);
      if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      mockBlogPosts.splice(postIndex, 1);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Failed to delete post',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });
}
