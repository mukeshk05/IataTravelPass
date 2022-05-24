import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import colors from "../assets/colors";
import Accordion from "react-native-collapsible/Accordion";
import * as Animatable from "react-native-animatable";
import { firebaseDatabase } from "../config/Config";
import { ref, get, child } from "firebase/database";
import { connect } from "react-redux";
import { compose } from "redux";
import { snapshotToArray } from "../helpers/firebaseHelpers";
import { Ionicons } from "@expo/vector-icons";
import { green100 } from "react-native-paper/lib/typescript/styles/colors";
const flightTravelImage = require("../assets/flightTravel.png");

class FlightScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      activeSections: [],
      collapsed: true,
    };
  }

  handlePress = (expanded) => {
    this.setState({
      expanded: !expanded,
    });
  };

  componentDidMount = () => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, `Flights/${this.props.currentUser.user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const fligthArrays = snapshotToArray(snapshot);
          this.setState({
            flights: fligthArrays,
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
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

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>
          {section.title}{" "}
          <Ionicons name="airplane" color={"green"} size={30}></Ionicons>
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

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={{ height: 400 }}>
          <Accordion
            activeSections={this.state.activeSections}
            sections={this.state.flights}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{ position: "absolute", bottom: 20, right: 20 }}
            onPress={() => this.props.navigation.navigate("FlightDetailsForm")}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "green",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 30, marginLeft: 15 }}>
                +
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <SafeAreaView></SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgMain,
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "300",
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
  },
  content: {
    padding: 20,
    backgroundColor: "#fff",
  },
  active: {
    backgroundColor: "rgba(255,255,255,1)",
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

export default wrapper(FlightScreen);
