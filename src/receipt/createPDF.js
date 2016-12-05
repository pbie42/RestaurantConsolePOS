const pdf = require('pdfkit')
const fs = require('fs')
const { roundTip } = require(process.cwd() + "/src/utils")
const { fillLogo, fillInArea, borders, totalArea } = require(process.cwd() + "/src/receipt/template")

let doc = new pdf

doc.pipe(fs.createWriteStream('receipt.pdf'))


function labels() {
  return new Promise(function(resolve, reject) {
    //Item Description Label
    doc.lineCap('butt')
      .moveTo(70, 300)
      .lineWidth(20)
      .lineTo(368, 300)
      .stroke("#b0b0b0")

    //Quantity Area
    doc.lineCap('butt')
      .moveTo(370, 300)
      .lineWidth(20)
      .lineTo(398, 300)
      .stroke("#b0b0b0")

    //Unit Price Area
    doc.lineCap('butt')
      .moveTo(400, 300)
      .lineWidth(20)
      .lineTo(458, 300)
      .stroke("#b0b0b0")

    //Line Total Label
    doc.lineCap('butt')
     .moveTo(460, 300)
     .lineWidth(20)
     .lineTo(540, 300)
     .stroke("#b0b0b0")

    //Item Description Text
    doc.text('', 170, 295)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Item Description')

    //Quantity Text
    doc.text('', 372, 295)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Qty')

    //Unit Price Text
    doc.text('', 402, 295)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Unit Price')

    //Line Total Text
    doc.text('', 472, 295)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Line Total')

    //Subtotal Text
    doc.text('', 402, 635)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Subtotal')

    //Discount Text
    doc.text('', 402, 655)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Discount')

    //Tip Text
    doc.text('', 402, 675)
        .font('fonts/Roboto-Light.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Tip')

    //Total Text
    doc.text('', 402, 695)
        .font('fonts/Roboto-Medium.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Total')

    //Thank You Text
    doc.text('', 152, 665)
        .font('fonts/Roboto-ThinItalic.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('Thank you for your business')

    doc.text('', 152, 685)
        .font('fonts/Roboto-ThinItalic.ttf')
        .fontSize(13)
        .fillColor('#000000')
        .text('and we hope to see you soon!')

    resolve()
  })
}

function printItemLine(item, line) {
  doc.text('', 72, 315 + line)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text(item.name)
  let unitPrice = (item.priceUnit / 100) + ".00"
  let lineTotal = (item.priceTotal / 100)  + ".00"
  printProperQty(385, 315, item.qty, line)
  printProper(429, 315, unitPrice, line)
  printProper(511, 315, lineTotal, line)

}

function printProper(start, position, amount, nextLine) {
  const subLen = amount.toString().length
  let move = 0
  if (subLen > 4) {
    move = subLen - 4
  }
  move = move * 5
  doc.text('', start - move, position + nextLine)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text(amount)
}

function printProperQty(start, position, amount, nextLine) {
  const subLen = amount.toString().length
  let move = 0
  if (subLen > 1) {
    move = subLen - 1
  }
  move = move * 5
  doc.text('', start - move, position + nextLine)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text(amount)
}

function printTotals(amount, nextLine) {
  const subLen = amount.toString().length
  let move = 0
  if (subLen > 4) {
    move = subLen - 4
  }
  move = move * 5
  doc.text('', 511 - move, 635 + nextLine)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text(amount)
}

function orderFill(order) {
  return new Promise(function(resolve, reject) {
    let x = 0
    const len = order.length
    const totals = order[len - 1]
    for (let i = 0; i < len - 1; i++) {
      printItemLine(order[i], x)
      x += 20
    }
    printProper(511, 635, totals.subTotal, 0)
    printProper(511, 635, "-" + totals.discount, 20)
    printProper(511, 635, totals.tip, 40)
    printProper(511, 635, totals.total + "€", 60)

    doc.end()
    resolve()
  })
}

function makeReceipt(order) {
  console.log("\nYour receipt is being made...\n")
  fillLogo(doc).then(function () {
    fillInArea(doc).then(function (x) {
      totalArea(doc, x).then(function (len) {
        borders(doc, len).then(function () {
          labels().then(function () {
            orderFill(order).then(function () {
              console.log("Your Receipt is ready!\n")
              console.log("You will find it in the current working directory")
            }).catch((error) => {
              console.log(error)
            })
          })
        })
      })
    })
  })
}

module.exports = { makeReceipt }
