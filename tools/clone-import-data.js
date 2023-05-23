#!/usr/bin/env node

const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

const sourcePrefix = process.argv[2];
const targetPrefix = process.argv[3];
const xml = fs.readFileSync(process.argv[4], "utf8");

const parser = new XMLParser();
const doc = parser.parse(xml);

const worksheets = doc.Workbook.Worksheet.slice(2);
for (const worksheet of worksheets) {
    const rows = worksheet.Table.Row;
    const node = rows[3]?.Cell?.[0]?.Data;
    if (!node) continue;
    const fields = rows[4]?.Cell?.map( cell => cell.Data );
    console.log(node, fields);

    const dataRows = rows.slice(8);
    for (const row of dataRows) {
        for (const cell of row.Cell) {
            const data = cell.Data;
            if (data.startsWith && data.startsWith(sourcePrefix)) {
                cell.Data = targetPrefix + data.substr(sourcePrefix.length);
            }
        }
    }

    //console.log(JSON.stringify(rows,null, 2));
    //process.exit(0);
}

const builder = new XMLBuilder();
const clonedXml = builder.build(doc);
console.log(clonedXml);

