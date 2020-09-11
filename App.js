import React from 'react';
import styled from 'styled-components/native';
import {View, Text, SafeAreaView, Image, FlatList, RefreshControl, Alert} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

/* Screens */
import MainScreen from './src/screens/MainScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PhotoDetail from './src/screens/PhotoDetail';

import {Provider, connect} from 'react-redux';
import configureStore from './src/store';

const Stack = createStackNavigator();

class App extends React.Component {

  render() {
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={MainScreen} options={{title: "Главная"}}></Stack.Screen>
            <Stack.Screen name="Settings" component={SettingsScreen} options={{title: "Настройки"}}></Stack.Screen>
            <Stack.Screen name="Details" component={PhotoDetail} options={{title: "О Фото"}}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

}

export default App;