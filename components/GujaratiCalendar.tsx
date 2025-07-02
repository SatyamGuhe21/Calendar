"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Calendar, Star, Sun, Moon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import DateDetailsModal from "./DateDetailsModal"
import { gujaratiMonths, festivals, getZodiacSign, getGujaratiDate } from "@/lib/calendarData"

const GujaratiCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [calendarDates, setCalendarDates] = useState<Date[]>([])

  useEffect(() => {
    generateCalendarDates()
  }, [currentDate])

  const generateCalendarDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const dates = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      dates.push(date)
    }
    setCalendarDates(dates)
  }

  const navigateMonth = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const navigateYear = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(currentDate.getFullYear() + direction)
    setCurrentDate(newDate)
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setShowModal(true)
  }

  const getFestivalForDate = (date: Date) => {
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}`
    return festivals[dateStr] || null
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const gujaratiMonth = gujaratiMonths[currentDate.getMonth()]

  const getPanchangData = (date: Date) => {
    // Placeholder for Panchang data retrieval logic
    // Replace this with your actual implementation
    return {
      tithi: "Ekadashi", // Example tithi value
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-red-500 to-pink-600 rounded-2xl shadow-2xl mb-8">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <CardHeader className="relative z-10 text-center py-12">
          <CardTitle className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Calendar className="w-10 h-10 md:w-12 md:h-12" />
            <div className="flex flex-col">
              <span className="gujarati-text">ગુજરાતી કેલેન્ડર</span>
              <span className="text-2xl md:text-3xl font-medium text-orange-100">Gujarati Calendar</span>
            </div>
          </CardTitle>
          <p className="text-lg text-orange-100 max-w-2xl mx-auto">
            Traditional Gujarati Calendar with Festivals, Panchang & Zodiac Details
            <br />
            <span className="gujarati-text text-base">ત્યોહારો, પંચાંગ અને રાશિ વિગતો સાથે પરંપરાગત ગુજરાતી કેલેન્ડર</span>
          </p>
        </CardHeader>
      </div>

      {/* Navigation */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateYear(-1)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Year
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateMonth(-1)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Month
              </Button>
            </div>

            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent gujarati-text">
                {gujaratiMonth}
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-1">
                {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </h3>
              <p className="text-sm text-gray-500">{currentDate.toLocaleDateString("en-US", { weekday: "long" })}</p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateMonth(1)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600 shadow-lg"
              >
                Month
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigateYear(1)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:from-orange-600 hover:to-red-600 shadow-lg"
              >
                Year
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
        <CardContent className="p-8">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-3 mb-6">
            {[
              { en: "Sun", gu: "રવિ" },
              { en: "Mon", gu: "સોમ" },
              { en: "Tue", gu: "મંગળ" },
              { en: "Wed", gu: "બુધ" },
              { en: "Thu", gu: "ગુરુ" },
              { en: "Fri", gu: "શુક્ર" },
              { en: "Sat", gu: "શનિ" },
            ].map((day, index) => (
              <div
                key={day.en}
                className={`text-center font-bold py-4 rounded-xl ${
                  index === 0
                    ? "bg-gradient-to-br from-red-500 to-pink-500 text-white shadow-lg"
                    : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700"
                }`}
              >
                <div className="gujarati-text text-lg">{day.gu}</div>
                <div className="text-sm">{day.en}</div>
              </div>
            ))}
          </div>

          {/* Calendar Dates */}
          <div className="grid grid-cols-7 gap-3">
            {calendarDates.map((date, index) => {
              const festival = getFestivalForDate(date)
              const gujaratiDate = getGujaratiDate(date)
              const zodiac = getZodiacSign(date)

              return (
                <div
                  key={index}
                  onClick={() => handleDateClick(date)}
                  className={`
                    relative min-h-[100px] p-3 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl calendar-date
                    ${
                      isCurrentMonth(date)
                        ? "bg-white shadow-md border border-gray-100"
                        : "bg-gray-50/50 text-gray-400 border border-gray-100"
                    }
                    ${
                      isToday(date)
                        ? "today-highlight ring-2 ring-orange-400 bg-gradient-to-br from-orange-50 to-yellow-50"
                        : ""
                    }
                    ${festival ? "festival-highlight bg-gradient-to-br from-red-50 to-pink-50 border-red-200" : ""}
                  `}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-xl font-bold ${
                          isToday(date) ? "text-orange-600" : isCurrentMonth(date) ? "text-gray-800" : "text-gray-400"
                        }`}
                      >
                        {date.getDate()}
                      </span>
                      {zodiac && (
                        <span className="text-lg" title={zodiac}>
                        
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-gray-600 mb-2 gujarati-text">{gujaratiDate.split(",")[0]}</div>

                    {festival && (
                      <div className="mb-2">
                        <Badge variant="secondary" className="text-xs bg-red-100 text-red-700 mb-1 gujarati-text">
                          {festival.name.length > 10 ? festival.name.substring(0, 10) + "..." : festival.name}
                        </Badge>
                        <div className="text-xs text-gray-600">
                          {festival.description.length > 15
                            ? festival.description.substring(0, 15) + "..."
                            : festival.description}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex gap-1">
                        {date.getDay() === 0 && <Sun className="w-3 h-3 text-orange-500" />}
                        {date.getDay() === 6 && <Moon className="w-3 h-3 text-blue-500" />}
                      </div>
                      <Star className="w-3 h-3 text-yellow-500" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Today's Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl">
          <CardContent className="p-6 text-center">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-100" />
            <h3 className="text-xl font-bold mb-2 gujarati-text">આજની તારીખ</h3>
            <h4 className="text-lg font-semibold mb-2">Today's Date</h4>
            <p className="text-2xl font-bold gujarati-text">{getGujaratiDate(new Date()).split(",")[1]}</p>
            <p className="text-orange-100">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0 shadow-xl">
          <CardContent className="p-6 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-purple-100" />
            <h3 className="text-xl font-bold mb-2 gujarati-text">રાશિ</h3>
            <h4 className="text-lg font-semibold mb-2">Zodiac Sign</h4>
            <p className="text-2xl font-bold">{getZodiacSign(new Date())}</p>
            <p className="text-purple-100 text-sm">Click any date for details</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white border-0 shadow-xl">
          <CardContent className="p-6 text-center">
            <Sun className="w-12 h-12 mx-auto mb-4 text-green-100" />
            <h3 className="text-xl font-bold mb-2 gujarati-text">પંચાંગ</h3>
            <h4 className="text-lg font-semibold mb-2">Panchang</h4>
            <p className="text-lg font-semibold">{getPanchangData(new Date()).tithi}</p>
            <p className="text-green-100 text-sm">Today's Tithi</p>
          </CardContent>
        </Card>
      </div>

      {/* Date Details Modal */}
      {showModal && selectedDate && (
        <DateDetailsModal date={selectedDate} isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

export default GujaratiCalendar
