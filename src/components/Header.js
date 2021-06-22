import React from 'react'
import {Link, withRouter} from "react-router-dom"
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'

function Header(props) { 
 
    const generalReducers = useSelector(state => state);
    const {isUser, userInfo} = generalReducers;

    //console.log(isUser)

    const dispatch = useDispatch()

    const _logout = () => {
        axios.get(`${global.baseurl}:8000/api/auth/sign-out/${userInfo.user._id}`)
        .then(() =>{dispatch({type: 'IS_USER', payload: false})
        }).then(() => {
            props.history.push("/");
            localStorage.removeItem("key");
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
                                {/* <Link to="/" className="link font s15 cfff">Buy</Link> */}
                                {/* <Link to="/sell" className="link font s15 cfff">Sell</Link>
                                <Link to="/profile" className="link font s15 cfff">Profile</Link>
                                <Link to="/setting" className="link font s15 cfff">Setting</Link>
                                <button onClick={_logout} className="cleanbtn link font s15 cfff">Logout</button> */}
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