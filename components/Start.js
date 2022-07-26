import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";
import BackGroundImage from "../img/back-img.png";

export default class Start extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      bgColor: this.colors.pink,
    };
  }

  // Change color function
  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  // Color selector for users to change background color
  colors = {
    pink: "#931560",
    blue: "#2742a3",
    gray: "#5f6966",
    red: "#b50d2c",
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Image */}
        <ImageBackground
          source={BackGroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          {/* Title Component */}
          <View style={styles.titleBox}>
            <Text style={styles.title}>CF Chat App</Text>
          </View>
          <View style={styles.mainBox}>
            {/* Input Component */}
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ name: text })}
                value={this.state.name}
                placeholder="What is your name?"
              />
            </View>
          </View>

          <View style={styles.colorContainer}>
            <Text style={styles.chooseColor}>
              {""}
              Pick your background color{""}
            </Text>

            {/* All the colors to change the background are here! */}
            <View style={styles.colorArray}>
              <TouchableOpacity
                style={styles.c1}
                onPress={() => this.changeBgColor(this.colors.pink)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.c2}
                onPress={() => this.changeBgColor(this.colors.blue)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.c3}
                onPress={() => this.changeBgColor(this.colors.gray)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.c4}
                onPress={() => this.changeBgColor(this.colors.red)}
              ></TouchableOpacity>
            </View>
          </View>
          <View style={styles.buttonPress}>
            <Pressable
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate("Chat", {
                  name: this.state.name,
                  bgColor: this.state.bgColor,
                })
              }>
            <Text style={styles.buttonText}>Start Chatting</Text>  
            </Pressable>
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

  titleMain: {
    backgroundColor: "white",
    height: "46%",
    width: "88%",
    justifyContent: "space-around",
    alignItems: "center",
  },

  input: {
    height: 50,
    width: "88%",
    fontSize: 16,
    fontWeight: "300",
    color: "#000000",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },

  inputBox: {
    color: "#000000",
  },

  text: {
    color: "#757083",
    fontSize: 16,
    fontWeight: "300",
  },

  c1: {
    backgroundColor: "#931560",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  c2: {
    backgroundColor: "#2742a3",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  c3: {
    backgroundColor: "#5f6966",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  c4: {
    backgroundColor: "#b50d2c",
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  colorArray: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  chooseColor: {
   
    justifyContent: 'center',
    
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
