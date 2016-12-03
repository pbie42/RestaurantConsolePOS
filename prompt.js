const prompt = require('prompt')
const inquirer = require('inquirer')

const { formatOrder, Line, convertOrder, computeOrderTotal, prepareReceipt} = require(process.cwd() + "/src/main")
const { loadMenu, checkItem, getMenuItems, formatMenu } = require(process.cwd() + "/src/menu")
const { makeReceipt } = require(process.cwd() + "/src/pdfreceipt.js")

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

function ask1() {
  inquirer.prompt(questions1).then(function (answers) {
    orderArr.push(answers.item, answers.amount)
    if (answers.anotherItem) {
      ask1()
    } else {
      let order = convertOrder(orderArr, menu)
      console.log(formatOrder(order, menu, 30))
      ask2(order)
    }
  }).catch((error) => {
        console.log(error);
  })
}

function ask2(order) {
  let questions2 = [
    {
      type: 'confirm',
      name: 'startOver',
      message: 'Is this the correct order?',
      default: true
    }
  ]
  inquirer.prompt(questions2).then(function (answers) {
    if (answers.startOver == false) {
      orderArr = []
      console.log("Please enter the order again");
      ask1()
    } else {
      console.log("Successfull Order")
      ask3(order)
    }
  }).catch((error) => {
        console.log(error);
  })
}

function ask3(order) {
  let questions3 = [
    {
      type: 'list',
      name: 'tip',
      message: 'Would the client like to add a tip?',
      choices: tipChoices(order, menu),
      filter: function (val) {
        return val
      }
    }
  ]
  inquirer.prompt(questions3).then(function (answers) {
    let tip = 0
    if (answers.tip == 'Other') {
      console.log("We got other homie");
      ask4(order)
    } else if (answers.tip == 'No') {
      const receipt = prepareReceipt(order, menu, tip)
      makeReceipt(receipt)
    } else {
      tip = parseInt(answers.tip.substr(answers.tip.indexOf(" ") + 1))
      console.log("Successfull Order")
      const receipt = prepareReceipt(order, menu, tip)
      makeReceipt(receipt)
    }
  }).catch((error) => {
        console.log(error);
  })
}

function ask4(order) {
  let questions4 = [
    {
      type: 'input',
      name: 'tip',
      message: 'What would the client like to tip?',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value))
        return valid && value > 0 || 'Please enter a number or a value greater than 0'
      },
      filter: Number
    }
  ]
  inquirer.prompt(questions4).then(function (answers) {
    const tip = answers.tip
    const receipt = prepareReceipt(order, menu, tip)
    makeReceipt(Receipt)
  }).catch((error) => {
        console.log(error);
  })
}

function tipChoices(order, menu) {
    const total = computeOrderTotal(order, menu)
    let arr = []
    arr[0] = "15%: " + total * 0.15
    arr[1] = "18%: " + total * 0.18
    arr[2] = "20%: " + total * 0.20
    arr[3] = "Other"
    arr[4] = "No"
    return arr

}

const str = "15%: 2.54"
let test = str.substr(str.indexOf(" ") + 1);

console.log(test)
//todaysMenu()
//prompt.start()
//getOrder()

ask1()
module.exports = { }
