import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firebaseDatabase } from "../config/Config";
import { ref, set } from "firebase/database";
import { user } from "firebase-functions/v1/auth";

class WelcomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  onSingIn = async () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });
      signInWithEmailAndPassword(auth, this.state.email, this.state.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.setState({ isLoading: false });
          this.props.navigation.navigate("Loading");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.setState({ isLoading: false });
          alert(errorCode + errorMessage);
        });
    } else {
      alert("Please enter email and password");
    }
  };

  onSingUp = () => {
    if (this.state.email && this.state.password) {
      this.setState({ isLoading: true });

      auth.createUserWithEmailAndPassword;
      createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      )
        .then((userCredential) => {
          // Signed in
          const userData = userCredential.user;
          set(ref(firebaseDatabase, "user/" + userData.uid), {
            email: userData.email,
            uid: userData.uid,
          });
          this.setState({ isLoading: false });

          this.confirmNextScreen(userData);

          // this.props.navigation.navigate("Loading");
          // ...
        })
        .catch((error) => {
          console.log(error);
          this.setState({ isLoading: false });
          switch (error.code) {
            case "auth/user-not-found":
              alert("A user with that email does not exist.Try Signing Up");
              break;
            case "auth/invalid-email":
              alert("Please enter vaid email address");
              break;
            case "auth/weak-password":
              alert("Password should be at least 6 characters");
              break;
            case "auth/email-already-in-use":
              alert("Email already in use");
              break;
          }
          // ..
        });
    } else {
      alert("Please enter email and passowrd");
    }
  };

  confirmNextScreen = (userData) => {
    Alert.alert("Profile Pic", "Do You Want to Upload Profile Pic", [
      {
        text: "Ask me later",
        onPress: () => this.props.navigation.navigate("Loading"),
      },
      {
        text: "Cancel",
        onPress: () => this.props.navigation.navigate("Loading"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () =>
          this.props.navigation.navigate("UploadProfilePic", {
            user: userData,
          }),
      },
    ]);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#2E424D",
        }}
      >
        {this.state.isLoading ? (
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000,
              },
            ]}
          >
            <ActivityIndicator
              size="large"
              color={colors.logoColor}
            ></ActivityIndicator>
          </View>
        ) : null}

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="ios-boat-sharp" size={150} color={"green"} />
          <Text style={{ fontSize: 20 }}>IATA Travel Pass</Text>
        </View>
        <View
          style={{
            marginTop: -30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email: email })}
            style={Styles.inputStyle}
          ></TextInput>
          <TextInput
            placeholder="password"
            secureTextEntry
            onChangeText={(password) => this.setState({ password: password })}
            style={Styles.inputStyle}
          ></TextInput>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <TouchableOpacity onPress={this.onSingIn}>
            <View
              style={{
                width: 350,
                height: 50,
                backgroundColor: "transparent",
                borderWidth: 0.5,
                marginLeft: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Login</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row", padding: 20 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              New User ?
            </Text>
            <TouchableOpacity onPress={this.onSingUp}>
              <View
                style={{
                  width: 250,
                  height: 50,
                  backgroundColor: "transparent",
                  borderWidth: 0.5,
                  alignItems: "center",
                  justifyContent: "center",
                  borderBottomEndRadius: 0.2,
                  marginLeft: 22,
                }}
              >
                <Text style={{ fontWeight: "bold", color: "white" }}>
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            height: 20,
            borderTopColor: colors.borderColor,
            flex: 1,
          }}
        >
          <View style={Styles.lineStyle}>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            <View>
              <Text style={{ width: 50, textAlign: "center" }}>Or</Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          </View>
          <View
            style={{
              marginLeft: 20,
              flexDirection: "row",
              flex: 1,
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="logo-google"
                size={40}
                color={colors.bgDelete}
              ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="logo-facebook"
                size={40}
                color={colors.bgPrimary}
              ></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons
                name="logo-twitter"
                size={40}
                color={colors.bgPrimary}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  inputStyle: {
    marginTop: 20,
    width: 350,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: -20,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
    flex: 1,
  },
});

export default WelcomeScreen;
