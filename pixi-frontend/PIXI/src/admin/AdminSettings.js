import React from 'react'

export default function AdminSettings() {
  const LogOut = () => {
        localStorage.removeItem("token")
        window.location.href = "/login"

    }
  return (
    <>     <h2 class="admin-dash-h2">Settings</h2>
      <div class="form-container">

        <form action="">
          <div class="cat-img-change">  <label for="file-edit" class="file-edit-btn"> CHANGE IMAGE <input id="file-edit" type="file"
          /></label>
            <button class="admin-logout" type='button' onClick={LogOut}>LOG OUT <i className="fa-solid fa-arrow-right-from-bracket"></i></button>

          </div>
          <div class="input-edit-add-games">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Current Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm New Password" />


          </div>
          <button class="edit-add-btn" type='submit'>Save</button>
        </form>
      </div></>
  )
}
