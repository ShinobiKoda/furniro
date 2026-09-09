import { client } from "@/lib/api-client";

export async function signUp(name: string, email: string, password: string) {
  const data = await client.post("/register", {
    name,
    email,
    password,
  });

  localStorage.setItem("auth_token", data.token);

  return data;
}