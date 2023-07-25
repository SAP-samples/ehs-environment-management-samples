#!/usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const Path = require('path');
const { clearScreenDown } = require('readline');
const path = filename => Path.join(__dirname, "..", filename);
const CRLF = "\r\n";

const classifiers = readFileSync(path("classifiers.txt"), "utf-8").split(/[\r\n]+/);

const headers = [ 'MIGRATION_SRC(k/*),CLASSIFIER(*)' ];
const texts = [ 'MIGRATION_SRC(k/*),LANGUAGE(k/*),CLASS_TEXT(*)' ];
const r = (...args) => args.join(",");

function mkText(classifier) {
    const [_, scope, category, name] = classifier.match(/^S(\d)(\.\d+)?.*?\s+(.*)/) || [];
    if (!scope) {
        return `GHG ${classifier}`;
    } else if (scope === '3' && category) {
        return `GHG Scope 3${category} - ${name}`;
    } else {
        return `GHG Scope ${scope} - ${name}`;
    }
}

for (const entry of classifiers) {
    let [classifier, classifierText] = entry.split(/,/);

    if (classifier.length>30) throw new Error(`Data classifier ${classifier} is too long`);

    headers.push(r(classifier, classifier));

    if (!classifierText) classifierText = mkText(classifier);
    console.log(classifierText);
    texts.push(r(classifier, "EN", classifierText));
}

writeFileSync(path("classifiers/S_HEADER#FreeText.csv"), headers.join(CRLF));
writeFileSync(path("classifiers/S_TEXT#FreeText.csv"), texts.join(CRLF));