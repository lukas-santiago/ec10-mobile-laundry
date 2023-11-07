import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  PaperProvider,
  DefaultTheme,
} from "react-native-paper";

import { TabNavigator } from "./src/stacks/TabNavigator";

const theme = {
  ...DefaultTheme, // or MD3DarkTheme
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#E8AA17", // Laranja suave
    primaryContainer: "#E87817",
    secondary: "#FF634733", // Vermelho-alaranjado para bom contraste
    secondaryContainer: "#FF6347",
    tertiary: "#FFD700", // Amarelo para variação de cor
    tertiaryContainer: "#FFD700",
    surface: "#FFFFFF", // Branco para fundo
    surfaceVariant: "#FFA726",
    surfaceDisabled: "#E0E0E0", // Cinza claro para elementos desativados
    background: "#F5F5F5", // Cinza claro para fundo geral
    error: "#FF0000", // Vermelho para erro
    errorContainer: "#FF0000",
    onPrimary: "#000000", // Texto sobre laranja deve ser preto para contraste
    onPrimaryContainer: "#000000",
    onSecondary: "#FFFFFF", // Texto sobre vermelho-alaranjado deve ser branco para contraste
    onSecondaryContainer: "#FFFFFF",
    onTertiary: "#000000", // Texto sobre amarelo deve ser preto para contraste
    onTertiaryContainer: "#000000",
    onSurface: "#000000", // Texto sobre branco deve ser preto para contraste
    onSurfaceVariant: "#000000",
    onSurfaceDisabled: "#A9A9A9", // Texto sobre cinza claro deve ser cinza escuro para contraste
    onError: "#FFFFFF", // Texto sobre vermelho deve ser branco para contraste
    onErrorContainer: "#FFFFFF",
    onBackground: "#000000", // Texto sobre cinza claro deve ser preto para contraste
    outline: "#000000", // Contorno em preto para contraste
    outlineVariant: "#FFA726",
    inverseSurface: "#000000", // Texto sobre branco deve ser preto para contraste
    inverseOnSurface: "#FFFFFF", // Texto sobre preto deve ser branco para contraste
    inversePrimary: "#000000", // Texto sobre laranja deve ser preto para contraste
    shadow: "rgba(0, 0, 0, 0.16)", // Sombra suave em preto
    scrim: "rgba(0, 0, 0, 0.5)", // Camada de fundo semi-transparente em preto
    backdrop: "rgba(0, 0, 0, 0.5)", // Fundo para modais em preto semi-transparente
  },
};

export default function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  return (
    <>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      )}
      {!loading && (
        <PaperProvider>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </PaperProvider>
      )}
    </>
  );
}
