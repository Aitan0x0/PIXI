import React from 'react'
import { useState } from 'react'

export default function ProfileImgModal({ isOpen, onClose, imageUrl }) {


  if (!isOpen) return null

    const closeModal = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };
  return (
   <>
    <div className="modal-overlay" onClick={closeModal}>
    <div className="modal-content-profile-img">

      <div className="profile-img-modal-body">
        <img src={imageUrl ? `https://localhost:7094${imageUrl}` : "https://via.placeholder.com/300"} alt="Profile" className="profile-img-modal-image" />
      </div>
    </div>
   </div>
   </>
  )
}
