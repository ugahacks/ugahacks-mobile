/**
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserRegistration } from "./UserRegistration";
import { UserLogIn } from "./UserLogIn";
import { UserLogOut } from "./UserLogOut";
import { Profile } from "./Profile";
import Styles from "./Styles";
import { AuthContextProvider } from "./context/AuthContext";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import FlashMessage from "react-native-flash-message";
import Schedule from "./Schedule";
import ScavengerHuntEnter from "./ScavengerHuntEnter";
import ClueQuestion from "./ClueQuestion";
import MainQuestion from "./MainQuestion";
import ScavengerHunt from "./ScavengerHunt";

function UserRegistrationScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image style={Styles.login_header_logo} />
          <Text style={Styles.login_header_text_bold}>
            {"User Registration"}
          </Text>
        </View>
        <UserRegistration />
      </SafeAreaView>
    </>
  );
}

function UserLogInScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <View style={Styles.login_header}>
          <Image style={Styles.login_header_logo} />
          <Text style={Styles.login_header_text_bold}>{"User Login"}</Text>
        </View>
        <UserLogIn />
      </SafeAreaView>
    </>
  );
}

export function LogoTitle() {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 30, height: 30 }}
        source={require("./assets/UGAHacks_General_Byte.png")}
      />
      <Text style={{ color: "white", marginTop: 15, padding: 5, fontSize: 22 }}>
        UGAHacks ByteMobile
      </Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={Styles.login_container}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={{ width: 40, height: 40, marginTop: 10 }}
              source={require("./assets/byte_mini.png")}
            />
            <Text style={{ color: "white", padding: 5, fontSize: 36 }}>
              UGAHacks 8
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              padding: 5,
              fontSize: 18,
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Create your own adventure!
          </Text>
          <Profile />
          <UserLogOut />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// This method instantiates and creates a new StackNavigator
const Stack = createStackNavigator();

const App = () => {
  GoogleSignin.configure({
    webClientId:
      "436222925278-3qrh1gl95i39bv1mjj07k72csce2mgfg.apps.googleusercontent.com",
  });

  const Tab = createBottomTabNavigator();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  type RootStackParamList = {
    Scavenger_Hunt: undefined;
    Clue: {
      clue: string;
      clueAnswer: string;
      nextQuestion: string;
      nextAnswer: string;
      clue_num: number;
    };
    Question: {
      question: string;
      answer: string;
      question_num: number;
    };
  };

  const RootStack = createStackNavigator<RootStackParamList>();

  useEffect(() => {
    auth().onAuthStateChanged((userState) => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return null;
  }

  return (
    <AuthContextProvider>
      <NavigationContainer>
        {!user ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#DC4141",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
                color: "white",
              },
            }}
          >
            <Stack.Group>
              <Stack.Screen
                name="Login"
                component={UserLogInScreen}
                options={{ headerTitle: () => <LogoTitle /> }}
              />
              <Stack.Screen
                name="Sign Up"
                component={UserRegistrationScreen}
                options={{ headerTitle: () => <LogoTitle /> }}
              />
            </Stack.Group>
          </Stack.Navigator>
        ) : (
          <>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: {
                  backgroundColor: "black",
                },
                tabBarActiveTintColor: "white",
                tabBarInactiveTintColor: "white",
                tabBarActiveBackgroundColor: "#DC4141",
                headerStyle: {
                  backgroundColor: "#DC4141",
                },
                headerTintColor: "black",
                headerTitleStyle: {
                  fontWeight: "bold",
                  color: "white",
                },
              }}
            >
              <Tab.Group>
                <Tab.Screen
                  name="Profile"
                  component={HomeScreen}
                  options={{
                    headerTitle: () => <LogoTitle />,
                    tabBarIcon: ({}) => {
                      return (
                        <Image
                          style={{ width: 25, height: 25 }}
                          source={require("./assets/byte_mini.png")}
                        />
                      );
                    },
                  }}
                />
                <Tab.Screen
                  name="Schedule"
                  component={Schedule}
                  options={{
                    headerTitle: () => <LogoTitle />,
                    tabBarIcon: ({}) => {
                      return <Icon name="calendar" size={25} color="white" />;
                    },
                  }}
                />
                <Tab.Screen
                  name="Scavenger Hunt"
                  component={ScavengerHuntEnter}
                  options={{
                    headerTitle: () => <LogoTitle />,
                    tabBarIcon: ({}) => {
                      return <Icon name="search" size={25} color="white" />;
                    },
                  }}
                />
              </Tab.Group>
            </Tab.Navigator>
          </>
        )}
        <FlashMessage position="top" />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
