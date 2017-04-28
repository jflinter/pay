import React, { Component } from 'react';
import './PaymentButtons.css';

class PaymentButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applePayEnabled: window.ApplePaySession && window.ApplePaySession.canMakePayments()
    }
  }
  render() {
    const getClassName = (type) => {
      return this.props.type === type ? 'pure-button pure-button-active' : 'pure-button'
    }
    return (
      <div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>via</h1>
          </div>
          {this.state.applePayEnabled > 0 &&
            <div id="applepaybutton" className="pure-u-1-2">
              <button className={getClassName('applepay')} onClick={() => this.props.onType('applepay')}>Apple Pay</button>
            </div>
          }
          <div className="pure-u-1-2">
            <button className={getClassName('venmo')} onClick={() => this.props.onType('venmo')}>Venmo</button>
          </div>
          <div className="pure-u-1-2">
            <button className={getClassName('paypal')} onClick={() => this.props.onType('paypal')}>PayPal</button>
          </div>
          <div className="pure-u-1-2">
            <button className={getClassName('squarecash')} onClick={() => this.props.onType('squarecash')}>Square Cash</button>
          </div>
          <div id="lastButton" className="pure-u-1-2">
            <button className={getClassName('creditcard')} onClick={() => this.props.onType('creditcard')}>Credit Card</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentButtons;
