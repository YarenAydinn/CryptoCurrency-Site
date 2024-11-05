import { apiCs } from "./api";

export const fetchBlogNews = async (page) => {
    const response = await apiCs.get('/news?page=' + page + '&limit=20')
    console.log(response.data);
    return response.data
}
export const fetchNews = async () => {
    const response = await apiCs.get('/news')
    console.log(response.data);
    return response.data
}
    export const fetchNewsId = async (id) => {
        const response = await apiCs.get('/news?id=' + id)
        console.log('newsId',response.data);
        return response.data
    }
