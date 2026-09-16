import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Make browser-friendly copies; the supplied source artwork is never modified.
const root = path.resolve("public");
const output = path.join(root, "optimized");
await fs.mkdir(output, { recursive: true });
for (const folder of ["backgrounds", "isolatedAstroMech"]) {
  await fs.mkdir(path.join(output, folder), { recursive: true });
  for (const file of (await fs.readdir(path.join(root, folder))).filter((f) =>
    f.endsWith(".png"),
  )) {
    await sharp(path.join(root, folder, file))
      .resize({ width: 1672, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(path.join(output, folder, file.replace(".png", ".webp")));
  }
}
const manifest = {};
for (const [folder, slug] of [
  ["ark11FlyBy", "flyby"],
  ["ark11Disassembly", "disassembly"],
  ["interacting with exotic material", "discovery"],
  ["ark11CockpitScene", "cockpit"],
]) {
  const files = (await fs.readdir(path.join(root, "imageSequences", folder)))
    .filter((f) => /^\d+\.png$/.test(f))
    .sort((a, b) => parseInt(a) - parseInt(b));
  const selected = files.filter(
    (_, i) => i % 2 === 0 || i === files.length - 1,
  );
  await fs.mkdir(path.join(output, "sequences", slug), { recursive: true });
  for (let i = 0; i < selected.length; i++) {
    await sharp(path.join(root, "imageSequences", folder, selected[i]))
      .resize({ width: 1280, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(output, "sequences", slug, `${i}.webp`));
  }
  manifest[slug] = {
    count: selected.length,
    sourceCount: files.length,
    path: `/optimized/sequences/${slug}`,
  };
  console.log(
    `${slug}: ${files.length} source frames → ${selected.length} optimized frames`,
  );
}
await fs.writeFile(
  "lib/sequences.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log("Optimized assets ready.");
