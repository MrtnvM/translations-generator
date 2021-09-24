#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const translations_generator_1 = require("./translations-generator");
const options = yargs
    .usage('Usage: -f <translations file path>')
    .option('f', {
    alias: 'translations',
    describe: 'Translations file path',
    type: 'string',
    demandOption: true
})
    .option('r', {
    alias: 'result',
    describe: 'Generated TS code file path',
    type: 'string',
    demandOption: true
}).argv;
try {
    const translationsPath = options['translations'];
    const resultCodePath = options['result'];
    const code = (0, translations_generator_1.generateTranslations)(translationsPath);
    if (fs.existsSync(resultCodePath)) {
        fs.unlinkSync(resultCodePath);
    }
    fs.writeFileSync(resultCodePath, code);
    console.log('✅ Translations successfully generated');
}
catch (error) {
    console.error('❌ ERROR: ', chalk.red(error));
}
//# sourceMappingURL=index.js.map