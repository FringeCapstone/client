import React, {useEffect, useState} from 'react'
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import profileScreen from "./ProfileScreen";
import {updatePassword} from "firebase/auth";

const PassWordChange = () =>
{
    const[password, setPassword] = useState('');
    const navigation = useNavigation();
    const handlePasswordChange = () =>
    {
        const user = auth.currentUser;
        updatePassword(user, password).then(() =>
        {
            navigation.replace("Profile");
        }).catch((error) => {
            console.log(error);
            navigation.replace("Profile");
        });
    }
    return(
        <KeyboardAvoidingView
            style={styles.container}
            behavior={"padding"}>
            <View style = {styles.inputContainer}>
                <TextInput
                    placeholder="Enter new password here"
                    value = {password}
                    onChangeText={text => setPassword(text) }
                    secureTextEntry
                />
            </View>
            <TouchableOpacity
                onPress = {handlePasswordChange}
                style={[styles.button, styles.buttonOutline]}>
                <Text style ={styles.buttonOutLineText}> Change Password </Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );

}
const styles ={
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: '15',
        paddingVertical: '10',
        borderRadius: '5',
        marginTop: '5'
    },
    inputContainer: {
        width: '80%'
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40
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
    buttonOutLineText: {
        fontWeight: '700',
        fontSize: 16
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16
    }

};

export default PassWordChange