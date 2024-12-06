import React from "react";
import { CheckCircle, XCircle, Info } from "lucide-react";

const CampaignsTable = ({ campaigns }) => {
  // Определяем, является ли устройство мобильным
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    // Мобильный вид в виде карточек
    return (
      <div className="space-y-4 px-">
        {campaigns.map((campaign, index) => (
          <div 
            key={index}
            className="bg-white/80 backdrop-blur p-4 rounded-xl shadow-sm border border-gray-100/50"
          >
            {/* Заголовок карточки */}
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
                {campaign.status}
              </div>
            </div>

            {/* Основная информация */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs mb-1">Результат</p>
                <p className="font-medium text-gray-900">{campaign.result}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Охоплення</p>
                <p className="font-medium text-gray-900">{campaign.reach}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Частотність</p>
                <p className="font-medium text-gray-900">{campaign.frequency}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Ціна</p>
                <div className="flex items-center gap-1">
                  <p className="font-medium text-gray-900">{campaign.cost}</p>
                  <Info className="w-3 h-3 text-blue-400" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Десктопный вид (оставляем как есть)
  return (
    <div className="container mx-auto" style={{ paddingRight: 0, paddingLeft: 0 }}>
      <div className="overflow-x-auto -mx-4 sm:mx-0"> {/* Отрицательные отступы на мобильных */}
        <div className="bg-white/80 backdrop-blur shadow-lg rounded-lg min-w-[800px]"> {/* Минимальная ширина для прокрутки */}
          <table className="table-auto w-full">
            <thead className="bg-blue-50/50 text-blue-900 sticky top-0 z-10">
              <tr>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">
                  Назва кампанії
                </th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                  Статус
                </th>
                <th className="px-3 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold">
                  Атрибуція
                </th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                  Результат
                </th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                  Охоплення
                </th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                  Частотнисть
                </th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm font-semibold">
                  Ціна
                </th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr
                  key={index}
                  className={`border-t border-blue-50/30 hover:bg-blue-50/30 transition-all`}
                >
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-800">
                    {campaign.name}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-center">
                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                      {campaign.status === "Активно" ? (
                        <CheckCircle className="text-green-500 w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <XCircle className="text-red-500 w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          campaign.status === "Активно"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700">
                    {campaign.attribution}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-800">
                    {campaign.result}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-800">
                    {campaign.reach}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-800">
                    {campaign.frequency}
                  </td>
                  <td className="px-2 sm:px-6 py-3 sm:py-4 text-center text-xs sm:text-sm text-gray-800">
                    <div className="flex justify-center items-center gap-1 sm:gap-2">
                      {campaign.cost}
                      <Info className="text-blue-400 w-3 h-3 sm:w-4 sm:h-4 cursor-pointer hover:text-blue-600 transition-colors" />
                    </div>
                  </td>
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
