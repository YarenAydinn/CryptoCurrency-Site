import { data } from "autoprefixer"
import { api, apiCs } from "./api"

export const fetchCoins = async () => {
    const response = await apiCs.get('/coins')
    return response.data
}
export const fetchCoinsPage = async (page) => {
    const response = await apiCs.get('/coins?page='+page)
    return response.data
}
export const fetchCoinDetail = async (id) => {
    const response = await apiCs.get('/coins/'+id)
    console.log("detail",response.data);
    return response.data
}
export const fetchCoinChart = async (id) => {
    const response = await apiCs.get('/coins/'+id+'/charts?period=24h')
    console.log("detail chart",response.data);
    return response.data
}
export const fetchSearchCoins = async (name) => {
    const response = await apiCs.get('/coins?limit=20&name=' + name)
    return response.data.result
}
export const fetchExchange = async () => {
    const response = await apiCs.get('/coins/price/exchange')
    return response.data
}
export const fetchListingLatest = async () => {
    const response = await api.get('/v1/cryptocurrency/listings/latest')
    return response.data.data
}

export const searchCryptoList = async (query) => {
    const result = await api.get(`/v1/cryptocurrency/listings/latest?query=${query}`)
    return result.data
}