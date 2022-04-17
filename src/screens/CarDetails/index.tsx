import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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

import { CarDTOS } from '../../dtos/CarDTOS';
interface Params {
    car: CarDTOS;
}

export function CarDetails(){

    const navigator = useNavigation<any>();
    const route = useRoute();

    const { car } = route.params as Params;

    function handleConfirmRental(){
        navigator.navigate("Scheduling");
    }

    function handleBack(){
        navigator.goBack();
    }

    return(
        <Container>

            <Header>
                <BackButton onPress={handleBack} />
            </Header>

            <CarImage>
                <ImageSlider
                    imagesUrl={car.photos}
                />
            </CarImage>

            <Content>                
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
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

                <About> {car.about} </About>
                
            </Content>

            <Footer>
                <Button 
                    title="Escolher periodo do aluguel" 
                    onPress={handleConfirmRental}
                />
            </Footer>
            

        </Container>
    )
}