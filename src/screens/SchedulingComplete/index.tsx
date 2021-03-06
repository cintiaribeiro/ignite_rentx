import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ConfirmButton } from '../../components/ConfirmButton'

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import{
    Container,
    Content,
    Title,
    Message,
    Footer
} from './styles';

export function SchedulingComplete(){

    const { width } = useWindowDimensions();

    const navigator = useNavigation<any>();

    function handleConfirm(){
        navigator.navigate("Home");
    }

    return(
        <Container>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={ width }/>
            <Content>
                <DoneSvg width={80} height={80}/>
                <Title>Carro alugador!</Title>
                <Message>
                    Agora você só precisa ir {'\n'}
                    até a concessionária da RENTX {'\n'}
                    pegar o seu automóvel.
                </Message>
            </Content>
            <Footer>
                <ConfirmButton title='OK' onPress={handleConfirm}/>
            </Footer>
        </Container>
    )
}