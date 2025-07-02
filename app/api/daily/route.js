// ✅ Step 1: Force Node.js runtime
export const runtime = "nodejs";

import { festivals } from "@/src/utils/calendarData"; // ✅ Adjust if needed

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const day = searchParams.get("day");
  const month = searchParams.get("month");
  const sign = searchParams.get("sign");

  const formattedDate = `${parseInt(day)}-${parseInt(month)}`;
  const festival = festivals[formattedDate] || null;

  let horoscope = null;
  if (sign) {
    try {
      const response = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
        method: "POST",
      });
      horoscope = await response.json();
    } catch (error) {
      horoscope = { error: "Failed to fetch horoscope." };
    }
  }

  return new Response(
    JSON.stringify({
      date: `${day}-${month}`,
      festival,
      horoscope,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
