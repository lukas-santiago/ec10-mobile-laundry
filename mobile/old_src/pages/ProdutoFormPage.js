import { useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import CurrencyInput from "react-native-currency-input";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Chip,
  Divider,
  HelperText,
  IconButton,
  List,
  MD3Colors,
  Modal,
  Portal,
  Searchbar,
  Text,
  TextInput,
} from "react-native-paper";
import * as Yup from "yup";

import {
  Category,
  Extra,
  Product,
  ProductCategory,
  ProductExtra,
} from "../db/entities";
import { getRepository } from "../db/repository";

const ProdutoFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Muito curto, é necessário que possa ter pelo menos 3 caracteres")
    .max(40, "Muito longo, é necessário que possa ter no máximo 40 caracteres")
    .required("Campo obrigatório"),
  description: Yup.string()
    .min(2, "Muito curto, é necessário que possa ter pelo menos 3 caracteres")
    .max(80, "Muito longo, é necessário que possa ter no máximo 80 caracteres")
    .required("Campo obrigatório"),
  price: Yup.number()
    .min(0.01, "O valor deve ser maior que 0")
    .required("Campo obrigatório"),
  category: Yup.array().of(Yup.object()).optional(),
  extras: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required("${path}-Campo obrigatório"),
        name: Yup.string()
          .min(
            2,
            "${path}-Muito curto, é necessário que possa ter pelo menos 3 caracteres",
          )
          .max(
            40,
            "${path}-Muito longo, é necessário que possa ter no máximo 40 caracteres",
          )
          .required("${path}-Campo obrigatório"),
        price: Yup.number()
          .min(0.01, "${path}-O valor deve ser maior que 0")
          .required("${path}-Campo obrigatório"),
      }),
    )
    .optional(),
});

