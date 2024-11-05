import axios from "axios"

const api = axios.create({
    baseURL: "https://pro-api.coinmarketcap.com"
});
const apiCs = axios.create({
    baseURL: "https://openapiv1.coinstats.app"
});

apiCs.interceptors.request.use(function (config) {
    config.headers["X-API-KEY"] = "IYp1293NRDGn+X4tuGSOAZ/cE/97/LM0wus0XBYtYxg=";
    return config;
});

api.interceptors.request.use(function (config) {
    config.headers["X-CMC_PRO_API_KEY"] =  "0ed12715-3e80-4ceb-9664-20915cc0b54d";
    return config;
});

export {api,apiCs};
