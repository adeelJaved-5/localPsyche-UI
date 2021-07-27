import React from 'react';
import Header from "../../components/Header"
import CoinDetail from "../../components/CoinDetail"
import Footer from ".././Footer"


function BlogSHUSKY() {

    return (  
        <React.Fragment> 
            <Header />
                <CoinDetail name="Siberian Husky" symbol="SHUSKY" website="http://shuskytoken.com/" tg="http://t.me/SHUSKYTOKEN" address="0x236d53148f83706c3d670064809577385f923a75" />  
           <Footer />
        </React.Fragment>
    ); 
}

export default BlogSHUSKY;