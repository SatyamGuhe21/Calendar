// Enhanced Gujarati Calendar Data with Real API Integration
import { fetchRealPanchangData, fetchRealHoroscope, fetchRealFestivalData } from "./astroAPI"

export const gujaratiMonths = [
  "જાન્યુઆરી",
  "ફેબ્રુઆરી",
  "માર્ચ",
  "એપ્રિલ",
  "મે",
  "જૂન",
  "જુલાઈ",
  "ઓગસ્ટ",
  "સપ્ટેમ્બર",
  "ઓક્ટોબર",
  "નવેમ્બર",
  "ડિસેમ્બર",
]

export const gujaratiMonthsEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export const gujaratiDays = ["રવિવાર", "સોમવાર", "મંગળવાર", "બુધવાર", "ગુરુવાર", "શુક્રવાર", "શનિવાર"]

// Enhanced festivals with real data
export const festivals = {
  "1-1": {
    name: "નવું વર્ષ",
    nameEn: "New Year",
    description: "New Year Day - નવા વર્ષની શરૂઆત",
    type: "National",
    significance: "નવા સંકલ્પો અને આશાઓનો દિવસ",
    rituals: "મંદિર દર્શન, પ્રાર્થના, મિત્રો સાથે ઉજવણી",
  },
  "26-1": {
    name: "ગણતંત્ર દિવસ",
    nameEn: "Republic Day",
    description: "Republic Day - ભારતનો ગણતંત્ર દિવસ",
    type: "National",
    significance: "ભારતીય બંધારણ અમલમાં આવ્યાનો દિવસ",
    rituals: "ધ્વજારોહણ, પરેડ જોવી, દેશભક્તિ ગીતો",
  },
  "14-2": {
    name: "વેલેન્ટાઇન ડે",
    nameEn: "Valentine's Day",
    description: "Valentine's Day - પ્રેમ દિવસ",
    type: "International",
    significance: "પ્રેમ અને સ્નેહની અભિવ્યક્તિનો દિવસ",
    rituals: "ભેટ આપવી, પ્રેમ પત્ર લખવા",
  },
  "21-2": {
    name: "મહાશિવરાત્રિ",
    nameEn: "Maha Shivratri",
    description: "Great night of Lord Shiva - ભગવાન શિવની મહાન રાત્રિ",
    type: "Religious",
    significance: "ભગવાન શિવની આરાધનાનો પવિત્ર દિવસ",
    rituals: "ઉપવાસ, શિવલિંગ પૂજા, રાત્રિ જાગરણ",
  },
  "8-3": {
    name: "હોળી",
    nameEn: "Holi",
    description: "Festival of Colors - રંગોનો ત્યોહાર",
    type: "Religious",
    significance: "બુરાઈ પર સારાઈની જીત, વસંત ઋતુનું સ્વાગત",
    rituals: "હોળિકા દહન, રંગ રમવા, ગુજિયા ખાવા",
  },
  "14-4": {
    name: "વૈશાખી",
    nameEn: "Vaisakhi",
    description: "Harvest Festival - પાક ઉત્સવ",
    type: "Religious",
    significance: "નવા વર્ષની શરૂઆત, પાકની કાપણી",
    rituals: "ગુરુદ્વારા જવું, કીર્તન સાંભળવું",
  },
  "15-8": {
    name: "સ્વતંત્રતા દિવસ",
    nameEn: "Independence Day",
    description: "Independence Day - સ્વતંત્રતા દિવસ",
    type: "National",
    significance: "ભારતની આઝાદીનો દિવસ",
    rituals: "ધ્વજારોહણ, દેશભક્તિ કાર્યક્રમો",
  },
  "19-8": {
    name: "જન્માષ્ટમી",
    nameEn: "Janmashtami",
    description: "Birth of Lord Krishna - ભગવાન કૃષ્ણનો જન્મદિવસ",
    type: "Religious",
    significance: "ભગવાન કૃષ્ણના જન્મની ઉજવણી",
    rituals: "ઉપવાસ, કૃષ્ણ પૂજા, દહીહાંડી, ભજન-કીર્તન",
  },
  "2-10": {
    name: "ગાંધી જયંતી",
    nameEn: "Gandhi Jayanti",
    description: "Gandhi Jayanti - મહાત્મા ગાંધીની જયંતી",
    type: "National",
    significance: "રાષ્ટ્રપિતા મહાત્મા ગાંધીનો જન્મદિવસ",
    rituals: "પ્રાર્થના સભા, અહિંસાનો સંદેશ",
  },
  "7-10": {
    name: "નવરાત્રિ શરૂ",
    nameEn: "Navratri Begins",
    description: "Nine Nights Festival - નવ રાત્રિનો ત્યોહાર",
    type: "Religious",
    significance: "માતાજીની આરાધના અને શક્તિ પૂજા",
    rituals: "ગરબા, ડાંડિયા, ઉપવાસ, માતાજીની આરતી",
  },
  "15-10": {
    name: "દશેરા",
    nameEn: "Dussehra",
    description: "Victory of Good over Evil - સત્યની અસત્ય પર જીત",
    type: "Religious",
    significance: "રામ-રાવણ યુદ્ધમાં રામની જીત",
    rituals: "રાવણ દહન, રામલીલા, વિજયાદશમી પૂજા",
  },
  "24-10": {
    name: "દિવાળી",
    nameEn: "Diwali",
    description: "Festival of Lights - પ્રકાશનો ત્યોહાર",
    type: "Religious",
    significance: "અંધકાર પર પ્રકાશની જીત, લક્ષ્મી પૂજા",
    rituals: "દીવા પ્રગટાવવા, લક્ષ્મી પૂજા, મિઠાઈ વહેંચવી, પટાકા",
  },
  "12-11": {
    name: "ભાઈ બીજ",
    nameEn: "Bhai Beej",
    description: "Brother-Sister Festival - ભાઈ-બહેનનો ત્યોહાર",
    type: "Religious",
    significance: "ભાઈ-બહેનના પ્રેમની ઉજવણી",
    rituals: "તિલક લગાવવો, આરતી ઉતારવી, ભેટ આપવી",
  },
  "25-12": {
    name: "ક્રિસમસ",
    nameEn: "Christmas",
    description: "Christmas Day - ખ્રિસ્તમસ દિવસ",
    type: "Religious",
    significance: "ઈસુ ખ્રિસ્તના જન્મની ઉજવણી",
    rituals: "ચર્ચ જવું, પ્રાર્થના, ક્રિસમસ ટ્રી, ભેટ આપવી",
  },
}

