import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogINNBC() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Innovative Bioresearch" symbol="INNBC" website="https://www.innovativebioresearch.com/" tg="https://t.me/innovativebioresearch" address="0xB67718b98d52318240c52E71A898335da4A28c42" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogINNBC;