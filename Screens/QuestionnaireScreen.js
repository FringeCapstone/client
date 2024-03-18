import { Pressable, StyleSheet, Text, View, TextInput} from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const QuestionnaireScreen = ({ navigation }) => {
  const [number, onChangeNumber] = React.useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const QuestionInfo = ({ type }) => {
    let content;
    if (type == "dropdown") {
      content = (
        <View style={styles.mainView}>
          <Text style={styles.questionText}>
            {Questions[currentQuestion].question}
          </Text>
          <View style={styles.answerView}>
            <SelectDropdown
              key={currentQuestion}
              buttonStyle={styles.dropdownButton}
              buttonTextStyle={styles.buttonText}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.rowStyle}
              rowTextStyle={styles.rowText}
              data={Questions[currentQuestion].options}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
            />
          </View>
          <Pressable style={styles.button} onPress={handleNextQuestion}>
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
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Age"
            keyboardType="numeric"
          />
          <Pressable
            style={styles.button}
            // onPress={(handleNextQuestion) => {
            //   console.log(number);
            // }}
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

          <Pressable style={styles.button} onPress={handleNextQuestion}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      );
    } else {
      content = <Text>Error</Text>;
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
      options: ["Gummies", "Red Light Mask", "Red Light Panel", "None"],
      answer: ["None"],
      type: ["multiple choice"],
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
    marginTop: "40%",
  },
  button: {
    margin: 10,
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
    margin: 10,
  },
  dropdown: {
    backgroundColor: "#444",
    borderRadius: 12,
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
});
