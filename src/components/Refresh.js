import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spin from './Spin';

const Refresh = ({isSpinning, onPress}) => {
  return (
    <>
      {isSpinning ? (
        <Spin duration={1000}>
          <FontAwesome name="refresh" size={20} />
        </Spin>
      ) : (
        <FontAwesome name="refresh" size={20} onPress={onPress} />
      )}
    </>
  );
};

export default Refresh;
