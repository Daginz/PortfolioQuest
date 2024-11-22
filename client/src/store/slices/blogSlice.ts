import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  categories: string[];
  tags: string[];
}

interface BlogState {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  postsPerPage: number;
  selectedCategory: string | null;
  searchQuery: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: BlogState = {
  posts: [],
  loading: false,
  error: null,
  currentPage: 1,
  postsPerPage: 6,
  selectedCategory: null,
  searchQuery: '',
  sortOrder: 'desc',
};

// Simulated async fetch (replace with actual API call later)
export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async () => {
    const response = await fetch('/api/blog/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts');
    }
    return response.json();
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1; // Reset to first page when filtering
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page when searching
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch blog posts';
      });
  },
});

export const { setCurrentPage, setCategory, setSearchQuery, setSortOrder } = blogSlice.actions;
export default blogSlice.reducer;
