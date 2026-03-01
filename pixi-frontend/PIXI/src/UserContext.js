import React, { createContext,  useState  , useEffect} from 'react'

export const UserContext = createContext();
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

// login olan userin melumatlari 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id;
      console.log(localStorage.getItem("token"));


      fetch(`https://localhost:7094/api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch(() => setUser(null));
    } catch (err) {
      console.error("Token decode error:", err);
    }
  }, []);

  // console.log(user)
  return (
    <UserContext.Provider value={{user , setUser}}>
      {children}
    </UserContext.Provider>
  )
}
