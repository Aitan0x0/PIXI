import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import AdminDelModal from './AdminDelModal';

export default function AdminUsers() {
  // butun userler
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");


  useEffect(() => {
    fetch(`https://localhost:7094/api/users`, {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(json => {
        setUsers(json);
        setLoading(false);
      })
      .catch(err => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, [token]);

  const searchUsers = useMemo(() => {

    if (!searchWord) return users;
    return users.filter(u =>
      u.username?.toLowerCase().includes(searchWord.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchWord.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchWord.toLowerCase())
    );
  }, [users, searchWord]);

 
  const handleDeleteClick = async (user) => {
    try {
      const res = await fetch(`https://localhost:7094/api/library/${user.userId}`, {
        headers: { Authorization: "Bearer " + token }
      });
      if (!res.ok) throw new Error("Failed to fetch user library");
      const library = await res.json();

      if (library.length > 0) {
        alert("This user has games in library, you can't delete it");
        return;
      }

      setSelectedUser(user);
      setOpenModal(true);

    } catch (err) {
      console.error(err);
      alert("Error fetching user library");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await fetch(`https://localhost:7094/api/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: "Bearer " + token }
      });

      if (!res.ok) throw new Error("Delete failed");

      setUsers(prev => prev.filter(u => u.userId !== userId));
      setOpenModal(false);
      setSelectedUser(null);
      alert("User deleted successfully");

    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <>
      <h2 className="admin-dash-h2">Users</h2>

      <div className="tables-div">
        <div className="tables-search-add">
          <input
            type="text"
            className="search-input"
            placeholder="Search... (Username, email, role)"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
          />
          <Link to="/admin/user/add" className="add-btn">
            <i className="fa-solid fa-plus"></i>
          </Link>
        </div>

        <div className="table-div">
          <table className="admin-table" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="tools">Tools</th>
              </tr>
            </thead>
            <tbody>
              {searchUsers
                ?.filter(u => u.userId !== user.userId)
                .map(u => (
                  <tr key={u.userId}>
                    <td>{u.userId}</td>
                    <td>
                      <div className="table-img user-img">
                        <img
                          src={u.userImageUrl ? `https://localhost:7094${u.userImageUrl}` : "/img-header/default_profile.jpg"}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td className="tools">
                      <div className="tools-div">
                        <Link to={`/admin/user/edit/${u.userId}`} className="edit-btn">
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button className="delete-btn" onClick={() => handleDeleteClick(u)}>
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>


{/* modal */}
      {openModal && selectedUser && (
        <AdminDelModal
          message={`Do you really want to delete ${selectedUser.username}?`}
          yesDelete={() => deleteUser(selectedUser.userId)}
          noDelete={() => { setOpenModal(false); setSelectedUser(null); }}
        />
      )}
    </>
  );
}
