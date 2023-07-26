import { createContext } from "react";
import { useContext } from 'react';
import { useState } from 'react';
import jwt from 'jsonwebtoken'


//global

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const tokenUrl = baseUrl+"api/token/";

const AuthContext = createContext();
// to use the information inside component itself
export function useAuth(){
    const auth = useContext(AuthContext)
    if(!auth) {
        return("Error: auth is empty")
    }
    return auth;
}
// to share information beteween companent
export function AuthProvider(props){

    const [state, setState] = useState({
        tokens: null,
        user: null,
        login,
        logout,
    })

    async function login(username, password){
        // const response =  axios.post(url,{username,password})
        console.log(username, password)
        const options = {
            method : "POST",
            body: JSON.stringify({username,password}),
            headers : {'Content-Type' : 'application/json'}

        }

        const response = await fetch(tokenUrl,options)

        const data = await response.json()

        console.log("data",data)

        const decodedAccess = jwt.decode(data.access)
        console.log("decoded",decodedAccess)

       const newState = {
            tokens : data,
            user : {
               username : decodedAccess.username,
               email: decodedAccess.email,
                password : decodedAccess.password,
                id: decodedAccess.user_id
            }
      }

         setState(prevState =>({...prevState, ...newState}));


    }

    function logout() {
        const newState = {
            tokens : null,
            user : null,
        }

        setState(prevState =>({...prevState, ...newState}));
    }

    return (
        <AuthContext.Provider value={state}>
            {props.children}
        </AuthContext.Provider>
    )
}