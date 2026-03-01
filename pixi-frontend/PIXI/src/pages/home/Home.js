import React, { useContext, useEffect, useState } from 'react'
import HomeAbout from './HomeAbout'
import HeaderSwiper from './HeaderSwiper'
import HomeDiscount from './HomeDiscounted'
import HomeFree from './HomeFree'
import HomeCategory from './HomeCategory'
import HomePopular from './HomePopular'
import { UserContext } from '../../UserContext'


export default function Home() {
  const {user , setUser} = useContext(UserContext)
  const [games, setGames] = useState([])
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  
useEffect(() => {
  if (!user) {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({ name: payload.sub, id: payload.id });
    }
  }
}, [user, setUser]);


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

  useEffect(()=>{
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


  if (loading)
    return <p>Loading games ...</p>



  return (

    <div className="right-side-container">
      <HeaderSwiper />
      <HomeAbout />


      <div className="games-container">
        <HomeDiscount games={games} />
        <HomePopular games={games} />
        <HomeFree games={games} />
         <HomeCategory cats = {cats} />
      </div>
    </div>

  )
}
