const options = {
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
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

function readExcel(xml) {
  const parser = new XMLParser(options);
  return parser.parse(xml);
}

function renderExcel(excel) {
  const builder = new XMLBuilder(options);
  const clonedXml = builder.build(excel);
  const cleanXml = clonedXml
    .replace(/&amp;#/gi, "&#")
    .replace(/&apos;/gi, "'")
    .replace(/\n/gi, "\r\n");
  return cleanXml;
}

function isDataRow(row) {
  return row.Cell?.find((cell) =>
    cell.Data?.["#text"]?.startsWith?.(sourcePrefix)
  );
}

function first(o) {
  if (Array.isArray(o)) {
    return o[0];
  } else {
    return o;
  }
}

function readExcelTab(file) {
  const excel = readExcel(file);
  const rows = first(excel.Workbook.Worksheet).Table.Row;
  const tab = [];
  for (const row of rows) {
    const text = row?.Cell?.Data?.["#text"] || row?.Cell?.[0]?.Data?.["#text"];
    if (text) tab.push(text);
  }

  return tab;
}

function createMigrationFile(template, targetPrefixes) {
  const doc = readExcel(template);
  const worksheets = doc.Workbook.Worksheet.slice(2);
  for (const worksheet of worksheets) {
    const rows = worksheet.Table.Row;
    const node = rows[3]?.Cell?.[0]?.Data?.["#text"];
    if (!node) continue;
    const fields = rows[4]?.Cell?.map((cell) => cell.Data?.["#text"]);
    //console.log(node, fields);

    const headerRows = rows.slice(0, 8);
    const dataRows = rows.slice(8).filter((row) => isDataRow(row));

    if (dataRows.length === 0) continue;

    worksheet.Table.Row = headerRows;

    for (const targetPrefix of targetPrefixes) {
      for (const row of dataRows) {
        const clonedRow = JSON.parse(JSON.stringify(row));

        for (const cell of clonedRow.Cell) {
          const data = cell.Data?.["#text"];
          if (data.startsWith && data.startsWith(sourcePrefix)) {
            cell.Data["#text"] =
              targetPrefix + data.substr(sourcePrefix.length);
          }
        }

        worksheet.Table.Row.push(clonedRow);
      }
    }

    worksheet.Table["@_ss:ExpandedRowCount"] = worksheet.Table.Row.length;

    //console.log(JSON.stringify(rows,null, 2));
    //process.exit(0);
  }
}
