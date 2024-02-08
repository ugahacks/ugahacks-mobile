import React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useAuth } from "../context/AuthContext";
import QRCode from "react-native-qrcode-svg";

export default function ModalScreen() {
  const { user, userInfo, userRegInfo } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.name}>
        {userInfo.first_name + " " + userInfo.last_name}
      </Text>
      <View style={styles.qrContainer}>
        <QRCode value={user.uid} size={300} ecl={"H"} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    marginTop: 50,
  },
  qrContainer: {
    marginTop: 50,
    borderRadius: 10,
    overflow: "hidden",
  },
  statusContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginBottom: 50,
    paddingLeft: 20,
  },
  statusText: {
    padding: 10,
  },
  yes: { color: "green" },
  no: {
    color: "red",
    fontWeight: "bold",
    fontFamily: "SpaceMonoBold",
  },
});
