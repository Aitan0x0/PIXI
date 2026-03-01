import React from 'react'

export default function HomeAbout() {

  const info = [
    { icon: "fa-sack-dollar", title: "Best Prices" },
    { icon: "fa-rocket", title: "Instant Delivery" },
    { icon: "fa-lock", title: "Secure Payment" },
    { icon: "fa-gamepad", title: "Huge Library" },


  ]
  return (
    <div className="info-div">
      {info.map((inf, index) => (

        <div className="info-card" key={index}>
          <div className="info-dec-top"></div>
          <i className={`fa-solid ${inf.icon}`}></i>
          <h2>{inf.title}</h2>
          <div className="info-dec-bottom"></div>
        </div>
      ))}

    </div>
  )
}
