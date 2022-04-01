import React, { useState } from 'react'
import './styles.css'
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './addshop.css';
import { param } from 'jquery';
import { useSelector } from 'react-redux';

const Addshop = (props) => {
    console.log("addshop props ", props);
    const history = useHistory();
    const [islog, setIslog] = useState(false);
    const [usercarts, setUsercarts] = useState();
    const [totalitem, setTotalitem] = useState();
    const [removeuser, setRemoveuser] = useState();

    let totalam = 0;
    let totalitm = 0;

    const callaboutpage = async () => {
        try {
            console.log("addtocart ");

            const res = await fetch("/addtocart", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            console.log("addtocart 2");

            const data = await res.json();

            console.log("addtocart 3");
            console.log("addshop data: ", data);
            if (!res.status === 200) {
                console.log("frontent error found");
            }
            else {
                console.log("data.addtocarts ", data.addtocarts);
                const obdata = data.addtocarts;
                console.log("obdata ", obdata);
                setUsercarts([...obdata]);
                // setUsercarts_og([...obdata]);
                console.log("undone");

                console.log("done");
                console.log("usercarts ", usercarts);
                setIslog(true);
            }

        }
        catch (e) {
            console.log("frontent error found");
            history.push("/singin");
        }
        if (usercarts) {
            const usercarts_length = usercarts.length;
            setTotalitem(usercarts_length);
        }
    }

    const addshopall = async () => {
        try {
            // console.log("chal");
            // const { username, email, message, phoneno } = usermessage;
            const res = await fetch("/addall", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    usercarts
                })
            });
            const data = await res.json();
            console.log("data of add ", data);
        }
        catch (e) {
            console.log("postreqadd " + e);
        }
    }

    const propsAdd = () => {
        props.addshopHandler(usercarts);
    }
    useEffect(() => {
        addshopall();
        propsAdd();
        console.log("change usercart");

    }, [usercarts]);

    useEffect(() => {
        console.log("callaboutpage");
        callaboutpage();

    }, []);
    console.log("usercarts outside", usercarts);
    console.log("totalitem outside", totalitem);

    const subclick = (index) => {
        const subuser = [...usercarts];
        if (subuser[index].item > 1) {
            subuser[index].item = Number(subuser[index].item) - 1;
            setUsercarts(subuser);
            addshopall();
            console.log("user ", subuser);
        }
    }
    const addclick = async (index) => {
        const adduser = [...usercarts];
        if (adduser[index].item < 5) {
            adduser[index].item = Number(adduser[index].item) + 1;
            setUsercarts(adduser);
            addshopall();
            console.log("adduser[index].item ", adduser[index].item);
        }
    }
    const Removeitem = (index) => {
        const removeuser = [...usercarts];
        console.log("len ", removeuser.length);
        removeuser.splice(index, 1);
        console.log("len ", removeuser.length);
        setUsercarts(removeuser);
        setRemoveuser(removeuser);
        // addshopall();
        console.log("remove item");


    }
    useEffect(() => {
        if (removeuser !== undefined && removeuser.length !== 0) {
            console.log("removeuser");
            addshopall();
        }
    }, [removeuser]);
    if (islog) {
        return (
            <>
                {/* {
                    usercarts.map((elem) => {
                        return (
                            <>
                                <h1>Addshop</h1>
                            </>
                        )
                    })
                } */}
                <div class="card addshop_card">
                    <div class="row">
                        <div class="col-md-8 cart">
                            <div class="title">
                                <div class="row">
                                    <div class="col">
                                        <h4><b>Shopping Cart</b></h4>
                                    </div>
                                    {/* <div class="col align-self-center text-right text-muted">{totalitem} items</div> */}
                                </div>
                            </div>
                            {/* <div class="row border-top border-bottom">
                                <div class="row main align-items-center">
                                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" /></div>
                                    <div class="col">
                                        <div class="row text-muted">Shirt</div>
                                        <div class="row">Cotton T-shirt</div>
                                    </div>
                                    <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                                </div>
                            </div> */}
                            {
                                usercarts.map((elem, index) => {
                                    const { id, name, category, img, amount, describtion, item } = elem;
                                    console.log(name, category, img);
                                    // setTotalamount(totalamount + amount);
                                    // { (amount !== NaN) ? totalam += amount : null }
                                    totalam += (item * Number(amount));
                                    totalitm += Number(item);
                                    return (
                                        <>
                                            <div class="row" onClick={() => {
                                                history.push("/details", { params: { elem } });
                                            }}>
                                                <div class="row main align-items-center">
                                                    <div class="col-2"><img class="img-fluid" src={img} /></div>
                                                    <div class="col">
                                                        <div class="row text-muted">{category}</div>
                                                        <div class="row">{name}</div>
                                                    </div>
                                                    <div class="col" style={{ display: 'flex' }}>
                                                        <div>
                                                            <span onClick={(e) => {
                                                                e.stopPropagation();
                                                                subclick(index)
                                                            }}>-</span>
                                                        </div>
                                                        <span class="border">{item}</span>
                                                        <div >
                                                            <span onClick={(e) => {
                                                                e.stopPropagation();
                                                                addclick(index)
                                                            }}>+</span>
                                                        </div>
                                                    </div>
                                                    <div class="col">RS(&#8377;) {item * Number(amount)}
                                                        <span class="close addshop_cross" onClick={(e) => {
                                                            e.stopPropagation();
                                                            Removeitem(index)
                                                        }}>&#10005;</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })

                            }


                            {/* <div class="row border-top border-bottom">
                                <div class="row main align-items-center">
                                    <div class="col-2"><img class="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg" /></div>
                                    <div class="col">
                                        <div class="row text-muted">Shirt</div>
                                        <div class="row">Cotton T-shirt</div>
                                    </div>
                                    <div class="col"> <a href="#">-</a><a href="#" class="border">1</a><a href="#">+</a> </div>
                                    <div class="col">&euro; 44.00 <span class="close">&#10005;</span></div>
                                </div>
                            </div> */}
                            <div class="back-to-shop">
                                {/* <a href="#">&leftarrow;</a> */}
                                <span class="text-muted" onClick={() => {
                                    history.push("/");
                                }}>Back to shop</span></div>
                        </div>
                        <div class="col-md-4 summary">
                            <div>
                                <h5><b>Summary</b></h5>
                            </div>

                            <div class="row">
                                <div class="col addshop_pd">ITEMS {totalitm}</div>
                                <div class="col text-right">RS(&#8377;) {totalam}</div>
                            </div>
                            {/* <form>
                                <p>SHIPPING</p> <select>
                                    <option class="text-muted">Standard-Delivery 5.00</option>
                                </select>
                                <p>GIVE CODE</p> <input id="code" placeholder="Enter your code" />
                            </form> */}
                            <div className="address_shop">
                                <div class="row">
                                    <div class="col">Address of shop</div>
                                    <div class="col">singapor plaza cell point</div>
                                </div>
                            </div>
                            <div class="row addshop_bor_pd">
                                <div class="col">TOTAL PRICE</div>
                                <div class="col text-right">RS(&#8377;) {totalam}</div>
                            </div> <button class="btn addshop_btn">CHECKOUT</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return null;
}

export default Addshop;
