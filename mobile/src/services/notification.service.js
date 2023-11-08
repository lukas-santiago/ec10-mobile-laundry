import { api } from "../config/api.js";

export async function listNotificationsByUser() {
  return (await api.get("/notification/byUser")).data;
}
export async function countActive() {
  return (await api.get("/notification/countActive")).data;
}

export async function makeUnreadNotification(notificationId) {
  return await api.post(`/notification/${notificationId}/disable`);
}
