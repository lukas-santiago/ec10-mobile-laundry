import { Pressable, Text } from "react-native";

export default function Button({
  onPress,
  title = " ",
  buttonStyle,
  textStyle,
}) {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
}
