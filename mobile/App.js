import { NavigationContainer } from "@react-navigation/native";
import { PaperProvider } from "react-native-paper";

import { MainStack } from "./src/stacks/main.stack.js";
import { Loading } from "./src/components/loading.js";
import React from "react";
import { checkHealth } from "./src/services/health.service.js";
export default function App() {
  const [apiHealth, setApiHealth] = React.useState(null);

  const CheckApiHealth = () =>
    checkHealth()
      .then((apiHealth) => {
        console.log({ apiHealth });
        setApiHealth(true);
      })
      .catch((error) => {
        console.log({ error });
        setApiHealth(false);
      });

  React.useEffect(() => {
    CheckApiHealth();
  }, []);

  if (apiHealth === null) return <Loading />;
  else if (apiHealth === false) return <Loading message={"Serviços indisponível"} tryAgainHandler={CheckApiHealth} />;
  else
    return (
      <PaperProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </PaperProvider>
    );
}
