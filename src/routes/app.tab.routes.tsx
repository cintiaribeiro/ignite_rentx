import React from 'react';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { SignUpSecondStep } from '../screens/SingUp/SignUpSecondStep';

const {Navigator, Screen} = createBottomTabNavigator();

export function AppTabRoutes(){
    return(
        <Navigator>
            <Screen
                name="Home"
                component={Home}
            />          
            <Screen
                name="Profile"
                component={Home}
            />          
            <Screen
                name="SignUpSecondStep"
                component={SignUpSecondStep}
            />
            <Screen
                name="MyCars"
                component={MyCars}               
            />         
        </Navigator>
    )
}