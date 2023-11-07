import { Formik } from "formik";
import React from "react";
import { View, Text } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
import * as Yup from "yup";

const UserSchema = Yup.object({
  username: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

const UserInitialValues = {
  username: "",
  password: "",
};

export const SignInPage = ({ navigation }) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Login" />
      </Appbar.Header>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 32,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        <Formik
          initialValues={UserInitialValues}
          validationSchema={UserSchema}
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
                    label="Nome de usuario ou email"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                    value={values.username}
                  />
                  <HelperText type="error" visible={!!errors.username}>
                    {errors.username}
                  </HelperText>
                </View>
                <View>
                  <TextInput
                    label="Senha"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  <HelperText type="error" visible={!!errors.password}>
                    {errors.password}
                  </HelperText>
                </View>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  disabled={!isValid}
                >
                  Entrar
                </Button>
              </>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};
