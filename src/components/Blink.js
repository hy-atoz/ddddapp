import React, {useEffect, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';

const Blink = ({children, duration, styles}) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnimation, {
          toValue: 1,
          easing: Easing.bounce,
          duration,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnimation]);

  return (
    <View style={{...styles}}>
      <Animated.View opacity={fadeAnimation}>{children}</Animated.View>
    </View>
  );
};

export default Blink;
