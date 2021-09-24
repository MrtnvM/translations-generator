#!/usr/bin/env node

import * as chalk from 'chalk';
import * as yargs from 'yargs';
import * as fs from 'fs';

import { generateTranslations } from './translations-generator';

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

  const code = generateTranslations(translationsPath);

  if (fs.existsSync(resultCodePath)) {
    fs.unlinkSync(resultCodePath);
  }

  fs.writeFileSync(resultCodePath, code);

  console.log('✅ Translations successfully generated');
} catch (error) {
  console.error('❌ ERROR: ', chalk.red(error));
}
