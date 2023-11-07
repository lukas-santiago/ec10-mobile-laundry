import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, PaperProvider } from "react-native-paper";

import { CrudStack } from "./src/stacks/crud.stack.js";

const LoadingView = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator animating size="large" />
  </View>
);
export default function App() {
  const [loading] = useState(false);

  useEffect(() => {}, []);

  if (loading) {
    return <LoadingView />;
  } else {
    return (
      <PaperProvider>
        <NavigationContainer>
          <CrudStack />
        </NavigationContainer>
      </PaperProvider>
    );
  }
}
