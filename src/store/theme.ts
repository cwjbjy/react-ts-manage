import { createSlice } from '@reduxjs/toolkit';

import type { ThemeType } from '@/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  theme: ThemeType;
} = {
  theme: 'theme-gray',
};

const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
  },
});

export const { changeTheme } = theme.actions;

export default theme.reducer;
