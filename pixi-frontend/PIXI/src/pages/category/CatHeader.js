import React from 'react'
import { useParams } from 'react-router-dom'

export default function CatHeader({  cat = [] }) {
    
    return (
      <div className="header-cat-games">
            <div className="cat-img"><img src={`https://localhost:7094${cat?.categoryImgUrl}`} alt="Cat-img" />
                <div className="cat-img-grad"></div>
                <p className="cat-name-p">{cat?.categoryName || "loading..."}</p>
            </div>
        </div>
    )
}
