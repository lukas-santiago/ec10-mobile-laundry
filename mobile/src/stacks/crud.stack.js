import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MenuPage } from "../pages/crud/menu.page.js";
import { ServicePage } from "../pages/crud/servico.page.js";

const Stack = createNativeStackNavigator();

export const CrudStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name="Menu" component={MenuPage} />
      <Stack.Screen name="Servicos" component={ServicePage} />
      {/* <Stack.Screen name="Pedidos" component={null} />
      <Stack.Screen name="Notificacoes" component={null} /> */}
    </Stack.Navigator>
  );
};
