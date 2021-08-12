import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogPENKY() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="PENKY" symbol="USDT" website="https://penky.io/" tg="https://t.me/penkyOfficial" address="0x3a35e98cc7390a15d458bb85f9a12823e2ef25ed" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogPENKY;