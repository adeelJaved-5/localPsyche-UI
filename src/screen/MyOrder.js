import React,{useState, useEffect, useMemo} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios"
import Header from "../components/Header"
import Footer from "./Footer"
import {useDispatch, useSelector} from 'react-redux'
import {LineLoader} from "../ui"



function Buy() { 

    const [allOrders, setAllOrders] = useState([])
    const [load, setload] = useState(false)
    const generalReducers = useSelector(state => state);
    const {isUser, userInfo } = generalReducers;

    const dispatch = useDispatch()
 
    var token = sessionStorage.getItem("key");



    useMemo( async () => {
        // if(allOrders.length == 0){
            try {
                const { data } = await axios({
                    method: 'post', 
                    url: `${global.baseurl}:3000/myOrdersList`,
                    data: {email: userInfo.user.email},
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization":  token
                    } 
                }); 
                //console.log(data)
                if(data.success){
                    setAllOrders(data.data)
                    console.log(data.data)
                    sessionStorage.setItem("notification", data.data.length);
                }
            } catch (error) {
                console.log(error)
            }
            if(allOrders.length == 0){
                setload(true)
            }
        // }
        
    }, [allOrders])

    return (
        <React.Fragment> 
            <Header/>
            <div className="buy-p">
                <div className="wrapper flex flex-col">
                    <div className="title font s42 black">Orders</div>
                    
                                    
                    {/* Trader List Block */}
                    <div className="trds-bl flex flex-col">
                        <div className="table-responsive">
                            <table className="table text-white">
                                <thead>
                                    <tr>
                                        <th scope="col" className="text-left pl-5">Trader</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Amount</th>
                                        <th scope="col">Price</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                    {allOrders.length > 0
                                        ?<tbody>
                                            {
                                                allOrders.map( (item,index) => (  
                                                <tr key={index}>
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
                                                    {(item.type) 
                                                        ? 
                                                        <td><Link to={`/buyer-order/${item.orderId}`} className="btn btn-primary px-4">Veiw</Link></td>
                                                        :
                                                        <td><Link to={`/seller-order/${item.orderId}`} className="btn btn-primary px-4">Veiw</Link></td>
                                                    }
                                                </tr>
                                            ))}
                                        </tbody>
                                        :load
                                            ?<tbody>
                                                <tr>
                                                    <td colSpan="6" className="text-center">
                                                        <div className="font s16 cfff">Opps! Result not Found.</div>
                                                    </td>
                                                </tr>
                                            </tbody> 
                                            :<tbody>
                                                <div className="loading cover abs fill flex aic">
                                                    <LineLoader />
                                                </div>
                                            </tbody>
                                    }
                            </table>
                        </div>
                    </div>
                </div>  
            </div>
            <Footer/>
        </React.Fragment>
    );
}

export default Buy;