#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const Path = require('path');
const { clearScreenDown } = require('readline');
const path = filename => Path.join(__dirname, "..", filename);
const CRLF = "\r\n";

const classifiers = readFileSync(path("classifiers.txt"), "utf-8").split(/[\r\n]+/);

console.log(classifiers);

const headers = [ 'MIGRATION_SRC(k/*),CLASSIFIER(*)' ];
const texts = [ 'MIGRATION_SRC(k/*),LANGUAGE(k/*),CLASS_TEXT(*)' ];
const r = (...args) => args.join(",");

for (const classifier of classifiers) {
    headers.push(r(classifier, classifier));
    const [_, scope, name] = classifier.match(/^S(\d).*?\s+(.*)/) || [];
    const classifierText = scope ? `${name} - GHG Scope ${scope}` : `${name} - GHG`;
    texts.push(r(classifier, "EN", classifierText));
}

writeFileSync(path("classifiers/S_HEADER#FreeText.csv"), headers.join(CRLF));
writeFileSync(path("classifiers/S_TEXT#FreeText.csv"), texts.join(CRLF));