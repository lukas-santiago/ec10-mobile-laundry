import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Appbar, Button, HelperText, TextInput, Text } from "react-native-paper";

export const MenuPage = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Menu" />
        <Appbar.Action icon='bell' onPress={() => {
          navigation.navigate("Servicos")
        }} />
      </Appbar.Header>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 32,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <Text variant="bodyLarge">Funções Administrativas</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Servicos")}
        >
          Serviços
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Servicos")}
        >
          Pedidos
        </Button>
        <Text variant="bodyLarge">Funções Usuais</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Servicos")}
        >
          Serviços
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Servicos")}
        >
          Pedidos
        </Button>
      </View>
    </View>
  );
};
