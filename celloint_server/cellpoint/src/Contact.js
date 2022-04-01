import React from 'react'
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import $ from 'jquery';

// const definedate = () => {
//     $(document).ready(function () {

//         // $('#date').dateDropper({

//         // });

//     });
// }

const Contact = () => {
    var currentDate = new Date();
    let currentDay = currentDate.getDate() < 10
        ? '0' + currentDate.getDate()
        : currentDate.getDate();
    let currentMonth = currentDate.getMonth() < 9
        ? '0' + (currentDate.getMonth() + 1)
        : (currentDate.getMonth() + 1);


    const history = useHistory();
    const [islog, setIslog] = useState(false);
    const [usermessage, setUsermessage] = useState({
        username: "", email: "", message: "", phoneno: ""
    });
    // const [messageid,setMessageid]=useState("");


    const Handlechange = async (e) => {
        const Name = e.target.name;
        const Value = e.target.value;

        setUsermessage({ ...usermessage, [Name]: Value });
    }

    const Getdata = async () => {

        try {
            const res = await fetch("/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },

            });
            const data = await res.json();
            if (data) {
                console.log("data is: ", data);
                setUsermessage({ ...usermessage, username: data.username, email: data.email, phoneno: data.phoneno });
                setIslog(true);
            }
        }
        catch (e) {
            console.log(e);
            history.push("/singin");

        }
    }

    useEffect(() => {
        Getdata();
    }, []);

    const Sendmess = async (e) => {
        e.preventDefault();
        try {
            console.log("chal");
            const { username, email, message, phoneno } = usermessage;
            const res = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username, email, message, phoneno
                })
            });
            console.log("sendmass");
            const data = await res.json();
            console.log("contact data ", data);

            if (!data.status === 201 || !data) {
                console.log("error in data ", data);
            }
            else {
                console.log("succ");
                setUsermessage({ ...usermessage, message: "" });
            }
        }
        catch (e) {
            console.log("contact error ", e);
            history.push("/singin");

        }

    }
    if (islog) {
        return (
            <>

                <div class="container d-flex justify-content-center text-center">
                    <div class="card px-5 py-5">
                        <h1>Contact us form</h1> <span>Got a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible</span>
                        <div class="row">
                            <div class="col-md-6"> <input type="text" class="form-control" placeholder="name" name="username" value={usermessage.username}
                                onChange={Handlechange} /> </div>
                            <div class="col-md-6"> <input type="text" class="form-control" placeholder="phone" name="phoneno" value={usermessage.phoneno}
                                onChange={Handlechange} /> </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6"> <input type="text" class="form-control" placeholder="email" name="email" value={usermessage.email}
                                onChange={Handlechange} /> </div>
                            <div class="col-md-6"> <input id="date" type="text" class="form-control" placeholder="When can we call you?" value={`${currentDay}/${currentMonth}/${currentDate.getFullYear()}`} /> </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-12"> <textarea rows="6" class="form-control" placeholder="Let us know how can we help you?" name="message" value={usermessage.message}
                                onChange={Handlechange}></textarea> </div>
                        </div> <button class="btn btn-success mt-5" onClick={Sendmess}>Send Message <i class="fa fa-long-arrow-right ml-2 mt-1"></i></button>
                    </div>
                </div>
                {/* image Content */}
                {/* <div class="col-md-12"><input type="file" name="image" value="" />upload file</div>
                    <img src="data:image/<%=image.img.contentType%>;base64,
                     <%=image.img.data.toString('base64')%>" /> */}

            </>
        );
    }
    return null;
};

export default Contact;

