import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogNFTBOX() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="NFTBOX" symbol="NFTBOX" website="https://nftbox.fun" tg="https://t.me/nftboxfun" address="0xc713d1053a6e8eFA08aE2903181D8cE5182Aa66c" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogNFTBOX;