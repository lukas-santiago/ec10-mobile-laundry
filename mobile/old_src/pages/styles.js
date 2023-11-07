import { StyleSheet } from "react-native";

import colors from "../config/colors/colors.light.js";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.bg1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    maxHeight: 80,
  },
  body: {
    flex: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    maxHeight: "80%",
  },
  footer: {
    flex: 1,
    backgroundColor: colors.bg1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    maxHeight: 100,
    borderRadius: 16,
    marginVertical: 16,
    marginHorizontal: 16,
  },
});
