import { useNavigation } from "@react-navigation/native";
import { useContext, useMemo, useState } from "react";
import { View } from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";

import { ShoppingCartContext } from "../context/ShoppingCartContext";

export function ShoppingCart() {
  const {
    shoppingCart: { cartItens },
  } = useContext(ShoppingCartContext);

  const [totalValue, setTotalValue] = useState(0);

  useMemo(() => {
    const totalValueMemo = Number(
      cartItens.reduce((acc, item) => {
        return (
          acc +
          item.price +
          item.extras.reduce((acc, extra) => acc + extra.price, 0)
        );
      }, 0),
    );

    setTotalValue(totalValueMemo);
  }, [cartItens]);

  const navigation = useNavigation();

  return (
    <Card mode="contained" style={{ marginBottom: 16, marginHorizontal: 16 }}>
      <Card.Title
        title="Carrinho"
        titleVariant="titleMedium"
        titleStyle={{ marginLeft: -4, marginTop: 6 }}
        left={() => (
          <IconButton icon="cart-outline" size={24} style={{ margin: 0 }} />
        )}
      />
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          minHeight: 74,
        }}
      >
        {cartItens.length === 0 && (
          <View>
            <Text variant="titleLarge">Vazio</Text>
            <Text variant="bodyMedium">Escolha algo para começar</Text>
          </View>
        )}
        {cartItens.length > 0 && (
          <>
            <View>
              <Text variant="titleLarge">{cartItens.length} itens</Text>
              <Text variant="bodyMedium">
                Subtotal:{" "}
                {totalValue.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("ShoppingCart")}
              >
                Abir Carrinho
              </Button>
            </Card.Actions>
          </>
        )}
      </Card.Content>
    </Card>
  );
}
