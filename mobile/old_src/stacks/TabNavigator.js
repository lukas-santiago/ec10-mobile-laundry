import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CardapioStack } from "./CardapioStack";
import { ProdutoStack } from "./ProdutoStack";
import { VendasPage } from "../pages/VendasPage";

export function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Cardápio"
        component={CardapioStack}
        options={{
          tabBarLabel: "Cardápio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="hamburger" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="ProdutosHome"
        component={ProdutoStack}
        options={{
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="sitemap-outline"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Vendas"
        component={VendasPage}
        options={{
          tabBarLabel: "Vendas",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="sale" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const Tab = createMaterialBottomTabNavigator();
