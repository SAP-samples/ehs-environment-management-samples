const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

eval(fs.readFileSync('./tools/DataMigrationUtil.js', 'utf-8'));

const config = fs.readFileSync("./greenhouse-gas-management/Example Config.xml", "utf-8");
console.log(JSON.stringify(readExcelSimple(config), null, 2));