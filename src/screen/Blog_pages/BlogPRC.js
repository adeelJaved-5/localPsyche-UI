import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogPRC() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="PRINCOIN" symbol="PRC" website="https://www.princoin.org/" tg="https://twitter.com/princoinprc" address="0x8153712CE691966Bf26c84E1772C9aF80E183D16" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogPRC;