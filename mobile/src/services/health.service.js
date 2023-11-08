import { api } from "../config/api.js";

export async function checkHealth() {
  return (await api.get("/health")).status;
}
