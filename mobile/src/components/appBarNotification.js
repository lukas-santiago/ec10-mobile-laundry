import React, { createContext, useContext } from "react";
import { View } from "react-native";
import { Appbar, Badge } from "react-native-paper";
import { NotificationContext } from "../context/notification.context.js";

export const AppBarNotification = ({ handlePress }) => {
  const { unreadMessages } = useContext(NotificationContext);

  console.log({ unreadMessages });

  return (
    <View>
      <Appbar.Action
        icon={unreadMessages > 0 ? "bell" : "bell-outline"}
        accessibilityLabel="TagChat"
        onPress={handlePress}
      />
      <Badge visible={unreadMessages > 0} size={18} style={{ position: "absolute", top: 8, right: 8 }}>
        {unreadMessages}
      </Badge>
    </View>
  );
};
