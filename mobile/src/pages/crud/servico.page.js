import { Formik } from "formik";
import React from "react";
import { View, Text } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
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
    listServices().then((services) => {
      console.log({ services });
      setServices(services);
    });
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
        <Text>
          {services.map((service) => (
            <Text key={service.id}>{service.nome}</Text>
          ))}
        </Text>
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
