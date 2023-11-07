import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignInPage } from "../pages/login/singin.page.js";
import { SignUpPage } from "../pages/login/singup.page.js";

const Stack = createNativeStackNavigator();

export const LoginStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name="SignIn" component={SignInPage} />
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
};
