export default {
  async fetch(request) {

    const response = await fetch(request, {
      cf: {
        cacheEverything: true,
        cacheTtl: 86400
      }
    });

    return response;

  }
};
