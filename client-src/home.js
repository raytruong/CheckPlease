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
      <img src={"/images/"+this.props.image+".jpg"}></img>
    );
  }
}

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.addToReceipt = this.addToReceipt.bind(this);
  }

  addToReceipt(item) {
    console.log(receiptItems);
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
          <Item key={"item-"+i} name={this.props.items[i].name} image={this.props.items[i].image}/>
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
  render() {
    return (
      <div className={this.props.darkRow ? "row dark align-items-center" : "row align-items-center"}>
        <div className="col-2">{this.props.quantity}</div>
        <div className="col-8">{this.props.item.name}</div>
        <div className="col-2">{this.props.price}</div>
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

let dbItems = [
  {
    name: 'test 1',
    image: 'test1',
    id: '1'
  },
  {
    name: 'test 2',
    image: 'test2',
    id: '2'
  },
  {
    name: 'test 3',
    image: 'test3',
    id: '3'
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
