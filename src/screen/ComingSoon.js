import React from 'react';
import Header from "../components/Header"
import Footer from "./Footer"


function ComingSoon() {

    return (  
        <React.Fragment> 
            <Header />
                <div className="coming_soon">
                    <div className="container">
                        <div className="coming_card">
                            <h1>Coming Soon...</h1>
                        </div>
                    </div>
                </div>
           <Footer />
        </React.Fragment>
    ); 
}

export default ComingSoon;