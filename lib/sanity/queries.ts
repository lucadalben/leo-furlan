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

export async function getAllArtworks(): Promise<Artwork[]> {
  return client.fetch(
    `*[_type == "artwork"] | order(order asc) { ${artworkFields} }`
  );
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  return client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] { ${artworkFields} }`,
    { slug }
  );
}
