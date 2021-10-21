import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import io from "socket.io-client";

import { api } from "../../services/api";

import { Message, MessageType } from "../Message";

import { styles } from "./styles";

let messagesQueue: MessageType[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (message: MessageType) => messagesQueue.push(message));

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get<MessageType[]>("messages/last3");

      setCurrentMessages(data);
    })();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length) {
        setCurrentMessages((prev) => [messagesQueue[0], prev[0], prev[1]]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages.map((i) => (
        <Message key={i.id} data={i} />
      ))}
    </ScrollView>
  );
}
