import React from "react";
import "./style/LoanCalculator.css"

import InputForm from "./InputForm.js"
import PaymentSchedule from "./PaymentSchedule.js"
import PaymentDetails from "./PaymentDetails.js"

export default class LoanCalculator extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      amount: 0,
      term: 0,
      interestRate: 0,
      typeOfPayment: "annuity",
      dateOfFirstPayment: '',
      clickSubmit: false,
      paymentDates: new Array(),
      monthlyPaymentAmount: new Array(),
      loanRepayment: new Array(),
      interestCharges: new Array(),
      loanBalances: new Array()
    }
    this.handleValuesChange = this.handleValuesChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  // Захватываем изменения состояния
  handleValuesChange(name, value){
    this.setState({
      [name]: value,
      clickSubmit: false
    });
  }

  // Обработка кнопки "Рассчитать"
  handleClickSubmit(){
    if(this.state.amount === 0 ||
       this.state.term === 0 ||
       this.state.interestRate === 0 || 
       this.state.dateOfFirstPayment === ''){
       alert('Пожалуйста, введите все значения для расчёта');
       return;
    }
    let newData;
    if(this.state.typeOfPayment === "annuity")  // В зависимости от типа платежа вызываем соотвествующие расчёты
      newData = calcAnnuityPayments(this.state.amount, this.state.term, this.state.interestRate, this.state.dateOfFirstPayment);
    else
      newData = calcDifferentPayments(this.state.amount, this.state.term, this.state.interestRate, this.state.dateOfFirstPayment);
    this.setState(prevState => ({
      clickSubmit: true,
      paymentDates: newData.paymentDates,
      monthlyPaymentAmount: newData.monthlyPaymentAmount,
      loanRepayment: newData.loanRepayment,
      interestCharges: newData.interestCharges,
      loanBalances: newData.loanBalances
    }));
  }

  render(){
    let details;
    let table;
    if(this.state.clickSubmit){
      details = <PaymentDetails
        monthlyPaymentAmount={this.state.monthlyPaymentAmount}
        interestCharges={this.state.interestCharges}
        typeOfPayment={this.state.typeOfPayment}/>;
      table = <PaymentSchedule
        paymentDates={this.state.paymentDates}
        monthlyPaymentAmount={this.state.monthlyPaymentAmount}
        loanRepayment={this.state.loanRepayment}
        interestCharges={this.state.interestCharges}
        loanBalances={this.state.loanBalances}/>
    }
    return (
    <div className="mainCalculator">
      <h1> Кредитный калькулятор</h1>
      <InputForm 
      amount={this.state.amount}
      term={this.state.term}
      interestRate={this.state.interestRate}
      typeOfPayment={this.state.typeOfPayment}
      dateOfFirstPayment={this.state.dateOfFirstPayment}
      onValuesChange={this.handleValuesChange}
      clickSubmit={this.handleClickSubmit} /> 
      {details}
      {table}  
    </div>
    );
  }
}


// Расчёт аннуитетных платежей
function calcAnnuityPayments(amount, term, interestRate, dateOfFirstPayment){
  dateOfFirstPayment = new Date(dateOfFirstPayment);
  const monthlyRate = Math.pow(1 + interestRate/100, 1/12) - 1; // перевод годовой процентной ставки в месячную
  let paymentDates = new Array();
  let monthlyPaymentAmount = new Array();
  let loanRepayment = new Array();
  let interestCharges = new Array();
  let loanBalances = new Array();

  let kAnnuity = monthlyRate * Math.pow(1 + monthlyRate, term) / (Math.pow(1 + monthlyRate, term) - 1); // Расчёт коэффициента аннуитета
  let currentAmount = amount;
    for(let i = 0; i < term; i++){  // Считаем данные для графика платежей
      monthlyPaymentAmount.push(roundNumber(amount * kAnnuity, 2))
      interestCharges.push(roundNumber(currentAmount * monthlyRate, 2))
      loanRepayment.push(roundNumber(monthlyPaymentAmount[0] - interestCharges[interestCharges.length - 1], 2))
      currentAmount -= loanRepayment[loanRepayment.length - 1]
      loanBalances.push(roundNumber(currentAmount, 2));
      dateOfFirstPayment = addMonth(dateOfFirstPayment)
      paymentDates.push(dateOfFirstPayment);
    }
  return {
    paymentDates: paymentDates,
    monthlyPaymentAmount: monthlyPaymentAmount,
    loanRepayment: loanRepayment,
    interestCharges: interestCharges,
    loanBalances: loanBalances
  }
}


// Расчёт дифференцированных платежей
function calcDifferentPayments(amount, term, interestRate, dateOfFirstPayment){
  dateOfFirstPayment = new Date(dateOfFirstPayment);
  let paymentDates = new Array();
  let monthlyPaymentAmount = new Array();
  let loanRepayment = new Array();
  let interestCharges = new Array();
  let loanBalances = new Array();
  
  let currentAmount = amount;
    for(let i = 0; i < term; i++){ // Считаем данные для графика платежей
      monthlyPaymentAmount.push(roundNumber(amount/term + currentAmount * interestRate/(12 * 100), 2))
      interestCharges.push(roundNumber(currentAmount * interestRate/(12 * 100), 2))
      loanRepayment.push(roundNumber(amount/term, 2))
      currentAmount -= loanRepayment[loanRepayment.length - 1]
      loanBalances.push(roundNumber(currentAmount, 2));
      dateOfFirstPayment = addMonth(dateOfFirstPayment)
      paymentDates.push(dateOfFirstPayment);
    }


  return {
    paymentDates: paymentDates,
    monthlyPaymentAmount: monthlyPaymentAmount,
    loanRepayment: loanRepayment,
    interestCharges: interestCharges,
    loanBalances: loanBalances
  }
}


// Округление числа до scale чисел после запятой
function roundNumber(number, scale){
  return parseFloat(number.toFixed(scale));
}

// Прибавление месяца к дате(чтобы не упустить февраль)
function addMonth(date){
  let nextDate = new Date(date.getFullYear(), date.getMonth()+1, 1);
  return nextDate;
}



