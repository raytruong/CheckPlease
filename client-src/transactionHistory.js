import React from 'react';
import ReactDOM from 'react-dom';

class ReceiptItem extends React.Component {
  render() {
    return (
      <div className={this.props.darkRow ? "row dark align-items-center" : "row align-items-center"}>
        <div className="col-xl-2 col-3">{this.props.quantity}</div>
        <div className="col-xl-10 col-9">{this.props.item.name}</div>
      </div>
    );
  }
}

class Receipt extends React.Component {
  render() {
    let receiptItemsHtml = [];
    let darkRow = false;
    for(let i = 0; i < this.props.items.length; i++) {
      if(this.props.items[i].quantity !== 0) {
        receiptItemsHtml.push(
          <ReceiptItem key={"receipt-item-"+i} darkRow={darkRow} quantity={this.props.items[i].quantity} item={this.props.items[i]}/>
        );
        darkRow = darkRow ? false : true;
      }
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="row dark align-items-center">
            <div className="col-xl-2 col-3"><b>Ct</b></div>
            <div className="col-xl-10 col-9"><b>Item Name</b></div>
          </div>
          {receiptItemsHtml}
        </div>
      </div>
    );
  }
}

class Transaction extends React.Component {
  constructor(props) {
    super(props);
    this.addToReceipt = this.addToReceipt.bind(this);
  }

  addToReceipt(transaction) {
    let receiptItems = [];
    for(let i = 0; i < transaction.items.length; i++) {
      receiptItems.push(transaction.items[i]);
    }
    ReactDOM.render(
      <Receipt items={receiptItems}/>, document.getElementById("receiptContainer")
    );
  }

  render() {
    return (
      <div className={this.props.darkRow ? "row dark click align-items-center" : "row click align-items-center"} onClick={this.addToReceipt.bind(this, this.props.transaction)}>
        <div className="col-3">{this.props.transaction.date.slice(5,10)}</div>
        <div className="col-3">${this.props.transaction.subtotal}</div>
        <div className="col-3">${this.props.transaction.tax}</div>
        <div className="col-3">${this.props.transaction.total}</div>
      </div>
    );
  }
}

class Transactions extends React.Component {
  render() {
    let transactionsHtml = [];
    let darkRow = false;
    for(let i = 0; i < this.props.transactions.length; i++) {
      if(this.props.transactions[i].quantity !== 0) {
        transactionsHtml.push(
          <Transaction key={"transaction-"+i} darkRow={darkRow} transaction={this.props.transactions[i]}/>
        );
        darkRow = darkRow ? false : true;
      }
    }
    
    return (
      <div className="card">
        <div className="card-body">
          <div className="row dark align-items-center">
            <div className="col-3"><b>Date</b></div>
            <div className="col-3"><b>Subtotal</b></div>
            <div className="col-3"><b>Tax</b></div>
            <div className="col-3"><b>Total</b></div>
          </div>
          {transactionsHtml}
        </div>
      </div>
    );
  }
}

function fetchTransactions() {
  let transactions = [];
  fetch("/transaction-history")
    .then(res => res.json())
    .then((json) => {
      for(let i = 0; i < json.length; i++) {
        transactions.push(json[i]);
      }

      ReactDOM.render(
        <Transactions transactions={transactions}/>, document.getElementById('transactionsContainer')
      );
    });
}

fetchTransactions();
ReactDOM.render(
  <Transactions transactions={[]}/>, document.getElementById('transactionsContainer')
);
ReactDOM.render(
  <Receipt items={[]}/>, document.getElementById('receiptContainer')
);
