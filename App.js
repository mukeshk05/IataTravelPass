import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { NavigationContainer, DrawerActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LandingScreen from "./screens/LandingScreen";
import HomeScreen from "./screens/HomeScreen";
import PasswordForgetScreen from "./screens/PasswordForgetScreen ";
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import SettingScreen from "./screens/SettingScreen";
import CustomDrawerComponent from "./DrawerNavigator/CustomDrawerComponent";
import FlightScreen from "./screens/FlightScreen";
import DocumentsScreen from "./screens/DocumentsScreen";
import FlightDetailsForm from "./screens/FlightDetailsForm";
import SingupScreen from "./screens/SingupScreen";
import CertificatesScreen from "./screens/CertificatesScreen";
import PrivacyScreen from "./screens/PrivacyScreen";
const Drawer = createDrawerNavigator();
import colors from "./assets/colors";
import BiometricAuthScreen from "./screens/BiometricAuthScreen";
import LoadingScreen from "./screens/LoadingScreen";
import UploadProfilePic from "./screens/UploadProfilePic";
import "react-native-gesture-handler";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={store}>
        <ActionSheetProvider>
          <StackNavigator></StackNavigator>
        </ActionSheetProvider>
      </Provider>
    );
  }
}

const HomeDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: "#e91e63",
        itemStyle: { marginVertical: 5 },
      }}
      // Here we are setting our custom sidebar menu
      drawerContent={(props) => <CustomDrawerComponent {...props} />}
    >
      <Drawer.Screen
        name="HomeScreenD"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ionicons name="ios-home" size={24} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <Ionicons name="ios-settings" size={24} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen name="Password Forget" component={PasswordForgetScreen} />
    </Drawer.Navigator>
  );
};

const RootStack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            title: "Landing",
            headerShown: false,
            headerTitleAlign: "center",
          }}
        />

        <RootStack.Screen
          name="UploadProfilePic"
          component={UploadProfilePic}
          options={{
            title: "Profile Pic",
            headerShown: false,
            headerTitleAlign: "center",
          }}
        />

        <RootStack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            title: "Loading",
            headerShown: false,
            headerTitleAlign: "center",
          }}
        />
        <RootStack.Screen
          name="HomeDrawer"
          component={HomeDrawer}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="FlightScreen"
          component={FlightScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="DocumentsScreen"
          component={DocumentsScreen}
          options={{
            headerShown: false,
          }}
        />

        <RootStack.Screen
          name="CertificatesScreen"
          component={CertificatesScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="PrivacyScreen"
          component={PrivacyScreen}
          options={{
            headerShown: true,
            title: "Privacy",
            headerTitleStyle: {
              color: "white",
              fontWeight: "bold",
            },
            headerTintColor: "#fff",
            headerStyle: {
              backgroundColor: colors.bgUnread,
              borderBottomColor: colors.bgMain,
              borderTopWidth: 1.8,
            },
          }}
        />

        <RootStack.Screen
          name="FlightDetailsForm"
          component={FlightDetailsForm}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          name="SingupScreen"
          component={SingupScreen}
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
        <RootStack.Screen
          name="BiometricAuthScreen"
          component={BiometricAuthScreen}
          options={{
            headerShown: true,
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
