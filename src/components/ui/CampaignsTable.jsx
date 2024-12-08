import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, ChevronUp, ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

// В CampaignsTable.jsx обновляем данные:

const campaignsData = [
  {
    id: 1,
    name: "Ozdo | Leadform | Video | Europe 0710",
    status: "Активно",
    clicks: "1,547",
    ctr: "3.07",
    reach: "18,103",
    result: "50 Ліди",
    actual: "11,846.50",
    leadCost: "311.75",
    qualAmount: "25",
    qualCost: "623.50"
  },
  {
    id: 2,
    name: "Ozdo | Leadform | Video | EU 2810",
    status: "Неактивно",
    clicks: "1,289",
    ctr: "2.86",
    reach: "29,708",
    result: "36 Ліди",
    actual: "13,591.20",
    leadCost: "323.60",
    qualAmount: "18",
    qualCost: "647.20"
  },
  {
    id: 3,
    name: "Ozdo | Leadform | Video | EU 1911",
    status: "Неактивно",
    clicks: "987",
    ctr: "2.76",
    reach: "21,552",
    result: "25 Ліди",
    actual: "11,199.35",
    leadCost: "386.15",
    qualAmount: "12",
    qualCost: "772.30"
  },
  {
    id: 4,
    name: "Ozdo | Leadform | Video | EU 2411 old Кампанія",
    status: "Неактивно",
    clicks: "50",
    ctr: "1.08",
    reach: "4,620",
    result: "2 Ліди",
    actual: "1,886.66",
    leadCost: "943.33",
    qualAmount: "1",
    qualCost: "1,886.66"
  },
  {
    id: 5,
    name: "Ozdo | Leadform | Video | EU 05.12",
    status: "Активно",
    clicks: "12",
    ctr: "4.86",
    reach: "247",
    result: "-",
    actual: "356.45",
    leadCost: "-",
    qualAmount: "-",
    qualCost: "-"
  }
];

// В CampaignsTable.jsx

// Обновляем объект formatters
const formatters = {
  toFixed: (value, decimals = 2) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : num.toFixed(decimals);
  },

  toLocale: (value) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : num.toLocaleString();
  },

  toCurrency: (value) => {
    if (value === null || value === undefined) return '-';  // Исправлено "или" на ||
    const num = Number(value);
    return isNaN(num) ? '-' : `₴${num.toFixed(2)}`;
  },

  number: (value) => {
    if (!value) return '-';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  percent: (value) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : `${num.toFixed(2)}%`;
  },

  currency: (value) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : `₴${num.toFixed(2)}`;
  }
};

const calculateQualPercent = (result, qualAmount) => {
  if (result === "-" || qualAmount === "-") return "-";  // Исправлено "или" на ||
  const leads = parseInt(result.split(" ")[0]);
  const quals = parseInt(qualAmount);
  if (isNaN(leads) || isNaN(quals) || leads === 0) return "-";  // Исправлено "или" на ||
  return `${((quals / leads) * 100).toFixed(1)}%`;
};

