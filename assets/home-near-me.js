(() => {
  const button = document.querySelector('#near-me-search');
  const status = document.querySelector('#near-me-status');
  const results = document.querySelector('#near-me-results');
  const resultTitle = document.querySelector('#near-me-title');
  const summary = document.querySelector('#near-me-summary');
  const listingList = document.querySelector('#near-me-list');
  const marketList = document.querySelector('#near-me-markets');
  const radius = 30;

  // 2025 Census Gazetteer representative points. Verde Valley uses Cottonwood.
  const marketCenters = {
    '/scottsdale': [33.684272, -111.861448],
    '/sedona': [34.858517, -111.793057],
    '/prescott': [34.592241, -112.446733],
    '/cave-creek': [33.836219, -111.982084],
    '/wickenburg': [33.985756, -112.768340],
    '/peoria': [33.786186, -112.308042],
    '/queen-creek': [33.239425, -111.613319],
    '/flagstaff': [35.185212, -111.620698],
    '/buckeye': [33.431573, -112.641626],
    '/verde-valley': [34.750834, -111.984004],
    '/payson': [34.243841, -111.318964],
    '/globe': [33.393642, -110.741106],
    '/show-low': [34.265053, -110.038321],
    '/kingman': [35.216992, -114.010529],
    '/winslow': [35.024236, -110.709331],
    '/grand-canyon': [36.059483, -112.157912],
    '/indio': [33.731639, -116.235971],
    '/coachella': [33.690380, -116.143128],
    '/palm-desert': [33.737635, -116.364145]
  };

  function milesBetween(latitude, longitude, lat, lng) {
    const radians = Math.PI / 180;
    const deltaLat = (lat - latitude) * radians;
    const deltaLng = (lng - longitude) * radians;
    const a = Math.sin(deltaLat / 2) ** 2 +
      Math.cos(latitude * radians) * Math.cos(lat * radians) * Math.sin(deltaLng / 2) ** 2;
    return 7917.6 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
  }

  async function loadListings(card, signal) {
    const response = await fetch(card.href, { signal });
    if (!response.ok) throw new Error('Market unavailable');
    const html = await response.text();
    const data = html.match(/^const DATA\s*=\s*(\[[\s\S]*?\r?\n\]);/m);
    if (!data) throw new Error('Market listings unavailable');
    return JSON.parse(data[1].replace(/,\s*\]$/, ']'));
  }

  function appendLink(list, text, url, detail) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = url;
    link.textContent = text;
    item.append(link);
    if (detail) {
      const address = document.createElement('span');
      address.className = 'nearby-address';
      address.textContent = detail;
      item.append(address);
    }
    list.append(item);
  }

  async function showResults({ coords: { latitude, longitude } }) {
    status.textContent = 'Finding nearby restaurants…';
    const marketCards = [...document.querySelectorAll('a.city-card')];
    const nearestMarkets = marketCards.flatMap(card => {
      const center = marketCenters[new URL(card.href).pathname.replace(/\/$/, '')];
      return center ? [{ card, distance: milesBetween(latitude, longitude, ...center) }] : [];
    }).sort((a, b) => a.distance - b.distance).slice(0, 3);

    const request = new AbortController();
    const timeout = window.setTimeout(() => request.abort(), 10000);
    const markets = await Promise.allSettled(marketCards.map(card => loadListings(card, request.signal)));
    window.clearTimeout(timeout);
    const nearby = markets.flatMap(market => market.status === 'fulfilled' ? market.value : [])
      .filter(row => row.name && Number.isFinite(row.lat) && Number.isFinite(row.lng) && row.lat !== 0 && row.lng !== 0)
      .map(row => ({ ...row, distance: milesBetween(latitude, longitude, row.lat, row.lng) }))
      .filter(row => row.distance <= radius)
      .sort((a, b) => a.distance - b.distance);

    const seen = new Set();
    const listings = nearby.filter(row => {
      const key = [row.name, row.address, row.city, row.state].join('|').toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).slice(0, 8);

    listingList.replaceChildren();
    marketList.replaceChildren();
    const incomplete = markets.some(market => market.status === 'rejected');
    if (listings.length) {
      summary.textContent = 'Closest available listings with map locations. Distances are straight-line estimates.';
    } else {
      summary.textContent = incomplete
        ? 'Some listings were unavailable. Browse the closest markets below.'
        : `No listings with map locations were found within ${radius} miles. Browse the closest markets below.`;
    }
    for (const row of listings) {
      const address = [row.address, row.city, row.state].filter(Boolean).join(', ');
      const query = new URLSearchParams({ api: '1', query: `${row.name} ${address}` });
      appendLink(listingList, `${row.name} · ${row.distance.toFixed(1)} mi`, `https://www.google.com/maps/search/?${query}`, address);
    }
    for (const { card } of nearestMarkets) {
      appendLink(marketList, card.querySelector('h3').textContent, card.href);
    }
    results.hidden = false;
    status.textContent = '';
    resultTitle.focus({ preventScroll: true });
    results.scrollIntoView({ block: 'start' });
  }

  function reportError(message) {
    const marketLink = document.createElement('a');
    marketLink.href = '#cities';
    marketLink.textContent = 'Choose a city';
    status.replaceChildren(`${message} `, marketLink);
    button.disabled = false;
  }

  button.addEventListener('click', () => {
    if (!navigator.geolocation) {
      reportError('Location search is unavailable in this browser.');
      return;
    }
    button.disabled = true;
    results.hidden = true;
    status.textContent = 'Getting your location…';
    navigator.geolocation.getCurrentPosition(
      position => showResults(position)
        .catch(() => reportError('Location search couldn’t load the listings.'))
        .finally(() => { button.disabled = false; }),
      error => reportError(error.code === 1 ? 'Location access is turned off.' : 'Your location couldn’t be determined.'),
      { timeout: 8000, maximumAge: 60000 }
    );
  });
})();
