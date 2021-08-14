import React , {useEffect,useState} from 'react'
import {Link, withRouter} from "react-router-dom"
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import socketIOClient from "socket.io-client";


function Header(props) { 
 
    const generalReducers = useSelector(state => state);
    const {isUser, userInfo ,notifi} = generalReducers;
    const [display, setdisplay] = useState('none')
    var token = sessionStorage.getItem("key")
    
    const dispatch = useDispatch()

    const my_order = async () => {
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
            if(data.success){
                sessionStorage.setItem("notification", data.data.length);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const socket = socketIOClient('wss://localpsyche.com:4001');

    // useEffect(() => {
        setTimeout(() => {
            if(isUser){
                if(notifi){
                    dispatch({type: 'notifi', payload: false})
                    my_order()
                }
        
                const socket = socketIOClient('wss://localpsyche.com:4001');

                socket.emit("orderDetails", userInfo.user.userID.toString() );
                socket.on("userOrderDetails", (data) => {
                    var notification = sessionStorage.getItem("notification")
                    if(notification){
                        console.log(userInfo.user.userID)
                        if(data > notification){
                            console.log('if: ',notification , data)
                            setdisplay('block')
                        } else{
                            console.log('else: ',notification , data)
                            setdisplay('none')
                        }
                    }
                })
            }    
        }, 3000);
        
    // });

    
    
    const _logout = () => {
        axios.get(`${global.baseurl}:8000/api/auth/sign-out/${userInfo.user._id}`)
        .then(() =>{dispatch({type: 'IS_USER', payload: false})
        }).then(() => {
            props.history.push("/");
            sessionStorage.removeItem("key");
        }) 
        .catch ((error) => { 
            console.log(error) 
        }) 
    }
 
    return ( 
        <>
            <div className="header sticky flex aic">
                <div className="wrapper flex aic"> 
                    <div className="lft flex aic">
                        <Link to="/" className="logo"><img src={'/images/logo.svg'} alt="Logo" className="img"/></Link>
                    </div>
                    <div className="rgt flex aic">
                        {   isUser ? 
                            <React.Fragment>
                                <Link to="/exchange" className="d-flex text-white navbar_order px-2">Exchange</Link>
                                <div className="dropdown px-3">
                                    <button type="button" className="btn_drop dropdown-toggle" data-toggle="dropdown">
                                        Tether
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link to="/coming-soon" className="dropdown-item">Coming soon</Link>
                                    </div>
                                </div>
                                <div className="dropdown px-3">
                                    <button type="button" className="btn_drop dropdown-toggle" data-toggle="dropdown">
                                        Psyche
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link to="/" className="dropdown-item">Buy Psyche</Link>
                                        <Link to="/sell" className="dropdown-item">Sell Psyche</Link>
                                    </div>
                                </div> 
                                <div className="dropdown px-3">
                                    <button type="button" className="btn_drop dropdown-toggle" data-toggle="dropdown">
                                        ICO
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link to="/coming-soon" className="dropdown-item">Coming soon</Link>
                                    </div>
                                </div> 
                                <Link to="/my-trades" className="d-flex text-white navbar_order px-2">Orders <div className="notification" id="notification" style={{display: display}}></div></Link>
                                <div className="dropdown px-3">
                                    <button type="button" className="btn_drop dropdown-toggle" data-toggle="dropdown">
                                        Profile
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link to="/profile" className="dropdown-item">Profile</Link>
                                        
                                        <Link to="/setting" className="dropdown-item">Setting</Link>
                                        <button onClick={_logout} className="dropdown-item cleanbtn link font s15 cfff">Logout</button>
                                    </div>
                                </div> 
                            </React.Fragment>
                            :
                            <React.Fragment>
                                <Link to="/login" className="link font s15 cfff">Sign in</Link>
                                <Link to="/register" className="link font s15 cfff">Register</Link>
                            </React.Fragment>
                        }
                    </div>
                </div>
            </div> 
            <marquee className="marque">
                <b>This is a Beta Version, use with caution. If you found any issue, please contact <span style={{color:'#08254aa3'}}>cs@psyche.cash.</span></b>
            </marquee>
        </>
    );
}

export default withRouter(Header);