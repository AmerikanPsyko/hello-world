import React from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          text: '',
        };
    }
  render() {
    let { bgColor} = this.props.route.params;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
        <View style={{
          flex:1, justifyContent:'center', backgroundColor: bgColor, 
          }}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Type here ...'
        />
        <Text
        
        >You wrote: {this.state.text}</Text>
      </View>
    )
  }
}