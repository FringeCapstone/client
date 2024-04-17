import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import {useEffect, useState} from "react";
import {auth} from "../firebase";

const HomeScreen = ({ navigation }) => {
    const [loggedInText, setLoggedInText] = useState("");
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (!user) {
                setLoggedInText(
                    <Pressable
                        style={styles.navigationButton}
                        onPress={() => navigation.navigate("LogIn")}
                    >
                        <Text style={styles.navigationText}>login</Text>
                    </Pressable>
                );
            } else {
                setLoggedInText(
                    <Text style={styles.navigationText}>
                        Welcome, {user.email}!
                    </Text>
                );
            }
        });

        return () => unsubscribe();
    }, [navigation]);
  return (
    <View>
      <Image
        source={require("../assets/fringe-logo-22.png")}
        style={styles.logo}
      />
      <Pressable
        style={styles.navigationButton}
        onPress={() => navigation.navigate("Products")}
      >
        <Text style={styles.navigationText}>products</Text>
      </Pressable>
      <Pressable
        style={styles.navigationButton}
        onPress={() => navigation.navigate("Journal")}
      >
        <Text style={styles.navigationText}>journal</Text>
      </Pressable>
      <Pressable
        style={styles.navigationButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.navigationText}>profile</Text>
      </Pressable>
      <View>
          {loggedInText}
      </View>
      <Image
        style={styles.imageStyle}
        source={require('../assets/imgs/plants_heal_fringe.png')}
      />
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  navigationButton: {
    margin: 10,
    borderWidth: 2,
  },
  navigationText: {
    fontFamily: "BoldRedHatMono",
    fontSize: 40,
    alignSelf: "center",
  },
  logo: {
    margin: 5,
    resizeMode: "contain",
    alignSelf: "center",
    height: 100,
  },
  imageStyle: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 200,
    height: 200,
  },
});
