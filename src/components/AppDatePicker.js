import React, {useState} from 'react';
import moment from 'moment';
import momentTz from 'moment-timezone';
import {HStack, IconButton} from 'native-base';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setPrevOrNext, setSelectedDate} from '../features/result';
import * as RNLocalize from 'react-native-localize';

const MALAYSIA_TIME_ZONE = 'Asia/Kuala_Lumpur';
const today = moment().format('YYYY-MM-DD HH:mm');
const deviceTimeZone = RNLocalize.getTimeZone();
const deviceTime = momentTz.tz(today, deviceTimeZone);
const targetTime = deviceTime
  .clone()
  .tz(MALAYSIA_TIME_ZONE)
  .format('YYYY-MM-DD');

const AppDatePicker = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const dates = useSelector(state => state.result.dates);
  const isLoading = useSelector(state => state.result.isLoading);

  // TODO: Fix this
  const goPreviousDate = () => {
    console.log('⏪ goToPrevious', dates.selectedDate);
    const previousDate = moment(dates.selectedDate)
      .subtract(1, 'days')
      .toDate();
    const formattedPreviousDate = moment(dates.selectedDate, 'YYYY-MM-DD')
      .subtract(1, 'days')
      .format('YYYY-MM-DD');

    dispatch(setPrevOrNext('prev'));

    dispatch(
      setSelectedDate({
        selectedDate: previousDate,
        formattedDate: formattedPreviousDate,
      }),
    );
  };

  // TODO: Fix this
  const goNextDate = () => {
    console.log('⏭ goToNext', dates.selectedDate);
    const nextDate = moment(dates.selectedDate).add(1, 'days').toDate();
    const formattedNextDate = moment(dates.selectedDate, 'YYYY-MM-DD')
      .add(1, 'days')
      .format('YYYY-MM-DD');

    dispatch(setPrevOrNext('next'));

    dispatch(
      setSelectedDate({
        selectedDate: nextDate,
        formattedDate: formattedNextDate,
      }),
    );
  };

  return (
    <HStack
      alignItems="center"
      backgroundColor="white"
      justifyContent="center"
      padding={0.5}>
      <IconButton
        disabled={isLoading}
        colorScheme="muted"
        variant="ghost"
        onPress={goPreviousDate}
        _icon={{
          as: AntDesign,
          name: 'caretleft',
        }}
      />

      <AntDesign.Button
        backgroundColor="white"
        color="black"
        name="calendar"
        size={18}
        onPress={() => setOpen(true)}>
        Date
      </AntDesign.Button>
      <DatePicker
        androidVariant="iosClone"
        date={dates.selectedDate}
        maximumDate={moment(targetTime).toDate()}
        modal
        mode="date"
        open={open}
        theme="light"
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={date => {
          setOpen(false);
          dispatch(
            setSelectedDate({
              selectedDate: date,
              formattedDate: moment(date).format('YYYY-MM-DD'),
            }),
          );
        }}
      />
      <IconButton
        disabled={isLoading}
        colorScheme="muted"
        variant="ghost"
        onPress={goNextDate}
        _icon={{
          as: AntDesign,
          name: 'caretright',
        }}
      />
    </HStack>
  );
};
export default AppDatePicker;
