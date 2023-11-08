import { View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";

export function Loading({ message, tryAgainHandler }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 16 }}>
      <ActivityIndicator animating size="large" />
      {message && (
        <>
          <Text variant="bodyLarge">{message}</Text>
          <Button mode="contained" onPress={tryAgainHandler}>
            Tentar Novamente
          </Button>
        </>
      )}
    </View>
  );
}
