import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { Calendar } from './ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { 
  ArrowUpRight, ArrowDownRight, DollarSign,
  UserCheck, Calculator, BarChart,
  Wallet, UserCog, ChevronLeft, ChevronRight, Globe
} from 'lucide-react';

// Функция форматирования даты (перемещена в начало файла)
const formatDate = (date) => {
  if (!date) return '';
  if (typeof date === 'string') {
    return date;
  }
  const d = new Date(date);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
};

const translations = {
  en: {
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
  },
  ua: {
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
  },
  ru: {
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
};

const CalendarNavigationButton = ({ direction, onClick }) => {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
  return (
    <button
      onClick={onClick}
      className="bg-white hover:bg-gray-50 rounded-full p-1.5 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 z-10"
      title={direction === 'previous' ? 'Предыдущий месяц' : 'Следующий месяц'}
    >
      <Icon className="h-4 w-4 text-gray-600 hover:text-gray-900" />
    </button>
  );
};

const MetricsDashboardCalendar = ({ dateRange, onSelect, isMobile }) => (
  <Calendar
    mode="range"
    selected={dateRange}
    onSelect={onSelect}
    numberOfMonths={isMobile ? 1 : 2}
    defaultMonth={dateRange.from}
    showOutsideDays={false}
    components={{
      NavigationButton: CalendarNavigationButton
    }}
    classNames={{
      months: isMobile 
        ? "flex flex-col space-y-4" 
        : "flex flex-row space-x-4",
      month: "space-y-4",
      caption: "flex justify-between items-center px-8", // изменено для размещения стрелок рядом с названием месяца
      caption_label: "text-sm font-medium text-gray-900",
      nav: "flex items-center space-x-2", // изменено для размещения стрелок рядом с названием месяца
      table: "w-full border-collapse space-y-1 mt-8",
      head_row: "flex",
      head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
      row: "flex w-full mt-2",
      cell: "h-9 w-9 text-center relative [&:has([aria-selected])]:bg-blue-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-blue-50 rounded-md transition-all duration-200",
      day_selected: "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600 focus:text-white",
      day_today: "bg-blue-50 text-blue-600 font-semibold",
      day_range_middle: "aria-selected:bg-blue-50 aria-selected:text-blue-900",
      day_hidden: "invisible",
      day_disabled: "text-gray-400 opacity-50",
      day_range_end: "bg-blue-600 text-white",
      day_range_start: "bg-blue-600 text-white",
      day_outside: "text-gray-400 opacity-50 aria-selected:bg-blue-50/50 aria-selected:text-gray-400 aria-selected:opacity-30"
    }}
  />
);

const DatePickerWithRange = ({ dateRange, onSelect, isMobile }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="px-4 py-2 rounded-lg text-sm bg-blue-50 text-blue-600 hover:bg-blue-100">
        {dateRange.from.toLocaleDateString('ru-RU')} - {dateRange.to.toLocaleDateString('ru-RU')}
      </button>
    </PopoverTrigger>
    <PopoverContent align="start" className={isMobile ? "w-auto p-0" : "w-[600px] p-0"}>
      <MetricsDashboardCalendar 
        dateRange={dateRange}
        onSelect={onSelect}
        isMobile={isMobile}
      />
    </PopoverContent>
  </Popover>
);

// Определяем компонент SparkLine
const SparkLine = ({ data, dataKey, color, height = 30 }) => (
  <ResponsiveContainer width="100%" height={height}>
    <LineChart data={data}>
      <Line 
        type="monotone" 
        dataKey={dataKey} 
        stroke={color} 
        strokeWidth={1} 
        dot={false} 
      />
    </LineChart>
  </ResponsiveContainer>
);

const MetricsDashboard = ({ initialData = [] }) => {
  const [lang, setLang] = useState('ua'); // Установите основной язык на украинский
  const [data, setData] = useState(initialData); // Добавьте хук состояния для данных
  const [loading, setLoading] = useState(true); // Добавлено состояние для прелоадера
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const isMobile = useMemo(() => width < 768, [width]);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    window.handleResponse = (sheetData) => {
      console.log("Data received from Apps Script:", sheetData);
      const formattedData = sheetData.map(row => ({
        date: new Date(row.date.split('.').reverse().join('-')).toLocaleDateString('ru-RU'),
        leads: Number(row.leads),
        leadCost: Number(row.leadCost),
        cr: Number(row.cr),
        actual: Number(row.actual),
        qualified: Number(row.qualified),
        qualCost: Number(row.qualCost)
      }));
      setData(formattedData);
      setLoading(false); // Данные загружены, отключаем прелоадер
    };

    async function fetchData() {
      const script = document.createElement('script');
      script.src = 'https://script.google.com/macros/s/AKfycbxU8bDs7W_K1JxZWtmaZ39Dh2EObE0FDnqaff3vwVWjbPsXM1fRgTI4UMrSw6afpzMKLQ/exec?callback=handleResponse';
      document.body.appendChild(script);
    }

    fetchData();
  }, []);

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date()
  });
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(data.length - 1);
  const [showAverage, setShowAverage] = useState(true);
  const [activeMetric, setActiveMetric] = useState('leads');

  useEffect(() => {
    if (data.length > 0) {
      const lastIndex = data.length - 1;
      setStartIdx(0);
      setEndIdx(lastIndex);
      setDateRange({
        from: new Date(data[0].date.split('.').reverse().join('-')),
        to: new Date(data[lastIndex].date.split('.').reverse().join('-'))
      });
    }
  }, [data]);

  const filteredData = useMemo(() => {
    if (data.length === 0) return [];
    
    const fromDate = new Date(dateRange.from);
    const toDate = dateRange.to ? new Date(dateRange.to) : fromDate;
    
    // Нормализуем даты для сравнения (устанавливаем время в 00:00:00)
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(23, 59, 59, 999);
  
    return data.filter((item) => {
      const itemDate = new Date(item.date.split('.').reverse().join('-'));
      itemDate.setHours(0, 0, 0, 0);
      return itemDate >= fromDate && itemDate <= toDate;
    });
  }, [data, dateRange]);

  console.log("Filtered Data:", filteredData);

  const handleDateSelect = (range) => {
    if (!range?.from) return;

    const fromDate = new Date(range.from);
    // Если to не указан, используем from
    const toDate = range.to ? new Date(range.to) : fromDate;

    // Форматируем даты в строки для сравнени��
    const fromDateStr = fromDate.toLocaleDateString('ru-RU');
    const toDateStr = toDate.toLocaleDateString('ru-RU');

    const startIndex = data.findIndex(item => item.date === fromDateStr);
    const endIndex = range.to ? data.findIndex(item => item.date === toDateStr) : startIndex;

    if (startIndex !== -1) {
      setStartIdx(startIndex);
      setEndIdx(endIndex !== -1 ? endIndex : startIndex);
      setDateRange({
        from: fromDate,
        to: range.to || fromDate // Если to не указан, используем from
      });
    }
  };

  const metrics = {
    leads: {
      name: translations[lang].metrics.leads,
      color: '#2563eb',
      icon: UserCog,
      format: () => filteredData.reduce((sum, item) => sum + item.leads, 0) // Сумма лидов
    },
    leadCost: {
      name: translations[lang].metrics.leadCost,
      color: '#1d4ed8',
      icon: Calculator,
      format: () => {
        const totalActual = filteredData.reduce((sum, item) => sum + item.actual, 0);
        const totalLeads = filteredData.reduce((sum, item) => sum + item.leads, 0);
        return totalLeads > 0 ? `₴${(totalActual / totalLeads).toFixed(2)}` : '₴0';
      }
    },
    cr: {
      name: translations[lang].metrics.cr,
      color: '#1e40af',
      icon: BarChart,
      format: () => {
        const totalLeads = filteredData.reduce((sum, item) => sum + item.leads, 0);
        const totalQualified = filteredData.reduce((sum, item) => sum + item.qualified, 0);
        return totalLeads > 0 ? `${((totalQualified / totalLeads) * 100).toFixed(1)}%` : '0%';
      }
    },
    actual: {
      name: translations[lang].metrics.actual,
      color: '#1e3a8a',
      icon: Wallet,
      format: () => `₴${filteredData.reduce((sum, item) => sum + item.actual, 0).toFixed(2)}`
    },
    qualified: {
      name: translations[lang].metrics.qualified,
      color: '#172554',
      icon: UserCheck,
      format: () => filteredData.reduce((sum, item) => sum + item.qualified, 0) // Сумма квалификаций
    },
    qualCost: {
      name: translations[lang].metrics.qualCost,
      color: '#0f172a',
      icon: DollarSign,
      format: () => {
        const totalActual = filteredData.reduce((sum, item) => sum + item.actual, 0);
        const totalQualified = filteredData.reduce((sum, item) => sum + item.qualified, 0);
        return totalQualified > 0 ? `₴${(totalActual / totalQualified).toFixed(2)}` : '₴0';
      }
    }
  };

  const getAverageValue = (data, key) => {
    if (!data.length) return 0;
    return data.reduce((sum, item) => sum + item[key], 0) / data.length;
  };

  const changeLanguage = (lng) => {
    setLang(lng);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-16 h-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin"></div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full rotate-45">
            <div className="w-16 h-16 rounded-full border-4 border-transparent border-t-blue-400 animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container space-y-4 p-2 sm:p-6 rounded-xl">
      <div className="flex justify-between items-center">
        <h1 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>{translations[lang].title}</h1>
        <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
          <Globe className="w-4 h-4 text-blue-600" />
          <select 
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-transparent border-none text-sm focus:outline-none text-blue-600"
          >
            <option value="en" className="text-black">EN</option>
            <option value="ua" className="text-black">UA</option>
            <option value="ru" className="text-black">RU</option>
          </select>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur shadow-lg rounded-lg p-4">
        {/* Перемещаем выбор даты наверх */}
        <div className="pb-4 flex justify-between items-center flex-wrap gap-4 mb-6">
          <DatePickerWithRange 
            dateRange={dateRange}
            onSelect={handleDateSelect}
            isMobile={isMobile}
          />
        </div>

        {/* Метрики */}
        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-6'} gap-4 mb-6`}>
          {Object.entries(metrics).map(([key, { name, color, icon: Icon, format }]) => {
            const latestValue = filteredData[filteredData.length - 1]?.[key] ?? 0;
            const previousValue = filteredData[filteredData.length - 2]?.[key] ?? latestValue;
            const change = latestValue && previousValue 
              ? ((latestValue - previousValue) / previousValue * 100).toFixed(1) 
              : 0;
            const isPositive = change > 0;
            
            return (
              <div key={key} className="block bg-white/80 backdrop-blur hover:scale-105 transition-transform rounded-lg">
                <div className={isMobile ? 'p-3' : 'p-6'}>
                  <div className="flex items-center justify-between">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
                      <Icon className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} style={{ color }} />
                    </div>
                    {isPositive ? 
                      <ArrowUpRight className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-green-600`} /> :
                      <ArrowDownRight className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-red-600`} />
                    }
                  </div>
                  <div className="mt-4">
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>{name}</div>
                    <div className={`${isMobile ? 'text-lg' : 'text-xl'} font-bold mt-1`} style={{ color }}>
                      {format()} {/* Агрегированное значение */}
                    </div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '↑' : '↓'} {Math.abs(change)}%
                    </div>
                    {/* Добавляем мини-график */}
                    <div className="h-8 mt-2">
                      <SparkLine 
                        data={filteredData.slice(-7)} 
                        dataKey={key} 
                        color={color} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6">
          <div className={`bg-blue-50 p-1 rounded-lg flex flex-wrap gap-1 ${isMobile ? 'justify-between' : ''}`}>
            {Object.entries(metrics).map(([key, { name, icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setActiveMetric(key)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-md
                  ${isMobile ? 'flex-1 min-w-[45%] justify-center' : ''}
                  ${activeMetric === key ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}
                `}
              >
                <Icon className={isMobile ? 'w-4 h-4' : 'w-5 h-5'} />
                <span className={isMobile ? 'text-xs' : 'text-sm'}>{name}</span>
              </button>
            ))}
          </div>
          
          {/* Перемещенный Average чекбокс */}
          <div className="flex justify-end items-center gap-2 mb-2">
            <label className="text-sm text-gray-600">{translations[lang].average}:</label>
            <input
              type="checkbox"
              checked={showAverage}
              onChange={(e) => setShowAverage(e.target.checked)}
              className="rounded border-gray-300"
            />
          </div>
          
          <div className={isMobile ? 'h-64' : 'h-96'}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <XAxis dataKey="date" stroke="#1e40af" fontSize={isMobile ? 10 : 12} />
                <YAxis stroke="#1e40af" width={40} fontSize={isMobile ? 10 : 12} />
                <Tooltip />
                {!isMobile && <Legend />}
                {showAverage && (
                  <ReferenceLine 
                    y={getAverageValue(filteredData, activeMetric)}
                    stroke="#94a3b8" 
                    strokeDasharray="3 3"
                  />
                )}
                <Line
                  type="monotone"
                  dataKey={activeMetric}
                  stroke={metrics[activeMetric].color}
                  strokeWidth={isMobile ? 1.5 : 2}
                  dot={{ r: isMobile ? 3 : 4 }}
                  activeDot={{ r: isMobile ? 5 : 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsDashboard;