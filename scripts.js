const Modal = {
  open() {
    document.querySelector('.modal-overlay').classList.add('active')
  },
  close() {
    document.querySelector('.modal-overlay').classList.remove('active')
  }
}

const transactions = [
  {
    description: 'Luz',
    amount: -50000,
    date: '23/01/2021'
  },
  {
    description: 'Criação de Website',
    amount: 500000,
    date: '24/01/2021'
  },
  {
    description: 'Aluguel',
    amount: -150000,
    date: '26/01/2021'
  },
  {
    description: 'App',
    amount: 200000,
    date: '26/01/2021'
  },
]

const Transaction = {
  all: transactions,

  add(transaction) {
    Transaction.all.push(transaction)

    App.reload()
  },

  remove(index) {
    Transaction.all.splice(index, 1)

    App.reload()
  },

  incomes() {
    let income = 0

    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0) {
        income += transaction.amount
      }
    })

    return income
  },

  expenses() {
    let expense = 0

    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0) {
        expense += transaction.amount
      }
    })

    return expense
  },

  total() {
    return Transaction.incomes() + Transaction.expenses()
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction)

    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount) 

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/minus.svg" alt="Remover transação">
      </td>
    `
    return html
  },

  updateBalance() {
    document
      .getElementById('incomeDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.incomes())

    document
      .getElementById('expenseDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())

    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions() {
    DOM.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, '')
    value = Number(value) / 100

    value = value.toLocaleString('pr-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return `${signal} ${value}`
  }
}

const App = {
  init() {
    Transaction.all.forEach(transaction => {
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance()
  },

  reload() {
    DOM.clearTransactions()

    App.init()
  }
}

App.init()
