import React, { useEffect, useState } from "react";
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
import Icon from "react-native-vector-icons/FontAwesome";
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
    case EventTag.TECH_TALK:
      return "#cd5c5c"; // IndianRed
    default:
      return "white";
  }
}

function ScheduleBuilder(props: {
  schedule: { start: string; eventList: Event[] }[];
  userSchedule: any;
  day: "friday" | "saturday" | "sunday";
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalStartTime, setModalStartTime] = useState("");
  const [modalEndTime, setModalEndTime] = useState("");
  const [modalEventType, setModalEventType] = useState(EventTag.IMPORTANT);
  const [modalLocation, setModalLocation] = useState("");

  const { addToCustomSchedule, removeFromCustomSchedule } = useAuth();

  async function onPress(
    name: string,
    startTime: string,
    day: string,
    isRemove: boolean
  ) {
    setModalVisible(false);

    // add this name to the schedules-users/{uid}/day

    if (!isRemove) {
      await addToCustomSchedule(name, startTime, day);
    } else {
      await removeFromCustomSchedule(name, startTime, day);
    }
  }

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
              <Pressable
                style={[
                  Styles.modal_button_custom,
                  Styles.modal_buttonClose_custom,
                ]}
                onPress={() =>
                  onPress(
                    modalTitle,
                    modalStartTime,
                    props.day,
                    modalTitle in
                      (modalStartTime in props.userSchedule
                        ? props.userSchedule[modalStartTime]
                        : {})
                  )
                }
              >
                <Text style={Styles.modal_textStyle}>
                  {!(
                    modalTitle in
                    (props.userSchedule && modalStartTime in props.userSchedule
                      ? props.userSchedule[modalStartTime]
                      : {})
                  )
                    ? "Add to my schedule"
                    : "Remove from my schedule"}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={{ marginBottom: 20, marginTop: 15 }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Click on each event for more info and add to your schedule!
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              A star in the event means that it is in your schedule
            </Text>
          </View>
          {props.schedule?.map((events, index) => {
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
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ color: "white", fontSize: 18 }}>
                            {event.name}
                          </Text>
                          {event.name in
                          (event.startTime in props.userSchedule
                            ? props.userSchedule[event.startTime]
                            : {}) ? (
                            <Icon name="star" size={20} color="white" />
                          ) : null}
                        </View>
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

function CustomScheduleBuilder(props: {
  schedule: { start: string; eventList: Event[] }[];
  userSchedule: any;
  day: "friday" | "saturday" | "sunday";
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalStartTime, setModalStartTime] = useState("");
  const [modalEndTime, setModalEndTime] = useState("");
  const [modalEventType, setModalEventType] = useState(EventTag.IMPORTANT);
  const [modalLocation, setModalLocation] = useState("");

  const { addToCustomSchedule, removeFromCustomSchedule } = useAuth();

  async function onPress(
    name: string,
    startTime: string,
    day: string,
    isRemove: boolean
  ) {
    setModalVisible(false);

    // add this name to the schedules-users/{uid}/day

    if (!isRemove) {
      await addToCustomSchedule(name, startTime, day);
    } else {
      await removeFromCustomSchedule(name, startTime, day);
    }
  }
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
              <Pressable
                style={[
                  Styles.modal_button_custom,
                  Styles.modal_buttonClose_custom,
                ]}
                onPress={() =>
                  onPress(
                    modalTitle,
                    modalStartTime,
                    props.day,
                    modalTitle in props.userSchedule[modalStartTime]
                  )
                }
              >
                <Text style={Styles.modal_textStyle}>
                  {!(
                    modalTitle in
                    (props.userSchedule && modalStartTime in props.userSchedule
                      ? props.userSchedule[modalStartTime]
                      : {})
                  )
                    ? "Add to my schedule"
                    : "Remove from my schedule"}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={{ marginBottom: 20, marginTop: 15 }}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Add events to your schedule to build your own schedule!
            </Text>
          </View>
          {props.schedule.map((events, index) => {
            if (events.start in props.userSchedule) {
              return (
                <View key={index}>
                  <View>
                    <Text style={{ padding: 5, fontSize: 20, color: "white" }}>
                      {events.start}
                    </Text>
                  </View>

                  {events.eventList.map((event, index) => {
                    if (event.name in props.userSchedule[event.startTime]) {
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
                            <View
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "nowrap",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text style={{ color: "white", fontSize: 18 }}>
                                {event.name}
                              </Text>
                              {event.name in
                              (event.startTime in props.userSchedule
                                ? props.userSchedule[event.startTime]
                                : {}) ? (
                                <Icon name="star" size={20} color="white" />
                              ) : null}
                            </View>
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
                    }
                  })}
                </View>
              );
            }
          })}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default function ScheduleScreen(props: { isFavoriteSchedule: boolean }) {
  const Tab = createMaterialTopTabNavigator();
  const {
    getSchedule,
    getCustomSchedule,
    scheduleFriday,
    scheduleSaturday,
    scheduleSunday,
    myScheduleFriday,
    myScheduleSaturday,
    myScheduleSunday,
    changedFriday,
    setChangedFriday,
    changedSaturday,
    setChangedSaturday,
    changedSunday,
    setChangedSunday,
    changedCustomFriday,
    setChangedCustomFriday,
    changedCustomSaturday,
    setChangedCustomSaturday,
    changedCustomSunday,
    setChangedCustomSunday,
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

  useEffect(() => {
    if (changedCustomFriday) {
      getCustomSchedule("friday");
      setChangedCustomFriday(false);
    }

    if (changedCustomSaturday) {
      getCustomSchedule("saturday");
      setChangedCustomSaturday(false);
    }

    if (changedCustomSunday) {
      getCustomSchedule("sunday");
      setChangedCustomSunday(false);
    }
  }, [changedCustomFriday, changedCustomSaturday, changedCustomSunday]);

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
      {!props.isFavoriteSchedule ? (
        <>
          <Tab.Screen name="Friday">
            {(p) => (
              <ScheduleBuilder
                schedule={scheduleFriday}
                userSchedule={myScheduleFriday}
                day={"friday"}
                {...p}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Saturday">
            {(p) => (
              <ScheduleBuilder
                schedule={scheduleSaturday}
                userSchedule={myScheduleSaturday}
                day={"saturday"}
                {...p}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Sunday">
            {(p) => (
              <ScheduleBuilder
                schedule={scheduleSunday}
                userSchedule={myScheduleSunday}
                day={"sunday"}
                {...p}
              />
            )}
          </Tab.Screen>
        </>
      ) : (
        <>
          <Tab.Screen name="Friday">
            {(p) => (
              <CustomScheduleBuilder
                schedule={scheduleFriday}
                userSchedule={myScheduleFriday}
                day={"friday"}
                {...p}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Saturday">
            {(p) => (
              <CustomScheduleBuilder
                schedule={scheduleSaturday}
                userSchedule={myScheduleSaturday}
                day={"saturday"}
                {...p}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Sunday">
            {(p) => (
              <CustomScheduleBuilder
                schedule={scheduleSunday}
                userSchedule={myScheduleSunday}
                day={"sunday"}
                {...p}
              />
            )}
          </Tab.Screen>
        </>
      )}
    </Tab.Navigator>
  );
}