const formatNumber = (value) => {
  if (!value) return '-';
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CampaignsTable = ({ campaigns = campaignsData, currentLang }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { t, i18n } = useTranslation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    if (currentLang && i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  const onSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortedCampaigns = (campaignsToSort) => {
    if (!sortConfig.key) return campaignsToSort;

    return [...campaignsToSort].sort((a, b) => {
      // Получаем значения для сортировки
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Обработка различных типов данных
      switch (sortConfig.key) {
        case 'clicks':
        case 'reach':
          // Числа с разделителями
          aVal = parseFloat(String(aVal).replace(/[^0-9,.]/g, '').replace(',', '')) || 0;
          bVal = parseFloat(String(bVal).replace(/[^0-9,.]/g, '').replace(',', '')) || 0;
          break;
          
        case 'ctr':
        case 'actual':
        case 'leadCost':
        case 'qualCost':
          // Числа с плавающей точкой и денежные значения
          aVal = parseFloat(String(aVal).replace(/[^0-9,.]/g, '')) || 0;
          bVal = parseFloat(String(bVal).replace(/[^0-9,.]/g, '')) || 0;
          break;

        case 'result':
          // Извлекаем числа из строк типа "38 Ліди"
          aVal = parseInt(String(aVal).split(' ')[0]) || 0;
          bVal = parseInt(String(bVal).split(' ')[0]) || 0;
          break;

        case 'qualAmount':
          // Простые числовые строки
          aVal = parseInt(aVal) || 0;
          bVal = parseInt(bVal) || 0;
          break;

        default:
          // Строковые значения (name, status)
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
      }

      // Сортировка
      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // В CampaignsTable.jsx обновляем мобильную версию:

  if (isMobile) {
    return (
      <div className="w-full space-y-4">
        {getSortedCampaigns(campaigns).map((campaign, index) => (
          <div key={index} className="w-full bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-gray-100/50">
            {/* Шапка карточки */}
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-medium text-sm text-gray-900 leading-tight max-w-[70%]">
                {campaign.name}
              </h3>
              <div className={`
                shrink-0 px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1
                ${campaign.status === "Активно"
                  ? "bg-green-50 text-green-700" 
                  : "bg-red-50 text-red-700"}
              `}>
                {campaign.status === "Активно" ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 х-3" />
                )}
                {campaign.status === "Активно" ? t('table.active') : t('table.inactive')}
              </div>
            </div>

            {/* Метрики */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Клики */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.clicks')}</p>
                <p className="font-medium text-gray-900">
                  {formatters.number(campaign.clicks)}
                </p>
              </div>
              
              {/* CTR */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.ctr')}</p>
                <p className="font-medium text-gray-900">
                  {campaign.ctr ? formatters.percent(campaign.ctr) : '-'}
                </p>
              </div>
              
              {/* Результат */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.result')}</p>
                <p className="font-medium text-gray-900">{campaign.result}</p>
              </div>
              
              {/* Охват */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.reach')}</p>
                <p className="font-medium text-gray-900">{campaign.reach}</p>
              </div>
              
              {/* Витрати */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.actual')}</p>
                <p className="font-medium text-gray-900">
                  {campaign.actual ? formatters.currency(campaign.actual) : '-'}
                </p>
              </div>
              
              {/* Цена лида */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.leadCost')}</p>
                <p className="font-medium text-gray-900">{campaign.leadCost}</p>
              </div>
              
              {/* Количество квалов */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.qualAmount')}</p>
                <p className="font-medium text-gray-900">{campaign.qualAmount}</p>
              </div>
              
              {/* Цена квала */}
              <div className="bg-gray-50/50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">{t('table.qualCost')}</p>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{campaign.qualCost}</p>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-blue-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Середня ціна за один кваліфікований лід</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full"> {/* Убираем h-screen */}
      <div className="w-full"></div>
      <div className="w-full">
        <div className="bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg flex flex-col">
          {/* Убираем блок с заголовком */}
          
          {/* Контей��ер для таблицы с фиксированной максимальной высотой */}
          <div className="overflow-auto max-h-[calc(100vh-20rem)]"> {/* Настраиваемая максимальная высота */}
            <table className="w-full border-separate border-spacing-0 min-w-[1400px]">
              <thead>
                <tr>
                  <th className="sticky left-0 z-30 bg-blue-50/80 backdrop-blur-sm w-[300px] px-6 py-4 text-left">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => onSort('name')}>
                      <span className="text-sm font-semibold">{t('table.campaignName')}</span>
                      {sortConfig.key === 'name' && (
                        sortConfig.direction === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th className="sticky left-[300px] z-30 bg-blue-50/80 backdrop-blur-sm w-[150px] px-6 py-4">
                    <div className="flex items-center justify-center gap-1 cursor-pointer" onClick={() => onSort('status')}>
                      <span className="text-sm font-semibold">{t('table.status')}</span>
                      {sortConfig.key === 'status' && (
                        sortConfig.direction === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  {[
                    { key: 'clicks', label: 'table.clicks' },
                    { key: 'ctr', label: 'table.ctr' },
                    { key: 'reach', label: 'table.reach' },
                    { key: 'result', label: 'table.result' },
                    { key: 'actual', label: 'table.actual' },
                    { key: 'leadCost', label: 'table.leadCost' },
                    { key: 'qualAmount', label: 'table.qualAmount' },
                    { key: 'qualCost', label: 'table.qualCost' }
                  ].map(({ key, label }) => (
                    <th 
                      key={key}
                      className="px-6 py-4 bg-blue-50/80 backdrop-blur-sm"
                      onClick={() => onSort(key)}
                    >
                      <div className="flex items-center justify-center gap-1 cursor-pointer">
                        <span className="text-sm font-semibold">{t(label)}</span>
                        {sortConfig.key === key && (
                          sortConfig.direction === 'asc' ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {getSortedCampaigns(campaigns).map((campaign, index) => (
                  <tr
                    key={index}
                    className="hover:bg-blue-50/30 transition-colors"
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Название */}
                    <td className="sticky left-0 z-20 bg-white/95 backdrop-blur-sm px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 truncate max-w-[280px]">
                        {campaign.name}
                      </div>
                    </td>

                    {/* Статус */}
                    <td className="sticky left-[300px] z-20 bg-white/95 backdrop-blur-sm px-6 py-4">
                      <div className={`
                        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                        ${campaign.status === "Активно" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"}
                      `}>
                        {campaign.status === "Активно" ? (
                          <CheckCircle className="w-4 h-4 mr-1" />
                        ) : (
                          <XCircle className="w-4 х-4 mr-1" />
                        )}
                        {campaign.status === "Активно" ? t('table.active') : t('table.inactive')}
                      </div>
                    </td>

                    {/* Клики */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {campaign.clicks}
                    </td>

                    {/* CTR */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {`${campaign.ctr}%`}
                    </td>

                    {/* Охват */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {campaign.reach}
                    </td>

                    {/* Результат */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {campaign.result}
                    </td>

                    {/* Витрати */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {campaign.actual}
                    </td>

                    {/* Цена лида */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {campaign.leadCost}
                    </td>

                    {/* Количество квалов */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      {campaign.qualAmount}
                    </td>

                    {/* Цена квала */}
                    <td className="px-6 py-4 text-center text-sm text-gray-500">
                      <div className="flex items-center justify-center gap-2">
                        <span>{campaign.qualCost}</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-3 h-3 text-blue-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Середня ціна за один кваліфікований лід</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsTable;