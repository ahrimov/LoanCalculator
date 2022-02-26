import React from "react";

import './style/PaymentSchedule.css'

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];


export default class PaymentSchedule extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    var paymentDates = this.props.paymentDates
    var monthlyPaymentAmount = this.props.monthlyPaymentAmount ;
    var loanRepayment = this.props.loanRepayment;
    var interestCharges = this.props.interestCharges;
    var loanBalances = this.props.loanBalances;

    var tableData = [...Array(paymentDates.length).keys()].map((index) =>(
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{monthNames[paymentDates[index].getMonth()] + ', ' + (paymentDates[index].getYear() + 1900)}</td>
        <td>{monthlyPaymentAmount[index].toFixed(2)}</td>
        <td>{loanRepayment[index].toFixed(2)}</td>
        <td>{interestCharges[index].toFixed(2)}</td>
        <td>{loanBalances[index].toFixed(2)}</td>
      </tr>
    ))

    return (
      <div className="Schedule">
        <h3> График платежей </h3>
        <table className="PaymentSchedule">
          <thead>
            <tr>
              <th> № платежа </th>
              <th> Дата платежа </th>
              <th> Сумма платежа </th>
              <th> Основной долг </th>
              <th> Начисленные проценты </th>
              <th> Остаток задолженности </th>
            </tr>
          </thead>
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    )
  }
}
