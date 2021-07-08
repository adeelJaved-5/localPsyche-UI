import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';

export default function MarketPairs() {
  return (
    <>
      <div className="market-pairs">
        <Tabs defaultActiveKey="eth">
          <Tab eventKey="eth" title="ETH">
            <table className="table">
              <thead>
                <tr>
                  <th>Pairs</th>
                  <th>Last Price</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <i className="icon ion-md-star"></i> ETH/USD1
                  </td>
                  <td>0.99</td>
                  <td className="red">-0.01%</td>
                </tr>
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
