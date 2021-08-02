import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogTXC() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="TenXcoin" symbol="TXC" website="https://tenxcoin.eu" tg="https://t.me/joinchat/AAAAAEaCn6r88_4e8QuxCQ" address="0xc11551BB497875050b69A2FDCCC20A53a9a70263" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogTXC;