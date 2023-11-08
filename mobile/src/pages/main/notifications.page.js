import React from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Button, Card, Text } from "react-native-paper";
import { listNotificationsByUser, makeUnreadNotification } from "../../services/notification.service.js";

export const NotificationsPage = function NotificationsPage({ navigation }) {
  const [notifications, setNotifications] = React.useState([]);

  async function getNotifications() {
    listNotificationsByUser().then((notifications) => {
      setNotifications(notifications);
    });
  }

  React.useEffect(() => {
    getNotifications();
  }, []);
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Notificações" />
      </Appbar.Header>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 24,
          paddingHorizontal: 32,
          paddingBottom: 24,
          gap: 16,
        }}
      >
        {notifications.map((notification, key) => {
          const mode = notification.active ? "contained" : "elevated";
          return (
            <Card key={key} mode={mode}>
              <Card.Content style={{ paddingBottom: 16 }}>
                <Text variant="bodyLarge">{notification.message}</Text>
              </Card.Content>
              {notification.active && (
                <Card.Actions>
                  <Button
                    mode="contained"
                    style={{ flex: 1, marginBottom: 8 }}
                    onPress={() => {
                      makeUnreadNotification(notification.id).then(() => {
                        getNotifications();
                      });
                    }}
                  >
                    Marcar como lido
                  </Button>
                </Card.Actions>
              )}
            </Card>
          );
        })}
      </ScrollView>
    </View>
  );
};
