import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Styles from "./Styles";
import { RootStackParamList } from "./ScavengerHuntEnter";
import { StackScreenProps } from "@react-navigation/stack";
import { showMessage } from "react-native-flash-message";
import { useAuth } from "./context/AuthContext";

type Props = StackScreenProps<RootStackParamList, "Clue">;

export default function ClueQuestion({ route, navigation }: Props) {
  const { userInfo, updateClueScavengerHuntStatus } = useAuth();
  const [userInput, setUserInput] = useState("");
  const { clue, clueAnswer, nextQuestion, nextAnswer, clue_num } = route.params;

  const onPress = async function onPress() {
    if (userInput === clueAnswer) {
      showMessage({
        message: "Correct!",
        type: "success",
        color: "white",
        titleStyle: { textAlign: "center", fontSize: 19 },
      });

      // Update db
      const clue_field: string = "clue" + clue_num;
      await updateClueScavengerHuntStatus(clue_field, userInfo.uid);

      navigation.navigate("Question", {
        question: nextQuestion,
        answer: nextAnswer,
        question_num: clue_num,
      });
    } else {
      showMessage({
        message: "Incorrect Answer!",
        type: "warning",
        color: "black",
        titleStyle: { textAlign: "center", fontSize: 19 },
      });
      setUserInput("");
    }
  };
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <ScrollView>
          <View style={{ marginTop: 15 }}>
            <Text style={{ color: "white", fontSize: 24, textAlign: "center" }}>
              Clue:
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              marginTop: 15,
              marginBottom: 20,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            {clue}
          </Text>
          <TextInput
            style={Styles.clue_submit_button}
            value={userInput}
            placeholder={"Password"}
            onChangeText={(text) => setUserInput(text)}
          />
          <TouchableOpacity
            style={{ marginLeft: 20, marginRight: 20 }}
            onPress={onPress}
          >
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Submit"}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
