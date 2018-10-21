import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {
  render() {
    return (
      <div>
        <ItemPicture image={this.props.image}/>
        <h5 className="mt-1">{this.props.name}</h5>
      </div>
    );
  }
}

class ItemPicture extends React.Component {
  render() {
    return (
      <img src={"/images/"+this.props.image}></img>
    );
  }
}

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.addToReceipt = this.addToReceipt.bind(this);
  }

  addToReceipt(item) {
    for(let i = 0; i < receiptItems.length; i++) {
      if(receiptItems[i].item._id === item._id) {
        receiptItems[i].quantity = receiptItems[i].quantity + 1;
      }
    }
    ReactDOM.render(
      <Receipt items={receiptItems}/>, document.getElementById("receiptContainer")
    );
  }

  render() {
    let items = [];
    for(let i = 0; i < this.props.items.length; i++) {
      items.push(
        <div key={"col-"+i} className="col-lg-3 col-md-4 col-sm-6 mb-4" onClick={this.addToReceipt.bind(this, this.props.items[i])}>
          <Item key={"item-"+i} name={this.props.items[i].name} image={this.props.items[i].img === undefined ? "default.jpg" : this.props.items[i].img}/>
        </div>
      );
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="row">
            {items}
          </div>
        </div>
      </div>
    );
  }
}

class ReceiptItem extends React.Component {
  constructor(props) {
    super(props);
    this.deleteReceiptItem = this.deleteReceiptItem.bind(this);
  }

  deleteReceiptItem(item) {
    for(let i = 0; i < receiptItems.length; i++) {
      if(receiptItems[i].item._id === item._id) {
        receiptItems[i].quantity = 0;
      }
    }

    ReactDOM.render(
      <Receipt items={receiptItems}/>, document.getElementById('receiptContainer')
    );
  }

  render() {
    return (
      <div className={this.props.darkRow ? "row dark align-items-center" : "row align-items-center"}>
        <div className="col-xl-2 col-3">{this.props.quantity}</div>
        <div className="col-xl-8 col-7">{this.props.item.name}</div>
        <div className="col-2"><i onClick={this.deleteReceiptItem.bind(this, this.props.item)} className="fa fa-trash" aria-hidden="true"></i></div>
      </div>
    );
  }
}

class Receipt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let subtotal = 0;
    for(let i = 0; i < receiptItems.length; i++) {
        subtotal += receiptItems[i].item.price * receiptItems[i].quantity;
    }
    let tax = Math.trunc((Math.round(.07 * subtotal * 100) / 100) * 100) / 100;
    let total = tax + subtotal;

    if(total !== prevState.total) {
      this.setState({
        total: total
      }); 
    }
  }

  render() {
    let receiptItemsHtml = [];

    let darkRow = false;
    for(let i = 0; i < receiptItems.length; i++) {
      if(receiptItems[i].quantity !== 0) {
        receiptItemsHtml.push(
          <ReceiptItem key={"receipt-item-"+i} darkRow={darkRow} quantity={receiptItems[i].quantity} item={receiptItems[i].item}/>
        );
        darkRow = darkRow ? false : true;
      }
    }

    return (
      <div className="card">
        <div className="card-body">
          <div className="row dark align-items-center">
            <div className="col-xl-2 col-3"><b>#</b></div>
            <div className="col-xl-10 col-9"><b>Item Name</b></div>
          </div>
          {receiptItemsHtml}
          <div id="fixed" className="row align-items-center">
            <div className="col-12">
              <h5>Total: {this.state.total}</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class ButtonSection extends React.Component {
  constructor(props) {
    super(props);

    this.checkout = this.checkout.bind(this);
  }

  checkout() {
    let subtotal = 0;
    let checkoutItems = [];
    for(let i = 0; i < receiptItems.length; i++) {
      if(receiptItems[i].quantity !== 0) {
        subtotal += receiptItems[i].item.price * receiptItems[i].quantity;
        checkoutItems.push({
          name: receiptItems[i].item.name,
          price: receiptItems[i].item.price,
          quantity: receiptItems[i].quantity
        });
      }
    }

    if(checkoutItems.length === 0) return;

    let tax = Math.trunc((Math.round(.07 * subtotal * 100) / 100) * 100) / 100;
    let total = subtotal + tax;

    let checkoutInfo = {
      items: checkoutItems,
      subtotal: subtotal,
      tax: tax,
      total: total
    };

    fetch("/check-out", {
      method: "POST",
      body: JSON.stringify(checkoutInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then((json) => {
      for(let i = 0; i < receiptItems.length; i++) {
        receiptItems[i].quantity = 0;
      }

      ReactDOM.render(
        <Receipt items={receiptItems}/>, document.getElementById("receiptContainer")
      );
    });
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <div className="col-8">
          <div className="row justify-content-center">
              <a href="/manage"><button type="button" className="btn btn-primary">
                Manage Items
              </button></a>

              <a href="/transactions"><button type="button" className="btn btn-primary ml-3">
                Transaction Log
              </button></a>
          </div>
        </div>

        <div className="col-4">
          <div className="row justify-content-center">
            <button className="btn btn-success" onClick={this.checkout}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

let receiptItems = [];
function fetchItems() {
  fetch("/items")
    .then(res => res.json())
    .then((json) => {
      for(let i = 0; i < json.length; i++) {
        receiptItems.push(
          {
            quantity: 0,
            item: json[i]
          }
        );
      }

      ReactDOM.render(
        <Items items={json}/>, document.getElementById('itemsContainer')
      );
    });
}

fetchItems();
ReactDOM.render(
  <Items items={[]}/>, document.getElementById('itemsContainer')
);
ReactDOM.render(
  <Receipt items={receiptItems}/>, document.getElementById('receiptContainer')
);
ReactDOM.render(
  <ButtonSection/>, document.getElementById('buttonsContainer')
);
