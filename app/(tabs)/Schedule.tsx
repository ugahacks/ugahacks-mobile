import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View, useThemeColor } from "../../components/Themed";
import { useState } from "react";
import Event from "../../components/Event";
import DaySchedule from "../../components/DaySchedule";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function Schedule() {
  const Tab = createMaterialTopTabNavigator();

  const tintColor = useThemeColor({}, "tabIconDefault");
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
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Friday" component={DaySchedule} />
        <Tab.Screen name="Saturday" component={DaySchedule} />
        <Tab.Screen name="Sunday" component={DaySchedule} />
      </Tab.Navigator>
    </NavigationContainer>
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
