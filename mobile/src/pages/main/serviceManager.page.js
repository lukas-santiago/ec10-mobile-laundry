import React from "react";
import { View } from "react-native";
import {
  Appbar,
  Button,
  HelperText,
  List,
  Modal,
  PaperProvider,
  Portal,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import * as Yup from "yup";

import { listServices } from "../../services/service.service.js";
import { Formik } from "formik";
import { AppBarNotification } from "../../components/appBarNotification.js";

/**
 * @typedef {Array.<Object>} ServicesState
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} prince
 */

export const ServiceManagerPage = ({ navigation }) => {
  /**
   * The services state and its setter function.
   * @type {[ServicesState, React.Dispatch<React.SetStateAction<ServicesState>>]}
   */
  const [services, setServices] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    // listServices().then((services) => {
    //   console.log({ services });
    // });
    setServices([
      {
        id: 1,
        name: "Lavagem simples",
        description: "Lavagem simples de roupa",
        prince: 10.99,
      },
      {
        id: 2,
        name: "Lavagem completa",
        description: "Lavagem completa de roupa",
        prince: 15.99,
      },
      {
        id: 3,
        name: "Secagem",
        description: "Secagem de roupa",
        prince: 5.99,
      },
    ]);
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Gerenciamento de Serviços" />
        <AppBarNotification handlePress={() => navigation.navigate("Notifications")} />
      </Appbar.Header>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 16,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <ModalForm visible={visible} setVisible={setVisible} />
        {services.map((service, i) => (
          <List.Item
            key={i}
            title={service.name}
            right={(props) => (
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableRipple style={{ padding: 4, paddingHorizontal: 12 }} onPress={() => console.log({ service })}>
                  <List.Icon icon="close-thick" color="red" />
                </TouchableRipple>
                <TouchableRipple style={{ padding: 4, paddingHorizontal: 12 }} onPress={() => setVisible(true)}>
                  <List.Icon icon="pencil" />
                </TouchableRipple>
              </View>
            )}
            // onLongPress={() => console.log("onLongPress")}
          />
        ))}
      </View>
    </View>
  );
};

const ModalForm = ({ visible, setVisible }) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 10 };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <ServiceForm />
        </Modal>
      </Portal>
      <Button mode="contained" style={{ marginTop: 30 }} onPress={showModal}>
        Adicionar
      </Button>
    </>
  );
};

function ServiceForm() {
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

  return (
    <Formik
      validationSchema={ServiceSchema}
      initialValues={ServiceInitialValues}
      onSubmit={(values) => {
        console.log({ values });
      }}
    >
      {function FormikForm({ handleChange, handleBlur, values, errors, setFieldValue, handleSubmit, isValid }) {
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
