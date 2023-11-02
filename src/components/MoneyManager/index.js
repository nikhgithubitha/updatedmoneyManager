import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    amount: '',
    title: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      each => each.id !== id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {amount, title, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title,
      amount,
      type: displayText,
    }
    this.setState(prevValue => ({
      transactionList: [...prevValue.transactionList, newTransaction],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeAmount = event => {
    this.setState({amount: event.target.value})
  }

  changeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[1].displayText) {
        expensesAmount += each.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0
    transactionList.forEach(each => {
      if (each.type === transactionTypeOptions[0].displayText) {
        incomeAmount += each.amount
      } else {
        expensesAmount += each.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {amount, title, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div>
        <h1>Hi, Richard</h1>
        <p>
          Welcome back to your <span>Money Manager</span>
        </p>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div>
          <form type="submit" onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              onChange={this.changeTitle}
              value={title}
              placeholder="TITLE"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              onChange={this.changeAmount}
              value={amount}
            />
            <label htmlFor="select">TYPE</label>
            <select id="select" value={optionId} onChange={this.changeOptionId}>
              {transactionTypeOptions.map(each => (
                <option key={each.optionId}>{each.displayText}</option>
              ))}
            </select>
            <br />
            <button type="submit">Add</button>
          </form>
          <ul>
            {transactionList.map(each => (
              <TransactionItem
                key={each.id}
                transactionDetails={each}
                deleteTransaction={this.deleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
