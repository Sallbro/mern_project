import React, { useEffect } from 'react';
import { useState } from 'react'
import { useContext } from 'react';
import Addshop from './Addshop';
import { useHistory } from 'react-router';
// import Navs from './Navs'

const Desing = (props) => {
  console.log("desing props ", props);
  const history = useHistory();
  // { card_detail, Addtocart, Postreqadd }
  // useEffect(() => {
  //   console.log('Do something after addtocards has changed');
  //   addto();
  // }, [addto]);


  const [count, setCount] = useState();
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
        setCount([...obdata]);
        console.log("undone");

        console.log("done");
        console.log("count ", count);
      }

    }
    catch (e) {
      console.log("frontent error found");
    }
    // if (usercarts) {
    //     const usercarts_length = usercarts.length;
    //     setTotalitem(usercarts_length);
    // }
  }
  console.log("desing count ", count);
  // const propsAdd = () => {
  //   props.againaddshopHandler(count);
  // }
  useEffect(() => {
    console.log("callaboutpage");
    callaboutpage();
  }, []);
  useEffect(() => {
    if (count !== undefined) {
      console.log("propsadd work");
      console.log("propsadd count ", count);
      props.againaddshopHandler(count);
    }
  }, [count]);

  return (
    <>
      {props.card_detail.map((elem, index) => {
        return (
          <>

            <div class="col mb-5" onClick={() => history.push('/details', { params: { elem } })}>
              {/* onClick={() => history.push('/details', { params: {elem} })} */}
              <div class="card h-100">
                {/* <!-- Sale badge--> */}
                <div class="badge bg-dark text-white position-absolute">Sale {elem.discount} OFF</div>
                {/* <!-- Product image--> */}
                <img class="card-img-top" src={elem.img} alt="image" />
                {/* <!-- Product details--> */}
                <div class="card-body p-4">
                  <div class="text-center">
                    {/* <!-- Product name--> */}
                    <h5 class="fw-bolder">Special Item</h5>
                    {/* <!-- Product reviews--> */}
                    <div class="d-flex justify-content-center small text-warning mb-2">
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                      <div class="bi-star-fill"></div>
                    </div>
                    {/* <!-- Product price--> */}
                    <span class="text-muted text-decoration-line-through">$20.00</span>
                    $18.00
                  </div>
                </div>
                {/* <!-- Product actions--> */}
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                  <div class="text-center" onClick={(e) => {
                    e.stopPropagation();
                    callaboutpage();
                    props.Addtocart(index);
                  }
                  }>
                    <a class="btn btn-outline-dark mt-auto">Add to cart</a>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })
      }
      {/* <Addshop barbad={barbad} /> */}
      {/* <Navs /> */}
    </>
  )
}

export default Desing;
