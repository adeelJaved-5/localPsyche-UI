import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogRELI() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Relite" symbol="RELI" website="https://www.relite.finance/" tg="https://t.me/relitefinance" address="0x0e58ed58e150dba5fd8e5d4a49f54c7e1e880124" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogRELI;