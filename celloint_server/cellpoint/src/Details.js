import React from 'react'
import { useLocation } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory } from 'react-router';
const Details = () => {
    const location = useLocation();
    const history = useHistory();
    const mypar = location.state;
    const mypar2 = mypar.params.elem.image_details;
    const mypar3 = mypar.params2;
    console.log("mypar ", mypar);
    console.log("mypar2 ", mypar2);

    return (
        <>
            {/* <div style={{ 'backgroundColor': 'black', 'margin-top': '10px', 'margin': 'auto', 'height': "500px", 'width': '500px', 'boxSizing': 'border-box' }}>

                <div className='container-fluid' >
                    <Carousel interval={1500} keyboard={false} pauseOnHover={true}>
                        {mypar2.map((elem) => {
                            return (
                                <Carousel.Item style={{ 'height': "500px", 'width': '500px' }}  >
                                    <img style={{ 'height': "500px", 'width': '500px' }}
                                        className="d-block w-100"
                                        src={elem} />
                                    <Carousel.Caption>
                                        <h3>First Demo </h3>
                                    </Carousel.Caption>
                                </Carousel.Item  >
                            )
                        })

                        }
                    </Carousel>
                </div>
            </div> */}
            <div class='detail_width'>
                <Carousel interval={1000}>
                    {mypar2.map((elem) => {
                        return (
                            <Carousel.Item >
                                <img
                                    className="d-block w-100"
                                    src={elem} />
                                <Carousel.Caption>
                                    <h3>{elem.name}</h3>
                                </Carousel.Caption>
                            </Carousel.Item  >
                        )
                    })

                    }

                </Carousel>

            </div>
            <div style={{justifyContent:"center",alignItems:'center'}}>
                <button  style={{backgroundColor:"black",color:"white"}} onClick={() => history.push("/")}>back to shop</button>
                {/* <button style={{backgroundColor:"black",color:"white"}}>AddToCart</button> */}
            </div>
        </>
    )
}

export default Details;