export function ProdutoFormPage({ navigation }) {
  const { mode, product } = useRoute().params;
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
    price: 0,
    category: [],
    extras: [],
  });

  async function addProduto(values) {
    const productAdittion = await getRepository(Product).add({
      name: values.name,
      description: values.description,
      price: values.price,
      image: "https://picsum.photos/100",
    });

    for await (const extra of values.extras) {
      const extraAdittion = await getRepository(Extra).add({
        name: extra.name,
        description: "",
        price: extra.price,
      });

      await getRepository(ProductExtra).add({
        product_id: productAdittion.insertId,
        extra_id: extraAdittion.insertId,
        enabled: 1,
      });
    }
    for await (const category of values.category) {
      await getRepository(ProductCategory).add({
        product_id: productAdittion.insertId,
        category_id: category.id,
      });
    }

    navigation.goBack();
  }
  async function editProduto(values) {
    await getRepository(Product).edit({
      id: product.id,
      name: values.name,
      description: values.description,
      price: values.price,
      image: "https://picsum.photos/100",
    });

    for await (const extra of initialValues.extras) {
      await getRepository(ProductExtra).remove(extra.id);
    }
    for await (const extra of values.extras) {
      const extraAdittion = await getRepository(Extra).add({
        name: extra.name,
        description: "",
        price: extra.price,
      });

      await getRepository(ProductExtra).add({
        product_id: product.id,
        extra_id: extraAdittion.insertId,
        enabled: 1,
      });
    }

    for await (const category of initialValues.category) {
      await getRepository(ProductCategory).remove(category.id);
    }
    for await (const category of values.category) {
      await getRepository(ProductCategory).add({
        product_id: product.id,
        category_id: category.id,
      });
    }

    navigation.goBack();
  }

  console.log(product);

  async function setEdit() {
    const productExtras = await getRepository(ProductExtra).getAll();
    const extras = await getRepository(Extra).getAll();
    const productCategories = await getRepository(ProductCategory).getAll();
    const categories = await getRepository(Category).getAll();

    const editProduct = { ...product };
    editProduct.extras = [
      ...extras.filter((ex) =>
        productExtras.some(
          (pex) => pex.product_id === product.id && pex.extra_id === ex.id,
        ),
      ),
    ];
    editProduct.category = [
      ...categories.filter((ex) =>
        productCategories.some(
          (pex) => pex.product_id === product.id && pex.category_id === ex.id,
        ),
      ),
    ];

    setInitialValues({ ...initialValues, ...editProduct });
    setLoading(false);
  }

  useEffect(() => {
    if (mode === "edit" && loading) {
      setEdit();
    } else setLoading(false);
  }, []);

  return (
    <>
      {loading && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating size="large" />
        </View>
      )}
      {!loading && (
        <>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Formulario de Produto" />
          </Appbar.Header>
          <ScrollView>
            <View
              style={{
                paddingVertical: 24,
                paddingHorizontal: 32,
                paddingBottom: 24,
                gap: 16,
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={ProdutoFormSchema}
                // validator={() => ({})}
                onSubmit={(values) => {
                  console.log({ values, mode });
                  if (mode === "add") {
                    addProduto(values);
                  } else if (mode === "edit") {
                    editProduto(values);
                  }
                }}
              >
                {(formikProps) => <FormikForm {...formikProps} />}
              </Formik>
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
}
function FormikForm({
  handleChange,
  handleBlur,
  values,
  errors,
  setFieldValue,
  handleSubmit,
  isValid,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  async function getCategories() {
    const categories = await getRepository(Category).getAll();
    setCategories(categories);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <View>
        <TextInput
          label="Nome"
          onChangeText={handleChange("name")}
          onBlur={handleBlur("name")}
          value={values.name}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>
      </View>
      <View>
        <TextInput
          label="Descrição"
          onChangeText={handleChange("description")}
          onBlur={handleBlur("description")}
          value={values.description}
        />
        <HelperText type="error" visible={!!errors.description}>
          {errors.description}
        </HelperText>
      </View>
      <View>
        <CurrencyInput
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          value={values.price}
          onBlur={handleBlur("price")}
          onChangeValue={(value) => setFieldValue("price", value)}
          renderTextInput={(textInputProps) => (
            <TextInput
              {...textInputProps}
              label="Preço"
              keyboardType="decimal-pad"
            />
          )}
        />
        <HelperText type="error" visible={!!errors.price}>
          {errors.price}
        </HelperText>
      </View>

      <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
        {values.category.map((item, index) => (
          <Chip key={index} onPress={() => console.log("Pressed")}>
            {item.name}
          </Chip>
        ))}
        <Chip icon="plus" onPress={showModal}>
          Adicionar
        </Chip>
      </View>

      <List.Item
        title={<Text variant="titleMedium">Adicionais</Text>}
        right={() => (
          <IconButton
            icon="plus"
            style={{ margin: -8 }}
            mode="contained-tonal"
            onPress={() => {
              setFieldValue("extras", [
                ...values.extras,
                { id: values.extras.length + 1, name: "", price: 0 },
              ]);
            }}
          />
        )}
        style={{
          marginHorizontal: -12,
          marginVertical: -4,
          marginTop: 16,
        }}
      />
      <Divider bold />

      {values.extras.map((extra, index) => (
        <ExtraFormItem
          key={index}
          index={index}
          values={values}
          extra={extra}
          setFieldValue={setFieldValue}
          errors={errors}
        />
      ))}

      <Button onPress={handleSubmit} mode="contained-tonal" disabled={!isValid}>
        Gravar
      </Button>

      <CategoryChipsModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        categories={categories}
        values={values}
        setFieldValue={setFieldValue}
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

function ExtraFormItem({ index, values, extra, setFieldValue, errors }) {
  function changeField(field, value) {
    const extras = [...values.extras];
    extras.find((e) => e.id === extra.id)[field] = value;
    setFieldValue("extras", [...extras]);
  }
  function HandleRemoveItem(extra) {
    const extras = [...values.extras];
    const index = extras.findIndex((e) => e.id === extra.id);
    extras.splice(index, 1);
    setFieldValue("extras", [...extras]);
  }

  let error = null;

  if (errors.extras) {
    error = errors.extras.find((ex) => {
      if (ex && Object.values(ex).length > 0) {
        const values = Object.values(ex)[0];
        let regexIndex = values.split("-")[0]?.match(/\[(\d*)\]/);
        if (regexIndex && regexIndex[1] !== null) {
          regexIndex = regexIndex[1];

          return regexIndex === String(index);
        }
      }
    });
    if (typeof error === "object") {
      error.name = error.name?.split("-")[1] || "";
      error.price = error.price?.split("-")[1] || "";
    }
  }

  return (
    <View
      key={index}
      style={{
        gap: 4,
        backgroundColor: MD3Colors.secondary80,
        borderRadius: 8,
        padding: 16,
      }}
    >
      <List.Item
        style={{
          margin: -12,
          marginBottom: -4,
          marginTop: -8,
        }}
        title={<Text variant="titleMedium">#{index + 1}</Text>}
        right={() => (
          <IconButton
            icon="minus"
            size={16}
            style={{ margin: -8 }}
            mode="contained-tonal"
            onPress={() => HandleRemoveItem(extra)}
          />
        )}
      />
      <TextInput
        label="Nome do Adicional"
        value={extra.name}
        onChangeText={(text) => changeField("name", text)}
      />
      <HelperText type="error" visible={error && !!error.name}>
        {error?.name}
      </HelperText>
      <CurrencyInput
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        value={extra.price}
        onChangeValue={(value) => changeField("price", value)}
        renderTextInput={(textInputProps) => (
          <TextInput
            {...textInputProps}
            label="Preço"
            keyboardType="decimal-pad"
          />
        )}
      />
      <HelperText type="error" visible={error && !!error.price}>
        {error?.price}
      </HelperText>
    </View>
  );
}
