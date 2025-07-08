"use client"

import { useEffect, useState } from "react"
import { X, Calendar, Star, Sun, Moon, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getPanchangData,
  getFestivalData,
  getZodiacSign,
  getZodiacDetails,
  getGujaratiDate
} from "../utils/calendarData"

const DateDetailsModal = ({ date, isOpen, onClose }) => {
  const [festival, setFestival] = useState(null)
  const [panchangData, setPanchangData] = useState({})
  const [zodiacSign, setZodiacSign] = useState("")
  const [zodiacDetails, setZodiacDetails] = useState({})
  const [gujaratiDate, setGujaratiDate] = useState("")

  useEffect(() => {
    if (!isOpen || !date) return

    const loadData = async () => {
      setGujaratiDate(getGujaratiDate(date))
      const sign = getZodiacSign(date)
      setZodiacSign(sign)
      setZodiacDetails(getZodiacDetails(sign))
      setFestival(await getFestivalData(date))
      setPanchangData(await getPanchangData(date))
    }

    loadData()
  }, [date, isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl font-bold mb-2">
                  <Calendar className="w-8 h-8" />
                  <div className="flex flex-col">
                    <span className="gujarati-text">{gujaratiDate}</span>
                    <span className="text-lg font-medium text-orange-100">
                      {date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                </CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/20 rounded-full p-2"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Festival */}
          {festival && (
            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200 shadow-lg">
              <h3 className="text-2xl font-bold text-red-700 mb-4 flex items-center gap-3">
                <Star className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="gujarati-text">ત્યોહાર</span>
                  <span className="text-lg font-medium text-red-600">Festival</span>
                </div>
              </h3>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-red-100 text-red-700 px-4 py-2 text-base gujarati-text">
                    {festival.name}
                  </Badge>
                  <Badge variant="outline" className="border-red-300 text-red-600 px-3 py-1">
                    {festival.type}
                  </Badge>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-gray-700 font-medium">{festival.description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Panchang Details */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-200 shadow-lg">
            <h3 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-3">
              <Sun className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="gujarati-text">પંચાંગ</span>
                <span className="text-lg font-medium text-yellow-600">Panchang Details</span>
              </div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["tithi", "nakshatra", "yoga", "karana"].map((key) => (
                <div key={key} className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2 capitalize">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </h4>
                  <p className="text-lg font-semibold text-yellow-700">{panchangData[key]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Zodiac */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200 shadow-lg">
            <h3 className="text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
              <Moon className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="gujarati-text">રાશિ</span>
                <span className="text-lg font-medium text-purple-600">Zodiac Sign</span>
              </div>
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                <span className="text-4xl">{zodiacDetails.symbol}</span>
                <div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-4 py-2 text-lg mb-2">
                    {zodiacSign}
                  </Badge>
                  <p className="text-gray-600">{zodiacDetails.traits}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <InfoBox label="Element" value={zodiacDetails.element} />
                <InfoBox label="Planet" value={zodiacDetails.planet} />
                <InfoBox label="Lucky Color" value={zodiacDetails.luckyColor} />
                <InfoBox label="Lucky Number" value={zodiacDetails.luckyNumber} />
              </div>
            </div>
          </div>

          {/* Auspicious Times */}
          <div className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl border border-green-200 shadow-lg">
            <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <div className="flex flex-col">
                <span className="gujarati-text">શુભ સમય</span>
                <span className="text-lg font-medium text-green-600">Auspicious Times</span>
              </div>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["sunrise", "sunset", "rahuKaal", "gulikKaal"].map((key) => (
                <div key={key} className="bg-white p-4 rounded-xl shadow-sm">
                  <h4 className="font-bold text-gray-800 mb-2 capitalize">{key}</h4>
                  <p className="text-lg font-semibold text-green-700">
                    {panchangData[key] || "--"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const InfoBox = ({ label, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm text-center">
    <h4 className="font-bold text-gray-700 mb-2">{label}</h4>
    <p className="text-purple-600 font-semibold">{value}</p>
  </div>
)

export default DateDetailsModal
