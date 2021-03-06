import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios"
import Header from "../components/Header"
import Footer from "./Footer"
import countries from "../countries.json" 
import { Helmet } from "react-helmet";
import $ from 'jquery';

function Buy() { 
 
    const [dropCur, setDropCur] = useState(false);
    const [dropCun, setDropCun] = useState(false);
    
    const [currency, setCurrency] = useState(null); 
    const [country, setCountry] = useState(''); 
    const [dropcurcountry,setdropcurcountry] = useState(null)
    const [amount, setAmount] = useState(null)
    const [allOrders, setAllOrders] = useState([])
    const [loading, setLoading] = useState(false);

    const [traders, SetTraders] = useState([
        {
            trader: "Top trader",
            orders: "125",
            complete: "100%",
            trust: "4.9",
            payment: "1,800.25",
            covert_into: "PKR",
            convert_amt: "160.92",
            limit: {from: "50,000", to: "988,000"},
        },
        {
            trader: "X trader",
            orders: "125",
            complete: "100%",
            trust: "4.9",
            payment: "250.25",
            covert_into: "PKR",
            convert_amt: "160.92",
            limit: {from: "50,000", to: "988,000"},
        },
        {
            trader: "Pak trader",
            orders: "125",
            complete: "100%",
            trust: "4.9",
            payment: "1,800.25",
            covert_into: "PKR",
            convert_amt: "160.92",
            limit: {from: "50,000", to: "988,000"},
        },
    ])
     

    useEffect(()=>{
        _getAllOrder()
        $('#exampleModalCenter').modal('show')
    },[country])
 
    useEffect(()=>{
        _getLocation()
        document.documentElement.scrollTop = 0;
        document.body.addEventListener("click", ()=>{
            setDropCur(false);
            setDropCun(false);
        })  
    },[]);    

    const _getAllOrder = () => {
        setLoading(true)
        axios.post(`${global.baseurl}:3000/allOrders`, {country: country.toString()})
        .then((response) =>{
            //console.log(response)
            setLoading(false)
            setAllOrders(response.data.data);
            console.log(response.data.data);
        })
        .catch ((error) => {  
            setLoading(false) 
            console.log(error)
        })
    }

    const _getLocation = () => {
        axios.get("https://geolocation-db.com/json/f9902210-97f0-11eb-a459-b997d30983f1")
        .then((response) =>{
            //console.log(response)
            setCountry(response.data.country_name)
            setdropcurcountry(response.data.country_name)
            countries.map(item=>{
                if(response.data.country_name == item.country) 
                 {setCurrency(item.currency_code)}
            })
        }) 
        .catch ((error) => { 
            console.log(error)
        })
    } 

    //console.log(allOrders)

    // Create WebSocket connection.
    //const socket = new WebSocket('ws://exporterbd.com/');

    // Connection opened
    /*socket.addEventListener('buyerData', function (event) {
        console.log(event)
    });*/

    /*const socket = io("ws://localpsyche.com:4001");
        socket.on("connect", () => {
        console.log(socket.connected); // true
    });*/  


    return (
        <React.Fragment> 
            <Helmet>
                <title>Buy and Sell Digital Currency | LocalPsyche</title>
                <meta name="description" content=" Buy and sell digital currency Psyche, USDT and other currencies in any currency globally, Psyche coins and best stablecoin. Start trading now."/>
                <meta name="keywords" content=" p2p marketplace for coin trade, buy and sell digital currency, best Stablecoin, buy stablecoins, sand dollar digital currency, digital coin trading platform "/>
            </Helmet>
            <Header/>
            <div className="buy-p">
                <div className="wrapper flex flex-col">
                    <div className="title font s42 black">With Psyche easy and rapid payments</div>
                    <div className="by-bl flex flex-col">
                        <div className="label font s40 b3 cfff">Buy Psyche</div>
                        <div className="form flex aic">
                            <div className="item flex flex-col">
                                <div className="lbl font s16 cfff">Amount</div>
                                <input 
                                    type="text" 
                                    className="input font s16 c000"
                                    onChange={(e)=>setAmount(e.target.value.replace(/[^0-9\.]/g, ''))}
                                />
                            </div>

                            {/* Select Currency */}
                            <div className="item flex flex-col">
                                <div className="lbl font s16 cfff">Currency</div>
                                <button className="item cleanbtn cstm-slt flex aic rel" onClick={(e)=>{
                                    e.stopPropagation();
                                    setDropCur(!dropCur);  
                                    setDropCun(false); 
                                }}> 
                                    { 
                                        countries.map(item=>(
                                            dropcurcountry == item.country  && <div className="iput flex aic">
                                                <div className="txt font s16 black">{item.currency_code}</div>
                                                <img src="./images/arrow-down.svg" className="arrow"/>          
                                            </div>
                                        ))
                                    }  
                                    {dropCur && <div className="options flex flex-col abs">
                                        {
                                            countries.map(item=>(
                                                <button className="cleanbtn item flex aic anim" onClick={()=>{
                                                    setDropCur(!dropCur); 
                                                    setCurrency(item.currency_code);
                                                    setdropcurcountry(item.country)
                                                }}>        
                                                    <div className="txt font s16 black">{item.currency_code}</div> 
                                                </button> 
                                            ))
                                        }
                                        </div> 
                                    }
                                </button>
                            </div>
                        
                            {/* Select Country */}
                            <div className="item flex flex-col">
                                <div className="lbl font s16 cfff">Country</div>
                                <button className="item cleanbtn cstm-slt flex aic rel" onClick={(e)=>{
                                    e.stopPropagation();
                                    setDropCun(!dropCun);  
                                    setDropCur(false); 
                                }}>
                                    { 
                                        countries.map(item=>(
                                            country == item.country  && <div className="iput flex aic">
                                                <div className="txt font s16 black wordwrap">{item.country}</div>
                                                <img src="./images/arrow-down.svg" className="arrow"/>          
                                            </div>
                                        ))
                                    } 
                                    {dropCun && <div className="options flex flex-col abs">
                                        {
                                            countries.map(item=>(
                                                <button className="cleanbtn item flex aic anim" onClick={()=>{
                                                    setDropCun(!dropCun);
                                                    setCountry(item.country);
                                                }}>        
                                                    <div className="txt font s16 black wordwrap">{item.country}</div> 
                                                </button> 
                                            ))
                                        }
                                        </div> 
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                                    
                    {/* Trader List Block */}
                    <div className="trds-bl flex flex-col">
                        <div className="table-responsive">
                            <table className="table text-white">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-left pl-5">Trader</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Available</th>
                                        <th scope="col">Price</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                    { 
                                        loading == false ? (allOrders && allOrders.length > 0) ?
                                        allOrders.map( (item,index) => (  
                                        <tbody key={index}>
                                            <tr>
                                                <td className="profile_td">
                                                    <div className="col flex aic">
                                                        <div className={`circle Top trader`} />
                                                        <div className="flex flex-col">
                                                            <div className="lbl font s15 cfff flex aic">
                                                                <span>{item.user_name}</span>&nbsp;&nbsp;
                                                                <div className="online" />
                                                            </div>
                                                            <div className="flex aic">
                                                                <div className="font s12 cfff">{`125 orders`}</div>&nbsp;&nbsp;
                                                                <div className="font s12 cfff">{`100%`}</div>&nbsp;&nbsp;
                                                                <div className="font s12 cfff">{`4.9 Trust`}</div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                </td>
                                                <td className="w-25">{item.payment}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.price}&nbsp;<span className="s11">{item.currency}</span></td>
                                                <td><Link to={`/buyer-order/${item._id}`} className="btn btn-primary px-4">Buy</Link></td>
                                            </tr>
                                        </tbody>
                                    ))
                                    : 
                                    <tbody>
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                <div className="font s16 cfff">Opps! Result not Found.</div>
                                            </td>
                                        </tr>
                                    </tbody>  
                                    :
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="row flex">
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                </div> 
                                            </td>
                                            <td>
                                                <div className="row flex">
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                </div> 
                                            </td>
                                            <td>
                                                <div className="row flex">
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                </div> 
                                            </td>
                                            <td>
                                                <div className="row flex">
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                </div> 
                                            </td>
                                            <td>
                                                <div className="row flex">
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                    <div className="col holder my-2" />
                                                </div> 
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer/>

            <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered"  role="document">
                    <div className="modal-content modal_custom">
                    <div className="modal-header border-0">
                        <h5 className="modal-title" id="exampleModalLongTitle"><img src="/images/logo.svg" /></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i class="fa fa-times-circle text-white"></i>
                        </button>
                    </div>
                    <div className="modal-body"  style={{backgroundImage: 'url("/images/bg-stars.png")'}}>
                        <div className="container-fluid py-4">
                            <div className="row">
                                <div className="col-6">
                                    <p className="claimtxt1 text-white text-center">WIN</p>
                                    <p className="claimtxt2 text-white d-flex justify-content-center align-items-center">100</p>
                                    <p className="claimtxt3 text-white text-center">USD</p>
                                    <p className="claimtxt4 text-white text-center">in PayPal</p>
                                </div>
                                <div className="col-6">
                                    <img src="/images/dollar.png" />
                                    <div className="text-center mt-4">
                                        <a href="https://link.medium.com/6Ye3HBTwtib" className="clain_btn">localpsyche.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Buy;