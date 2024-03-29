import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Icon } from "react-native-elements";
import { useNavigation, useRoute } from "@react-navigation/native";
import { auth, db } from "../../firebase";

const BottomNav = (parm) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    db.collection("Users")
      .doc(auth.currentUser?.email)
      .get()
      .then((doc) => {
        setData(doc.data());
        setLoading(false);
      });

    return () => {
      setData();
    };
  }, []);

  return (
    <>
      {!loading ? (
        <View
          style={
            route.name == "Notifications"
              ? [styles.container, { top: Platform.OS == "ios" ? 20 : 0 }]
              : route.name === "Option"
              ? [styles.container, { top: Platform.OS == "ios" ? -5 : "2%" }]
              : styles.container
          }
        >
          <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.bottomNavItem}>
              <Icon
                style={styles.icon}
                color={route.name != "Home" ? "#000" : "#89CFF0"}
                reverseColor
                name={data?.Worker ? "user" : "home"}
                type="font-awesome-5"
                size={35}
                onPress={() => {
                  data?.Worker
                    ? navigation.replace("WorkerProfile")
                    : navigation.replace("Home");
                }}
              />
            </TouchableOpacity>
            {data?.Worker ? (
              <TouchableOpacity style={styles.bottomNavItem}>
                <Icon
                  style={styles.icon}
                  color={route.name != "" ? "#000" : "#89CFF0"}
                  reverseColor
                  name="home-repair-service"
                  type="MaterialIcons"
                  size={35}
                  onPress={() => {
                    if (route.name != "Notifications") {
                      navigation.replace("Notifications");
                    }
                  }}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity style={styles.bottomNavItem}>
                  <Icon
                    style={styles.icon}
                    color={route.name != "" ? "#000" : "#89CFF0"}
                    reverseColor
                    name="notifications"
                    type="Ionicons"
                    size={35}
                    onPress={() => {
                      navigation.replace("Accepted");
                    }}
                  />
                </TouchableOpacity>
              </>
            )}

            {data?.Worker ? (
              <TouchableOpacity style={styles.bottomNavItem}>
                <Icon
                  style={styles.icon}
                  color={route.name != "" ? "#000" : "#89CFF0"}
                  reverseColor
                  name="home"
                  type="font-awesome-5"
                  size={35}
                  onPress={() => {
                    if (route.name != "Home") {
                      navigation.replace("Home");
                    }
                  }}
                />
              </TouchableOpacity>
            ) : (
              <></>
            )}
            <View>
              {!auth.currentUser ? (
                <>
                  <Icon
                    style={styles.icon}
                    reverseColor
                    name="login"
                    type="Entypo"
                    size={35}
                    onPress={() => navigation.replace("Login")}
                  />
                </>
              ) : (
                <>
                  <TouchableOpacity style={styles.bottomNavItem}>
                    <Icon
                      style={styles.icon}
                      color={route.name === "Option" ? "#89CFF0" : "#000"}
                      reverseColor
                      name="settings"
                      type="feather"
                      size={35}
                      onPress={() => navigation.replace("Option")}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS === "ios" ? 0.08 : 0.08,
    top: Platform.OS === "ios" ? "8.5%" : "1%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomNav: {
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: "200%",
    width: "100%",
    position: "absolute",
    backgroundColor: "white",
    bottom: Platform.OS === "ios" ? -5 : 0,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    paddingBottom: 5,
  },
  bottomNavItem: {
    alignItems: "center",
    justifyContent: "center",
    color: "black",
  },
  bottomNavItemAdd: {
    color: "black",
    color: "white",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconPlus: {
    position: "relative",
    color: "black",
    color: "white",
  },
});
