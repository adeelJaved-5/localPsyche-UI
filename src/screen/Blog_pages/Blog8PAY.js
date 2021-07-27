import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function Blog8PAY() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="8PAY" symbol="8PAY" website="https://www.8pay.network/" tg="https://t.me/official_8pay" address="0xFeea0bDd3D07eb6FE305938878C0caDBFa169042" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default Blog8PAY;