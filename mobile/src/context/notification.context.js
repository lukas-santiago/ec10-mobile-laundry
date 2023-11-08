import React, { createContext } from "react";
import { countActive } from "../services/notification.service.js";

export const NotificationContext = createContext({
  unreadMessages: 0,
});

export function NotificationContextProvider({ children }) {
  const [unreadMessages, setUnreadMessages] = React.useState(0);

  async function getUnreadMessages() {
    console.log("getUnreadMessages " + unreadMessages);
    countActive().then((unreadMessages) => {
      setUnreadMessages(unreadMessages.count);
    });
  }

  React.useEffect(() => {
    getUnreadMessages();
    const intervalId = setInterval(() => {
      getUnreadMessages();
    }, 15000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <NotificationContext.Provider value={{ unreadMessages, getUnreadMessages }}>
      {children}
    </NotificationContext.Provider>
  );
}
