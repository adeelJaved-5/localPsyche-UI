import React, {useEffect} from 'react';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

export default function TradingChart() {

  return (
    <>
      <div className="main-chart mb15">
        <TradingViewWidget
          symbol="BITBAY:ETHUSDT"
          theme={Themes.DARK}
          locale="fr"
          autosize
          interval="D"
          style="1"
          locale="en"
          hide_legend={true}
          enable_publishing={false}
          save_image={false}
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