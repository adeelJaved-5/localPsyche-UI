import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {Toast, LineLoader} from "../../ui"
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

export default function MarketTrade() {

  const [buyUsd, setbuyUsd] = useState(0)
  const [buyEth, setbuyEth] = useState(0)
  const [sellUsd, setsellUsd] = useState(0)
  const [sellEth, setsellEth] = useState(0)
  const [LoadWallet, setLoadWallet] = useState(false)

  const generalReducers = useSelector(state => state);
  const {userInfo ,pair} = generalReducers;
  const {user} = userInfo;

  console.log(userInfo);
  
  var token = sessionStorage.getItem("key");

  useEffect(() => { 
  });

  const sell = () => {
    let price = parseFloat(sellUsd)
    let amount = parseFloat(sellEth)
    if(sellUsd == null){
        Toast.show({ html: "Wallet ID is required.", type: "ok", time: 5 });
    } else if(sellEth == null){
        Toast.show({ html: "Please enter some Amount.", type: "ok", time: 5});
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
  const buy = () => {
    let price = parseFloat(buyUsd)
    let amount = parseFloat(buyEth)
    if(buyUsd == null){
        Toast.show({ html: "Wallet ID is required.", type: "ok", time: 5 });
    } else if(buyEth == null){
        Toast.show({ html: "Please enter some Amount.", type: "ok", time: 5});
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


  return (
    <>
      <div className="market-trade">
        <Tabs>
          <Tab eventKey="limit" title="Exchange" >
            <div className="d-flex justify-content-between">
                {LoadWallet &&
                    <div className="loading cover abs fill flex aic">
                        <LineLoader />
                    </div>
                } 
              <div className="market-trade-buy">
                <form action="#">
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
                      <span className="input-group-text">{pair.split('/')[0]}</span>
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
                      <span className="input-group-text">{pair.split('/')[1]}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button onClick={buy} className="btn buy">
                      Buy
                    </button>
                  </div>
                </form>
              </div>
              <div className="market-trade-sell">
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
                      <span className="input-group-text">{pair.split('/')[0]}</span>
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
                      <span className="input-group-text">{pair.split('/')[1]}</span>
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
