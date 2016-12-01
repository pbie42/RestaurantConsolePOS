const { loadMenu, formatOrder } = require(process.cwd() + "/src/main")

const order = [ { id: 1, qty: 2 }, {id: 3, qty: 2 }, { id: 4, qty: 1 } ]

const menu = loadMenu("menu")

console.log(formatOrder(order, menu, 30))
