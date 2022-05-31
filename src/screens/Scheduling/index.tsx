import React, { useState } from 'react';
import { StatusBar, Alert } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarketDateProps } from '../../components/Calendar';
import { format } from 'date-fns';

import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTOS } from '../../dtos/CarDTOS';

import ArrowSvg from '../../assets/arrow.svg';

import{
    Container,
    Header,
    Title,
    RentalPeriod,
    DateInfo,
    DateTitle,
    DateValue,
    Content,
    Footer,
} from './styles';

interface RentalPeriod {   
    startFormatted: string;    
    endFormatted: string;
}

interface Params {
    car: CarDTOS;
}

export function Scheduling(){

    const[lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
    const[marketDates, setMarketDates] = useState<MarketDateProps>({} as MarketDateProps);
    const[rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    
    const theme = useTheme();    
    const navigator = useNavigation<any>();

    const route = useRoute();
    const { car } = route.params as Params;

    function handleConfirm(){

        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert("Selecione o período de locação"); 
        }else{
            navigator.navigate("SchedulingDetails", {
                car,
                dates: Object.keys(marketDates)
            });
        }
    }
    
    function handleBack(){
        navigator.goBack();
    }

    function handleChangeDate(date: DayProps){
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp ){
            start = end;
            end = start;
        }

        setLastSelectedDate(end);
        
        const interval = generateInterval(start, end);        
        setMarketDates(interval);

        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({            
            startFormatted: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlataformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })

    }

    return(
        <Container>
            <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <Header>
                <BackButton 
                    onPress={handleBack} 
                    color={theme.colors.shape}
                />
                <Title>
                    Escolha uma {'\n'}
                    data de inícios e {'\n'}
                    fim do aluguel {'\n'}
                </Title>
                <RentalPeriod>
                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue selected={!!rentalPeriod.startFormatted} > 
                            {rentalPeriod.startFormatted} 
                        </DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle>ATË</DateTitle>
                        <DateValue selected={!!rentalPeriod.endFormatted}>
                            {rentalPeriod.endFormatted}
                        </DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>
            <Content>
                <Calendar
                   markedDates={marketDates}
                   onDayPress={handleChangeDate} 
                />
            </Content>
            <Footer>
                <Button 
                    title="Confirmar" 
                    onPress={handleConfirm}
                />
            </Footer>
        </Container>
    )
}