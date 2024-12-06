import React from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

const defaultTranslations = {
  en: {
    table: {
      campaignName: 'Campaign Name',
      status: 'Status',
      result: 'Result',
      reach: 'Reach',
      leadCost: 'Lead Cost',
      qualAmount: 'Qual Amount',
      qualCost: 'Qual Cost',
      active: 'Active',
      inactive: 'Inactive'
    }
  },
  ua: {
    table: {
      campaignName: 'Назва кампанії',
      status: 'Статус',
      result: 'Результат',
      reach: 'Охоплення',
      leadCost: 'Ціна ліда',
      qualAmount: 'Кількість квалу',
      qualCost: 'Ціна квалу',
      active: 'Активно',
      inactive: 'Неактивно'
    }
  },
  ru: {
    table: {
      campaignName: 'Название кампании',
      status: 'Статус',
      result: 'Результат',
      reach: 'Охват',
      leadCost: 'Цена лида',
      qualAmount: 'Количество квалов',
      qualCost: 'Цена квала',
      active: 'Активно',
      inactive: 'Неактивно'
    }
  }
};

// CampaignsTable.jsx
const CampaignsTable = ({ campaigns, lang = 'ua', translations = defaultTranslations }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Получаем переводы для выбранного языка
  const t = translations[lang].table;

  // Локализация статуса
  const getLocalizedStatus = (status) => {
    if (status === "Активно" || status === "Active" || status === "Активний") {
      return t.active;
    }
    return t.inactive;
  };

  // Локализация результата
  const getLocalizedResult = (result) => {
    if (result === "-") return "-";
    const [number] = result.split(" ");
    return `${number} ${t.leads}`;
  };

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
                ${getLocalizedStatus(campaign.status) === t.active 
                  ? "bg-green-50 text-green-600" 
                  : "bg-red-50 text-red-500"}`}
              >
                {getLocalizedStatus(campaign.status) === t.active ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <XCircle className="w-3 h-3" />
                )}
                {getLocalizedStatus(campaign.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">{t.result}</p>
                <p className="font-medium text-gray-900">{getLocalizedResult(campaign.result)}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t.reach}</p>
                <p className="font-medium text-gray-900">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t.leadCost}</p>
                <p className="font-medium text-gray-900">{campaign.leadCost}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t.qualAmount}</p>
                <p className="font-medium text-gray-900">{campaign.qualAmount}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">{t.qualCost}</p>
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
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-lg min-w-[1200px]">
          <table className="table-auto w-full">
            <thead className="bg-blue-50/50 text-blue-900 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">{t.campaignName}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t.status}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t.result}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t.reach}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t.leadCost}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t.qualAmount}</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">{t.qualCost}</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr key={index} className="border-t border-blue-50/30 hover:bg-blue-50/30 transition-all">
                  <td className="px-6 py-4 text-sm text-gray-800">{campaign.name}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      {getLocalizedStatus(campaign.status) === t.active ? (
                        <CheckCircle className="text-green-500 w-5 h-5" />
                      ) : (
                        <XCircle className="text-red-500 w-5 h-5" />
                      )}
                      <span className={`font-medium ${
                        getLocalizedStatus(campaign.status) === t.active ? "text-green-600" : "text-red-500"
                      }`}>
                        {getLocalizedStatus(campaign.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-800">{getLocalizedResult(campaign.result)}</td>
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
