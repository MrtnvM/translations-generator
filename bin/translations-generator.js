"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTranslations = void 0;
const fs = require("fs");
const generateTranslations = (translationsPath) => {
    const translationsData = fs.readFileSync(translationsPath, 'utf8');
    const translations = JSON.parse(translationsData);
    const defaultSpacing = '  ';
    const initialSpacing = defaultSpacing.repeat(2);
    const processNode = (node, pathParts) => {
        if (typeof node === 'string') {
            const spacing = initialSpacing + defaultSpacing.repeat(Math.max(0, pathParts.length - 1));
            const path = pathParts.join('.');
            const key = pathParts[pathParts.length - 1];
            const result = `${spacing}${key}: () => translate('${path}')`;
            return result;
        }
        if (typeof node === 'object') {
            const isRoot = pathParts.length === 0;
            const keys = Object.keys(node);
            const values = keys.map((key) => processNode(node[key], [...pathParts, key]));
            const spacing = initialSpacing + defaultSpacing.repeat(Math.max(0, pathParts.length - 1));
            const key = pathParts[pathParts.length - 1];
            const inners = values.join(',\r\n');
            const result = isRoot //
                ? `{\r\n${inners}\r\n${defaultSpacing}}`
                : `${spacing}${key}: {\r\n${inners}\r\n${spacing}}`;
            return result;
        }
        return '';
    };
    const generatedCode = `/* eslint-disable */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const getTranslations = (translate: (key: string) => string) => {
  return ${processNode(translations, [])};
};

export const useTranslations = () => {
  const { t: translate } = useTranslation();
  const translations = useMemo(() => getTranslations(translate), [translate]);
  return translations;
};
`;
    return generatedCode;
};
exports.generateTranslations = generateTranslations;
//# sourceMappingURL=translations-generator.js.map