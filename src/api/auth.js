import { api } from "./axios";

export async function login(email, password) {
  const response = await api.post("/login", {
    email,
    password,
  });

  localStorage.setItem("token", response.data.token);

  return response.data.user;
}
