import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import PhotoDetail from '../screens/PhotoDetail';
import MainScreen from '../screens/MainScreen';

const Stack = createStackNavigator();

export default class MainNavigator extends React.Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Main" component={MainScreen} options={{headerShown: false}}></Stack.Screen>
                <Stack.Screen name="Details" component={PhotoDetail} options={{title: "О Фото"}}></Stack.Screen>
            </Stack.Navigator>
        )
    }

}