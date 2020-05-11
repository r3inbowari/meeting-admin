import Cookies from "js-cookie";
import router from '@/router'
export const TOKEN_KEY = "token";

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
};


export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  else return false;
};

export const delToken = () => {
  Cookies.set(TOKEN_KEY, "", { expires: -1 });
  router.push({
    name: "Login",
  }).catch(err => {err});
};

export const checkid = () => {
  if (!getToken()) {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login"
    }
  } else {
    router.push({
      name: "Home",
    }).catch(err => {err});
  }
};

export const checkhome = () => {
  if (!getToken()) {
    if (window.location.pathname !== "/login") {
      window.location.href = "/login"
    }
  }
};
