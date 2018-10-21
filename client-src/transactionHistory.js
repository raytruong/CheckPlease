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
    currentTransaction = transaction;

    let receiptItems = [];
    for(let i = 0; i < transaction.items.length; i++) {
      receiptItems.push(transaction.items[i]);
    }
    ReactDOM.render(
      <Receipt items={receiptItems}/>, document.getElementById("receiptContainer")
    );
    ReactDOM.render(
      <ButtonSection disabled={false}/>, document.getElementById("buttonsContainer")
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

class ButtonSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: true
    }

    this.deleteTransaction = this.deleteTransaction.bind(this);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.disabled !== this.props.disabled) {
      this.setState({
        disabled: this.props.disabled
      });
    }
  }

  deleteTransaction(transaction) {
    fetch('/delete-transaction/'+transaction._id, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(json => {
      fetchTransactions();
      let receiptItems = [];
      ReactDOM.render(
        <Receipt items={receiptItems}/>, document.getElementById("receiptContainer")
      );
      ReactDOM.render(
        <ButtonSection disabled={true}/>, document.getElementById("buttonsContainer")
      );
    });
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <div className="col-8">
          <div className="row justify-content-center">
            <a href="/"><button className="btn btn-primary">Home Page</button></a>
          </div>
        </div>
        <div className="col-4">
          <div className="row justify-content-center">
            <button onClick={this.deleteTransaction.bind(this, currentTransaction)} type="button" className="btn btn-danger" disabled={this.state.disabled}>Delete Transaction</button>
          </div>
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

let currentTransaction;

fetchTransactions();
ReactDOM.render(
  <Transactions transactions={[]}/>, document.getElementById('transactionsContainer')
);
ReactDOM.render(
  <Receipt items={[]}/>, document.getElementById('receiptContainer')
);
ReactDOM.render(
  <ButtonSection disabled={true}/>, document.getElementById('buttonsContainer')
);
