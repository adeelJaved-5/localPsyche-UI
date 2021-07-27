import React from 'react';


function CoinDetail(props) {

    return (  
        <React.Fragment>
                <div className="coming_soon">
                    <div className="container">
                        <div className="blog_card p-5 mb-5">
                            <h1 className="text-white h1 pb-4">{props.name} coin ({props.symbol}) listed on LocalPsyche</h1>
                            <ul className="text-white">
                                <li>{props.name} Coins</li>
                                <li>Website: <a target="blank" href={props.website}>{props.website}</a></li>
                                <li>TG channel: <a target="blank" href={props.tg}>{props.tg}</a></li>
                                <li>Contract address: {props.address}</li>
                            </ul>
                        </div>
                        <div className="blog_card p-5 mb-5">
                            <h1 className="text-white h1 pb-4">How to buy {props.symbol} coin in LocalPsyche</h1>
                            <p className="text-white">Make an account on LocalPsyche.com.</p>
                            <ul className="text-white mb-5 pt-3">
                                <li>Go to exchange and click on wallet.</li>
                                <li>Fund your account with ETH or USD1.</li>
                                <li>Start trading</li>
                            </ul>
                            <small className="text-white"><b>Note: </b>LocalPsyche doesn’t charge any fees for depositing.</small>
                        </div>
                        <div className="blog_card p-5 mb-5">
                            <p className="text-white pb-4"><b>Disclaimer</b></p>
                            <p className="text-white">Please be aware that LocalPsyche list the coins only in the exchange. LocalPsyche does not give any investment, legal, tax, financial advice, or warranty of token price performance or successful fundraising.</p>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    ); 
}

export default CoinDetail;