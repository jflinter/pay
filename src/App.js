import React, { Component } from 'react';
import PaymentForm from './PaymentForm.js';
import PaymentButtons from './PaymentButtons.js';
import GoButton from './GoButton.js';
import './App.css';

function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function toCents(amount) {
  return parseInt(parseFloat(amount) * 100, 10)
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: toCents(getUrlParameter('amount')),
      type: null,
    };
  }
  handleAmount = (event) => {
    this.setState({
      amount: toCents(event.target.value),
    })
  }
  handleType = (type) => {
    this.setState({
      type: type
    })
  }
  render() {
    return (
      <div className="App">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <PaymentForm amount={this.state.amount} onAmount={this.handleAmount}/>
            <PaymentButtons type={this.state.type} onType={this.handleType}/>
            <GoButton amount={this.state.amount} type={this.state.type}/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
