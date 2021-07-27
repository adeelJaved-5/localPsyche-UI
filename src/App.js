import React,{useState, useEffect} from 'react'
import {BrowserRouter, Switch, Route} from "react-router-dom"
import axios from "axios"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import 'popper.js';
import '../node_modules/bootstrap/dist/js/bootstrap.js';

// css
import "./css/App.scss"

// screen && components
import OrderList from "./screen/OrderList"
import Profile from "./screen/Profile"
import Buy from "./screen/Buy"
import Sell from "./screen/Sell"
import BuyerSideOrder from "./screen/BuyerSideOrder"
import SellerSideOrder from "./screen/SellerSideOrder"
import Signup from "./screen/Signup"
import Signin from "./screen/Signin"
import Forgot from "./screen/Forgot"
import Reset from "./screen/Reset"
import PageNotFound from "./screen/PageNotFound"
import PrivacyPolicy from "./screen/PrivacyPolicy"
import TermsConditions from "./screen/TermsConditions"
import Setting from "./screen/Setting"
import Kyc from "./screen/Kyc"
import ComingSoon from "./screen/ComingSoon"
import Blog from "./screen/Blog"
import BlogBRTR from "./screen/Blog_pages/BlogBRTR"
import BlogBFREDX from "./screen/Blog_pages/BlogBFREDX"
import BlogOOKS from "./screen/Blog_pages/BlogOOKS"
import BlogKRILL from "./screen/Blog_pages/BlogKRILL"
import BlogSHUSKY from "./screen/Blog_pages/BlogSHUSKY"
import Blog8PAY from "./screen/Blog_pages/Blog8PAY"
import BlogRELI from "./screen/Blog_pages/BlogRELI"
import BlogINNBC from "./screen/Blog_pages/BlogINNBC"
import BlogBITBOX from "./screen/Blog_pages/BlogBITBOX"
import BlogNFTBOX from "./screen/Blog_pages/BlogNFTBOX"
import BlogLAND from "./screen/Blog_pages/BlogLAND"
import BlogGENX from "./screen/Blog_pages/BlogGENX"
import MyORDER from "./screen/MyOrder"
import CEX from "./src/App"
import EProfile from "./src/profile"
import ReactGA from 'react-ga';


import {useDispatch, useSelector} from 'react-redux'

global.baseurl = "https://localpsyche.com";

