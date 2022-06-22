import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

const Spin = ({children, duration}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 1,
          easing: Easing.linear,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.View style={{transform: [{rotate: spin}]}}>
      {children}
    </Animated.View>
  );
};

export default Spin;
