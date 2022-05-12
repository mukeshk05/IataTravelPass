import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import colors from "../assets/colors";
import { Ionicons } from "@expo/vector-icons";

class SingupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            borderBottomColor: colors.borderColor,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: colors.bgColor }}>Sign UP</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginLeft: 40,
            padding: 10,
          }}
        >
          <Ionicons
            name="mail"
            size={20}
            color="green"
            style={{ marginTop: 30 }}
          ></Ionicons>
          <TextInput placeholder="Email" style={styles.inputStyle} />
        </View>
        <View style={styles.inputView}>
          <Ionicons
            name="man"
            size={20}
            color="green"
            style={{ marginTop: 30 }}
          ></Ionicons>
          <TextInput placeholder="Username" style={styles.inputStyle} />
        </View>
        <View style={styles.inputView}>
          <Ionicons
            name="key"
            size={20}
            color="green"
            style={{ marginTop: 30 }}
          ></Ionicons>
          <TextInput placeholder="Password" style={styles.inputStyle} />
        </View>

        <View style={styles.inputView}>
          <Ionicons
            name="key"
            size={20}
            color="green"
            style={{ marginTop: 30 }}
          ></Ionicons>
          <TextInput placeholder="Confirm Password" style={styles.inputStyle} />
        </View>

        <View
          style={{
            marginLeft: 70,
            width: 250,
            height: 40,
            borderTopWidth: 10,
            backgroundColor: "green",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                alignContent: "center",
                justifyContent: "center",
                marginLeft: 60,
              }}
            >
              Register Now
            </Text>
          </TouchableOpacity>
        </View>

        <SafeAreaView></SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
  inputStyle: {
    marginTop: 20,
    width: 250,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
    alignContent: "center",
    justifyContent: "center",
  },
  inputView: {
    flex: 1,
    alignContent: "center",
    marginLeft: 40,
    flexDirection: "row",
    marginTop: -10,
    padding: 10,
  },
  lineStyle: {
    flexDirection: "row",
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: "center",
  },
});

export default SingupScreen;
