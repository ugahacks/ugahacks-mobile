import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import { useState } from "react";
import Event from "../../components/Event";
import React from "react";

export default function Schedule() {
  const [day, setDay] = useState("Friday");

  const showFridaySchedule = () => {
    setDay("Friday");
  };
  const showSaturdaySchedule = () => {
    setDay("Saturday");
  };
  const showSundaySchedule = () => {
    setDay("Sunday");
  };
  return (
    <View style={styles.container}>
      <View style={styles.dayContainer}>
        <TouchableOpacity
          style={[styles.dayButton, day === "Friday" && styles.selectedDay]}
          onPress={showFridaySchedule}
          activeOpacity={0.8}
        >
          <Text style={styles.dayText}>FRIDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dayButton, day === "Saturday" && styles.selectedDay]}
          onPress={showSaturdaySchedule}
          activeOpacity={0.8}
        >
          <Text style={styles.dayText}>SATURDAY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dayButton, day === "Sunday" && styles.selectedDay]}
          onPress={showSundaySchedule}
          activeOpacity={0.8}
        >
          <Text style={styles.dayText}>SUNDAY</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.sidebar}>
          <View style={styles.dot} />
          <Event
            title="Event Check-In"
            type="alert"
            location="Miller Learning Center"
            time="5:00pm - 6:30pm"
          />
        </View>
        <View style={styles.sidebar}>
          <View style={styles.dot} />
          <Event
            title="Breakfast"
            type="meal"
            location="Miller Learning Center"
            time="5:00pm - 6:30pm"
          />
        </View>
        <View style={styles.sidebar}>
          <View style={styles.dot} />
          <Event
            title="Intro to Google Cloud"
            type="tech talk"
            location="Miller Learning Center"
            time="5:00pm - 6:30pm"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dayContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  dayButton: {
    backgroundColor: "#C2C2C2",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  dayText: {
    color: "white",
    fontFamily: "SpaceMono",
  },
  selectedDay: {
    backgroundColor: "#4478FD",
  },
  scheduleContainer: {
    marginTop: 40,
    width: "100%",
    alignItems: "flex-start",
  },
  sidebar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
    marginRight: 10,
    marginLeft: "5%",
  },
});
