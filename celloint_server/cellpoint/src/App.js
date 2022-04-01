import React, { useState, useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { Cart } from './Cart';
// import { products } from './Products';
// import Nav from './Nav';
// import { findDOMNode } from 'react-dom';
//import Contact from './Contact';
// import Home from './Home';
import Desing from './Desing';
import './styles.css';
import { Products } from './Products';
import Navbarbutton from './Navbarbutton';
import Pagination from './Pagination';
import Addshop from './Addshop';
// import Navs from './Navs';
import Contact from './Contact';
import { BrowserRouter } from 'react-router-dom';
import Navs from './Navs';
import Menus from './Menus';
import Propdemagkharab from './Propdemagkharab';
import { isEmptyObject } from 'jquery';
// import Addshop from './Addshop';
// import $ from 'jquery';
import App_con from './container/App_con';



console.log(Products);
var last;

const App = (props) => {
console.log("app props from app ",props);
  const Uniquecategory = ["ALL", ...new Set(Products.map((elem) => {
    return elem.category;
  }))];

  const [product, setProduct] = useState(Products);
  const [categorys, setCategorys] = useState(Uniquecategory);
  const [addtocards, setAddtocards] = useState([]);
  const [productidx, setProductidx] = useState([]);
  const [isright, setIsright] = useState(false);
  const count = 0;
  console.log("product " + product);
  console.log("addtocards " + addtocards);
  // pagination
  const [currenpage, setCurrenpage] = useState(1);
  const [itemperpage, setItemperpage] = useState(4);
  // const [currenlimit,setCurrenlimit] =useState(2);
  const [minlimit, setMinlimit] = useState(0);
  const [maxlimit, setMaxlimit] = useState(2);
  const pages = [];
  for (let i = 1; i <= Math.ceil(product.length / itemperpage); i++) {
    pages.push(i);
  }
  let lastindex = currenpage * itemperpage;
  let firstindex = lastindex - itemperpage;
  let updatedata = product.slice(firstindex, lastindex);
  console.log("lastindex" + lastindex);
  console.log("firstindex" + firstindex);
  console.log("updatedata" + updatedata);


  const handleclick = (number) => {
    setCurrenpage(number);
    console.log("update " + updatedata);
  }
  const prevclick = () => {
    if (currenpage > 1) {
      setCurrenpage(currenpage - 1);
    }
    if (currenpage - 1 <= minlimit && currenpage > 1) {
      setMaxlimit(maxlimit - 2);
      setMinlimit(minlimit - 2);
    }
  }
  const nextclick = () => {
    if (currenpage < Math.ceil(product.length / itemperpage)) {
      setCurrenpage(currenpage + 1);
    }
    if (currenpage >= maxlimit && currenpage < Math.ceil(product.length / itemperpage)) {
      // && currenpage<minlimit && currenpage >Math.ceil(product.length / itemperpage)
      setMaxlimit(maxlimit + 2);
      setMinlimit(minlimit + 2);
    }
  }

  const NextDots = () => {
    if (maxlimit < Math.ceil(product.length / itemperpage)) {
      return (
        <>
          <li className="dots" onClick={NextDotfun}>...</li>
        </>
      )
    }
    else {
      return null;
    }
  }
  const PrevDots = () => {
    if (minlimit >= 1) {
      return (
        <>
          <li className="dots" onClick={PrevDotfun}>...</li>
        </>
      )
    }
    else {
      return null;
    }
  }

  const NextDotfun = () => {
    // if(currenpage < Math.ceil(product.length / itemperpage)){
    setCurrenpage(currenpage + 1);
    setMaxlimit(maxlimit + 1);
    setMinlimit(minlimit + 1);
    // }
  }

  const PrevDotfun = () => {

    setCurrenpage(currenpage - 1);
    setMaxlimit(maxlimit - 1);
    setMinlimit(minlimit - 1);

  }

  const Filteredproduct = (catg) => {
    if (catg === 'ALL') {
      setProduct(Products);
      setCurrenpage(1);
      setMaxlimit(2);
      setMinlimit(0);
      updatedata = product.slice(firstindex, lastindex);
      return;
    }
    const Updatefilter = Products.filter((elem) => {
      return elem.category === catg;
    });
    // console.log("catg name: "+catg);
    setProduct(Updatefilter);
    setCurrenpage(1);
    setMaxlimit(2);
    setMinlimit(0);
    updatedata = product.slice(firstindex, lastindex);
    console.log("updatefilter " + product)
  }

  console.log("updatefilter2 ", product)
  // setProduct(Filteredproduct);


  console.log(Uniquecategory);


  const Addtocart = (idx) => {

    const updAddtocard = [...addtocards, product[idx]];
    setIsright(true);
    const prdidx = product[idx];
    setAddtocards(updAddtocard);
    setProductidx(product[idx]);
    if (productidx !== undefined && productidx.length !== 0) {
      console.log("value is present");
      Postreqadd();
    }

    console.log("setaddtocards in Addtocart ", addtocards);
    console.log("setProductidx in Addtocart ", productidx);
    console.log("product[idx]  in Addtocart ", prdidx);

  }


  //console.log(addtocards);

  //pagination
  // useEffect(() => {
  //   setProduct(updatedata);

  //  }, []);
  // useEffect(() => {
  //   setProduct(updatedata);

  // }, []);

  // console.log("data2 "+data);
  // const byss="dimagka";
  // last=addtocards;
  // console.log("addtocards: " + addtocards);
  // console.log("productidx ", productidx);

  //Postreqadd
  const Postreqadd = async () => {
    try {

      console.log("setProductidx in postreq ", productidx);
      const res = await fetch("/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productidx
        })
      });
      const data = await res.json();
      console.log("Postreqadd data of add ", data);
      console.log("Postreqadd productidx ", productidx);

    }
    catch (e) {
      console.log("postreqadd " + e);
    }
  }
 
  useEffect(() => {
    if (productidx) {
      Addtocart();
    }
  }, [productidx]);



  return (
    <>

      {/* <Addshop salman={addtocards}/> */}

      {/* <!-- Navigation--> */}

      {/* <!-- Header--> */}
      {/* <Addshop salman={addtocards} /> */}
      {/* <Navs good={addtocards} /> */}


      <div className="nondis">
        {/* <Propdemagkharab /> */}
      </div>
      {/* <Navs /> */}
      {/* <BrowserRouter>
        <Navs />
        <Menus />
        </BrowserRouter> */}
      <diV class="salmanc">
        {/* <Addshop hata={"hata"} /> */}
        <header class="bg-dark py-5">
          <div class="container px-4 px-lg-5 my-5">
            <div class="text-center text-white">
              <div class="salmanhead">
                <h1 class="display-4 fw-bolder">CELL POINT</h1>
              </div>
              <p class="lead fw-normal text-white-50 mb-0">BOOK YOUR ORDER NOW...</p>
            </div>
          </div>
        </header>

        {/* 
           <BrowserRouter>  
          </BrowserRouter> */}

        {/* navebarbutton */}
        <Navbarbutton categorys={categorys} Filteredproduct={Filteredproduct} />

        {/* <Navs /> */}
        {/* <!-- Section--> */}
        <section class="py-5">
          <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-1 row-cols-md-3 row-cols-xl-4 justify-content-center">

              <App_con card_detail={updatedata} Addtocart={Addtocart}/>

            </div>
          </div>
        </section>


        {/* pagination */}
        <div class="numberblock">
          <ul class="numbers">
            <li class="number" onClick={() => prevclick()}>prev</li>
            <PrevDots />
            {
              pages.map((number) => {
                if (number <= maxlimit && number > minlimit) {

                  return (
                    <>
                      <li id={number} onClick={() => handleclick(number)}
                        className={currenpage == number ? "active" : null}>{number}</li>
                    </>
                  )
                }
                // else {
                //   return;
                // }
              })

            }

            <NextDots />



            <li class="number" onClick={() => nextclick()}>next</li>
          </ul>
        </div>
        {/* <Pagination product={product} />  */}

        {/* <!-- Footer--> */}
        <footer class="py-5 bg-dark">
          <div class="container"><p class="m-0 text-center text-white">Copyright &copy; Cell Point 2021</p></div>
        </footer>
      </diV>

    </>
  );

}

export default App;
export { last };