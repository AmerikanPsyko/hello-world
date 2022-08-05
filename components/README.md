# Career Foundry React Native Chat App "Hello-World"

## Description of App

Hellow World is a simple chat app created with React Native for Android, and iOS devices to send
chat messages, get Geolocation, upload pictures via image gallery, and take pictures using the 
devices built in camera

## Key stories for app usage

* As a new user, I want to be able to enter a chat easily
* As a user, I want to be able to send messages to family and friends
* As a user, I want to send images to friends and family using Gallery, or devices built in camera
* As a user, I want to share my Geolocation 
* As a user, I want to be able to read messages if i'm offline

## Features

* Users can enter their name, and choose a desired background color for the chat
* Chat page will display conversation, and action buttons (Select Image, Camera, Location, Cancel)
* Data can be accessed while online, as well as offline

## Tech Specs

* Technologies Used: 
    - React Native
    - Expo 
    - Google Firebase/Firestore
    - Gifted Chat

* Chat conversations are stored in Google Firestore Database
* Authentication is set to Anonymous via Google Firebase Auth
* Chats are stored locally
* App can access users data (Images, Location)
* App can access users hardware (Camera)
* Location is sent to chat via map view image

## Installation

* Dependencies
    - Expo
       ```npm i expo-cli -g```

* For Windows and Linux: Install [Android Studio](https://developer.android.com/studio)
For more information how to setup emulator, check [Here](https://docs.expo.dev/workflow/android-studio-emulator/?redirected)

* Install Expo Go app on your mobile device (Google Play, Apple App Store)

##Getting Started

* Install dependencies: ```npm i```
* Start the Application from Terminal: expo start or npm start
* Launch Expo Go App on mobile device and scan QR code
* Launch App on installed Emulator: "Run on Android device/Emulator" or "Run on iOS Emulator" or "Run in Web Browser"

## Dependencies

* [Install Dependencies](/package.json)

## Google Firebase/Firestore

* Create Account
    [Google Firebase](https://firebase.google.com/)
    [Google Firebase Setup and Documentation](https://firebase.google.com/docs/web/setup)

* Sign into Google Firebase account you created
* Select "Create Project" and select all default options until "Finished"
* Install Firebase to your project ```npm i firebase```
* In your Firebase project in the browser, open up "Settings", then "General" tab. Under the section "Your apps", link Firebase to app by clicking the tag icon
* After connecting, it will generate configurations for different platforms. Here, click "Firestore for Web" and then copy the contents of the config object info to config/firebaseConfig.dist.js file. Initialize the App by adding ```import firebase from firebase``` at the top of the file firebase.js and initialize the app there like so: ```const firebaseApp = initializeApp(firebaseConfig)```
* Change the name in the reference to the Firestore collection in components/chat.js file from currently "messages" to the name choosen for the collection
* In "Storage", be sure the check the "Rules" tab and change ```allow read, write: false``` to ```allow read, write: true``` 
