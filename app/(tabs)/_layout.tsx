import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import QRCodeModal from "../../components/QRCodeModal";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "UGAHACKS",
          headerTitleAlign: "left",
          headerTitleStyle: {
            letterSpacing: 3,
          },
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => <QRCodeModal />,
        }}
      />
      <Tabs.Screen
        name="Schedule"
        options={{
          headerTitle: "UGAHACKS",
          headerTitleAlign: "left",
          headerTitleStyle: {
            letterSpacing: 3,
          },
          tabBarLabel: "Schedule",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="qrcode"
                    size={25}
                    color={Colors["light"].text}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerTitle: "UGAHACKS",
          headerTitleAlign: "left",
          headerTitleStyle: {
            letterSpacing: 3,
          },
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="qrcode"
                    size={25}
                    color={Colors["light"].text}
                    style={{
                      marginRight: 15,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}
