import React from 'react'
import { NavLink } from 'react-router-dom';
import $ from 'jquery';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useLocation } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { useState } from 'react'

function animation() {
    var tabsNewAnim = $('#navbarSupportedContent');
    var activeItemNewAnim = tabsNewAnim.find('.active');
    var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
    var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
    var itemPosNewAnimTop = activeItemNewAnim.position();
    var itemPosNewAnimLeft = activeItemNewAnim.position();
    $(".hori-selector").css({
        "top": itemPosNewAnimTop.top + "px",
        "left": itemPosNewAnimLeft.left + "px",
        "height": activeWidthNewAnimHeight + "px",
        "width": activeWidthNewAnimWidth + "px"
    });
    $("#navbarSupportedContent").on("click", "li", function (e) {
        $('#navbarSupportedContent ul li').removeClass("active");
        $(this).addClass('active');
        var activeWidthNewAnimHeight = $(this).innerHeight();
        var activeWidthNewAnimWidth = $(this).innerWidth();
        var itemPosNewAnimTop = $(this).position();
        var itemPosNewAnimLeft = $(this).position();
        $(".hori-selector").css({
            "top": itemPosNewAnimTop.top + "px",
            "left": itemPosNewAnimLeft.left + "px",
            "height": activeWidthNewAnimHeight + "px",
            "width": activeWidthNewAnimWidth + "px"
        });
    });
}

const Menus = () => {
    const location = useLocation();
    const [count_state, setCount_state] = useState(0)
    const state = useSelector(state => state.Reducer_addshop[0]);

    console.log("state", state);
    useEffect(() => {
        if (state !== undefined) {
            setCount_state(state.length);
            console.log("count state", count_state);
        }
    }, [state]);
    useEffect(() => {

        animation();
        $(window).on('resize', function () {
            setTimeout(function () { animation(); }, 500);
        });

    }, []);

    console.log("location path is: " + location.pathname);

    return (
        <>

            <nav className="navbar navbar-expand-lg navbar-mainbg salman">

                <NavLink className="navbar-brand navbar-logo" to="/" exact>
                    CELL POINT
                </NavLink>

                <div
                    className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">

                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>
                        {/* <Rendermenu /> */}

                        {/* Menus */}
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/" exact >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact" exact>
                                {/* <i  className="far fa-copy"> </i> */}
                                Contact Us
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about" exact>
                                About
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/service" exact>
                                Services
                            </NavLink>
                        </li>

                    </ul>

                </div>
                <ul style={{ "listStyle": "none", "display": "flex", "margin": "0px", "padding": "0px", "flexWrap": "wrap", "alignItems": "center" }}>
                    <li>
                        <button
                            className="navbar-toggler"
                            style={{ "width": "25px", "paddingRight": "30px" }}
                            onClick={function () {
                                setTimeout(function () { animation(); });
                            }}
                            type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fas fa-bars text-white"></i>

                        </button>
                    </li>
                    <li style={{ "margin": "0px", "padding": "0px" }}>
                        <h1 className="count_item">{count_state}</h1>
                        <NavLink className="nav-link" to="/addtocart" exact>
                            <FaShoppingCart color="white" font-size="x-large" />
                            {/* AddToCart */}
                        </NavLink>
                    </li>
                    <li style={{ "margin": "0px", "padding": "0px" }}>
                        <NavLink className="nav-link" to="/singin" exact>
                            <FaUserAlt color="white" font-size="x-large" />
                        </NavLink>
                    </li>
                </ul>

            </nav>



        </>


    )
}

export default Menus;
export { animation }



// list-style: none;
// margin: 0px;
// position: absolute;
// right: 0px;