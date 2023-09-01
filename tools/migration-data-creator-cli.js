const fs = require('fs');
const { readExcelSimple, renderExcel, createMigrationFile } = require('./DataMigrationUtil.js')

const config = fs.readFileSync("./greenhouse-gas-management/Example Config.xml", "utf-8");
console.log(JSON.stringify(readExcelSimple(config), null, 2));

const templateXml = fs.readFileSync('./greenhouse-gas-management/templates/Compliance Scenarios.xml');
const migrationDoc = createMigrationFile(templateXml, 'FACILITIES_HEATING', [ 'BOSTON' ]);

fs.writeFileSync("test-output.xml",renderExcel(migrationDoc))