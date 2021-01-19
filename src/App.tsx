import React, {useEffect, useState} from 'react'
import './App.css'
import {newsApi} from './api/api'

function App() {

    const [stateId, setStateId] = useState<Array<any> | null>(null)
    const [stateNews, setStateNews] = useState<Array<any>>([])

    // console.log('stateId', stateId)
    console.log('stateNews: ', stateNews)

    useEffect(() => {
        newsApi.getIds()
            .then(res => {
                setStateId(res)
            })
    }, [])

    useEffect(() => {
        stateId && stateId.map(el => {
            newsApi.getNews(el)
                .then(res => {
                    // console.log(res)
                    setStateNews([...stateNews, res])
                })
        })
    }, [stateId])

    return (
        <div className="App">
            <h1>News:</h1>
            <div>Here will be last 5 news</div>
            {stateId && stateId.map((el: any, i:number) => <div key={i}>{el}</div>)}
            {stateNews && stateNews.map((el, i) => <div key={i}> id: {el.id}, title: {el.title}</div>)}
        </div>
    )
}

export default App
