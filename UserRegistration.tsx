import React, { FC, ReactElement, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";
import { appleAuth } from "@invertase/react-native-apple-authentication";

export const UserRegistration: FC<{}> = ({}): ReactElement => {
  const { signUp, logInWithGoogle, logInWithApple } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpWithEmail = async () => {
    try {
      setLoading(true);
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === ""
      ) {
        alert("Please fill out all boxes before registering");
        return;
      }

      await signUp(firstName, lastName, email, password);
      alert(
        "Please verify your email address by clicking the link that is sent to your email!"
      );
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert(
            "This email is already registered with us. Please login using that email."
          );
          break;
        default:
          alert("There was an error processing your request");
      }
    }
    setLoading(false);
  };

  const googleLogin = async () => {
    try {
      setLoading(true);
      await logInWithGoogle();
    } catch (error: any) {
      alert(error);
    }
    setLoading(false);
  };

  const appleLogin = async () => {
    try {
      setLoading(true);
      await logInWithApple();
    } catch (error: any) {
      alert(error);
    }
    setLoading(false);
  };

  return (
    <ScrollView>
      {!loading ? (
        <View style={Styles.login_wrapper}>
          <View style={Styles.form}>
            <TextInput
              style={Styles.form_input}
              value={email}
              placeholder={"Email"}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
            <TextInput
              style={Styles.form_input}
              value={firstName}
              placeholder={"First Name"}
              onChangeText={(text) => setFirstName(text)}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
            <TextInput
              style={Styles.form_input}
              value={lastName}
              placeholder={"Last Name"}
              onChangeText={(text) => setLastName(text)}
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
            <TextInput
              style={Styles.form_input}
              value={password}
              placeholder={"Password"}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity onPress={signUpWithEmail}>
              <View style={Styles.button}>
                <Text style={Styles.button_label}>{"Sign Up"}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={Styles.login_social}>
            <View style={Styles.login_social_separator}>
              <View style={Styles.login_social_separator_line} />
              <Text style={Styles.login_social_separator_text}>{"or"}</Text>
              <View style={Styles.login_social_separator_line} />
            </View>
            <View style={Styles.login_social_buttons}>
              <TouchableOpacity onPress={googleLogin}>
                <View style={Styles.login_social_button}>
                  <Image
                    style={Styles.login_social_icon}
                    source={require("./assets/icon-google.png")}
                  />
                </View>
              </TouchableOpacity>
              {appleAuth.isSupported && (
                <TouchableOpacity onPress={appleLogin}>
                  <View style={Styles.login_social_button}>
                    <Image
                      style={Styles.login_social_icon}
                      source={require("./assets/icon-apple.png")}
                    />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login" as never)}
            >
              <Text style={Styles.login_footer_text}>
                {"Already have an account? "}
                <Text style={Styles.login_footer_link}>{"Log In"}</Text>
              </Text>
            </TouchableOpacity>
          </>
        </View>
      ) : null}
    </ScrollView>
  );
};
