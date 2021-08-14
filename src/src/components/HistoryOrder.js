import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

function HistoryOrder() {

  const [openOrderbuy, setopenOrderbuy] = useState([]);
  const [openOrdersell, setopenOrdersell] = useState([]);
  const [orderHistory, setorderHistory] = useState([]);
  const [balance, setbalance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(false);
  // const [functin, setfunctin] = useState(true);
  const [show2, setshow2] = useState(false);
  const [show3, setshow3] = useState(false);
  const [show4, setshow4] = useState(false);
  const [values, setvalues] = useState(
    {
      ethBalance: "0",
      ethEscrow: "0",
      usd1Balance: "0",
      usd1Escrow: "0",
      krillBalance: "0",
      krillEscrow: "0",
      ooksBalance: "0",
      ooksEscrow: "0",
      brtrBalance: "0",
      brtrEscrow: "0",
      bfredxBalance: "0",
      bfredxEscrow: "0",
      txcBalance: "0",
      txcEscrow: "0",
      mvhBalance: "0",
      mvhEscrow: "0",
      penkyBalance: "0",
      penkyEscrow: "0",
    }
  );

  const generalReducers = useSelector(state => state);
  const {userInfo, pair } = generalReducers;
  const {user} = userInfo;

  const dispatch = useDispatch() 

  var token = sessionStorage.getItem("key");

  useEffect(()=>{
    _orderHistory()
    _openOrder()
    _balance()
    clearInterval(history_order);
    var history_order = setInterval(() => {
      _orderHistory()
      _openOrder()
      _balance()
    }, 20000);
  },[])

  const _orderHistory = async() => {
    setLoading(true)
    axios.post(
    `${global.baseurl}:3000/exchange/mytrades`, 
      {   
        "pair": "all",
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
        console.log('oderHistory',response.data)
        if(response.data.success){
          setorderHistory(response.data.data.trades)
          setTimeout(() => {
            setshow(true)
          }, 1000);
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
  }

  const _openOrder = async() => {
    setLoading(true)
    axios.post(
    `${global.baseurl}:3000/exchange/order_open`, 
      {   
        "pair": "all",
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
        console.log('openOrder',response.data)
        if(response.data.success){
          setopenOrderbuy(response.data.data.buy)
          setopenOrdersell(response.data.data.sell)
          setTimeout(() => {
            setshow2(true)
          }, 1000);
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
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
      console.log('balance_history',response.data)
        if(response.data.success){
          setbalance(response.data.data.wallet)

          for(let i=0; i < response.data.data.wallet.length; i++){
            if (response.data.data.wallet[i].coin == 'eth') {
              setvalues(prevState => ({
                ...prevState,
                ethBalance: response.data.data.wallet[i].balance.toFixed(4),
                ethEscrow: response.data.data.wallet[i].locked.toFixed(4)
              }));
            } else if (response.data.data.wallet[i].coin == 'usd1') {
              setvalues(prevState => ({
                ...prevState,
                usd1Balance: response.data.data.wallet[i].balance.toFixed(4),
                usd1Escrow: response.data.data.wallet[i].locked.toFixed(4)
              }));
            } else if (response.data.data.wallet[i].coin == 'krill') {

              setvalues(prevState => ({
                ...prevState,
                krillBalance: response.data.data.wallet[i].balance.toFixed(4),
                krillEscrow: response.data.data.wallet[i].locked.toFixed(4)
              }));
            } else if (response.data.data.wallet[i].coin == 'ooks') {
              setvalues(prevState => ({
                ...prevState,
                ooksBalance: response.data.data.wallet[i].balance.toFixed(4),
                ooksEscrow: response.data.data.wallet[i].locked.toFixed(4)
              }));
            } else if (response.data.data.wallet[i].coin == 'brtr') {
              setvalues(prevState => ({
                ...prevState,
                brtrBalance: response.data.data.wallet[i].balance.toFixed(4),
                brtrEscrow: response.data.data.wallet[i].locked.toFixed(4)
              }));
            } else if (response.data.data.wallet[i].coin == 'bfredx') {

              setvalues(prevState => ({
                ...prevState,
                bfredxBalance: response.data.data.wallet[i].balance.toFixed(4),
                bfredxEscrow: response.data.data.wallet[i].locked.toFixed(4)
              }));  
            } else if (response.data.data.wallet[i].coin == 'txc') {

              setvalues(prevState => ({
                ...prevState,
                txcBalance: response.data.data.wallet[i].balance.toFixed(4),
                txcEscrow: response.data.data.wallet[i].locked.toFixed(4)
              }));  
            } else if (response.data.data.wallet[i].coin == 'mvh') {

              setvalues(prevState => ({
                ...prevState,
                mvhBalance: response.data.data.wallet[i].balance.toFixed(4),
                mvhEscrow: response.data.data.wallet[i].locked.toFixed(4)
              })); 
            } else if (response.data.data.wallet[i].coin == 'penky') {

              setvalues(prevState => ({
                ...prevState,
                penkyBalance: response.data.data.wallet[i].balance.toFixed(4),
                penkyEscrow: response.data.data.wallet[i].locked.toFixed(4)
              })); 
            } else {
              console('else')
            }
          }
          setTimeout(() => {
            setshow4(true)
          }, 1000);
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
  }

  const _cancelOrder = (id) => {
      setLoading(true)
      axios.post(
      `${global.baseurl}:3000/exchange/order_cancel`, 
        {   
          "pair": pair,
          "order_id": id
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
          console.log('cancelOrder', response)
          window.location.reload() 
      })
      .catch ((error) => { 
        setLoading(false)
          console.log(error.message) 
      })
  }

  return (
    <>
      <div className="market-history market-order mt15">
        <Tabs defaultActiveKey="open-orders">
          <Tab eventKey="open-orders" title="Open Orders">
            <ul className="d-flex justify-content-between market-order-item orderHistory">
              <li>Time</li>
              <li>Pairs</li>
              <li>Buy/Sell</li>
              <li>Price</li>
              <li>Amount</li>
              <li>Filled Percentage</li>
              <li></li>
            </ul>
            {show2 &&
              openOrderbuy.map((data, index) =>
              <ul key= {index} className="d-flex justify-content-between market-order-item orderHistory">
                <li>{new Date(data.timestamp).toLocaleTimeString("en-US")}</li>
                <li>{data.pair.toUpperCase()}</li>
                <li>{data.buy ? 'Buy' : 'Sell'}</li>
                <li>{data.price}</li>
                <li>{data.amount}</li>
                <li>{(data.filled_perc).toFixed(2)}</li>
                <li><button className="btn text-danger" onClick={()=>{_cancelOrder(data._id)}}>Cancel</button></li>
              </ul>
              )
            }
            {show2 &&
              openOrdersell.map((data, index) =>
              <ul key= {index} className="d-flex justify-content-between market-order-item orderHistory">
                <li>{new Date(data.timestamp).toLocaleTimeString("en-US")}</li>
                <li>{data.pair.toUpperCase()}</li>
                <li>{data.buy ? 'Buy' : 'Sell'}</li>
                <li>{data.price}</li>
                <li>{data.amount}</li>
                <li>{(data.filled_perc).toFixed(2)}</li>
                <li><button className="btn text-danger" onClick={()=>{_cancelOrder(data._id)}}>Cancel</button></li>
              </ul>
              )
            }
            {/* <span className="no-data">
              <i className="icon ion-md-document"></i>
              No data
            </span> */}
          </Tab>
          <Tab eventKey="order-history" title="Order history">
            <ul className="d-flex justify-content-between market-order-item orderHistory">
              <li>Time</li>
              <li>Pairs</li>
              <li>Buy/Sell</li>
              <li>Price</li>
              <li>Amount</li>
              <li>Filled Percentage</li>
            </ul>
            {show &&
              orderHistory.map((data, index) =>
              <ul key={index} className="d-flex justify-content-between market-order-item orderHistory">
                <li>{new Date(data.timestamp).toLocaleTimeString("en-US")}</li>
                <li>{data.maker.user_id == user._id  ? data.maker.pair.toUpperCase() :data.taker.pair.toUpperCase()}</li>
                <li>{data.maker.user_id == user._id   ? (data.maker.buy ? 'Buy' : 'Sell') :(data.taker.buy ? 'Buy' : 'Sell')}</li>
                <li>{data.price}</li>
                <li>{data.amount}</li>
                <li>{data.maker.user_id == user._id  ? (data.maker.filled_perc).toFixed(2) :(data.taker.filled_perc).toFixed(2)}</li>
              </ul>
              )
            }
            {/* <span className="no-data">
              <i className="icon ion-md-document"></i>
              No data
            </span> */}
          </Tab>
          <Tab eventKey="balance" title="Balance">
            <ul className="d-flex justify-content-between market-order-item orderHistory">
              <li>Coin</li>
              <li>Balance</li>
              <li>Escrow</li>
            </ul>
            {show4 &&
              // balance.map((data, index) =>
              // <ul key= {index} className="d-flex justify-content-between market-order-item orderHistory">
              //   <li>{(data.coin).toUpperCase()}</li>
              //   <li>{(data.balance).toFixed(2)}</li>
              //   <li>{(data.locked).toFixed(2)}</li>
              // </ul>
              // )
              <div>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>ETH</li>
                  <li>{values.ethBalance}</li>
                  <li>{values.ethEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>USD1</li>
                  <li>{values.usd1Balance}</li>
                  <li>{values.usd1Escrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>KRILL</li>
                  <li>{values.krillBalance}</li>
                  <li>{values.krillEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>OOKS</li>
                  <li>{values.ooksBalance}</li>
                  <li>{values.ooksEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>BRTR</li>
                  <li>{values.brtrBalance}</li>
                  <li>{values.brtrEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>BFREDX</li>
                  <li>{values.bfredxBalance}</li>
                  <li>{values.bfredxEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>TXC</li>
                  <li>{values.txcBalance}</li>
                  <li>{values.txcEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>MVH</li>
                  <li>{values.mvhBalance}</li>
                  <li>{values.mvhEscrow}</li>
                </ul>
                <ul className="d-flex justify-content-between market-order-item orderHistory">
                  <li>PENKY</li>
                  <li>{values.mvhBalance}</li>
                  <li>{values.mvhEscrow}</li>
                </ul>
              </div>
            }
            {/* <span className="no-data">
              <i className="icon ion-md-document"></i>
              No data
            </span> */}
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default React.memo(HistoryOrder);