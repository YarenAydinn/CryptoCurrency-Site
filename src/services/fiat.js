import {api} from "./api";

export const fetchFiatList = async () => {
    const response = await api.get('/v1/fiat/map')
    return response.data.data
}

export const searchFiatList = async (query) => {
    const result = await api.get(`/v1/fiat/map?query=${query}`)
    return result.data
}