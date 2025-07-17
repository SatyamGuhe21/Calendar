export const runtime = "nodejs";

const zodiacSigns = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

export async function GET() {
  const results = {};

  try {
    for (const sign of zodiacSigns) {
      const res = await fetch(`https://aztro.sameerkumar.website/?sign=${sign}&day=today`, {
        method: "POST",
      });
      const data = await res.json();
      results[sign] = data;
    }

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch horoscopes" }),
      { status: 500 }
    );
  }
}
