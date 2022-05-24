import React, { PureComponent } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, ActivityIndicator, Colors } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import CountryFlag from "react-native-country-flag";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firebaseDatabase } from "../config/Config";
import { ref, set, update } from "firebase/database";
import { compose } from "redux";

class UserProfileCreation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: "Dallas TX",
      currentContryCode: "US",
      showGoogleApiSearchBar: true,
      firstName: null,
      lastName: null,
      isLoading: false,
    };
  }

  updateUserProfile = () => {
    this.setState({ isLoading: true });
    if (this.state.firstName && this.state.lastName) {
      update(ref(firebaseDatabase, "user/" + this.props.currentUser.user.uid), {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        currentAddress: this.state.currentAddress,
        currentContryCode: this.state.currentContryCode,
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.setState({ isLoading: false });
        alert(errorCode + errorMessage);
      });
      this.setState({ isLoading: false });
      this.confirmNextScreen();
    }
  };

  confirmNextScreen = () => {
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
        onPress: () => {
          this.props.navigation.navigate("UploadProfilePic");
        },
      },
    ]);
  };

  render() {
    const GOOGLE_PLACES_API_KEY = "AIzaSyBagiOPQ94u_rP8xqlk0QWYEVNM63POkDs";
    return (
      <View style={styles.container}>
        <SafeAreaView></SafeAreaView>
        <View
          style={{
            flex: 12,
            marginTop: 100,
          }}
        >
          <TextInput
            label="First Name"
            onChangeText={(firstName) =>
              this.setState({ firstName: firstName })
            }
            right={<TextInput.Icon name="account-check-outline" />}
          />
          <TextInput
            label="Last Name"
            style={{ marginTop: 10, marginBottom: 10 }}
            onChangeText={(lastName) => this.setState({ lastName: lastName })}
            right={<TextInput.Icon name="account-check-outline" />}
          />

          {this.state.showGoogleApiSearchBar && (
            <GooglePlacesAutocomplete
              fetchDetails={true}
              placeholder="Search Locaton"
              query={{
                key: GOOGLE_PLACES_API_KEY,
                language: "en", // language of the results
              }}
              onPress={(data, details) =>
                details.address_components.forEach((child) => {
                  if (child.types[0] == "country") {
                    this.setState({
                      currentAddress: details.formatted_address,
                      currentContryCode: child.short_name,
                    });
                  }
                })
              }
              onFail={(error) => console.error(error)}
              requestUrl={{
                url:
                  "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/js?key=" +
                  GOOGLE_PLACES_API_KEY +
                  "&libraries=places&callback=initMap",
                useOnPlatform: "web",
              }} // this in only required for use on the web. See https://git.io/JflFv more for details.
            />
          )}
          {this.state.isLoading ? (
            <ActivityIndicator
              animating={true}
              color={Colors.red800}
              size={"large"}
              style={{
                alignContent: "center",
                justifyContent: "center",
                marginBottom: 200,
              }}
            />
          ) : null}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            height: 10,
            alignContent: "center",
          }}
        >
          <Button
            icon="update"
            mode="contained"
            onPress={this.updateUserProfile}
          >
            Update
          </Button>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.bgUnread,
            justifyContent: "center",
            height: 10,
            alignContent: "center",
            borderBottomWidth: 0.6,
            borderTopWidth: 0.6,
          }}
        >
          {this.state.currentContryCode && (
            <Text
              style={{
                marginLeft: 100,
                fontWeight: "bold",
                color: "white",
              }}
            >
              {this.state.currentAddress}{" "}
              <CountryFlag
                isoCode={`${this.state.currentContryCode}`}
                size={25}
              />
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
  formLabel: {
    fontSize: 20,
    color: "#DCDCDC",
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: "#DCDCDC",
  },
  formText: {
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 20,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  data: {
    padding: 15,
    marginTop: 10,
    backgroundColor: "#ddd",
    borderColor: "#888",
    borderWidth: 1 / PixelRatio.get(),
    color: "#777",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    fontSize: 12,
    textAlign: "center",
    color: "#888",
    marginBottom: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleIsLoadingProfilePic: (bool) =>
      dispatch({ type: "UPDATE_PROFILE", payload: bool }),
  };
};

const wrapper = compose(connect(mapStateToProps, mapDispatchToProps));

export default wrapper(UserProfileCreation);
