const { expect } = require('chai')

const { roundUp, parseIt } = require(process.cwd() + "/src/utils")

const { tipChoices, discountChoices, checkDuplicates, prepareReceipt } = require(process.cwd() + "/src/prompt/promptUtils")

const { loadMenu } = require(process.cwd() + "/src/menu")

const { computeOrderTotal } = require(process.cwd() + "/src/order")


describe("Tip and Discount Options", function () {

  describe("Tip Choices", function () {

    it("returns an array of TIP percentages based on the order subtotal", function () {
      const menu = loadMenu("menu")
      const order = [ { id: 1, qty: 3 }, { id: 3, qty: 5 } ]
      const choices = tipChoices(order, menu)
      const expectedResult = [
        '15%: 10.50',
        '18%: 12.60',
        '20%: 14.00',
        'Other',
        'No'
      ]
      expect(choices).to.eql(expectedResult)
    })

  })

  describe("Discount Choices", function () {

    it("returns an array of DISCOUNT percentages based on the order subtotal", function () {
      const menu = loadMenu("menu")
      const order = [ { id: 1, qty: 3 }, { id: 3, qty: 5 } ]
      const choices = discountChoices(order, menu)
      const expectedResult = [
        'No',
        '5%: 3.50',
        '10%: 7.00',
        '15%: 10.50',
        'Other'
      ]
      expect(choices).to.eql(expectedResult)
    })

  })

})

describe("Search for duplicates", function () {

    it("Searches order for item duplicates and combines the quantities", function () {
      const order = [ { id: 1, qty: 2 }, {id: 3, qty: 2 }, { id: 4, qty: 1 }, { id: 1, qty: 3 } ]
      const expectedResult = [ { id: 1, qty: 5 }, {id: 3, qty: 2 }, { id: 4, qty: 1 } ]
      const combinedOrder = checkDuplicates(order)
        expect(combinedOrder).to.eql(expectedResult)
    })

})

describe("Prepare Receipt", function () {

    describe("Combine Data", function () {

        it("Puts order data into array of objects for the receipt", function () {
          const menu = loadMenu("menu")
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
            expect(receiptInfo).to.eql(expectedResult)
        })

    })

})
