"use client"

import { useState, useEffect } from "react"
import DateDetailsModal from "./DateDetailsModal"
import { gujaratiMonths, getZodiacSign, getGujaratiDate, getPanchangData, getFestivalData } from "../utils/calendarData"

const GujaratiCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [calendarDates, setCalendarDates] = useState([])
  const [todayPanchang, setTodayPanchang] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    generateCalendarDates()
    loadTodayPanchang()
  }, [currentDate])

  const generateCalendarDates = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
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

  const loadTodayPanchang = async () => {
    setLoading(true)
    try {
      const today = new Date()
      const panchangData = await getPanchangData(today)
      setTodayPanchang(panchangData)
    } catch (error) {
      console.error("Error loading today panchang:", error)
    } finally {
      setLoading(false)
    }
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const navigateYear = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setFullYear(currentDate.getFullYear() + direction)
    setCurrentDate(newDate)
  }

  const handleDateClick = (date) => {
    setSelectedDate(date)
    setShowModal(true)
  }

  const isToday = (date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const gujaratiMonth = gujaratiMonths[currentDate.getMonth()]

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header">
        <div className="header-content">
          <div className="header-icon">📅</div>
          <div className="header-text">
            <h1 className="header-title gujarati-text">ગુજરાતી કેલેન્ડર</h1>
            <p className="header-subtitle">Gujarati Calendar</p>
          </div>
        </div>
      </div>

      {/* Navigation - Mobile Responsive */}
      <div className="calendar-nav">
        {/* Left Navigation */}
        <div className="nav-section">
          <button className="nav-btn nav-year-btn" onClick={() => navigateYear(-1)}>
            ← Year
          </button>
          <button className="nav-btn nav-month-btn" onClick={() => navigateMonth(-1)}>
            ← Month
          </button>
        </div>

        {/* Center Content */}
        <div className="nav-center">
          <h2 className="current-month gujarati-text">{gujaratiMonth}</h2>
          <h3 className="current-year">{currentDate.getFullYear()}</h3>
          <p className="current-day">{currentDate.toLocaleDateString("en-US", { weekday: "long" })}</p>
        </div>

        {/* Right Navigation */}
        <div className="nav-section">
          <button className="nav-btn nav-year-btn" onClick={() => navigateYear(1)}>
            Year →
          </button>
          <button className="nav-btn nav-month-btn" onClick={() => navigateMonth(1)}>
            Month →
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="calendar-wrapper">
        {/* Days Header */}
        <div className="days-header">
          {[
            { en: "Sun", gu: "રવિ" },
            { en: "Mon", gu: "સોમ" },
            { en: "Tue", gu: "મંગળ" },
            { en: "Wed", gu: "બુધ" },
            { en: "Thu", gu: "ગુરુ" },
            { en: "Fri", gu: "શુક્ર" },
            { en: "Sat", gu: "શનિ" },
          ].map((day, index) => (
            <div key={day.en} className={`day-header ${index === 0 ? "sunday" : ""}`}>
              <div className="day-gujarati gujarati-text">{day.gu}</div>
              <div className="day-english">{day.en}</div>
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {calendarDates.map((date, index) => (
            <CalendarDateCell
              key={index}
            
              isToday={isToday(date)}
              isCurrentMonth={isCurrentMonth(date)}
              onClick={() => handleDateClick(date)}
            />
          ))}
        </div>
      </div>

      {/* Info Cards */}
      <div className="info-cards">
        <div className="info-card today-card">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <h4 className="gujarati-text">આજની તારીખ</h4>
            <p className="card-value">{getGujaratiDate(new Date()).split(",")[1]}</p>
          </div>
        </div>

        <div className="info-card zodiac-card">
          <div className="card-icon">⭐</div>
          <div className="card-content">
            <h4 className="gujarati-text">રાશિ</h4>
            <p className="card-value">{getZodiacSign(new Date()).split(" ")[0]}</p>
          </div>
        </div>

        <div className="info-card panchang-card">
          <div className="card-icon">☀️</div>
          <div className="card-content">
            <h4 className="gujarati-text">પંચાંગ</h4>
            <p className="card-value">{todayPanchang?.tithi || "Loading..."}</p>
          </div>
        </div>
      </div>

      {/* Date Details Modal */}
      {showModal && selectedDate && (
        <DateDetailsModal date={selectedDate} isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  )
}

// Calendar Date Cell Component
const CalendarDateCell = ({ date, isToday, isCurrentMonth, onClick }) => {
  const [festival, setFestival] = useState(null)

  useEffect(() => {
    const loadFestival = async () => {
      try {
        const festivalData = await getFestivalData(date)
        setFestival(festivalData)
      } catch (error) {
        console.error("Error loading festival:", error)
      }
    }
    loadFestival()
  }, [date])

  return (
    <div
      onClick={onClick}
      className={`calendar-cell ${isToday ? "today" : ""} ${!isCurrentMonth ? "other-month" : ""} ${festival ? "has-festival" : ""}`}
    >
      {/* Date Number - Always visible */}
      <div className="date-number">{date.getDate()}</div>

      {/* Mobile: Only festival dot */}
      {festival && <div className="festival-dot-mobile"></div>}

      {/* Desktop: Only festival indicator, no stars or day names */}
      <div className="desktop-only">
        <div className="date-indicators">{festival && <div className="festival-indicator">🎉</div>}</div>
      </div>
    </div>
  )
}

export default GujaratiCalendar
