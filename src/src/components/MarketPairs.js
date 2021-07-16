import React, {useState,useEffect} from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux"

export default function MarketPairs() {
  const generalReducers = useSelector(state => state);
  const {pair} = generalReducers;

  const dispatch = useDispatch() 

  var token = sessionStorage.getItem("key");

  const [marketPair, setmarketPair] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disp, setdisp] = useState(false);

  useEffect(()=>{
    _marketPair()
  },[])

  setInterval(() => {
    _marketPair()
  }, 20000)

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
      .then((response) =>{
        setLoading(false)
          console.log('_marketPair',response.data)
          if(response.data.success){
            setmarketPair(response.data.data.traded_pairs)
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

  const _pairChange = (e) =>{
    console.log(e)
    dispatch({type: 'pair', payload: e})
    console.log(pair)
  }

  return (
    <>
      <div className="market-pairs">
        <Tabs defaultActiveKey="eth">
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
                          <td><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                          <td>{data.price}</td>
                          <td className="red">{data.change}</td>
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
                          <td><i className="icon ion-md-star"></i> {data.name.toUpperCase()}</td>
                          <td>{data.price}</td>
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
