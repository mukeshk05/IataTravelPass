import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../assets/colors";

import * as ImageHelpers from "../helpers/ImageHelpers";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import { ref, uploadBytes } from "firebase/storage";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { useActionSheet } from "@expo/react-native-action-sheet";

class ActionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  openSheet = () => {
    const options = ["Select From Photos", "Camera", "Cancel"];
    const cancelButtonIndex = 2; //Element number 2 in the array will be the 'Cancel' button

    const openImageLibrary = async () => {
      const result = await ImageHelpers.openImageLibrary();
      if (result) {
        const downloadUrl = await uploadImage(result);
      }
    };

    const openCamera = async () => {
      const result = await ImageHelpers.openCamera();
    };

    const uploadImage = async (image) => {
      console.log(props.props.user.uid);
      const storageRef = ref(
        firebaseStorage,
        "profile/" + props.props.user.uid
      );
      try {
        const blob = await ImageHelpers.prepareBlob(image.uri);
        uploadBytes(storageRef, blob).then((snapshot) => {
          console.log("Uploaded a blob or file!" + snapshot);
          //   set(ref(firebaseDatabase, "user/" + userData.uid), {
          //     email: userData.email,
          //     uid: userData.uid,
          //   });
        });

        blob.close();
      } catch (error) {
        console.log(error);
      }
      //this.props.navigation.navigate("UploadProfilePic");
    };

    useActionSheet(
      {
        options,
        cancelButtonIndex,
        showSeparators: true,
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected
        switch (buttonIndex) {
          case 0:
            openImageLibrary();
            break;

          case 1:
            openCamera();
            break;

          default:
            break;
        }
      }
    );
  };

  render() {
    return (
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
    );
  }
}

export default ActionButton;
