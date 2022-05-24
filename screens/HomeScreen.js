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
import { firebaseStorage, firebaseDatabase } from "../config/Config";
const PrivacyImage = require("../assets/privacy.png");
const DocumentImage = require("../assets/documents.png");
const FlightImage = require("../assets/flight.png");
const LabImage = require("../assets/labProof.png");
const TravelRuleImage = require("../assets/travelUpdate.png");
const defaultProfileIMage = require("../assets/avatar.png");
import { connect } from "react-redux";
import { compose } from "redux";
import { ref, set, get, child } from "firebase/database";
import { Ionicons } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import colors from "../assets/colors";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImage: null,
      currentAddress: null,
      userDisplayName: null,
      currentContryCode: "US",
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

  componentDidMount = async () => {
    await this.readUserData();
  };

  readUserData = async () => {
    const dbRef = ref(firebaseDatabase);
    await get(child(dbRef, `user/${this.props.currentUser.user.uid}`)).then(
      (userData) => {
        this.setState({
          userDisplayName:
            userData.val().firstName + "  " + userData.val().lastName,
          currentAddress: userData.val().currentAddress,
          currentContryCode: userData.val().currentContryCode,
        });
      }
    );
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
    if (item.id == 5) {
      this.props.navigation.navigate("TravelUpdateScreen");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: this.props.profilePic }} />

        <Text style={styles.name}>{this.state.userDisplayName}</Text>
        <View
          style={{
            flex: 4,
            flexDirection: "column",
            height: 30,
            width: 300,
          }}
        ></View>
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
        <View style={{ flex: 16 }}></View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.bgUnread,
            justifyContent: "center",
            height: 1,
            alignContent: "center",
            borderBottomWidth: 0.6,
            borderTopWidth: 0.6,
            flexDirection: "column",
          }}
        >
          <Ionicons
            name="location-sharp"
            size={30}
            color={"green"}
            style={{ marginLeft: 60, marginTop: 15 }}
          ></Ionicons>
          {this.state.currentContryCode && (
            <Text
              style={{
                marginLeft: 100,
                fontWeight: "bold",
                color: "white",
                marginTop: -40,
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
    backgroundColor: "blue",
    flex: 1,
  },
  bodyContent: {
    height: 500,
    padding: 30,
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    marginTop: 220,
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
    marginTop: 50,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    marginTop: 190,
  },
  address: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
    alignContent: "center",
    alignSelf: "center",
    position: "absolute",
    marginTop: 240,
    marginLeft: 70,
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
    uploadProfileImage: (profilePic) =>
      dispatch({ type: "UPLOAD_PROFILE_IMAGE", payload: profilePic }),
  };
};

const wrapper = compose(connect(mapStateToProps, mapDispatchToProps));

export default wrapper(HomeScreen);
