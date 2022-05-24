import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import colors from "../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { firebaseDatabase } from "../config/Config";
import { ref, set, push } from "firebase/database";

const FlightDetailsForm = (props) => {
  const [fromFlight, setFromFlight] = useState("");
  const [toFlight, setToFlight] = useState("");
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [arrivaldatePickerVisible, setArrivalDatePickerVisible] =
    useState(false);
  const propsData = useSelector((state) => state);
  const showArrivalDatePicker = () => {
    setArrivalDatePickerVisible(true);
  };

  const hideArrivalDatePicker = () => {
    //setArrivalCal1Visiable();
    setArrivalDatePickerVisible(false);
  };

  const handleArrivalConfirm = (dateTime) => {
    setArrivalFormatted(FormatDate(dateTime));
    hideArrivalDatePicker();
  };

  const [Formatted, setFormatted] = useState("");

  const [ArrivalFormatted, setArrivalFormatted] = useState("");

  const [isArrivalCalVisiable, setArrivalCalVisiable] = useState(true);

  const setArrivalCal1Visiable = () => {
    setArrivalCalVisiable(false);
  };

  const [isDepCalVisiable, setDepCalVisiable] = useState(true);

  const setDepartureCalVisiable = () => {
    setDepCalVisiable(false);
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    //setDepartureCalVisiable();
    setDatePickerVisible(false);
  };

  const handleConfirm = (dateTime) => {
    setFormatted(FormatDate(dateTime));
    hideDatePicker();
  };

  const FormatDate = (data) => {
    let dateTimeString =
      data.getDate() +
      "/" +
      (data.getMonth() + 1) +
      "/" +
      data.getFullYear() +
      " ";

    var hours = data.getHours();
    var minutes = data.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    dateTimeString = dateTimeString + hours + ":" + minutes + " " + ampm;

    return dateTimeString;
  };

  const addFlightDtailsToDB = () => {
    if (fromFlight) {
      const flightRef = ref(
        firebaseDatabase,
        "Flights/" + propsData.auth.currentUser.user.uid
      );
      const newflightRef = push(flightRef);
      set(newflightRef, {
        fromFlight: fromFlight,
        toFlight: toFlight,
        departureDate: Formatted,
        ArrivalDate: ArrivalFormatted,
      });
      props.navigation.navigate("FlightScreen");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={{ justifyContent: "space-around" }}>
        <TextInput
          placeholder="From"
          style={styles.inputStyle}
          value={fromFlight}
          onChangeText={(newValue) => setFromFlight(newValue)}
        />
        <TextInput
          placeholder="To"
          style={styles.inputStyle}
          value={toFlight}
          onChangeText={(newValue) => setToFlight(newValue)}
        />
      </View>
      <View style={{ flex: 2, height: 400 }}>
        <View
          style={{
            flex: 1,
            color: "green",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold", marginLeft: -10 }}>
            Departure
          </Text>
          {isDepCalVisiable && (
            <TouchableOpacity onPress={showDatePicker}>
              <Ionicons
                name="calendar"
                size={50}
                color={"green"}
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              margin: 10,
              marginLeft: 20,
            }}
          >
            {Formatted ? Formatted : ""}
          </Text>
          <DateTimePickerModal
            isVisible={datePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Arrival</Text>
          {isArrivalCalVisiable && (
            <TouchableOpacity onPress={showArrivalDatePicker}>
              <Ionicons
                name="calendar"
                size={50}
                color={"green"}
                style={{
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                  marginLeft: 40,
                }}
              />
            </TouchableOpacity>
          )}
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              margin: 10,
              marginLeft: 25,
            }}
          >
            {ArrivalFormatted ? ArrivalFormatted : ""}
          </Text>
          <DateTimePickerModal
            isVisible={arrivaldatePickerVisible}
            mode="datetime"
            onConfirm={handleArrivalConfirm}
            onCancel={hideArrivalDatePicker}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <View>
          <TouchableOpacity onPress={addFlightDtailsToDB}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                fontWeight: "bold",
                color: "white",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
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
});

export default FlightDetailsForm;
