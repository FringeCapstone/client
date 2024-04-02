import { Pressable, StyleSheet, Text, View} from "react-native";

const JournalScreen = ({ navigation }) => {
  return (
    <View style={{flex: 1}}>
      <Text>This is Journal Screen...</Text>
      <View style={styles.container}>
      <Pressable style={styles.journalButton}>
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
  journalButton: {
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
});
