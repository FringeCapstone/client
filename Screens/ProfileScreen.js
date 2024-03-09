import { StyleSheet, Text, View } from "react-native";
import {useEffect} from "react";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";

const ProfileScreen = ({ navigation, route }) => {

  const myNav = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>
    {
      if (user)
      {
        alert(`logged in as ${user.email}`);
      }
      else if (!user)
      {
        alert('not logged in!');
        myNav.replace("LogIn");
      }

    })
    return unsubscribe;
  })
  return (
    <View>
      {/* <Text>This is {route.params.name}'s profile</Text>; */}
      <Text>Hello {auth.currentUser?.email}!</Text>
    </View>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
