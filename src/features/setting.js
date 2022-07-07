import {createSlice} from '@reduxjs/toolkit';

const initialState = {language: 'en', screenOn: false, voice: 'en'};

export const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setScreenOn: (state, action) => {
      state.screenOn = action.payload;
    },
    setVoice: (state, action) => {
      state.voice = action.payload;
    },
  },
});

export const {setLanguage, setScreenOn, setVoice} = settingSlice.actions;

export default settingSlice.reducer;
