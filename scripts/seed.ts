import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "fs";
import { resolve, join } from "path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const OLD_SITE = resolve(process.cwd(), "../Sito web Leo");
const COVER_DIR = join(OLD_SITE, "img");
const DETAIL_DIR = join(OLD_SITE, "works", "img");

type SizeClass = "nano" | "micro" | "small" | "medium" | "mega";

interface ArtworkMeta {
  order: number;
  title: string;
  technique?: string;
  dimensions?: string;
  year: number;
  sizeClass: SizeClass;
}

// Metadati estratti dai file works/N.html con parser verificato su tutti i 23 file.
// Leonardo corregge i dettagli dallo Studio Sanity dopo il seed.
const ARTWORKS: ArtworkMeta[] = [
  { order: 1,  year: 2021, sizeClass: "nano",   dimensions: "11,5x30x5",  technique: "oil painted drawer front", title: "Wunderschublade" },
  { order: 2,  year: 2021, sizeClass: "micro",  dimensions: "20x20",       technique: "oil on canvas",            title: "What a wonderful ball" },
  { order: 3,  year: 2021, sizeClass: "small",  dimensions: "50x70",       technique: "oil on canvas",            title: "Everything will fly" },
  { order: 4,  year: 2021, sizeClass: "small",  dimensions: "50x50",       technique: "oil on canvas",            title: "Specchio, specchio delle mie brame, chi e il migliore?" },
  { order: 5,  year: 2021, sizeClass: "small",  dimensions: "40x50",       technique: "oil on canvas",            title: "In vette" },
  { order: 6,  year: 2022, sizeClass: "small",  dimensions: "21x29,7",     technique: "pencils on paper",         title: "Paganini apparso dietro una quadrettatura" },
  { order: 7,  year: 2022, sizeClass: "micro",  dimensions: "16x21",       technique: "oil on board",             title: "Te lo leggo negli occhi" },
  { order: 8,  year: 2022, sizeClass: "medium", dimensions: "80x100",      technique: "oil on canvas",            title: "Apparizione Aprilia" },
  { order: 9,  year: 2022, sizeClass: "small",  dimensions: "50x35",       technique: "oil on canvas",            title: "Io ebbasta" },
  { order: 10, year: 2022, sizeClass: "mega",   dimensions: "180x240",     technique: "oil on canvas",            title: "Non mi fermerete mai" },
  { order: 11, year: 2022, sizeClass: "small",  dimensions: "40x40",       technique: "oil on canvas",            title: "Il cielo in una stanza" },
  { order: 12, year: 2022, sizeClass: "micro",  dimensions: "14,3x21,7",   technique: "pencils on paper",         title: "Sic 23/10/11" },
  { order: 13, year: 2022, sizeClass: "mega",   dimensions: "200x300",     technique: "oil on canvas",            title: "Leggende della terra; miti nel cielo" },
  { order: 14, year: 2023, sizeClass: "micro",  dimensions: "15x15",       technique: "oil on canvas",            title: "Il tempo non si ferma durante i sogni" },
  { order: 15, year: 2023, sizeClass: "small",  dimensions: "90x105",      technique: "oil on canvas",            title: "Penso che un sogno cosi non ritorni mai piu" },
  { order: 16, year: 2023, sizeClass: "mega",   dimensions: "200x200",     technique: "oil on canvas",            title: "Ora et labora etc." },
  { order: 17, year: 2024, sizeClass: "nano",   dimensions: "10,5x40x1,5", technique: "oil painted drawer front", title: "Wunderschublade 2; verso l'aldila" },
  { order: 18, year: 2024, sizeClass: "small",  dimensions: "60x80",       technique: "oil on canvas",            title: "Tutto puo bruciare (ma non proprio tutto, forse)" },
  { order: 19, year: 2024, sizeClass: "micro",  dimensions: "20x25,5",     technique: "oil on canvas",            title: "Finding grisoi" },
  { order: 20, year: 2024, sizeClass: "small",  dimensions: "60x50",       technique: "oil on canvas",            title: "Paradiso?" },
  { order: 21, year: 2024, sizeClass: "micro",  dimensions: "20x30",       technique: "oil on canvas",            title: "Alleanza delle ombre. E pur si gode!" },
  { order: 22, year: 2024, sizeClass: "micro",  dimensions: "19,5x24,5",   technique: "oil on board",             title: "Rappresentazione pittorica di M-346 che attraversa un arcobaleno" },
  { order: 23, year: 2024, sizeClass: "small",  dimensions: "29,5x33,5",   technique: "oil on board",             title: "Meno info Remake" },
];

function slugify(title: string, order: number): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 70);
  return `${base}-${order}`;
}

async function uploadImage(filePath: string): Promise<string> {
  const buffer = readFileSync(filePath);
  const filename = filePath.split("/").pop()!;
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

function findCoverFile(order: number): string | undefined {
  const files = readdirSync(COVER_DIR);
  return files.find((f) => new RegExp(`^${order}-`).test(f));
}

function findDetailFiles(order: number): string[] {
  return readdirSync(DETAIL_DIR)
    .filter((f) => new RegExp(`^${order}\\.\\d+`).test(f))
    .sort();
}

async function seedOne(meta: ArtworkMeta): Promise<void> {
  const { order, title, technique, dimensions, year, sizeClass } = meta;

  const existingId = await client.fetch<string | null>(
    `*[_type == "artwork" && order == $order][0]._id`,
    { order }
  );
  if (existingId) {
    console.log(`  skip  #${order} (gia presente)`);
    return;
  }

  const coverFile = findCoverFile(order);
  if (!coverFile) {
    console.warn(`  WARN  #${order} nessuna cover trovata`);
    return;
  }

  console.log(`\n  #${order} "${title}"`);

  const coverAssetId = await uploadImage(join(COVER_DIR, coverFile));
  console.log(`         cover caricata`);

  const detailFiles = findDetailFiles(order);
  const detailRefs: object[] = [];

  for (const f of detailFiles) {
    const assetId = await uploadImage(join(DETAIL_DIR, f));
    const key = assetId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 32);
    detailRefs.push({
      _type: "image",
      _key: key,
      asset: { _type: "reference", _ref: assetId },
    });
    console.log(`         dettaglio: ${f}`);
  }

  await client.create({
    _type: "artwork",
    title,
    slug: { _type: "slug", current: slugify(title, order) },
    year,
    technique,
    dimensions,
    sizeClass,
    order,
    coverImage: {
      _type: "image",
      asset: { _type: "reference", _ref: coverAssetId },
    },
    ...(detailRefs.length > 0 && { detailImages: detailRefs }),
  });

  console.log(`         creata`);
}

async function main(): Promise<void> {
  console.log("\nSanity seed -- Leonardo Furlan\n");
  console.log(`Progetto: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`Dataset:  ${process.env.NEXT_PUBLIC_SANITY_DATASET}\n`);

  if (!process.env.SANITY_API_TOKEN) {
    console.error("SANITY_API_TOKEN mancante in .env.local");
    process.exit(1);
  }

  for (const meta of ARTWORKS) {
    try {
      await seedOne(meta);
    } catch (err) {
      console.error(`  ERR   #${meta.order}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log("\nSeed completato!");
  console.log("Rivedi e correggi i dettagli su http://localhost:3000/studio\n");
}

main();
