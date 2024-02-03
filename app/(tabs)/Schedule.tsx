import { Friday, Saturday, Sunday } from "../../components/DaySchedule";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";

export default function Schedule() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen name="Friday" component={Friday} />
        <Tab.Screen name="Saturday" component={Saturday} />
        <Tab.Screen name="Sunday" component={Sunday} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
