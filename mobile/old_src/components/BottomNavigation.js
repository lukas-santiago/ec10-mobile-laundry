import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";

import { CardapioPage } from "../pages/CardapioPage";

export const CustomBottomNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "hamburgerMenu",
      title: "Cardápio",
      focusedIcon: "hamburger",
    },
    { key: "products", title: "Produtos", focusedIcon: "sitemap-outline" },
    { key: "sales", title: "Vendas", focusedIcon: "sale" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    hamburgerMenu: () => <CardapioPage />,
    products: () => <Text>Albums</Text>,
    sales: () => <Text>Recents</Text>,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      sceneAnimationEnabled
      sceneAnimationType="opacity"
    />
  );
};
