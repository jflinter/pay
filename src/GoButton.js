import React from 'react';
import './GoButton.css';

const TEST_BACKEND = 'https://runkit.io/jack/59019ef9cb079300129c7040/branches/master/charges';

const serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj[p] && obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const isMobileSafari = function() {
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  return iOS && webkit && !ua.match(/CriOS/i);
}()

function GoButton(props) {

  const handleClick = () => {
    switch(props.type) {
      case 'venmo':
      const queryString = serialize({
        txn: 'pay',
        audience: 'private',
        recipients: 'jack-flintermann',
        amount: (parseFloat(props.amount) / 100).toFixed(2),
      })
      const scheme = isMobileSafari ? 'venmo://paycharge?' : 'https://venmo.com?';
      window.location.href = scheme + queryString;;
      break;
      case 'paypal':
        window.location.href = 'https://paypal.me/oljack/' + (props.amount / 100);
        break;
      case 'squarecash':
        window.location.href = 'https://cash.me/$jackshack/' + (props.amount / 100);
        break;
      case 'creditcard':
        const handler = window.StripeCheckout.configure({
          key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
          token: function(token) {
            fetch(TEST_BACKEND, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                source: token.id,
                email: token.email,
                amount: props.amount,
              }),
            }).then(token => {
              // TODO
            }).catch(error => {
              // TODO
            });
          }
        });
        handler.open({
          name: 'Jack',
          description: '2 widgets',
          amount: props.amount,
        });
        break;
      case 'applepay':
        const stripe = window.Stripe('pk_live_4TDXxHqrDOTtrermv7uhlFHG');
        const paymentRequest = {
          countryCode: 'US',
          currencyCode: 'USD',
          requiredShippingContactFields: ['email'],
          total: {
            label: 'Jack',
            amount: (parseFloat(this.props.amount) / 100).toFixed(2),
          }
        };
        const session = stripe.applePay.buildSession(paymentRequest, function(result, completion) {
          fetch(TEST_BACKEND, {
              method: 'POST',
              mode: 'cors',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                source: result.token.id,
                email: result.shippingContact.email,
                amount: props.amount,
              }),
            }).then(token => {
              completion(window.ApplePaySession.STATUS_SUCCESS);
            }).catch(error => {
              // TODO
              completion(window.ApplePaySession.STATUS_FAILURE);
            });
        }, function(error) {
          // TODO
          console.log(error.message);
        });
        session.begin();
        break;
      default:
        break;
    }
  }

  const buttonClass = (props.type && props.amount && props.amount > 0) ? 'pure-button pure-button-primary button-xlarge' : 'pure-button pure-button-disabled button-xlarge';
  return (
    <button className={buttonClass} onClick={handleClick}>Go</button>
  )
}

export default GoButton;