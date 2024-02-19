import { StyleSheet, Text, View } from "react-native";

const ProfileScreen = ({ navigation, route }) => {
  return (
    <View>
      {/* <Text>This is {route.params.name}'s profile</Text>; */}
      <Text>Profile working...</Text>
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
});
