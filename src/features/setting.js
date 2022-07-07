import {createSlice} from '@reduxjs/toolkit';

const initialState = {screenOn: false};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setScreenOn: (state, action) => {
      state.screenOn = action.payload;
    },
  },
});

export const {setScreenOn} = settingSlice.actions;

export default settingSlice.reducer;
