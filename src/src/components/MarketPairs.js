import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

function MarketPairs() {
  const generalReducers = useSelector(state => state);
  const {userInfo, pair } = generalReducers;
  const {user} = userInfo;

  const dispatch = useDispatch() 

  var token = sessionStorage.getItem("key");
  

  const [marketPair, setmarketPair] = useState([]);
  const [balance, setbalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loader, setloader] = useState('d-none');

    
  const _marketPair = async() => {
    setLoading(true)
    axios.post(
    `${global.baseurl}:3000/exchange/traded_pairs`, 
      {   
        "pair": "all"
      },
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization":  token
        } 
      }
    )
    .then((data) =>{
      setLoading(false)
        console.log('_marketPair',data.data)
        if(data.data.success){
          var price_set = data.data.data.traded_pairs
          
          for (let index = 0; index < data.data.data.traded_pairs.length; index++) {
            if(data.data.data.traded_pairs[index].name == "bfredx/usd1"){
              price_set[index].price = 0.00015
            }
            if(data.data.data.traded_pairs[index].name == "ooks/usd1"){
              price_set[index].price = 0.2837
            }
            if(data.data.data.traded_pairs[index].name == "brtr/usd1"){
              price_set[index].price = 0.0085
            }
            if(data.data.data.traded_pairs[index].name == "krill/usd1"){
              price_set[index].price = 0.0886
            }
            if(data.data.data.traded_pairs[index].name == "txc/usd1"){
              price_set[index].price = 0.0171
            }
            if(data.data.data.traded_pairs[index].name == "mvh/usd1"){
              price_set[index].price = 0.00004160
            }
            if(data.data.data.traded_pairs[index].name == "penky/usd1"){
              price_set[index].price = 0.00000000
            }
            if(data.data.data.traded_pairs[index].name == "bfredx/eth"){
              price_set[index].price = 0.00000064
            }
            if(data.data.data.traded_pairs[index].name == "ooks/eth"){
              price_set[index].price = 0.000111
            }
            if(data.data.data.traded_pairs[index].name == "brtr/eth"){
              price_set[index].price = 0.00000348
            }
            if(data.data.data.traded_pairs[index].name == "krill/eth"){
              price_set[index].price = 0.00003523
            }
            if(data.data.data.traded_pairs[index].name == "txc/eth"){
              price_set[index].price = 0.00000696
            }
            if(data.data.data.traded_pairs[index].name == "mvh/eth"){
              price_set[index].price = 0.00004149
            }
            if(data.data.data.traded_pairs[index].name == "penky/eth"){
              price_set[index].price = 0.00000000
            }
          }
          setmarketPair(price_set)
          // setloader('d-none')
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
  }
  
  useEffect(()=>{
    
    if(sessionStorage.getItem("pair")){
      dispatch({type: 'pair', payload: sessionStorage.getItem("pair")})
    }
    else{
      dispatch({type: 'pair', payload: pair})
    }
    setloader('d-flex')
    setTimeout(() => {
      setloader('d-none')
    }, 8000);
    setLoading(true)
    axios.post(
    `${global.baseurl}:3000/exchange/wallet`, 
      {   
        "user_id": user._id
      },
      {
        headers: {
            "Content-Type": "application/json",
            "Authorization":  token
        } 
      }
    )
    .then((response) =>{
      setLoading(false)
      console.log('balance',response.data)
        if(response.data.success){
          setbalance(response.data.data.wallet)
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
    _marketPair()
    clearInterval(interval);
    var interval = setInterval(_marketPair, 20000)
  },[])

  const _balance = async() => {
    let selected_pair = sessionStorage.getItem("pair");
    for(let i=0; i < balance.length; i++){
      if(balance[i].coin == selected_pair.split('/')[0]){
        dispatch({type: 'balance1', payload: balance[i].balance.toFixed(2)})
        break
      }
      else{
        dispatch({type: 'balance1', payload: 0})
      }
    }
    for(let i=0; i < balance.length; i++){
      if(balance[i].coin == selected_pair.split('/')[1]){
        dispatch({type: 'balance2', payload: balance[i].balance.toFixed(2)})
        break
      }
      else{
        dispatch({type: 'balance2', payload: 0})
      }
    }
  }

  const _pairChange = (e) =>{
    dispatch({type: 'pair', payload: e})
    sessionStorage.setItem("pair", e);
    // _balance()
    window.location.reload();
  }

  return (
    <>
     <div id="exchange_loader" className={`splash flex aic ${loader}`}>
        <img src="/images/psyche_coin.png" className="logo rotate" />
      </div>
      <div className="market-pairs pt-0">
        <Tabs defaultActiveKey="eth" className="mt-0">
          <Tab eventKey="eth" title="ETH">
            <table className="table">
              <thead>
                <tr>
                  <th>Pairs</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {marketPair.length &&
                  marketPair.map((data, index) =>
                    data.name.split('/')[1] == 'eth' && (data.name.split('/')[0] == 'ooks' || data.name.split('/')[0] == 'txc') 
                      ? (
                        <tr key = {index}  onClick={() => {_pairChange(data.name)}}>
                          <td className="d-flex w-100"><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                          <td>{data.price.toFixed(8)}</td>
                          <td className={data.change.toFixed(3) > 0 ? 'red' : 'green'}>{data.change.toFixed(3)}</td>
                        </tr>
                      )
                      : null
                  )
                }
                {marketPair.length &&
                  marketPair.map((data, index) =>
                  data.name.split('/')[1] == 'eth' && data.name.split('/')[0] != 'ooks' && data.name.split('/')[0] != 'txc'
                    ? (
                      <tr key = {index}  onClick={() => {_pairChange(data.name)}}>
                        <td className="d-flex w-100"><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                        <td>{data.price.toFixed(8)}</td>
                        <td className={data.change.toFixed(3) > 0 ? 'red' : 'green'}>{data.change.toFixed(3)}</td>
                      </tr>
                    )
                    : null
                  )
                }
              </tbody>
            </table>
          </Tab>
          <Tab eventKey="usd1" title="USD1">
            <table className="table">
              <thead>
                <tr>
                  <th>Pairs</th>
                  <th>Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
              {marketPair.length &&
                  marketPair.map((data, index) =>
                    data.name.split('/')[1] == 'usd1' && (data.name.split('/')[0] == 'ooks' || data.name.split('/')[0] == 'txc') 
                      ? (
                        <tr key = {index}  onClick={() => {_pairChange(data.name)}}>
                          <td className="d-flex w-100"><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                          <td>{data.price.toFixed(8)}</td>
                          <td className={data.change.toFixed(3) > 0 ? 'red' : 'green'}>{data.change.toFixed(3)}</td>
                        </tr>
                      )
                      : null
                  )
                }
                {marketPair.length &&
                  marketPair.map((data, index) =>
                  data.name.split('/')[1] == 'usd1' && data.name.split('/')[0] != 'ooks' && data.name.split('/')[0] != 'txc'
                    ? (
                      <tr key = {index}  onClick={() => {_pairChange(data.name)}}>
                        <td className="d-flex w-100"><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                        <td>{data.price.toFixed(8)}</td>
                        <td className={data.change.toFixed(3) > 0 ? 'red' : 'green'}>{data.change.toFixed(3)}</td>
                      </tr>
                    )
                    : null
                  )
                }
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default React.memo(MarketPairs);