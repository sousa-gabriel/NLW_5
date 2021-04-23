import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../styles/colors';

import { Welcome } from '../Pages/Welcome';
import { Confirmation } from '../Pages/Confirmation';
import { UserIndentification } from '../Pages/UserIndentification';
import { PlantSelect } from '../Pages/PlantSelect';
const stackRoutes = createStackNavigator();

const AppRoutes: React.FC =() =>(
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle:{
                backgroundColor: colors.white
            },
        }}
    >
        <stackRoutes.Screen name="Welcome" component={Welcome}/>
        <stackRoutes.Screen name="UserIndentification" component={UserIndentification}/>
        <stackRoutes.Screen name="Confirmation" component={Confirmation}/>
        <stackRoutes.Screen name="PlantSelect" component={PlantSelect}/>
    </stackRoutes.Navigator>
);

export default AppRoutes ;