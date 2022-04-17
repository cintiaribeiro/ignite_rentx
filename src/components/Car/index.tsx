import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { CarDTOS } from "../../dtos/CarDTOS";


import{
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';
import { getAccessoryIcons } from '../../utils/getAccessoryIcons';

interface Props extends RectButtonProps {
    data: CarDTOS;
}

export function Car({ data, ...rest }: Props){
    const MotorIcon = getAccessoryIcons(data.fuel_type);
    return(
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>
                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>
                    <Type>
                        <MotorIcon/>
                    </Type>
                </About>
            </Details>
            <CarImage 
                source={{uri: data.thumbnail}} 
                resizeMode="contain"
            />
        </Container>
    )
}

// 