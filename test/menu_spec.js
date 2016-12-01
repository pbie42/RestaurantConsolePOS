const { expect } = require('chai')

const { loadMenu, formatOrder, formatOrderLine } = require(process.cwd() + "/src/main")

describe("Menu", function() {

    it("loads from the db", function() {
        const menu = loadMenu("menu")
        expect(Object.keys(menu).length).to.equal(4)
        expect(menu).to.have.property("1")
    })

})

describe("Order", function() {

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
