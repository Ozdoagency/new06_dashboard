import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
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
          madeIn: 'Made in'
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
          madeIn: 'Зроблено в'
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
          madeIn: 'Сделано в'
        }
      }
    },
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;