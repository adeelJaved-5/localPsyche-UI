import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogOOKS() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Onooks" symbol="OOKS" website="https://www.onooks.org" tg="https://t.me/onooks" address="0x69d9905b2e5f6f5433212b7f3c954433f23c1572" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogOOKS;