import { api } from "./axios";

export async function login(email, password) {
  const response = await api.post("/login", {
    email,
    password,
  });

  // Guardamos el token
  localStorage.setItem("token", response.data.token);

  return response.data.user;
}
