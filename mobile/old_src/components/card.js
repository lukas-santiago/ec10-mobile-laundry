import { View } from "react-native";

import { styles } from "../pages/styles";
import { TouchableRipple } from "react-native-paper";

export function Card({
  children,
  style,
  touchable = false,
  onPress = undefined,
}) {
  if (touchable)
    return (
      <TouchableRipple
        onPress={onPress}
        rippleColor="rgba(0, 0, 0, .32)"
        style={{ flex: 1 }}
      >
        <View style={[styles.card, style]}>{children}</View>
      </TouchableRipple>
    );

  return <View style={[styles.card, style]}>{children}</View>;
}
