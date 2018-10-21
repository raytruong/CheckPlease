import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {
  render() {
    return (
      <div>
        <ItemPicture image={this.props.image}/>
        <h5>{this.props.name}</h5>
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
      if(receiptItems[i].item.id === item.id) {
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
        <div key={"col-"+i} className="col-lg-3 col-md-4 col-sm-6" onClick={this.addToReceipt.bind(this, this.props.items[i])}>
          <Item key={"item-"+i} name={this.props.items[i].name} image={this.props.items[i].img === undefined ? "default.jpg" : this.props.items[i].img}/>
        </div>
      );
    }

    let rows = [];
    let numberOfRows = Math.floor(items.length / 4);
    let numberOfExtra = items.length % 4;
    for(let i = 0; i < numberOfRows; i++) {
      rows.push(
        <div key={"row-"+i} className="row">
          {items[4*i+0]}
          {items[4*i+1]}
          {items[4*i+2]}
          {items[4*i+3]}
        </div>
      );
    }
    if(numberOfExtra !== 0) {
      rows.push(
        <div key={"row-"+numberOfRows} className="row">
          {items[4*numberOfRows+0]}
          {numberOfExtra > 1 && items[4*numberOfRows+1]}
          {numberOfExtra > 2 && items[4*numberOfRows+2]}
          {numberOfExtra > 3 && items[4*numberOfRows+3]}
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
      if(receiptItems[i].item.id === item.id) {
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
          {receiptItemsHtml}
        </div>
      </div>
    );
  }
}

class ButtonSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: ""
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.checkout = this.checkout.bind(this);
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handlePriceChange(event) {
    this.setState({
      price: event.target.value
    });
  }

  addItem(name, price) {
    let itemToAdd = {
      name: this.state.name,
      price: this.state.price
    }

    fetch("/new-item", {
      method: "POST",
      body: JSON.stringify(itemToAdd),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then((res) => {
      console.log(res);
    });
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

    let taxRate = .07;
    let tax = taxRate * subtotal;
    let total = subtotal + tax;

    let checkoutInfo = {
      items: checkoutItems,
      subtotal: subtotal,
      tax: tax,
      total: total
    };

    console.log(checkoutInfo);

    for(let i = 0; i < receiptItems.length; i++) {
      receiptItems[i].quantity = 0;
    }

    ReactDOM.render(
      <Receipt items={receiptItems}/>, document.getElementById("receiptContainer")
    );
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <div className="col-8">
          <div className="row justify-content-center">
              <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addItemModal">
                Add Item
              </button>

              <div className="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="addItemModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="addItemModalLabel">Add Item</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <label htmlFor="nameInput">Item Name</label>
                      <input type="text" className="form-control" id="nameInput" placeholder="Orange Chicken" value={this.state.name} onChange={this.handleNameChange} required></input>

                      <br/>
                      <label htmlFor="priceInput">Price</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" id="pricePrepend">$</span>
                        </div>
                        <input type="text" className="form-control" id="priceInput" value={this.state.price} onChange={this.handlePriceChange} placeholder="5" aria-describedby="pricePrepend" required></input>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" onClick={this.addItem} disabled={this.state.name === "" || this.state.price === "" || isNaN(this.state.price)} data-dismiss="modal">Add Item</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>

        <div className="col-4">
          <div className="row justify-content-center">
            <button className="btn btn-primary" onClick={this.checkout}>Checkout</button>
          </div>
        </div>
      </div>
    );
  }
}

let dbItems = [
  {
    name: 'test 1',
    img: 'test1.jpg',
    id: '1',
    price: 1
  },
  {
    name: 'test 2',
    img: 'test2.jpg',
    id: '2',
    price: 2
  },
  {
    name: 'test 3',
    img: 'test3.jpg',
    id: '3',
    price: 3
  },
  {
    name: 'test 4',
    image: 'test3',
  },
  {
    name: 'test 5',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  },
  {
    name: 'test 3',
    image: 'test3',
  }
]

let receiptItems = [];
for(let i = 0; i < dbItems.length; i++) {
  receiptItems.push(
    {
      quantity: 0,
      item: dbItems[i]
    }
  );
}

ReactDOM.render(
  <Items items={dbItems}/>, document.getElementById('itemsContainer')
);
ReactDOM.render(
  <Receipt items={receiptItems}/>, document.getElementById('receiptContainer')
);
ReactDOM.render(
  <ButtonSection/>, document.getElementById('buttonsContainer')
);
