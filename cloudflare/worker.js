const ORIGIN_HOST = "www.bryanray.net.website-us-southeast-1.linodeobjects.com";

export default {
  async fetch(request) {
    const incoming = new URL(request.url);

    if (incoming.hostname === "bryanray.net") {
      incoming.protocol = "https:";
      incoming.hostname = "www.bryanray.net";
      return Response.redirect(incoming.toString(), 301);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET, HEAD" },
      });
    }

    const origin = new URL(request.url);
    origin.protocol = "http:";
    origin.hostname = ORIGIN_HOST;
    origin.port = "";

    const isHtml =
      origin.pathname.endsWith("/") ||
      origin.pathname.endsWith(".html") ||
      !origin.pathname.split("/").pop().includes(".");
    const isFingerprintedAsset = /\.[0-9a-f]{64}\.(?:css|js)$/.test(
      origin.pathname,
    );
    const cacheTtl = isHtml ? 0 : isFingerprintedAsset ? 31536000 : 3600;

    const originResponse = await fetch(origin.toString(), {
      method: request.method,
      redirect: "manual",
      cf: {
        cacheEverything: true,
        cacheTtl,
      },
    });

    const status = originResponse.status === 403 ? 404 : originResponse.status;
    const headers = new Headers(originResponse.headers);
    headers.delete("content-encoding");
    headers.delete("content-length");
    headers.delete("x-amz-request-id");
    headers.set("x-content-type-options", "nosniff");
    headers.set(
      "cache-control",
      isHtml
        ? "no-cache"
        : isFingerprintedAsset
          ? "public, max-age=31536000, immutable"
          : "public, max-age=3600",
    );

    return new Response(originResponse.body, {
      status,
      statusText: status === 404 ? "Not Found" : originResponse.statusText,
      headers,
    });
  },
};
