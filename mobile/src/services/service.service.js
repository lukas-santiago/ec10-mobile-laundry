import { api } from "../config/api.js";

export async function listServices() {
  return (await api.get("/servico")).data;
}

export async function createService(serviceData) {
  return await api.post("/servico", serviceData);
}

export async function getService(serviceId) {
  return await api.get("/servico/" + serviceId);
}

export async function updateService(serviceId, serviceData) {
  return await api.put("/servico/" + serviceId, serviceData);
}

export async function deleteService(serviceId) {
  return await api.delete("/servico/" + serviceId);
}
