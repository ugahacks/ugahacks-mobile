import { Friday, Saturday, Sunday } from "../../components/DaySchedule";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useIsFocused } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Schedule() {
  const Tab = createMaterialTopTabNavigator();
  const { getSchedule, scheduleTotal } = useAuth(); // Destructure scheduleTotal from useAuth
  const [sortedSchedule, setSortedSchedule] = useState([]);
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused
  useEffect(() => {
    // Only fetch the schedule when the screen is focused
    if (isFocused) {
      getSchedule();
    }
  }, [getSchedule, isFocused]);
  // Use the sorted schedule data directly from the state provided by useAuth
  useEffect(() => {
    if (scheduleTotal) {
      setSortedSchedule(scheduleTotal);
    }
  }, [scheduleTotal]);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Friday">
          {() => <Friday schedule={sortedSchedule} />}
        </Tab.Screen>
        <Tab.Screen name="Saturday">
          {() => <Saturday schedule={sortedSchedule} />}
        </Tab.Screen>
        <Tab.Screen name="Sunday">
          {() => <Sunday schedule={sortedSchedule} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
