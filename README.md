# LetsEatOut.ai — Arizona Restaurant Directory Network

Free restaurant directories for Arizona's best cities. No pay-to-play. No fake ratings. Just where to eat.

## Live Site
https://letseatout.ai

## Markets

| Market | URL | Listings |
|--------|-----|----------|
| Scottsdale, AZ | /scottsdale | 133 |
| Sedona Area, AZ | /sedona | 83 |
| Prescott Area, AZ | /prescott | 182 |
| Cave Creek · Carefree, AZ | /cave-creek | 50 |
| Wickenburg Area, AZ | /wickenburg | 35 |
| Peoria, AZ | /peoria | 38 |
| Queen Creek, AZ | /queen-creek | 144 |
| Flagstaff & Area, AZ | /flagstaff | 208 |
| Buckeye, AZ | /buckeye | 93 |
| Verde Valley, AZ | /verde-valley | 72 |
| Payson & Rim Country, AZ | /payson | 66 |
| Globe & Miami, AZ | /globe | 31 |
| Show Low & Snowflake, AZ | /show-low | 29 |
| Kingman & Area, AZ | /kingman | 42 |

**Network Total: 1,206 listings**

## Architecture

Static single-file HTML — one `index.html` per city folder.
Deployed via GitHub → Cloudflare Pages.

```
letseatout-ai/
├── index.html              ← Network hub (letseatout.ai/)
├── scottsdale/index.html   ← letseatout.ai/scottsdale
├── sedona/index.html       ← letseatout.ai/sedona
├── prescott/index.html     ← letseatout.ai/prescott
├── cave-creek/index.html   ← letseatout.ai/cave-creek
├── wickenburg/index.html   ← letseatout.ai/wickenburg
├── peoria/index.html       ← letseatout.ai/peoria
├── queen-creek/index.html  ← letseatout.ai/queen-creek
├── flagstaff/index.html    ← letseatout.ai/flagstaff
├── buckeye/index.html      ← letseatout.ai/buckeye
├── verde-valley/index.html ← letseatout.ai/verde-valley
├── payson/index.html       ← letseatout.ai/payson
├── globe/index.html        ← letseatout.ai/globe
├── show-low/index.html     ← letseatout.ai/show-low
├── kingman/index.html      ← letseatout.ai/kingman
├── sitemap.xml
├── robots.txt
├── _redirects              ← Cloudflare Pages redirects
└── _headers                ← Cloudflare Pages cache/security headers
```

## Deployment

1. Push to GitHub main branch
2. Cloudflare Pages auto-deploys on push
3. Custom domain: letseatout.ai (set in Cloudflare Pages settings)

## Adding a New City

1. Copy any city folder (e.g. `scottsdale/`)
2. Rename folder to the new city slug
3. Update: title, meta description, h1, hero text, zone list, cuisine chips, DATA array
4. Add city card to `index.html`
5. Add URL to `sitemap.xml`
6. Push to GitHub

## Data Format

Each restaurant in the DATA array:
```json
{
  "id": "RB-SCOTTS-00001",
  "name": "Restaurant Name",
  "address": "123 Main St",
  "city": "Scottsdale",
  "state": "AZ",
  "zip": "85251",
  "cuisine": "American",
  "is_chain": false,
  "chain_name": "",
  "phone": "(480) 555-1234",
  "lat": 33.4942,
  "lng": -111.9261,
  "quality": 8,
  "zone": "Old Town",
  "description": "Description text."
}
```

For checked listings, use `checkedOn` with the date of the source check. The Cave Creek and Wickenburg cards also support optional `menuUrl`, `hoursUrl`, and `websiteUrl` links to official sources. When changing a directory count, also update its homepage card, the homepage total, and this table.

## Contact
info@letseatout.ai
