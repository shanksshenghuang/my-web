import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceHtml = readFileSync(join(projectRoot, "index.html"), "utf8");

test("loader has its required Lottie data in source and build output", () => {
  for (const relativePath of [
    "public/dist/assets/Logo-v2-31d667ba.json",
    "site-build/dist/assets/Logo-v2-31d667ba.json",
  ]) {
    const assetPath = join(projectRoot, relativePath);
    assert.ok(existsSync(assetPath), `${relativePath} is missing`);
    const animation = JSON.parse(readFileSync(assetPath, "utf8"));
    assert.ok(animation.fr > 0, `${relativePath} has no frame rate`);
    assert.ok(animation.op > animation.ip, `${relativePath} has no playable frames`);
  }
});

test("loader has a two-second fail-safe that restores the page", () => {
  assert.match(sourceHtml, /id="loader-failsafe"/);
  assert.match(sourceHtml, /document\.body\.style\.opacity\s*=\s*"1"/);
  assert.match(sourceHtml, /document\.body\.style\.overflow\s*=\s*"auto"/);
  assert.match(sourceHtml, /loader\.style\.display\s*=\s*"none"/);
  assert.match(sourceHtml, /setTimeout\([^]*?,\s*2000\s*\)/);
});

test("Vercel builds the static site from the expected commands", () => {
  const configPath = join(projectRoot, "vercel.json");
  assert.ok(existsSync(configPath), "vercel.json is missing");
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  assert.deepEqual(config, {
    framework: null,
    installCommand: "pnpm install",
    buildCommand: "pnpm run build",
    outputDirectory: "site-build",
  });
});

test("critical home-page content and assets remain present", () => {
  for (const text of [
    "Keeping pets cool",
    "Pet Cooling Mats",
    "Smart Pet Cooling Beds",
    "Portable Pet Cooling Boxes",
    "OEM / ODM",
    "info@pawscooling.com",
  ]) {
    assert.ok(sourceHtml.includes(text), `Missing home-page content: ${text}`);
  }

  for (const relativePath of [
    "public/dist/assets/app-bf790f78.js",
    "public/dist/assets/app-legacy-6104e0d9.js",
    "public/dist/assets/main-60a368cd.css",
    "public/dist/assets/pawscooling-brand-overrides.css",
    "public/dist/assets/pawscooling-brand.js",
    "public/dist/assets/polyfills-legacy-e72e76f1.js",
  ]) {
    assert.ok(existsSync(join(projectRoot, relativePath)), `${relativePath} is missing`);
  }
});
