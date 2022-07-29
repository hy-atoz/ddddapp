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
  currentSide: 'M',
  dates: {
    selectedDate: initialDate,
    formattedDate: initialFormattedDate,
  },
  isLiveStarted: 0,
  isLoading: false,
  isPrevDraw: false,
  isNextDraw: false,
  isNormalDraw: true,
  value: [],
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    saveResult: (state, action) => {
      state.value = action.payload;
    },
    setCurrentSide: (state, action) => {
      state.currentSide = action.payload;
    },
    setIsLiveStarted: (state, action) => {
      state.isLiveStarted = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsPrevDraw: (state, action) => {
      state.isPrevDraw = action.payload;
    },
    setIsNextDraw: (state, action) => {
      state.isNextDraw = action.payload;
    },
    setIsNormalDraw: (state, action) => {
      state.isNormalDraw = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.dates = action.payload;
    },
  },
});

export const {
  saveResult,
  setCurrentSide,
  setIsLoading,
  setIsPrevDraw,
  setIsNextDraw,
  setIsNormalDraw,
  setIsLiveStarted,
  setSelectedDate,
} = resultSlice.actions;

export default resultSlice.reducer;
