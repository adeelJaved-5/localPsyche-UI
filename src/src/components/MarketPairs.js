import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

export default function MarketPairs() {
  const generalReducers = useSelector(state => state);
  const {userInfo, pair } = generalReducers;
  const {user} = userInfo;

  const dispatch = useDispatch() 

  var token = sessionStorage.getItem("key");

  const [marketPair, setmarketPair] = useState([]);
  const [balance, setbalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disp, setdisp] = useState(false);

  
  useEffect(()=>{
    if(sessionStorage.getItem("pair")){
      dispatch({type: 'pair', payload: sessionStorage.getItem("pair")})
    }
    else{
      dispatch({type: 'pair', payload: pair})
    }
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
  },[])


  // setInterval(() => {
  //   _marketPair()
  // }, 30000);

  const _coin_price = async() => {
    const rp = require('request-promise');
    const requestOptions = {
      method: 'GET',
      uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': '379e225c-f637-40a3-8b66-0ceacdc0000e'
      },
      json: true,
      gzip: true
    };

    rp(requestOptions).then(response => {
      console.log('API call response:', response);
      var price_set = marketPair
      // var Eth_value = 1
      for (let index = 0; index < response.data.length; index++) {
        // if(response.data[index].symbol == 'ETH'){
        //   console.log(response.data[index].quote.USD.price)
        //   Eth_value = response.data[index].quote.USD.price
        //   console.log(Eth_value)
        // }
        if(response.data[index].symbol == 'BRTR'){
          console.log(response.data[index].quote.USD.price)
          price_set[2].price = (response.data[index].quote.USD.price).toFixed(4)
          price_set[2].change = (response.data[index].quote.USD.percent_change_24h).toFixed(4)
          console.log('price_set' ,price_set)
        }
        if(response.data[index].symbol == 'OOKS'){
          console.log(response.data[index].quote.USD.price)
          price_set[1].price = (response.data[index].quote.USD.price).toFixed(4)
          price_set[1].change = (response.data[index].quote.USD.percent_change_24h).toFixed(4)
          console.log('price_set' ,price_set)
        }
        if(response.data[index].symbol == 'KRILL'){
          console.log(response.data[index].quote.USD.price)
          price_set[3].price = (response.data[index].quote.USD.price).toFixed(4)
          price_set[3].change = (response.data[index].quote.USD.percent_change_24h).toFixed(4)
          console.log('price_set' ,price_set)
        }
      }
      setmarketPair(price_set)
    }).catch((err) => {
      console.log('API call error:', err.message);
    });
  }
  const _marketPair = async() => {
    if(marketPair.length == 0){
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
            setmarketPair(data.data.data.traded_pairs)
            // var price_set = data.data.data.traded_pairs
            // const rp = require('request-promise');
            // const requestOptions = {
            //   method: 'GET',
            //   uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
            //   qs: {
            //     'start': '1',
            //     'limit': '5000',
            //     'convert': 'USD'
            //   },
            //   headers: {
            //     'X-CMC_PRO_API_KEY': '379e225c-f637-40a3-8b66-0ceacdc0000e'
            //   },
            //   json: true,
            //   gzip: true
            // };

            // rp(requestOptions).then(response => {
            //   console.log('API call response:', response);
              
            //   for (let index = 0; index < response.data.length; index++) {
            //     if(response.data[index].symbol == 'BRTR'){
            //       console.log(response.data[index].quote.USD.price)
            //       price_set[2].price = (response.data[index].quote.USD.price).toFixed(4)
            //       price_set[2].change = (response.data[index].quote.USD.percent_change_24h).toFixed(2)
            //       console.log('price_set' ,price_set)
            //     }
            //     if(response.data[index].symbol == 'OOKS'){
            //       console.log(response.data[index].quote.USD.price)
            //       price_set[1].price = (response.data[index].quote.USD.price).toFixed(4)
            //       price_set[1].change = (response.data[index].quote.USD.percent_change_24h).toFixed(2)
            //       console.log('price_set' ,price_set)
            //     }
            //     if(response.data[index].symbol == 'KRILL'){
            //       console.log(response.data[index].quote.USD.price)
            //       price_set[3].price = (response.data[index].quote.USD.price).toFixed(4)
            //       price_set[3].change = (response.data[index].quote.USD.percent_change_24h).toFixed(2)
            //       console.log('price_set' ,price_set)
            //     }
            //   }
            //   setmarketPair(price_set)
            // }).catch((err) => {
            //   console.log('API call error:', err.message);
            // });
            setTimeout(() => {
              setdisp(true)
            }, 1000);
          }
      })
      .catch ((error) => { 
        setLoading(false)
          console.log(error.message) 
      })
    }
  }

  const _balance = async() => {
    
    for(let i=0; i < balance.length; i++){
      if(balance[i].coin == pair.split('/')[0]){
        dispatch({type: 'balance1', payload: balance[i].balance})
        break
      }
      else{
        dispatch({type: 'balance1', payload: 0})
      }
    }
    for(let i=0; i < balance.length; i++){
      if(balance[i].coin == pair.split('/')[1]){
        dispatch({type: 'balance2', payload: balance[i].balance})
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
    _balance()
  }

  return (
    <>
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
                {disp &&
                  marketPair.map((data, index) =>
                    data.name.split('/')[1] == 'eth'
                      ? (
                        <tr key = {index}  onClick={() => {_pairChange(data.name)}}>
                          <td className="d-flex w-100"><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                          <td>{data.price.toFixed(6)}</td>
                          <td className="red">{data.change.toFixed(3)}</td>
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
                {disp &&
                  marketPair.map((data, index) =>
                    data.name.split('/')[1] == 'usd1'
                      ? (
                        <tr key = {index}  onClick={() => {_pairChange(data.name)}}>
                          <td className="d-flex w-100"><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                          <td>{data.price.toFixed(6)}</td>
                          <td className="red">{data.change}</td>
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
