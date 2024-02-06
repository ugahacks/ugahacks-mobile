import { Friday, Saturday, Sunday } from "../../components/DaySchedule";
import React, { useEffect, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Schedule() {
  const Tab = createMaterialTopTabNavigator();
  const { getSchedule } = useAuth();
  const [sortedSchedule, setSortedSchedule] = useState([]);
  useEffect(() => {
    const schedule = getSchedule();
    // Sort the schedule by startTime
    const sorted = schedule.sort((a, b) => a.startTime - b.startTime);
    setSortedSchedule(sorted);
  }, [getSchedule]);
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
