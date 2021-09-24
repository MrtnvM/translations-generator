"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTranslations = void 0;
const fs = require("fs");
const generateTranslations = (translationsPath) => {
    const translationsData = fs.readFileSync(translationsPath, 'utf8');
    const translations = JSON.parse(translationsData);
    console.log(translations);
};
exports.generateTranslations = generateTranslations;
//# sourceMappingURL=translations-genetator.js.map