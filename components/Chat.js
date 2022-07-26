import React from 'react';
import { TextInput, StyleSheet, View, Text} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { Platform, KeyboardAvoidingView } from 'react-native';


export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          messages: [],
        };
    }

    componentDidMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Welcome to the Chat!',
            createdAt: new Date(),
            user: {
              _id: 2,
              text: 'This is a system message',
              createdAt: new Date(),
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
          {
            _id: 2,
            text: 'This is a system message',
            createdAt: new Date(),
            system: true,
          }
        ],
      })
    };

    onSend(messages = []) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
    }

    renderBubble(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#4287f5",
            },
            left: {
              backgroundColor: "#42f593",
            },
          }}
        />
      );
    }


  render() {
    let { bgColor} = this.props.route.params;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
        <View style={{
          flex:1, 
          justifyContent:'center', 
          backgroundColor: bgColor,
          
          }}>
        {/* <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, }}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder='Type here ...'
        />
        <View style={styles.textWrote}>
        <Text>You wrote: {this.state.text}</Text>
        </View> */}
        
        
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
          _id: 1,
          }}
        
        />

          {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
           ) : null}


      </View>
    )
  }

  

};

const styles = StyleSheet.create({
textWrote: {
  paddingTop: '10%',
  marginLeft: '1%',
  fontSize: 24,
  fontWeight: '400',
}
});