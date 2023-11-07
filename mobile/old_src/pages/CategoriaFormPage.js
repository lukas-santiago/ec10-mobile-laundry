import { useEffect, useState } from "react";
import { View } from "react-native";
import {
  Button,
  HelperText,
  Modal,
  Portal,
  TextInput,
} from "react-native-paper";

import { Category } from "../db/entities.js";
import { getRepository } from "../db/repository.js";

export function CategoriaFormPage({
  modalVisible,
  hideModal,
  categories,
  category,
}) {
  const [value, setValue] = useState(category?.name || "");

  const handleSubmit = async () => {
    if (!category) {
      await getRepository(Category).add({
        name: value,
      });
    } else {
      await getRepository(Category).edit({
        id: category.id,
        name: value,
      });
    }
    hideModal();
  };

  const alLeastThreeLetters = value.length > 2;
  const alreadyExists = categories.some((c) => c.name === value);
  const disabled = (!category && alreadyExists) || !alLeastThreeLetters;

  useEffect(() => {
    console.log(category);
    if (category) setValue(category.name);
  }, [modalVisible]);

  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={() => {
          setValue("");
          hideModal();
        }}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 20,
        }}
      >
        <>
          <View
            style={{
              gap: 16,
            }}
          >
            <TextInput
              label="Categoria"
              value={value}
              onChangeText={setValue}
            />
            {disabled && (
              <HelperText style={{ color: "red" }}>
                {!alLeastThreeLetters
                  ? "Mínimo 3 letras"
                  : disabled
                  ? "Categoria já existe"
                  : ""}
              </HelperText>
            )}
            <Button
              onPress={handleSubmit}
              mode="contained-tonal"
              disabled={disabled}
            >
              Gravar
            </Button>
          </View>
        </>
      </Modal>
    </Portal>
  );
}
