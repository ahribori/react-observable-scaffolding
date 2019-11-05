import axios from "axios-observable";

const instance = axios.create({});

instance.defaults.timeout = 2500;

instance.interceptors.request.use(config => {
  return config;
});

instance.interceptors.response.use(response => {
  return response;
});

export const request = instance;
