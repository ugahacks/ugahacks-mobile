import { StyleSheet } from "react-native";
import DaySchedule from "../../components/DaySchedule";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function Schedule() {
  const Tab = createMaterialTopTabNavigator();

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
