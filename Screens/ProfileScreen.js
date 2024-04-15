import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";

const ProfileScreen = ({ navigation, route }) => {

  // if user is not logged in, redirect them to the login page
  const myNav = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>
    {
      if (!user)
      {
        alert('Please log in before accessing journals.');
        myNav.replace("LogIn");
      }

    })
    return unsubscribe;
  })
  const handleLogOut = () =>
  {
    auth
        .signOut()
        .then(() =>
        {
          console.log("Logged Out");
        })
        .catch(error => alert(error.message));
  }
  const handlePasswordChange = () =>
  {
      navigation.replace("PasswordChange");
  }
  return (
      <View>
        <Text>
          Hello {auth.currentUser?.email}!
        </Text>
        <View
          style={styles.buttonContainer}>
          <TouchableOpacity
              onPress = {handlePasswordChange}
              style={[styles.button, styles.buttonOutline]}>
            <Text style ={styles.buttonOutLineText}> Change Password </Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress = {handleLogOut}
            style={[styles.button, styles.buttonOutline]}>
          <Text style ={styles.buttonOutLineText}> Log Out </Text>
        </TouchableOpacity>

        </View>
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
  button: {
    backgroundColor: 'azure',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'azure',
    borderWidth: 2
  },
  buttonOutlineText: {
    fontWeight: '700',
    fontSize: 16
  }
});
