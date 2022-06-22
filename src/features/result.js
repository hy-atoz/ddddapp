import {createSlice} from '@reduxjs/toolkit';
import moment from 'moment';
import momentTz from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';

let initialDate = new Date();
let initialFormattedDate = '';
const MALAYSIA_TIME_ZONE = 'Asia/Kuala_Lumpur';
const today = moment().format('YYYY-MM-DD HH:mm');
const deviceTimeZone = RNLocalize.getTimeZone();
const deviceTime = momentTz.tz(today, deviceTimeZone);
const targetTime = deviceTime.clone().tz(MALAYSIA_TIME_ZONE).format('HHmmss');
const targetDate = deviceTime
  .clone()
  .tz(MALAYSIA_TIME_ZONE)
  .format('YYYY-MM-DD');

if (targetTime < 182900) {
  initialDate = moment(targetDate).subtract(1, 'days').toDate();
  initialFormattedDate = moment(targetDate)
    .subtract(1, 'days')
    .format('YYYY-MM-DD');
} else {
  initialDate = moment(targetDate).toDate();
  initialFormattedDate = moment(targetDate).format('YYYY-MM-DD');
}

const initialState = {
  dates: {
    selectedDate: initialDate,
    formattedDate: initialFormattedDate,
  },
  isLoading: false,
  value: [],
};

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    addResult: (state, action) => {
      state.value = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSelectedDate: (state, action) => {
      state.dates = action.payload;
    },
  },
});

export const {addResult, setIsLoading, setSelectedDate} = resultSlice.actions;

export default resultSlice.reducer;
