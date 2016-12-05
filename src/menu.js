const { parseJSON, loadJSON, makeSpaces, makeLine, pluralize } = require('./utils')

const { priceFor } = require(process.cwd() + "/src/order")

function loadMenu(fileName) {
    return parseJSON(loadJSON(fileName))
}

function getMenuItems(menu) {
  let result = []
  for (let key in menu) {
    result.push(menu[key].name)
  }
  return result
}

function formatMenu(menu, lineLength) {
  let result = []
  const consists = "Today's Menu consists of:             "
  for (let key in menu) {
    result[key] = formatMenuLine(menu[key], lineLength)
  }
  result.unshift(consists)
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

module.exports = { loadMenu, formatMenu, formatMenuLine, getMenuItems }
