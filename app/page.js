"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [festival, setFestival] = useState(null);
  const [horoscope, setHoroscope] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const day = today.getDate();       // e.g., 2
      const month = today.getMonth() + 1; // e.g., 7 (July)
      const sign = "leo"; // Set zodiac sign (can be dynamic)

      const res = await fetch(`/api/daily?day=${day}&month=${month}&sign=${sign}`);
      const data = await res.json();

      setFestival(data.festival);
      setHoroscope(data.horoscope);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 Daily Horoscope & Festival</h1>

      {loading && <p>Loading today's info...</p>}

      {!loading && (
        <>
          {festival ? (
            <div className="mb-6 border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">🎉 Festival Today</h2>
              <p><strong>{festival.nameEn}</strong> ({festival.name})</p>
              <p>{festival.description}</p>
              <p className="text-sm text-gray-500">Type: {festival.type}</p>
            </div>
          ) : (
            <p>No festival today.</p>
          )}

          {horoscope ? (
            <div className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">🔮 Horoscope for {horoscope.date_range}</h2>
              <p>{horoscope.description}</p>
              <p><strong>Mood:</strong> {horoscope.mood}</p>
              <p><strong>Color:</strong> {horoscope.color}</p>
              <p><strong>Lucky Number:</strong> {horoscope.lucky_number}</p>
              <p><strong>Lucky Time:</strong> {horoscope.lucky_time}</p>
            </div>
          ) : (
            <p>Unable to fetch horoscope.</p>
          )}
        </>
      )}
    </main>
  );
}
