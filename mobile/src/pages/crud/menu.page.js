import { Formik } from "formik";
import React from "react";
import { View, Text } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";

export const MenuPage = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Menu" />
      </Appbar.Header>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 32,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Servicos")}
        >
          Serviços
        </Button>
      </View>
    </View>
  );
};
