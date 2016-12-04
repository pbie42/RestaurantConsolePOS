const prompt = require('prompt')
const inquirer = require('inquirer')
const colors = require('colors')

const { formatOrder, Line, convertOrder, computeOrderTotal, prepareReceipt, checkDuplicates} = require(process.cwd() + "/src/main")
const { loadMenu, checkItem, getMenuItems, formatMenu } = require(process.cwd() + "/src/menu")
const { makeReceipt } = require(process.cwd() + "/src/pdfreceipt.js")
const { roundUp } = require(process.cwd() + "/src/utils.js")

let x = 0,
    orderArr = []

const menu = loadMenu("menu")

const currentMenu = getMenuItems(menu)

function ask1() {
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
  inquirer.prompt(questions1).then(function (answers) {
    orderArr.push(answers.item, answers.amount)
    if (answers.anotherItem) {
      ask1()
    } else {
      let order = convertOrder(orderArr, menu)
      const combinedOrder = checkDuplicates(order)
      console.log(formatOrder(combinedOrder, menu, 30))
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
      console.log("\n\nPlease enter the order again\n");
      ask1()
    } else {
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
      ask4(order)
    } else if (answers.tip == 'No') {
      ask5(order, tip)
    } else {
      tip = answers.tip.substr(answers.tip.indexOf(" ") + 1)
      ask5(order, tip)
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
      message: 'How much? (Format: 00.00):',
      validate: function (value) {
        let valid = !isNaN(parseFloat(value))
        return valid && value > 0 || 'Please enter a number or a value greater than 0'
      },
      filter: Number
    }
  ]
  inquirer.prompt(questions4).then(function (answers) {
    const tip = roundUp(answers.tip)
    ask5(order, tip)
  }).catch((error) => {
        console.log(error);
  })
}

function ask5(order, tip) {
  let questions5 = [
    {
      type: 'list',
      name: 'discount',
      message: 'Does a discount need to be added?',
      choices: discountChoices(order, menu),
      filter: function (val) {
        return val
      }
    }
  ]
  inquirer.prompt(questions5).then(function (answers) {
    let discount = 0
    if (answers.discount == 'No') {
      const receipt = prepareReceipt(order, menu, tip, discount)
      makeReceipt(receipt)
    } else if (answers.discount == 'Other') {
      ask6(order, tip)
    } else {
      discount = answers.discount.substr(answers.discount.indexOf(" ") + 1)
      const receipt = prepareReceipt(order, menu, tip, discount)
      makeReceipt(receipt)
    }
  }).catch((error) => {
        console.log(error);
  })
}

function ask6(order, tip) {
  let questions6 = [
    {
      type: 'input',
      name: 'discount',
      message: 'How much? (Format: 00.00)',
      validate: function (value) {
        const total = computeOrderTotal(order, menu)
        let valid = !isNaN(parseFloat(value))
        return valid && value > 0 && value <= total || 'Please enter a number or'
        + ' a value greater than 0 or a value less than ' + total + '.00'
      },
      filter: Number
    }
  ]
  inquirer.prompt(questions6).then(function (answers) {
    const discount = roundUp(answers.discount)
    const receipt = prepareReceipt(order, menu, tip, discount)
    makeReceipt(receipt)
  }).catch((error) => {
        console.log(error);
  })
}

function discountChoices(order, menu) {
  const total = computeOrderTotal(order, menu)
  let arr = []
  arr[0] = "No"
  arr[1] = "5%: " + roundUp(total * 0.05)
  arr[2] = "10%: " + roundUp(total * 0.10)
  arr[3] = "15%: " + roundUp(total * 0.15)
  arr[4] = "Other"
  return arr
}

function tipChoices(order, menu) {
    const total = computeOrderTotal(order, menu)
    let arr = []
    arr[0] = "15%: " + roundUp(total * 0.15)
    arr[1] = "18%: " + roundUp(total * 0.18)
    arr[2] = "20%: " + roundUp(total * 0.20)
    arr[3] = "Other"
    arr[4] = "No"
    return arr

}

function welcome() {
  console.log("\nWelcome to The Old Pittsburgh!\n".green)
  console.log("Please follow the prompts below")
  console.log("to create a new order receipt.\n");
}


module.exports = { ask1, welcome }
