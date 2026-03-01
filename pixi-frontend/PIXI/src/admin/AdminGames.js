import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminDelModal from './AdminDelModal'


export default function AdminGames() {
  const [games, setGames] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState(null)
  const [searchWord, setSearchWord] = useState("")
  
  useEffect(() => {
    fetch(`https://localhost:7094/api/games`)
      .then(response => response.json())
      .then(json => {
        setGames(json)
        setLoading(false)
      })
      .catch(err => {
        console.error("Api errorr;", err)
        setLoading(false)
      }
      )
  }, []);
  // console.log(games)
  const searchGames = games.filter((u) =>
    u.gameCategory.categoryName?.toLowerCase().includes(searchWord.toLowerCase()) ||
    u.gameName?.toLowerCase().includes(searchWord.toLowerCase()) ||
    u.gameDeveloper?.toLowerCase().includes(searchWord.toLowerCase()) ||
    String(u.gameNewPrice)?.includes(searchWord) ||
    String(u.gameOldPrice)?.includes(searchWord)

  )
  const selectedGameClick = (id) => {
    const game = games.find(g => g.gameId === id)
    setSelectedGame(game)
    setOpenModal(true)
  }



  const handleGameDelete = async (id) => {
    try {
      const res = await fetch(`https://localhost:7094/api/games/${id}`, { method: "DELETE" })
      if (!res.ok) alert("silmek mumkun olmadi")

      if (id !== 0)
        setGames(gamee => gamee.filter(g => g.gameId !== id))
      alert("Oyun ugurla silindi!")
setOpenModal(false)

    }
    catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <h2 className="admin-dash-h2">Games</h2>
      <div className="tables-div">

        <div className="tables-search-add">
          <input type="text" className="search-input" placeholder="Search Game... " value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
          <Link to="/admin/game/add" className="add-btn"> <i className="fa-solid fa-plus"></i></Link>
        </div>
        <div className="table-div">
          <table className="admin-table" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th style={{ width: "15%" }}>Name</th>
                <th style={{ width: "10%" }}>Developer</th>
                <th>Category</th>
                <th>New Price</th>
                <th>Old Price</th>
                <th className="tools">Tools</th>
              </tr>
            </thead>
            <tbody>
              {searchGames?.map(game => (

                <tr key={game.gameId}>
                  <td>{game.gameId}</td>
                  <td><div className="table-img"><img src={`https://localhost:7094${game?.gameImages?.find(img => img.isMain === 'true')?.imageUrl}`} alt="" /></div></td>
                  <td>{game.gameName}</td>
                  <td>{game.gameDeveloper}</td>
                  <td>{game.gameCategory.categoryName}</td>
                  <td>{game.gameNewPrice}</td>
                  <td>{game.gameOldPrice}</td>
                  <td className="tools">
                    <div className="tools-div">
                      <Link to="" className="info-btn"><i
                        className="fa-solid fa-info"></i></Link>
                      <Link to={`/admin/game/edit/${game.gameId}`} onClick={() => window.scrollTo({ behavior: "smooth", top: "0px" })} className="edit-btn">
                        <i className="fa-solid fa-pencil"></i></Link>
                      <button className="delete-btn">
                        <i className="fa-solid fa-trash" onClick={() => selectedGameClick(game.gameId)}></i></button>
                    </div>
                  </td>
                </tr>


              ))}


            </tbody>

          </table>
        </div>

      </div>

      {openModal && selectedGame && (
        <AdminDelModal
          message={`Do you really want to delete ${selectedGame.gameName}?`}
          yesDelete={() => handleGameDelete(selectedGame.gameId)}
          noDelete={() => { setOpenModal(false); setSelectedGame(null); }}
        />
      )}
    </>
  )
}
