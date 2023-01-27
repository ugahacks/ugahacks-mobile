import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "./context/AuthContext";
import { RootStackParamList } from "./ScavengerHuntEnter";
import Styles from "./Styles";

export default function ScavengerHunt() {
  const {
    scavengerHuntStatus,
    getScavengerHuntAnswers,
    getScavengerHuntQuestions,
    changedQuestions,
    setChangedQuestions,
    changedAnswers,
    setChangedAnswers,
    clues,
    questions,
    clueAnswers,
    mainAnswers,
  } = useAuth();
  const [score, setScore] = useState(0);

  // Listen for changes in questions
  useEffect(() => {
    if (changedQuestions) {
      getScavengerHuntQuestions();
      setChangedQuestions(false);
    }
  }, [changedQuestions]);

  // Listen for changes in answers
  useEffect(() => {
    if (changedAnswers) {
      getScavengerHuntAnswers();
      setChangedAnswers(false);
    }
  }, [changedAnswers]);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  function getQuestionNumberInfo(question_num: number) {
    switch (question_num) {
      case 1:
        return {
          clueAnswered: scavengerHuntStatus.clue1,
          clueQuestion: clues.clue1,
          clueAnswer: clueAnswers.clue1_answer,
          question: questions.question1,
          answer: mainAnswers.question1_answer,
        };
      case 2:
        return {
          clueAnswered: scavengerHuntStatus.clue2,
          clueQuestion: clues.clue2,
          clueAnswer: clueAnswers.clue2_answer,
          question: questions.question2,
          answer: mainAnswers.question2_answer,
        };
      case 3:
        return {
          clueAnswered: scavengerHuntStatus.clue3,
          clueQuestion: clues.clue3,
          clueAnswer: clueAnswers.clue3_answer,
          question: questions.question3,
          answer: mainAnswers.question3_answer,
        };
      case 4:
        return {
          clueAnswered: scavengerHuntStatus.clue4,
          clueQuestion: clues.clue4,
          clueAnswer: clueAnswers.clue4_answer,
          question: questions.question4,
          answer: mainAnswers.question4_answer,
        };
      case 5:
        return {
          clueAnswered: scavengerHuntStatus.clue5,
          clueQuestion: clues.clue5,
          clueAnswer: clueAnswers.clue5_answer,
          question: questions.question5,
          answer: mainAnswers.question5_answer,
        };
      case 6:
        return {
          clueAnswered: scavengerHuntStatus.clue6,
          clueQuestion: clues.clue6,
          clueAnswer: clueAnswers.clue6_answer,
          question: questions.question6,
          answer: mainAnswers.question6_answer,
        };
      default:
        return {
          clueAnswered: "",
          clueQuestion: "",
          clueAnswer: "",
          question: "",
          answer: "",
        };
    }
  }

  function onPress(question_num: number) {
    const questionNumberInfo = getQuestionNumberInfo(question_num);
    if (questionNumberInfo.clueAnswered) {
      navigation.navigate("Question", {
        question: questionNumberInfo.question,
        answer: questionNumberInfo.answer,
        question_num: question_num,
      });
    } else {
      navigation.navigate("Clue", {
        clue: questionNumberInfo.clueQuestion,
        clueAnswer: questionNumberInfo.clueAnswer,
        nextQuestion: questionNumberInfo.question,
        nextAnswer: questionNumberInfo.answer,
        clue_num: question_num,
      });
    }
  }

  useEffect(() => {
    if (scavengerHuntStatus.completed) {
      setScore(1000);
    }
  }, [scavengerHuntStatus]);
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ color: "white", fontSize: 24 }}>Scavenger Hunt</Text>
            <Text style={{ color: "white", fontSize: 24 }}>
              {score}/1000 points
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
            The first question gives you a clue to where the password will be
            located in MLC! Once you find the password, it unlocks a question
            that you can answer to unlock the next clue!
          </Text>
          {!scavengerHuntStatus.question1 ? (
            <View style={{ marginBottom: 15 }}>
              <TouchableOpacity onPress={() => onPress(1)}>
                <View style={Styles.scavenger_hunt_button}>
                  <Text style={{ fontSize: 20, color: "black" }}>1st Clue</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginBottom: 15 }}>
              <TouchableOpacity disabled={true}>
                <View style={Styles.scavenger_hunt_button_disabled}>
                  <Text style={{ fontSize: 20, color: "black" }}>1st Clue</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {scavengerHuntStatus.numQuestionsAnswered >= 1 ? (
            !scavengerHuntStatus.question2 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(2)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      2nd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      2nd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 2 ? (
            !scavengerHuntStatus.question3 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(3)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      3rd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      3rd Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 3 ? (
            !scavengerHuntStatus.question4 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(4)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      4th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      4th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 4 ? (
            !scavengerHuntStatus.question5 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(5)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      5th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      5th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
          {scavengerHuntStatus.numQuestionsAnswered >= 5 ? (
            !scavengerHuntStatus.question6 ? (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => onPress(6)}>
                  <View style={Styles.scavenger_hunt_button}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      6th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginBottom: 15 }}>
                <TouchableOpacity disabled={true}>
                  <View style={Styles.scavenger_hunt_button_disabled}>
                    <Text style={{ fontSize: 20, color: "black" }}>
                      6th Clue
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )
          ) : null}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
