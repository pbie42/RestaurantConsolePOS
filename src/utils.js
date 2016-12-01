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


module.exports = { loadJSON, parseJSON, makeSpaces, makeLine, pluralize }
