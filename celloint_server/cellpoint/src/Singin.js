import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useHistory } from 'react-router';
import { Usercontext } from './Navs';
import { useContext } from 'react';

const Singin = () => {
    const { state, dispatch } = useContext(Usercontext);
    const [showlogout_btn, setShowlogout_btn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const LoginOrNot = () => {
        if (showlogout_btn || state) {
            return (
                <>
                    <button class="btn_logout" onClick={() => {
                        setEmail("");
                        setPassword("");
                        history.push("/logout");
                    }
                    }>LOGOUT</button>
                </>
            )
        }
        return null;
    }
    const Getdatas = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please Fill All The Details");
        }
        else {
            try {
                console.log("log");
                const res = await fetch("/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email, password
                    })
                });
                const data = await res.json();
                console.log("log2");
                if (data.status === 400 || !data) {
                    res.send("something went wrong ");
                }
                else {
                    dispatch({ type: "USER", payload: true });
                    setShowlogout_btn(true);
                    alert("login succ");
                    history.push("/");
                }
            }
            catch {
                // res.send("gadbad hai");
                console.log("dimag kharab ");
            }
        }
    }
    return (
        <>
            {/* <div>
                <form method="GET">
                    <label>email</label>
                    <input type="text" value={email} name="email"
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }} 
                        placeholder="email" />

                    <label>password</label>
                    <input type="password" value={password} name="password"
                        onChange={(e) => 
                            setPassword(e.target.value)
                        } 
                        placeholder="password" />

                    <button type="submit" onClick={(e)=>e.preventDefault()}>submit</button>
                </form>
            </div>
            <div>
                <NavLink to="/singup">New user</NavLink>
            </div> */}
            <div class="wrapper">
                <div class="title">Login Form</div>
                <form method="POST">
                    <div class="field">
                        <input type="text" value={email} name="email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            placeholder="email" />
                        <label>Email Address</label>
                    </div>
                    <div class="field">
                        <input type="password" value={password} name="password"
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="password" />
                        <label>Password</label>
                    </div>
                    <div class="content">
                        <div class="checkbox">
                            <input type="checkbox" id="remember-me" style={{"marginBottom": "0px"}} />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <div class="pass-link">Forgot password?</div>
                    </div>
                    <div class="field">
                        <input type="submit" value="Login"
                            onClick={Getdatas} />
                    </div>
                    <div class="signup-link">Not a member? <NavLink to="/singup" >Register now</NavLink></div>
                </form>
                <LoginOrNot />
            </div>

        </>
    )
}

export default Singin;

