const { expect } = require('chai')

const { loadMenu } = require(process.cwd() + "/src/menu")

const { convertOrder, getItemID, getItemInfo, formatOrder, formatOrderLine, orderTotal, priceFor, computeOrderTotal } = require(process.cwd() + "/src/order")

describe("Get Order", function () {

  const menu = loadMenu("menu")

  describe("Gets Item Info", function () {

      it("Returns an object with all the Item info and total", function () {
        const item = {id: 1, qty: 2}
        const itemInfo = getItemInfo(item, menu)
        const expectedResult = {
          name: "Hamburger",
          qty: 2,
          priceUnit: 1500,
          priceTotal: 3000
        }
          expect(itemInfo).to.eql(expectedResult)
      })

  })

    describe("Get Item Id", function () {

        it("gets the id number of the item", function () {
          const itemName = "French Fries"
          const expectedResult = 3
          const itemID = getItemID(itemName, menu)
          expect(itemID).to.equal(expectedResult)
        })

    })

    describe("Convert Order", function () {
        it("converts inputted order for order printing", function () {
          const order = ['hamburger', 3, 'french fries', 5]
          const orderConvert = convertOrder(order, menu)
          const expectedResult = [ { id: 1, qty: 3 }, { id: 3, qty: 5 } ]
          expect(orderConvert).to.eql(expectedResult)
        })

    })

})

describe("Order Print", function() {

    describe("Printing", function(){

        const menu = loadMenu("menu")
        const order = [ { id: 1, qty: 2 }, {id: 3, qty: 2 }, { id: 4, qty: 1 } ]

        describe("Get Quantity Total Price", function () {

          it('returns the total price of an item based on how many were ordered', function () {
            const item = menu[1]
            const expectedResult = 30
            const lineTotal = priceFor(2, item)
            expect(lineTotal).to.equal(expectedResult)
          })

        })

        describe("order line", function() {

            it("can be formatted to string", function() {
              const line = { id: 1, qty: 2 }
              expect(formatOrderLine(line, menu, 30)).to.equal("2 x Hamburgers:         30 EUR")
            })

        })

        describe("Order total", function () {

          it("computes the order subtotal", function () {
            const expectedResult = 52
            const subtotal = computeOrderTotal(order, menu)
            expect(subtotal).to.equal(expectedResult)
          })

        })

        describe("total line", function () {

          it("returns a string for the total", function () {
            const expectedStr = "Total                   52 EUR"
            const totalLine = orderTotal(52, 30)
            expect(totalLine).to.equal(expectedStr)
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
