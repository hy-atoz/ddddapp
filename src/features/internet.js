import {createSlice} from '@reduxjs/toolkit';

const initialState = {value: true};

export const internetSlice = createSlice({
  name: 'internet',
  initialState,
  reducers: {
    setInternetConnection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setInternetConnection} = internetSlice.actions;

export default internetSlice.reducer;
