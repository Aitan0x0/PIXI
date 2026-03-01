import React, { useEffect, useMemo, useState } from 'react'

export default function FiltredGames({ cats = [], games = [], filterGame, site }) {

    const [priceSort, setpriceSort] = useState("default");
    const [nameSort, setNameSort] = useState("default");
    const [filteredGames, setfilteredGames] = useState([]);
    const [catId, setCatId] = useState(0);

    useEffect(() => {
        if (!games.length) {
            filterGame([]);
            return;
        }

        let sortedGame = [...games];

        if (priceSort === "low-high") sortedGame.sort((a, b) => a.gameNewPrice - b.gameNewPrice);
        else if (priceSort === "high-low") sortedGame.sort((a, b) => b.gameNewPrice - a.gameNewPrice);

        if (nameSort === "a-z") sortedGame.sort((a, b) => a.gameName.localeCompare(b.gameName));
        else if (nameSort === "z-a") sortedGame.sort((a, b) => b.gameName.localeCompare(a.gameName));

        if (catId > 0) sortedGame = sortedGame.filter(catGame => catGame.gameCategoryId === Number(catId));

        filterGame(sortedGame);
    }, [priceSort, nameSort, catId, games, filterGame]);



    return (
        <div className="filter">
            {site !== "freeGames" ? <div className="price-sort">
                <h3>PRICE</h3>
                <label> <input type="radio" name="sort-price" value={"default"} checked={priceSort == "default"} onChange={(e) => setpriceSort(e.target.value)} />DEFAULT</label>
                <label> <input type="radio" name="sort-price" value={'low-high'} checked={priceSort == "low-high"} onChange={(e) => setpriceSort(e.target.value)} />LOW - HIGH</label>
                <label> <input type="radio" name="sort-price" value={"high-low"} checked={priceSort == "high-low"} onChange={(e) => setpriceSort(e.target.value)} />HIGH - LOW</label>
            </div> : ""}

            <div className="name-sort">
                <h3>NAME</h3>
                <label> <input type="radio" name="sort-name" value={"default"} checked={nameSort == "default"} onChange={(e) => setNameSort(e.target.value)} />DEFAULT</label>
                <label> <input type="radio" name="sort-name" value={"a-z"} checked={nameSort == "a-z"} onChange={(e) => setNameSort(e.target.value)} />A - Z</label>
                <label> <input type="radio" name="sort-name" value={"z-a"} checked={nameSort == "z-a"} onChange={(e) => setNameSort(e.target.value)} />Z - A</label>

            </div>

            <div className="cat-filter">
                <h3>CATEGORY</h3>
                <ul className="cat-list">
                    <li className={catId === 0 ? "active-cat" : ""} onClick={() => setCatId(0)}>All</li>
                    {cats.map(cat => (
                        // console.log(catId)||
                        <li key={cat.categoryId} className={catId === cat.categoryId ? "active-cat" : ""} onClick={() => setCatId(cat.categoryId)}>{cat.categoryName}</li>
                    ))}



                </ul>
            </div>

        </div>


    )
}
