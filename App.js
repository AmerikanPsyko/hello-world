import React, { Component } from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Start from './components/Start';
import Chat from './components/Chat';

//Create Class Navigator
const Stack = createStackNavigator();


export default class HelloWorld extends Component {
 constructor(props) {
   super(props);
  //  this.state = { text: '' };
 }

 

 render() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}