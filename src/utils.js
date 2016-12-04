const fs = require("fs")

function loadJSON(fileName) {
    return fs.readFileSync(process.cwd() + "/files/" + fileName + ".json", { encoding: "utf8" })
}

const parseJSON = JSON.parse

const makeSpaces = (n) => repeatStr(" ", n)
const makeLine = (n) => repeatStr("-", n)

function repeatStr(str, n) {
    const result = []
    while (n--) { result.push(str) }
    return result.join('')
}

function pluralize(str, qty) {
    if (qty == 1) return str
    if (str.endsWith("s")) return str
    return str + "s"
}

function roundUp(num) {
  return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}

function parseIt(num) {
  return parseFloat(num).toFixed(2)
}


module.exports = { loadJSON, parseJSON, makeSpaces, makeLine, pluralize, roundUp, parseIt }
