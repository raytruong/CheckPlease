import React from 'react';

class ManagePage extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="row justify-content-center">
              <h3>Items</h3>
            </div>

            <div className="row justify-content-center">
              <div id="manageContainer"></div>
            </div>
          </div>
        </div>
        
        <div id="buttonsContainer"></div>
      </div>
    );
   }
}

export default function manage(req, res, next) {
    res.locals.content = <ManagePage/>;
    res.locals.title = "POS | Manage";
    next();
}
