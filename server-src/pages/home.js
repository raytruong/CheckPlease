import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center"> <div className="col-8">
            <div className="row justify-content-center">
              <h3>Items</h3>
            </div>

            <div className="row justify-content-center">
              <div id="itemsContainer"></div>
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

export default function home(req, res, next) {
    res.locals.content = <HomePage/>;
    res.locals.title = "POS | Home";
    next();
}
