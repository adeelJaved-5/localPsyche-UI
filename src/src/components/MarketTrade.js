import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export default function MarketTrade() {
  return (
    <>
      <div className="market-trade">
        <Tabs>
          <Tab eventKey="limit" title="Exchange" >
            <div className="d-flex justify-content-between">
              <div className="market-trade-buy">
                <form action="#">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">USD1</span>
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">ETH</span>
                    </div>
                  </div>
                  
                  <button type="submit" className="btn buy">
                    Buy
                  </button>
                </form>
              </div>
              <div className="market-trade-sell">
                <form action="#">
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">USD1</span>
                    </div>
                  </div>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Amount"
                      required
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">ETH</span>
                    </div>
                  </div>
                  
                  <button className="btn sell">Sell</button>
                </form>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
