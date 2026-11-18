export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const contentType = headers.get("Content-Type") ?? "";
    const { pathname } = new URL(request.url);

    if (!response.ok || contentType.startsWith("text/html") ||
        pathname.startsWith("/assets/market-navigation.")) {
      headers.set("Cache-Control", "no-store");
    } else {
      headers.set("Cache-Control", "public, max-age=86400");
    }

    return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
  }
};
