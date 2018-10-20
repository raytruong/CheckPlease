import React from 'react';

class HomePage extends React.Component {
  render() {
    return (
      <div id="homeContainer">
        <h1>TEST</h1>
      </div>
    );
   }
}

module.exports = {
  home: function(req, res, next) {
    res.locals.content = <HomePage/>;
    res.locals.title = "POS | Home";
    next();
  }
};
