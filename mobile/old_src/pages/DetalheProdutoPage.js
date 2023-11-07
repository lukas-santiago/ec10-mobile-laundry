import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Card,
  Divider,
  Switch,
  Text,
  TouchableRipple,
} from "react-native-paper";

import { ShoppingCart } from "../components/ShoppingCart";
import { ShoppingCartContext } from "../context/ShoppingCartContext";
import { Extra, ProductExtra } from "../db/entities";
import { getRepository } from "../db/repository";

export function DetalheProdutoPage({ navigation, route }) {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingCartContext);
  const [extras, setExtras] = useState([]);
  const { product } = route.params;
  const imageUri =
    product.image + "?q=" + (Date.now() - Math.floor(Math.random() * 1000));

  const totalPrice = (
    product.price +
    extras
      .filter((e) => e.enabled)
      .reduce((acc, product) => acc + product.price, 0)
  ).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  async function getExtras() {
    const allProductExtra = await getRepository(ProductExtra).getAll();
    const allExtras = await getRepository(Extra).getAll();

    const filteredExtras = allExtras.filter((e) =>
      allProductExtra.some(
        (pe) => pe.product_id === product.id && pe.extra_id === e.id,
      ),
    );

    setExtras([...filteredExtras]);
  }

  async function HandleItemPress(product) {
    console.log("HandleItemPress", product);
    setExtras((prev) => {
      const index = prev.findIndex((e) => e.id === product.id);
      console.log(index);
      prev[index].enabled = !prev[index].enabled;
      return [...prev];
    });
  }

  async function HandleAddToCart() {
    const cartItem = { ...product };
    cartItem.extras = extras.filter((e) => e.enabled);

    setShoppingCart({
      ...shoppingCart,
      cartItens: [...shoppingCart.cartItens, cartItem],
    });
  }
  useEffect(() => {
    getExtras();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Adicionar ao carrinho" />
      </Appbar.Header>
      <ScrollView
        style={{
          paddingVertical: 16,
          paddingHorizontal: 16,
          borderRadius: 16,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <View style={{ justifyContent: "center", flex: 1, marginRight: 16 }}>
            <Text variant="titleLarge">{product.name}</Text>
          </View>
          <View style={{ alignItems: "flex-end", flex: 0 }}>
            <Avatar.Image source={{ uri: imageUri }} size={64} />
          </View>
        </View>
        <Text variant="bodyMedium">{product.description}</Text>
        {extras.length > 0 && (
          <>
            <Divider style={{ marginVertical: 16 }} />
            <Card mode="contained">
              <Card.Title title="Adicionais" style={{ marginBottom: -16 }} />
              {extras.map((extra, index) => (
                <ExtraItem
                  key={extra.name + index}
                  extra={extra}
                  index={index}
                  HandleItemPress={HandleItemPress}
                />
              ))}
            </Card>
          </>
        )}
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
            Subtotal: {totalPrice}
          </Text>
          <Button mode="contained" icon="cart" onPress={HandleAddToCart}>
            Adicionar ao carrinho
          </Button>
        </View>
      </View>
      <ShoppingCart />
    </>
  );
}

function ExtraItem({ extra, index, HandleItemPress }) {
  return (
    <TouchableRipple key={index} onPress={() => HandleItemPress(extra)}>
      <View
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "stretch",
          gap: 16,
          paddingVertical: 8,
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium">{extra.name}</Text>
          <Text>
            {extra.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
        <Switch value={extra.enabled} onChange={() => HandleItemPress(extra)} />
      </View>
    </TouchableRipple>
  );
}
