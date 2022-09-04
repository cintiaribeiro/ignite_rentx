import React from 'react';
import LottieView from 'lottie-react-native';

import CarAnimated from '../../assets/car_animated.json'


import { Container } from './styles';

export function LoadAnimation(){
  return (
    <Container>
      <LottieView
        source={CarAnimated}
        style={{height: 200}}
        resizeMode="contain"
        loop
        autoPlay
      />
    </Container>
  );
}