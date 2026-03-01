import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function AdminGameForm({ mode }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [game, setGame] = useState({
        gameName: "",
        gameDeveloper: "",
        gameRating: "",
        gameNewPrice: "",
        gameDescription: ""
    });

    const [mainImg, setMainImg] = useState(null);
    const [additionalImgs, setAdditionalImgs] = useState([]);
    const [newAdditionalImgs, setNewAdditionalImgs] = useState([]); // əlavə ediləcək yeni şəkillər
    const [gameCat, setGameCat] = useState("Action");
    const [categories, setCategories] = useState([]);

    //   cats getirir
    useEffect(() => {
        fetch("https://localhost:7094/api/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    //   oyunu getirir
    useEffect(() => {
        if (mode === "edit" && id) {
            fetch(`https://localhost:7094/api/games/${id}`)
                .then(res => res.json())
                .then(data => {
                    setGame({
                        gameName: data.gameName,
                        gameDeveloper: data.gameDeveloper,
                        gameRating: data.gameRating,
                        gameNewPrice: data.gameNewPrice,
                        gameDescription: data.gameDescription
                    });
                    setMainImg(data.gameImages.find(img => img.isMain === "true") || null);
                    setAdditionalImgs(data.gameImages.filter(img => img.isMain !== "true") || []);
                    setGameCat(data.gameCategory?.categoryName || "Action");
                });
        }
    }, [mode, id]);
    // console.log(additionalImgs)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGame({ ...game, [name]: value });
    };

    const handleRatingChange = (e) => {
        let value = parseFloat(e.target.value);
        if (isNaN(value)) value = "";

        else if (value < 0) value = 0;

        else if (value > 5) value = 5;
        setGame({ ...game, gameRating: value });
    };

    const handlePriceChange = (e) => {
        let value = parseFloat(e.target.value);

        if (isNaN(value)) value = "";

        else if (value < 0) value = 0;
        setGame({ ...game, gameNewPrice: value });
    };
    console.log(game)

    const handleDeleteImage = async (imageId, isMain = false) => {
        try {
            const res = await fetch(`https://localhost:7094/api/games/image/${imageId}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Silmek mumkun olmadi");

            if (isMain) setMainImg(null);
            else setAdditionalImgs(prev => prev.filter(img => img.gameImageId !== imageId));
        } catch (err) {
            console.error(err);
        }
    };
    const handleDeleteAdditionalImage = (img) => {
        if (img.imageId) {

            handleDeleteImage(img.imageId);
        } else {

            setNewAdditionalImgs(prev => prev.filter(f => f !== img));
        }
    };

    const handleNewAdditionalImgs = (e) => {
        setNewAdditionalImgs([...e.target.files]);
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submit clicked", game, mainImg, newAdditionalImgs);

        const formData = new FormData();
        formData.append("gameName", game.gameName);
        formData.append("gameDeveloper", game.gameDeveloper);

        formData.append("gameDescription", game.gameDescription);
        formData.append("gameCategoryId", categories.find(c => c.categoryName === gameCat)?.categoryId);
        formData.append("gameRating", game.gameRating != null ? game.gameRating.toString().replace(",", ".") : "0");
        formData.append("gameNewPrice", game.gameNewPrice != null ? game.gameNewPrice.toString().replace(",", ".") : "0");
        const files = newAdditionalImgs.filter(img => img !== mainImg);

        if (mainImg instanceof File) {
            formData.append("newImages", mainImg);
            formData.append("mainImageIndex", 0);
        }

        files.forEach(img => formData.append("newImages", img));



        const url = mode === "edit"
            ? `https://localhost:7094/api/games/${id}`
            : `https://localhost:7094/api/games/add`;

        const method = mode === "edit" ? "PUT" : "POST";

        try {
            const res = await fetch(url, { method, body: formData });
            if (!res.ok) {
                const text = await res.text();
                throw new Error("Failed to save game: " + text);
            }

            const data = await res.json();
            console.log("Game saved:", data);
            navigate(-1);
        } catch (err) {
            console.error(err);
        }
    };


    return (
        <>
            <h2 className="admin-dash-h2">{mode === "edit" ? "Edit Game" : "Add Game"}</h2>
            <div className="form-container">
                <p>
                    <Link to="" className="back-btn" onClick={() => navigate(-1)}>{"<"}</Link>
                </p>
                <form onSubmit={handleSubmit}>


                    <div class="btns-label">
                        <label for="file-edit" class="file-edit-btn">ADDITIONAL
                            IMAGES <input id="file-edit" type="file" onChange={(e) => setNewAdditionalImgs(Array.from(e.target.files))} multiple /></label>
                        <label for="main-img-file" class="main-img-file-label">MAIN IMAGE</label> <input
                            id="main-img-file" onChange={(e) => setMainImg(e.target.files[0])} type="file" />
                    </div>



                    <div class="images">
                        <div class="additional-game-imgs">
                            {additionalImgs?.map(img => (
                                <div class="add-img" key={img.imageId}>
                                    <button type="button" class="delete-img-btn" onClick={() => handleDeleteAdditionalImage(img)}> x</button>
                                    <img src={img instanceof File ? URL.createObjectURL(img) : `https://localhost:7094${img.imageUrl}`} alt="img" />                                    </div>
                            ))}
                            {newAdditionalImgs?.map((img, index) => (
                                <div class="add-img" key={index}>
                                    <button type="button" class="delete-img-btn" onClick={() => handleDeleteAdditionalImage(img)}> x</button>
                                    <img src={img instanceof File ? URL.createObjectURL(img) : `https://localhost:7094${img.imageUrl}`} alt="img" />                                    </div>
                            ))}
                        </div>



                        <div className="main-game-img">
                            {mainImg ? (
                                <div className="main-img">
                                    <img src={mainImg instanceof File ? URL.createObjectURL(mainImg) : `https://localhost:7094${mainImg.imageUrl}`} alt="Main" />
                                    <button type="button" className="delete-img-btn" onClick={() => setMainImg(null)}>x</button>
                                </div>
                            ) : additionalImgs.find(img => img.isMain === "true") ? (
                                <div className="main-img">
                                    <img src={`https://localhost:7094${additionalImgs.find(img => img.isMain === "true").imageUrl}`} alt="Main" />
                                    <button type="button" className="delete-img-btn" onClick={() => handleDeleteImage(additionalImgs.find(img => img.isMain === "true"))}>x</button>
                                </div>
                            ) : null}
                        </div>

                    </div>





                    <div class="cat-img-change">
                        <label htmlFor="category-select" className="category-label">
                            Category:
                            <select value={gameCat} id="category-select" onChange={(e) => setGameCat(e.target.value)}>
                                {categories.map(cat => (
                                    <option key={cat.categoryId} value={cat.categoryName}>{cat.categoryName}</option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className="input-edit-add-games">
                        <input type="text" name="gameName" placeholder="Name" value={game.gameName} onChange={handleChange} />
                        <input type="text" name="gameDeveloper" placeholder="Developer" value={game.gameDeveloper} onChange={handleChange} />
                        <input type="number" name="gameRating" placeholder="Rating" step="0.1" value={game.gameRating} onChange={handleRatingChange} />
                        <input type="number" name="gameNewPrice" placeholder="Price" step="0.01" value={game.gameNewPrice} onChange={handlePriceChange} />
                        <textarea name="gameDescription" placeholder="Description" value={game.gameDescription} onChange={handleChange}></textarea>
                    </div>

                    <button type="submit" className="edit-add-btn">{mode === "edit" ? "EDIT" : "ADD"}</button>
                </form >
            </div >






        </>
    );
}
