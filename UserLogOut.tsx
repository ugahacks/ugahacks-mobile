import React, { FC, ReactElement } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";

export const UserLogOut: FC<{}> = ({}): ReactElement => {
  const { logOut } = useAuth();

  return (
    <View style={Styles.login_wrapper}>
      <View style={Styles.form}>
        <TouchableOpacity onPress={logOut}>
          <View style={Styles.button}>
            <Text style={Styles.button_label}>{"Logout"}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
