const { expect } = require('chai')

const { formatOrder, formatOrderLine, priceFor, getItemID, convertOrder, getItemInfo, computeOrderTotal, prepareReceipt } = require(process.cwd() + "/src/main")

const { loadMenu, formatMenu, formatMenuLine, getMenuItems } = require(process.cwd() + "/src/menu")

const { parseIt } = require(process.cwd() + "/src/utils")

describe("Display Menu", function () {

    describe("Printing", function () {

      describe("Menu Line", function () {

        it("formats menu item to displayable string", function () {
          const menu = loadMenu("menu")
          const item = menu[1]
          const itemStr = formatMenuLine(item, 38)
          const expectedStr = "Hamburger:                      15 EUR"
          expect(itemStr).to.equal(expectedStr)
        })

      })

      describe("Full Menu", function () {

        it("displays the current menu with prices", function () {
          const menu = loadMenu("menu")
          const menuStr = formatMenu(menu, 38)
          const expectedStr = [
            "Welcome to The Old Pittsburgh Restaurant!",
            "Today's Menu consists of:             \n",
            "Hamburger:                      15 EUR",
            "Chicken Sandwich:               10 EUR",
            "French Fries:                    5 EUR",
            "Pizza:                          12 EUR"
          ].join("\n")
          expect(menuStr).to.equal(expectedStr)
        })

      })

    })

})

describe("Get Order", function () {

  describe("Get Item Id", function () {

    it("gets the id number of the item", function () {
      const menu = loadMenu("menu")
      const itemName = "French Fries"
      const expectedResult = 3;
      const itemID = getItemID(itemName, menu)
      expect(itemID).to.equal(expectedResult)
    })

  })

  describe("Get Items", function () {

    it("gets the current menu items", function () {
      const menu = loadMenu("menu")
      const currentItems = getMenuItems(menu)
      const expectedArr = ['Hamburger', 'Chicken Sandwich', 'French Fries', 'Pizza']
      expect(currentItems).to.eql(expectedArr)
    })

  })

  describe("Convert Order", function () {

    const menu = loadMenu("menu")
    const order = ['hamburger', 3, 'french fries', 5]
    const orderConvert = convertOrder(order, menu)
    const expectedResult = [ { id: 1, qty: 3 }, { id: 3, qty: 5 } ]
    it("converts inputted order for order printing", function () {
      expect(orderConvert).to.eql(expectedResult)
    })

  })

})

describe("Order Print", function() {

    describe("Printing", function(){

        const menu = loadMenu("menu")
        const order = [ { id: 1, qty: 2 }, {id: 3, qty: 2 }, { id: 4, qty: 1 } ]

        describe("order line", function() {

            const line = { id: 1, qty: 2 }

            it("can be formatted to string", function() {
                expect(formatOrderLine(line, menu, 30)).to.equal("2 x Hamburgers:         30 EUR")
            })

        })

        describe("full order", function() {

            it("can be formatted to string", function() {
                const orderStr = formatOrder(order, menu, 30)
                const expectedStr = [
                    "Here is your order:         \n",
                    "2 x Hamburgers:         30 EUR",
                    "2 x French Fries:       10 EUR",
                    "1 x Pizza:              12 EUR",
                    "------------------------------",
                    "Total                   52 EUR"
                ].join("\n")
                expect(orderStr).to.equal(expectedStr)
            })

        })

    })

})

describe("Prepare Receipt", function () {

  const menu = loadMenu("menu")

  describe("Gets Item Info", function () {
    const item = {id: 1, qty: 2}
    const itemInfo = getItemInfo(item, menu)
    const expectedResult = {
      name: "Hamburger",
      qty: 2,
      priceUnit: 1500,
      priceTotal: 3000
    }
    it("Returns and object with all the Item info and total", function () {
      expect(itemInfo).to.eql(expectedResult)
    })
  })

  describe("Combine Data", function () {
    const order = [ { id: 1, qty: 2 }, {id: 3, qty: 2 }, { id: 4, qty: 1 } ]
    let subTotal = computeOrderTotal(order, menu)
    const tip = parseIt(subTotal * 0.20)
    const discount = parseIt(subTotal * 0.10)
    const receiptInfo = prepareReceipt(order, menu, tip, discount)
    let total = subTotal + Number(tip) - Number(discount)
    subTotal = parseIt(subTotal)
    total = parseIt(total)
    const expectedResult = [
      {
        name: "Hamburger",
        qty: 2,
        priceUnit: 1500,
        priceTotal: 3000
      },
      {
        name: "French Fries",
        qty: 2,
        priceUnit: 500,
        priceTotal: 1000
      },
      {
        name: "Pizza",
        qty: 1,
        priceUnit: 1200,
        priceTotal: 1200
      },
      {
        subTotal: subTotal,
        discount: discount,
        tip: tip,
        total: total
      }
    ]
    it("Puts order data into array of objects for the receipt", function () {
      expect(receiptInfo).to.eql(expectedResult)
    })

  })

})
