const colors = require('colors')

const { computeOrderTotal, getItemInfo } = require(process.cwd() + "/src/order")
const { roundUp, parseIt } = require(process.cwd() + "/src/utils")
const { loadMenu, formatMenu } = require(process.cwd() + "/src/menu")

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
  const menu = loadMenu("menu")
  console.log("\nWelcome to The Old Pittsburgh!\n".green)
  console.log(formatMenu(menu, 38))
  console.log("\nPlease follow the prompts below")
  console.log("to create a new order receipt.\n")
  console.log("Order quantity is at a maximum of 50 per item.\n")
}

function prepareReceipt(order, menu, tip, discount) {
    const result = order.map(item => getItemInfo(item, menu))
    let subTotal = computeOrderTotal(order, menu)
    let total = subTotal + Number(tip) - Number(discount)
    total = parseIt(total)
    subTotal = parseIt(subTotal)
    discount = parseIt(discount)
    const price = {
      subTotal: subTotal,
      discount: discount,
      tip: tip,
      total: total
    }
    result.push(price)
    return result
}

function checkDuplicates(order) {
    for (let i = 0; i < order.length; i++) {
      for (let j = i+1; j < order.length; ) {
        if (order[i].id == order[j].id) {
          order[i].qty += order[j].qty
          if (order[i].qty > 50) {
            order[i].qty = 50
          }
          order.splice(j, 1)
        } else {
          j++
        }
      }
    }
    return order
}


module.exports = { welcome, discountChoices, tipChoices, checkDuplicates, prepareReceipt }
