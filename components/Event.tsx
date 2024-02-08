import React from "react";
import { Text, StyleSheet } from "react-native";
import { View, useThemeColor } from "./Themed";
import moment from "moment";
type EventType = "alert" | "meal" | "tech_talk" | "side_event" | "workshop";
export interface EventProps {
  name: string;
  tag: EventType;
  description: string;
  location: string;
  startTime: number;
  endTime: number;
}

export const Event: React.FC<EventProps> = ({
  name,
  tag,
  location,
  description,
  startTime,
  endTime,
}) => {
  const tintColor = useThemeColor({}, "tint");
  const getCardHeaderColor = (eventType: EventType) => {
    switch (eventType) {
      case "alert":
        return "#FF6C6C";
      case "meal":
        return "#FFB36C";
      case "tech_talk":
        return "#6C95FF";
      case "side_event":
        return "#D06CFF";
      case "workshop":
        return "#6BD15A";
      default:
        return "#FF6C6C";
    }
  };

  const formattedStartTime = moment.unix(startTime).format("h:mm a");
  const formattedEndTime = moment.unix(endTime).format("h:mm a");
  const cardHeaderColor = getCardHeaderColor(tag);

  return (
    <View style={[styles.sidebar, { borderColor: tintColor }]}>
      <View style={[styles.verticalLine, { backgroundColor: tintColor }]} />
      <View style={[styles.dot, { backgroundColor: tintColor }]} />
      <View style={styles.container}>
        <View style={[styles.cardHeader, { backgroundColor: cardHeaderColor }]}>
          <Text style={styles.title}>{name}</Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.location}>{location}</Text>
          <Text style={styles.time}>
            {formattedStartTime} - {formattedEndTime}
          </Text>
        </View>
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
  sidebar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
    width: "100%",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: 14.75,
  },
  verticalLine: {
    position: "absolute",
    height: "100%",
    width: 1,
    marginLeft: 19,
  },
});

export default Event;
