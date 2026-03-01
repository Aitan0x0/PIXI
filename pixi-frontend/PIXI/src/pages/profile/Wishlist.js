import React, { useContext } from 'react'
import { WishlistContext } from '../../WishlistContext'
import { Link } from 'react-router-dom'


export default function Wishlist() {
  const { wishlist, toggleWishlist } = useContext(WishlistContext)
  return (
    <>
      <h2>Wishlist</h2>
      <div className="profile-games">
        {wishlist.length == 0 ? (<p className='empty-profile-games'>Burada oyun yoxdur :(</p>): ( wishlist.map(game => (
        <Link to={`/game/${game?.gameId}`} className="profile-game-a" key={game.wishlistId}>
          <button title="delete"    onClick={(e) =>  {e.preventDefault();     toggleWishlist(game?.gameId)} } className="delete-profile-game"><i className="fa-solid fa-xmark"></i></button>
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
