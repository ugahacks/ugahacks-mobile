import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { router } from "expo-router";
import React from "react";

export default function Home() {
  const handleLogin = () => {
    router.replace("/");
  };

  const points = 40280;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Hi Shawn Pradeep,</Text>
      <Text style={styles.points}>{points} pts</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 24,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  points: {
    fontSize: 64,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
});
