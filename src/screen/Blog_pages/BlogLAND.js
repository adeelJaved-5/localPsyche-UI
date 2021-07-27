import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogLAND() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Landshare" symbol="LAND" website="http://www.landshare.io" tg="http://t.me/landshare" address="0x9d986a3f147212327dd658f712d5264a73a1fdb0" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogLAND;