import React from 'react';
import {HStack} from 'native-base';
import {useSelector} from 'react-redux';
import AppDatePicker from './AppDatePicker';
import OfflineNotice from './OfflineNotice';

const AppHeader = ({disableButton}) => {
  const hasInternet = useSelector(state => state.internet.value);

  return (
    <HStack backgroundColor="white" justifyContent="center">
      {hasInternet ? null : <OfflineNotice />}
      <AppDatePicker disableButton={disableButton} />
    </HStack>
  );
};

export default AppHeader;
