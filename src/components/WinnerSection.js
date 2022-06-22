import {VStack} from 'native-base';
import React from 'react';
import WinnerSectionTitle from './WinnerSectionTitle';

const WinnerSection = ({children, title}) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      marginBottom={1}
      width="100%">
      <WinnerSectionTitle title={title} />
      {children}
    </VStack>
  );
};

export default WinnerSection;
