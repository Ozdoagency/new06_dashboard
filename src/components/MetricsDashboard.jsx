import React, { useState, useMemo, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, 
  Tooltip, Legend, ResponsiveContainer, ReferenceLine 
} from 'recharts';
import { Calendar } from './ui/Calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'; // Обновленный импорт
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
  uk: {
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

// Обновленный компонент DatePickerWithRange с форматированием даты
const DatePickerWithRange = ({ dateRange, onSelect, isMobile }) => (
  <Popover>
    <PopoverTrigger asChild>
      <button className="px-4 py-2 rounded-lg text-sm bg-blue-50 text-blue-600 hover:bg-blue-100">
        {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
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

// Обновляем функцию суммирования значений
const sumMetricValues = (data, metric) => {
  switch (metric) {
    case 'leads':
    case 'qualified':
      // Суммируем количество
      return data.reduce((sum, item) => sum + Number(item[metric]), 0);
    case 'actual':
      // Суммируем бюджет
      return data.reduce((sum, item) => sum + Number(item[metric]), 0);
    case 'cr':
      // Считаем среднее значение CR
      return data.reduce((sum, item) => sum + Number(item[metric]), 0) / data.length;
    case 'leadCost':
    case 'qualCost':
      // Считаем среднюю стоимость
      return data.reduce((sum, item) => sum + Number(item[metric]), 0) / data.length;
    default:
      return 0;
  }
};

const MetricsDashboard = () => {
  const [data, setData] = useState([]);
  const [width, setWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 0));
  const [lang, setLang] = useState('ru');
  const isMobile = useMemo(() => width < 768, [width]);

  // Изменяем начальные даты на первый и последний день текущего месяца
  const [dateRange, setDateRange] = useState(() => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    const to = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { from, to };
  });

  // Добавляем состояние загрузки
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Обновляем функцию для парсинга даты в формате DD.MM.YYYY
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split('.');
    return new Date(year, month - 1, day);
  };

  // Обновляем useEffect для загрузки данных
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const dataPromise = new Promise((resolve) => {
          window.handleResponse = (sheetData) => {
            resolve(sheetData);
          };
        });

        const script = document.createElement('script');
        script.src = 'https://script.google.com/macros/s/AKfycbyCEKUF7S7bVEOtDkjKQrCJIP2P-SVOeHuW2O51kGdikeRHG_8kiU7s_-t8bl3eSkao2Q/exec?callback=handleResponse';
        document.body.appendChild(script);

        const sheetData = await dataPromise;
        // Теперь не преобразуем date, оставляем как есть
        const processedData = sheetData.map(item => ({
          ...item,
          // Оставляем date как есть, так как он уже в нужном формате
          dateObj: parseDate(item.date) // Добавляем dateObj для внутренних сравнений
        }));

        setData(processedData);
        
        if (processedData.length > 0) {
          setStartIdx(0);
          setEndIdx(processedData.length - 1);
          
          // Устанавливаем начальный диапазон дат на основе первой и последней записи
          const firstDate = parseDate(processedData[0].date);
          const lastDate = parseDate(processedData[processedData.length - 1].date);
          setDateRange({ from: firstDate, to: lastDate });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Обновляем обработчик выбора дат
  const handleDateSelect = (range) => {
    if (!range?.from || !range?.to) return;
    
    setDateRange(range);
    
    const fromDate = formatDate(range.from);
    const toDate = formatDate(range.to);
    
    const filteredIndexes = data.reduce((acc, item, index) => {
      const currentDate = item.date;
      if (fromDate <= currentDate && currentDate <= toDate) {
        if (acc.start === null) acc.start = index;
        acc.end = index;
      }
      return acc;
    }, { start: null, end: null });

    if (filteredIndexes.start !== null && filteredIndexes.end !== null) {
      setStartIdx(filteredIndexes.start);
      setEndIdx(filteredIndexes.end);
    }
  };

  const t = translations[lang];
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(data.length - 1);
  const [showAverage, setShowAverage] = useState(true);
  const [activeMetric, setActiveMetric] = useState('leads');

  // Обновляем вычисление filteredData
  const filteredData = useMemo(() => {
    if (!data.length) return [];
    
    const fromDate = dateRange.from;
    const toDate = dateRange.to;
    
    return data.filter(item => {
      const itemDate = item.dateObj;
      return itemDate >= fromDate && itemDate <= toDate;
    });
  }, [data, dateRange]);

  // Получаем доступные даты из данных
  const availableDates = useMemo(() => {
    return data.map(item => item.dateObj);
  }, [data]);

  // Модифицируем календарь для отображения только доступных дат
  const modifiedCalendar = (
    <Calendar
      mode="range"
      selected={dateRange}
      onSelect={handleDateSelect}
      numberOfMonths={isMobile ? 1 : 2}
      defaultMonth={dateRange.from}
      disabled={{ before: availableDates[0], after: availableDates[availableDates.length - 1] }}
      modifiers={{ disabled: date => !availableDates.some(d => d.getTime() === date.getTime()) }}
      showOutsideDays={false}
      components={{
        NavigationButton: CalendarNavigationButton
      }}
      // ...rest of calendar props
    />
  );

  const metrics = {
    leads: { 
      name: t.metrics.leads,
      color: '#2563eb', 
      icon: UserCog,
      format: (val) => Math.round(val),
      aggregateFormat: (total) => `${Math.round(total)}`
    },
    leadCost: { 
      name: t.metrics.leadCost,
      color: '#1d4ed8', 
      icon: Calculator,
      format: (val) => `₴${val.toFixed(2)}`,
      aggregateFormat: (total) => ` ₴${total.toFixed(2)}`
    },
    cr: { 
      name: t.metrics.cr,
      color: '#1e40af', 
      icon: BarChart,
      format: (val) => `${Math.round(val)}%`,
      aggregateFormat: (total) => ` ${Math.round(total)}%`
    },
    actual: { 
      name: t.metrics.actual,
      color: '#1e3a8a', 
      icon: Wallet,
      format: (val) => `₴${val.toFixed(2)}`,
      aggregateFormat: (total) => `₴${total.toFixed(2)}`
    },
    qualified: {
      name: t.metrics.qualified,
      color: '#172554',
      icon: UserCheck,
      format: (val) => Math.round(val),
      aggregateFormat: (total) => `${Math.round(total)}`
    },
    qualCost: { 
      name: t.metrics.qualCost,
      color: '#0f172a', 
      icon: DollarSign,
      format: (val) => `₴${val.toFixed(2)}`,
      aggregateFormat: (total) => `₴${total.toFixed(2)}`
    }
  };

  const getAverageValue = (data, key) => {
    if (!data.length) return 0;
    return data.reduce((sum, item) => sum + item[key], 0) / data.length;
  };

  // Добавляем обработку состояния загрузки в рендер
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Обновляем получение значений для метрик с учетом суммирования
  const getMetricValues = (metricKey) => {
    if (!filteredData.length) return { latest: 0, previous: 0, total: 0 };
    
    // Получаем сумму значений за выбранный период
    const total = sumMetricValues(filteredData, metricKey);
    
    // Получаем последнее и предпоследнее значения для процентного изменения
    const latest = filteredData[filteredData.length - 1][metricKey];
    const previous = filteredData.length > 1 
      ? filteredData[filteredData.length - 2][metricKey]
      : latest;
      
    return { latest, previous, total };
  };

  return (
    <div className={`container space-y-4 p-2 sm:p-6 rounded-xl ${isMobile ? 'pt-6 pb-6' : ''}`}>
      <div className="flex justify-between items-center">
        <h1 className={`font-bold ${isMobile ? 'text-lg' : 'text-2xl'}`}>{t.title}</h1>
        <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
          <Globe className="w-4 h-4 text-blue-600" />
          <select 
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-transparent border-none text-sm focus:outline-none text-blue-600"
          >
            <option value="en" className="text-black">EN</option>
            <option value="uk" className="text-black">UK</option>
            <option value="ru" className="text-black">RU</option>
          </select>
        </div>
      </div>

      <div className={`bg-white/80 backdrop-blur shadow-lg rounded-lg p-4 ${isMobile ? 'pt-6 pb-6' : ''}`}>
        <div className="pb-4 flex justify-between items-center flex-wrap gap-4">
          <DatePickerWithRange 
            dateRange={dateRange}
            onSelect={handleDateSelect}
            isMobile={isMobile}
          />
          
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">{t.average}:</label>
            <input
              type="checkbox"
              checked={showAverage}
              onChange={(e) => setShowAverage(e.target.checked)}
              className="rounded border-gray-300"
            />
          </div>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-6'} gap-4 mt-6`}>
          {Object.entries(metrics).map(([key, { name, color, icon: Icon, format, aggregateFormat }]) => {
            const { latest: latestValue, previous: previousValue, total } = getMetricValues(key);
            const change = latestValue && previousValue 
              ? ((latestValue - previousValue) / previousValue * 100).toFixed(1) 
              : 0;
            const isPositive = change > 0;
            
            return (
              <div key={key} className="bg-white/80 backdrop-blur hover:scale-105 transition-transform rounded-lg">
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
                      {aggregateFormat(total)}
                    </div>
                    <div className={`${isMobile ? 'text-xs' : 'text-sm'} mt-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? '↑' : '↓'} {Math.abs(change)}%
                    </div>
                    <div className="mt-2">
                      <ResponsiveContainer width="100%" height={isMobile ? 50 : 75}>
                        <LineChart data={filteredData}>
                          <XAxis dataKey="date" hide />
                          <YAxis hide />
                          <Line
                            type="monotone"
                            dataKey={key}
                            stroke={color}
                            strokeWidth={1.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-6 mt-6">
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

      <div className="text-center text-sm text-gray-500">
        {t.madeIn} <span className="font-semibold text-blue-600">OZDO AI</span>
      </div>
    </div>
  );
};

export default MetricsDashboard;