import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CatHeader from './CatHeader';
import CatGames from './CatGames';

export default function CategoryGames() {
    const { id } = useParams();
    const [games, setGames] = useState([])
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('https://localhost:7094/api/games')
            .then(response => response.json())
            .then(json => {
                const gameList = json
                console.log(gameList)
                setGames(gameList)
                setLoading(false)
            })
            .catch(err => {
                console.error("Api errorr;", err)
                setLoading(false)
            }
            )
    }, [])

    useEffect(() => {
        fetch(`https://localhost:7094/api/categories`)
            .then(response => response.json())
            .then(json => {
                const catList = json
                // console.log(catList)
                setCats(catList)
                setLoading(false)
            })
            .catch(err => {
                console.error("Api errorr;", err)
                setLoading(false)
            }
            )
    }, [])
if(loading) return <p>loadingg</p>

    return (

        <>
            <CatGames games={games}  cats={cats}/>

        </>
    )
}
