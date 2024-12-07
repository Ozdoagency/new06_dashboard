import React, { useEffect } from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const CampaignsTable = ({ campaigns, currentLang }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (currentLang && i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  if (isMobile) {
    return (
      <div className="space-y-4" style={{ paddingRight: 0, paddingLeft: 0 }}>
        {campaigns.map((campaign, index) => (
          <div key={index} className="bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-gray-100/50">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-medium text-sm text-gray-900 flex-1 pr-4">
                {campaign.name}
              </h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1
                ${campaign.status === "Активно"
                  ? "bg-green-50 text-green-600" 
                  : "bg-red-50 text-red-500"}`}
              >
                {campaign.status === "Активно" ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 h-3" />
                )}
                {campaign.status === "Активно" ? t('table.active') : t('table.inactive')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">{t('table.result')}</p>
                <p className="font-medium text-gray-900">
                  {campaign.result === "-" ? "-" : `${campaign.result.split(" ")[0]} ${t('table.leads')}`}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t('table.reach')}</p>
                <p className="font-medium text-gray-900">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t('table.leadCost')}</p>
                <p className="font-medium text-gray-900">{campaign.leadCost}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t('table.qualAmount')}</p>
                <p className="font-medium text-gray-900">{campaign.qualAmount}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t('table.qualCost')}</p>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-gray-900">{campaign.qualCost}</p>
                  <Info className="w-3 h-3 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto" style={{ paddingRight: 0, paddingLeft: 0 }}>
      <div className="overflow-x-auto">
        <div className="bg-white/80 backdrop-blur shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] rounded-lg min-w-[1200px]">
          <table className="table-auto w-full rounded-lg overflow-hidden">
            <thead className="bg-blue-50/50 text-blue-900 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">{t('table.campaignName')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t('table.status')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t('table.result')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t('table.reach')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t('table.leadCost')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t('table.qualAmount')}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t('table.qualCost')}</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr key={index} className="border-t border-blue-50/30 hover:bg-blue-50/30 transition-all">
                  <td className="px-6 py-4 text-sm text-gray-800">{campaign.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      {campaign.status === "Активно" ? (
                        <CheckCircle className="text-green-500 w-5 h-5" />
                      ) : (
                        <XCircle className="text-red-500 w-5 h-5" />
                      )}
                      <span className={`font-medium ${
                        campaign.status === "Активно" ? "text-green-600" : "text-red-500"
                      }`}>
                        {campaign.status === "Активно" ? t('table.active') : t('table.inactive')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">
                    {campaign.result === "-" ? "-" : `${campaign.result.split(" ")[0]} ${t('table.leads')}`}
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{campaign.reach}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{campaign.leadCost}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{campaign.qualAmount}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{campaign.qualCost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignsTable;
