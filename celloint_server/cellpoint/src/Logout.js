import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import {Usercontext} from './Navs';
import { useContext } from 'react';
const Logout = () => {
    const {state,dispatch} = useContext(Usercontext);
    const [userlogout,setUserlogout]=useState(false);
    const history = useHistory();
    const Logoutpage = () => {
        fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(() => {
            dispatch({type:"USER",payload:false});
            history.push("/singin", { replace: true });
            console.log("logout succ");
        }).catch((e) => {
            console.log("logout error: ", e);
        })
    }

    useEffect(() => {
        Logoutpage();
    }, [])
    if(userlogout)
    return (
        <div>
            <h1>logout page</h1>
        </div>
    )
    return null;
}

export default Logout;
