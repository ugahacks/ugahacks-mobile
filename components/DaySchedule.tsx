import { StyleSheet } from "react-native";
import { View, useThemeColor } from "./Themed";
import Event from "./Event";
import React from "react";

export function DaySchedule() {
  const tintColor = useThemeColor({}, "tint");
  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <View style={[styles.sidebar, { borderColor: tintColor }]}>
          <View style={[styles.verticalLine, { backgroundColor: tintColor }]} />
          <View style={[styles.dot, { backgroundColor: tintColor }]} />
          <Event
            title="Event Check-In"
            type="alert"
            location="Miller Learning Center"
            time="5:00pm - 6:30pm"
          />
        </View>
        <View style={[styles.sidebar, { borderColor: tintColor }]}>
          <View style={[styles.verticalLine, { backgroundColor: tintColor }]} />
          <View style={[styles.dot, { backgroundColor: tintColor }]} />
          <Event
            title="Breakfast"
            type="meal"
            location="Miller Learning Center"
            time="5:00pm - 6:30pm"
          />
        </View>
        <View style={[styles.sidebar, { borderColor: tintColor }]}>
          <View style={[styles.verticalLine, { backgroundColor: tintColor }]} />
          <View style={[styles.dot, { backgroundColor: tintColor }]} />
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
    marginBottom: 0,
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 14.75,
  },
  verticalLine: {
    position: "absolute",
    height: "100%",
    width: 1,
    marginLeft: 19,
  },
});

export default DaySchedule;
