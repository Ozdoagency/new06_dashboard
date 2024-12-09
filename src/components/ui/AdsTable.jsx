import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, BarChart2, TrendingUp, Users, Activity, DollarSign, PieChart, UserCheck, UserX } from "lucide-react";

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

  const getFilteredAds = () => {
    switch (activeFilter) {
      case 'all':
        return adsData;
      case 'Активно':
        return adsData.filter(ad => ad.status === 'Активно');
      case 'Неактивно':
        return adsData.filter(ad => ad.status === 'Неактивно');
      default:
        return adsData;
    }
  };

  const filteredAds = getFilteredAds();

  const renderModal = () => {
    if (!selectedAd) return null;
  
    const isMobile = screenSize === 'mobile';
    
    const metrics = [
      { label: 'Кліків', value: formatters.toLocale(selectedAd.clicks), icon: BarChart2 },
      { label: 'CTR', value: `${formatters.toFixed(selectedAd.ctr)}%`, icon: TrendingUp },
      { label: 'Охоплення', value: formatters.toLocale(selectedAd.reach), icon: Users },
      { label: 'Результат', value: selectedAd.result, icon: Activity },
      { label: 'Витрати', value: formatters.toCurrency(selectedAd.costs), icon: DollarSign },
      { label: 'Ціна ліда', value: formatters.toCurrency(selectedAd.costPerLead), icon: PieChart },
      { label: 'Кількість квалу', value: selectedAd.qualAmount, icon: UserCheck },
      { label: 'Ціна квалу', value: formatters.toCurrency(selectedAd.costPerQualifiedLead), icon: UserX }
    ];
  
    return (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 p-4 overflow-y-auto">
        <div className={`bg-white/100 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-xl mx-auto my-4 ${isMobile ? 'max-w-sm' : 'max-w-4xl'}`}>
          <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-gray-100`}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedAd.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`
                    inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
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
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XCircle className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
  
          <div className={`${isMobile ? 'p-4' : 'p-6'} space-y-4`}>
            <div className="bg-blue-50/50 p-2 rounded-xl">
              <img 
                src={selectedAd.preview}
                alt={selectedAd.name}
                className="w-full rounded-lg object-cover aspect-video"
              />
            </div>
  
            <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} gap-3`}>
              {metrics.map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-blue-50/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMobileVersion = () => (
    <div className="space-y-4">
      <div className="overflow-x-auto -mx-3 px-3">
        <div className="flex gap-2 pb-4">
          {statusFilters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all
                ${activeFilter === filter 
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                  : 'bg-blue-50/50 text-blue-600 hover:bg-blue-100/50'}`}
            >
              {filter === 'all' ? 'Вcі креативи' : filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredAds.map((ad) => (
          <div 
            key={ad.id} 
            className="bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden hover:scale-[1.02] transition-transform"
          >
            <div className="relative w-full">
              <img
                src={ad.preview}
                alt={ad.name}
                className="w-full h-32 object-cover"
              />
              <div className={`
                absolute top-2 right-2 px-2.5 py-1 rounded-full text-xs font-medium
                backdrop-blur-md ${ad.status === "Активно" 
                  ? "bg-green-100/80 text-green-800" 
                  : "bg-red-100/80 text-red-800"}
              `}>
                {ad.status === "Активно" ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1 inline" />
                    {ad.status}
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 mr-1 inline" />
                    {ad.status}
                  </>
                )}
              </div>
            </div>

            <div className="p-3 space-y-3">
              <p className="text-sm font-medium text-gray-900 line-clamp-2">{ad.name}</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50/50 rounded-lg p-2">
                  <div className="flex items-center gap-1 text-blue-600 mb-1">
                    <BarChart2 className="w-3 h-3" />
                    <span className="text-xs">Кліків</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{safeLocaleString(ad.clicks)}</div>
                </div>
                <div className="bg-blue-50/50 rounded-lg p-2">
                  <div className="flex items-center gap-1 text-blue-600 mb-1">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">CTR</span>
                  </div>
                  <div className="text-sm font-semibold text-gray-900">{safeNumberFormat(ad.ctr)}%</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedAd(ad)}
                className="w-full bg-blue-50 hover:bg-blue-100 
                  text-blue-600 text-xs font-medium py-2 px-3 rounded-lg 
                  transition-colors flex items-center justify-center gap-1.5"
              >
                Подивитись
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
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
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all
              ${activeFilter === filter 
                ? 'bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-gray-100/80 backdrop-blur-sm text-gray-600 hover:bg-gray-200/80'}`}
          >
            {filter === 'all' ? 'Вcі креативи' : filter}
          </button>
        ))}
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <div className="table-container min-w-[1500px]">
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
                      inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
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
      </div>
    </div>
  );

  return (
    <>
      {screenSize === 'mobile' ? renderMobileVersion() : renderDesktopVersion()}
      {selectedAd && renderModal()}
    </>
  );
};

export default AdsTable;