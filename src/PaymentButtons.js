import React, { Component } from 'react';
import './PaymentButtons.css';

class PaymentButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applePayEnabled: false
    }
  }
  componentDidMount() {
    const availability = (available) => {
      this.setState({
        applePayEnabled: available
      })
    }
    window.Stripe.applePay.checkAvailability(availability);
  }
  render() {
    const getClassName = (type) => {
      return this.props.type === type ? 'pure-button pure-button-active' : 'pure-button'
    }
    return (
      <div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <p>Using</p>
          </div>
          <div className="pure-u-1-3">
            <button className={getClassName('venmo')} onClick={() => this.props.onType('venmo')}>Venmo</button>
          </div>
          <div className="pure-u-1-3">
            <button className={getClassName('paypal')} onClick={() => this.props.onType('paypal')}>PayPal</button>
          </div>
          <div className="pure-u-1-3">
            <button className={getClassName('squarecash')} onClick={() => this.props.onType('squarecash')}>Square Cash</button>
          </div>
          <div className="pure-u-1-3">
            <button className={getClassName('creditcard')} onClick={() => this.props.onType('creditcard')}>Credit Card</button>
          </div>
          {this.state.applePayEnabled > 0 &&
            <div className="pure-u-1-3">
              <button className={getClassName('applepay')} onClick={() => this.props.onType('applepay')}>Apple Pay</button>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default PaymentButtons;
