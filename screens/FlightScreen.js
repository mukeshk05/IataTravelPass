import React, { Component } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import colors from "../assets/colors";

class FlightScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  render() {
    const { modalVisible } = this.state;
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
          <Text>Flight Item</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20 }}
            onPress={() => this.props.navigation.navigate("FlightDetailsForm")}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "green",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 30, marginLeft: 15 }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 70,
            borderTopColor: colors.borderColor,
            borderTopWidth: 0.5,
          }}
        >
          <Text></Text>
        </View>
        <SafeAreaView></SafeAreaView>
      </View>
    );
  }
}

export default FlightScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
});
