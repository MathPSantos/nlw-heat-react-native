import React, { useState } from "react";
import { View, Text, TextInput, Alert, Keyboard } from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";

import { styles } from "./styles";

export function SendMessageForm() {
  const [message, setMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  async function handleMessageSubmit() {
    const userMessage = message.trim();

    if (message.length) {
      setIsSendingMessage(true);
      await api.post("messages", { message: userMessage });

      setMessage("");
      Keyboard.dismiss();

      setIsSendingMessage(false);

      Alert.alert("Messagem enviada com sucesso!");
    } else {
      Alert.alert("Escreva uma mensagem para enviar.");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        editable={!isSendingMessage}
      />

      <Button
        label="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        disabled={isSendingMessage}
        onPress={handleMessageSubmit}
      />
    </View>
  );
}
