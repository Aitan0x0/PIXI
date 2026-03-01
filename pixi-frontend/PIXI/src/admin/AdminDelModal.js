import React from 'react'

export default function AdminDelModal({message , yesDelete , noDelete}) {
  return (
      <div className="admin-modal">

        <div className="admin-modal-context">
            <p>{message}</p>
            <div className="admin-modal-btns"> 
                <button className="btn-no" onClick={noDelete}>No</button>
                <button className="btn-yes"onClick={yesDelete}>Yes</button>
            </div>

        </div>
        </div>
  )
}
