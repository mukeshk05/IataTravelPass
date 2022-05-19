import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ref, getDownloadURL, uploadBytes, uploadTask } from "firebase/storage";
import { firebaseStorage, firebaseDatabase } from "../config/Config";
const PrivacyImage = require("../assets/privacy.png");
const DocumentImage = require("../assets/documents.png");
const FlightImage = require("../assets/flight.png");
const LabImage = require("../assets/labProof.png");
const TravelRuleImage = require("../assets/travelUpdate.png");
const defaultProfileIMage = require("../assets/avatar.png");
import { connect } from "react-redux";
import { compose } from "redux";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      data: [
        {
          id: 1,
          title: "YOUR FLIGHTS",
          image: FlightImage,
        },
        {
          id: 2,
          title: "DOCUMENTS",
          image: DocumentImage,
        },
        {
          id: 3,
          title: "CERTIFICATES",
          image: LabImage,
        },
        {
          id: 4,
          title: "PRIVACY",
          image: PrivacyImage,
        },
        {
          id: 5,
          title: "PRIVACY",
          image: TravelRuleImage,
        },
      ],
    };
  }

  readUserData = () => {};

  readProfilePic = () => {
    const storageRef = ref(
      firebaseStorage,
      "profile/" + this.props.route.params.user.uid
    );
    getDownloadURL(storageRef)
      .then((url) => {
        this.setState({
          profileImage: url,
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

  componentDidMount = () => {
    if (!this.props.profilePic) {
      this.setState({
        profileImage: "https://bootdey.com/img/Content/avatar/avatar6.png",
      });
    }
  };

  clickEventListener(item) {
    if (item.id == 1) {
      this.props.navigation.navigate("FlightScreen");
    }

    if (item.id == 2) {
      this.props.navigation.navigate("DocumentsScreen");
    }
    if (item.id == 3) {
      this.props.navigation.navigate("CertificatesScreen");
    }
    if (item.id == 4) {
      this.props.navigation.navigate("PrivacyScreen");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.avatar}
          source={{
            uri: this.state.profileImage,
          }}
        />

        <Text style={styles.name}>Jhon Smith</Text>

        <View style={styles.bodyContent}>
          <FlatList
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.data}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => {
              return item.id;
            }}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => {
                    this.clickEventListener(item);
                  }}
                >
                  <View style={styles.cardFooter}></View>
                  <Image style={styles.cardImage} source={item.image} />
                  <View style={styles.cardHeader}>
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text style={styles.title}>{item.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "blue",
    flex: 1,
  },
  bodyContent: {
    height: 500,
    padding: 30,
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    marginTop: 260,
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
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    marginTop: 218,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor: "blue",
  },
  listContainer: {
    alignItems: "center",
  },
  /******** card **************/
  card: {
    shadowColor: "#00000021",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 2.37,
    shadowRadius: 3.49,

    elevation: 2,
    marginVertical: 10,
    backgroundColor: "white",
    flexBasis: "45%",
    marginHorizontal: 10,
  },
  cardHeader: {
    paddingVertical: 7,
    paddingHorizontal: 4,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    paddingVertical: 2.5,
    paddingHorizontal: 16,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardImage: {
    height: 70,
    width: 100,
    alignSelf: "center",
  },
  title: {
    fontSize: 10,
    flex: 1,
    alignSelf: "center",
    color: "#696969",
  },
});

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
    profilePic: state.auth.profilePic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleIsLoadingProfilePic: (bool) =>
      dispatch({ type: "TOGGLE_IS_LOADING_PROFILE_PIC", payload: bool }),
  };
};

const wrapper = compose(connect(mapStateToProps, mapDispatchToProps));

export default wrapper(HomeScreen);
