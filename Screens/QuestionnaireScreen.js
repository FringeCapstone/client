import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { AirbnbRating } from "react-native-ratings";
import Checkbox from "expo-checkbox";
import firebase from "firebase/compat";
let responses = []; // must declare outside the func to avoid scoping issues
const QuestionnaireScreen = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState("");
  const [text, onChangeText] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let ratingFinal = 0;
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  function handleSubmission(response) {
    if (response === undefined)
        responses.push("");
    else
        responses.push(response);
    handleNextQuestion();
    console.log("adding " + response + " to responses.");
  }
  function pushResponsesToFirestore() {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("journalEntries")
      .add({
        date: firebase.firestore.FieldValue.serverTimestamp(),
        dropdown: responses[0],
        age: responses[1],
        multipleChoice: responses[2],
        rating: responses[3],
        content: responses[4],
      })
      .then(() => console.log("Journal entry added successfully."))
      .catch((error) => console.log("Error adding entry:" + error.message));
    responses = [];
  }
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };
  const handleCheckboxChange = (option) => {
    if (selectedCheckboxes.includes(option)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((item) => item !== option)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, option]);
    }
  };
  const ratingCompleted = (rating) => {
    ratingFinal = rating;
  };
  const logRating = () => {
    console.log("Rating: " + ratingFinal);
  };
  const updateSelectedCheckboxes = () => {
    console.log("Selected Checkboxes:", selectedCheckboxes);
  };

  const QuestionInfo = ({ type }) => {
    let content;
    let dropdownRes;
    if (type == "dropdown") {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>
            {Questions[currentQuestion].question}
          </Text>

            <SelectDropdown
              key={currentQuestion}
              buttonStyle={styles.dropdownButton}
              buttonTextStyle={styles.buttonText}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowText}
              data={Questions[currentQuestion].options}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                dropdownRes = selectedItem;
              }}
            />

          <Pressable
            style={styles.button}
            onPress={() => handleSubmission(dropdownRes)}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      );
    } else if (type == "number") {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>
            {Questions[currentQuestion].question}
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              onChangeNumber(text);
            }}
            value={number}
            placeholder="Age"
            keyboardType="numeric"
            autoFocus={true}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              handleSubmission(number);
              // console.log(number);
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      );
    } else if (type == "multiple choice") {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>
            {Questions[currentQuestion].question}
          </Text>
          <View>
            {Questions[currentQuestion].options.map((answer, index) => (
              <View style={styles.optionContainer} key={index}>
                <Checkbox
                  style={styles.checkbox}
                  value={selectedCheckboxes.includes(answer)}
                  onValueChange={() => handleCheckboxChange(answer)}
                  color={
                    selectedCheckboxes.includes(answer) ? "#4630EB" : undefined
                  }
                />
                <Text>{answer}</Text>
              </View>
            ))}
          </View>
          <Pressable
            style={styles.button}
            onPress={() => {
              handleSubmission(selectedCheckboxes);
              updateSelectedCheckboxes();
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      );
    } else if (type == "rating") {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>
            {Questions[currentQuestion].question}
          </Text>
          <AirbnbRating
            count={10}
            reviews={[""]}
            defaultRating={10}
            size={20}
            onFinishRating={ratingCompleted}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              logRating();
              handleSubmission(ratingFinal);
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      );
    } else if (type == "freetext") {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>
            {Questions[currentQuestion].question}
          </Text>
          <TextInput
            numberOfLines={4}
            maxLength={500}
            style={styles.freeTextInput}
            onChangeText={(text) => {
              onChangeText(text);
            }}
            value={text}
            placeholder="Type..."
            autoFocus={true}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              handleSubmission(text);
              // console.log(number);
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      );
    } else {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>Finished!</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              for (let i = 0; i < responses.length; i++) // debug statement to view responses
                console.log(i + ": " + responses[i]);
              pushResponsesToFirestore(); // add to user's journal entries
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.buttonText}>Back Home</Text>
          </Pressable>
        </View>
      );
    }
    return <View>{content}</View>;
  };

  const Questions = [
    {
      question: "What product helped the most?",
      options: ["Gummies", "Red Light Mask", "Red Light Panel", "None"],
      answer: ["None"],
      type: ["dropdown"],
    },
    {
      question: "How old are you?",
      options: ["Not Applicable"],
      answer: ["Not Applicable"],
      type: ["number"],
    },
    {
      question: "What products have you tried?",
      options: [
        "Gummies",
        "Red Light Mask",
        "Red Light Panel",
        "Red Light Therapy Wrap",
      ],
      answer: ["None"],
      type: ["multiple choice"],
    },
    {
      question: "How would you rate the product?",
      options: ["Not Applicable"],
      answer: ["Not Applicable"],
      type: ["rating"],
    },
    {
      question: "How do you feel?",
      options: ["Not Applicable"],
      answer: ["Not Applicable"],
      type: ["freetext"],
    },
    {
      question: "Final",
      options: ["Final"],
      answer: ["Not Applicable"],
      type: ["Final"],
    },
  ];
  return (
    <View>
      <QuestionInfo type={Questions[currentQuestion].type} />
    </View>
  );
};
export default QuestionnaireScreen;

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    marginTop: Platform.OS === "web" ? "20%" : "40%",
  },
  button: {
    margin: 10,
    width: "70%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  questionText: {
    margin: 20,
    fontFamily: "BoldRedHatMono",
    fontSize: 20,
  },
  answerView: {
    fontSize: 10,
    fontFamily: "BoldRedHatMono",
  },
  dropdownButton: {
    width: "50%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
    margin: 10,
  },
  dropdown: {
    height: "auto",
    backgroundColor: "#444",
    borderRadius: 12,
  },
  rowStyle: {
    padding: 10,
    backgroundColor: "#444",
    borderBottomColor: "#C5C5C5",
  },
  rowText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },  
  freeTextInput: {
    width: "70%",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  optionContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  checkbox: {
    marginLeft: 10,
  },
});
