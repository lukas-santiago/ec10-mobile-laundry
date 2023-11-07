import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Appbar, Divider, IconButton, List, Text } from "react-native-paper";

import { CategoriaFormPage } from "./CategoriaFormPage.js";
import { Category, Product, ProductCategory } from "../db/entities";
import { getRepository } from "../db/repository";

export function ProdutosPage(props) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalCategory, setModalCategory] = useState(null);

  const hideModal = () => {
    setModalCategory(null);
    setModalVisible(false);
    getCategories();
  };

  const navigation = useNavigation();

  async function getProducts() {
    const products = await getRepository(Product).getAll();
    setProducts(products);
  }
  async function getCategories() {
    const categories = await getRepository(Category).getAll();
    setCategories(categories);
  }

  const actions = {
    product: {
      add: function HandleProductAddition() {
        console.log("HandleProductAddition");
        navigation.navigate("ProdutoForm", { mode: "add" });
      },
      edit: function HandleProductEdition(product) {
        console.log("HandleProductEdition");
        navigation.navigate("ProdutoForm", { mode: "edit", product });
      },
      remove: function HandleProductRemotion(product) {
        console.log("HandleProductRemotion", product);
        Alert.alert("Remover do produto", "Deseja remover esse produto?", [
          {
            text: "Não",
            style: "cancel",
          },
          {
            text: "Sim, remover",
            style: "destructive",
            onPress: () => {
              getRepository(Product).remove(product.id);
              getProducts();
              // setProducts((prev) => {
              //   const index = prev.findIndex((e) => e.id === product.id);
              //   prev.splice(index, 1);
              //   return {
              //     ...prev,
              //   };
              // });
            },
          },
        ]);
      },
    },
    category: {
      add: function HandleCategoryAddition() {
        console.log("HandleCategoryAddition");
        setModalVisible(true);
      },
      edit: function HandleCategoryEdition(category) {
        console.log("HandleCategoryEdition", category);
        setModalCategory(category);
        setModalVisible(true);
      },
      remove: function HandleCategoryRemotion(category) {
        console.log("HandleCategoryRemotion", category);
        Alert.alert(
          "Remover categoria",
          "Todas as associações com produtos serão removidas",
          [
            {
              text: "Não",
              style: "cancel",
            },
            {
              text: "Sim, remover",
              style: "destructive",
              onPress: async () => {
                const associations = (
                  await getRepository(ProductCategory).getAll()
                ).filter((p) => p.category_id === category.id);

                for await (const association of associations) {
                  await getRepository(ProductCategory).remove(association.id);
                }

                await getRepository(Category).remove(category.id);

                await getCategories();
                // setProducts((prev) => {
                //   const index = prev.findIndex((e) => e.id === product.id);
                //   prev.splice(index, 1);
                //   return {
                //     ...prev,
                //   };
                // });
              },
            },
          ],
        );
      },
    },
  };

  useEffect(() => {
    getProducts();
    getCategories();
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
          <Text variant="titleSmall" style={{ marginBottom: 8 }}>
            Aqui você pode adicionar produtos para o seu cardápio e gerenciar as
            categorias como desejar
          </Text>
          <List.Item
            title={<Text variant="titleLarge">Produtos</Text>}
            right={() => (
              <IconButton
                icon="plus"
                style={{ margin: -8 }}
                mode="contained-tonal"
                onPress={actions.product.add}
              />
            )}
            style={{ margin: -8, marginTop: 0 }}
          />
          <Divider style={{ marginTop: 8 }} bold />
          {products.map((product, index) => (
            <View key={index}>
              {index > 0 && <Divider style={{ marginTop: 8 }} />}
              <ProductItem
                product={product}
                index={index}
                edit={actions.product.edit}
                remove={actions.product.remove}
              />
            </View>
          ))}
          <List.Item
            title={<Text variant="titleLarge">Categorias</Text>}
            right={() => (
              <IconButton
                icon="plus"
                style={{ margin: -8 }}
                mode="contained-tonal"
                onPress={actions.category.add}
              />
            )}
            style={{ margin: -8, marginTop: 64 }}
          />
          <Divider style={{ marginTop: 8 }} bold />
          {categories.map((category, index) => (
            <View key={index}>
              {index > 0 && <Divider style={{ marginTop: 8 }} />}
              <CategoryItem
                category={category}
                index={index}
                edit={actions.category.edit}
                remove={actions.category.remove}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <CategoriaFormPage
        modalVisible={modalVisible}
        hideModal={hideModal}
        categories={categories}
        category={modalCategory}
      />
    </>
  );
}

function ProductItem({ product, index, edit, remove }) {
  return (
    <List.Item
      key={index}
      title={<Text>{product.name}</Text>}
      description={product.description}
      right={() => (
        <>
          <IconButton
            icon="pencil"
            size={20}
            style={{ margin: 0, marginRight: 16 }}
            mode="contained-tonal"
            onPress={() => edit(product)}
          />
          <IconButton
            icon="trash-can"
            size={20}
            style={{ margin: 0 }}
            mode="contained-tonal"
            onPress={() => remove(product)}
          />
        </>
      )}
      style={{ margin: -8, marginTop: 0, marginRight: -16 }}
    />
  );
}
function CategoryItem({ category, index, edit, remove }) {
  return (
    <List.Item
      key={index}
      title={<Text>{category.name}</Text>}
      right={() => (
        <>
          <IconButton
            icon="pencil"
            size={20}
            style={{ margin: 0, marginRight: 16 }}
            mode="contained-tonal"
            onPress={() => edit(category)}
          />
          <IconButton
            icon="trash-can"
            size={20}
            style={{ margin: 0 }}
            mode="contained-tonal"
            onPress={() => remove(category)}
          />
        </>
      )}
      style={{ margin: -8, marginTop: 0, marginRight: -16 }}
    />
  );
}
