"use client"
import { festivals, getPanchangData, getZodiacSign, getGujaratiDate, getZodiacDetails } from "../utils/calendarData"

const DateDetailsModal = ({ date, isOpen, onClose }) => {
  if (!isOpen) return null

  const festival = festivals[`${date.getDate()}-${date.getMonth() + 1}`]
  const panchangData = getPanchangData(date)
  const zodiacSign = getZodiacSign(date)
  const gujaratiDate = getGujaratiDate(date)
  const zodiacDetails = getZodiacDetails(zodiacSign)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
      <div className="card w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-content">
        <div className="card-header bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white relative overflow-hidden modal-header">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="flex-1 pr-4">
                <h2 className="card-title flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-xl sm:text-2xl md:text-3xl font-bold mb-2 modal-title">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div className="flex flex-col">
                    <span className="gujarati-text text-base sm:text-lg md:text-xl">{gujaratiDate}</span>
                    <span className="text-sm sm:text-base md:text-lg font-medium text-orange-100">
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </h2>
              </div>
              <button className="button button-ghost text-white rounded-full p-2" onClick={onClose}>
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="card-content p-4 sm:p-6 space-y-4 sm:space-y-6 modal-body">
          {/* Festival Information */}
          {festival && (
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 sm:p-6 rounded-2xl border border-red-200 shadow-lg">
              <h3 className="text-xl sm:text-2xl font-bold text-red-700 mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <div className="flex flex-col">
                  <span className="gujarati-text">ત્યોહાર</span>
                  <span className="text-base sm:text-lg font-medium text-red-600">Festival</span>
                </div>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  <span className="badge badge-secondary bg-red-100 text-red-700 px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base gujarati-text">
                    {festival.name}
                  </span>
                  <span className="badge badge-outline border-red-300 text-red-600 px-2 sm:px-3 py-1 text-xs sm:text-sm">
                    {festival.type}
                  </span>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-xl">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">{festival.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Panchang Details */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 sm:p-6 rounded-2xl border border-yellow-200 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-700 mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="flex flex-col">
                <span className="gujarati-text">પંચાંગ</span>
                <span className="text-base sm:text-lg font-medium text-yellow-600">Panchang Details</span>
              </div>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 modal-grid">
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">તિથિ</span>
                  <span className="text-xs sm:text-sm text-gray-600">Tithi (Lunar Day)</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-yellow-700">{panchangData.tithi}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">નક્ષત્ર</span>
                  <span className="text-xs sm:text-sm text-gray-600">Nakshatra (Star)</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-yellow-700">{panchangData.nakshatra}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">યોગ</span>
                  <span className="text-xs sm:text-sm text-gray-600">Yoga</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-yellow-700">{panchangData.yoga}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">કરણ</span>
                  <span className="text-xs sm:text-sm text-gray-600">Karana</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-yellow-700">{panchangData.karana}</p>
              </div>
            </div>
          </div>

          {/* Zodiac Information */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 rounded-2xl border border-purple-200 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
              <div className="flex flex-col">
                <span className="gujarati-text">રાશિ</span>
                <span className="text-base sm:text-lg font-medium text-purple-600">Zodiac Sign</span>
              </div>
            </h3>
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <span className="text-3xl sm:text-4xl">{zodiacDetails.symbol}</span>
                <div className="flex-1">
                  <span className="badge badge-secondary bg-purple-100 text-purple-700 px-3 sm:px-4 py-1 sm:py-2 text-base sm:text-lg mb-2 block w-fit">
                    {zodiacSign}
                  </span>
                  <p className="text-gray-600 text-sm sm:text-base">{zodiacDetails.traits}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 modal-grid-4">
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm sm:text-base">Element</h4>
                  <p className="text-purple-600 font-semibold text-sm sm:text-base">{zodiacDetails.element}</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm sm:text-base">Planet</h4>
                  <p className="text-purple-600 font-semibold text-sm sm:text-base">{zodiacDetails.planet}</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm sm:text-base">Lucky Color</h4>
                  <p className="text-purple-600 font-semibold text-sm sm:text-base">{zodiacDetails.luckyColor}</p>
                </div>
                <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm sm:text-base">Lucky Number</h4>
                  <p className="text-purple-600 font-semibold text-sm sm:text-base">{zodiacDetails.luckyNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auspicious Times */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 sm:p-6 rounded-2xl border border-green-200 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-green-700 mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex flex-col">
                <span className="gujarati-text">શુભ સમય</span>
                <span className="text-base sm:text-lg font-medium text-green-600">Auspicious Times</span>
              </div>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 modal-grid-2">
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">સૂર્યોદય</span>
                  <span className="text-xs sm:text-sm text-gray-600">Sunrise</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-green-700">{panchangData.sunrise}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">સૂર્યાસ્ત</span>
                  <span className="text-xs sm:text-sm text-gray-600">Sunset</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-green-700">{panchangData.sunset}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">રાહુકાળ</span>
                  <span className="text-xs sm:text-sm text-gray-600">Rahu Kaal (Inauspicious Time)</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-red-600">{panchangData.rahuKaal}</p>
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-base sm:text-lg">ગુલિક કાળ</span>
                  <span className="text-xs sm:text-sm text-gray-600">Gulik Kaal</span>
                </h4>
                <p className="text-base sm:text-lg font-semibold text-red-600">{panchangData.gulikKaal}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateDetailsModal
