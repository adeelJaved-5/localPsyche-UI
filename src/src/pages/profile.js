import React, {useState , useEffect} from 'react';
import { Tab, Row, Col, Nav } from 'react-bootstrap';
import {Toast, LineLoader} from "../../ui";
import Layout from '../components/Layout';
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import $ from 'jquery';

export default function Profile() {

  const [Widthdraw, setWidthdraw] = useState(0)
  const [Widthdrawaddress, setWidthdrawaddress] = useState('')
  const [loading, setLoading] = useState(false);
  const [deposit, setdeposit] = useState(0)
  const [balance, setbalance] = useState([]);
  const [amount, setamount] = useState([]);
  const [coin, setcoin] = useState('eth');
  const [blockchain, setblockchain] = useState('eth');
  const [load, setload] = useState(false)
  const [page, setpage] = useState(false)
  const [usd1b, setusd1b] = useState(0)

  const generalReducers = useSelector(state => state);
  const {userInfo} = generalReducers;
  const {user} = userInfo;

  var token = sessionStorage.getItem("key");

  useEffect(()=>{
    _balance()
  },[])

  const _withdraw = () => {
    let amount = parseFloat(Widthdraw)
    if(Widthdraw == 0 || Widthdraw == null){
        Toast.show({ html: "Amount should be greater than 0.", type: "ok", time: 5 });
    } else {
      axios.post(
      `${global.baseurl}:3000/exchange/withdraw`, 
            {   
              "order": {
                "address": Widthdrawaddress,
                "blockchain": blockchain,
                "coin": coin,
                "user_id": user._id,
                "amount": amount
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
            Toast.show({ html: response.data.data, type: (response.data.success ?'ok' :'error' ), time: 5 });
            setWidthdraw('')
        })
        .catch ((error) => { 
            console.log(error.message) 
            // Toast.show({ html: error.message, time: 5 });
        })
        $('#widthdraw').modal('hide')
    }
  } 

  const _deposit = () => {
    setload(true)
      axios.post(
      `${global.baseurl}:3000/exchange/deposit`, 
            {   
              "order": {
                "blockchain": blockchain,
                // "blockchain": coin,
                "coin": coin,
                "user_id": user._id,
                "address": user.EthPubKey
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
            // if(response.data.success){
              Toast.show({ html: response.data.data, type: (response.data.success ?'ok' :'error' ), time: 5 });
            // }
            setdeposit('')
            setload(false)
        })
        .catch ((error) => { 
            console.log(error.message) 
            // Toast.show({ html: error.message, time: 5 });
        })
        $('#deposit').modal('hide')
  } 

  const _balance = async() => {
    if(balance.length == 0){
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
            setamount(`${response.data.data.wallet[0].balance.toFixed(2)} ${response.data.data.wallet[0].coin.toUpperCase()}`)
            for(let i=0; i < response.data.data.wallet.length; i++){
              if(response.data.data.wallet[i].coin == 'usd1'){
                setusd1b(response.data.data.wallet[i].balance.toFixed(2))
                break
              }
              console.log('hello')
            }
            setTimeout(() => {
              setpage(true) 
            }, 1000);
          }
          
      })
      .catch ((error) => { 
        setLoading(false)
        console.log(error.message) 
      })
      
    }
  }

  const _setamount = (e) =>{
    for(let i=0; i < balance.length; i++){
      if(balance[i].coin == e){
        setamount(`${balance[i].balance} ${balance[i].coin.toUpperCase()}`)
        break
      }
      else{
        setamount(`0 ${e.toUpperCase()}`)
      }
    }
  }

  const _change = (e) =>{
    _setamount(e)
    setcoin(e)
    if(e == 'eth' || e == 'usd1' || e == 'ooks' || e == 'brtr' || e == 'txc'){
      setblockchain('eth')
    }
    else if(e == 'krill'){
      setblockchain('polygon')
    }
    else if (e == 'bfredx'){
      setblockchain('bsc')
    }
    else{
      setblockchain('eth')
    }
  }

  return (
    <>
      <Layout />
      {true
        ?<div className="settings mtb15">
          <div className="container-fluid">
            <Tab.Container defaultActiveKey="wallet">
              <Row>
                <Col lg={12}>
                  <Tab.Content>
                    <Tab.Pane eventKey="wallet">
                      <div className="wallet">
                        <Row>
                          <Col lg={4}>
                            <Nav variant="pills" className="settings-nav">
                              {/* {true &&
                                balance.map((data, index) =>
                                <Nav.Item key={index} onClick ={() =>{_change(index)}}>
                                  <Nav.Link
                                    eventKey={index}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/icon/1.png'} alt="btc" />
                                      <div>
                                        <h2>{(data.coin).toUpperCase()}</h2>
                                        <p>{data.blockchain == 'eth' ?"ETHEREUM" : data.blockchain.toUpperCase()}</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                )
                              } */}
                                <Nav.Item onClick = {() =>{_change('eth')}}>
                                  <Nav.Link
                                    eventKey={0}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/icon/1.png'} alt="btc" />
                                      <div>
                                        <h2>ETH</h2>
                                        <p>ETHEREUM</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('usd1')}}>
                                  <Nav.Link
                                    eventKey={1}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/usd1.png'} alt="btc" />
                                      <div>
                                        <h2>USD1</h2>
                                        <p>ETHEREUM</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('krill')}}>
                                  <Nav.Link
                                    eventKey={2}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/krill.png'} alt="btc" />
                                      <div>
                                        <h2>KRILL</h2>
                                        <p>POLYGON</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('ooks')}}>
                                  <Nav.Link
                                    eventKey={3}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/ooks.png'} alt="btc" />
                                      <div>
                                        <h2>OOKS</h2>
                                        <p>ETHEREUM</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('brtr')}}>
                                  <Nav.Link
                                    eventKey={4}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/BRTR.png'} alt="btc" />
                                      <div>
                                        <h2>BRTR</h2>
                                        <p>ETHEREUM</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('bfredx')}}>
                                  <Nav.Link
                                    eventKey={5}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/bfredx.png'} alt="btc" />
                                      <div>
                                        <h2>BFREDX</h2>
                                        <p>BSC</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('txc')}}>
                                  <Nav.Link
                                    eventKey={6}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'img/TCX.png'} alt="btc" />
                                      <div>
                                        <h2>TXC</h2>
                                        <p>ETHEREUM</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                                <Nav.Item onClick = {() =>{_change('mvh')}}>
                                  <Nav.Link
                                    eventKey={7}
                                    className="d-flex justify-content-between align-items-center"
                                  >
                                    <div className="d-flex">
                                      <img src={'images/LOGO-CINEMADROM-2.webp'} alt="btc" />
                                      <div>
                                        <h2>MVH</h2>
                                        <p>ETHEREUM</p>
                                      </div>
                                    </div>
                                    <div>
                                    </div>
                                  </Nav.Link>
                                </Nav.Item>
                            </Nav>
                          </Col>

                          <Col lg={8}>
                            <div className="tab-content">
                              {load && 
                                  <div className="loading cover abs fill flex aic">
                                      <LineLoader />
                                  </div>
                              }
                              <div
                                className="tab-pane fade show active"
                                id="coinBTC"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Balance</h2>
                                        </div>
                                        <div>
                                          <h3>{amount}</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <div className="d-flex justify-content-around align-items-center">
                                      <button type="button" className="btn green" data-toggle="modal" data-target="#deposit">
                                        Deposit
                                      </button>
                                      <button type="button" className="btn red" data-toggle="modal" data-target="#widthdraw">
                                        Withdraw
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-12">
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value={user.EthPubKey}
                                          /> 
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="coinETH"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Equity</h2>
                                        </div>
                                        <div>
                                          <h3>4.1542 ETH</h3>
                                        </div>
                                      </li>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-checkmark"></i>
                                          <h2>Available Margin</h2>
                                        </div>
                                        <div>
                                          <h3>1.334 ETH</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <button className="btn green">Deposit</button>
                                    <button className="btn red">Withdraw</button>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Deposit Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-8">
                                        <p>
                                          Deposits to this address are unlimited.
                                          Note that you may not be able to
                                          withdraw all of your funds at once if
                                          you deposit more than your daily
                                          withdrawal limit.
                                        </p>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <img
                                          src={'img/qr-code-dark.svg'}
                                          alt="qr-code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="coinBNB"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Equity</h2>
                                        </div>
                                        <div>
                                          <h3>7.342 BNB</h3>
                                        </div>
                                      </li>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-checkmark"></i>
                                          <h2>Available Margin</h2>
                                        </div>
                                        <div>
                                          <h3>0.332 BNB</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <button className="btn green">Deposit</button>
                                    <button className="btn red">Withdraw</button>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Deposit Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-8">
                                        <p>
                                          Deposits to this address are unlimited.
                                          Note that you may not be able to
                                          withdraw all of your funds at once if
                                          you deposit more than your daily
                                          withdrawal limit.
                                        </p>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <img
                                          src={'img/qr-code-dark.svg'}
                                          alt="qr-code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="coinTRX"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Equity</h2>
                                        </div>
                                        <div>
                                          <h3>4.3344 TRX</h3>
                                        </div>
                                      </li>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-checkmark"></i>
                                          <h2>Available Margin</h2>
                                        </div>
                                        <div>
                                          <h3>1.453 TRX</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <button className="btn green">Deposit</button>
                                    <button className="btn red">Withdraw</button>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Deposit Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-8">
                                        <p>
                                          Deposits to this address are unlimited.
                                          Note that you may not be able to
                                          withdraw all of your funds at once if
                                          you deposit more than your daily
                                          withdrawal limit.
                                        </p>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <img
                                          src={'img/qr-code-dark.svg'}
                                          alt="qr-code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="coinEOS"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Equity</h2>
                                        </div>
                                        <div>
                                          <h3>33.35 EOS</h3>
                                        </div>
                                      </li>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-checkmark"></i>
                                          <h2>Available Margin</h2>
                                        </div>
                                        <div>
                                          <h3>4.445 EOS</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <button className="btn green">Deposit</button>
                                    <button className="btn red">Withdraw</button>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Deposit Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-8">
                                        <p>
                                          Deposits to this address are unlimited.
                                          Note that you may not be able to
                                          withdraw all of your funds at once if
                                          you deposit more than your daily
                                          withdrawal limit.
                                        </p>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <img
                                          src={'img/qr-code-dark.svg'}
                                          alt="qr-code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="coinXMR"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Equity</h2>
                                        </div>
                                        <div>
                                          <h3>34.333 XMR</h3>
                                        </div>
                                      </li>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-checkmark"></i>
                                          <h2>Available Margin</h2>
                                        </div>
                                        <div>
                                          <h3>2.354 XMR</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <button className="btn green">Deposit</button>
                                    <button className="btn red">Withdraw</button>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Deposit Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-8">
                                        <p>
                                          Deposits to this address are unlimited.
                                          Note that you may not be able to
                                          withdraw all of your funds at once if
                                          you deposit more than your daily
                                          withdrawal limit.
                                        </p>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <img
                                          src={'img/qr-code-dark.svg'}
                                          alt="qr-code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="coinKCS"
                                role="tabpanel"
                              >
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">Balances</h5>
                                    <ul>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-cash"></i>
                                          <h2>Total Equity</h2>
                                        </div>
                                        <div>
                                          <h3>86.577 KCS</h3>
                                        </div>
                                      </li>
                                      <li className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                          <i className="icon ion-md-checkmark"></i>
                                          <h2>Available Margin</h2>
                                        </div>
                                        <div>
                                          <h3>5.78 KCS</h3>
                                        </div>
                                      </li>
                                    </ul>
                                    <button className="btn green">Deposit</button>
                                    <button className="btn red">Withdraw</button>
                                  </div>
                                </div>
                                <div className="card">
                                  <div className="card-body">
                                    <h5 className="card-title">
                                      Wallet Deposit Address
                                    </h5>
                                    <div className="row wallet-address">
                                      <div className="col-md-8">
                                        <p>
                                          Deposits to this address are unlimited.
                                          Note that you may not be able to
                                          withdraw all of your funds at once if
                                          you deposit more than your daily
                                          withdrawal limit.
                                        </p>
                                        <div className="input-group">
                                          <input
                                            type="text"
                                            className="form-control"
                                            value="Ad87deD4gEe8dG57Ede4eEg5dREs4d5e8f4e"
                                          />
                                          <div className="input-group-prepend">
                                            <button className="btn btn-primary">
                                              COPY
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <img
                                          src={'img/qr-code-dark.svg'}
                                          alt="qr-code"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
        :<div className="loading cover abs fill flex aic">
            <LineLoader />
        </div>
      }

      {/* Deposit */}
      <div className="modal fade" id="deposit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Deposit</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control form_feild mb-3"
                value={user.EthPubKey}
                disabled = 'disable'
              />
              <button className="btn green_btn btn-block" onClick={_deposit} >Deposit</button>
            
            </div>
          </div>
        </div>
      </div>

      {/* widthdraw */}
      <div className="modal fade" id="widthdraw" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Widthdraw</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="border border-info rounded p-2 mb-3"> 
                <p className="text-info"> Withdraw fees is 20 USD1</p>
              </div>
              <input
                type="number"
                className="form-control form_feild mb-3"
                placeholder="Amount"
                value={Widthdraw}
                onChange={e => setWidthdraw(e.target.value)}
              />
              <input
                type="text"
                className="form-control form_feild mb-3"
                placeholder="Address"
                value={Widthdrawaddress}
                onChange={e => setWidthdrawaddress(e.target.value)}
              />
              <div className="border border-info rounded p-2 mb-3"> 
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-6 text-left text-info">
                      Balance {coin.toUpperCase()} coin: <br />
                      Withdraw fee: <br />
                      USD1 balance:  
                    </div>
                    <div className="col-6 text-right">
                      {amount} <br />
                      20 USD1 <br />
                      {page ? usd1b :'0'} USD1
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn red_btn btn-block" onClick={_withdraw}>Withdraw</button>
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
