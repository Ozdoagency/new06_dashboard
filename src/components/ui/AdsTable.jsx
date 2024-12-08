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

// Компонент для метрик (перемещаем выше основного компонента)
const MetricCard = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg transition-all hover:bg-gray-100">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-lg font-semibold">{value}</div>
  </div>
);

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

  // Безопасная функция для форматирован��я с разделителями
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

  const renderMobileVersion = () => (
    <div className="w-full space-y-4">
      {/* Фильтры */}
      <div className="flex gap-2 overflow-x-auto pb-3 no-scrollbar -mx-3 px-3">
        {statusFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2.5 rounded-full text-xs font-medium whitespace-nowrap transition-all
              ${activeFilter === filter 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-gray-100/80 backdrop-blur-sm text-gray-600'}`}
          >
            {filter === 'all' ? 'Всі креативи' : filter}
          </button>
        ))}
      </div>

      {/* Сетка карточек */}
      <div className="mobile-grid">
        {filteredAds.map((ad) => (
          <div 
            key={ad.id} 
            className="mobile-card"
            onClick={() => setSelectedAd(ad)}
          >
            <div className="relative">
              <img
                src={ad.preview}
                alt={ad.name}
                className="w-full h-32 object-cover rounded-t-xl"
              />
              <div className={`
                absolute top-2 right-2 px-2 py-1 rounded-full text-[10px] font-medium
                backdrop-blur-md ${ad.status === "Активно" 
                  ? "bg-green-100/80 text-green-800" 
                  : "bg-red-100/80 text-red-800"}
              `}>
                {ad.status}
              </div>
            </div>
            
            <div className="p-3 space-y-2 flex-1 flex flex-col">
              <p className="text-xs font-medium text-gray-900 line-clamp-2 flex-1">
                {ad.name}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="metric-card">
                  <span className="text-gray-500">Кліків</span>
                  <div className="font-semibold mt-0.5">{formatters.toLocale(ad.clicks)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-gray-500">CTR</span>
                  <div className="font-semibold mt-0.5">{formatters.toFixed(ad.ctr)}%</div>
                </div>
              </div>

              {/* Добавляем кнопку "Подивитись" */}
              <button
                onClick={() => setSelectedAd(ad)}
                className="w-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 
                  text-blue-600 text-xs font-medium py-1.5 px-3 rounded-lg 
                  transition-colors flex items-center justify-center gap-1.5
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 mt-2"
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

      {/* Обновленное модальное окно */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex">
          <div className="modal-content w-full">
            <div className="p-4 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-base font-medium text-gray-900">{selectedAd.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`
                      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                      ${selectedAd.status === "Активно" 
                        ? "bg-green-100/80 text-green-800" 
                        : "bg-red-100/80 text-red-800"}
                    `}>
                      {selectedAd.status === "Активно" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {selectedAd.status}
                    </div>
                    <span className="text-xs text-gray-500">{selectedAd.platform}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAd(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 space-y-4">
              <img 
                src={selectedAd.preview}
                alt={selectedAd.name}
                className="w-full aspect-video object-cover rounded-lg"
              />

              <div className="grid grid-cols-2 gap-3">
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Кліків</span>
                  <div className="text-sm font-semibold mt-0.5">{formatters.toLocale(selectedAd.clicks)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">CTR</span>
                  <div className="text-sm font-semibold mt-0.5">{formatters.toFixed(selectedAd.ctr)}%</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Охоплення</span>
                  <div className="text-sm font-semibold mt-0.5">{formatters.toLocale(selectedAd.reach)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Результат</span>
                  <div className="text-sm font-semibold mt-0.5">{selectedAd.result}</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Витрати</span>
                  <div className="text-sm font-semibold mt-0.5">{formatters.toCurrency(selectedAd.costs)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Ціна ліда</span>
                  <div className="text-sm font-semibold mt-0.5">{formatters.toCurrency(selectedAd.costPerLead)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Кількість ��валу</span>
                  <div className="text-sm font-semibold mt-0.5">{selectedAd.qualAmount}</div>
                </div>
                <div className="metric-card">
                  <span className="text-xs text-gray-500">Ціна квалу</span>
                  <div className="text-sm font-semibold mt-0.5">{formatters.toCurrency(selectedAd.costPerQualifiedLead)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderDesktopVersion = () => (
    <div className="w-full space-y-6">
      {/* Фильтры */}
      <div className="flex gap-3">
        {statusFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all
              ${activeFilter === filter 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-gray-100/80 backdrop-blur-sm text-gray-600 hover:bg-gray-200/80'}`}
          >
            {filter === 'all' ? 'В��і креативи' : filter}
          </button>
        ))}
      </div>

      {/* Таблица */}
      <div className="table-container">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left">Креатив</th>
              <th>Статус</th>
              <th>Кліків</th>
              <th>CTR</th>
              <th>Охоплення</th>
              <th>Результат</th>
              <th>Витрати</th>
              <th>Ціна ліда</th>
              <th>Кількість квалу</th>
              <th>Ціна квалу</th>
            </tr>
          </thead>
          <tbody>
            {filteredAds.map((ad) => (
              <tr 
                key={ad.id}
                onClick={() => setSelectedAd(ad)}
                className="hover:bg-blue-50/40 cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={ad.preview}
                      alt={ad.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-sm">{ad.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${ad.status === "Активно" 
                      ? "bg-green-100/80 text-green-800" 
                      : "bg-red-100/80 text-red-800"}
                  `}>
                    {ad.status === "Активно" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {ad.status}
                  </div>
                </td>
                <td className="p-4 text-center">{formatters.toLocale(ad.clicks)}</td>
                <td className="p-4 text-center">{formatters.toFixed(ad.ctr)}%</td>
                <td className="p-4 text-center">{formatters.toLocale(ad.reach)}</td>
                <td className="p-4 text-center">{ad.result}</td>
                <td className="p-4 text-center">{formatters.toCurrency(ad.costs)}</td>
                <td className="p-4 text-center">{formatters.toCurrency(ad.costPerLead)}</td>
                <td className="p-4 text-center">{ad.qualAmount}</td>
                <td className="p-4 text-center">{formatters.toCurrency(ad.costPerQualifiedLead)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Модальное окно */}
      {selectedAd && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 p-6 overflow-y-auto">
          <div className="modal-content max-w-4xl mx-auto my-8">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{selectedAd.name}</h3>
                  <div className="flex items-center gap-3 mt-2">
                    <div className={`
                      inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium
                      ${selectedAd.status === "Активно" 
                        ? "bg-green-100/80 text-green-800" 
                        : "bg-red-100/80 text-red-800"}
                    `}>
                      {selectedAd.status === "Активно" ? (
                        <CheckCircle className="w-4 h-4 mr-1.5" />
                      ) : (
                        <XCircle className="w-4 h-4 mr-1.5" />
                      )}
                      {selectedAd.status}
                    </div>
                    <span className="text-sm text-gray-500">{selectedAd.platform}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAd(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-gray-50 p-4 rounded-xl">
                <img 
                  src={selectedAd.preview}
                  alt={selectedAd.name}
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Кліків</span>
                  <div className="text-lg font-semibold mt-1">{formatters.toLocale(selectedAd.clicks)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">CTR</span>
                  <div className="text-lg font-semibold mt-1">{formatters.toFixed(selectedAd.ctr)}%</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Охоплення</span>
                  <div className="text-lg font-semibold mt-1">{formatters.toLocale(selectedAd.reach)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Результат</span>
                  <div className="text-lg font-semibold mt-1">{selectedAd.result}</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Витрати</span>
                  <div className="text-lg font-semibold mt-1">{formatters.toCurrency(selectedAd.costs)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Ціна ліда</span>
                  <div className="text-lg font-semibold mt-1">{formatters.toCurrency(selectedAd.costPerLead)}</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Кількість квалу</span>
                  <div className="text-lg font-semibold mt-1">{selectedAd.qualAmount}</div>
                </div>
                <div className="metric-card">
                  <span className="text-sm text-gray-500">Ціна квалу</span>
                  <div className="text-lg font-semibold mt-1">{formatters.toCurrency(selectedAd.costPerQualifiedLead)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return screenSize === 'mobile' ? renderMobileVersion() : renderDesktopVersion();
};

export default AdsTable;