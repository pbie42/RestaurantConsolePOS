const { parseJSON, loadJSON, makeSpaces, makeLine, pluralize, parseIt } = require('./utils')

function loadMenu(fileName) {
    return parseJSON(loadJSON(fileName))
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

function getItemInfo({id, qty}, menu) {
  for (let key in menu) {
    if (key == id) {
      let price = menu[key].price.amount
      let itemInfo = {
        name: menu[key].name,
        qty: qty,
        priceUnit: price,
        priceTotal: price * qty
      }
      return itemInfo
    }
  }
}

function getItemID(itemName, menu) {
  for (let key in menu) {
    if (menu[key].name.toLowerCase() == itemName.toLowerCase()) {
      return Number(key)
    }
  }
}

function convertOrder(order, menu) {
  let arr = []
  let i = 0
  while (i < order.length) {
    let orderItem = {}
    if (i == 0 || i % 2 == 0) {
      orderItem.id = getItemID(order[i], menu)
      i++
    }
    orderItem.qty = order[i]
    arr.push(orderItem)
    i++
  }
  return arr
}

function formatOrder(order, menu, lineLength) {
    const result = order.map(item => formatOrderLine(item, menu, lineLength))
    result.push(makeLine(lineLength))
    const total = computeOrderTotal(order, menu)
    result.push(orderTotal(total, lineLength))
    result.unshift("Here is your order:         \n")
    return result.join("\n")
}

function formatOrderLine({qty, id}, menu, lineLength) {
    const item = menu[id]

    const price = priceFor(qty, item)
    const formattedPrice = price + " " + item.price.currency

    const name = pluralize(item.name, qty)
    const label = qty + " x " + name

    const paddingN = lineLength - label.length - formattedPrice.length - 1
    const padding = makeSpaces(paddingN)

    return label + ":" + padding + formattedPrice
}

function orderTotal(total, lineLength) {
    const totalLabel = "Total"
    const currency = " EUR"
    const paddingN = lineLength - totalLabel.length - currency.length - total.toString().length
    const padding = makeSpaces(paddingN)
    return totalLabel + padding + total + currency
}

function priceFor(qty, item) {
    return qty * item.price.amount / 100
}

function computeOrderTotal(order, menu) {
    const summing = (sum, {qty, id}) => sum + priceFor(qty, menu[id])
    return order.reduce(summing, 0)
}

module.exports = { formatOrder, formatOrderLine, priceFor, getItemID, getItemInfo, convertOrder, computeOrderTotal, prepareReceipt }
