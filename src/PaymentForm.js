import React from 'react';
import './PaymentForm.css';

function toDollars(amount) {
  return parseFloat(amount) / 100;
}

function PaymentForm(props) {
  const dollars = toDollars(props.amount)
    return (
    <div>
      <AmountField amount={dollars} onChange={props.onAmount} />
    </div>
  );
}

function AmountField(props) {
  return (
    <form className="pure-form pure-form-stacked payment-form">
      <fieldset>
        <label htmlFor="amount"><h1>Pay Jack</h1></label>
        <div className="container">
          <p id="dollarsign">$</p>
          <input id="amount" type="number" pattern="\d*" value={props.amount} onChange={props.onChange} />
        </div>
      </fieldset>
    </form>
  );
}

export default PaymentForm;