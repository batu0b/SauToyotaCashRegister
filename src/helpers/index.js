export const setToken = (token) => {
  localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
};
