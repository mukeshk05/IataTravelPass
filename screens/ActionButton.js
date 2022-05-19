import * as React from "react";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import colors from "../assets/colors";

import * as ImageHelpers from "../helpers/ImageHelpers";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import { ref, uploadBytes } from "firebase/storage";
//import { ref, set } from "firebase/database";

export default function ActionButton(props) {
  const { showActionSheetWithOptions } = useActionSheet();
  const openSheet = () => {
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
      this.props.navigation.navigate("UploadProfilePic");
    };

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        showSeparators: true,
        containerStyle: styles.container,
        textStyle: styles.text,
        messageTextStyle: styles.message,
        titleTextStyle: styles.title,
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
        onPress={() => openSheet()}
      >
        <Text style={{ color: "white", fontSize: 30, marginLeft: 17 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
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
});
