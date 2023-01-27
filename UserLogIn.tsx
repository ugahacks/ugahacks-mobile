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

export const UserLogIn: FC<{}> = ({}): ReactElement => {
  const { logIn, logInWithGoogle } = useAuth();
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function errorCodeRedirect(code: string) {
    switch (code) {
      case "auth/user-not-found":
        alert(
          "Email not found! Please sign up with your email before logging in!"
        );
        break;
      case "auth/wrong-password":
        alert(
          "Incorrect password. If you forgot your password, please go on mybyte.ugahacks.com"
        );
        break;
      case "auth/too-many-requests":
        alert(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password on mybyte.ugahacks.com or try again later."
        );
        break;
      default:
        alert("Error, please try again");
    }
  }

  const logInWithEmail = async () => {
    try {
      const isSuccess = await logIn(email, password);

      if (!isSuccess) {
        // Not verified
        alert(
          "Email was not verified. Please verify your email by clicking the link sent to your email."
        );
      }
    } catch (error: any) {
      errorCodeRedirect(error.code);
    }
  };

  const googleLogin = async () => {
    try {
      await logInWithGoogle();
    } catch (error: any) {
      alert(error);
    }
  };

  return (
    <ScrollView>
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
            value={password}
            placeholder={"Password"}
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity onPress={logInWithEmail}>
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Sign in"}</Text>
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
          </View>
        </View>
        <>
          <TouchableOpacity
            onPress={() => navigation.navigate("Sign Up" as never)}
          >
            <Text style={Styles.login_footer_text}>
              {"Don't have an account? "}
              <Text style={Styles.login_footer_link}>{"Sign up"}</Text>
            </Text>
          </TouchableOpacity>
        </>
      </View>
    </ScrollView>
  );
};
