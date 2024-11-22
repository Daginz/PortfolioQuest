import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { BlogPost } from './blogSlice';

interface AdminState {
  editingPost: BlogPost | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  editingPost: null,
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  'admin/createPost',
  async (post: Omit<BlogPost, 'id'>) => {
    const response = await fetch('/api/blog/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to create post');
    }
    return response.json();
  }
);

export const updatePost = createAsyncThunk(
  'admin/updatePost',
  async (post: BlogPost) => {
    const response = await fetch(`/api/blog/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (!response.ok) {
      throw new Error('Failed to update post');
    }
    return response.json();
  }
);

export const deletePost = createAsyncThunk(
  'admin/deletePost',
  async (id: string) => {
    const response = await fetch(`/api/blog/posts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    return id;
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setEditingPost: (state, action) => {
      state.editingPost = action.payload;
      state.error = null;
    },
    clearEditingPost: (state) => {
      state.editingPost = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.loading = false;
        state.editingPost = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create post';
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state) => {
        state.loading = false;
        state.editingPost = null;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update post';
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete post';
      });
  },
});

export const { setEditingPost, clearEditingPost } = adminSlice.actions;
export default adminSlice.reducer;
