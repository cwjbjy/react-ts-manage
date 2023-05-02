import { configureStore } from '@reduxjs/toolkit';

import file from './file';
import theme from './theme';

const store = configureStore({
  reducer: {
    file,
    theme,
  },
  middleware: [],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
