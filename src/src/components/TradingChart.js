import React, {useEffect} from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import {useDispatch, useSelector} from "react-redux"

export default function TradingChart() {
  const generalReducers = useSelector(state => state);
  const {userInfo, pair } = generalReducers;

  return (
    <>
      <div className="main-chart mb15">
        <h1 className="p-2 bg_pair_heading">{pair.toUpperCase()}</h1>
        <TradingViewWidget
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
        />
      </div>
    </>
  );
}