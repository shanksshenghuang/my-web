import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, "..");
const outputRoot = join(projectRoot, "site-build");

if (existsSync(outputRoot)) {
  rmSync(outputRoot, { recursive: true, force: true });
}

mkdirSync(outputRoot, { recursive: true });
cpSync(join(projectRoot, "index.html"), join(outputRoot, "index.html"));
cpSync(join(projectRoot, "public", "images"), join(outputRoot, "images"), { recursive: true });
cpSync(join(projectRoot, "public", "dist"), join(outputRoot, "dist"), { recursive: true });

console.log(`Static build created at ${outputRoot}`);
