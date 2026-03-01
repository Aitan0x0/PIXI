import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AdminDelModal from './AdminDelModal'

export default function AdminCats() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchWord, setSearchWord] = useState("")
  const [openModal, setOpenModal] = useState(true)
  const [selectedCat, setSelectedCat] = useState(null)

  const deleteCat = async (catId) => {
    try {
      const res = await fetch(`https://localhost:7094/api/categories/${catId}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      alert("Category deleted successfully");
      setCats(x => x.filter(c => c.categoryId !== catId));
    } catch (err) {
      console.error(err);
    }
  }
  const searchCats = cats.filter((cat) => cat?.categoryName?.toLowerCase().includes(searchWord.toLowerCase()))

  useEffect(() => {
    fetch(`https://localhost:7094/api/categories`)
      .then(response => response.json())
      .then(json => {
        setCats(json)
        setLoading(false)
      })
      .catch(err => {
        console.error("Api errorr;", err)
        setLoading(false)
      }
      )
  }, []);

  if (loading)
    return <p>Loading...</p>
  return (
    <>
      <h2 className="admin-dash-h2">Categories</h2>
      <div className="tables-div">

        <div className="tables-search-add">
          <input type="text" className="search-input" placeholder="Search Category Name... " value={searchWord} onChange={(e) => setSearchWord(e.target.value)} />
          <Link to="/admin/cat/add" className="add-btn"> <i className="fa-solid fa-plus"></i></Link>
        </div>
        <div className="table-div">
          <table className="admin-table" border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th style={{ width: "15%" }}>Name</th>
                <th className="tools">Tools</th>
              </tr>
            </thead>
            <tbody>
              {searchCats?.map(cat => (
                <tr key={cat.categoryId}>
                  <td>{cat.categoryId}</td>
                  <td><div className="table-cat-img"><img src={`https://localhost:7094${cat?.categoryImgUrl}`} alt="" /></div></td>
                  <td>{cat.categoryName}</td>
                  <td className="tools">
                    <div className="tools-div">
                      <Link to={`/admin/cat/edit/${cat.categoryId}`} onClick={() => window.scrollTo({ behavior: "smooth", top: "0px" })} className="edit-btn">
                        <i className="fa-solid fa-pencil"></i></Link>
                      <button className="delete-btn">
                        <i className="fa-solid fa-trash" onClick={() => { setOpenModal(true); setSelectedCat(cat) }}></i></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

        {openModal && selectedCat && (
              <AdminDelModal message={`Do you really want to delete ${selectedCat.categoryName}?`} 
              yesDelete={()=> {deleteCat(selectedCat.categoryId) ; setOpenModal(false)}}
              noDelete={()=> setOpenModal(false)}
              
              />
      
            )}
    </>
  )
}
