import React, { FC, ReactElement } from "react";
import { Linking, Text, TouchableOpacity, View } from "react-native";
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";

export const UserLogOut: FC<{}> = ({}): ReactElement => {
  const { logOut } = useAuth();

  return (
    <>
      <View style={Styles.login_wrapper}>
        <View style={Styles.form}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(
                "https://join.slack.com/t/ugahacks8/shared_invite/zt-1o90h2zpt-f9uSUcdVqXHkSx6CJ_bxeg"
              );
            }}
          >
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Open Slack"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center" }}>
        <View style={Styles.form}>
          <TouchableOpacity onPress={logOut}>
            <View style={Styles.button}>
              <Text style={Styles.button_label}>{"Logout"}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
