import React, { useEffect, useMemo, useState , useCallback} from 'react'

import FiltredGames from '../../components/FiltredGames'
import GameCard from '../../components/GameCard'

export default function FreeGames() {
    const [filterGames, setFilterGames] = useState([])
    const [games, setGames] = useState([])
    const [cats, setCats] = useState([])
    const [loading, setLoading] = useState(true)

    const FilteredGameFunk = useCallback((filteredGame) => {
        setFilterGames(filteredGame);
    }, []);
    
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
        fetch('https://localhost:7094/api/categories')
            .then(response => response.json())
            .then(json => {
                const catList = json
                console.log(catList)
                setCats(catList)
                setLoading(false)
            })
            .catch(err => {
                console.error("Api errorr;", err)
                setLoading(false)
            }
            )
    }, [])

    const freeGames = useMemo(() => games.filter(game => game.gameRating >4.4), [games])
    // console.log(freeGames)
    if (loading)
        return <p>Loading games ...</p>

    return (
        <>
            <div className="header-cat-games">
                <div className="cat-img"><img src="/img-store-header/popular-games.jpg" alt="" />
                    <div className="cat-img-grad"></div>
                    <p className="cat-name-p">POPULAR GAMES</p>
                </div>
            </div>

            <div className="right-side-container">
                <FiltredGames cats={cats} games={freeGames} filterGame={FilteredGameFunk} site={"popular"} />

                <div className="game-cards">
                    {!filterGames.length ? <p style={{ width: "100%", textAlign: "center", color: "white", fontSize: "50px", paddingTop: "20px" }}>Burada oyun yoxdur:(</p> : filterGames.map(fGame => (


                        <GameCard game={fGame} key={fGame.gameId} />


                    ))}
                </div>


                {/* <div className="pagenation">
                <button className="geri-page">
                    < </button>
                        <button className="page page-active"> 1 </button>
                        <button className="page"> 2 </button>
                        <button className="page"> 3 </button>
                        <button className="ireli-page"> > </button>


            </div> */}
            </div>
        </>

    )
}
