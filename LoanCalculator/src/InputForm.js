import React from 'react';

import './style/InputForm.css';

export default class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
  }

  handleChange(e) {
    // Проверки на корректный ввод пользователем значений
    if (e.target.type === 'number') {
      if (e.target.name === 'interestRate') { // Годовая процентная ставка не может быть меньше 0
        if (e.target.value <= 0) e.target.value = 0.01;
      } else {
        if (e.target.value < 1) e.target.value = 1; // Сумма кредита и срок кредита не может быть меньше 1
        else e.target.value = Math.floor(e.target.value);
      }
    }
    this.props.onValuesChange(e.target.name, e.target.value);
  }

  handleClickSubmit() {
    this.props.clickSubmit();
  }

  render() {
    return (
      <div className="InputForm">
        <div className="leftLables">
          <span>Сумма кредита: </span>
          <br />
          <span> Срок кредита: </span>
          <br />
          <span> Процентная ставка: </span>
          <br />
          <span> Тип платежей: </span>
          <br />
          <span> Дата первого платежа: </span>
          <br />
        </div>
        <div className="rightInputs">
          <input
            name="amount"
            type="number"
            values={this.props.amount}
            onChange={this.handleChange}
          />
          <br />
          <input
            name="term"
            type="number"
            values={this.props.term}
            onChange={this.handleChange}
          />
          <span> месяцев </span>
          <br />
          <input
            name="interestRate"
            type="number"
            values={this.props.interestRate}
            onChange={this.handleChange}
          />
          <span> %годовых </span>
          <br />
          <select
            name="typeOfPayment"
            value={this.props.typeOfPayment}
            onChange={this.handleChange}
          >
            <option value="annuity">аннуитетный</option>
            <option value="differentiated">дифференцированный</option>
          </select>
          <br />
          <input
            type="date"
            name="dateOfFirstPayment"
            value={this.props.dateOfFirstPayment}
            onChange={this.handleChange}
          />
          <br />
        </div>
        <button onClick={this.handleClickSubmit}> Рассчитать </button>
      </div>
    );
  }
}
