import React from "react";
import { View, Text } from "react-native";
import { MotiView } from "moti";

import { UserPhoto } from "../UserPhoto";

import { styles } from "./styles";

export type MessageType = {
  id: string;
  text: string;
  user: {
    avatar_url: string;
    name: string;
  };
};

interface MessageProps {
  data: MessageType;
}

export function Message({ data }: MessageProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>{data.text}</Text>

      <View style={styles.footer}>
        <UserPhoto imgUri={data.user.avatar_url} sizes="SMALL" />

        <Text style={styles.userName}>{data.user.name}</Text>
      </View>
    </MotiView>
  );
}
