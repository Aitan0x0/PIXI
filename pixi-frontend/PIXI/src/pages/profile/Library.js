import React, { useContext } from 'react'
import { LibraryContext } from '../../LibraryContext'
import { Link } from 'react-router-dom'



export default function Library() {
  const {library}  = useContext(LibraryContext)
  console.log("library" , library)    
  return (
    <>
      <h2>Library</h2>
      <div className="profile-games">
        {(!library || library.length === 0) ? (<p className='empty-profile-games'>Burada oyun yoxdur :(</p>) : ( library?.map(game => (
        <Link to={`/game/${game?.gameId}`} className="profile-game-a" key={game?.libraryId}>
        
          <div className="profile-game">

            <img src={`https://localhost:7094${game?.mainImage}`} alt="" />
            <p className="profile-game-name">{game?.gameName}</p>
          </div>

        </Link>




        )


        ))}

      </div>

    </>
  )
}
