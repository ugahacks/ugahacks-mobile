import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

const QRCodeModal = () => (
  <Link href="/modal" asChild>
    <Pressable>
      {({ pressed }) => (
        <FontAwesome
          name="qrcode"
          size={25}
          color={Colors["light"].tint}
          style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        />
      )}
    </Pressable>
  </Link>
);
export default QRCodeModal;
