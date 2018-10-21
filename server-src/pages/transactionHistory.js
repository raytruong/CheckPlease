import React from 'react';

class TransactionHistoryPage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="row justify-content-center">
              <h3>Transactions</h3>
            </div>

            <div className="row justify-content-center">
              <div id="transactionsContainer"></div>
            </div>
          </div>

          <div className="col-4">
            <div className="row justify-content-center">
              <h3>Receipt</h3>
            </div>

            <div className="row justify-content-center">
              <div id="receiptContainer"></div>
            </div>
          </div> 
        </div>
        <div id="buttonsContainer"></div>
      </div>
    );
   }
}

export default function transactionHistory(req, res, next) {
    res.locals.content = <TransactionHistoryPage/>;
    res.locals.title = "POS | Transaction History";
    next();
}
