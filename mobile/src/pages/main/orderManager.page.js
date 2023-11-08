import React from "react";
import { View } from "react-native";
import { Appbar, Button, Card, List, Text } from "react-native-paper";
import { AppBarNotification } from "../../components/appBarNotification.js";

export function OrderManagerPage({ navigation }) {
  const [orders, setOrders] = React.useState([
    {
      id: 1,
      name: "Lavagem simples",
      description: "Lavagem simples de roupa",
      status: "Pendente",
      price: 10.99,
    },
    {
      id: 2,
      name: "Lavagem completa",
      description: "Lavagem completa de roupa",
      status: "Em andamento",
      price: 15.99,
    },
    {
      id: 3,
      name: "Secagem",
      description: "Secagem de roupa",
      status: "Finalizado",
      price: 5.99,
    },
    {
      id: 4,
      name: "Lavagem simples",
      description: "Lavagem simples de roupa",
      status: "Rejeitado",
      price: 10.99,
    },
  ]);
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Gerenciamento de Pedidos" />
        <AppBarNotification handlePress={() => navigation.navigate("Notifications")} />
      </Appbar.Header>
      <View
        style={{
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
                    <Button style={{ flex: 1 }} mode="contained">
                      Rejeitar
                    </Button>
                    <Button style={{ flex: 1 }} mode="contained">
                      Aceitar
                    </Button>
                  </View>
                )}
                {order.status === "Em andamento" && <Button style={{ flex: 1 }}>Finalizar</Button>}
              </Card.Actions>
            </Card>
          );
        })}
      </View>
    </View>
  );
}
