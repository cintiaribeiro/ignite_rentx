import React from 'react';
import { createStackNavigator  } from '@react-navigation/stack';

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { Confirmation } from '../screens/Confirmation';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SingUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep';

const {Navigator, Screen} = createStackNavigator();

export function AppStackRoutes(){
    return(
        <Navigator headerMode="none" initialRouteName='Home'>
            {/* <Screen
                name="Splash"
                component={Splash}
            /> */}
            <Screen
                name="Home"
                component={Home}
                // options={{
                //     gestureEnabled: false
                // }}
            />
            <Screen
                name="SignIn"
                component={SignIn}
            />
            <Screen
                name="SignUpFirstStep"
                component={SignUpFirstStep}
            />
            <Screen
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            />
            {/* <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false
                }}
            /> */}
            <Screen
                name="CarDetails"
                component={CarDetails}
            />
            <Screen
                name="Scheduling"
                component={Scheduling}
            />
            <Screen
                name="Confirmation"
                component={Confirmation}
            />
            <Screen
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    )
}