import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogMVH() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="MOVIECASH" symbol="BlogMVH" website="https://cinemadrom.com" tg="https://t.me/Cinemadrom_com" address="0x45c943973e65d069906b0dc33dc31d1d7d9d09dc" /> 
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogMVH;