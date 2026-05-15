import { client } from "./client";

export interface Artwork {
  _id: string;
  title: string;
  slug: { current: string };
  year: number;
  technique?: string;
  dimensions?: string;
  coverImage: { asset: { _ref: string }; hotspot?: object };
  detailImages?: { asset: { _ref: string }; hotspot?: object }[];
  sizeClass: "nano" | "micro" | "small" | "medium" | "mega";
  order: number;
}

const artworkFields = `
  _id,
  title,
  slug,
  year,
  technique,
  dimensions,
  coverImage,
  detailImages,
  sizeClass,
  order
`;

export interface BallSettings {
  lightColor?: string;
  lightIntensity?: number;
  sensitivityY?: number;
  sensitivityX?: number;
  ambientColor?: string;
  ambientIntensity?: number;
}

export interface HomepageSettings {
  artistName?: string;
  tagline?: string;
  ball?: BallSettings;
}

export async function getHomepageSettings(): Promise<HomepageSettings | null> {
  return client.fetch(`*[_type == "homepage"][0]{ artistName, tagline, ball }`);
}

export interface SiteSettings {
  email?: string;
  phone?: string;
  instagram?: string;
  instagramUrl?: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(`*[_type == "siteSettings"][0]{ email, phone, instagram, instagramUrl }`);
}

type WorksSort = "manual" | "newest" | "oldest";

export async function getWorksSort(): Promise<WorksSort> {
  const doc = await client.fetch<{ worksSort?: WorksSort } | null>(
    `*[_type == "worksPage"][0]{ worksSort }`
  );
  return doc?.worksSort ?? "manual";
}

export interface AboutData {
  bio?: string;
  education?: { period: string; description: string }[];
  exhibitions?: { period: string; description: string }[];
}

export async function getAboutPage(): Promise<AboutData | null> {
  return client.fetch(`*[_type == "about"][0]{ bio, education, exhibitions }`);
}

export async function getAllArtworks(sort: WorksSort = "manual"): Promise<Artwork[]> {
  const orderClause =
    sort === "newest" ? "year desc" :
    sort === "oldest" ? "year asc" :
    "orderRank asc";
  return client.fetch(
    `*[_type == "artwork"] | order(${orderClause}) { ${artworkFields} }`
  );
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  return client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] { ${artworkFields} }`,
    { slug }
  );
}
