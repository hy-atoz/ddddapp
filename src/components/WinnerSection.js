import {VStack} from 'native-base';
import React from 'react';
import SectionTitle from './SectionTitle';

const WinnerSection = ({children, title}) => {
  return (
    <VStack
      alignItems="center"
      justifyContent="center"
      marginBottom={1}
      width="100%">
      <SectionTitle title={title} />
      {children}
    </VStack>
  );
};

export default WinnerSection;
