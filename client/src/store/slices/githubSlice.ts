import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
}

interface GithubState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
}

const initialState: GithubState = {
  repositories: [],
  loading: false,
  error: null,
};

export const fetchRepositories = createAsyncThunk(
  'github/fetchRepositories',
  async () => {
    const response = await fetch('/api/github/repos');
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub repositories');
    }
    return response.json();
  }
);

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.loading = false;
        state.repositories = action.payload;
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch repositories';
      });
  },
});

export default githubSlice.reducer;
