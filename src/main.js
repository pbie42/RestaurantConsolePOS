const { parseJSON, loadJSON, makeSpaces, makeLine, pluralize } = require('./utils')

function loadMenu(fileName) {
    return parseJSON(loadJSON(fileName))
}

function checkItem(item, menu) {
  for (let key in menu) {
    if (item.toLowerCase() == menu[key].name.toLowerCase()) {
      return true
    }
  }
  return false
}

function formatMenu(menu, lineLength) {
  let result = []
  const welcome = "Welcome to The Little Belt Restaurant!"
  const consists = "Today's Menu consists of:             "
  for (let key in menu) {
    result[key] = formatMenuLine(menu[key], lineLength)
  }
  result.unshift(consists)
  result.unshift(welcome)
  return result.join("\n")
}

function formatMenuLine(item, lineLength) {
  const itemName = item.name

  const price = priceFor(1, item)
  const formattedPrice = price + " " + item.price.currency

  const paddingN = lineLength - itemName.length - formattedPrice.length - 1
  const padding = makeSpaces(paddingN)

  return itemName + ":" + padding + formattedPrice
}

function formatOrder(order, menu, lineLength) {
    const result = order.map(item => formatOrderLine(item, menu, lineLength))
    result.push(makeLine(lineLength))
    const total = computeOrderTotal(order, menu)
    result.push(orderTotal(total, lineLength))
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

module.exports = { loadMenu, formatOrder, formatOrderLine, formatMenu, formatMenuLine, checkItem }
