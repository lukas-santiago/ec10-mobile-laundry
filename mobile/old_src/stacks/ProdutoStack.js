import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { ShoppingCartContextProvider } from "../context/ShoppingCartContext";
import { CategoriaFormPage } from "../pages/CategoriaFormPage";
import { ProdutoFormPage } from "../pages/ProdutoFormPage";
import { ProdutosPage } from "../pages/ProdutosPage";

const Stack = createNativeStackNavigator();

export const ProdutoStack = () => {
  return (
    <ShoppingCartContextProvider>
      <Stack.Navigator
        initialRouteName="Produtos"
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      >
        <Stack.Screen name="Produtos" component={ProdutosPage} />
        <Stack.Screen name="ProdutoForm" component={ProdutoFormPage} />
        <Stack.Screen name="CategoriaForm" component={CategoriaFormPage} />
      </Stack.Navigator>
    </ShoppingCartContextProvider>
  );
};
