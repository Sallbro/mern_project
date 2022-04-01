import React from 'react';
import { useState } from 'react';

const Pagination = ({product}) => {
    console.log("paginataion product " + product);
    const [data, setData] = useState(product);
    console.log("data " + data);
    const [currenpage, setCurrenpage] = useState(1);
    const [itemperpage, setItemperpage] = useState(4);

    const pages = [];
    for (let i = 1; i <= Math.ceil(product.length / itemperpage); i++) {
        pages.push(i);
    }
    const handleclick = (number) => {
        setCurrenpage(number);
        let lastindex = currenpage * itemperpage;
        let firstindex = lastindex - itemperpage;
        let updatedata = product.slice(firstindex, lastindex);
        console.log("update " + updatedata);
    }
    // console.log(updatedata);
    console.log(currenpage);
    const renderpages = pages.map((number) => {
        return (
            <>
                <li class="number" id={number} onClick={() => handleclick(number)}>{number}</li>
            </>
        )
    })
    console.log("data length: " + data.length);
    console.log("product length: " + product.length);
    console.log(renderpages);
    return (
        <>
            <div class="numberblock">
                <ul class="numbers">
                    {renderpages}
                </ul>
            </div>

        </>
    )
}

export default Pagination;
