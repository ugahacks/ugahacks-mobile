import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Modal,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// @ts-ignore
import { Card } from "react-native-shadow-cards";
import Styles from "./Styles";
import { EventTag } from "./enums/EventTag";
import { useAuth } from "./context/AuthContext";

export interface Event {
  name: string;
  startTime: string;
  endTime: string;
  tag: EventTag;
  location: string;
  description: string;
}

function eventTagColor(tag: EventTag) {
  switch (tag) {
    case EventTag.CEREMONY:
      return "#FFA500"; // Orange
    case EventTag.COMPANY_EVENT:
      return "#FF00FF"; // Magenta
    case EventTag.FOOD:
      return "#00FFFF"; // Cyan
    case EventTag.GAME:
      return "#FFFF00"; // Yellow
    case EventTag.IMPORTANT:
      return "#DC4141"; // UGA Red
    case EventTag.SIDE_EVENT:
      return "#00FF00"; // Lime
    case EventTag.SUBMISSION_EXPO:
      return "#7FFFD4"; // Aquamarine
    case EventTag.WORKSHOP:
      return "#FF0000"; // Red
    default:
      return "white";
  }
}

function ScheduleBuilder(props: {
  schedule: { start: string; eventList: Event[] }[];
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalStartTime, setModalStartTime] = useState("");
  const [modalEndTime, setModalEndTime] = useState("");
  const [modalEventType, setModalEventType] = useState(EventTag.IMPORTANT);
  const [modalLocation, setModalLocation] = useState("");

  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={Styles.centeredView}>
            <View style={Styles.modalView}>
              <Text style={Styles.modalTitle}>{modalTitle}</Text>
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "nowrap",
                  flexDirection: "row",
                }}
              >
                <Text style={Styles.modalText_location}>
                  {modalLocation} |{" "}
                </Text>
                <Text style={Styles.modalText}>
                  {modalStartTime} - {modalEndTime} |
                </Text>
                <Text
                  style={{ color: eventTagColor(modalEventType), fontSize: 16 }}
                >
                  {" "}
                  {modalEventType}
                </Text>
              </View>
              <Text style={Styles.modalText}> {modalDescription}</Text>
              <Pressable
                style={[Styles.modal_button, Styles.modal_buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={Styles.modal_textStyle}>Back to Schedule</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ScrollView>
          {props.schedule.map((events, index) => {
            return (
              <View key={index}>
                <View>
                  <Text style={{ padding: 5, fontSize: 20, color: "white" }}>
                    {events.start}
                  </Text>
                </View>
                {events.eventList.map((event, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setModalDescription(event.description);
                        setModalTitle(event.name);
                        setModalStartTime(event.startTime);
                        setModalEndTime(event.endTime);
                        setModalEventType(event.tag);
                        setModalLocation(event.location);
                        setModalVisible(true);
                      }}
                    >
                      <Card
                        style={{
                          marginLeft: 15,
                          marginBottom: 15,
                          marginRight: 15,
                          padding: 10,
                          backgroundColor: "#212124",
                          cornerRadius: 20,
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>
                          {event.name}
                        </Text>
                        <Text style={{ color: "#B3B3B3", fontSize: 16 }}>
                          {event.location}
                        </Text>
                        <Text style={{ color: "#818181", fontSize: 16 }}>
                          {event.startTime} - {event.endTime}
                        </Text>
                        <Text style={{ color: eventTagColor(event.tag) }}>
                          {event.tag}
                        </Text>
                      </Card>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default function ScheduleScreen() {
  const Tab = createMaterialTopTabNavigator();
  const {
    getSchedule,
    scheduleFriday,
    scheduleSaturday,
    scheduleSunday,
    changedFriday,
    setChangedFriday,
    changedSaturday,
    setChangedSaturday,
    changedSunday,
    setChangedSunday,
  } = useAuth();

  useEffect(() => {
    if (changedFriday) {
      getSchedule("friday");
      setChangedFriday(false);
    }

    if (changedSaturday) {
      getSchedule("saturday");
      setChangedSaturday(false);
    }

    if (changedSunday) {
      getSchedule("sunday");
      setChangedSunday(false);
    }
  }, [changedFriday, changedSaturday, changedSunday]);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "black",
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tab.Screen name="Friday">
        {(props) => <ScheduleBuilder schedule={scheduleFriday} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Saturday">
        {(props) => <ScheduleBuilder schedule={scheduleSaturday} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="Sunday">
        {(props) => <ScheduleBuilder schedule={scheduleSunday} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
