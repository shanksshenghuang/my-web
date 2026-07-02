import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function sendFile(response, filePath) {
  const extension = extname(filePath).toLowerCase();
  response.writeHead(200, {
    "Content-Type": mimeTypes[extension] || "application/octet-stream",
    "Cache-Control": extension === ".html" ? "no-cache" : "public, max-age=3600",
  });
  createReadStream(filePath).pipe(response);
}

async function proxyOriginal(request, response, pathname, search) {
  try {
    const upstream = await fetch(`https://www.leeroy.ca${pathname}${search}`, {
      headers: { "User-Agent": request.headers["user-agent"] || "Mozilla/5.0" },
    });
    const body = Buffer.from(await upstream.arrayBuffer());
    response.writeHead(upstream.status, {
      "Content-Type": upstream.headers.get("content-type") || "application/octet-stream",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    });
    response.end(body);
  } catch (error) {
    response.writeHead(502, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(`Original asset unavailable: ${error.message}`);
  }
}

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = pathname === "/" ? "/index.html" : pathname;
  const localPath = normalize(join(root, requestedPath));

  if (!localPath.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }

  if (existsSync(localPath) && statSync(localPath).isFile()) {
    sendFile(response, localPath);
    return;
  }

  const publicPath = normalize(join(root, "public", requestedPath));
  if (publicPath.startsWith(join(root, "public")) && existsSync(publicPath) && statSync(publicPath).isFile()) {
    sendFile(response, publicPath);
    return;
  }

  if (pathname.startsWith("/dist/")) {
    await proxyOriginal(request, response, pathname, url.search);
    return;
  }

  response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  response.end("Not found");
}).listen(port, "127.0.0.1", () => {
  console.log(`pawscooling showcase running at http://127.0.0.1:${port}`);
});
