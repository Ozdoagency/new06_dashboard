import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      title: 'Metrics Dashboard',
      average: 'Average',
      metrics: {
        leads: 'Tech Leads',
        leadCost: 'Lead Cost',
        cr: 'CR %',
        actual: 'Budget',
        qualified: 'Qualified',
        qualCost: 'Qual Cost'
      },
      min: 'min',
      max: 'max',
      madeIn: 'Made in',
      table: {
        campaignName: 'Campaign Name',
        status: 'Status',
        result: 'Result',
        reach: 'Reach',
        leadCost: 'Lead Cost',
        qualAmount: 'Qual Amount',
        qualCost: 'Qual Cost',
        active: 'Active',
        inactive: 'Inactive',
        leads: 'Leads'
      }
    }
  },
  ua: {
    translation: {
      title: 'Панель метрик',
      average: 'Середнє',
      metrics: {
        leads: 'Тех ліди',
        leadCost: 'Вартість ліда',
        cr: 'CR %',
        actual: 'Бюджет',
        qualified: 'Кількість квалів',
        qualCost: 'Ціна квала'
      },
      min: 'мін',
      max: 'макс',
      madeIn: 'Зроблено в',
      table: {
        campaignName: 'Назва кампанії',
        status: 'Статус',
        result: 'Результат',
        reach: 'Охоплення',
        leadCost: 'Ціна ліда',
        qualAmount: 'Кількість квалу',
        qualCost: 'Ціна квалу',
        active: 'Активно',
        inactive: 'Неактивно',
        leads: 'Ліди'
      }
    }
  },
  ru: {
    translation: {
      title: 'Панель метрик',
      average: 'Среднее',
      metrics: {
        leads: 'Тех лиды',
        leadCost: 'Стоимость лида',
        cr: 'CR %',
        actual: 'Бюджет',
        qualified: 'Количество квалов',
        qualCost: 'Цена квала'
      },
      min: 'мин',
      max: 'макс',
      madeIn: 'Сделано в',
      table: {
        campaignName: 'Название кампании',
        status: 'Статус',
        result: 'Результат',
        reach: 'Охват',
        leadCost: 'Цена лида',
        qualAmount: 'Количество квалов',
        qualCost: 'Цена квала',
        active: 'Активно',
        inactive: 'Неактивно',
        leads: 'Лиды'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'ua',
    lng: 'ua', // Добавляем явное указание языка по умолчанию
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false // Отключаем Suspense
    }
  });

export default i18n;