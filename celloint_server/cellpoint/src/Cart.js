import React from 'react';
// import { products } from './Products'

export const Cart = ({title,descs,amount}) => {
    // const {name,age}={...props};
    // const [testss, setTestss] = useState(products);
    return (
        <div>
            <p>{title}</p>
            <p>{descs}</p>
            <p>{amount}</p>
        </div>
    )
}
