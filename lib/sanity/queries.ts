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

type WorksSort = "manual" | "newest" | "oldest";

export interface SiteSettings {
  worksSort: WorksSort;
  artistName?: string;
  tagline?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  instagramUrl?: string;
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      worksSort, artistName, tagline, email, phone, instagram, instagramUrl
    }`
  );
}

export interface AboutData {
  bio?: string;
  education?: { period: string; description: string }[];
  exhibitions?: { period: string; description: string }[];
}

export async function getAboutPage(): Promise<AboutData | null> {
  return client.fetch(
    `*[_type == "about"][0]{ bio, education, exhibitions }`
  );
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
