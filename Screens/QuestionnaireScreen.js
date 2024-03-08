import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const QuestionnaireScreen = ({ navigation }) => {
  let i = 0;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const Questions = [
    {
      question: "What products have you tried?",
      options: ["Gummies", "Red Light Mask", "Red Light Panel", "None"],
      answer: ["None"],
    },
    {
      question: "How old are you?",
      options: ["Not Applicable"],
      answer: ["Not Applicable"],
    },
  ];
  return (
    <View>
      <View style={styles.mainView}>
        <Text style={styles.questionText}>{Questions[i].question}</Text>
        <View style={styles.answerView}>
          <SelectDropdown
            buttonStyle={styles.dropdownButton}
            buttonTextStyle={styles.buttonText}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.rowStyle}
            rowTextStyle={styles.rowText}
            data={Questions[i].options}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
          />
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Next Question</Text>
        </Pressable>
      </View>
    </View>
  );
};
export default QuestionnaireScreen;

const styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    marginTop: "50%",
  },
  button: {
    margin: 20,
    width: "80%",
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
    width: "80%",
    height: 50,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  dropdown: {
    backgroundColor: "#444",
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowStyle: {
    backgroundColor: "#444",
    borderBottomColor: "#C5C5C5",
  },
  rowText: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
