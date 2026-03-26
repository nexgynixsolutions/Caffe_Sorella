const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

const PLACE_ID = process.env.GOOGLE_PLACE_ID || '';
const PLACE_QUERY = process.env.GOOGLE_PLACE_QUERY || 'Caffe Sorella Forest Hill';
const GOOGLE_FIND_PLACE_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';
const GOOGLE_DETAILS_URL = 'https://maps.googleapis.com/maps/api/place/details/json';

function looksLikeCid(value = '') {
  return value.includes(':') || value.startsWith('0x');
}

function isAllowedAvatarHost(hostname = '') {
  return hostname.endsWith('googleusercontent.com') || hostname.endsWith('ggpht.com');
}

async function resolvePlaceId(apiKey) {
  if (PLACE_ID && !looksLikeCid(PLACE_ID)) {
    return PLACE_ID;
  }

  const query = new URLSearchParams({
    input: PLACE_QUERY,
    inputtype: 'textquery',
    fields: 'place_id,name',
    key: apiKey,
  });

  const url = `${GOOGLE_FIND_PLACE_URL}?${query.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Find Place HTTP ${response.status}: ${text}`);
  }

  const payload = await response.json();
  const candidate = payload?.candidates?.[0];

  if (payload?.status !== 'OK' || !candidate?.place_id) {
    throw new Error(`Find Place status ${payload?.status || 'UNKNOWN'} for query "${PLACE_QUERY}"`);
  }

  console.log('[google-reviews] Resolved place:', candidate.name, candidate.place_id);
  return candidate.place_id;
}

app.use(cors());
app.use(express.json());

app.get('/api/google-avatar', async (req, res) => {
  try {
    const source = req.query.url;

    if (!source || typeof source !== 'string') {
      return res.status(400).json({ error: 'Missing url query parameter' });
    }

    let parsed;
    try {
      parsed = new URL(source);
    } catch {
      return res.status(400).json({ error: 'Invalid avatar url' });
    }

    if (parsed.protocol !== 'https:' || !isAllowedAvatarHost(parsed.hostname)) {
      return res.status(400).json({ error: 'Avatar host is not allowed' });
    }

    const response = await fetch(parsed.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return res.status(response.status).end();
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const bytes = Buffer.from(await response.arrayBuffer());
    return res.send(bytes);
  } catch (error) {
    console.error('[google-avatar] Failed to load avatar:', error?.message || error);
    return res.status(500).json({ error: 'Failed to load avatar image' });
  }
});

app.get('/api/google-reviews', async (req, res) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error('[google-reviews] Missing GOOGLE_API_KEY');
      return res.status(500).json({ error: 'Missing GOOGLE_API_KEY' });
    }

    const resolvedPlaceId = await resolvePlaceId(apiKey);

    const query = new URLSearchParams({
      place_id: resolvedPlaceId,
      fields: 'reviews',
      key: apiKey,
    });

    const url = `${GOOGLE_DETAILS_URL}?${query.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      const text = await response.text();
      console.error('[google-reviews] Google API HTTP error:', response.status, text);
      return res.status(502).json({ error: 'Google API request failed' });
    }

    const payload = await response.json();
    if (payload?.status !== 'OK') {
      console.error('[google-reviews] Details API status:', payload?.status, payload?.error_message || '');
      return res.status(502).json({
        error: 'Google Place Details rejected the request',
        status: payload?.status || 'UNKNOWN',
      });
    }

    const reviews = payload?.result?.reviews || [];

    console.log('[google-reviews] Google API status:', payload?.status);
    console.log('[google-reviews] Raw review count:', reviews.length);
    console.log('[google-reviews] Raw payload sample:', reviews[0] || null);

    const normalized = reviews.map((review) => ({
      name: review?.author_name || '',
      rating: review?.rating || 0,
      text: review?.text || '',
      profile_photo_url: review?.profile_photo_url || '',
    }));

    return res.json(normalized);
  } catch (error) {
    console.error('[google-reviews] Unexpected error:', error);
    return res.status(500).json({ error: error?.message || 'Failed to fetch Google reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`[server] Running on http://localhost:${PORT}`);
});
