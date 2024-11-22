import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  variant: 'professional' | 'tint' | 'vibrant';
  primary: string;
  appearance: 'light' | 'dark' | 'system';
  radius: number;
}

const initialState: ThemeState = {
  variant: 'professional',
  primary: 'hsl(215, 28%, 17%)',
  appearance: 'light',
  radius: 0.75,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Partial<ThemeState>>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
