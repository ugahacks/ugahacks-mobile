import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user, userInfo, getPoints, changedPoints, setChangedPoints, points } =
    useAuth();
  const handleLogin = () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Hi {userInfo.first_name + " " + userInfo.last_name},
      </Text>
      <Text style={styles.points}>{userInfo.points} pts</Text>
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
