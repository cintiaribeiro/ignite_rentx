import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { format } from 'date-fns';
import { Alert } from 'react-native';

import api from '../../services/api';
import { CarDTOS } from '../../dtos/CarDTOS';
import { getPlataformDate } from '../../utils/getPlataformDate';

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
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,
} from './styles';



interface Params {
    car: CarDTOS;
    dates: string[];
}

interface RetalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails(){

    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RetalPeriod>({} as RetalPeriod);

    const theme = useTheme();
    
    const navigator = useNavigation<any>();
    
    const route = useRoute();
    const { car, dates } = route.params as Params;
    
    const rentalTotal = Number(dates.length * car.rent.price);

    function handleBack(){
        navigator.goBack();
    }

    async function handleConfirmRental(){
        setLoading(true);
        const response = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
            ...response.data.unavailable_dates,
            ...dates,
        ];

        await api.post('schedules_byuser', {
            user_id: 1,
            car,
            startDate:format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            endDate:format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })

        api.put(`/schedules_bycars/${car.id}`, {
            id: car.id,
            unavailable_dates
        })
        .then(response => navigator.navigate("SchedulingComplete"))
        .catch(() => {
            setLoading(false)
            Alert.alert("Não foi possível fazer o agendamento");
        })
    }

    useEffect(()=>{
        setRentalPeriod({
            start:format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'),
            end:format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
        })
    }, [])
    return(
        <Container>

            <Header>
                <BackButton 
                    onPress={handleBack} 
                />
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
                        car.accessories.map(accessory => (
                            <Accessory 
                                key={accessory.type}
                                name={accessory.name} 
                                icon={getAccessoryIcons(accessory.type)}
                            />                  
                        ))
                    }
                    
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name='calendar'
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>De</DateTitle>
                        <DateValue>{ rentalPeriod.start }</DateValue>
                    </DateInfo>

                    <Feather
                        name='chevron-right'
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />

                    <DateInfo>
                        <DateTitle>Até</DateTitle>
                        <DateValue>{ rentalPeriod.end }</DateValue>
                    </DateInfo>

                </RentalPeriod>
                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>{`R$ ${car.rent.price} X${dates.length} diárias`}</RentalPriceQuota>
                        <RentalPriceTotal>R$ {rentalTotal}</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>

            </Content>

            <Footer>
                <Button 
                    title="Confirmar" 
                    color={theme.colors.success} 
                    onPress={handleConfirmRental}
                    enabled={!loading}
                    loading={loading}
                />
            </Footer>
            

        </Container>
    )
}