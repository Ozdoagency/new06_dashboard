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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { t, i18n } = useTranslation();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

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
      {sortedCampaigns.map((campaign, index) => (
        <div key={index} className="campaign-card">
          <div className="campaign-card-header">
            <h3 className="campaign-card-title">
              {campaign.name}
            </h3>
            <div className={`
              campaign-card-status
              ${campaign.status === "Активно"
                ? "campaign-card-status-active" 
                : "campaign-card-status-inactive"}
            `}>
              {campaign.status === "Активно" ? (
                <CheckCircle className="w-3 h-3" />
              ) : (
                <XCircle className="w-3 х-3" />
              )}
              {campaign.status === "Активно" ? t('table.active') : t('table.inactive')}
            </div>
          </div>

          <div className="campaign-card-metrics">
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <BarChart2 className="w-3 h-3" />
                {t('table.clicks')}
              </p>
              <p className="campaign-card-metric-value">
                {formatters.number(campaign.clicks)}
              </p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <TrendingUp className="w-3 h-3" />
                {t('table.ctr')}
              </p>
              <p className="campaign-card-metric-value">
                {campaign.ctr ? formatters.percent(campaign.ctr) : '-'}
              </p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <Users className="w-3 h-3" />
                {t('table.reach')}
              </p>
              <p className="campaign-card-metric-value">{campaign.reach}</p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <Activity className="w-3 h-3" />
                {t('table.result')}
              </p>
              <p className="campaign-card-metric-value">{campaign.result}</p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <DollarSign className="w-3 h-3" />
                {t('table.actual')}
              </p>
              <p className="campaign-card-metric-value">
                {campaign.actual ? formatters.currency(campaign.actual) : '-'}
              </p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <PieChart className="w-3 h-3" />
                {t('table.leadCost')}
              </p>
              <p className="campaign-card-metric-value">{campaign.leadCost}</p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <UserCheck className="w-3 h-3" />
                {t('table.qualAmount')}
              </p>
              <p className="campaign-card-metric-value">{campaign.qualAmount}</p>
            </div>
            
            <div className="campaign-card-metric">
              <p className="campaign-card-metric-label">
                <UserX className="w-3 h-3" />
                {t('table.qualCost')}
              </p>
              <div className="flex items-center gap-2">
                <p className="campaign-card-metric-value">{campaign.qualCost}</p>
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

  const renderDesktopVersion = () => (
    <div className="w-full space-y-6">
      <div className="table-container">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="text-left">Кампанія</th>
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
            {sortedCampaigns.map((campaign) => (
              <tr 
                key={campaign.id}
                className="hover:bg-blue-50/40 cursor-pointer"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="font-medium text-sm">{campaign.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className={`
                    inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${campaign.status === "Активно" 
                      ? "bg-green-100/80 text-green-800" 
                      : "bg-red-100/80 text-red-800"}
                  `}>
                    {campaign.status === "Активно" ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <XCircle className="w-3 х-3 mr-1" />
                    )}
                    {campaign.status}
                  </div>
                </td>
                <td className="p-4 text-center">{formatters.number(campaign.clicks)}</td>
                <td className="p-4 text-center">{formatters.percent(campaign.ctr)}</td>
                <td className="p-4 text-center">{formatters.number(campaign.reach)}</td>
                <td className="p-4 text-center">{campaign.result}</td>
                <td className="p-4 text-center">{formatters.currency(campaign.actual)}</td>
                <td className="p-4 text-center">{formatters.currency(campaign.leadCost)}</td>
                <td className="p-4 text-center">{campaign.qualAmount}</td>
                <td className="p-4 text-center">{formatters.currency(campaign.qualCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      {isMobile ? renderMobileVersion() : renderDesktopVersion()}
    </div>
  );
};

export default CampaignsTable;