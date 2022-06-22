import React from 'react';
import {HStack} from 'native-base';
import {useSelector} from 'react-redux';
import AppDatePicker from './AppDatePicker';
import NoInternet from './NoInternet';

const AppHeader = () => {
  const hasInternet = useSelector(state => state.internet.value);

  return (
    <HStack backgroundColor="white" justifyContent="center">
      {hasInternet ? null : <NoInternet />}
      <AppDatePicker />
    </HStack>
  );
};

export default AppHeader;
