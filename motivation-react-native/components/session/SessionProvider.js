import React, { useState, useEffect } from "react";
import SessionContext from "./SessionContext";
import { AsyncStorage} from 'react-native'
export default function SessionProvider({ children }) {
  const [session, setValue] = useState({
    user: {
 
      access_token: '',
    },
  });

  useEffect(() => {
    let gettoken= async()=>{
      let a = await AsyncStorage.getItem('token')
setValue({user:{access_token:a}})
  }
  gettoken();

let getUserData=async()=>{
  let token=await AsyncStorage.getItem('token');
  let id=await AsyncStorage.getItem('id');
  console.log(id);
  if (token){
    let res=await fetch('http://192.168.43.210:8080/api/admin/'+id)
    let resullt=await res.json()
    let user={...resullt,access_token:token}
   
    updateSession({user})
  }
 }
getUserData();
  
  },[]);

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : (prevSession) => ({ ...prevSession, ...nextSession });
    setValue(value);
  }

  async function login({ email, password }) {
    // try to login
console.log({email,password});
    let res = await fetch(
      "http://192.168.43.210:8080/api/login",
      {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    )

    let result1=await res.json();
   console.log(result1);
    let id=result1[1][0].id.toString();
    let token=result1[0].original.access_token;
    await AsyncStorage.setItem('token',token)
    
    await AsyncStorage.setItem('id',id)

  setValue({user:{access_token:token}})
    // return from the function if you have an erro
    if (error || !token)  return ;

    // get the data of the loggedin user
    let result = await fetch(`http://192.168.43.210:8080/api/admin/${id}`, {
      headers: {
        access_token: token,
      },
    }).then((res) => res.json());

    let user = { ...result.data, token };
updateSession({user})


  }

async function logout() {
  let access_token=await AsyncStorage.getItem('token')
    let result = await fetch(`http://192.168.43.210:8080/api/logout`,{
      headers:{
        access_token:access_token
      }
    });
    setValue({user:{access_token:null}})
 await AsyncStorage.removeItem('token')
  }

  const context = {
    session,
    actions: {
      login,
      logout,
      updateSession,
    },
  };

 

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}