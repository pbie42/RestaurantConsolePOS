const pdf = require('pdfkit')
const fs = require('fs')
const { roundTip } = require(process.cwd() + "/src/utils.js")

let doc = new pdf

doc.pipe(fs.createWriteStream('receipt.pdf'))

function fillLogo() {
  return new Promise(function(resolve, reject) {
    doc.font('fonts/Ewert-Regular.ttf', 10)
         .fontSize(30)
         .text('The Old Pittsburgh',{
           align: 'center'
         })


    doc.image('images/Locomotive_Drawing_from_1894.PNG', 175, 105, {
      scale: 0.18
    })


    doc.moveDown()
    doc.moveDown()
    doc.moveDown()


    doc.font('fonts/Rye-Regular.ttf', 0, 200)
         .fontSize(20)
         .text('A Family Style Restaurant',{
           align: 'center'
         })

    doc.moveUp()
    doc.text('_______________________________________________________')

    doc.text('', 252, 265, {
          align: 'center'
        })
        .font('fonts/Roboto-Medium.ttf')
        .fontSize(20)
        .fillColor('#000000')
        .text('Your Order')
    resolve()
  });
}

function fillInArea() {
  return new Promise(function(resolve, reject) {
    let i = 0
    let x = 0

    while (i <= 7) {
      //Item Description Area
      doc.lineCap('butt')
        .moveTo(70, 322 + x)
        .lineWidth(20)
        .lineTo(368, 322 + x)
        .stroke("#FFFFFF")

      doc.lineCap('butt')
        .moveTo(70, 340 + x)
        .lineWidth(20)
        .lineTo(368, 340 + x)
        .stroke("#EAEAEA")

      //Quantity Area
      doc.lineCap('butt')
        .moveTo(370, 322 + x)
        .lineWidth(20)
        .lineTo(398, 322 + x)
        .stroke("#FFFFFF")

      doc.lineCap('butt')
       .moveTo(370, 340 + x)
       .lineWidth(20)
       .lineTo(398, 340 + x)
       .stroke("#EAEAEA")

      //Unit Price Area
      doc.lineCap('butt')
        .moveTo(400, 322 + x)
        .lineWidth(20)
        .lineTo(458, 322 + x)
        .stroke("#FFFFFF")

      doc.lineCap('butt')
       .moveTo(400, 340 + x)
       .lineWidth(20)
       .lineTo(458, 340 + x)
       .stroke("#EAEAEA")

      //Line Total Area
      doc.lineCap('butt')
        .moveTo(460, 322 + x)
        .lineWidth(20)
        .lineTo(540, 322 + x)
        .stroke("#FFFFFF")

      doc.lineCap('butt')
       .moveTo(460, 340 + x)
       .lineWidth(20)
       .lineTo(540, 340 + x)
       .stroke("#EAEAEA")

       x += 40
       i++
    }
    resolve(x)
  });
}

function totalArea(x) {
  return new Promise(function(resolve, reject) {
    console.log(x);
    const j = 322 + x
    const y = 340 + x
    let k = 0
    x = 0

    while (k < 2) {
      //Line Total Area
      doc.lineCap('butt')
        .moveTo(460, j + x)
        .lineWidth(20)
        .lineTo(540, j + x)
        .stroke("#FFFFFF")

      doc.lineCap('butt')
       .moveTo(460, y + x)
       .lineWidth(20)
       .lineTo(540, y + x)
       .stroke("#EAEAEA")
       x += 40
       k++
    }
    doc.lineCap('butt')
     .moveTo(70, y + x)
     .lineWidth(5)
     .lineTo(540, y + x)
     .stroke("#EAEAEA")

    resolve(j + x - 12)
  });
}

function borders(len) {
  return new Promise(function(resolve, reject) {
    //Top Border
    doc.lineCap('butt')
       .moveTo(70, 289)
       .lineWidth(2)
       .lineTo(540, 289)
       .stroke("#000000")

    //Left Border
    doc.lineCap('butt')
       .moveTo(69, 288)
       .lineWidth(2)
       .lineTo(69, 631)
       .stroke("#000000")

    //Right Border
    doc.lineCap('butt')
       .moveTo(541, 288)
       .lineWidth(2)
       .lineTo(541, len + 1)
       .stroke("#000000")

    //Quantity Start Line
    doc.lineCap('butt')
       .moveTo(369, 288)
       .lineWidth(2)
       .lineTo(369, 630)
       .stroke("#000000")

    //Unit Price Start Line
    doc.lineCap('butt')
       .moveTo(399, 288)
       .lineWidth(2)
       .lineTo(399, 630)
       .stroke("#000000")

    //Line Total Start Line
    doc.lineCap('butt')
       .moveTo(459, 288)
       .lineWidth(2)
       .lineTo(459, len + 1)
       .stroke("#000000")

    //Order Beginning Line
    doc.lineCap('butt')
       .moveTo(70, 311)
       .lineWidth(2)
       .lineTo(540, 311)
       .stroke("#000000")

   //Order End Line
   doc.lineCap('butt')
      .moveTo(70, 630)
      .lineWidth(2)
      .lineTo(540, 630)
      .stroke("#000000")

    //Total End Line
    doc.lineCap('butt')
     .moveTo(460, len)
     .lineWidth(2)
     .lineTo(540, len)
     .stroke("#000000")

      resolve()
    });
}

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
  });
}

function printItemLine(item, line) {
  doc.text('', 72, 315 + line)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text(item.name)

  doc.text('', 371, 315 + line)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text(item.qty)

  doc.text('', 402, 315 + line)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text((item.priceUnit / 100) + ".00")

  doc.text('', 461, 315 + line)
      .font('fonts/Roboto-Light.ttf')
      .fontSize(10)
      .fillColor('#000000')
      .text((item.priceTotal / 100)  + ".00")

}

function printToSize(amount, nextLine) {
  console.log("amount is " + amount);
  const subLen = amount.toString().length
  let move = 0
  console.log("sublen is " + subLen);
  if (subLen > 4) {
    move = subLen - 4
  }
  move = move * 5
  console.log(move);
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
    console.log(len);
    for (let i = 0; i < len - 1; i++) {
      printItemLine(order[i], x)
      x += 20
    }
    printToSize(totals.subTotal, 0)
    printToSize(totals.discount, 20)
    printToSize(totals.tip, 40)
    printToSize(totals.total, 60)

    doc.end()
    resolve()
  });
}

function makeReceipt(order) {
  fillLogo().then(function () {
    fillInArea().then(function (x) {
      totalArea(x).then(function (len) {
        borders(len).then(function () {
          labels().then(function () {
            orderFill(order).then(function () {
              console.log("Your Receipt is ready!");
            }).catch((error) => {
              console.log(error);
            })
          })
        })
      })
    })
  })
}

//TODO Decide to add a discount option or not
//TODO Align totals to the Right
//TODO Fix tips to not go past two decimal places
//TODO Need to add euro sign and extra .00 if necessary
//TODO Decide whether to allow splitting or not
//TODO Error Test Everything!!!!!
//TODO Handle duplicates

module.exports = { makeReceipt }
