import React from 'react';
import {HStack} from 'native-base';
import {useSelector} from 'react-redux';
import AppDatePicker from './AppDatePicker';
import NoInternet from './NoInternet';

const AppHeader = ({disableButton}) => {
  const hasInternet = useSelector(state => state.internet.value);

  return (
    <HStack backgroundColor="white" justifyContent="center">
      {hasInternet ? null : <NoInternet />}
      <AppDatePicker disableButton={disableButton} />
    </HStack>
  );
};

export default AppHeader;
