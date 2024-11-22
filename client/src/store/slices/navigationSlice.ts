import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentPath: string;
  showNavigation: boolean;
}

const initialState: NavigationState = {
  currentPath: '/',
  showNavigation: false,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
      state.showNavigation = action.payload !== '/';
    },
  },
});

export const { setCurrentPath } = navigationSlice.actions;
export default navigationSlice.reducer;
