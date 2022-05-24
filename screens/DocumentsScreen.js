import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import colors from "../assets/colors";
import ActionButton from "./ActionButton";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  uploadTask,
  push,
  listAll,
  updateMetadata,
} from "firebase/storage";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import { compose } from "redux";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import * as ImageHelpers from "../helpers/ImageHelpers";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import { convertCardImageArray } from "../helpers/firebaseHelpers";

class DocumentsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      documentImage: [],
      documentImage1: [],
      activeSections: [],
      collapsed: true,
    };
  }

  handlePress = (expanded) => {
    this.setState({
      expanded: !expanded,
    });
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderConditionalHeaderTitleText(status) {
    if (status == "true") {
      return (
        <View>
          <Ionicons
            name="checkmark-circle"
            color={"green"}
            size={20}
          ></Ionicons>
        </View>
      );
    }
    return (
      <View>
        <Ionicons
          name="close-circle-outline"
          color={"red"}
          size={20}
        ></Ionicons>
      </View>
    );
  }
  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text
          style={[
            styles.headerText,
            section.status == "true"
              ? styles.headerText
              : styles.approvedStatus,
          ]}
        >
          {section.title}{" "}
          {this.renderConditionalHeaderTitleText(section.status)}
        </Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? "bounceIn" : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  componentDidMount = async () => {
    const storageRef = ref(
      firebaseStorage,
      "documents/" + this.props.currentUser.user.uid
    );
    const res = await listAll(storageRef);
    const images = await convertCardImageArray(res);
    this.setState({
      documentImage1: images,
    });
  };

  openImageLibrary = async () => {
    this.setState({ isLoading: true });
    const result = await ImageHelpers.openImageLibrary();
    if (result) {
      const downloadUrl = await this.uploadImage(result);
    }
  };

  openCamera = async () => {
    const result = await ImageHelpers.openCamera();
  };

  uploadImage = async (image) => {
    const storageRef = ref(firebaseStorage, "documents");
    const newDocument = ref(
      storageRef,
      "/" + this.props.currentUser.user.uid + "/"
    );
    const newDocumentImage = ref(newDocument, "/" + new Date() + "/");
    try {
      const blob = await ImageHelpers.prepareBlob(image.uri);
      const metadata = {
        customMetadata: {
          approved: "false",
        },
      };
      await uploadBytes(newDocumentImage, blob);
      await updateMetadata(newDocumentImage, metadata)
        .then((metadata) => {})
        .catch((error) => {
          console.log(error);
        });

      blob.close();
      this.setState({ isLoading: false });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
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

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View
          style={{
            height: 650,
          }}
        >
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.state.documentImage1}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={true}
          />
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
const mapStateToProps = (state) => {
  return {
    profilePic: state.auth.profilePic,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadProfileImage: (profilePic) =>
      dispatch({ type: "UPLOAD_PROFILE_IMAGE", payload: profilePic }),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  connectActionSheet
)(DocumentsScreen);

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
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 20,
  },
  header: {
    backgroundColor: colors.bgMain,
    padding: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 1,
    color: colors.bgMain,
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
  },
  approvedStatus: {
    color: colors.bgDelete,
  },
  inactive: {
    backgroundColor: colors.bgPrimary,
  },
  selectors: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  selector: {
    backgroundColor: "#F5FCFF",
    padding: 10,
  },
  activeSelector: {
    fontWeight: "bold",
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    padding: 10,
  },
  multipleToggle: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 30,
    alignItems: "center",
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});
