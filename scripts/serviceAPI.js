import { API_URL, JWT_TOKEN_KEY } from "./const.js";

export const getLogin = async (token) => {
  try {
    const res = await fetch(`${API_URL}/getLogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getUser = async (login) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}/user/${login}`, {
      method: "GET",
      headers,
    });

    const data = res.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};
