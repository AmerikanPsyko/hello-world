import React from 'react';
import { View, Text, Button } from 'react-native';

export default class Start extends React.Component {
  render() {
    return (
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Enter your Name to proceed</Text>
        <Button
          title="Enter Chatroom"
          onPress={() => this.props.navigation.navigate('Chat')}
        />
      </View>
    )
  }
}