import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogBRTR() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Barter" symbol="BRTR" website="https://barter.company/" tg="http://t.me/barterteam" address="0xf0acf8949e705e0ebb6cb42c2164b0b986454223" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogBRTR;