import React, {useState,useEffect} from 'react';
import axios from "axios"
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, CandleSeries, HiloSeries, Inject, DateTime,
  Tooltip, Crosshair } from '@syncfusion/ej2-react-charts';
import {useDispatch, useSelector} from "react-redux";
import socketIOClient from "socket.io-client";
import Chart from "react-google-charts";

function TradingChart() {
  const generalReducers = useSelector(state => state);
  const [chartData, setgraphData] = useState([]);
  const [graphUpperData, setgraphUpperData] = useState([]);
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(true);
  const {userInfo, pair } = generalReducers;
    
    // const socket = socketIOClient('wss://localpsyche.com:4001');
    // let pairWS = sessionStorage.getItem("pair")
    // let from = (Date.now() - 72 * 3600 * 1000)
    // let to = Math.floor(new Date().getTime())
    // var body = {   
    //   "symbol": pairWS.replace("/", "-"),
    //   "from": from,
    //   "to": to,
    //   "resolution": '30'
    // } 
    // socket.emit("chartData", body );
    // socket.on("chart", (data) => {
    //   console.log('graphData' ,body)
    //   console.log('graphData' , data)
    //     if(data){
    //         if(data.s == 'ok'){
    //           var Gdata = []
    //           for(let i = 0; i < data.c.length; i++ ){
    //             if(Gdata.length == 0){
    //               Gdata[0] = [
    //                 `${new Date( data.t[i] * 1000 ).getDate()}-${new Date( data.t[i] * 1000 ).getMonth()}`,
    //                 data.l[i].toFixed(6),
    //                 data.o[i].toFixed(6),
    //                 data.c[i].toFixed(6),
    //                 data.h[i].toFixed(3),
    //               ]
    //             }
    //             else{
    //               Gdata[Gdata.length] = [
    //                 `${new Date( data.t[i] * 1000 ).getDate()}-${new Date( data.t[i] * 1000 ).getMonth()}`,
    //                 data.l[i].toFixed(6),
    //                 data.o[i].toFixed(6),
    //                 data.c[i].toFixed(6),
    //                 data.h[i].toFixed(3),
    //               ]
    //             }
    //           }
    //         }
    //         setgraphData(Gdata)
    //       } 
    // })

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
            "resolution": '15'
          }
        )
        .then((data) =>{
            console.log('_graphData',data.data)
            if(data.data.data.v){
              var Gdata = []
              for(let i = 0; i < data.data.data.c.length; i++ ){
                if(Gdata.length == 0){
                  Gdata[0] = {
                    date: new Date( data.data.data.t[i] * 1000 ),
                    open : data.data.data.o[i].toFixed(6) ,
                    high : data.data.data.h[i].toFixed(4),
                    low : data.data.data.l[i].toFixed(6),
                    close : data.data.data.c[i].toFixed(6),
                    volume : data.data.data.v[i].toFixed(6)
                  }
                }
                else{
                  Gdata[Gdata.length] = {
                    date: new Date( data.data.data.t[i] * 1000 ),
                    open : data.data.data.o[i].toFixed(6) ,
                    high : data.data.data.h[i].toFixed(4),
                    low : data.data.data.l[i].toFixed(6),
                    close : data.data.data.c[i].toFixed(6),
                    volume : data.data.data.v[i].toFixed(6)
                  }
                }
              }
            }
            // console.log('Gdata', Gdata)
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
        <ChartComponent 
          title=' '
          primaryXAxis={{valueType:"DateTime", minimum:new Date(Date.now() - 6 * 3600 * 1000), 
          maximum:new Date(Date.now() + 1 * 3600 * 1000), labelFormat:"yMMM", title: "Month",
          crosshairTooltip:{enable: true}}}
          primaryYAxis={{title:"Price"}}
          tooltip={{enable: true}}
          height= '490px'
          width= '100%'
          fill= '#000'
          crosshair={{enable: true, lineType:"Vertical"}}>
            <Inject services={[CandleSeries, DateTime, Tooltip, Crosshair]}></Inject>
            <SeriesCollectionDirective>
              {/* To create a Hilo Open Close series, import HiloOpenCloseSeries from the chart package and inject it into chart services. Then change the series type to HiloOpenClose*/}
              {/* To create a CandleSeries,import CandleSeries from chart package and inject it into chart series. Then change services type to Candle*/}
              
              <SeriesDirective type="Candle" name="Apple INC." dataSource={chartData} 
              xName="date" high="high" low="low" open="open" close="close"
              ></SeriesDirective>import Chart from "react-google-charts";
            </SeriesCollectionDirective>
          </ChartComponent>
        {/* <TradingViewWidget
          symbol="BITBAY:ETHUSDT1"
          theme={Themes.DARK}
          locale="fr"
          autosize
          interval="D"
          style="1"
          locale="en"
          hide_legend={true}
          enable_publishing={false}
          // save_image={false}
          timezone="Etc/UTC"
          toolbar_bg= "#f1f3f6"
          hide_top_toolbar= {true}
          withdateranges= {false}
          save_image= {false}
        /> */}
        {/* <Chart
          width={'100%'}
          height = {500}
          animation={{
            duration: 1000,
            easing: 'out',
            startup: true,
          }}
          chartType="CandlestickChart"
          loader={<div>Loading Chart</div>}
          data={chartData}
          options={{
            chartArea:{left:80,top:30,width:"90%",height:"80%"},
            titleTextStyle: {
              color: '#F8F8FF'
            },
            hAxis: {
                textStyle: {
                    color: '#F8F8FF'
                },
                titleTextStyle: {
                    color: '#F8F8FF'
                }
            },
            vAxis: {
                textStyle: {
                    color: '#F8F8FF'
                },
                titleTextStyle: {
                    color: '#F8F8FF'
                }
            },
            legend: 'none',
            backgroundColor: {
              fill:'1b1717'
            },
            bar: { groupWidth: '100%' }, // Remove space between bars.
            candlestick: {
              fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
              risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        /> */}
      </div>
    </>
  );
}

export default React.memo(TradingChart);