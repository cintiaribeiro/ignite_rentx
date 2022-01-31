import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

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

export function Scheduling(){
    
    const theme = useTheme();
    
    const navigator = useNavigation<any>();

    function handleConfirm(){
        navigator.navigate("SchedulingDetails");
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
                    onPress={() =>{}} 
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
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                    <ArrowSvg/>

                    <DateInfo>
                        <DateTitle>ATË</DateTitle>
                        <DateValue selected={false}></DateValue>
                    </DateInfo>

                </RentalPeriod>
            </Header>
            <Content>
                <Calendar/>
            </Content>
            <Footer>
                <Button title="Confirmar" onPress={handleConfirm}/>
            </Footer>
        </Container>
    )
}