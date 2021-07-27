import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogYFICS() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="YFI CREDITS GROUP" symbol="YFICS" website="http://yficredits.com" tg="https://t.me/yficreditofficial" address="" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogYFICS;