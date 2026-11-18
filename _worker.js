export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Fetch static asset from Pages
    const response = await env.ASSETS.fetch(request);

    // Clone response and set cache headers
    const cached = new Response(response.body, response);
    cached.headers.set("Cache-Control", "public, max-age=86400");

    return cached;
  }
};
