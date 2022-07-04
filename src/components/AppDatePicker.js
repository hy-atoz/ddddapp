import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import moment from 'moment';
import {HStack, IconButton} from 'native-base';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {DATE_FORMAT, TARGET_DATE} from '../constants';
import {
  setIsLoading,
  setIsPreviousDatePressed,
  setPrevOrNext,
  setSelectedDate,
} from '../features/result';

const DEVICE_WIDTH = Dimensions.get('window').width;
const ICON_SIZE = DEVICE_WIDTH <= 320 ? 4 : 8;

const AppDatePicker = ({disableButton = false}) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const {formattedDate, selectedDate} = useSelector(
    state => state.result.dates,
  );

  const goPreviousDate = () => {
    console.log('⏪ goToPrevious', formattedDate);
    const previousDate = moment(selectedDate).subtract(1, 'days').toDate();
    const formattedPreviousDate = moment(selectedDate, DATE_FORMAT)
      .subtract(1, 'days')
      .format(DATE_FORMAT);

    dispatch(setIsLoading(true));
    dispatch(setIsPreviousDatePressed(true));
    dispatch(
      setSelectedDate({
        selectedDate: previousDate,
        formattedDate: formattedPreviousDate,
      }),
      // dispatch(setPrevOrNext('/prev'));
    );
  };

  const goNextDate = () => {
    console.log('⏭ goToNext', formattedDate);
    const nextDate = moment(selectedDate).add(1, 'days').toDate();
    const formattedNextDate = moment(selectedDate, DATE_FORMAT)
      .add(1, 'days')
      .format(DATE_FORMAT);

    dispatch(setIsLoading(true));
    dispatch(
      setSelectedDate({
        selectedDate: nextDate,
        formattedDate: formattedNextDate,
      }),
      // dispatch(setPrevOrNext('/next'));
    );
  };

  return (
    <HStack
      alignItems="center"
      backgroundColor="white"
      justifyContent="center"
      padding={0.5}>
      <IconButton
        disabled={disableButton}
        colorScheme="muted"
        size={ICON_SIZE}
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
        size={DEVICE_WIDTH <= 320 ? 14 : 18}
        onPress={() => !disableButton && setOpen(true)}>
        Date
      </AntDesign.Button>
      <DatePicker
        androidVariant="iosClone"
        date={selectedDate}
        maximumDate={moment(TARGET_DATE).toDate()}
        modal
        mode="date"
        open={open}
        theme="light"
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={date => {
          dispatch(setIsLoading(true));
          setOpen(false);
          dispatch(
            setSelectedDate({
              selectedDate: date,
              formattedDate: moment(date).format(DATE_FORMAT),
            }),
          );
        }}
      />
      <IconButton
        disabled={disableButton}
        colorScheme="muted"
        size={ICON_SIZE}
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
