import React from 'react'
import { useState } from 'react'
const Count_addshop = () => {
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
                // setUsercarts_og([...obdata]);
                console.log("undone");

                console.log("done");
                console.log("count ", count);
            }

        }
        catch (e) {
            console.log("frontent error found");
            history.push("/singin");
        }
        // if (usercarts) {
        //     const usercarts_length = usercarts.length;
        //     setTotalitem(usercarts_length);
        // }
    }
    useEffect(() => {
        callaboutpage();
    }, [count]);
    return (
        <h1>0</h1>
    )
}

export default Count_addshop
