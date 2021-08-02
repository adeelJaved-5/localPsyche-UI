import React, {useState,useEffect} from 'react';
import axios from "axios"
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, CandleSeries, HiloSeries, Inject, DateTime,
  Tooltip, Crosshair } from '@syncfusion/ej2-react-charts';
import {useDispatch, useSelector} from "react-redux"

export default function TradingChart() {
  const generalReducers = useSelector(state => state);
  const [chartData, setgraphData] = useState([]);
  const {userInfo, pair } = generalReducers;

  

    const _graphData = async() => {
      let pairWS = pair
      if(chartData.length == 0){
        axios.post(
        `${global.baseurl}:3000/exchange/history`, 
          {   
            "symbol": pairWS.replace("/", "-"),
            "from": '1625234531',
            "to": '1627912931',
            "resolution": 'D'
          }
        )
        .then((data) =>{
            console.log('_graphData',data.data)
            if(data.data.success){
              var Gdata = []
              for(let i = 0; i < data.data.data.c.length; i++ ){
                if(Gdata.length == 0){
                  Gdata[0] = {
                    date: new Date( data.data.data.t[i] ),
                    open : data.data.data.o[i].toFixed(6) ,
                    high : data.data.data.h[i].toFixed(6),
                    low : data.data.data.l[i].toFixed(6),
                    close : data.data.data.c[i].toFixed(6),
                    volume : data.data.data.v[i].toFixed(6)
                  }
                }
                else{
                  Gdata[Gdata.length + 1] = {
                    date: new Date( data.data.data.t[i] ),
                    open : data.data.data.o[i] ,
                    high : data.data.data.h[i],
                    low : data.data.data.l[i],
                    close : data.data.data.c[i],
                    volume : data.data.data.v[i]
                  }
                }
                console.log(Gdata)
              }
            }
            setgraphData(Gdata)
        })
        .catch ((error) => { 
            console.log(error.message) 
        })
      }
    }

    useEffect(()=>{
      _graphData()
    },[])
  return (
    <>
      <div className="main-chart mb15 border">
        <h1 className="pt-3 bg_pair_heading" >{pair.toUpperCase()}</h1>
        <ChartComponent 
          title=' '
          primaryXAxis={{valueType:"DateTime", minimum:new Date( '2020, 12, 31'), 
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