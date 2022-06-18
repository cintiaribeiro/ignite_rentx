import React , {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; 
import { useTheme } from 'styled-components';

import api from "../../services/api";
import { CarDTOS } from "../../dtos/CarDTOS";

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import Logo from '../../assets/logo.svg';


import{
    Container,
    Header,
    HeaderContent,
    TotalCars,
    CarList,
    MyCarsButton
} from './styles';

export function Home(){

    const[cars, setCars] = useState<CarDTOS[]>([]);
    const[loading, setLoading] = useState(true);
    const navigation = useNavigation<any>( );

    const theme = useTheme();

    function handleCarDetails(car: CarDTOS){
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars(car: CarDTOS){
        navigation.navigate('MyCars');
    }

   

    useEffect(()=>{
        async function fetchCars(){
            try{
                const response = await api.get("/cars");
                console.log();
                setCars(response.data);
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        fetchCars();
    },[]);

    return(
        <Container>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <HeaderContent>
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            { loading ? <Load/> : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <Car data={item} onPress={()=>handleCarDetails(item)}/>}
                />
            }
            <MyCarsButton onPress={handleOpenMyCars}>
                <Ionicons 
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                />
            </MyCarsButton>
        </Container>
    )
}