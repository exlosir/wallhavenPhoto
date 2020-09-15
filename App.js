import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

/* Icons */
import {FontAwesome} from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

/* Screens */
import SettingsScreen from './src/screens/SettingsScreen';
import MainNavigator from './src/navigators/MainNavigator';
import HelpScreen from './src/screens/HelpScreen';

import {Provider, connect} from 'react-redux';
import configureStore from './src/store';

const Tabs = createBottomTabNavigator();

class App extends React.Component {

  render() {
    return (
      <Provider store={configureStore}>
        <NavigationContainer>
          <Tabs.Navigator>
            <Tabs.Screen
              name='Home'
              component={MainNavigator}
              options={{
                tabBarLabel: "Главная",
                tabBarIcon: () => (<FontAwesome name="home" size={24} color="black" />)
                }}></Tabs.Screen>
            <Tabs.Screen
              name='Settings'
              component={SettingsScreen}
              options={{
                tabBarLabel: "Настройки",
                tabBarIcon: () => (<MaterialIcons name="settings" size={24} color="black" />)
                }}></Tabs.Screen>
            <Tabs.Screen
              name='Help'
              component={HelpScreen}
              options={{
                tabBarLabel: "Помощь",
                tabBarIcon: () => (<MaterialIcons name="help" size={24} color="black" />)
                }}></Tabs.Screen>
          </Tabs.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }

}

export default App;