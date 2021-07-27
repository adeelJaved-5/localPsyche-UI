import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogBFREDX() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="FRED Energy ERC-20" symbol="FREDX" website="https://fredenergy.org" tg="https://t.me/FREDEnergycommunity" address="0xd8e2b153E94daeC5fE657A49FF59bb68fA67f126" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogBFREDX;