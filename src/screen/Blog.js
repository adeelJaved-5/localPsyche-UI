import React from 'react';
import Header from "../components/Header"
import Footer from "./Footer"
import {Link} from 'react-router-dom'


function Blog() {

    return (  
        <React.Fragment> 
            <Header />
                <div className="coming_soon">
                    <div className="container">
                        <div className="blog_card p-5">
                            <h1 className="text-white h1 pb-3">Coins listed on LocalPsyche</h1>
                            <div className="pl-3" >
                                
                                <Link className="text-white" to="/blog/brtr-coin-listed-on-localpsyche">BRTR</Link><br />
                                <Link className="text-white" to="/blog/ooks-coin-listed-on-localpsyche">OOKS</Link><br />
                                <Link className="text-white" to="/blog/krill-coin-listed-on-localpsyche">KRILL</Link><br />
                                <Link className="text-white" to="/blog/bfredx-coin-listed-on-localpsyche">FREDX</Link><br />
                                <Link className="text-white" to="/blog/TXC-coin-listed-on-localpsyche">TXC</Link><br />
                                <Link className="text-white" to="/blog/MVH-coin-listed-on-localpsyche">MVH</Link><br />
                                <Link className="text-white" to="/blog/PENKY-coin-listed-on-localpsyche">PENKY</Link><br />
                                <Link className="text-white" to="/blog/PRC-coin-listed-on-localpsyche">PRC</Link><br />
                                
                                {/* Link className="text-white" to="/blog/8PAY-coin-listed-on-localpsyche">8PAY</Link><br />
                                <Link className="text-white" to="/blog/SHUSKY-coin-listed-on-localpsyche">SHUSKY</Link><br />
                                <Link className="text-white" to="/blog/RELI-coin-listed-on-localpsyche">RELI</Link><br />
                                <Link className="text-white" to="/blog/INNBC-coin-listed-on-localpsyche">INNBC</Link><br />
                                <Link className="text-white" to="/blog/BITBOX-coin-listed-on-localpsyche">BITBOX</Link><br />
                                <Link className="text-white" to="/blog/NFTBOX-coin-listed-on-localpsyche">NFTBOX</Link><br />
                                <Link className="text-white" to="/blog/LAND-coin-listed-on-localpsyche">LAND</Link><br />
                                <Link className="text-white" to="/blog/GENX-coin-listed-on-localpsyche">GENX</Link><br /> */}
                            </div>
                        </div>
                    </div>
                </div>
           <Footer />
        </React.Fragment>
    ); 
}

export default Blog;