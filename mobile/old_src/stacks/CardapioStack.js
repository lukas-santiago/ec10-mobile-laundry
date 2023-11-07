import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ShoppingCartContextProvider } from "../context/ShoppingCartContext";
import { CardapioPage } from "../pages/CardapioPage";
import { DetalheProdutoPage } from "../pages/DetalheProdutoPage";
import { ShoppingCartPage } from "../pages/ShoppingCartPage";

const Stack = createNativeStackNavigator();

export const CardapioStack = () => {
  return (
    <ShoppingCartContextProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Screen name="Home" component={CardapioPage} />
        <Stack.Screen name="DetalheProduto" component={DetalheProdutoPage} />
        <Stack.Screen name="ShoppingCart" component={ShoppingCartPage} />
      </Stack.Navigator>
    </ShoppingCartContextProvider>
  );
};
