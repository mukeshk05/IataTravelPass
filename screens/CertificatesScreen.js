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

class CertificatesScreen extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
    };
  }

  pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({
        image: result.uri,
      });
    }
  };

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
          <Text>Documents</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.6,
            flex: 1,
          }}
        >
          {this.state.image && (
            <Image
              source={{ uri: this.state.image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <View>
          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 20,
              right: 20,
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "green",
              alignContent: "center",
              justifyContent: "center",
            }}
            onPress={this.pickImage}
          >
            <Text style={{ color: "white", fontSize: 30, marginLeft: 17 }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default CertificatesScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
});
