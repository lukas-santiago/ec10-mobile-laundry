import { Formik } from "formik";
import React from "react";
import { Alert, View } from "react-native";
import { Appbar, Button, Card, List, Text } from "react-native-paper";
import { AppBarNotification } from "../../components/appBarNotification.js";
import { listServices } from "../../services/service.service.js";
import { createOrder } from "../../services/order.service.js";

export const ServiceCatalogPage = ({ navigation }) => {
  /**
   * @typedef { {id: number, name: string, description: string, price: number }[] } ServicesState
   * @type {[ServicesState, React.Dispatch<React.SetStateAction<ServicesState>>]}
   */
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    listServices().then((services) => {
      setServices(services);
    });
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Catálogo de Serviços" />
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
        {services.map((service) => {
          const price = Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(service.price);

          return (
            <Card key={service.id}>
              <Card.Title
                title={service.name}
                subtitle={service.description}
                left={() => <List.Icon icon="washing-machine" />}
              />
              <Card.Content>
                <Text variant="bodyLarge">{price}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  style={{ flex: 1 }}
                  onPress={() => {
                    Alert.alert(
                      "Gerar pedido",
                      `Deseja gerar um pedido para o serviço ${service.name}? O valor total do pedido sera de ${price}`,
                      [
                        {
                          text: "Cancelar",
                          style: "cancel",
                        },
                        {
                          text: "Confirmar",
                          onPress: () => {
                            console.log({ service });

                            createOrder({
                              clienteId: 1,
                              servicoId: service.id,
                            })
                              .then((order) => {
                                console.log({ order });
                                Alert.alert("Pedido gerado com sucesso");
                              })
                              .catch((error) => {
                                console.log({ error });
                                Alert.alert("Erro ao gerar o pedido");
                              });
                          },
                        },
                      ],
                    );
                  }}
                >
                  Gerar Pedido
                </Button>
              </Card.Actions>
            </Card>
          );
        })}
      </View>
    </View>
  );
};
