import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { useHistory } from 'react-router';


const Singup = () => {

    const [user, setUser] = useState({
        username: "", email: "", password: "", phoneno: "", dateofbirth: "", country: "India", gender: "female"
    });
    const history = useHistory();

    const { username, email, password, phoneno, dateofbirth, country, gender } = user;

    const Handlechange = async (e) => {
        e.preventDefault();
        const Name = e.target.name;
        const Value = e.target.value;

        setUser({ ...user, [Name]: Value });
        console.log("Name: " + Name);
        console.log("value: " + Value);
    }
    const settinggender = (e) => {
        const name = e.target.name;
        if (name == "male") {
            setUser({ ...user, gender: "male" });
            console.log(gender);
        }

        if (name == "female") {
            setUser({ ...user, gender: "female" });
            console.log(gender);
        }
    }
    const Postdata = async (e) => {
        e.preventDefault();
        if (!username || !email || !password || !phoneno || !dateofbirth || !country || !gender) {
            alert("Please Fill All The Details");
        }
        else {
            console.log("work");
            const res = await fetch("/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, email, password, phoneno, dateofbirth, country, gender
                })
            });
            console.log("work 2");
            const data = await res.json();
            console.log("work 3");
            if (data.status === 422 || !data) {
                alert("invalid");
            } else {
                alert("succesful");
                history.push("/singin");
            }
        }
    }
    return (
        <>

            <div class="wrapper bg-white">
                <div class="h2 text-center">Cell</div>
                <div class="h2 text-center">Point</div>
                <div class="h5 font-weight-bold">Registration</div>
                <div class="text-muted">Enter your registration details</div>
                <form method="POST">
                    <div class="d-sm-flex align-items-sm-center justify-content-sm-between pt-1">
                        <div class="form-group"> <label class="text-muted mandatory">Name</label>
                            <input type="text" required class="form-control" value={username} name="username" onChange={Handlechange} placeholder="username" />
                        </div>
                        <div class="form-group"> <label class="text-muted mandatory">Email Address</label>
                            <input type="email" required class="form-control" value={email} name="email" onChange={Handlechange} placeholder="email" />
                        </div>
                    </div>
                    <div class="d-sm-flex align-items-sm-center justify-content-sm-between pt-1">

                        <div class="form-group"> <label class="text-muted mandatory">Gender</label>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="male" id="flexRadioDefault1" onClick={(e) => settinggender(e)} />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    MALE
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="female" id="flexRadioDefault2" checked onClick={(e) => settinggender(e)} />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    FEMALE
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="text-muted">Date of Birth</label>
                            <input type="date" id="birthday" value={dateofbirth} name="dateofbirth" onChange={Handlechange} />
                        </div>
                    </div>
                    <div class="d-sm-flex align-items-sm-center justify-content-sm-between pt-1">
                        <div class="form-group"> <label class="text-muted mandatory">Phone Number</label>
                            <input type="tel" required class="form-control" value={phoneno} name="phoneno" onChange={Handlechange} placeholder="phoneno" /> </div>
                        <div class="form-group">
                            <label class="text-muted">Country</label>
                            <select id="country" value={country} name="country" onChange={Handlechange} >
                                <option value="ind">India</option>
                                <option value="us">USA</option>
                                <option value="uk">UK</option>
                                <option value="aus">Australia</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group"> <label class="text-muted mandatory">Password</label>
                        <input type="password" required class="form-control" value={password} name="password" onChange={Handlechange} placeholder="password" />
                    </div>
                    <div class="d-flex align-items-center justify-content-sm-end button-section">
                        <button class="btn btn-primary mx-auto" type="submit" value="Submit" onClick={Postdata}>Submit</button>
                        {/* <button class="btn">Cancel</button>  */}
                    </div>
                    <div class="signup-link">Not a member? <NavLink to="/singin" >Already Register</NavLink></div>
                </form>
            </div>

        </>
    )
}

export default Singup;

