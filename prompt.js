const prompt = require('prompt')
const inquirer = require('inquirer')

const { formatOrder, Line, convertOrder} = require(process.cwd() + "/src/main")
const { loadMenu, checkItem, getMenuItems, formatMenu } = require(process.cwd() + "/src/menu")

let x = 0,
    orderArr = []

const menu = loadMenu("menu")

const currentMenu = getMenuItems(menu)

let questions1 = [
  {
    type: 'list',
    name: 'item',
    message: 'Which item was ordered?',
    choices: currentMenu,
    filter: function (val) {
      return val
    }
  },
  {
    type: 'input',
    name: 'amount',
    message: 'How many were ordered?',
    validate: function (value) {
      let valid = !isNaN(parseFloat(value))
      return valid && value > 0 || 'Please enter a number or a value greater than 0'
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

let questions2 = [
  {
    type: 'confirm',
    name: 'startOver',
    message: 'Is this the correct order?',
    default: true
  }
]
/*
let questions3 = [
  {
    type: 'list',
    name: 'tip',
    message: 'Would the client like to add a tip?',
    choices: tipChoices,
    filter: function (val) {
      return val
    }
  }
]
*/
function ask1() {
  inquirer.prompt(questions1).then(function (answers) {
    orderArr.push(answers.item, answers.amount)
    if (answers.anotherItem) {
      ask1()
    } else {
      let order = convertOrder(orderArr, menu)
      console.log(formatOrder(order, menu, 30))
      ask2()
    }
  }).catch((error) => {
        console.log(error);
  })
}

function ask2() {
  inquirer.prompt(questions2).then(function (answers) {
    orderArr.push(answers.item, answers.amount)
    if (answers.startOver == false) {
      orderArr = []
      console.log("Please enter the order again");
      ask1()
    } else {
      //let order = convertOrder(orderArr, menu)
      console.log("Successfull Order")
    }
  }).catch((error) => {
        console.log(error);
  })
}

function ask3(order) {
  inquirer.prompt(questions2).then(function (answers) {
    orderArr.push(answers.item, answers.amount)
    if (answers.startOver == false) {
      orderArr = []
      console.log("Please enter the order again");
      ask1()
    } else {
      let order = convertOrder(orderArr, menu)
      console.log("Successfull Order")
    }
  }).catch((error) => {
        console.log(error);
  })
}




console.log(formatMenu(menu, 38))
//todaysMenu()
//prompt.start()
//getOrder()

ask1()
module.exports = { }
