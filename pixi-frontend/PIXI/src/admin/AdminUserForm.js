import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function AdminUserForm({ mode }) {

    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImg, setProfileImg] = useState(null)

    useEffect(() => {
        if (mode === "edit" && id) {
            fetch(`https://localhost:7094/api/users/${id}`, {
                headers: { Authorization: "Bearer " + localStorage.getItem('token') }
            }).then(res => res.json())
                .then(data => {
                    setUsername(data.username);
                    setEmail(data.email);
                    setRole(data.role);
                    // console.log(data);
                })
        }
    }, [mode, id]);

    const submitFunk = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Password dogru deyil !")
            return;
        }
        setLoading(true)
        const userData = new FormData();
        userData.append("username", username);
        userData.append("email", email);

        if (mode === "add") {
            userData.append("password", password);
            userData.append("confirmPassword", confirmPassword);
        }
        userData.append("role", role);
        if (profileImg) userData.append("userImg", profileImg);

        try {
            const url = mode === "add" ? "https://localhost:7094/api/users/register" : `https://localhost:7094/api/users/${id}`;
            const method = mode === "add" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: { Authorization: mode === "edit" ? "Bearer " + localStorage.getItem('token') : "" },
                body: userData
            })

            if (!res.ok) {
                const error = await res.text()
                throw new Error(error)
            }
            alert(mode === "add" ? "User elave olundu!" : "User deyisdirildi!");
            navigate("/admin/users")
        } catch (err) {
       alert("Error var: bruh" + err.message)


        } finally {
            setLoading(false)
        }


    }

    return (
        <>

            <h2 className="admin-dash-h2">{mode === "add" ? "Add User" : "Edit User"}</h2>
            <div className="form-container">
                <p> <Link to="" className="back-btn" onClick={() => navigate(-1)}>
                    {"<"} </Link>
                </p>
                <form onSubmit={submitFunk}>
                    <div className="cat-img-change">  <label htmlFor="file-edit" className="file-edit-btn"> PROFILE IMAGE <input id="file-edit" onChange={(e)=> setProfileImg(e.target.files[0])} type="file"
                    /></label>
                        {mode === "edit" ?
                            <label htmlFor="category-select" class="category-label">Role:  <select name="" onChange={(e)=> setRole(e.target.value)} value={role} id="category-select">
                                <option value="admin">Admin</option>
                                <option value="user">User</option>

                            </select></label> : ""}


                    </div>

                    <div className="input-edit-add-games">
                        <input type="text" value={username} placeholder="Username" onChange={(e)=>setUsername(e.target.value) } />
                        <input type="email" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}/>


                        {mode === "add" && <> <input type="text" placeholder="Password" onChange={(e)=> setPassword(e.target.value)} />
                            <input type="text" placeholder="Confirm Password" onChange={(e)=> setConfirmPassword(e.target.value)}/></>}

                    
                    </div>
                    <button className="edit-add-btn" disabled={loading}>{mode === "add" ? "ADD" : "EDIT"}</button>


                </form>
            </div>


        </>
    )
}
