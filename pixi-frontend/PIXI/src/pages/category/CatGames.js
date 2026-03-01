import React, { useEffect, useMemo, useState } from 'react'
import GameCard from '../../components/GameCard'
import { useParams } from 'react-router-dom'

export default function CatGames({ games, cats }) {
    const { id } = useParams();
    const categoryId = Number(id) // string -> number

    const [priceSort, setPriceSort] = useState("default")
    const [nameSort, setNameSort] = useState("default")

    const catGames = useMemo(
        () => games.filter(game => game.gameCategoryId === categoryId),
        [games, categoryId]
    );

    
    const cat = useMemo(
        () => cats.find(c => c.categoryId === categoryId),
        [cats, categoryId]
    );

    const filteredGames = useMemo(() => {
        if (!catGames.length) return [];

        let sortedGames = [...catGames];

        if (priceSort === "low-high") {
            sortedGames.sort((a, b) => a.gameNewPrice - b.gameNewPrice)
        } else if (priceSort === "high-low") {
            sortedGames.sort((a, b) => b.gameNewPrice - a.gameNewPrice)
        }

        
        if (nameSort === "a-z") {
            sortedGames.sort((a, b) => a.gameName.localeCompare(b.gameName))
        } else if (nameSort === "z-a") {
            sortedGames.sort((a, b) => b.gameName.localeCompare(a.gameName))
        }

        return sortedGames
    }, [catGames, priceSort, nameSort]);

    return (
        <>
            <div className="header-cat-games">
                <div className="cat-img">
                    <img src={`https://localhost:7094${cat?.categoryImgUrl}`} alt="Cat-img" />
                    <div className="cat-img-grad"></div>
                    <p className="cat-name-p">{cat?.categoryName || ""}</p>
                </div>
            </div>

            <div className="right-side-container">

                <div className="filter">
                    <div className="price-sort">
                        <h3>PRICE</h3>
                        <label>
                            <input type="radio" name="sort-price" value="default" checked={priceSort === "default"} onChange={e => setPriceSort(e.target.value)} />
                            DEFAULT
                        </label>
                        <label>
                            <input type="radio" name="sort-price" value="low-high" checked={priceSort === "low-high"} onChange={e => setPriceSort(e.target.value)} />
                            LOW - HIGH
                        </label>
                        <label>
                            <input type="radio" name="sort-price" value="high-low" checked={priceSort === "high-low"} onChange={e => setPriceSort(e.target.value)} />
                            HIGH - LOW
                        </label>
                    </div>

                    <div className="name-sort">
                        <h3>NAME</h3>
                        <label>
                            <input type="radio" name="sort-name" value="default" checked={nameSort === "default"} onChange={e => setNameSort(e.target.value)} />
                            DEFAULT
                        </label>
                        <label>
                            <input type="radio" name="sort-name" value="a-z" checked={nameSort === "a-z"} onChange={e => setNameSort(e.target.value)} />
                            A - Z
                        </label>
                        <label>
                            <input type="radio" name="sort-name" value="z-a" checked={nameSort === "z-a"} onChange={e => setNameSort(e.target.value)} />
                            Z - A
                        </label>
                    </div>
                </div>

                <div className="game-cards">
                    {filteredGames.map(game => {                 
                        // console.log("Filter", game.gameName)
                        return <GameCard game={game} key={game.gameId} />
                    })}
                </div>


            </div>
        </>
    )
}
