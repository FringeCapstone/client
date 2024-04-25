import {Button, Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../firebase";
import firebase from "firebase/compat";

const JournalScreen = ({ navigation }) => {
  const [journals, setJournals] = useState([]);
  const [currJournal, setCurrJournal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const myNav = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user =>
    {
      if (!user){
        alert('Please log in before accessing your journals.');
        myNav.replace("LogIn");
      }
    })
    return unsubscribe;
  }, [myNav])
  useEffect(() => {
    const user = auth.currentUser;
    if (user){
      const unsubscribe = firebase.firestore()
          .collection("users").doc(user?.uid)
          .collection("journalEntries").onSnapshot(snapshot => {
            const journalData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data()}));
            setJournals(journalData);
            if (journalData[0])
              setCurrJournal(journalData[0]);
          });

      return () => unsubscribe();
    }

  }, []);
  const handleJournalSelect = (journal) => {
    setCurrJournal(journal);
    setModalVisible(true);
  }
  const buildMultipleChoice = (arr) => {
    let res = "";
    for (let i = 0; i < arr.length; i++)
    {
      res += arr[i];
      res += " ";
    }
    return res;
  }
  const handleDeletion = (journal) => {
    const user = auth.currentUser;
    if (user) {
      firebase.firestore()
          .collection("users").doc(user.uid)
          .collection("journalEntries").doc(journal.id)
          .delete()
          .then(() => {
            console.log("Journal entry deleted successfully.");
            setModalVisible(false); // Close the modal after deletion
          })
          .catch((error) => {
            console.error("Error deleting journal entry: ", error);
          });
    }
  };
  return (
      <View style={{flex: 1}}>
        {journals.map(journal => (
            <Button title={journal?.date.toDate().toLocaleString()}
              key={journal.id}
              style = {styles.button}
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
          <View style ={styles.centeredView}>
          <View style ={styles.modalView}>
            <Text style={styles.modalText}> Date: {currJournal?.date.toDate().toLocaleString()}</Text>
            <Text style={styles.modalText}> Product That Helped the Most: {currJournal?.dropdown}</Text>
            <Text style={styles.modalText}> Age: {currJournal?.age}</Text>
            <Text style={styles.modalText}> Products you tried: {currJournal?.multipleChoice ? buildMultipleChoice(currJournal?.multipleChoice) : ""}</Text>
            <Text style={styles.modalText}> Rating: {currJournal?.rating}</Text>
            <Text style={styles.modalText}> Content: {currJournal?.content}</Text>
            <Button title ="close" onPress={() => setModalVisible(false)}/>
            <Button title ="delete this entry" onPress={() => {
              handleDeletion(currJournal)
              setModalVisible(false)}
            }/>
          </View>
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
  button: {
    backgroundColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
    transform: [{ translateX: 0 }, { translateY: -2 }],
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
    margin: 10,
    textAlign: 'center',
  },

});