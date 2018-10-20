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
      <img src={"/images/"+this.props.image+".jpg"} style={{width: "100px", height: "100px"}}></img>
    );
  }
}

class Items extends React.Component {
  render() {
    let items = [];
    for(let i = 0; i < this.props.items.length; i++) {
      items.push(
        <div key={"col-"+i} className="col-3">
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
          {rows}
        </div>
      </div>
    );
  }
}

let dbItems = [
  {
    name: 'test 1',
    image: 'test1',
  },
  {
    name: 'test 2',
    image: 'test2',
  },
  {
    name: 'test 3',
    image: 'test3',
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

ReactDOM.render(
  <Items items={dbItems}/>, document.getElementById('itemsContainer')
);
