import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, userInfo, getPoints, changedPoints, setChangedPoints, points } =
    useAuth();

  const handleLogin = () => {
    router.replace("/");
  };

  useEffect(() => {
    if (changedPoints) {
      getPoints(user.uid);
      setChangedPoints(false);
    }
  }, [changedPoints, user]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hi {userInfo.first_name + " " + userInfo.last_name},
      </Text>
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
