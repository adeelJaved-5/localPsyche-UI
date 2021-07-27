import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogBITBOX() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="BITBOX" symbol="BITBOX" website="http://bitbox.fun/" tg="https://t.me/bitboxmoney" address="0x3Ed0f7438Fd06e560cC0E12aF56107AC56dc59d6" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogBITBOX;