import React, { useRef, useState, useEffect } from 'react';
import GameDetail from './GameDetail';
import { useParams } from 'react-router-dom'
import Recomended from './Recomended';

export default function GameReadmore() {
  const { id } = useParams();
  const [game, setGame] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`https://localhost:7094/api/games/${Number(id)}`)
      .then(response => response.json())
      .then(json => {
        const gameList = json
        console.log(gameList)
        console.log(gameList.gameImages.slice(1))
        setGame(gameList)
        setLoading(false)
      })
      .catch(err => {
        console.error("Api errorr;", err)
        setLoading(false)
      }
      )
  }, [id])

  useEffect(() => {
    fetch(`https://localhost:7094/api/games`)
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
  }, [id])
  if (loading) return <p>Loadingg ...</p>

  return (
    <div class="right-side-readmore">
      <GameDetail game={game} />
      <Recomended catId={game.gameCategoryId} gameId={game.gameId} games={games}/>

    </div>
  )
}
