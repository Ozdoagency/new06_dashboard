import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from "lucide-react";

// Утилиты форматирования
const formatters = {
  // Для чисел с фиксированной точностью
  toFixed: (value, decimals = 2) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : num.toFixed(decimals);
  },

  // Для чисел с разделителями
  toLocale: (value) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : num.toLocaleString();
  },

  // Для денежных значений
  toCurrency: (value) => {
    if (value === null || value === undefined) return '-';
    const num = Number(value);
    return isNaN(num) ? '-' : `₴${num.toFixed(2)}`;
  }
};

const AdsTable = () => {
  const [selectedAd, setSelectedAd] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [screenSize, setScreenSize] = useState('desktop');

  const statusFilters = ['all', 'Активно', 'Неактивно'];

  const adsData = [
    {
      id: 1,
      name: 'Ozdo | Story | Video | Europe 0710',
      type: 'відео',
      preview: 'https://placehold.co/400x400/webp?text=Story',
      reach: 50432,
      clicks: 1547,
      ctr: 3.07,
      result: '38 Ліди',
      costs: 11846.50, // Добавляем поле costs
      costPerLead: 311.75,
      qualAmount: '25',
      costPerQualifiedLead: 623.50,
      status: 'Активно',
      format: 'Story',
      platform: 'Facebook'
    },
    {
      id: 2,
      name: 'Ozdo | Reel | Video | EU 2810',
      type: 'відео',
      preview: 'https://placehold.co/400x400/webp?text=Reel',
      reach: 45123,
      clicks: 1289,
      ctr: 2.86,
      result: '42 Ліди',
      costs: 13591.20,
      costPerLead: 323.60,
      qualAmount: '18',
      costPerQualifiedLead: 647.20,
      status: 'Неактивно',
      format: 'Reel',
      platform: 'Instagram'
    },
    {
      id: 3,
      name: 'Ozdo | Feed | Image | EU 1911',
      type: 'зображення',
      preview: 'https://placehold.co/400x400/webp?text=Feed',
      reach: 35789,
      clicks: 987,
      ctr: 2.76,
      result: '29 Ліди',
      costs: 11199.35,
      costPerLead: 386.15,
      qualAmount: '12',
      costPerQualifiedLead: 772.30,
      status: 'Активно',
      format: 'Feed',
      platform: 'Facebook'
    }
  ];

  // Обновленная функция безопасного форматирования
  const safeNumberFormat = (value, decimals = 2) => {
    // Если значение null, undefined или пустая строка
    if (value === null || value === undefined || value === '') return '-';
    
    // Преобразуем строку в число, убирая запятые и пробелы
    const number = typeof value === 'string' 
      ? parseFloat(value.replace(/[,\s]/g, '')) 
      : parseFloat(value);

    // Проверяем результат на NaN
    if (isNaN(number)) return '-';
    
    try {
      return number.toFixed(decimals);
    } catch (error) {
      console.error('Ошибка форматирования числа:', error);
      return '-';
    }
  };

  // Безопасная функция для форматирования с разделителями
  const safeLocaleString = (value) => {
    // Если значение null, undefined или пустая строка
    if (value === null || value === undefined || value === '') return '-';
    
    // Преобразуем строку в число, убирая запятые и пробелы
    const number = typeof value === 'string' 
      ? parseFloat(value.replace(/[,\s]/g, '')) 
      : parseFloat(value);

    // Проверяем результат на NaN
    if (isNaN(number)) return '-';
    
    try {
      return number.toLocaleString();
    } catch (error) {
      return String(number);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize('mobile');
      } else if (width < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Активно':
        return 'bg-green-50 text-green-700';
      case 'Неактивно':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  const filteredAds = activeFilter === 'all' 
    ? adsData 
    : adsData.filter(ad => ad.status.toLowerCase() === activeFilter);

  // Исправленная мобильная версия AdsTable.jsx:

if (screenSize === 'mobile') {
  return (
    <div className="w-full">
      {/* Фильтры */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {statusFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all duration-300
              ${activeFilter === filter 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {filter === 'all' ? 'Всі креативи' : filter}
          </button>
        ))}
      </div>

      {/* Превью баннеров */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {filteredAds.map((ad) => (
          <div 
            key={ad.id} 
            className="relative flex flex-col bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden"
          >
            <div className="aspect-square rounded-t-xl overflow-hidden">
              <img
                src={ad.preview}
                alt={ad.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-2.5 space-y-1.5">
              {/* Название */}
              <p className="text-[13px] leading-tight font-medium text-gray-900 line-clamp-2">
                {ad.name}
              </p>
              
              {/* Платформа и статус */}
              <div className="flex items-center justify-between gap-1">
                <span className="text-[11px] text-gray-600">{ad.platform}</span>
                <div className={`
                  inline-flex items-center px-1.5 py-0.5 rounded-full text-[11px] font-medium gap-0.5
                  ${ad.status === "Активно" 
                    ? "bg-green-50 text-green-700" 
                    : "bg-red-50 text-red-700"}
                `}>
                  {ad.status === "Активно" ? (
                    <CheckCircle className="w-2.5 h-2.5" />
                  ) : (
                    <XCircle className="w-2.5 h-2.5" />
                  )}
                  {ad.status}
                </div>
              </div>

              {/* Метрики */}
              <div className="grid grid-cols-2 gap-1.5">
                <div className="text-[11px]">
                  <span className="text-gray-500">Кліків: </span>
                  <span className="font-medium text-gray-900">{formatters.toLocale(ad.clicks)}</span>
                </div>
                <div className="text-[11px]">
                  <span className="text-gray-500">CTR: </span>
                  <span className="font-medium text-gray-900">{formatters.toFixed(ad.ctr)}%</span>
                </div>
              </div>

              {/* Кнопка */}
              <button
                onClick={() => setSelectedAd(ad)}
                className="w-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 
                  text-blue-600 text-xs font-medium py-1.5 px-3 rounded-lg 
                  transition-colors flex items-center justify-center gap-1.5
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              >
                Подивитись
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedAd && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedAd(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-[90%] shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Шапка */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium">{selectedAd.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium gap-1
                      ${selectedAd.status === "Активно" 
                        ? "bg-green-50 text-green-700" 
                        : "bg-red-50 text-red-700"}
                    `}>
                      {selectedAd.status === "Активно" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 х-3" />
                      )}
                      {selectedAd.status}
                    </div>
                    <span className="text-xs text-gray-500">
                      {selectedAd.format} • {selectedAd.platform}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAd(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Контент */}
            <div className="p-4 space-y-4">
              {/* Превью */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <img 
                  src={selectedAd.preview}
                  alt={selectedAd.name}
                  className="w-full aspect-square object-cover rounded-lg"
                />
              </div>

              {/* Метрики */}
              <div className="grid grid-cols-2 gap-3">
                <MetricCard label="Кліків" value={formatters.toLocale(selectedAd.clicks)} />
                <MetricCard label="CTR" value={`${formatters.toFixed(selectedAd.ctr)}%`} />
                <MetricCard label="Охоплення" value={formatters.toLocale(selectedAd.reach)} />
                <MetricCard label="Результат" value={selectedAd.result} />
                <MetricCard label="Витрати" value={formatters.toCurrency(selectedAd.costs)} />
                <MetricCard label="Ціна ліда" value={formatters.toCurrency(selectedAd.costPerLead)} />
                <MetricCard label="Кількість квалу" value={selectedAd.qualAmount} />
                <MetricCard label="Ціна квалу" value={formatters.toCurrency(selectedAd.costPerQualifiedLead)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

  // Десктопная версия остается без изменений
  return (
    <div className="w-full">
      {/* Фильтры */}
      <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {statusFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300
              ${activeFilter === filter 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {filter === 'all' ? 'Всі креативи' : filter}
          </button>
        ))}
      </div>

      {/* Обертка дл�� таблицы с исправленным скроллом */}
      <div className="w-full overflow-hidden">
        <div className="w-full overflow-x-auto touch-pan-x">
          <div className="min-w-[1400px]"> {/* Минимальная ширина для скролла */}
            <div className="bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg">
              <table className="w-full border-separate border-spacing-0 min-w-[1400px]">
                <thead>
                  <tr>
                    <th className="sticky left-0 z-30 bg-blue-50/80 backdrop-blur-sm w-[300px] px-6 py-4 text-left">
                      <span className="text-sm font-semibold">Креатив</span>
                    </th>
                    <th className="sticky left-[300px] z-30 bg-blue-50/80 backdrop-blur-sm w-[150px] px-6 py-4">
                      <span className="text-sm font-semibold">Статус</span>
                    </th>
                    {[
                      { key: 'clicks', label: 'Кліків' },
                      { key: 'ctr', label: 'CTR (%)' },
                      { key: 'reach', label: 'Охоплення' },
                      { key: 'result', label: 'Результат' },
                      { key: 'costs', label: 'Витрати' },
                      { key: 'costPerLead', label: 'Ціна ліда' },
                      { key: 'qualAmount', label: 'Кiлькість квалу' },
                      { key: 'costPerQualifiedLead', label: 'Ціна квалу' }
                    ].map(({ key, label }) => (
                      <th 
                        key={key}
                        className="px-6 py-4 bg-blue-50/80 backdrop-blur-sm text-center"
                      >
                        <span className="text-sm font-semibold">{label}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAds.map((ad) => (
                    <tr
                      key={ad.id}
                      onClick={() => setSelectedAd(ad)}
                      className="hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="sticky left-0 z-20 bg-white/95 backdrop-blur-sm px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={ad.preview}
                            alt={ad.name}
                            className="h-16 w-16 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{ad.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="sticky left-[300px] z-20 bg-white/95 backdrop-blur-sm px-6 py-4">
                        <div className={`
                          inline-flex items-center px-3 py-1 rounded-full text-sm font-medium gap-1
                          ${ad.status === "Активно" 
                            ? "bg-green-100 text-green-800" // Обновленные цвета
                            : "bg-red-100 text-red-800"}
                        `}>
                          {ad.status === "Активно" ? (
                            <CheckCircle className="w-4 h-4 mr-1" /> // Увеличенный размер иконок
                          ) : (
                            <XCircle className="w-4 h-4 mr-1" />
                          )}
                          {ad.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {safeLocaleString(ad.clicks)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {ad.ctr ? `${safeNumberFormat(ad.ctr)}%` : '-'}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {safeLocaleString(ad.reach)}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {ad.result || '-'}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {ad.costs ? `₴${safeNumberFormat(ad.costs)}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {ad.costPerLead ? `₴${safeNumberFormat(ad.costPerLead)}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {ad.qualAmount || '-'}
                      </td>
                      <td className="px-6 py-4 text-center text-sm text-gray-500">
                        {ad.costPerQualifiedLead ? `₴${safeNumberFormat(ad.costPerQualifiedLead)}` : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAd && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedAd(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl my-8"
            onClick={e => e.stopPropagation()}
          >
            {/* Шапка */}
            <div className="sticky top-0 bg-white p-6 border-b border-gray-100 з-10">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium">{selectedAd.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium gap-1
                      ${selectedAd.status === "Активно" 
                        ? "bg-green-50 text-green-700" 
                        : "bg-red-50 text-red-700"}
                    `}>
                      {selectedAd.status === "Активно" ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <XCircle className="w-3 h-3" />
                      )}
                      {selectedAd.status}
                    </div>
                    <span className="text-sm text-gray-500">
                      {selectedAd.format} • {selectedAd.platform}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAd(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 111.414 1.414L11.414 10l4.293 4.293a1 1 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707а1 1 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Контент */}
            <div className="p-6 space-y-6">
              {/* Превью */}
              <div className="flex flex-col md:flex-row gap-6 justify-center bg-gray-50 п-4 md:p-6 rounded-xl">
                <div className="preview-container">
                  <div className="w-full md:w-48 aspect-square bg-white rounded-xl shadow-lg overflow-hidden">
                    <img 
                      src={selectedAd.preview}
                      alt={selectedAd.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Метрики */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">Кліків</div>
                  <div className="text-lg font-semibold">{formatters.toLocale(selectedAd.clicks)}</div>
                </div>
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">CTR</div>
                  <div className="text-lg font-semibold">{formatters.toFixed(selectedAd.ctr)}%</div>
                </div>
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">Охоплення</div>
                  <div className="text-lg font-semibold">{formatters.toLocale(selectedAd.reach)}</div>
                </div>
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">Результат</div>
                  <div className="text-lg font-semibold">{selectedAd.result}</div>
                </div>
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">Ціна ліда</div>
                  <div className="text-lg font-semibold">{formatters.toCurrency(selectedAd.costPerLead)}</div>
                </div>
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">Кількість квалу</div>
                  <div className="text-lg font-semibold">{selectedAd.qualAmount}</div>
                </div>
                <div className="bg-gray-50 п-4 rounded-lg">
                  <div className="text-sm text-gray-500">Ціна квалу</div>
                  <div className="text-lg font-semibold">{formatters.toCurrency(selectedAd.costPerQualifiedLead)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Компонент для метрик
const MetricCard = ({ label, value }) => (
  <div className="bg-gray-50 п-4 rounded-lg transition-all hover:bg-gray-100">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

export default AdsTable;