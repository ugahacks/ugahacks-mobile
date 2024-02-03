import { Button, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import { router } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { user, userInfo, logOut } = useAuth();

  const handleSignOut = async () => {
    await logOut();
    router.replace("/");
  };

  const handleDeleteAccount = async () => {
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.fieldTitle}>
        {"Name: " + userInfo.first_name + " " + userInfo.last_name}
      </Text>
      <Text style={styles.fieldTitle}>{"Email: " + user.email}</Text>
      <Text style={styles.fieldTitle}>
        {"School: " + (userInfo.school ? userInfo.school : "N/A")}
      </Text>
      <View style={styles.separator} />
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}
        activeOpacity={0.8}
      >
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={handleSignOut}
        activeOpacity={0.8}
      >
        <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "SpaceMonoBold",
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "WorkSans",
    marginTop: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
    backgroundColor: "#eee",
  },
  signOutButton: {
    backgroundColor: "#353935",
    width: "80%",
    borderRadius: 5,
    padding: 10,
    marginLeft: -10,
    marginTop: 20,
  },
  signOutButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteAccountButton: {
    backgroundColor: "#F4574A",
    width: "80%",
    borderRadius: 5,
    padding: 10,
    marginLeft: -10,
    marginTop: 20,
  },
  deleteAccountButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
