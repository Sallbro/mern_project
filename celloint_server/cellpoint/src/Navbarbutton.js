import React from 'react'

const Navbarbutton = ({ categorys,Filteredproduct }) => {
    return (
        <>
            <nav className="navbar">
                <div className="btn-group">
                    {
                        categorys.map((elem) => {
                            return (
                                <>
                                    <button
                                        class="row row-cols-2 btn-group__item" onClick={()=>Filteredproduct(elem)}>
                                       {elem}
                                    </button>
                                </>
                            )
                        })
                    }

                </div>
            </nav>
        </>
    )
}

export default Navbarbutton;
