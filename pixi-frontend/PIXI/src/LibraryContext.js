import { createContext, useEffect, useState } from 'react';
import axios from 'axios'
export const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
    const [library, setLibrary] = useState([]);
     const [userId, setUserId] = useState(null);
    


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.id);
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }, []);

  

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchLibrary = async () => {
      try {
        const res = await axios.get(
          `https://localhost:7094/api/library/${userId}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        setLibrary(res.data);
      } catch (err) {
        console.log("Library fetch error:", err);
      }
    };

   fetchLibrary();
  }, [userId , library]);

 


    return (
        <LibraryContext.Provider value={{library}}>
            {children}
        </LibraryContext.Provider>
    );
};