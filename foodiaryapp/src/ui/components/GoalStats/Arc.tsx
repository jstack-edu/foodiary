import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IArcProps {
  percentage: number;
  color: string;
  radius: number;
  strokeWidth: number;
  baseStrokeColor?: string;
  style?: StyleProp<ViewStyle>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function Arc({
  percentage,
  color,
  radius,
  strokeWidth,
  style,
}: IArcProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const semiCircumference = Math.PI * radius;
  const arcLength = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [0, semiCircumference],
  });

  const arcDraw = `M ${strokeWidth / 2},${radius + strokeWidth / 2}
                   A ${radius},${radius} 0 0,1 ${radius * 2 + strokeWidth / 2},${radius + strokeWidth / 2}`;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  return (
    <View style={style}>
      <Svg
        width={radius * 2 + strokeWidth}
        height={radius + strokeWidth}
      >
        <Path
          d={arcDraw}
          fill="none"
          stroke="#E0E0E0"
          strokeWidth={strokeWidth}
          strokeDasharray={semiCircumference}
          strokeLinecap="round"
        />

        <AnimatedPath
          d={arcDraw}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={[arcLength, semiCircumference]}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}
