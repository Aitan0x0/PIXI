import {useMemo} from 'react'
import { Link } from 'react-router-dom'
import GameCard from '../../components/GameCard'

export default function Recomended({ catId, games = [] ,gameId }) {
    const yoxlaGame =games || []
    const catGames = useMemo(() => yoxlaGame.filter(game => game.gameCategoryId === Number(catId) && game.gameId !== Number(gameId)) ,[yoxlaGame, catId])
    return (

        <>

            <div class="similar-games">
                <h2>- Recommended for You -</h2>
                {catGames.slice(0 , 4).map(game => (
                    <GameCard key={game.gameId} game={game} />
                ))}
            </div>
            <Link to={`/category/${catId}`} class="btn-see-more">SEE MORE</Link>
        </>
    )
}
