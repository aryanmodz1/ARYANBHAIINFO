export default async function handler(req, res) {
  // CORS Headers Handle Karo
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  // Parameters
  const { number } = req.query;
  const key = req.query.key || req.query.slug || null;

  if (!number) {
    return res.status(400).json({
      status: "error",
      message: "number parameter required",
      developer: "aryanbhai",
      api_owner_telegram: "team_sad001"
    });
  }

  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "aryanbhai",
      api_owner_telegram: "team_sad001"
    });
  }

  try {
    const upstream = await fetch(
      `https://astha-9vd8.onrender.com/tapi-3a74390dd9a68a862b9d697124bb9e04?Astha=${encodeURIComponent(number)}`
    );

    if (!upstream.ok) {
      return res.status(502).json({
        status: "error",
        message: `Upstream error status: ${upstream.status}`,
        developer: "aryanbhai",
        api_owner_telegram: "team_sad001"
      });
    }

    const data = await upstream.json();

    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || data,
      developer: "aryanbhai",
      api_owner_telegram: "team_sad001"
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Upstream fetch failed: " + err.message,
      developer: "aryanbhai",
      api_owner_telegram: "team_sad001"
    });
  }
}
