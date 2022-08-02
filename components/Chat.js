import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import CustomActions from "./CustomActions";

const firebase = require("firebase");
require("firebase/firestore");

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      isConnected: null,
    };

    //Firebase connection creds
    const firebaseConfig = {
      apiKey: "AIzaSyCSMHnKE0P8V9V-XVuYol0Yq8ARXr5uqgs",
      authDomain: "chat-test-3b6a6.firebaseapp.com",
      projectId: "chat-test-3b6a6",
      storageBucket: "chat-test-3b6a6.appspot.com",
      messagingSenderId: "133457184018",
      appId: "1:133457184018:web:e7d6eede2ca05e53f39fcb",
      measurementId: "G-JJHWMERDK8",
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Firestore DB
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || "",
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || "",
        },
        image: data.image || null,
      });
    });
    this.setState({
      messages,
    });
  };

  getMessages = async () => {
    let messages = "";
    try {
      messages = (await AsyncStorage.getItem("messages")) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        "messages",
        JSON.stringify(this.state.messages)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem("messages");
      this.setState({
        messages: [],
      });
    } catch (e) {
      console.log(e.messages);
    }
  };

  componentDidMount() {
    let { name } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({
          isConnected: true,
        });

        // Get DB messages
        this.referenceChatMessages = firebase
          .firestore()
          .collection("messages");

        // Authenticates users via anonomous
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              firebase.auth().signInAnonymously();
            }
            this.setState({
              uid: user.uid,
              messages: [],
              user: {
                _id: user.uid,
                name: name,
              },
            });
            this.unsubscribe = this.referenceChatMessages
              .orderBy("createdAt", "desc")
              .onSnapshot(this.onCollectionUpdate);
          });
      } else {
        this.setState({
          isConnected: false,
        });
        this.getMessages();
      }
    });
  }

  componentWillUnmount() {
    if (this.isConnected) {
      this.unsubscribe();
      this.authUnsubscribe();
    }
  }

  // Adds messages
  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        // Async Storage save messages
        this.saveMessages();

        // Recalls last message in state
        if (this.state.isConnected === true) {
          this.addMessages(this.state.messages[0]);
        }
      }
    );
  }

  // Add message to Firestore
  addMessages = (message) => {
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text || "",
      createdAt: message.createdAt,
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  };

  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };

  renderCustomView (props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }



  // Offline storage

  // renderInputToolbar(props) {
  //   if (this.state.isConnected == false) {
  //   } else {
  //     return(
  //       <InputToolbar
  //       {...props}
  //       />
  //     );
  //   }
  // }

  // Customize color of the chat bubbles
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#4287f5",
          },
          right: {
            backgroundColor: "#42f593",
          },
        }}
      />
    );
  }

  state = {
    image: null,
  };

 
  // pickImage = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //   if (status === "granted") {
  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: "Images",
  //     }).catch((error) => console.log(error));

  //     if (!result.cancelled) {
  //       this.setState({
  //         image: result,
  //       });
  //     }
  //   }
  // };

 
  // takePhoto = async () => {
  //   const { status } = await Permissions.askAsync(
  //     Permissions.CAMERA_ROLL,
  //     Permissions.CAMERA
  //   );

  //   if (status === "granted") {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: "Images",
  //     }).catch((error) => console.log(error));

  //     if (!result.cancelled) {
  //       this.setState({
  //         image: result,
  //       });
  //     }
  //   }
  // };

 
  // getLocation = async () => {
  //   const { status } = await Permissions.askAsync(Permissions.LOCATION);
  //   if (status === "granted") {
  //     let result = await Location.getCurrentPositionAsync({});

  //     if (result) {
  //       this.setState({
  //         location: result,
  //       });
  //     }
  //   }
  // };

  //Render Components to screen
  render() {
    let { bgColor } = this.props.route.params;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: bgColor,
        }}
      >
       
        {/* <Button title="Get my location" onPress={this.getLocation} /> */}

        {/* {this.state.location && (
          <MapView
            style={{ width: 300, height: 200 }}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )} */}

        {/* Pick Image from Gallery */}
        {/* <View style={{ flex: 1, justifyContent: "center" }}>
          <Button
            title="Pick an image from the library"
            onPress={this.pickImage}
          /> */}
          {/* Take photo from Camera */}
          {/* <Button title="Take a photo" onPress={this.takePhoto} />
        </View>

        {this.state.image && (
          <Image
            source={{ uri: this.state.image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )} */}

        {/*Gifted Chat Main */}
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{ _id: this.state.user._id, name: this.state.user.name }}
          renderActions={this.renderCustomActions}
        />

        {/* renderInputToolbar={this.renderInputToolbar.bind(this)} */}
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

// Custom Styles
const styles = StyleSheet.create({
  textWrote: {
    paddingTop: "10%",
    marginLeft: "1%",
    fontSize: 24,
    fontWeight: "400",
  },
});
