import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Link, router } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleLoginGoogle = async () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in to your account</Text>

      <TouchableOpacity
        style={styles.googleSSOButton}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.googleSSOButtonText}>
          Sign in with Google{" "}
          <Image
            source={require("../assets/icons/google_sso.png")}
            style={{ width: 15, height: 15 }}
          />
        </Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.separator} lightColor="#eee" />
        <Text style={styles.orText}>or</Text>
        <View style={styles.separator} lightColor="#eee" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@email.com"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={handleLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.registerButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "-20%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 12,
    width: "100%",
    marginLeft: 70,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#D2D2D2",
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  registerButton: {
    backgroundColor: "#F4574A",
    width: "80%",
    borderRadius: 5,
    padding: 10,
    marginLeft: -10,
    marginTop: 20,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 30,
    marginTop: 16,
    marginBottom: 32,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: "gray",
  },
  orText: {
    marginHorizontal: 8,
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
  },
  googleSSOButton: {
    backgroundColor: "#F8F8F8",
    width: "60%",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  googleSSOButtonText: { textAlign: "center" },
});
