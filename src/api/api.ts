import axios from "axios"

let instance = axios.create({
    baseURL: `https://hacker-news.firebaseio.com/v0/`,
})

export type ObjType = {
    by: string
    descendants: number
    id: number
    score: number
    time: number
    title: string
    type: string
    url: string
    kids: Array<number>
}
export type UserType = {
    about: string
    created: number
    id: string
    karma: number
    submitted: Array<number>
}
export const newsApi = {
    getIds () {
        return instance.get<Array<number>>('newstories.json?print=pretty&orderBy="$key"&limitToFirst=30').then(res => {
            return res.data
        })
    },
    getNews (id: number) {
        return instance.get<ObjType>(`item/${id}.json?print=pretty`,).then(response => {
            return response.data
        })
    },
    getUser(name:string) {
        return instance.get<UserType>(`user/${name}.json?print=pretty`,).then(response => {
            return response.data
        })
    }
}