import i18n from "../lang";

export const setToken = (token) => {
  localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY);
};

export const getToken = () => {
  return localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY);
};

export const getFavorites = () => {
  return localStorage.getItem("fav");
};

export const setFavorites = (x) => {
  localStorage.setItem("fav", x);
};

export const customLocaleLowerCase = (str) => {
  let lngCode = i18n.language;
  return str.toLocaleLowerCase(lngCode);
};

export const customLocaleCompare = (str1, str2, acceptEqual = true) => {
  let lngCode = i18n.language;
  const comparisonResult = str1.localeCompare(str2, lngCode);
  if (acceptEqual) {
    return comparisonResult >= 0;
  } else {
    return comparisonResult === 1;
  }
};
