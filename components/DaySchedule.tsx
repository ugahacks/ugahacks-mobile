import { ScrollView, StyleSheet, Text } from "react-native";
import { View } from "./Themed";
import { Event, EventProps } from "./Event";
import React from "react";

export function Friday({ schedule }) {
  // Filter events to only include those that occur on this day
  const fridayEvents = schedule.filter((event: EventProps) => {
    const eventDate = new Date(event.startTime * 1000); // Convert Unix timestamp to milliseconds
    return eventDate.getDay() === 5; // Check if the day is Friday (5)
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scheduleContainer}>
        {fridayEvents.length > 0 ? (
          fridayEvents.map((event: EventProps, index: number) => (
            <Event
              key={index} // Ideally, use a unique identifier from the event object
              name={event.name}
              tag={event.tag}
              description={event.description}
              location={event.location}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          ))
        ) : (
          <View>
            <Text>
              {" "}
              Calendar isn't available! Are you connected to the internet?
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export function Saturday({ schedule }) {
  // Filter events to only include those that occur on this day
  const saturdayEvents = schedule.filter((event: EventProps) => {
    const eventDate = new Date(event.startTime * 1000); // Convert Unix timestamp to milliseconds
    return eventDate.getDay() === 6; // Check if the day is saturday (5)
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scheduleContainer}>
        {saturdayEvents.length > 0 ? (
          saturdayEvents.map((event: EventProps, index: number) => (
            <Event
              key={index} // Ideally, use a unique identifier from the event object
              name={event.name}
              tag={event.tag}
              description={event.description}
              location={event.location}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          ))
        ) : (
          <View>
            <Text>No Items Available! Are you connected to the internet?</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

export function Sunday({ schedule }) {
  // Filter events to only include those that occur on this day
  const sundayEvents = schedule.filter((event: EventProps) => {
    const eventDate = new Date(event.startTime * 1000); // Convert Unix timestamp to milliseconds
    return eventDate.getDay() === 0; // Check if the day is sunday (5)
  });
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.scheduleContainer}>
        {sundayEvents.length > 0 ? (
          sundayEvents.map((event: EventProps, index: number) => (
            <Event
              key={index} // Ideally, use a unique identifier from the event object
              name={event.name}
              tag={event.tag}
              description={event.description}
              location={event.location}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          ))
        ) : (
          <View>
            <Text>No Items Available! Are you connected to the internet?</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dayContainer: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 40,
  },
  dayButton: {
    backgroundColor: "#C2C2C2",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  dayText: {
    color: "white",
    fontFamily: "SpaceMono",
  },
  selectedDay: {
    backgroundColor: "#4478FD",
  },
  scheduleContainer: {
    marginTop: 0,
    paddingTop: 20,
    width: "100%",
    alignItems: "flex-start",
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
