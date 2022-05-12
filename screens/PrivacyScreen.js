import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import colors from "../assets/colors";
import * as ImagePicker from "expo-image-picker";

class PrivacyScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.3,
            borderBottomColor: colors.borderColor,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Information
          </Text>
        </View>
        <View
          style={{
            height: 80,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.borderColor,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Email
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Mobile No
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: colors.borderColor,
            alignContent: "center",
            justifyContent: "center",
            height: 70,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.bgSuccess,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Account Setting
          </Text>
        </View>
        <View
          style={{
            height: 250,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.borderColor,
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Two Factor Authentication
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Pattern Lock
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Change Login Password
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: colors.bgColor,
              alignContent: "flex-start",
              alignItems: "center",
              marginLeft: 10,
            }}
          >
            Delete Account
          </Text>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("BiometricAuthScreen")
            }
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.bgColor,
                alignContent: "flex-start",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              Biometric Authentication
            </Text>
          </TouchableOpacity>
        </View>

        <View></View>
      </View>
    );
  }
}

export default PrivacyScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
});
