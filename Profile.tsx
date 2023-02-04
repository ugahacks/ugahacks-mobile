import React, { FC, ReactElement, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useAuth } from "./context/AuthContext";
import QRCode from "react-native-qrcode-svg";

export const Profile: FC<{}> = ({}): ReactElement => {
  const { user, userInfo, getPoints, changedPoints, setChangedPoints, points } =
    useAuth();

  const hacks8Logo = require("./assets/byte_mini.png");

  useEffect(() => {
    if (changedPoints) {
      getPoints(user.uid);
      setChangedPoints(false);
    }
  }, [changedPoints, user]);

  return (
    <>
      <View style={{ flex: 3, alignItems: "center" }}>
        {userInfo.uid ? (
          <>
            <Text style={{ fontSize: 36, color: "white" }}>
              You have {points} points!
            </Text>
            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                marginBottom: 10,
                paddingBottom: 10,
                backgroundColor: "white",
              }}
            >
              <Text style={{ marginBottom: 15, fontSize: 18, color: "black" }}>
                Use this QR code to check-in to events! 🐶
              </Text>
              <View style={{ backgroundColor: "white" }}>
                <QRCode size={250} value={userInfo.uid} />
              </View>
            </View>
          </>
        ) : null}
      </View>
    </>
  );
};
