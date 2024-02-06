import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  appleAuth,
  AppleRequestResponseFullName,
} from "@invertase/react-native-apple-authentication";

export interface UserType {
  email: string | null;
  uid: string | null;
}

interface EventRegistered {
  HACKS8: boolean | null;
}

export interface UserInfoType {
  uid: string | null;
  first_name: string | null;
  last_name: string | null;
  points: number | null;
  registered: EventRegistered | null;
  //user_type: Users | null;
}

export const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    uid: null,
    first_name: null,
    last_name: null,
    points: null,
    registered: null,
    //user_type: null
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [points, setPoints] = useState(0);
  const [changedPoints, setChangedPoints] = useState(true);
  const [scheduleFriday, setScheduleFriday] = useState([]);
  const [scheduleSaturday, setScheduleSaturday] = useState([]);
  const [scheduleSunday, setScheduleSunday] = useState([]);
  const [scheduleTotal, setScheduleTotal] = useState([]);
  const [myScheduleFriday, setMyScheduleFriday] = useState({});
  const [myScheduleSaturday, setMyScheduleSaturday] = useState({});
  const [myScheduleSunday, setMyScheduleSunday] = useState({});
  const [changedFriday, setChangedFriday] = useState(false);
  const [changedSaturday, setChangedSaturday] = useState(false);
  const [changedSunday, setChangedSunday] = useState(false);
  const [changedCustomFriday, setChangedCustomFriday] = useState(false);
  const [changedCustomSaturday, setChangedCustomSaturday] = useState(false);
  const [changedCustomSunday, setChangedCustomSunday] = useState(false);

  // Change this variable for prod or dev
  const isStage = true;
  let schedule = "schedule-uh9";
  let userDoc = "users";
  let userSchedulesDoc = "schedules-users";
  let userESportsDoc = "user-e-sports-details";
  let userWorkshopDoc = "user-workshop-details";
  let userRegistrationDoc = "user-registration-details";

  if (isStage) {
    schedule = "schedule-uh9-stage";
    userDoc = "users-stage";
    userSchedulesDoc = "schedules-users-stage";
    userESportsDoc = "user-e-sports-details-stage";
    userWorkshopDoc = "user-workshop-details-stage";
    userRegistrationDoc = "user-registration-details-stage";
  }

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((curr_user) => {
      if (curr_user) {
        setUser({
          email: curr_user.email,
          uid: curr_user.uid,
        });
        setUserInformation(curr_user.uid);
      } else {
        setUser({ email: null, uid: null });
        resetUserInformation();
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  // Point change listener
  useEffect(() => {
    if (user.uid == null) {
      return;
    }

    const unsubscribe = firestore()
      .collection(userDoc)
      .doc(user.uid)
      .onSnapshot(() => {
        setChangedPoints(true);
      });

    return () => unsubscribe();
  }, [user]);

  // Friday change listener
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(schedule)
      .doc("friday")
      .onSnapshot(() => {
        setChangedFriday(true);
      });

    return () => unsubscribe();
  }, [user]);

  // Saturday Change Listener
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(schedule)
      .doc("saturday")
      .onSnapshot(() => {
        setChangedSaturday(true);
      });

    return () => unsubscribe();
  }, [user]);

  // Sunday Change Listener
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(schedule)
      .doc("sunday")
      .onSnapshot(() => {
        setChangedSunday(true);
      });

    return () => unsubscribe();
  }, [user]);

  // Custom Schedule Change Listener
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc("friday")
      .onSnapshot(() => {
        setChangedCustomFriday(true);
      });

    return () => unsubscribe();
  }, [user]);

  // Custom Schedule Change Listener
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc("saturday")
      .onSnapshot(() => {
        setChangedCustomSaturday(true);
      });

    return () => unsubscribe();
  }, [user]);

  // Custom Schedule Change Listener
  useEffect(() => {
    const unsubscribe = firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc("sunday")
      .onSnapshot(() => {
        setChangedCustomSunday(true);
      });

    return () => unsubscribe();
  }, [user]);

  const validUser = () => {
    if (user) {
      return true;
    }

    return false;
  };

  function getFirstAndLastNameFromGoogleName(
    full_name: string | null
  ): [string, string] {
    // if name does not exist
    if (!full_name) {
      return ["", ""];
    }

    let first_name, last_name, rest;
    [first_name, last_name, ...rest] = full_name.split(" ");

    return [first_name, last_name];
  }

  const signUp = async (
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ) => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);

      const user = res.user;
      const name = first_name + " " + last_name;

      await firestore().collection(userDoc).doc(user.uid).set({
        uid: user.uid,
        first_name: first_name,
        last_name: last_name,
        name: name,
        authProvider: "local",
        email: email,
        points: 0,
        registered: {},
        added_time: firestore.FieldValue.serverTimestamp(),
      });

      user.sendEmailVerification();
      auth().signOut();
    } catch (err: any) {
      throw err;
    }
  };

  const logIn = async (email: string, password: string) => {
    const res = await auth().signInWithEmailAndPassword(email, password);
    const user = res.user;
    const docSnap = await firestore().collection(userDoc).doc(user.uid).get();

    if (!user.emailVerified) {
      setUser({ uid: null, email: null });
      resetUserInformation();
      auth().signOut();
      return false; // TODO Throw error
    }

    setUserInformation(user.uid);

    return true;
  };

  const resetPassword = async (email: string) => {
    await auth().sendPasswordResetEmail(email);
  };

  const logInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      GoogleSignin.configure({
        iosClientId:
          "436222925278-vd50v44es0r9t8mm292cjpqv7p2a07o3.apps.googleusercontent.com",
      });

      // Get user id token
      const { idToken } = await GoogleSignin.signIn();

      // Create a google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in the user with the credential
      const res = await auth().signInWithCredential(googleCredential);

      const google_user = res.user;

      const docSnap = await firestore()
        .collection(userDoc)
        .doc(google_user.uid)
        .get();

      const [first_name, last_name] = getFirstAndLastNameFromGoogleName(
        google_user.displayName
      );

      if (!docSnap.exists) {
        await firestore().collection(userDoc).doc(google_user.uid).set({
          uid: google_user.uid,
          first_name: first_name,
          last_name: last_name,
          name: google_user.displayName,
          authProvider: "google",
          email: google_user.email,
          points: 0,
          registered: {},
          added_time: firestore.FieldValue.serverTimestamp(),
        });
      } // Check if scavenger hunt users exist

      setUserInformation(google_user.uid);
    } catch (err: any) {
      console.log(err);
    }
  };

  const logInWithApple = async () => {
    try {
      // Start apple sign in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // If request was successful, extract token
      const { identityToken, nonce } = appleAuthRequestResponse;

      // Get email and name
      // Only get on first login, subsequent logins will return null so first login must be saved
      const email = appleAuthRequestResponse.email;
      const full_name: AppleRequestResponseFullName | null =
        appleAuthRequestResponse.fullName;
      const first_name = full_name?.givenName;
      const last_name = full_name?.familyName;

      // can be null
      if (identityToken) {
        // create a Firebase "AppleAuthProvider" credential
        const appleCredential = auth.AppleAuthProvider.credential(
          identityToken,
          nonce
        );

        // Start a Firebase auth request
        const userCredential =
          await auth().signInWithCredential(appleCredential);

        // User is signed in, trigger the onAuthStateChanged useEffect
        const apple_user = userCredential.user;

        const docSnap = await firestore()
          .collection(userDoc)
          .doc(apple_user.uid)
          .get();

        if (!docSnap.exists) {
          await firestore()
            .collection(userDoc)
            .doc(apple_user.uid)
            .set({
              uid: apple_user.uid,
              first_name: first_name,
              last_name: last_name,
              name: first_name + " " + last_name,
              authProvider: "apple",
              email: email,
              points: 0,
              registered: {},
              added_time: firestore.FieldValue.serverTimestamp(),
            });
        }

        // Check if scavenger hunt users exist

        setUserInformation(apple_user.uid);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const setUserInformation = async (uid: string | null) => {
    const docSnap = await firestore()
      .collection(userDoc)
      .doc(uid ? uid : "")
      .get();

    if (!docSnap.exists) {
      return null;
    }

    setUserInfo({
      uid: docSnap.data()?.uid,
      first_name: docSnap.data()?.first_name,
      last_name: docSnap.data()?.last_name,
      points: docSnap.data()?.points,
      registered: docSnap.data()?.registered,
      //user_type: docSnap.data().user_type,
    });
  };

  function parseDaytime(time: string) {
    let [hours, minutes] = time
      .substring(0, time.length - 3)
      .split(":")
      .map(Number);
    if (time.includes("PM") && hours !== 12) hours += 12;
    return 1000 /*ms*/ * 60 /*s*/ * (hours * 60 + minutes);
  }

  const addToCustomSchedule = async (
    name: string,
    startTime: string,
    day: "friday" | "saturday" | "sunday"
  ) => {
    // add this name to the schedules-users/{uid}/day
    await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc(day)
      .set(
        {
          [startTime]: {
            [name]: true,
          },
        },
        { merge: true }
      );
  };

  const removeFromCustomSchedule = async (
    name: string,
    startTime: string,
    day: "friday" | "saturday" | "sunday"
  ) => {
    // add this name to the schedules-users/{uid}/day
    await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc(day)
      .set(
        {
          [startTime]: {
            [name]: firestore.FieldValue.delete(),
          },
        },
        { merge: true }
      );
    removeEmptyField(startTime, day);
  };

  const removeEmptyField = async (
    startTime: string,
    day: "friday" | "saturday" | "sunday"
  ) => {
    const docSnap = await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc(day)
      .get();

    const mySchedule = docSnap.data();

    for (let time in mySchedule) {
      if (Object.keys(mySchedule[time]).length === 0) {
        await firestore()
          .collection(userSchedulesDoc)
          .doc(user.uid ? user.uid : "")
          .collection(schedule)
          .doc(day)
          .set(
            {
              [startTime]: firestore.FieldValue.delete(),
            },
            { merge: true }
          );
      }
    }
  };

  const getCustomSchedule = async function getCustomSchedule(
    day: "friday" | "saturday" | "sunday"
  ) {
    const docSnap = await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid ? user.uid : "")
      .collection(schedule)
      .doc(day)
      .get();

    switch (day) {
      case "friday":
        const myFriday = docSnap.data();

        if (!myFriday) {
          setMyScheduleFriday({});
          return;
        }

        setMyScheduleFriday(myFriday);
        return;
      case "saturday":
        const mySaturday = docSnap.data();

        if (!mySaturday) {
          setMyScheduleSaturday({});
          return;
        }

        setMyScheduleSaturday(mySaturday);
        return;
      case "sunday":
        const mySunday = docSnap.data();

        if (!mySunday) {
          setMyScheduleSunday({});
          return;
        }

        setMyScheduleSunday(mySunday);
        return;
      default:
        return;
    }
  };

  const getSchedule = useCallback(async function getSchedule() {
    try {
      const scheduleSnap = await firestore()
        .collection("schedule-uh9-stage")
        .doc("events")
        .get();
      const eventIds = scheduleSnap.data()?.events;
      console.log("EventIds:", eventIds);
      if (!eventIds) {
        setScheduleTotal([]);
        console.log("No event IDs");
        return;
      }
      const scheduleData = await Promise.all(
        eventIds.map(async (id: string) => {
          const docSnap = await firestore().collection("events").doc(id).get();
          return docSnap.data();
        })
      );
      const sortedSchedule = scheduleData.sort((a, b) => {
        // Assuming startTime is a timestamp, we need to compare the seconds or milliseconds
        return (
          (a.startTime.seconds || a.startTime) -
          (b.startTime.seconds || b.startTime)
        );
      });
      setScheduleTotal(sortedSchedule);
    } catch (error) {
      console.error("Error fetching schedule:", error);
      // Handle the error appropriately
    }
  }, []);

  /*
  const getSchedule_legacy = async function getSchedule(
    day: "friday" | "saturday" | "sunday"
  ) {
    const docSnap = await firestore().collection(schedule).doc(day).get();

    switch (day) {
      case "friday":
        const fridaySchedule = docSnap.data()?.fridaySchedule;

        const sortedFridaySchedule = fridaySchedule?.sort(
          (time1: { start: string }, time2: { start: string }) => {
            return (
              +new Date("1970/01/01") +
              parseDaytime(time1.start) -
              (+new Date("1970/01/01") + parseDaytime(time2.start))
            );
          }
        );

        if (!sortedFridaySchedule) {
          setScheduleFriday([]);
          return;
        }

        setScheduleFriday(sortedFridaySchedule);
        return;

      case "saturday":
        const saturdaySchedule = docSnap.data()?.saturdaySchedule;

        const sortedSaturdaySchedule = saturdaySchedule?.sort(
          (time1: { start: string }, time2: { start: string }) => {
            return (
              +new Date("1970/01/01") +
              parseDaytime(time1.start) -
              (+new Date("1970/01/01") + parseDaytime(time2.start))
            );
          }
        );
        if (!sortedSaturdaySchedule) {
          setScheduleSaturday([]);
          return;
        }
        setScheduleSaturday(sortedSaturdaySchedule);
        return;

      case "sunday":
        const sundaySchedule = docSnap.data()?.sundaySchedule;

        const sortedSundaySchedule = sundaySchedule?.sort(
          (time1: { start: string }, time2: { start: string }) => {
            return (
              +new Date("1970/01/01") +
              parseDaytime(time1.start) -
              (+new Date("1970/01/01") + parseDaytime(time2.start))
            );
          }
        );
        if (!sortedSundaySchedule) {
          setScheduleSunday([]);
          return;
        }
        setScheduleSunday(sortedSundaySchedule);
        return;

      default:
        return;
    }
  };
  */

  const resetUserInformation = () => {
    setUserInfo({
      uid: null,
      first_name: null,
      last_name: null,
      points: null,
      registered: null,
    });
  };

  const getPoints = async (uid: string | null) => {
    if (!uid) {
      return -1;
    }
    const docSnap = await firestore()
      .collection(userDoc)
      .doc(uid ? uid : "")
      .get();

    if (!docSnap.exists) {
      return null;
    }
    setPoints(docSnap.data()?.points);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    resetUserInformation();
    await auth().signOut();
  };

  const deleteAccount = async () => {
    if (!user.uid) {
      return;
    }
    // First remove all uid references in db
    await firestore().collection(userDoc).doc(user.uid).delete();
    await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid)
      .collection(schedule)
      .doc("friday")
      .delete();
    await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid)
      .collection(schedule)
      .doc("saturday")
      .delete();
    await firestore()
      .collection(userSchedulesDoc)
      .doc(user.uid)
      .collection(schedule)
      .doc("sunday")
      .delete();
    await firestore().collection(userESportsDoc).doc(user.uid).delete();
    await firestore().collection(userWorkshopDoc).doc(user.uid).delete();
    await firestore().collection(userRegistrationDoc).doc(user.uid).delete();

    // Finally delete the account
    auth()
      .currentUser?.delete()
      .then(() => console.log("User deleted"))
      .catch((error) => console.log(error));

    await logOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userInfo,
        signUp,
        logIn,
        resetPassword,
        logInWithGoogle,
        logInWithApple,
        logOut,
        validUser,
        setUserInformation,
        getPoints,
        scheduleFriday,
        myScheduleFriday,
        scheduleSaturday,
        myScheduleSaturday,
        scheduleSunday,
        myScheduleSunday,
        setMyScheduleFriday,
        setMyScheduleSaturday,
        setMyScheduleSunday,
        getSchedule,
        changedFriday,
        setChangedFriday,
        changedSaturday,
        setChangedSaturday,
        changedSunday,
        setChangedSunday,
        changedCustomFriday,
        setChangedCustomFriday,
        changedCustomSaturday,
        setChangedCustomSaturday,
        changedCustomSunday,
        setChangedCustomSunday,
        changedPoints,
        setChangedPoints,
        points,
        addToCustomSchedule,
        removeFromCustomSchedule,
        getCustomSchedule,
        deleteAccount,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
