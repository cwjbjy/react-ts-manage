import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

export interface ThemeState {
  theme: ThemeType;
}

const initialState: ThemeState = {
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
