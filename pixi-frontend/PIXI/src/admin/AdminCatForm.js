import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function AdminCatForm({ mode }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cat, setCat] = useState({
        categoryName: "",
        categoryImgUrl: null
    });
    useEffect(() => {
        if(mode==="edit"&& id){
            fetch(`https://localhost:7094/api/categories/${id}`)
                .then(res => res.json())
                .then(data => {
                    setCat({
                        categoryName: data.categoryName,
                        categoryImgUrl: data.categoryImgUrl
                    });
                });
        }
    }, [mode, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCat({ ...cat, [name]: value });
    }

   
    const handleSubmit = (e) => {
        e.preventDefault();
        if (cat.categoryImgUrl === null) {
            alert("Please upload an image for the category."
            )
            return;
        };
        const formData = new FormData();
        formData.append("catName", cat.categoryName);
        formData.append("catImg", cat.categoryImgUrl instanceof File ? cat.categoryImgUrl : null);

        const requestOptions = {
            method: mode === "edit" ? "PUT" : "POST",
            body: formData
        };
        const url = mode === "edit" ? `https://localhost:7094/api/categories/${id}` : `https://localhost:7094/api/categories`;

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                navigate("/admin/categories");
            }
            )
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    return (
        <>
            <h2 className="admin-dash-h2">{mode === "edit" ? "Edit Category" : "Add Category"}</h2>
            <div className="form-container">
                <p>
                    <Link to="" className="back-btn" onClick={() => navigate(-1)}>{"<"}</Link>
                </p>
                <form onSubmit={handleSubmit}>
                    <label for="main-img-file" class="cat-img-file-btn">CATEGORY IMAGE</label> <input
                        id="main-img-file" onChange={(e) => setCat({ ...cat, categoryImgUrl: e.target.files[0] })} type="file" />
                    <div class="images-cat">

                        {cat.categoryImgUrl ? (
                            <div className="main-img-cat">
                                <img src={cat.categoryImgUrl instanceof File ? URL.createObjectURL(cat.categoryImgUrl) : `https://localhost:7094${cat.categoryImgUrl}`} alt="Main" />
                                <button type="button" className="delete-img-btn-cat" onClick={() => setCat({ ...cat, categoryImgUrl: null })}>x</button>
                            </div>

                        ) : null}

                    </div>

                    <div class="cat-img-change">
                    </div>
                    <div className="input-edit-add-games">
                        <input type="text" name="categoryName" style={{ margin: "auto " }} placeholder="Name" value={cat.categoryName} onChange={handleChange} />

                    </div>

                    <button type="submit" className="edit-add-btn">{mode === "edit" ? "EDIT" : "ADD"}</button>
                </form >
            </div >






        </>



    );

}
export default AdminCatForm;