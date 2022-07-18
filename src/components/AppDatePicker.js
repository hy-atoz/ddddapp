import moment from 'moment';
import {HStack, IconButton} from 'native-base';
import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {
  API_VERSION,
  DATE_FORMAT,
  LOCALHOST,
  MSSGNEXT_ENDPOINT,
  MSSGPREV_ENDPOINT,
  TARGET_DATE,
} from '../constants';
import {
  saveResult,
  setIsLoading,
  setIsPrevDrawPressed,
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
  const isPrevDrawPressed = useSelector(
    state => state.result.isPrevDrawPressed,
  );
  const isNextDrawPressed = useSelector(
    state => state.result.isNextDrawPressed,
  );

  const fetchFdData = async (date = '') => {
    let url;
    if (isPrevDrawPressed) {
      url = `${LOCALHOST}/${API_VERSION}/${MSSGPREV_ENDPOINT}/${date}`;
    } else if (isNextDrawPressed) {
      url = `${LOCALHOST}/${API_VERSION}/${MSSGNEXT_ENDPOINT}/${date}`;
    }
    console.log('🌺 Fetching data from', url);

    try {
      const response = await fetch(url);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const goPreviousDate = () => {
    console.log('⏪ goToPrevious', formattedDate);
    const previousDate = moment(selectedDate).subtract(1, 'days').toDate();
    const formattedPreviousDate = moment(selectedDate, DATE_FORMAT)
      .subtract(1, 'days')
      .format(DATE_FORMAT);

    dispatch(setIsLoading(true));
    dispatch(setIsPrevDrawPressed(true));
    dispatch(
      setSelectedDate({
        selectedDate: previousDate,
        formattedDate: formattedPreviousDate,
      }),
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
        allowFontScaling={false}
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
