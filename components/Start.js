import React from "react";
import { StyleSheet, View, Text, TextInput, Button, ImageBackground } from "react-native";

// Imports the background image from the project brief
import BackGroundImage from "../img/back-img.png";

// Color selector for users to change background color
// color = {
//   pink: '#450a1e',
//   blue: '#2742a3',
//   green: '#1d8566',
//   gray: '#5f6966',
//   red: '#b50d2c',
// }

export default class Start extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
    
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Image */}
        <ImageBackground
          source={BackGroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          {/* Main Input Container */}
          <View style={styles.main}>
            <Text>Enter your Name to proceed</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              placeholder="Type here ..."
            />
            <Button
              title="Enter Chatroom"
              onPress={() => this.props.navigation.navigate("Chat")}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },

  main: {
    width: "88%",
    backgroundColor: "white",
    alignItems: "center",
    height: "44%",
    justifyContent: "space-evenly",
  },

  input: {
    height: 50,
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  text: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
  },

  colorContainer: {
    width: "88%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  colorbutton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  button: {
    height: 50,
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },

  buttontext: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
