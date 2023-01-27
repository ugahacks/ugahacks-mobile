import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import ClueQuestion from "./ClueQuestion";
import ScavengerHunt from "./ScavengerHunt";
import MainQuestion from "./MainQuestion";

export type RootStackParamList = {
  Scavenger_Hunt: undefined;
  Clue: {
    clue: string;
    clueAnswer: string;
    nextQuestion: string;
    nextAnswer: string;
    clue_num: number;
  };
  Question: {
    question: string;
    answer: string;
    question_num: number;
  };
};

export default function ScavengerHuntEnter() {
  // This method instantiates and creates a new StackNavigator
  const RootStack = createStackNavigator<RootStackParamList>();
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name="Scavenger_Hunt"
        component={ScavengerHunt}
      ></RootStack.Screen>
      <RootStack.Screen name="Clue" component={ClueQuestion}></RootStack.Screen>
      <RootStack.Screen
        name="Question"
        component={MainQuestion}
      ></RootStack.Screen>
    </RootStack.Navigator>
  );
}