// Real API integration functions
export const getPanchangData = async (date) => {
  try {
    // Fetch real panchang data from API
    const realData = await fetchRealPanchangData(date)
    return realData
  } catch (error) {
    console.error("Error fetching panchang data:", error)
    // Fallback to calculated data
    return getCalculatedPanchangData(date)
  }
}

export const getHoroscopeData = async (zodiacSign) => {
  try {
    // Fetch real horoscope data from API
    const realHoroscope = await fetchRealHoroscope(zodiacSign)
    return realHoroscope
  } catch (error) {
    console.error("Error fetching horoscope data:", error)
    // Fallback to static data
    return getStaticHoroscopeData(zodiacSign)
  }
}

export const getFestivalData = async (date) => {
  try {
    // Try to fetch real festival data
    const realFestival = await fetchRealFestivalData(date)
    if (realFestival) return realFestival

    // Fallback to static data
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}`
    return festivals[dateStr] || null
  } catch (error) {
    console.error("Error fetching festival data:", error)
    const dateStr = `${date.getDate()}-${date.getMonth() + 1}`
    return festivals[dateStr] || null
  }
}

// Keep existing functions for backward compatibility
export const getGujaratiDate = (date) => {
  const day = gujaratiDays[date.getDay()]
  const dateNum = date.getDate()
  const month = gujaratiMonths[date.getMonth()]
  return `${day}, ${dateNum} ${month}`
}

export const getZodiacSign = (date) => {
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "મેષ (Aries)"
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "વૃષભ (Taurus)"
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "મિથુન (Gemini)"
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "કર્ક (Cancer)"
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "સિંહ (Leo)"
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "કન્યા (Virgo)"
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "તુલા (Libra)"
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "વૃશ્ચિક (Scorpio)"
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "ધનુ (Sagittarius)"
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "મકર (Capricorn)"
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "કુંભ (Aquarius)"
  return "મીન (Pisces)"
}

export const getZodiacDetails = async (zodiacSign) => {
  try {
    // Fetch real horoscope data
    const horoscopeData = await getHoroscopeData(zodiacSign)

    // Enhanced zodiac details with real data
    const zodiacData = {
      "મેષ (Aries)": {
        symbol: "♈",
        element: "Fire",
        planet: "Mars",
        luckyColor: horoscopeData.luckyColor || "Red",
        luckyNumber: horoscopeData.luckyNumber || "9",
        traits: "Energetic, confident, and pioneering",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "વૃષભ (Taurus)": {
        symbol: "♉",
        element: "Earth",
        planet: "Venus",
        luckyColor: horoscopeData.luckyColor || "Green",
        luckyNumber: horoscopeData.luckyNumber || "6",
        traits: "Reliable, patient, and practical",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "મિથુન (Gemini)": {
        symbol: "♊",
        element: "Air",
        planet: "Mercury",
        luckyColor: horoscopeData.luckyColor || "Yellow",
        luckyNumber: horoscopeData.luckyNumber || "5",
        traits: "Adaptable, curious, and communicative",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "કર્ક (Cancer)": {
        symbol: "♋",
        element: "Water",
        planet: "Moon",
        luckyColor: horoscopeData.luckyColor || "Silver",
        luckyNumber: horoscopeData.luckyNumber || "2",
        traits: "Emotional, nurturing, and intuitive",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "સિંહ (Leo)": {
        symbol: "♌",
        element: "Fire",
        planet: "Sun",
        luckyColor: horoscopeData.luckyColor || "Gold",
        luckyNumber: horoscopeData.luckyNumber || "1",
        traits: "Confident, generous, and dramatic",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "કન્યા (Virgo)": {
        symbol: "♍",
        element: "Earth",
        planet: "Mercury",
        luckyColor: horoscopeData.luckyColor || "Navy Blue",
        luckyNumber: horoscopeData.luckyNumber || "6",
        traits: "Analytical, practical, and perfectionist",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "તુલા (Libra)": {
        symbol: "♎",
        element: "Air",
        planet: "Venus",
        luckyColor: horoscopeData.luckyColor || "Pink",
        luckyNumber: horoscopeData.luckyNumber || "7",
        traits: "Diplomatic, balanced, and social",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "વૃશ્ચિક (Scorpio)": {
        symbol: "♏",
        element: "Water",
        planet: "Mars/Pluto",
        luckyColor: horoscopeData.luckyColor || "Deep Red",
        luckyNumber: horoscopeData.luckyNumber || "8",
        traits: "Intense, mysterious, and transformative",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "ધનુ (Sagittarius)": {
        symbol: "♐",
        element: "Fire",
        planet: "Jupiter",
        luckyColor: horoscopeData.luckyColor || "Purple",
        luckyNumber: horoscopeData.luckyNumber || "3",
        traits: "Adventurous, optimistic, and philosophical",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "મકર (Capricorn)": {
        symbol: "♑",
        element: "Earth",
        planet: "Saturn",
        luckyColor: horoscopeData.luckyColor || "Brown",
        luckyNumber: horoscopeData.luckyNumber || "10",
        traits: "Ambitious, disciplined, and practical",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "કુંભ (Aquarius)": {
        symbol: "♒",
        element: "Air",
        planet: "Saturn/Uranus",
        luckyColor: horoscopeData.luckyColor || "Blue",
        luckyNumber: horoscopeData.luckyNumber || "11",
        traits: "Independent, innovative, and humanitarian",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
      "મીન (Pisces)": {
        symbol: "♓",
        element: "Water",
        planet: "Jupiter/Neptune",
        luckyColor: horoscopeData.luckyColor || "Sea Green",
        luckyNumber: horoscopeData.luckyNumber || "12",
        traits: "Compassionate, artistic, and intuitive",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      },
    }

    return (
      zodiacData[zodiacSign] || {
        symbol: "",
        element: "Unknown",
        planet: "Unknown",
        luckyColor: horoscopeData.luckyColor || "White",
        luckyNumber: horoscopeData.luckyNumber || "1",
        traits: "Unique and special",
        prediction: horoscopeData.prediction,
        mood: horoscopeData.mood,
        compatibility: horoscopeData.compatibility,
      }
    )
  } catch (error) {
    console.error("Error getting zodiac details:", error)
    return getStaticZodiacDetails(zodiacSign)
  }
}

// Fallback static functions
const getCalculatedPanchangData = (date) => {
  const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))

  const tithis = [
    "પ્રતિપદા",
    "દ્વિતીયા",
    "તૃતીયા",
    "ચતુર્થી",
    "પંચમી",
    "ષષ્ઠી",
    "સપ્તમી",
    "અષ્ટમી",
    "નવમી",
    "દશમી",
    "એકાદશી",
    "દ્વાદશી",
    "ત્રયોદશી",
    "ચતુર્દશી",
    "પૂર્ણિમા/અમાવસ્યા",
  ]

  const nakshatras = [
    "અશ્વિની",
    "ભરણી",
    "કૃત્તિકા",
    "રોહિણી",
    "મૃગશિરા",
    "આર્દ્રા",
    "પુનર્વસુ",
    "પુષ્ય",
    "આશ્લેષા",
    "મઘા",
    "પૂર્વા ફાલ્ગુની",
    "ઉત્તર��� ફાલ્ગુની",
    "હસ્ત",
    "ચિત્રા",
    "સ્વાતી",
    "વિશાખા",
    "અનુરાધા",
    "જ્યેષ્ઠા",
    "મૂળ",
    "પૂર્વાષાઢા",
    "ઉત્તરાષાઢા",
    "શ્રવણ",
    "ધનિષ્ઠા",
    "શતભિષા",
    "પૂર્વા ભાદ્રપદ",
    "ઉત્તરા ભાદ્રપદ",
    "રેવતી",
  ]

  return {
    tithi: tithis[dayOfYear % tithis.length],
    nakshatra: nakshatras[dayOfYear % nakshatras.length],
    yoga: "સૌભાગ્ય",
    karana: "બવ",
    sunrise: "6:30 AM",
    sunset: "6:45 PM",
    rahuKaal: "4:30 PM - 6:00 PM",
    gulikKaal: "3:00 PM - 4:30 PM",
  }
}

const getStaticHoroscopeData = (zodiacSign) => {
  // Static fallback horoscope data
  return {
    prediction: "આજ તમારા માટે શુભ દિવસ છે. સકારાત્મક વિચારો રાખો.",
    luckyNumber: Math.floor(Math.random() * 100),
    luckyColor: "Golden",
    mood: "Positive",
    compatibility: "High",
  }
}

const getStaticZodiacDetails = (zodiacSign) => {
  // Static fallback zodiac details
  return {
    symbol: "⭐",
    element: "Unknown",
    planet: "Unknown",
    luckyColor: "White",
    luckyNumber: "1",
    traits: "Unique and special",
  }
}
