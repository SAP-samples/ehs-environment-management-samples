#!/usr/bin/env node

const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

const sourcePrefix = process.argv[2];
const targetPrefix = process.argv[3];
const xml = fs.readFileSync(process.argv[4], "utf8");

const options = {
    ignoreAttributes: false,
    attributeNamePrefix : "@_",
    format: true,
    attributeValueProcessor: (name, val, jPath) => {
        return val;
    },
    //suppressEmptyNode: true,
    parseTagValue: false,
    //trimValues: false
/*    tagValueProcessor: (tagName, tagValue, jPath, hasAttributes, isLeafNode) => {
        console.log(tagValue);
        return tagValue;
     },*/

};

const parser = new XMLParser(options);
const doc = parser.parse(xml);

const worksheets = doc.Workbook.Worksheet.slice(2);
for (const worksheet of worksheets) {
    const rows = worksheet.Table.Row;
    const node = rows[3]?.Cell?.[0]?.Data?.['#text'];
    if (!node) continue;
    const fields = rows[4]?.Cell?.map( cell => cell.Data?.['#text'] );
    //console.log(node, fields);

    const dataRows = rows.slice(8);
    for (const row of dataRows) {
        for (const cell of row.Cell) {
            const data = cell.Data?.['#text'];
            if (data.startsWith && data.startsWith(sourcePrefix)) {
                cell.Data['#text'] = targetPrefix + data.substr(sourcePrefix.length);
            }
        }
    }

    //console.log(JSON.stringify(rows,null, 2));
    //process.exit(0);
}

const builder = new XMLBuilder(options);
const clonedXml = builder.build(doc);
debugger;
const cleanXml = clonedXml.replace(/&amp;#/gi, '&#').replace(/&apos;/gi, "'").replace(/\n/gi, "\r\n");
console.log(cleanXml);
