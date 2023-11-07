import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ServicePage } from "../pages/crud/servico.page.js";

const Stack = createNativeStackNavigator();

export const CrudStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Servicos"
      screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
    >
      <Stack.Screen name="Servicos" component={ServicePage} />
      {/* <Stack.Screen name="Pedidos" component={null} />
      <Stack.Screen name="Notificacoes" component={null} /> */}
    </Stack.Navigator>
  );
};
