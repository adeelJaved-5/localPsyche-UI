import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {Toast, LineLoader} from "../../ui"
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

function MarketTrade() {

  const [buyUsd, setbuyUsd] = useState(null)
  const [buyEth, setbuyEth] = useState(null)
  const [sellUsd, setsellUsd] = useState(null)
  const [sellEth, setsellEth] = useState(null)
  const [balance, setbalance] = useState([]);
  const [LoadWallet, setLoadWallet] = useState(false)
  const [loading, setLoading] = useState(false);

  const generalReducers = useSelector(state => state);
  const {userInfo ,pair, balance1, balance2} = generalReducers;
  const {user} = userInfo;
  const dispatch = useDispatch() 
  
  var token = sessionStorage.getItem("key");
  var selected_pair = sessionStorage.getItem("pair");
  

  const sell = () => {
    let price = parseFloat(sellUsd)
    let amount = parseFloat(sellEth)
    if(sellUsd == null){
        Toast.show({ html: "Please enter some Amount.", type: "warn", time: 5 });
    } else if(sellEth == null){
        Toast.show({ html: "Please enter some Amount.", type: "warn", time: 5});
    } else if(sellUsd > balance1){
        Toast.show({ html: "You don't have sufficient balance.", type: "warn", time: 5});
    } else {
      setLoadWallet(true)
      axios.post(
      `${global.baseurl}:3000/exchange/order_add`, 
            {   "order": {
                  "type": "limit",
                  "user_id": user._id,
                  "pair": pair,
                  "buy": false,
                  "amount": price,
                  "price": amount,
                  "btcusdt": 0
                }
            },
            {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization":  token
              } 
            }
        )
        .then((response) =>{
            console.log(response)
            Toast.show({ html: 'Order Place Successfully', type: 'ok', time: 5 });
            setsellUsd('')
            setsellEth('')
            window.location.reload();
            setLoadWallet(false)
        })
        .catch ((error) => { 
            console.log(error.message) 
            setLoadWallet(false)
            // Toast.show({ html: error.message, time: 5 });
        })
    }
  } 

  const buy = (e) => {
    e.preventDefault()
    let price = parseFloat(buyUsd)
    let amount = parseFloat(buyEth)
    if(buyUsd == null){
        Toast.show({ html: "Please enter some Amount.", type: "warn", time: 5 });
    } else if(buyEth == null){
        Toast.show({ html: "Please enter some Amount.", type: "warn", time: 5});
    } else if(buyEth > balance2){
        Toast.show({ html: "You don't have sufficient balance.", type: "warn", time: 5});
    } else {
      setLoadWallet(true)
      axios.post(
      `${global.baseurl}:3000/exchange/order_add`, 
            {   "order": {
                  "type": "limit",
                  "user_id": user._id,
                  "pair": pair,
                  "buy": true,
                  "amount": price,
                  "price": amount,
                  "btcusdt": 0
                }
            },
            {
              headers: {
                  "Content-Type": "application/json",
                  "Authorization":  token
              } 
            }
        )
        .then((response) =>{
            console.log(response)
            Toast.show({ html: 'Order Place Successfully', type: 'ok', time: 5 });
            setbuyUsd('')
            setbuyEth('')
            window.location.reload()
            setLoadWallet(false)
        })
        .catch ((error) => { 
            console.log(error.message) 
            setLoadWallet(false)
            // Toast.show({ html: error.message, time: 5 });
        })
    }
  } 

  const _balance = async() => {
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
      console.log('Selected_balance',response.data)
        if(response.data.success){
          setbalance(response.data.data.wallet)
          for(let i=0; i < response.data.data.wallet.length; i++){
            if(response.data.data.wallet[i].coin == selected_pair.split('/')[0]){
              dispatch({type: 'balance1', payload: response.data.data.wallet[i].balance.toFixed(2)})
              break
            }
            else{
              dispatch({type: 'balance1', payload: 0})
            }
          }
          for(let i=0; i < response.data.data.wallet.length; i++){
            if(response.data.data.wallet[i].coin == selected_pair.split('/')[1]){
              dispatch({type: 'balance2', payload: response.data.data.wallet[i].balance.toFixed(2)})
              break
            }
            else{
              dispatch({type: 'balance2', payload: 0})
            }
          }
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
  }

  useEffect(() => { 
    _balance()
  },[]);

  return (
    <>
      <div className="market-trade">
        <Tabs>
          <Tab eventKey="limit" title={pair.toUpperCase()} >
            <div className="d-flex justify-content-between">
                {LoadWallet &&
                    <div className="loading cover abs fill flex aic">
                        <LineLoader />
                    </div>
                } 
                
              <div className="market-trade-buy">
                <div className="mb-3 p-2 border border-info rounded text-info d-flex justify-content-between align-items-center"> 
                  <h3>Available Balance</h3>
                  <div>{balance2} {pair.split('/')[1].toUpperCase()}</div>
                </div>
                
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={buyUsd}
                      onChange={e => setbuyUsd(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">{pair.split('/')[0].toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      value={buyEth}
                      onChange={e => setbuyEth(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">{pair.split('/')[1].toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button onClick={buy} className="btn buy">
                      Buy
                    </button>
                  </div>
                
              </div>
              <div className="market-trade-sell">
                
                <div className="mb-3 p-2 border border-info rounded text-info d-flex justify-content-between align-items-center"> 
                  <h3>Available Balance</h3>
                  <div>{balance1} {pair.split('/')[0].toUpperCase()}</div>
                </div>
                <form action="#">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={sellUsd}
                      onChange={e => setsellUsd(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">{pair.split('/')[1].toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      value={sellEth}
                      onChange={e => setsellEth(e.target.value)}
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">{pair.split('/')[0].toUpperCase()}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button onClick={sell} className="btn sell">Sell</button>
                  </div>
                </form>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default React.memo(MarketTrade);