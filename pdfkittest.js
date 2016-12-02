const pdf = require('pdfkit')
const fs = require('fs')

let doc = new pdf

doc.pipe(fs.createWriteStream('node.pdf'))

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

doc.lineCap('butt')
   .moveTo(70, 300)
   .lineWidth(20)
   .lineTo(540, 300)
   .stroke("#b8b8b8")

doc.lineCap('butt')
  .moveTo(70, 320)
  .lineWidth(20)
  .lineTo(540, 320)
  .stroke("#dbdbdb")

doc.lineCap('butt')
   .moveTo(70, 340)
   .lineWidth(20)
   .lineTo(540, 340)
   .stroke("#b8b8b8")

doc.end()
