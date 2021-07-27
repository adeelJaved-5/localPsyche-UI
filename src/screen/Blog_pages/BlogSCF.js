import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogSCF() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Smart Cash Finance" symbol="SCF" website="http://smartcash.limited/" tg="https://t.me/scfinance" address="" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogSCF;