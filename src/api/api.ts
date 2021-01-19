import axios from "axios"

let instance = axios.create({
    baseURL: `https://hacker-news.firebaseio.com/v0/`,
})

export const newsApi = {
    getIds () {
        return instance.get('newstories.json?print=pretty&orderBy="$key"&limitToFirst=5').then(res => {
            return res.data
        })
    },
    getNews (id: number) {
        return instance.get(`item/${id}.json?print=pretty`,).then(response => {
            return response.data
        })
    }
}