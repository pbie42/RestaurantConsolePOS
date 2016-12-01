const prompt = require('prompt');

const { loadMenu, formatOrderLine } = require(process.cwd() + "/src/main")

let x = 0,
    arr = []


let schema = {
  properties: {
    Item: {
      pattern: /^[a-zA-Z\s\-]+$/,
      message: 'Item can only contain letters, spaces, or dashes',
      required: true
    },
    Amount: {
      pattern: /^\d+$/,
      message: 'Amount can only be a number',
      required: true
    }
  }
}


function getOrder() {
  prompt.get(schema, function (err, result) {
    if (result.Item.toLowerCase() == 'done') {
      orderEntered()
    } else {
      let order = {
        item: result.Item,
        amount: result.Amount
      }
      arr.push(order)
      getOrder()
    }
  });
}

function todaysMenu() {
  console.log('\n');
  console.log("When your order is ready:\n")
  console.log("Please enter the item in the item prompt");
  console.log("Please enter the amount in the amount prompt\n");
  console.log("when your order is finished:\n");
  console.log("Enter 'Done' in the item prompt");
  console.log("Enter 0 in the amount prompt\n");
}

function orderEntered() {
  console.log(arr)
}


let menu = loadMenu("menu")

console.log(menu[1]);

function printMenu(menu) {
  console.log("\n");
  console.log("Welcome to The Little Belt Restaurant!");
  console.log("Today's Menu consists of:\n");
  for ( let key in menu ) {
    let price = menu[key].price
    console.log(menu[key].name + " " + price.amount / 100 + " " + price.currency);
  }
}

printMenu(menu)
todaysMenu()
prompt.start()
getOrder()


module.exports = { }
