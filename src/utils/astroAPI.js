// ✅ astroAPI.js - API handlers
export const fetchRealHoroscope = async (sign) => {
  const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
    method: "POST",
  });
  return await res.json();
};

export const fetchRealPanchangData = async (date) => {
  const response = await fetch(`https://yourapi.com/panchang?date=${date.toISOString()}`);
  return await response.json();
};

export const fetchRealFestivalData = async (date) => {
  const response = await fetch(`https://yourapi.com/festival?date=${date.toISOString()}`);
  return await response.json();
};


// ✅ calendarData.js - Core logic
import { fetchRealPanchangData, fetchRealHoroscope, fetchRealFestivalData } from "./astroAPI";

export const getPanchangData = async (date) => {
  try {
    return await fetchRealPanchangData(date);
  } catch (error) {
    console.error("Panchang error:", error);
    return { tithi: "N/A", nakshatra: "N/A", yoga: "N/A", sunrise: "--", sunset: "--" };
  }
};

export const getHoroscopeData = async (zodiacSign) => {
  try {
    return await fetchRealHoroscope(zodiacSign);
  } catch (error) {
    console.error("Horoscope error:", error);
    return { prediction: "Error", luckyNumber: "--", luckyColor: "--", mood: "--", compatibility: "--" };
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
  const gujaratiMonths = ["જાન્યુઆરી", "ફેબ્રુઆરી", "માર્ચ", "એપ્રિલ", "મે", "જૂન", "જુલાઈ", "ઓગસ્ટ", "સપ્ટેમ્બર", "ઓક્ટોબર", "નવેમ્બર", "ડિસેમ્બર"];
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


// ✅ Example Usage in Component
import { useState, useEffect } from "react";
import { getPanchangData, getFestivalData, getZodiacSign, getGujaratiDate, getHoroscopeData } from "../utils/calendarData";

const ExampleCalendarCell = ({ date }) => {
  const [panchang, setPanchang] = useState(null);
  const [festival, setFestival] = useState(null);
  const [horoscope, setHoroscope] = useState(null);

  useEffect(() => {
    async function loadData() {
      setPanchang(await getPanchangData(date));
      setFestival(await getFestivalData(date));
      const zodiac = getZodiacSign(date);
      setHoroscope(await getHoroscopeData(zodiac));
    }
    loadData();
  }, [date]);

  return (
    <div>
      <h3>{getGujaratiDate(date)}</h3>
      <p>Tithi: {panchang?.tithi}</p>
      <p>Festival: {festival?.name || "None"}</p>
      <p>Horoscope: {horoscope?.prediction}</p>
    </div>
  );
};
