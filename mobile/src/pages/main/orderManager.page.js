import React from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Card, List, Text } from "react-native-paper";
import { AppBarNotification } from "../../components/appBarNotification.js";
import { listOrders, updateStatusOrder } from "../../services/order.service.js";

export function OrderManagerPage({ navigation }) {
  const [orders, setOrders] = React.useState([]);

  async function handleStatusChange(orderId, status) {
    updateStatusOrder(orderId, status).then(() => {
      listAllOrders();
    });
  }

  function listAllOrders() {
    listOrders().then((orders) => {
      setOrders(orders);
    });
  }

  React.useEffect(() => {
    listAllOrders();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Gerenciamento de Pedidos" />
        <AppBarNotification handlePress={() => navigation.navigate("Notifications")} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 24,
          paddingHorizontal: 32,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        {orders.map((order) => {
          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(order.price);

          return (
            <Card key={order.id}>
              <Card.Title
                title={order.name}
                subtitle={order.status}
                left={() => <List.Icon icon="washing-machine" />}
              />
              <Card.Content>
                <Text variant="bodyLarge">{price}</Text>
              </Card.Content>
              <Card.Actions>
                {order.status === "Pendente" && (
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <Button
                      style={{ flex: 1 }}
                      mode="contained"
                      onPress={() => handleStatusChange(order.id, "Rejeitado")}
                    >
                      Rejeitar
                    </Button>
                    <Button
                      style={{ flex: 1 }}
                      mode="contained"
                      onPress={() => handleStatusChange(order.id, "Em andamento")}
                    >
                      Aceitar
                    </Button>
                  </View>
                )}
                {order.status === "Em andamento" && (
                  <Button style={{ flex: 1 }} onPress={() => handleStatusChange(order.id, "Finalizado")}>
                    Finalizar
                  </Button>
                )}
              </Card.Actions>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
