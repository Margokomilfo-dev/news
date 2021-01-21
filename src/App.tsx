import React, {useEffect, useState} from 'react'
import s from './App.module.sass'
import {newsApi, ObjType, UserType} from './api/api'

function AppModule() {

    const [stateId, setStateId] = useState<Array<number> | null>(null)
    const [stateNews, setStateNews] = useState<Array<ObjType>>([])
    const [usersState, setUsersState] = useState<Array<UserType>>([])

    useEffect(() => {
        newsApi.getIds()
            .then(res => {
                setStateId(res)
            })
    }, [])

    useEffect(() => {
        let setTimeOutId = setTimeout(() => {
            stateId && stateId.map(el => {
                newsApi.getNews(el)
                    .then(res => {
                        // console.log(res)
                        setStateNews(state => [...state, res])
                        return res
                    })
                    .then(res => {
                        newsApi.getUser(res.by).then((res) => {
                            debugger
                            setUsersState(state => [...state, res])
                        })
                    })
            })
        }, 0)
        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [stateId])


    return (
        <div className="App">
            <h1>News.</h1>
            <div>The last 30 HOT news</div>
            {stateNews && stateNews.map((el, i) =>
                <div key={i} className={s.item}>
                    <div className={s.firstPart}>
                        <div>
                            <span className={s.index}>{i + 1}. </span>
                            <a href={el.url} className={s.title}>{el.title} </a>
                        </div>
                        <div>
                            comments: {usersState[i] && usersState[i].submitted.length}
                        </div>
                    </div>
                    <div className={s.secondPart}>
                        <span className={s.author}> by <span>{el.by}</span></span>
                    </div>
                </div>)}
        </div>
    )
}

export default AppModule
