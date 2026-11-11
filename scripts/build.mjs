// Builds the complete Foundry module into dist/.
//   node scripts/build.mjs            dev build (readable code + sourcemaps)
//   node scripts/build.mjs --watch    dev build, rebuilt on every JS change
//   node scripts/build.mjs --release  release build (minified JS/CSS/JSON, no sourcemaps)
import * as esbuild from "esbuild";
import {cp, mkdir, readFile, rm, writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");

const release = process.argv.includes("--release");
const watch = process.argv.includes("--watch");

async function writeJson(target, data) {
  await writeFile(target, JSON.stringify(data, null, release ? 0 : 2) + "\n");
}

/** Static files: manifest, translations, styles, images, docs. */
async function copyStatic() {
  const manifest = JSON.parse(await readFile(path.join(root, "module.json"), "utf8"));
  if (process.env.MODULE_VERSION) manifest.version = process.env.MODULE_VERSION;
  await writeJson(path.join(dist, "module.json"), manifest);

  for (const lang of manifest.languages ?? []) {
    const data = JSON.parse(await readFile(path.join(root, lang.path), "utf8"));
    await mkdir(path.dirname(path.join(dist, lang.path)), {recursive: true});
    await writeJson(path.join(dist, lang.path), data);
  }

  for (const style of manifest.styles ?? []) {
    await esbuild.build({
      entryPoints: [path.join(root, style)],
      outfile: path.join(dist, style),
      minify: release,
      logLevel: "warning",
    });
  }

  for (const entry of ["LICENSE"]) {
    await cp(path.join(root, entry), path.join(dist, entry), {recursive: true});
  }

  // NOTICE.md is the module's Foundry profile; README.md is for the GitHub repository only.
  await cp(path.join(root, "NOTICE.md"), path.join(dist, "README.md"));
}

const jsOptions = {
  entryPoints: [path.join(root, "src", "main.js")],
  outfile: path.join(dist, "main.js"),
  bundle: true,
  format: "esm",
  target: "es2022",
  platform: "browser",
  minify: release,
  sourcemap: release ? false : "linked",
  legalComments: "none",
  logLevel: "info",
};

await rm(dist, {recursive: true, force: true});
await mkdir(dist, {recursive: true});
await copyStatic();

if (watch) {
  const ctx = await esbuild.context(jsOptions);
  await ctx.watch();
  console.log("Watching JS sources (restart to pick up changes to module.json, i18n or styles)...");
} else {
  await esbuild.build(jsOptions);
  console.log(`${release ? "Release" : "Dev"} build written to dist/`);
}
