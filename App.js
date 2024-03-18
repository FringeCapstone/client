import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ProductsScreen from "./Screens/ProductsScreen";
import JournalScreen from "./Screens/JournalScreen";
import QuestionnaireScreen from "./Screens/QuestionnaireScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  const [loaded] = useFonts({
    RegularRedHatMono: require("./assets/fonts/RedHatMono-VariableFont_wght.ttf"),
    BoldRedHatMono: require("./assets/fonts/static/RedHatMono-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Products" component={ProductsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Questionnaire" component={QuestionnaireScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
