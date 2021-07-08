import React from 'react';

export default function OrderBook() {
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
            <tr>
              <td className="red">0.99</td>
              <td>1253.415</td>
              <td>1240.88</td>
            </tr>
            <tr >
              <td className="red">1.001</td>
              <td>54.59</td>
              <td>54.644</td>
            </tr>
            <tr>
              <td className="red">0.99</td>
              <td>164.00</td>
              <td>162.36</td>
            </tr>
          </tbody>
          <tbody className="ob-heading">
            <tr>
              <td>
                <span>Last Price</span>
                0.99
              </td>
              <td>
                <span>USD</span>
                0.999
              </td>
              <td className="red">
                <span>Change</span>
                -0.01%
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="green">1.00</td>
              <td>66</td>
              <td>66.00</td>
            </tr>
            <tr>
              <td className="green">1.00</td>
              <td>120</td>
              <td>120.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
