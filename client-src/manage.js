import React from 'react';
import ReactDOM from 'react-dom';

class ItemDeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = this.deleteItem.bind(this);
  }
  
  deleteItem(item) {
    fetch('/delete-item/'+item._id, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(json => {
      fetchItems();
    });
  }

  render() {
    return (
      <button type="button" className="btn btn-danger mt-1" onClick={this.deleteItem.bind(this, this.props.item)}>Delete</button>
    );
  }
}

class ItemEditButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      price: ""
    }

    this.handleEditNameChange = this.handleEditNameChange.bind(this);
    this.handleEditPriceChange = this.handleEditPriceChange.bind(this);
    this.editItem = this.editItem.bind(this);
  }

  handleEditNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleEditPriceChange(event) {
    this.setState({
      price: event.target.value
    });
  }

  editItem(id, name, price) {
    let itemToEdit = {
      name: this.state.name,
      price: this.state.price
    }

    fetch("/edit-item/"+id, {
      method: "POST",
      body: JSON.stringify(itemToEdit),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then((res) => {
      fetchItems();
    });
  }
  
  render() {
    return (
      <div>
        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={"#editItemModal-"+this.props.item._id}>Edit</button>

        <div className="modal fade" id={"editItemModal-"+this.props.item._id} tabIndex="-1" role="dialog" aria-labelledby={"editItemModalLabel-"+this.props.item._id} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id={"editItemModalLabel-"+this.props.item._id}>Edit Item</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <label htmlFor={"editNameInput-"+this.props.item._id}>Item Name</label>
                <input type="text" className="form-control" id={"editNameInput-"+this.props.item._id} value={this.state.name} onChange={this.handleEditNameChange} required></input>

                <br/>
                <label htmlFor={"editPriceInput-"+this.props.item._id}>Price</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id={"pricePrepend-"+this.props.item._id}>$</span>
                  </div>
                  <input type="text" className="form-control" id={"editPriceInput-"+this.props.item._id} value={this.state.price} onChange={this.handleEditPriceChange} aria-describedby={"pricePrepend-"+this.props.item._id} required></input>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.editItem.bind(this, this.props.item._id)} disabled={this.state.name === "" || this.state.price === "" || isNaN(this.state.price)} data-dismiss="modal">Submit Changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Item extends React.Component {
  render() {
    return (
      <div>
        <ItemPicture image={this.props.image}/>
        <h5 className="mt-1">{this.props.name}</h5>
        <ItemEditButton item={this.props.item}/>
        <ItemDeleteButton item={this.props.item}/>
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
  render() {
    let items = [];
    for(let i = 0; i < this.props.items.length; i++) {
      items.push(
        <div key={"col-"+i} className="col-lg-3 col-md-4 col-sm-6 mb-4">
          <Item key={"item-"+i} name={this.props.items[i].name} item={this.props.items[i]} image={this.props.items[i].img === undefined ? "default.jpg" : this.props.items[i].img}/>
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
      fetchItems();
      this.setState({
        name: "",
        price: ""
      });
    });
  }

  render() {
    return (
      <div className="row justify-content-center mt-3">
        <div className="col-12">
          <div className="row justify-content-center">
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addItemModal">
              Add Item
            </button>

            <a href="/"><button type="button" className="btn btn-primary ml-3">
              Home Page
            </button></a>

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
      </div>
    );
  }
}

function fetchItems() {
  fetch("/items")
    .then(res => res.json())
    .then((json) => {
      ReactDOM.render(
        <Items items={json}/>, document.getElementById('manageContainer')
      );
    });
}

fetchItems();
ReactDOM.render(
  <Items items={[]}/>, document.getElementById('manageContainer')
);
ReactDOM.render(
  <ButtonSection/>, document.getElementById('buttonsContainer')
);
