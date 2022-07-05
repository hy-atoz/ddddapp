import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import {DATE_FORMAT, DRAW_TIME, TARGET_DATE, TARGET_TIME} from '../constants';

let initialDate = new Date();
let initialFormattedDate = '';

if (TARGET_TIME < DRAW_TIME.start) {
  initialDate = moment(TARGET_DATE).subtract(1, 'days').toDate();
  initialFormattedDate = moment(TARGET_DATE)
    .subtract(1, 'days')
    .format(DATE_FORMAT);
} else {
  initialDate = moment(TARGET_DATE).toDate();
  initialFormattedDate = moment(TARGET_DATE).format(DATE_FORMAT);
}

const initialState = {
  dates: {
    selectedDate: initialDate,
    formattedDate: initialFormattedDate,
  },
  isLiveStarted: 0,
  isLoading: false,
  isPrevDatePressed: false,
  prevOrNext: '',
  value: [],
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    saveResult: (state, action) => {
      state.value = action.payload;
    },
    setIsLiveStarted: (state, action) => {
      state.isLiveStarted = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsPreviousDatePressed: (state, action) => {
      state.isPrevDatePressed = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.dates = action.payload;
    },
  },
});

export const {
  saveResult,
  setIsLoading,
  setIsLiveStarted,
  setIsPreviousDatePressed,
  setSelectedDate,
} = resultSlice.actions;

export default resultSlice.reducer;
