import {
  fetchRealPanchangData,
  fetchRealHoroscope,
  fetchRealFestivalData
} from "./astroAPI"; // ⬅️ Make sure this path is correct

export const getPanchangData = async (date) => {
  try {
    return await fetchRealPanchangData(date);
  } catch (error) {
    console.error("Panchang error:", error);
    return {
      tithi: "N/A",
      nakshatra: "N/A",
      yoga: "N/A",
      karana: "N/A",
      sunrise: "--",
      sunset: "--",
      rahuKaal: "--",
      gulikKaal: "--"
    };
  }
};

export const getHoroscopeData = async (zodiacSign) => {
  try {
    return await fetchRealHoroscope(zodiacSign);
  } catch (error) {
    console.error("Horoscope error:", error);
    return {
      prediction: "Error",
      luckyNumber: "--",
      luckyColor: "--",
      mood: "--",
      compatibility: "--"
    };
  }
};

export const getFestivalData = async (date) => {
  try {
    return await fetchRealFestivalData(date);
  } catch (error) {
    console.error("Festival error:", error);
    return null;
  }
};

export const getGujaratiDate = (date) => {
  const gujaratiDays = ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"];
  const gujaratiMonths = [
    "જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન",
    "જુલાઈ", "ઓગસ્ટ", "સપ્ટેમ્બર", "ઓક્ટોબર", "નવેમ્બર", "ડિસેમ્બર"
  ];
  return `${gujaratiDays[date.getDay()]}, ${date.getDate()} ${gujaratiMonths[date.getMonth()]}`;
};

export const getZodiacSign = (date) => {
  const m = date.getMonth() + 1, d = date.getDate();
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "મેષ (Aries)";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "વૃષભ (Taurus)";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "મિથુન (Gemini)";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "કર્ક (Cancer)";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "સિંહ (Leo)";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "કન્યા (Virgo)";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "તુલા (Libra)";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "વૃશ્ચિક (Scorpio)";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "ધનુ (Sagittarius)";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "મકર (Capricorn)";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "કુંભ (Aquarius)";
  return "મીન (Pisces)";
};

export const getZodiacDetails = (sign) => {
  const data = {
    "મેષ (Aries)": { symbol: "♈", element: "Fire", planet: "Mars", traits: "Bold and ambitious", luckyColor: "Red", luckyNumber: 9 },
    "વૃષભ (Taurus)": { symbol: "♉", element: "Earth", planet: "Venus", traits: "Reliable and patient", luckyColor: "Green", luckyNumber: 6 },
    "મિથુન (Gemini)": { symbol: "♊", element: "Air", planet: "Mercury", traits: "Versatile and expressive", luckyColor: "Yellow", luckyNumber: 5 },
    "કર્ક (Cancer)": { symbol: "♋", element: "Water", planet: "Moon", traits: "Intuitive and caring", luckyColor: "White", luckyNumber: 2 },
    "સિંહ (Leo)": { symbol: "♌", element: "Fire", planet: "Sun", traits: "Proud and passionate", luckyColor: "Gold", luckyNumber: 1 },
    "કન્યા (Virgo)": { symbol: "♍", element: "Earth", planet: "Mercury", traits: "Analytical and kind", luckyColor: "Beige", luckyNumber: 5 },
    "તુલા (Libra)": { symbol: "♎", element: "Air", planet: "Venus", traits: "Balanced and charming", luckyColor: "Pink", luckyNumber: 6 },
    "વૃશ્ચિક (Scorpio)": { symbol: "♏", element: "Water", planet: "Pluto", traits: "Intense and resourceful", luckyColor: "Black", luckyNumber: 9 },
    "ધનુ (Sagittarius)": { symbol: "♐", element: "Fire", planet: "Jupiter", traits: "Adventurous and honest", luckyColor: "Purple", luckyNumber: 3 },
    "મકર (Capricorn)": { symbol: "♑", element: "Earth", planet: "Saturn", traits: "Disciplined and wise", luckyColor: "Brown", luckyNumber: 8 },
    "કુંભ (Aquarius)": { symbol: "♒", element: "Air", planet: "Uranus", traits: "Innovative and independent", luckyColor: "Blue", luckyNumber: 4 },
    "મીન (Pisces)": { symbol: "♓", element: "Water", planet: "Neptune", traits: "Empathetic and artistic", luckyColor: "Sea Green", luckyNumber: 7 }
  };
  return data[sign] || {};
};
