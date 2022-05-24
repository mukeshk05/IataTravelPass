import React, { Component } from "react";
import { View, StyleSheet, TextInput, SafeAreaView } from "react-native";
import Constants from "expo-constants";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { WebView } from "react-native-webview";
import { child } from "firebase/database";
import { Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

class TravelUpdateScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryName: null,
      showGoogleApiSearchBar: true,
    };
  }

  render() {
    const GOOGLE_PLACES_API_KEY = "AIzaSyBagiOPQ94u_rP8xqlk0QWYEVNM63POkDs";
    return (
      <View style={styles.container}>
        {this.state.showGoogleApiSearchBar && (
          <GooglePlacesAutocomplete
            fetchDetails={true}
            placeholder="Search"
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: "en", // language of the results
            }}
            onPress={(data, details) =>
              details.address_components.forEach((child) => {
                if (child.types[0] == "country") {
                  const contryName = child.long_name.replace(/ /g, "-");
                  this.setState({
                    countryName: contryName,
                    showGoogleApiSearchBar: false,
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
        {this.state.countryName && (
          <SafeAreaView style={{ flex: 1 }}>
            <Button
              icon={({ size, color }) => (
                <Ionicons name="search" size={20} color={"green"} />
              )}
              mode="contained"
              onPress={() =>
                this.setState({
                  countryName: null,
                  showGoogleApiSearchBar: true,
                })
              }
            >
              Search Again
            </Button>
            <WebView
              source={{
                uri:
                  "https://wwwnc.cdc.gov/travel/notices/covid-2/coronavirus-" +
                  this.state.countryName,
              }}
            />
          </SafeAreaView>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 1,
    marginTop: -30,
    backgroundColor: "#ecf0f1",
  },
});

export default TravelUpdateScreen;
