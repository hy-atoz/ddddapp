import {Skeleton} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';

const LoadingSkeleton = ({children}) => {
  const isLoading = useSelector(state => state.result.isLoading);
  return (
    <Skeleton.Text isLoaded={!isLoading} w="100%">
      {children}
    </Skeleton.Text>
  );
};

export default LoadingSkeleton;
