import { Formik } from "formik";
import React from "react";
import { View } from "react-native";
import { Appbar, Button, HelperText, TextInput, Text, Badge } from "react-native-paper";
import { AppBarNotification } from "../../components/appBarNotification.js";
import { NotificationContext } from "../../context/notification.context.js";

export const MenuPage = (props) => {
  const { navigation } = props;
  const goTo = (page) => navigation.navigate(page);
  const { getUnreadMessages } = React.useContext(NotificationContext);

  React.useEffect(() => {
    getUnreadMessages();
  }, [props]);

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Menu" />
        <AppBarNotification handlePress={() => goTo("Notifications")} />
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
        <Button mode="contained" onPress={() => goTo("ServiceManager")}>
          Gerenciamento de Serviços
        </Button>
        <Button mode="contained" onPress={() => goTo("OrderManager")}>
          Gerenciamento de Pedidos
        </Button>
        <Text variant="bodyLarge">Funções Usuais</Text>
        <Button mode="contained" onPress={() => goTo("ServiceCatalog")}>
          Catálogo de Serviços
        </Button>
        <Button mode="contained" onPress={() => goTo("OrderHistory")}>
          Historico de Pedidos
        </Button>
      </View>
    </View>
  );
};
