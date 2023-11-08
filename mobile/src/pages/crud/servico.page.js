import { Formik } from "formik";
import React from "react";
import { View, Text } from "react-native";
import { Appbar, Button, HelperText, List, TextInput } from "react-native-paper";
import * as Yup from "yup";

import { listServices } from "../../services/service.service.js";

const ServiceSchema = Yup.object({
  nome: Yup.string().required("Required"),
  descricao: Yup.string().required("Required"),
  preco: Yup.number().required("Required"),
});

const ServiceInitialValues = {
  nome: "",
  descricao: "",
  preco: "",
};

export const ServicePage = ({ navigation }) => {
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    // listServices().then((services) => {
    //   console.log({ services });
    // });
    setServices([
      {
        id: 1,
        name: 'Lavagem simples',
        description: 'Lavagem simples de roupa',
        prince: 10.99,
      },
      {
        id: 2,
        name: 'Lavagem completa',
        description: 'Lavagem completa de roupa',
        prince: 15.99,
      },
      {
        id: 3,
        name: 'Secagem',
        description: 'Secagem de roupa',
        prince: 5.99,
      },
    ]);
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Serviços" />
      </Appbar.Header>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 32,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        {services.map((service, i) => (
          <List.Item
            key={i}
            title={service.name}
            left={props => <List.Icon {...props} icon="washing-machine" />}
          />
        ))}
      </View>
    </View>
  );
};

function ServiceForm() {
  return (
    <Formik
      validationSchema={ServiceSchema}
      initialValues={ServiceInitialValues}
      onSubmit={(values) => {
        console.log({ values });
      }}
    >
      {function FormikForm({
        handleChange,
        handleBlur,
        values,
        errors,
        setFieldValue,
        handleSubmit,
        isValid,
      }) {
        return (
          <>
            <View>
              <TextInput
                label="Nome"
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
              />
              <HelperText type="error" visible={!!errors.nome}>
                {errors.nome}
              </HelperText>
            </View>
            <View>
              <TextInput
                label="Descricão"
                onChangeText={handleChange("descricao")}
                onBlur={handleBlur("descricao")}
                value={values.descricao}
              />
              <HelperText type="error" visible={!!errors.descricao}>
                {errors.descricao}
              </HelperText>
            </View>
            <View>
              <TextInput
                label="Preço"
                onChangeText={handleChange("preco")}
                onBlur={handleBlur("preco")}
                value={values.preco}
              />
              <HelperText type="error" visible={!!errors.preco}>
                {errors.preco}
              </HelperText>
            </View>
            <Button mode="contained" onPress={handleSubmit} disabled={!isValid}>
              Entrar
            </Button>
          </>
        );
      }}
    </Formik>
  );
}
