import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogGENX() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="GENX" symbol="GENX" website="http://evodefi.com" tg="https://t.me/evolution_bsc" address="0x9aa18a4e73e1016918fa360eed950d9580c9551d" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogGENX;