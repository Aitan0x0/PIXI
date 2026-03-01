import React from 'react';
import { Link } from 'react-router-dom';

export default function GameCard({ game }) {
    return (
        <Link to={`/game/${game.gameId}`}  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="card-link">
            <div className="rating-div">
                <span>{game.gameRating} <i className="fa-solid fa-star"></i></span>
            </div>

            {game.gameOldPrice > 0 && game.gameNewPrice < game.gameOldPrice && (
                <div className="discount-div">
                    <span>
                        {- Math.round(((game.gameOldPrice - game.gameNewPrice) / game.gameOldPrice) * 100)}%
                    </span>
                </div>
            )}

            <div className="game-card">
                <div className="game-card-img">
                    <img
                                src={`https://localhost:7094${game.gameImages?.find(img => img.isMain === "true")?.imageUrl
                                    }`}
                                alt={game.gameName}
                                loading="lazy"
                            />    </div>
                <div className="card-text">
                    <h2>{game.gameName}</h2>
                    <p>{game.gameDeveloper}</p>
                    <div className="card-prices">
                        {game.gameOldPrice > 0 && game.gameNewPrice < game.gameOldPrice && (
                            <span className="card-old-price">{game.gameOldPrice} AZN</span>
                        )}
                        {game.gameNewPrice == 0 ?      <span className="card-new-price">- FREE -</span> : <span className="card-new-price">{game.gameNewPrice} AZN</span>}
                       
                    </div>
                </div>
            </div>
        </Link>
    );
}
