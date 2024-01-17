import React from "react";
import { View, Text, StyleSheet } from "react-native";

type EventType = "alert" | "meal" | "tech talk" | "side event" | "workshop";

interface EventProps {
  title: string;
  type: EventType;
  location: string;
  time: string;
}

const Event: React.FC<EventProps> = ({ title, type, location, time }) => {
  const getCardHeaderColor = (eventType: EventType) => {
    switch (eventType) {
      case "alert":
        return "#FF6C6C";
      case "meal":
        return "#FFB36C";
      case "tech talk":
        return "#6C95FF";
      case "side event":
        return "#D06CFF";
      case "workshop":
        return "#6BD15A";
      default:
        return "#FF6C6C";
    }
  };

  const cardHeaderColor = getCardHeaderColor(type);

  return (
    <View style={styles.container}>
      <View style={[styles.cardHeader, { backgroundColor: cardHeaderColor }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    // width: 300,
    width: "75%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FF6C6C",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // padding: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  title: {
    fontFamily: "SpaceMonoBold",
    color: "white",
    fontSize: 18,
  },
  location: {
    fontSize: 12,
    marginBottom: 4,
    fontFamily: "WorkSans",
  },
  time: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 4,
    fontFamily: "WorkSans",
  },
  cardBody: {
    padding: 8,
    paddingTop: 10,
  },
});

export default Event;
