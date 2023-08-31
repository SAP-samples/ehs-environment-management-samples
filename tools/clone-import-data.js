#!/usr/bin/env node

const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

function excelApi() {
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

    return {
        readExcel: function(file) {
            const xml = fs.readFileSync(file, "utf8");
            const parser = new XMLParser(options);
            return parser.parse(xml);
        },

        renderExcel: function(excel) {
            const builder = new XMLBuilder(options);
            const clonedXml = builder.build(excel);
            const cleanXml = clonedXml.replace(/&amp;#/gi, '&#').replace(/&apos;/gi, "'").replace(/\n/gi, "\r\n");
            return cleanXml;
        }
    }
}

const {readExcel, renderExcel} = excelApi();


function isDataRow(row) {
    return row.Cell?.find( cell => cell.Data?.['#text']?.startsWith?.(sourcePrefix) );
}

function readExcelTab(file) {
    const excel = readExcel(file);
    const rows = excel.Workbook.Worksheet.Table.Row;
    const tab = [];
    for (const row of rows) {
        const text = row?.Cell?.Data?.['#text'] || row?.Cell?.[0]?.Data?.['#text'];
        if (text) tab.push(text);
    }

    return tab;
}

const sourcePrefix = process.argv[2];
const targetPrefixes = [];
if (process.argv[3].match(/\.xml$/)) {
    targetPrefixes.push(...readExcelTab(process.argv[3]));
} else {
    targetPrefixes.push(...process.argv[3].split(/,/));
}

const doc = readExcel(process.argv[4]);
const worksheets = doc.Workbook.Worksheet.slice(2);
for (const worksheet of worksheets) {
    const rows = worksheet.Table.Row;
    const node = rows[3]?.Cell?.[0]?.Data?.['#text'];
    if (!node) continue;
    const fields = rows[4]?.Cell?.map( cell => cell.Data?.['#text'] );
    //console.log(node, fields);

    const headerRows = rows.slice(0, 8);
    const dataRows = rows.slice(8).filter( row => isDataRow( row ) );

    if (dataRows.length === 0) continue;

    worksheet.Table.Row = headerRows;

    for (const targetPrefix of targetPrefixes) {
        for (const row of dataRows) {
            const clonedRow = JSON.parse(JSON.stringify(row));

            for (const cell of clonedRow.Cell) {
                const data = cell.Data?.['#text'];
                if (data.startsWith && data.startsWith(sourcePrefix)) {
                    cell.Data['#text'] = targetPrefix + data.substr(sourcePrefix.length);
                }
            }

            worksheet.Table.Row.push(clonedRow);
        }
    }

    worksheet.Table['@_ss:ExpandedRowCount'] = worksheet.Table.Row.length;

    //console.log(JSON.stringify(rows,null, 2));
    //process.exit(0);
}

const cleanXml = renderExcel(doc);
console.log(cleanXml);
