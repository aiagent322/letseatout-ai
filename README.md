# LetsEatOut.ai — Arizona Restaurant Directory Network

Free restaurant directories for Arizona's best cities. No pay-to-play. No fake ratings. Just where to eat.

## Live Site
https://letseatout.ai

## Markets

| Market | URL | Listings |
|--------|-----|----------|
| Indio, CA | /indio | 171 |
| Scottsdale, AZ | /scottsdale | 142 |
| Sedona Area, AZ | /sedona | 105 |
| Prescott Area, AZ | /prescott | 251 |
| Cave Creek · Carefree, AZ | /cave-creek | 40 |
| Wickenburg, AZ | /wickenburg | 29 |
| Peoria, AZ | /peoria | 40 |

**Network Total: 778 listings**

## Architecture

Static single-file HTML — one `index.html` per city folder.
Deployed via GitHub → Cloudflare Pages.

```
letseatout-ai/
├── index.html              ← Network hub (letseatout.ai/)
├── indio/index.html        ← letseatout.ai/indio
├── scottsdale/index.html   ← letseatout.ai/scottsdale
├── sedona/index.html       ← letseatout.ai/sedona
├── prescott/index.html     ← letseatout.ai/prescott
├── cave-creek/index.html   ← letseatout.ai/cave-creek
├── wickenburg/index.html   ← letseatout.ai/wickenburg
├── peoria/index.html       ← letseatout.ai/peoria
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

## Contact
info@letseatout.ai
