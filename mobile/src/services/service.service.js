import { api } from "../config/api.js";

export async function listServices() {
  return (await api.get("/service")).data;
}

export async function createService(serviceData) {
  return await api.post("/service", serviceData);
}

export async function getService(serviceId) {
  return await api.get("/service/" + serviceId);
}

export async function updateService(serviceId, serviceData) {
  return await api.put("/service/" + serviceId, serviceData);
}

export async function deleteService(serviceId) {
  return await api.delete("/service/" + serviceId);
}
