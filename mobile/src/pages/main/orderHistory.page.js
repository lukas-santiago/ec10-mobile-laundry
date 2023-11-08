import React from "react";
import { Alert, ScrollView, View } from "react-native";
import { Appbar, Card, Text } from "react-native-paper";
import { AppBarNotification } from "../../components/appBarNotification.js";
import { listOrders } from "../../services/order.service.js";

export function OrderHistoryPage({ navigation }) {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    listOrders().then((orders) => {
      setOrders(orders);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Histórico de Pedidos" />
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
              <Card.Title title={order.name} subtitle={order.status}></Card.Title>
              <Card.Content>
                <Text>{order.description}</Text>
                <Text>{price}</Text>
              </Card.Content>
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
}
