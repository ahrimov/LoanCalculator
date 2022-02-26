import React from 'react';

import './style/PaymentDetails.css'

export default class PaymentDetails extends React.Component{
  constructor(props){
    super(props);

  }


  render(){
    var monthlyPaymentAmount = this.props.monthlyPaymentAmount ;
    var interestCharges = this.props.interestCharges;
    var typeOfPayment = this.props.typeOfPayment;
    var rangeMonthlyPayment;
    var overpayment = 0;
    if(typeOfPayment === "annuity")
      rangeMonthlyPayment = monthlyPaymentAmount[0];
    else
      rangeMonthlyPayment = monthlyPaymentAmount[0] + '...' + monthlyPaymentAmount[monthlyPaymentAmount.length - 1];
    for(let i = 0; i < interestCharges.length; i++)
      overpayment += interestCharges[i];
    return (
      <div className="paymentDetails">
        <p> <b> Сумма ежемесячного платежа: </b> </p><span> <b>{rangeMonthlyPayment} </b> руб.</span>
        <p> <b> Переплата по процентам за кредит: </b> </p>  <span> <b>{overpayment.toFixed(2)} </b> руб.</span>
      </div>
    )
  }

}