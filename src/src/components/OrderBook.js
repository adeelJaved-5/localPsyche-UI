import React, { useState , useEffect } from 'react';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux";

export default function OrderBook() {
  const generalReducers = useSelector(state => state);
  const {pair} = generalReducers;

  const [orderBookbuy, setorderBookbuy] = useState([]);
  const [orderBooksell, setorderBooksell] = useState([]);
  const [loading, setLoading] = useState(false);
  const [veiw, setveiw] = useState(false);

  useEffect(()=>{
    _orderBook()
  },[pair])
  
  setInterval(() => {
    _orderBook()
  }, 30000);

  const _orderBook = async() => {
    // if(orderBookbuy.length == 0){
      setLoading(true)
      console.log(sessionStorage.getItem("pair"))
      axios.post(
      `${global.baseurl}:3000/exchange/order_book`, 
        {   
          "pair": sessionStorage.getItem("pair"),
          "cursor": 1
        }
      )
      .then((response) =>{
        setLoading(false)
          console.log('orderbook',response.data.data)
          if(response.data){
            setorderBookbuy(response.data.data.buy)
            // console.log('after sort ',response.data.data.buy.sort((a, b) => b.timestamp.localeCompare(a.timestamp)))
            setorderBooksell(response.data.data.sell)
            setTimeout(() => {
              setveiw(true)
            }, 1000);
          }
      })
      .catch ((error) => { 
        setLoading(false)
          console.log(error.message) 
      })
    // }
  }

  return (
    <>
      <div className="order-book mb15">
        <h2 className="heading">Order Book</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Price</th>
              <th>Amount</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {veiw &&
              orderBooksell.map((data, index) =>
                <tr key = {index} >
                  <td className="red">{data.price.toFixed(6)}</td>
                  <td>{data.amount.toFixed(6)}</td>
                  <td>{(data.amount * data.price).toFixed(9)}</td>
                </tr>
              )
            }
          </tbody>
          <tbody className="ob-heading">
            <tr>
              <td>
                <span>Price</span>
              </td>
              <td>
                <span>Amount</span>
              </td>
              <td>
                <span>Total</span>
              </td>
            </tr>
          </tbody>
          <tbody>
            {veiw &&
              orderBookbuy.map((data, index) =>
                <tr  className="d-flex" key = {index} >
                  <td className="green">{data.price.toFixed(6)}</td>
                  <td>{data.amount.toFixed(6)}</td>
                  <td>{(data.amount * data.price).toFixed(9)}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
