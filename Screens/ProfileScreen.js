import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import text from "react-native-web/src/exports/Text";
import {EmailAuthProvider} from "@firebase/auth";

const ProfileScreen = ({ navigation, route }) => {

  // if user is not logged in, redirect them to the login page
  const [ModalVisible, setModalVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const myNav = useNavigation();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>
    {
      if (!user)
      {
        alert('Please log in before accessing your profile.');
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
  const deleteAccount = (password) =>{
    // verifying password
    const user = auth.currentUser;
    const userCredentials = EmailAuthProvider.credential(user.email, password);
    user.reauthenticateWithCredential(userCredentials)
        .then(() =>{ // correct password, proceed with deletion
            user.delete().then(() => {console.log("User deleted successfully.")})
        }).catch((error)=>{console.log(error.message)
                           alert("Incorrect password.")}) // incorrect password
        .catch((error) => {console.log(error.message)
                           alert("Deletion failed.")}) // Other network errors
  }
  return (
      <View>
        <View style>
          <Text style = {styles.greetingText}>
            Hello {auth.currentUser?.email}!
          </Text>
        </View>
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
            <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutLineText}> Delete Account </Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Enter your password to confirm account deletion. (This cannot be undone).</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={true}
                            onChangeText={text => setPasswordInput(text)}
                        />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(false);
                                    deleteAccount(passwordInput);
                                }}
                                style={[styles.button, styles.buttonConfirm]}>
                                <Text style={styles.buttonText}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setModalVisible(false)}} style={[styles.button, styles.buttonCancel]}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    width: '40%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    alignItems: 'center'
  },
  buttonConfirm: {
      width: '80%',
      backgroundColor: 'green'
  },
  buttonCancel: {
      width: '80%',
      backgroundColor: 'red'
  },
    buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'azure',
    borderWidth: 2
  },
  buttonOutlineText: {
    fontWeight: '700',
    fontSize: 16,
    fontFamily: "RedHatMono"
  },
  centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
  },
  greetingText: {
    fontSize: 20,
    fontFamily: "BoldRedHatMono",
    margin: 10,
    textAlign: 'center'
  },
  modalButtonContainer:{

  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
       width: 0,
       height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
