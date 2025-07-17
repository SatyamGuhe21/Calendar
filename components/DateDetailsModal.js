"use client"

import { X, Calendar, Star, Sun, Moon, Clock, Edit3, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { festivals, getPanchangData, getZodiacSign, getGujaratiDate, getZodiacDetails } from "../lib/calendarData"

const DateDetailsModal = ({ date, isOpen, onClose }) => {
  const [note, setNote] = useState("")
  const [isEditingNote, setIsEditingNote] = useState(false)
  const [savedNotes, setSavedNotes] = useState({})
  const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`

  useEffect(() => {
    // Load saved notes from localStorage
    const storedNotes = localStorage.getItem("calendarNotes")
    if (storedNotes) {
      const parsedNotes = JSON.parse(storedNotes)
      setSavedNotes(parsedNotes)
      setNote(parsedNotes[dateKey] || "")
    }
  }, [dateKey])

  const handleSaveNote = () => {
    const updatedNotes = {
      ...savedNotes,
      [dateKey]: note,
    }
    setSavedNotes(updatedNotes)
    localStorage.setItem("calendarNotes", JSON.stringify(updatedNotes))
    setIsEditingNote(false)
  }

  const handleEditNote = () => {
    setIsEditingNote(true)
  }

  const festival = festivals[`${date.getDate()}-${date.getMonth() + 1}`]
  const panchangData = getPanchangData(date)
  const zodiacSign = getZodiacSign(date)
  const gujaratiDate = getGujaratiDate(date)
  const zodiacDetails = getZodiacDetails(zodiacSign)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-orange-600 via-red-500 to-pink-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
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
                        day: "numeric",
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
          {/* Festival Information */}
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

          {/* Notes Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-blue-700 flex items-center gap-3">
                <Edit3 className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="gujarati-text">નોંધ</span>
                  <span className="text-lg font-medium text-blue-600">Personal Notes</span>
                </div>
              </h3>
              {!isEditingNote && (
                <Button
                  onClick={handleEditNote}
                  variant="outline"
                  size="sm"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  {note ? "Edit" : "Add Note"}
                </Button>
              )}
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm">
              {isEditingNote ? (
                <div className="space-y-4">
                  <Textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add your personal notes for this date..."
                    className="min-h-[120px] resize-none border-blue-200 focus:border-blue-400"
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      onClick={() => {
                        setNote(savedNotes[dateKey] || "")
                        setIsEditingNote(false)
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveNote} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Note
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="min-h-[60px] flex items-center">
                  {note ? (
                    <p className="text-gray-700 whitespace-pre-wrap">{note}</p>
                  ) : (
                    <p className="text-gray-400 italic">No notes added for this date</p>
                  )}
                </div>
              )}
            </div>
          </div>

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
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">તિથિ</span>
                  <span className="text-sm text-gray-600">Tithi (Lunar Day)</span>
                </h4>
                <p className="text-lg font-semibold text-yellow-700">{panchangData.tithi}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">નક્ષત્ર</span>
                  <span className="text-sm text-gray-600">Nakshatra (Star)</span>
                </h4>
                <p className="text-lg font-semibold text-yellow-700">{panchangData.nakshatra}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">યોગ</span>
                  <span className="text-sm text-gray-600">Yoga</span>
                </h4>
                <p className="text-lg font-semibold text-yellow-700">{panchangData.yoga}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">કરણ</span>
                  <span className="text-sm text-gray-600">Karana</span>
                </h4>
                <p className="text-lg font-semibold text-yellow-700">{panchangData.karana}</p>
              </div>
            </div>
          </div>

          {/* Zodiac Information */}
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
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2">Element</h4>
                  <p className="text-purple-600 font-semibold">{zodiacDetails.element}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2">Planet</h4>
                  <p className="text-purple-600 font-semibold">{zodiacDetails.planet}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2">Lucky Color</h4>
                  <p className="text-purple-600 font-semibold">{zodiacDetails.luckyColor}</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm text-center">
                  <h4 className="font-bold text-gray-700 mb-2">Lucky Number</h4>
                  <p className="text-purple-600 font-semibold">{zodiacDetails.luckyNumber}</p>
                </div>
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
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">સૂર્યોદય</span>
                  <span className="text-sm text-gray-600">Sunrise</span>
                </h4>
                <p className="text-lg font-semibold text-green-700">{panchangData.sunrise}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">સૂર્યાસ્ત</span>
                  <span className="text-sm text-gray-600">Sunset</span>
                </h4>
                <p className="text-lg font-semibold text-green-700">{panchangData.sunset}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">રાહુકાળ</span>
                  <span className="text-sm text-gray-600">Rahu Kaal (Inauspicious Time)</span>
                </h4>
                <p className="text-lg font-semibold text-red-600">{panchangData.rahuKaal}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <h4 className="font-bold text-gray-800 mb-2 flex flex-col">
                  <span className="gujarati-text text-lg">ગુલિક કાળ</span>
                  <span className="text-sm text-gray-600">Gulik Kaal</span>
                </h4>
                <p className="text-lg font-semibold text-red-600">{panchangData.gulikKaal}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DateDetailsModal
