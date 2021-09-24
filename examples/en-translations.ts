/* eslint-disable */
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const getTranslations = (translate: (key: string) => string) => {
  return {
    demo: {
      title: () => translate('demo.title'),
      introduction: () => translate('demo.introduction')
    },
    forms: {
      chooseCountry: () => translate('forms.chooseCountry')
    }
  };
};

export const useTranslations = () => {
  const { t: translate } = useTranslation();
  const translations = useMemo(() => getTranslations(translate), [translate]);
  return translations;
};
