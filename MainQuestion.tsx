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

type Props = StackScreenProps<RootStackParamList, "Question">;

export default function MainQuestion({ route, navigation }: Props) {
  const { userInfo, updateQuestionScavengerHuntStatus } = useAuth();
  const [userInput, setUserInput] = useState("");
  const { question, answer, question_num } = route.params;

  const onPress = async function onPress() {
    if (userInput === answer) {
      showMessage({
        message: "Correct!",
        type: "success",
        color: "white",
        titleStyle: { textAlign: "center", fontSize: 19 },
      });

      // TODO Update db
      const question_field: string = "question" + question_num;
      await updateQuestionScavengerHuntStatus(
        question_field,
        userInfo.uid,
        question_num,
        userInfo.points
      );

      navigation.navigate("Scavenger_Hunt");
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
              Question:
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
            {question}
          </Text>
          <TextInput
            style={Styles.clue_submit_button}
            value={userInput}
            placeholder={""}
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
