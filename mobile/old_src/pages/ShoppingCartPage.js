import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Alert, ScrollView, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Divider,
  List,
  Text,
} from "react-native-paper";

import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { Sale, SaleProduct, SaleProductExtra } from "../db/entities";
import { getRepository } from "../db/repository";

export function ShoppingCartPage() {
  const navigation = useNavigation();
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);

  const { cartItens } = shoppingCart;

  const totalValue = Number(
    cartItens.reduce((acc, item) => {
      return (
        acc +
        item.price +
        item.extras.reduce((acc, extra) => acc + extra.price, 0)
      );
    }, 0),
  );

  const HandleDeleteIconPress = (item) => {
    console.log("HandleDeleteIconPress", item);

    Alert.alert(
      "Remover do carrinho",
      "Deseja remover esse item do carrinho?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim, remover",
          style: "destructive",
          onPress: () => {
            setShoppingCart((prev) => {
              const index = prev.cartItens.findIndex((e) => e.id === item.id);
              prev.cartItens.splice(index, 1);
              return {
                ...prev,
              };
            });
          },
        },
      ],
    );
  };

  useEffect(() => {
    if (cartItens.length === 0) navigation.goBack();
  }, [shoppingCart]);

  const HandleNewSale = async () => {
    Alert.alert("Obrigado por comprar!", "Volte sempre!");

    const saleRepository = getRepository(Sale);

    const saleAddition = await saleRepository.add({
      total_price: totalValue,
      created_at: new Date().toISOString(),
    });

    const saleProductRepository = getRepository(SaleProduct);
    const saleProductExtraRepository = getRepository(SaleProductExtra);

    for await (const item of cartItens) {
      const saleProductAddition = await saleProductRepository.add({
        sale_id: saleAddition.insertId,
        product_id: item.id,
        quantity: 1,
        price: item.price,
      });

      for await (const extra of item.extras) {
        await saleProductExtraRepository.add({
          sale_id: saleAddition.insertId,
          sale_product_id: saleProductAddition.insertId,
          product_id: item.id,
          product_extra_id: extra.id,
          enabled: 1,
          price: extra.price,
        });
      }
    }

    navigation.navigate("Home");
    navigation.reset({ index: 0, routes: [{ name: "Home" }] });
    setShoppingCart({
      cartItens: [],
    });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Carrinho" />
      </Appbar.Header>
      <ScrollView
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderRadius: 16,
        }}
      >
        <List.Section>
          <List.Subheader>Todos os itens no carrinho</List.Subheader>
          <List.AccordionGroup>
            {cartItens.map((item, index) => (
              <ShoppingCartItem
                key={index}
                item={item}
                index={index}
                HandleDeleteIconPress={HandleDeleteIconPress}
              />
            ))}
          </List.AccordionGroup>
        </List.Section>
      </ScrollView>
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          marginVertical: 16,
          borderRadius: 16,
        }}
      >
        <View style={{ justifyContent: "space-between" }}>
          <Text
            variant="titleMedium"
            style={{ marginVertical: 8, textAlign: "right" }}
          >
            Subtotal:{" "}
            {totalValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
          <Button mode="contained" onPress={HandleNewSale}>
            Comprar
          </Button>
        </View>
      </View>
    </>
  );
}

function ShoppingCartItem({ item, index, HandleDeleteIconPress }) {
  const imageUri =
    item.image + "?q=" + (Date.now() - Math.floor(Math.random() * 1000));

  const price =
    item.price + item.extras.reduce((acc, extra) => acc + extra.price, 0);
  return (
    <View>
      <List.Accordion
        id={index.toString()}
        title={item.name}
        titleStyle={{ fontWeight: "bold" }}
        description={price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
        left={(props) => (
          <Avatar.Image
            size={48}
            style={{ marginLeft: 8 }}
            source={{
              uri: imageUri,
            }}
          />
        )}
      >
        {item.extras.map((extra, index) => (
          <View key={index}>
            <List.Item
              key={index}
              title={extra.name}
              description={extra.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            />
            <Divider />
          </View>
        ))}
        <View>
          <List.Item
            title={
              "Total: " +
              price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            }
            right={() => (
              <Button
                icon="delete-outline"
                mode="contained-tonal"
                size={24}
                style={{ margin: 0 }}
                onPress={() => HandleDeleteIconPress(item)}
              >
                Excluir
              </Button>
            )}
          />
        </View>
      </List.Accordion>
    </View>
  );
}
