const prompt = require('prompt')
const inquirer = require('inquirer')

const { loadMenu, formatOrderLine, formatMenu, checkItem } = require(process.cwd() + "/src/main")

let x = 0,
    arr = []

const menu = loadMenu("menu")

let questions = [
  {
    type: 'list',
    name: 'item',
    message: 'Which item was ordered?',
    choices: ['Hamburger', 'Chicken Sandwich', 'French Fries', 'Pizza'],
    filter: function (val) {
      return val.toLowerCase()
    }
  },
  {
    type: 'input',
    name: 'amount',
    message: 'How many were ordered?',
    validate: function (value) {
      var valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number
  },
  {
    type: 'confirm',
    name: 'anotherItem',
    message: 'Is there another item to order?',
    default: true
  }
]

function ask() {
  inquirer.prompt(questions).then(function (answers) {
    arr.push(answers.item, answers.amount)
    if (answers.anotherItem) {
      ask()
    } else {
      console.log(arr)
    }
  }).catch((error) => {
        console.log(error);
  })
}

/*
let schema = {
  properties: {
    Item: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Item can only contain letters, spaces, or dashes',
      required: true
    },
    Amount: {
      pattern: /^\d+$/,
      message: 'Amount can only be a number',
      required: true
    }
  }
}


function getOrder() {
  prompt.get(schema, function (err, result) {
    if (result.Item.toLowerCase() == 'done') {
      orderEntered()
    } else {
      let order = {
        item: result.Item,
        amount: result.Amount
      }
      arr.push(order)
      getOrder()
    }
  });
}
*/

/*
function todaysMenu() {
  console.log('\n');
  console.log("When your order is ready:\n")
  console.log("Please enter the item in the item prompt");
  console.log("and the amount ordered in the amount prompt\n");
  console.log("when your order is finished:\n");
  console.log("Enter 'Done' in the item prompt");
  console.log("Enter 0 in the amount prompt\n");
}

function orderEntered() {
  console.log(arr)
}
*/



console.log(formatMenu(menu, 38))
//todaysMenu()
//prompt.start()
//getOrder()

ask()
module.exports = { }
