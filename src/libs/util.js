import Cookies from "js-cookie";

export const TOKEN_KEY = "token";

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: 1 });
};

export const setCookie = (c_name, exdays) => {
  var exdate = new Date(); //获取时间
  exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
  //字符串拼接cookie
  window.document.cookie =
    "token" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
};

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY);
  if (token) return token;
  else return false;
};

export const delToken = () => {
    setCookie("clear", -1);
};
