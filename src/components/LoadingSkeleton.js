import {Skeleton} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';

const LoadingSkeleton = ({children, isCenter, height = '5', width}) => {
  const isLoading = useSelector(state => state.result.isLoading);
  return (
    <Skeleton
      // fadeDuration={0.05}
      isLoaded={!isLoading}
      h={height}
      w={width}
      marginX={isCenter ? 'auto' : 0}>
      {children}
    </Skeleton>
  );
};

export default LoadingSkeleton;
