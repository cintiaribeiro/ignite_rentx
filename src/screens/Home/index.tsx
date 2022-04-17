import React , {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

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
    CarList
} from './styles';

export function Home(){

    const[cars, setCars] = useState<CarDTOS>([]);
    const[loading, setLoading] = useState(true);
    const navigation = useNavigation<any>( );

    function handleCarDetails(car: CarDTO){
        navigation.navigate('CarDetails', { car });
    }

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé', 
        rent: {
            period: 'AO DIA', 
            price: 120, 
        },
        thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
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
        </Container>
    )
}