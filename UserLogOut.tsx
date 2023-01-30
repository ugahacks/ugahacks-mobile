import React, { FC, ReactElement, useState } from "react";
import {
  Linking,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Styles from "./Styles";
import { useAuth } from "./context/AuthContext";

export const UserLogOut: FC<{}> = ({}): ReactElement => {
  const { logOut, deleteAccount } = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    setLoading(true);
    setModalVisible(false);
    await deleteAccount();
    setLoading(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={Styles.centeredView}>
          <View style={Styles.modalView}>
            <Text style={Styles.modalTitle}>
              {
                "Are you sure you want to delete your account? You will lose all data"
              }
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "nowrap",
                flexDirection: "row",
              }}
            ></View>
            <Pressable
              style={[Styles.modal_button, Styles.modal_buttonClose]}
              onPress={deleteUser}
            >
              <Text style={Styles.modal_textStyle}>Delete My Account</Text>
            </Pressable>
            <Pressable
              style={[
                Styles.modal_button_custom,
                Styles.modal_buttonClose_custom,
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={Styles.modal_textStyle}>
                {"Return to Home Screen"}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {!loading ? (
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
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View style={Styles.form}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={Styles.button_delete}>
                  <Text style={Styles.button_label}>{"Delete My Account"}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};
