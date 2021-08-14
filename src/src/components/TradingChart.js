import React, {useState,useEffect} from 'react';
import axios from "axios"
import {useDispatch, useSelector} from "react-redux";
import socketIOClient from "socket.io-client";
import Chart from "react-apexcharts";
import dayjs from 'dayjs'


function TradingChart() {
  const generalReducers = useSelector(state => state);
  const [chartData, setgraphData] = useState([]);
  const [graphUpperData, setgraphUpperData] = useState([]);
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(true);
  const {userInfo, pair } = generalReducers;

    const _graphData = async() => {
      let pairWS = sessionStorage.getItem("pair")
      let from = Math.floor(new Date().getTime() ) - (21600000)
      let to = Math.floor(new Date().getTime())
        axios.post(
        `${global.baseurl}:3000/exchange/history`, 
          {   
            "symbol": pairWS.replace("/", "-"),
            "from": from,
            "to": to,
            "resolution": '30'
          }
        )
        .then((data) =>{
            console.log('_graphData',data.data)
            if(data.data.data.v){
              var Gdata = []
              for(let i = 0; i < data.data.data.c.length; i++ ){
                if(Gdata.length == 0){
                  Gdata[0] = {
                    x: new Date( data.data.data.t[i] * 1000 ),
                    y: [data.data.data.o[i].toFixed(6), data.data.data.h[i].toFixed(6), data.data.data.l[i].toFixed(6), data.data.data.c[i].toFixed(6)]
                  }
                }
                else{
                  Gdata[Gdata.length] = {
                    x: new Date( data.data.data.t[i] * 1000 ),
                    y: [data.data.data.o[i].toFixed(6), data.data.data.h[i].toFixed(6), data.data.data.l[i].toFixed(6), data.data.data.c[i].toFixed(6)]
                  }
                }
              }
            }
            if(!Gdata){
              var Gdata = [{
                x: new Date(),
                y: [(0).toFixed(6), (0).toFixed(6), (0).toFixed(6), (0).toFixed(6)]
              }]
              console.log('Gdata', Gdata)
            }
            setgraphData(Gdata)
        })
        .catch ((error) => { 
            console.log(error.message) 
        })
    }

    const _graphUpperData = async() => {
      let pairWS = sessionStorage.getItem("pair")
      let from = Math.floor(new Date().getTime() ) - (86400000)
      let to = Math.floor(new Date().getTime())
      // if(graphUpperData.length == 0){
        axios.post(
        `${global.baseurl}:3000/exchange/history`, 
          {   
            "symbol": pairWS.replace("/", "-"),
            "from": from,
            "to": to,
            "resolution": 'D'
          }
        )
        .then((data) =>{
            console.log('_graphUpperData',data.data.data)
            if(data.data.success){
              if(data.data.data.v){
                setgraphUpperData(data.data.data)
                setTimeout(() => {
                  setshow(true)
                  setshow2(false)
                }, 1000);
              }
            }
        })
        .catch ((error) => { 
            console.log(error.message) 
        })
      // }
    }
    
    useEffect(()=>{
      _graphData()
      _graphUpperData()
      clearInterval(Chart_data);
      var Chart_data = setInterval(() => {
        _graphData()
        _graphUpperData()
      }, 20000);
    },[])
  return (
    <>
      <div className="main-chart mb15 border">
        <div className="bg_pair_heading" >
          <h1>{pair.toUpperCase()}</h1>
          {show &&
            <h1><span className="stats_head">24h High: </span>{graphUpperData.h[0].toFixed(4)}</h1>
          }
          {show &&
            <h1><span className="stats_head">24h Low: </span>{graphUpperData.l[0].toFixed(4)}</h1>
          }
          {show &&
            <h1><span className="stats_head">{pair.split('/')[0].toUpperCase()} 24h Volume: </span>{(graphUpperData.v[0].toFixed(4) * 10).toFixed(4)} {pair.split('/')[1].toUpperCase()}</h1>
          }
          
          {show2 &&
            <h1><span className="stats_head">24h High: </span>0.000</h1>
          }
          {show2 &&
            <h1><span className="stats_head">24h Low: </span>0.000</h1>
          }
          {show2 &&
            <h1><span className="stats_head">{pair.split('/')[0].toUpperCase()} 24h Volume: </span>0.000 {pair.split('/')[1].toUpperCase()}</h1>
          }
        </div>
            <div id="chart">
            <Chart
              options={{
                chart: {
                  height: 500,
                  type: 'candlestick',
                },
                title: {
                  text: 'CandleStick Chart - Category X-axis',
                  align: 'left'
                },
                annotations: {
                  xaxis: [
                    {
                      x: 'Oct 06 14:00',
                      borderColor: '#00E396',
                      label: {
                        borderColor: '#00E396',
                        style: {
                          fontSize: '12px',
                          color: '#fff',
                          background: '#00E396'
                        },
                        orientation: 'horizontal',
                        offsetY: 7,
                        text: 'Annotation Test'
                      }
                    }
                  ]
                },
                tooltip: {
                  enabled: true,
                },
                xaxis: {
                  type: 'category',
                  labels: {
                    formatter: function(val) {
                      return dayjs(val).format('DD/MM')
                    }
                  }
                },
                yaxis: {
                  tooltip: {
                    enabled: true
                  }
                }
              }}
              series={[{
                name: 'candle',
                data: chartData
              }]}
              type="candlestick" 
              height={500} 
            />
          </div>
      </div>
    </>
  );
}

export default React.memo(TradingChart);