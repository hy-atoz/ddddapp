import React from 'react';
import {ScrollView} from 'native-base';

const ResultScreenContainer = ({children}) => {
  return (
    <ScrollView
      alwaysBounceVertical={false}
      backgroundColor="white"
      flex={1}
      flexGrow={1}
      marginBottom={24}
      paddingX={1}
      safeAreaBottom
      stickyHeaderIndices={[1]}>
      {children}
    </ScrollView>
  );
};

export default ResultScreenContainer;
