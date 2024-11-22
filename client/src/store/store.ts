import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';
import themeReducer from './slices/themeSlice';
import githubReducer from './slices/githubSlice';
import navigationReducer from './slices/navigationSlice';
import snakeReducer from './slices/snakeSlice';
import blogReducer from './slices/blogSlice';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    theme: themeReducer,
    github: githubReducer,
    navigation: navigationReducer,
    snake: snakeReducer,
    blog: blogReducer,
    auth: authReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
