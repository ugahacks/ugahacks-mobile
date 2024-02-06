import { StyleSheet } from "react-native";
import { View, useThemeColor } from "./Themed";
import Event from "./Event";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

// Event highlight types: type EventType = "alert" | "meal" | "tech_talk" | "side_event" | "workshop";

//TODO
// grab this data from Firebase collection
//

const placeholderStartTime = 1609479530;
const placeholderEndTime = 1609452300;

export function DaySchedule() {
  const tintColor = useThemeColor({}, "tint");
  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <Event
          title="Event Check-In"
          type="alert"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
        <Event
          title="Breakfast"
          type="meal"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
        <Event
          title="Intro to Google Cloud"
          type="tech_talk"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
      </View>
    </View>
  );
}

/*export function Friday() {
  const { scheduleFriday } = useAuth();

  useEffect(() => {
      scheduleFriday()
  }, []);
  return scheduleFriday;
}
*/
export function Friday() {
  const { getSchedule } = useAuth();
  const schedule = getSchedule(); // This is where you use the hook
  // Filter events to only include those that occur on this day
  const fridayEvents = schedule.filter((event) => {
    const eventDate = new Date(event.startTime * 1000); // Convert Unix timestamp to milliseconds
    return eventDate.getDay() === 6; // Check if the day is Saturday (6)
  });
  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        {fridayEvents.length > 0 ? (
          fridayEvents.map((event, index) => (
            <Event
              key={index} // Ideally, use a unique identifier from the event object
              title={event.title}
              type={event.type}
              location={event.location}
              startTime={event.startTime}
              endTime={event.endTime}
            />
          ))
        ) : (
          <View>
            {/* Display a message or placeholder when there are no events */}
            No events scheduled for this day.
          </View>
        )}
      </View>
    </View>
  );
}

export function Saturday() {
  const tintColor = useThemeColor({}, "tint");
  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <Event
          title="Event Check-In"
          type="alert"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
        <Event
          title="Breakfast"
          type="meal"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
        <Event
          title="Intro to Google Cloud"
          type="tech_talk"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
      </View>
    </View>
  );
}

export function Sunday() {
  const tintColor = useThemeColor({}, "tint");
  return (
    <View style={styles.container}>
      <View style={styles.scheduleContainer}>
        <Event
          title="Event Check-In"
          type="alert"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
        <Event
          title="Breakfast"
          type="meal"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
        <Event
          title="Intro to Google Cloud"
          type="tech_talk"
          location="Miller Learning Center"
          startTime={placeholderStartTime}
          endTime={placeholderEndTime}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 40,
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

export default DaySchedule;