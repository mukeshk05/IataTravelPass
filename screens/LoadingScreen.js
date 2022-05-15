import React, { PureComponent } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import colors from "../assets/colors";
import { auth } from "../config/Config";
import { onAuthStateChanged } from "firebase/auth";

class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.checkIfLogedIn();
  }

  checkIfLogedIn = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //navigate user
        this.props.navigation.navigate("HomeScreen", { user: user });
      } else {
        this.props.navigation.navigate("Landing");
      }
    });
  };

  componentWillUnmount = () => {};

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          size={"large"}
          color={colors.logoColor}
        ></ActivityIndicator>
      </View>
    );
  }
}

export default LoadingScreen;
