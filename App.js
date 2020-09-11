import React from 'react';
import styled from 'styled-components/native';
import {View, Text, SafeAreaView, Image, FlatList, RefreshControl, Alert} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

/* Screens */
import mainScreen from './src/screens/mainScreen';
import settingsScreen from './src/screens/settingsScreen';
import Photo from './src/screens/Photo';

import {Provider, connect} from 'react-redux';
import configureStore from './src/store';

const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={mainScreen} options={{title: "Главная"}}></Stack.Screen>
            <Stack.Screen name="Settings" component={settingsScreen} options={{title: "Настройки"}}></Stack.Screen>
            <Stack.Screen name="Details" component={Photo} options={{title: "О Фото"}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

}

export default App;