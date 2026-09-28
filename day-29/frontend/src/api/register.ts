export type Role = "admin" | "agent" | "customer";

export type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: "string";
};

export type registerResponse = {
  user: User;
  token: string;
};

export async function registerApi(
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<registerResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("invalid name, email, password or");
  }

  return response.json();
}
