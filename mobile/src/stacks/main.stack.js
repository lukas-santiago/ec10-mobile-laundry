import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MenuPage } from "../pages/main/menu.page.js";
import { OrderHistoryPage } from "../pages/main/orderHistory.page.js";
import { OrderManagerPage } from "../pages/main/orderManager.page.js";
import { ServiceCatalogPage } from "../pages/main/serviceCatalog.page.js";
import { ServiceManagerPage } from "../pages/main/serviceManager.page.js";
import { NotificationsPage } from "../pages/main/notifications.page.js";
import { NotificationContextProvider } from "../context/notification.context.js";

const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <NotificationContextProvider>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="ServiceCatalog" component={ServiceCatalogPage} />
        <Stack.Screen name="ServiceManager" component={ServiceManagerPage} />
        <Stack.Screen name="OrderHistory" component={OrderHistoryPage} />
        <Stack.Screen name="OrderManager" component={OrderManagerPage} />
        <Stack.Screen name="Notifications" component={NotificationsPage} />
      </Stack.Navigator>
    </NotificationContextProvider>
  );
};
