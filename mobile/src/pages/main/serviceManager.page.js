import React from "react";
import { Alert, ScrollView, View } from "react-native";
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

import { createService, disableService, listServices, updateService } from "../../services/service.service.js";
import { Formik } from "formik";
import { AppBarNotification } from "../../components/appBarNotification.js";
import CurrencyInput from "react-native-currency-input";

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
  const [selectedService, setSelectedService] = React.useState(null);

  async function listAllServices() {
    listServices().then((services) => {
      console.log({ services });
      setServices(services);
    });
  }

  React.useEffect(() => {
    listAllServices();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Gerenciamento de Serviços" />
        <AppBarNotification handlePress={() => navigation.navigate("Notifications")} />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 24,
          paddingHorizontal: 16,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <ModalForm
          visible={visible}
          setVisible={setVisible}
          service={selectedService}
          hideModal={() => {
            setVisible(false);
            setSelectedService(null);
            listAllServices();
          }}
        />
        {services.map((service, i) => (
          <List.Item
            key={i}
            title={service.name}
            right={(props) => (
              <View style={{ flexDirection: "row", gap: 8 }}>
                <TouchableRipple
                  style={{ padding: 4, paddingHorizontal: 12 }}
                  onPress={() => {
                    Alert.alert("Remover Serviço", `Deseja remover o Serviço ${service.name}?`, [
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                      {
                        text: "OK",
                        onPress: () => {
                          disableService(service.id).then(() => {
                            listAllServices();
                          });
                        },
                      },
                    ]);
                  }}
                >
                  <List.Icon icon="close-thick" color="red" />
                </TouchableRipple>
                <TouchableRipple
                  style={{ padding: 4, paddingHorizontal: 12 }}
                  onPress={() => {
                    setSelectedService(service);
                    setVisible(true);
                  }}
                >
                  <List.Icon icon="pencil" />
                </TouchableRipple>
              </View>
            )}
            // onLongPress={() => console.log("onLongPress")}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const ModalForm = ({ visible, setVisible, service, hideModal }) => {
  const showModal = () => setVisible(true);

  const containerStyle = { backgroundColor: "white", padding: 20, margin: 20, borderRadius: 10 };

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <ServiceForm serviceData={service} hideModal={hideModal} />
        </Modal>
      </Portal>
      <Button mode="contained" style={{ marginTop: 30 }} onPress={showModal}>
        Adicionar
      </Button>
    </>
  );
};

function ServiceForm({ serviceData, hideModal }) {
  const [service, setService] = React.useState(
    serviceData || {
      name: "",
      description: "",
      price: "",
    },
  );

  const ServiceSchema = Yup.object({
    name: Yup.string().required("Campo obrigatório"),
    description: Yup.string().required("Campo obrigatório"),
    price: Yup.number().required("Campo obrigatório"),
  });

  const mode = serviceData ? "update" : "create";

  return (
    <Formik
      validationSchema={ServiceSchema}
      initialValues={service}
      onSubmit={(values) => {
        console.log({ values });
        if (mode === "create") {
          createService({
            name: values.name,
            description: values.description,
            price: values.price,
          }).then(() => {
            hideModal();
          });
        } else if (mode === "update") {
          updateService(serviceData.id, {
            name: values.name,
            description: values.description,
            price: values.price,
          }).then(() => {
            hideModal();
          });
        }
      }}
    >
      {function FormikForm({ handleChange, handleBlur, values, errors, setFieldValue, handleSubmit, isValid }) {
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
                label="Descricão"
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
                  <TextInput {...textInputProps} label="Preço" keyboardType="decimal-pad" />
                )}
              />
            </View>
            <Button mode="contained" onPress={handleSubmit} disabled={!isValid} style={{ marginTop: 30 }}>
              Salvar
            </Button>
          </>
        );
      }}
    </Formik>
  );
}
