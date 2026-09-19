import api from "./api";

export const loginAdmin = async (
  email,
  password
) => {
  const response =
    await api.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

  return response.data;
};

export const getCurrentAdmin =
  async () => {
    const response =
      await api.get(
        "/auth/me"
      );

    return response.data;
  };

export const logoutAdmin = () => {
  localStorage.removeItem(
    "portfolio_admin_token"
  );

  localStorage.removeItem(
    "portfolio_admin"
  );
};

export const getStoredAdmin = () => {
  const admin =
    localStorage.getItem(
      "portfolio_admin"
    );

  if (!admin) {
    return null;
  }

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
};

export const isAdminLoggedIn =
  () => {
    return Boolean(
      localStorage.getItem(
        "portfolio_admin_token"
      )
    );
  };