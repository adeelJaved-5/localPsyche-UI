import React, {useState,useEffect} from 'react';
import axios from "axios"
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, CandleSeries, HiloSeries, Inject, DateTime,
  Tooltip, Crosshair } from '@syncfusion/ej2-react-charts';
import {useDispatch, useSelector} from "react-redux"

export default function TradingChart() {
  const generalReducers = useSelector(state => state);
  const [chartData, setgraphData] = useState([]);
  const [graphUpperData, setgraphUpperData] = useState([]);
  const [show, setshow] = useState(false);
  const [show2, setshow2] = useState(true);
  const {userInfo, pair } = generalReducers;

  

    const _graphData = async() => {
      let pairWS = pair
      let from = Math.floor(new Date().getTime() / 1000) - 86400
      let to = Math.floor(new Date().getTime() / 1000)
      // console.log(from,to)
      // if(chartData.length == 0){
        axios.post(
        `${global.baseurl}:3000/exchange/history`, 
          {   
            "symbol": pairWS.replace("/", "-"),
            "from": from,
            "to": to,
            "resolution": '60'
          }
        )
        .then((data) =>{
            console.log('_graphData',data.data)
            if(data.data.success){
              if(data.data.data.v){
                var Gdata = []
                for(let i = 0; i < data.data.data.c.length; i++ ){
                  if(Gdata.length == 0){
                    Gdata[0] = {
                      date: new Date( data.data.data.t[i] * 1000 ),
                      open : data.data.data.o[i].toFixed(6) ,
                      high : data.data.data.h[i].toFixed(3),
                      low : data.data.data.l[i].toFixed(6),
                      close : data.data.data.c[i].toFixed(6),
                      volume : data.data.data.v[i].toFixed(6)
                    }
                  }
                  else{
                    Gdata[Gdata.length] = {
                      date: new Date( data.data.data.t[i] * 1000 ),
                      open : data.data.data.o[i].toFixed(6) ,
                      high : data.data.data.h[i].toFixed(3),
                      low : data.data.data.l[i].toFixed(6),
                      close : data.data.data.c[i].toFixed(6),
                      volume : data.data.data.v[i].toFixed(6)
                    }
                  }
                  console.log(Gdata)
                }
              }
            }
            setgraphData(Gdata)
        })
        .catch ((error) => { 
            console.log(error.message) 
        })
      // }
    }

    const _graphUpperData = async() => {
      let pairWS = pair
      let from = Math.floor(new Date().getTime() / 1000) - 86400
      let to = Math.floor(new Date().getTime() / 1000)
      console.log(from,to)
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
    },[])
    setInterval(() => {
      _graphData()
      _graphUpperData()
    }, 20000);
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
            <h1><span className="stats_head">24h Volume: </span>{graphUpperData.v[0].toFixed(4)}</h1>
          }
          
          {show2 &&
            <h1><span className="stats_head">24h High: </span>0.000</h1>
          }
          {show2 &&
            <h1><span className="stats_head">24h Low: </span>0.000</h1>
          }
          {show2 &&
            <h1><span className="stats_head">24h Volume: </span>0.000</h1>
          }
        </div>
        <ChartComponent 
          title=' '
          primaryXAxis={{valueType:"DateTime", minimum:new Date(Math.floor(new Date().getTime()) - 86400), 
          maximum:new Date(), labelFormat:"yMMM", title: "Month",
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
              ></SeriesDirective>
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
      </div>
    </>
  );
}