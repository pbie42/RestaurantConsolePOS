const { expect } = require('chai')

const { parseIt } = require(process.cwd() + "/src/utils")

const { loadMenu, formatMenu, formatMenuLine, getMenuItems } = require(process.cwd() + "/src/menu")

const { computeOrderTotal } = require(process.cwd() + "/src/order")

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

describe("Get Items", function () {

    it("gets the current menu items", function () {
      const menu = loadMenu("menu")
      const currentItems = getMenuItems(menu)
      const expectedArr = ['Hamburger', 'Chicken Sandwich', 'French Fries', 'Pizza']
      expect(currentItems).to.eql(expectedArr)
    })

})
