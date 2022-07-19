import {HStack} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';
import AppDatePicker from './AppDatePicker';
import OfflineNotice from './OfflineNotice';

const AppHeader = ({disableButton, navigation}) => {
  const hasInternet = useSelector(state => state.internet.value);

  return (
    <HStack backgroundColor="white" justifyContent="center">
      {hasInternet ? null : <OfflineNotice />}
      <AppDatePicker disableButton={disableButton} navigation={navigation} />
    </HStack>
  );
};

export default AppHeader;