function App(){

  const [loading, setLoading] = useState(true)
  var token = sessionStorage.getItem("key");

  const generalReducers = useSelector(state => state)
  const {isUser} = generalReducers

  const dispatch = useDispatch()

  useEffect(()=>{
    if(token){dispatch({type: 'IS_USER', payload: true})}
    _getUserInfo()

  },[])
  
  useEffect(() => {
    const TRACKING_ID = "UA-184573742-1"; 
    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname)
  }, [])
 
  const _getUserInfo = async () => {
      try {
      const { data } = await axios({
          method: 'post', 
          url: `${global.baseurl}:8000/api/auth/user-profile`,
          data: {token: token},
          headers: {
            "Content-Type": "application/json",
            "Authorization":  token
          }  
      });  
      if(data){
          dispatch({type: 'USER_INFO', payload: data})
          setLoading(false)
      }
    } catch (error) {
      setLoading(false) 
      console.log(error)
    }
  }
 
  //console.log(token)

  const _App = () => {
    return(
      <BrowserRouter > 
          {
            isUser ?
            <Switch>
              <Route exact path="/" component={Buy} />
              <Route exact path="/buyer-order/:id" component={BuyerSideOrder} /> 
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/setting" component={Setting} />
              <Route exact path="/kyc" component={Kyc} />
              <Route exact path="/orders/:id?" component={OrderList} />
              <Route exact path="/sell" component={Sell} /> 
              <Route exact path="/seller-order/:id" component={SellerSideOrder} /> 
              <Route exact path="/privacy-policy" component={PrivacyPolicy} /> 
              <Route exact path="/terms-conditions" component={TermsConditions} /> 
              <Route exact path="/coming-soon" component={ComingSoon} /> 
              <Route exact path="/blog" component={Blog} /> 
              <Route exact path="/blog/brtr-coin-listed-on-localpsyche" component={BlogBRTR} /> 
              <Route exact path="/blog/bfredx-coin-listed-on-localpsyche" component={BlogBFREDX} /> 
              <Route exact path="/blog/ooks-coin-listed-on-localpsyche" component={BlogOOKS} /> 
              <Route exact path="/blog/krill-coin-listed-on-localpsyche" component={BlogKRILL} /> 
              <Route exact path="/blog/SHUSKY-coin-listed-on-localpsyche" component={BlogSHUSKY} /> 
              <Route exact path="/blog/8PAY-coin-listed-on-localpsyche" component={Blog8PAY} /> 
              <Route exact path="/blog/RELI-coin-listed-on-localpsyche" component={BlogRELI} /> 
              <Route exact path="/blog/INNBC-coin-listed-on-localpsyche" component={BlogINNBC} /> 
              <Route exact path="/blog/BITBOX-coin-listed-on-localpsyche" component={BlogBITBOX} /> 
              <Route exact path="/blog/NFTBOX-coin-listed-on-localpsyche" component={BlogNFTBOX} /> 
              <Route exact path="/blog/LAND-coin-listed-on-localpsyche" component={BlogLAND} /> 
              <Route exact path="/blog/GENX-coin-listed-on-localpsyche" component={BlogGENX} /> 
              <Route exact path="/my-trades" component={MyORDER} /> 
              <Route exact path="/exchange" component={CEX} /> 
              <Route exact path="/wallet" component={EProfile} /> 
              <Route component={PageNotFound} />
            </Switch>
            :  
            <Switch>  
              <Route exact path="/" component={Buy} />
              <Route exact path="/buyer-order/:id" component={BuyerSideOrder} /> 
              <Route exact path="/login" component={Signin} />  
              <Route exact path="/register" component={Signup} />
              <Route exact path="/forgot-password" component={Forgot} />
              <Route exact path="/blog" component={Blog} /> 
              <Route exact path="/blog/brtr-coin-listed-on-localpsyche" component={BlogBRTR} /> 
              <Route exact path="/blog/bfredx-coin-listed-on-localpsyche" component={BlogBFREDX} /> 
              <Route exact path="/blog/ooks-coin-listed-on-localpsyche" component={BlogOOKS} /> 
              <Route exact path="/blog/krill-coin-listed-on-localpsyche" component={BlogKRILL} /> 
              <Route exact path="/blog/SHUSKY-coin-listed-on-localpsyche" component={BlogSHUSKY} /> 
              <Route exact path="/blog/8PAY-coin-listed-on-localpsyche" component={Blog8PAY} /> 
              <Route exact path="/blog/RELI-coin-listed-on-localpsyche" component={BlogRELI} /> 
              <Route exact path="/blog/INNBC-coin-listed-on-localpsyche" component={BlogINNBC} /> 
              <Route exact path="/blog/BITBOX-coin-listed-on-localpsyche" component={BlogBITBOX} /> 
              <Route exact path="/blog/NFTBOX-coin-listed-on-localpsyche" component={BlogNFTBOX} /> 
              <Route exact path="/blog/LAND-coin-listed-on-localpsyche" component={BlogLAND} /> 
              <Route exact path="/blog/GENX-coin-listed-on-localpsyche" component={BlogGENX} /> 
              <Route exact path="/reset-password/:id" component={Reset} />
              <Route exact path="/privacy-policy" component={PrivacyPolicy} />
              <Route exact path="/terms-conditions" component={TermsConditions} />
              <Route exact path="/exchange" component={CEX} /> 
              <Route component={PageNotFound} />
            </Switch>
          }
      </BrowserRouter>  
    )
  }

  const _Splash = () => {
    return(
      <div className='splash flex aic'>
          <img src="/images/Local Psyche-blue-01.png" className="logo" />
      </div>
    )
  } 
 
  return (
    <div className="App rel">
        {loading ? _Splash() : _App()}  
    </div> 
  ); 
}

export default App;
