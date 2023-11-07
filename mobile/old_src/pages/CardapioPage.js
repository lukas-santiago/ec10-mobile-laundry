import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  Appbar,
  Text,
  List,
  TouchableRipple,
  Avatar,
  Divider,
  IconButton,
  Button,
  Chip,
  Portal,
  Modal,
  Searchbar,
} from "react-native-paper";

import { styles } from "./styles.js";
import { ShoppingCart } from "../components/ShoppingCart.js";
import { Category, Product, ProductCategory } from "../db/entities.js";
import { getRepositories } from "../db/repository.js";

export function CardapioPage(props) {
  const [products, setProducts] = useState([]);
  const [productCategories, setProductsCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  function showModal() {
    setModalVisible(true);
  }

  function hideModal() {
    setModalVisible(false);
  }

  function HandleItemPress(product) {
    console.log("HandleItemPress", product);
    navigation.navigate("DetalheProduto", { product });
  }

  async function getProducts() {
    const repositories = getRepositories();

    setProducts(await repositories[Product.name].getAll());
  }
  async function getProductCategory() {
    const repositories = getRepositories();

    setProductsCategories(await repositories[ProductCategory.name].getAll());
  }
  async function getCategories() {
    const repositories = getRepositories();

    setCategories(await repositories[Category.name].getAll());
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getProductCategory();
  }, [props, isFocused]);

  // getRepository(Product)
  //   .getAll()
  //   .then((sales) => console.log("Product", JSON.stringify(sales, null, 2)));

  // getRepository(ProductExtra)
  //   .getAll()
  //   .then((sales) => console.log("ProductExtra", sales));

  // getRepository(Extra)
  //   .getAll()
  //   .then((sales) => console.log("Extra", sales));

  // getRepository(Category)
  //   .getAll()
  //   .then((sales) => console.log("Category", sales));

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="HmHmiam Burguers" />
      </Appbar.Header>
      <ScrollView style={styles.body}>
        <Text variant="titleMedium">
          Aqui você encontra as melhores opções para você saborear um delicioso
          burguer
        </Text>
        <Divider style={{ marginTop: 16 }} />
        <List.Section>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <List.Subheader>
              {categoryFilters.length > 0 ? "Filtrando por:" : "Todos os itens"}
            </List.Subheader>
            <Button
              icon="filter"
              mode="text"
              style={{ margin: 4 }}
              onPress={showModal}
            >
              Categorias
            </Button>
          </View>
          <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
            {categoryFilters.map((category, index) => (
              <Chip key={index} onPress={() => console.log("Pressed")}>
                {category.name}
              </Chip>
            ))}
          </View>
          {products
            .filter((p) => {
              if (categoryFilters.length > 0) {
                return categoryFilters.some((category) => {
                  return productCategories.some((pc) => {
                    return (
                      pc.category_id === category.id && pc.product_id === p.id
                    );
                  });
                });
              }
              return true;
            })
            .map((product, index) => (
              <HamburgersMenuItemMap
                key={index}
                product={product}
                index={index}
                HandleItemPress={HandleItemPress}
              />
            ))}
        </List.Section>
      </ScrollView>
      <ShoppingCart />
      <CategoryChipsModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        categories={categories}
        values={{ category: categoryFilters }}
        setFieldValue={(name, value) => {
          setCategoryFilters(value);
        }}
      />
    </>
  );
}

function CategoryChipsModal({
  modalVisible,
  hideModal,
  categories,
  values,
  setFieldValue,
}) {
  const [search, setSearch] = useState("");
  const categoriesFiltered = categories.filter((c) =>
    c.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
  );
  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 20,
        }}
      >
        <>
          <Searchbar
            placeholder="Search"
            onChangeText={(text) => {
              setSearch(text);
            }}
            value={search}
            style={{ marginBottom: 16 }}
            mode="bar"
          />
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            {categoriesFiltered.map((item, index) => {
              const itemIndex = values.category.findIndex(
                (c) => c.name === item.name,
              );

              return (
                <Chip
                  key={index}
                  onPress={() => {
                    if (itemIndex !== -1) {
                      const categoryValues = [...values.category];
                      categoryValues.splice(itemIndex, 1);
                      setFieldValue("category", categoryValues);
                    } else {
                      console.log([...values.category, item]);
                      setFieldValue("category", [...values.category, item]);
                    }
                  }}
                  selected={itemIndex !== -1}
                >
                  {item.name}
                </Chip>
              );
            })}
          </View>
        </>
      </Modal>
    </Portal>
  );
}

function HamburgersMenuItemMap({ product, index, HandleItemPress }) {
  const imageUri =
    product.image + "?q=" + (Date.now() - Math.floor(Math.random() * 1000));

  return (
    <TouchableRipple key={index} onPress={() => HandleItemPress(product)}>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          paddingVertical: 16,
          paddingHorizontal: 8,
        }}
      >
        <Avatar.Image
          size={48}
          source={{
            uri: imageUri,
          }}
        />
        <View>
          <Text variant="titleMedium">{product.name}</Text>
          <Text>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
}
