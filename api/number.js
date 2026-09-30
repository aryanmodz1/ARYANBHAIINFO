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
      developer: "aryanbhai"
    });
  }

  if (!key) {
    return res.status(401).json({
      status: "error",
      message: "key required",
      developer: "aryanbhai"
    });
  }

  try {
    const upstream = await fetch(
      `https://numberinfo-api-adibhai.vercel.app/api/number?number=${encodeURIComponent(number)}`
    );

    if (!upstream.ok) {
      return res.status(502).json({
        status: "error",
        message: `Upstream error status: ${upstream.status}`,
        developer: "aryanbhai"
      });
    }

    const data = await upstream.json();

    return res.status(200).json({
      status: data.status || "success",
      number: data.number || number,
      data: data.data || data,
      developer: "aryanbhai"
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Upstream fetch failed: " + err.message,
      developer: "aryanbhai"
    });
  }
}
