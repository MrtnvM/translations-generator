#!/usr/bin/env node

import * as chalk from 'chalk';
import * as yargs from 'yargs';
import * as fs from 'fs';

import { generateTranslations } from './translations-generator';
import boxen = require('boxen');

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
  })
  .option('w', {
    alias: 'watch',
    describe: 'Watch changes in JSON file',
    type: 'string',
    demandOption: false
  }).argv;

const translationsPath = options['translations'];
const resultCodePath = options['result'];

const generateTranslationsFile = (watchMode: boolean = false) => {
  try {
    const code = generateTranslations(translationsPath);
    fs.writeFileSync(resultCodePath, code);

    const time = watchMode ? `[${new Date().toLocaleTimeString()}] ` : '';
    console.log(`✅ ${time}Translations successfully generated`);
  } catch (error) {
    console.error('❌ ERROR: ', chalk.red(error));
  }
};

if (options['watch'] !== undefined) {
  const greeting = boxen(chalk.bold(` 🛠  Translations generator started in watch mode... `));
  console.log(greeting + '\n');

  generateTranslationsFile(true);

  fs.watchFile(translationsPath, () => generateTranslationsFile(true));
} else {
  generateTranslationsFile();
}
