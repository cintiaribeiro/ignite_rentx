import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, Extrapolate, interpolate } from 'react-native-reanimated';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

import { CarDTOS } from '../../dtos/CarDTOS';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcons } from '../../utils/getAccessoryIcons'

import{
    Container,
    Header,
    CarImage,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Accessories,
    Footer
} from './styles';



interface Params {
    car: CarDTOS;
}

export function CarDetails(){

    const navigator = useNavigation<any>();
    const theme = useTheme();
    const route = useRoute();
    const { car } = route.params as Params;

    const scrollY = useSharedValue(0);
    const scrollHandle = useAnimatedScrollHandler(event =>{
      scrollY.value = event.contentOffset.y;
      console.log(event.contentOffset.y);
    });

    const headerStyleAnimation = useAnimatedStyle(() =>{
      return {
        height: interpolate(
          scrollY.value,
          [0, 200],
          [200, 70],
          Extrapolate.CLAMP
        ),
      }
    });

    const sliderCarsStyleAnimation = useAnimatedStyle(()=>{
      return {
        opacity: interpolate(
          scrollY.value,
          [0, 150],
          [1, 0],
          Extrapolate.CLAMP
        )
      }
    });

    function handleConfirmRental(){
        navigator.navigate("Scheduling", { car });
    }

    function handleBack(){
        navigator.goBack();
    }

    

    return(
      <Container>
        <StatusBar
          barStyle="dark-content"
          translucent
          backgroundColor="transparent"
        />
        <Animated.View
          style = {[
            headerStyleAnimation,
            styles.header,
            { backgroundColor : theme.colors.background_secondary }
          ]}
        >
          <Header>
              <BackButton onPress={handleBack}/>
          </Header>

          <Animated.View style={sliderCarsStyleAnimation}>
            <CarImage>
              <ImageSlider
                  imagesUrl={car.photos}
              />
            </CarImage>
          </Animated.View>
        </Animated.View>

        <Animated.ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160,
          }}
          showsHorizontalScrollIndicator={false}
          onScroll = {scrollHandle}
          scrollEventThrottle={16}
        >                
          <Details>
            <Description>
                <Brand>{car.brand}</Brand>
                <Name>{car.name}</Name>
            </Description>

            <Rent>
                <Period>{car.period}</Period>
                <Price>R$ {car.price}</Price>
            </Rent>
          </Details>

          <Accessories>
            {
              car.accessories.map(accessory =>(
                <Accessory 
                  key={accessory.type}
                  name={accessory.name} 
                  icon={getAccessoryIcons(accessory.type)}
                />                   
              ))
            }
          </Accessories>

          <About> 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          {car.about} 
          </About>
            
        </Animated.ScrollView>

          <Footer>
            <Button 
              title="Escolher periodo do aluguel" 
              onPress={handleConfirmRental}
            />
          </Footer>
        </Container>
    )
}

const styles = StyleSheet.create({
  header:{
    position:'absolute',
    overflow: 'hidden',
    zIndex: 1
  }
})