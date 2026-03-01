import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext';

export default function SideBar() {
  const [isCatsClose, setIsCatsClose] = useState(true); //yeni bagli olarsa
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user , setUser} = useContext(UserContext)
  const catsCloseFunc = () => {

    setIsCatsClose(x => !x) //toggle edecik

  }

  useEffect(() => {
    fetch(`https://localhost:7094/api/categories`)
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

  if (loading) return <p>loadingggg....</p>
  return (
    <>
      <nav>
        <h1 className="logo">PI<span>X</span>I</h1>
        <hr className="nav-hr"></hr>
        <ul className="nav-ul">
          {user && user.role=="user" ?     <li><Link to="/profile" onClick={()=> window.scrollTo({top: 0 , behavior:"smooth"})}><i style={{ marginRight: "15px" }}  className="fa-solid fa-user nav-icon"></i><span
            className="nav-text">Profile</span></Link></li> : null}
      
          <li><Link to="/home"><i className="fa-solid fa-house nav-icon"></i> <span className="nav-text">Home</span></Link></li>
          <li><Link to="/discountedgames" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><i className="fa-solid fa-tag nav-icon"></i> <span className="nav-text">Discounted Games</span></Link>
          </li>
          <li><Link to="/populargames" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><i className="fa-solid fa-star nav-icon"></i> <span className="nav-text">Popular Games</span></Link>
          </li>
          <li><Link to="/freegames" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><i className="fa-solid fa-gift nav-icon"></i> <span className="nav-text">Free Games</span></Link></li>
        </ul>



        <ul className={`cats-ul ${isCatsClose && "hide-ul"} `}>
          <li className="cats-li" onClick={() => setIsCatsClose(!isCatsClose)}>

            <i style={{ marginLeft: "4px" }} className="fa fa-list nav-icon"></i>Categories <i
              className={`fa-solid fa-caret-${isCatsClose ? "right" : "down"}  icon`}></i></li>
<div className="hidden-li">   {cats.map(cat => (
            <li className="cat" key={cat.categoryId}><Link to={`/category/${cat.categoryId}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}   > {cat.categoryName}</Link></li>
          ))}</div>
       

        </ul>
      </nav></>
  )
}







// })