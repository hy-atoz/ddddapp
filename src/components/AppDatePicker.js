import moment from 'moment';
import {Button, HStack, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {API, DATE_FORMAT, TARGET_DATE} from '../constants';
import {
  saveResult,
  setIsLoading,
  setIsNextDraw,
  setIsNormalDraw,
  setIsPrevDraw,
  setSelectedDate,
} from '../features/result';
import getItem from '../utils/getItem';

const DEVICE_WIDTH = Dimensions.get('window').width;
// const ICON_SIZE = DEVICE_WIDTH <= 320 ? 4 : 8;

const AppDatePicker = ({disableButton = false, navigation}) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const currentSide = useSelector(state => state.result.currentSide);
  const {formattedDate, selectedDate} = useSelector(
    state => state.result.dates,
  );
  const result = useSelector(state => state.result.value);
  const isPrevDraw = useSelector(state => state.result.isPrevDraw);
  const isNextDraw = useSelector(state => state.result.isNextDraw);
  const isLoading = useSelector(state => state.result.isLoading);
  const [fdDataDD, setFdDataDD] = useState(formattedDate);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const disableNextButton = date => {
    if (date === moment().subtract(1, 'days').toDate()) {
      setIsNextDisabled(true);
    } else {
      setIsNextDisabled(false);
    }
  };

  const fetchMSSGPrev = async (date = '') => {
    console.log('🌺 Fetching data from', `${API}/api/v1/MSSGPrev/${date}`);
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${API}/api/v1/MSSGPrev/${date}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const fetchMSSGNext = async (date = '') => {
    console.log('🌺 Fetching data from', `${API}/api/v1/MSSGNext/${date}`);
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${API}/api/v1/MSSGNext/${date}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const fetchOtherPrev = async (date = '') => {
    console.log('🌺 Fetching data from', `${API}/api/v1/otherPrev/${date}`);
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${API}/api/v1/otherPrev/${date}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const fetchOtherNext = async (date = '') => {
    console.log('🌺 Fetching data from', `${API}/api/v1/otherNext/${date}`);
    try {
      dispatch(setIsLoading(true));
      const response = await fetch(`${API}/api/v1/otherNext/${date}`);
      const json = await response.json();
      dispatch(saveResult(json));
      dispatch(setIsLoading(false));
    } catch (err) {
      console.error(err);
      return err;
    }
  };

  const goPrevious = () => {
    dispatch(setIsPrevDraw(true));
    dispatch(setIsNextDraw(false));
    dispatch(setIsNormalDraw(false));
    setIsNextDisabled(false);

    if (result.length !== 0) {
      if (currentSide === 'GD' || currentSide === 'H') {
        const fdData = getItem(result, currentSide).fdData;
        setFdDataDD(fdData.dd);
        fetchOtherPrev(fdData.dd);
        dispatch(
          setSelectedDate({
            selectedDate: moment(fdData.dd).subtract(1, 'days').toDate(),
            formattedDate: moment(fdData.dd)
              .subtract(1, 'days')
              .format(DATE_FORMAT),
          }),
        );
      } else {
        const fdData = getItem(result, currentSide).fdData;
        setFdDataDD(fdData.dd);
        fetchMSSGPrev(fdData.dd);
        dispatch(
          setSelectedDate({
            selectedDate: moment(fdData.dd).subtract(1, 'days').toDate(),
            formattedDate: moment(fdData.dd)
              .subtract(1, 'days')
              .format(DATE_FORMAT),
          }),
        );
      }
    }
  };

  const goNext = () => {
    dispatch(setIsNextDraw(true));
    dispatch(setIsPrevDraw(false));
    dispatch(setIsNormalDraw(false));

    if (result.length !== 0) {
      if (currentSide === 'GD' || currentSide === 'H') {
        const fdData = getItem(result, currentSide).fdData;
        setFdDataDD(fdData.dd);
        fetchOtherNext(fdData.dd);
        disableNextButton(moment(fdData.dd).add(1, 'days').format(DATE_FORMAT));
        dispatch(
          setSelectedDate({
            selectedDate: moment(fdData.dd).add(1, 'days').toDate(),
            formattedDate: moment(fdData.dd).add(1, 'days').format(DATE_FORMAT),
          }),
        );
      } else {
        const fdData = getItem(result, currentSide).fdData;
        setFdDataDD(fdData.dd);
        fetchMSSGNext(fdData.dd);
        disableNextButton(moment(fdData.dd).add(1, 'days').format(DATE_FORMAT));
        dispatch(
          setSelectedDate({
            selectedDate: moment(fdData.dd).add(1, 'days').toDate(),
            formattedDate: moment(fdData.dd).add(1, 'days').format(DATE_FORMAT),
          }),
        );
      }
    }
  };

  useEffect(() => {
    if (isPrevDraw) {
      goPrevious();
    } else if (isNextDraw) {
      goNext();
    }
  }, [fdDataDD]);

  return (
    <HStack
      alignItems="center"
      backgroundColor="white"
      justifyContent="center"
      padding={0.5}>
      <Button
        disabled={isLoading}
        onPress={goPrevious}
        variant="ghost"
        size="sm"
        leftIcon={<AntDesign name="caretleft" size={10} />}
        colorScheme="rgb(0,0,0)">
        Prev
      </Button>
      <AntDesign.Button
        allowFontScaling={false}
        backgroundColor="white"
        color="rgba(0,0,0,0.9)"
        name="calendar"
        size={DEVICE_WIDTH <= 320 ? 14 : 18}
        onPress={() => !disableButton && setOpen(true)}>
        <Text fontSize="12">Date</Text>
      </AntDesign.Button>
      <DatePicker
        androidVariant="iosClone"
        date={selectedDate}
        minimumDate={moment('1985-04-27', DATE_FORMAT).toDate()}
        maximumDate={moment(TARGET_DATE).toDate()}
        modal
        mode="date"
        open={open}
        theme="light"
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={date => {
          setOpen(false);
          dispatch(setIsLoading(true));
          dispatch(
            setSelectedDate({
              selectedDate: date,
              formattedDate: moment(date).format(DATE_FORMAT),
            }),
          );
          dispatch(setIsNormalDraw(true));
          dispatch(setIsPrevDraw(false));
          dispatch(setIsNextDraw(false));
        }}
      />
      <Button
        disabled={isLoading || isNextDisabled}
        onPress={goNext}
        variant="ghost"
        size="sm"
        rightIcon={<AntDesign name="caretright" size={10} />}
        colorScheme="rgb(0,0,0)">
        Next
      </Button>
      {/* <IconButton
        disabled={disableNextButton}
        colorScheme="muted"
        size={ICON_SIZE}
        variant="ghost"
        onPress={goNext}
        _icon={{
          as: AntDesign,
          name: 'caretright',
        }}
      /> */}
    </HStack>
  );
};
export default AppDatePicker;
