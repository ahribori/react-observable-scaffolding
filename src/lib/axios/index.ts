import Axios from "axios-observable";

const instance = Axios.create({});

instance.defaults.timeout = 2500;

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(response => {
  return response;
});

export const axios = instance;
