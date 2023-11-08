import { api } from "../config/api.js";

export async function listOrders() {
  return (await api.get("/order")).data;
}

export async function createOrder(orderData) {
  return await api.post("/order", orderData);
}

export async function getOrder(orderId) {
  return await api.get("/order/" + orderId);
}

export async function updateStatusOrder(orderId, status) {
  return await api.put(`/order/${orderId}`, { status });
}
