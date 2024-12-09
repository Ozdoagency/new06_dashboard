import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, BarChart2, TrendingUp, Users, DollarSign, PieChart, Activity, UserCheck, UserX } from "lucide-react";
import { useTranslation } from 'react-i18next';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

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

const formatters = {
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

const CampaignsTable = ({ campaigns = campaignsData, currentLang }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      switch (sortConfig.key) {
        case 'clicks':
        case 'reach':
          aVal = parseFloat(String(aVal).replace(/[^0-9,.]/g, '').replace(',', '')) || 0;
          bVal = parseFloat(String(bVal).replace(/[^0-9,.]/g, '').replace(',', '')) || 0;
          break;
          
        case 'ctr':
        case 'actual':
        case 'leadCost':
        case 'qualCost':
          aVal = parseFloat(String(aVal).replace(/[^0-9,.]/g, '')) || 0;
          bVal = parseFloat(String(bVal).replace(/[^0-9,.]/g, '')) || 0;
          break;

        case 'result':
          aVal = parseInt(String(aVal).split(' ')[0]) || 0;
          bVal = parseInt(String(bVal).split(' ')[0]) || 0;
          break;

        case 'qualAmount':
          aVal = parseInt(aVal) || 0;
          bVal = parseInt(bVal) || 0;
          break;

        default:
          aVal = String(aVal).toLowerCase();
          bVal = String(bVal).toLowerCase();
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const sortedCampaigns = getSortedCampaigns(campaigns);

  const renderMobileVersion = () => (
    <div className="w-full space-y-4">
      {sortedCampaigns.map((campaign) => (
        <div key={campaign.id} className="bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg p-4 hover:scale-[1.02] transition-transform">
          <div className="space-y-4">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-medium text-sm text-gray-900">{campaign.name}</h3>
              <div className={`
                inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                ${campaign.status === "Активно" 
                  ? "bg-green-100/80 text-green-800" 
                  : "bg-red-100/80 text-red-800"}
              `}>
                {campaign.status === "Активно" ? (
                  <CheckCircle className="w-3 h-3 mr-1" />
                ) : (
                  <XCircle className="w-3 h-3 mr-1" />
                )}
                {campaign.status}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries({
                clicks: { icon: BarChart2, label: t('table.clicks') },
                ctr: { icon: TrendingUp, label: t('table.ctr') },
                reach: { icon: Users, label: t('table.reach') },
                result: { icon: Activity, label: t('table.result') },
                actual: { icon: DollarSign, label: t('table.actual') },
                leadCost: { icon: PieChart, label: t('table.leadCost') },
                qualAmount: { icon: UserCheck, label: t('table.qualAmount') },
                qualCost: { icon: UserX, label: t('table.qualCost') }
              }).map(([key, { icon: Icon, label }]) => (
                <div key={`${campaign.id}-${key}`} className="bg-blue-50/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatters[key] ? formatters[key](campaign[key]) : campaign[key]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderDesktopVersion = () => (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-100">
                {[
                  { key: 'name', label: 'Кампанія' },
                  { key: 'status', label: 'Статус' },
                  { key: 'clicks', label: 'Кліків' },
                  { key: 'ctr', label: 'CTR' },
                  { key: 'reach', label: 'Охоплення' },
                  { key: 'result', label: 'Результат' },
                  { key: 'actual', label: 'Витрати' },
                  { key: 'leadCost', label: 'Ціна ліда' },
                  { key: 'qualAmount', label: 'Кількість квалу' },
                  { key: 'qualCost', label: 'Ціна квалу' }
                ].map(({ key, label }) => (
                  <th key={`header-${key}`} className="p-4 text-sm font-medium text-gray-500">
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedCampaigns.map((campaign) => (
                <tr 
                  key={`row-${campaign.id}`}
                  className="border-b border-gray-50 hover:bg-blue-50/40 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-sm text-gray-900">{campaign.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className={`
                      inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-medium w-[110px]
                      ${campaign.status === "Активно" 
                        ? "bg-green-100/80 text-green-800" 
                        : "bg-red-100/80 text-red-800"}
                    `}>
                      {campaign.status === "Активно" ? (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {campaign.status}
                    </div>
                  </td>
                  <td className="p-4 text-center text-sm text-gray-900">{formatters.number(campaign.clicks)}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{formatters.percent(campaign.ctr)}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{formatters.number(campaign.reach)}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{campaign.result}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{formatters.currency(campaign.actual)}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{formatters.currency(campaign.leadCost)}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{campaign.qualAmount}</td>
                  <td className="p-4 text-center text-sm text-gray-900">{formatters.currency(campaign.qualCost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {typeof window !== 'undefined' && (isMobile ? renderMobileVersion() : renderDesktopVersion())}
    </div>
  );
};

export default CampaignsTable;