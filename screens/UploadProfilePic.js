import React from "react";
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
import ActionButton from "./ActionButton";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import { ref, getDownloadURL, uploadBytes, uploadTask } from "firebase/storage";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { compose } from "redux";

import * as ImageHelpers from "../helpers/ImageHelpers";

class UploadProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  componentDidMount() {
    this.checkProfileImage();
  }

  openImageLibrary = async () => {
    const result = await ImageHelpers.openImageLibrary();
    if (result) {
      const downloadUrl = await this.uploadImage(result);
    }
  };

  openCamera = async () => {
    const result = await ImageHelpers.openCamera();
  };

  uploadImage = async (image) => {
    const storageRef = ref(
      firebaseStorage,
      "profile/" + this.props.route.params.user.uid
    );
    try {
      const blob = await ImageHelpers.prepareBlob(image.uri);
      uploadBytes(storageRef, blob).then((snapshot) => {
        console.log("Uploaded a blob or file!" + snapshot);
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          this.setState({
            image: downloadURL,
          });
        });
      });
      blob.close();
    } catch (error) {
      console.log(error);
    }
    //this.props.navigation.navigate("UploadProfilePic");
  };

  openSheet = () => {
    const options = ["Select From Photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        showSeparators: true,
        containerStyle: styles.containerSeet,
        textStyle: styles.text,
        messageTextStyle: styles.message,
        titleTextStyle: styles.title,
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected
        switch (buttonIndex) {
          case 0:
            this.openImageLibrary();
            break;

          case 1:
            this.openCamera();
            break;

          default:
            break;
        }
      }
    );
  };

  checkProfileImage = () => {
    const storageRef = ref(
      firebaseStorage,
      "profile/" + this.props.route.params.user.uid
    );
    getDownloadURL(storageRef)
      .then((url) => {
        this.setState({
          image: url,
        });
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  };

  goToHomeScreen() {
    const userData = this.props.route.params.user;
    console.log(userData);
    this.props.navigation.navigate("HomeDrawer", {
      user: userData,
    });
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
          <Text>Documents</Text>
        </View>
        <View
          style={{
            borderBottomWidth: 0.6,
            flex: 1,
          }}
        >
          {this.state.image && (
            <View>
              <Image source={{ uri: this.state.image }} style={styles.avatar} />
              <TouchableOpacity
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  marginTop: 300,
                  marginLeft: 120,
                }}
                onPress={() => this.goToHomeScreen()}
              >
                <Text style={{ color: "white" }}>Do you want to Continue</Text>
              </TouchableOpacity>
            </View>
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
            onPress={() => this.openSheet()}
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

const wrapper = compose(connectActionSheet);

export default wrapper(UploadProfilePic);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
  containerSeet: {
    borderRadius: 20,
    backgroundColor: colors.bgTextInput,
  },
  message: {
    backgroundColor: "purple",
    color: "white",
  },
  title: {
    backgroundColor: "yellow",
  },
  text: {
    paddingLeft: "40%",
    alignContent: "center",
    justifyContent: "center",
    color: colors.bgUnread,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 0,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80,
  },
});
