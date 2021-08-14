import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

function MarketHistory() {
  const generalReducers = useSelector(state => state);
  const {userInfo ,pair} = generalReducers;
  const {user} = userInfo;

  const [Trades, setTrades] = useState([])
  const [loading, setLoading] = useState(false);
  const [visi, setvisi] = useState(false);

  var token = sessionStorage.getItem("key");

  const trades = async() => {
    setLoading(true)
    axios.post(
    `${global.baseurl}:3000/exchange/trades`, 
      {   
        "pair": sessionStorage.getItem("pair"),
        "cursor": 1
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
        if(response.data.success){
          console.log('trades',response.data)
          setTrades(response.data.data.trades)
        }
    })
    .catch ((error) => { 
      setLoading(false)
        console.log(error.message) 
    })
  }

  useEffect(()=>{
    trades()
    clearInterval(trades_interval);
    var trades_interval = setInterval(trades, 20000)
  },[])


  return (
    <>
      <div className="market-history">
        <Tabs defaultActiveKey="recent-trades">
          <Tab eventKey="recent-trades" title="Recent Trades">
            <table className="table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {!Trades.length == 0 &&
                  Trades.map((data, index) =>
                    <tr key = {index} >
                      <td className="w-custom">{new Date(data.timestamp).toLocaleTimeString("en-US")}</td>
                      <td className="red w-custom text-left">{data.price.toFixed(6)}</td>
                      <td className="text-left">{data.amount.toFixed(6)}</td>
                    </tr>
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


export default React.memo(MarketHistory);