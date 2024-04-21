import {Button, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../firebase";
import firebase from "firebase/compat";

const JournalScreen = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [currJournal, setCurrJournal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>
    {
      if (!user){
        alert('Please log in before accessing your journals.');
        navigation.replace("LogIn");
      }
    })
    return unsubscribe;
  })
  useEffect(() => {
    const user = auth.currentUser;
    const unsubscribe = firebase.firestore()
        .collection("users").doc(user.uid)
        .collection("journalEntries").onSnapshot(snapshot => {
          const journalData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
          setJournals(journalData);
          if (journalData[0])
            setCurrJournal(journalData[0]);
        });

    return () => unsubscribe();
  }, []);
  const handleJournalSelect = (journal) => {
    setCurrJournal(journal);
    setModalVisible(true);
  }
  return (
      <View style={{flex: 1}}>
        {journals.map(journal => (
            <Button title={currJournal?.date.toDate().toLocaleString()}
              key={journal.id}
              onPress={() => {
                handleJournalSelect(journal);
              }}
            />
        ))}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
          >
          <View>
            <Text> Date: {currJournal?.date.toDate().toLocaleString()}</Text>
            <Text> Dropdown: {currJournal?.dropdown}</Text>
            <Text> Age: {currJournal?.age}</Text>
            <Text> Multiple Choice: {currJournal?.multipleChoice}</Text>
            <Text> Rating: {currJournal?.rating}</Text>
            <Button title ="close" onPress={() => setModalVisible(false)}/>
          </View>
        </Modal>
        <View style={styles.container}>
          <Pressable
              style={styles.questionnaireButton}
              onPress={() => navigation.navigate("Questionnaire")}
          >
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
        </View>
      </View>
  );
};
export default JournalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionnaireButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#AF3025",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    transform: [{ translateX: 0 }, { translateY: -2 }],
  },
  journalRow: {
    margin: 5,
    borderRadius: 20,
    backgroundColor: "lightgrey",
    alignItems: "center",
  },
  journalDate: {
    fontSize: 25,
    borderRadius: 20,
    padding: 5,
    margin: 5,
  },

});