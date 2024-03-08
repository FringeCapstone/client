import { StyleSheet, Text, View, Image, Pressable } from "react-native";

const HomeScreen = ({ navigation }) => {
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
    </View>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  navigationButton: {
    margin: 10,
  },
  navigationText: {
    fontFamily: "BoldRedHatMono",
    fontSize: 30,
    alignSelf: "center",
  },
  logo: {
    margin: 5,
    resizeMode: "contain",
    alignSelf: "center",
    height: "20%",
  },
});
