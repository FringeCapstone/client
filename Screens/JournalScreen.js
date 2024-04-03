import { Pressable, StyleSheet, Text, View} from "react-native";

const JournalScreen = ({ navigation }) => {
  return (
      <View style={{flex: 1}}>
        <View style={styles.journalRow}>
          <Text style={styles.journalDate}>
            Sep 23, 24
          </Text>
        </View>
        <View style={styles.journalRow}>
          <Text style={styles.journalDate}>
            Sep 25, 24
          </Text>
        </View>

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