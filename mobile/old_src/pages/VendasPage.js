import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Divider, List, Text } from "react-native-paper";

import {
  Extra,
  Product,
  Sale,
  SaleProduct,
  SaleProductExtra,
} from "../db/entities";
import { getRepository } from "../db/repository";

export function VendasPage(props) {
  const [sales, setSales] = useState([]);
  const isFocused = useIsFocused();

  async function getSales() {
    const allSales = await getRepository(Sale).getAll();
    const allSalesProduct = await getRepository(SaleProduct).getAll();
    const allSalesProductExtra = await getRepository(SaleProductExtra).getAll();
    const allProducts = await getRepository(Product).getAll();
    const allExtras = await getRepository(Extra).getAll();

    const newSales = allSales.map((sale) => {
      const newSale = { ...sale };

      newSale.products = allSalesProduct.filter((sp) => sp.sale_id === sale.id);
      newSale.products = newSale.products.map((sp) => {
        const product = allProducts.find((p) => p.id === sp.product_id);
        const newSaleProduct = { ...product, ...sp };

        newSaleProduct.extras = allSalesProductExtra.filter(
          (spe) => spe.sale_id === sale.id && spe.sale_product_id === sp.id,
        );

        newSaleProduct.extras = newSaleProduct.extras.map((spe) => {
          const extra = allExtras.find((e) => e.id === spe.product_extra_id);
          const newSaleProductExtra = { ...extra, ...spe };
          return newSaleProductExtra;
        });

        return newSaleProduct;
      });

      return newSale;
    });

    // console.log(JSON.stringify(newSales, null, 2));
    setSales(newSales);
  }

  useEffect(() => {
    getSales();
  }, [props, isFocused]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Gestão dos Produtos" />
      </Appbar.Header>
      <ScrollView>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 32,
            paddingBottom: 24,
          }}
        >
          <List.Item
            title={<Text variant="titleLarge">Vendas</Text>}
            style={{ margin: -8, marginTop: 0 }}
          />
          <Divider style={{ marginTop: 8 }} bold />

          {/* <List.AccordionGroup> */}
          {sales.map((sale, index) => (
            <View key={index}>
              {index > 0 && <Divider style={{ marginTop: 8 }} />}
              <SaleItem sale={sale} index={index} />
            </View>
          ))}
          {/* </List.AccordionGroup> */}
        </View>
      </ScrollView>
    </>
  );
}
function SaleItem({ sale, index }) {
  return (
    <List.Section>
      <List.Accordion
        id={`${sale.id}${index}`}
        title={
          "#" +
          sale.id +
          " - " +
          new Date(sale.created_at).toLocaleString("pt-br")
        }
        description={Number(sale.total_price).toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      >
        {sale.products.map((product, index) => (
          <SaleProductItem key={index} product={product} index={index} />
        ))}
      </List.Accordion>
    </List.Section>
  );
}
function SaleProductItem({ product, index }) {
  return (
    <List.Accordion
      title={product.name}
      description={Number(product.price).toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      })}
    >
      {product.extras.map((extra, index) => (
        <List.Item
          key={index}
          title={extra.name}
          description={extra.price.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        />
      ))}
    </List.Accordion>
  );
}
