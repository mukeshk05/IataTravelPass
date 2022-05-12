import React from "react";
import colors from "../assets/colors";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItemList } from "@react-navigation/drawer";

class CustomDrawerComponent extends React.Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
        <View
          style={{
            height: 150,
            backgroundColor: colors.bgMain,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-bookmarks" size={100} color={colors.logoColor} />
        </View>
        <DrawerItemList {...this.props} />
      </ScrollView>
    );
  }
}

export default CustomDrawerComponent;
