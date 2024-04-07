import { useEffect, useState } from "react";
import UserContext from "./Usercontext";
import { getUser } from "../utils";



export default  function UserContextProvider({children}){
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')))

    useEffect( ()=>{
           const fetchUserData = async () => {
             const userData = await  getUser()
             setUser(userData)
             sessionStorage.setItem('user', JSON.stringify(userData))
            }
            fetchUserData()
    },[])
    return(
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    )
}