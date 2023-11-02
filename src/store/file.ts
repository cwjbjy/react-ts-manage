import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  fileName: string;
} = {
  fileName: '',
};

const file = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
  },
});

export const { setFileName } = file.actions;

export default file.reducer;
