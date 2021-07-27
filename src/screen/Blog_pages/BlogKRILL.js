import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogKRILL() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Krill" symbol="KRILL" website="https://polywhale.finance/" tg="http://t.me/polywhalefi" address="0x05089C9EBFFa4F0AcA269e32056b1b36B37ED71b" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogKRILL;