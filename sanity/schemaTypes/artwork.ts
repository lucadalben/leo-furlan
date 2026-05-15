import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export const artworkSchema = defineType({
  name: "artwork",
  title: "Artwork",
  type: "document",
  fields: [
    orderRankField({ schemaType: "artwork" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: "technique",
      title: "Technique",
      type: "string",
      description: 'e.g. "oil on canvas", "pencils on paper", "oil on board"',
    }),
    defineField({
      name: "dimensions",
      title: "Dimensions",
      type: "string",
      description: 'e.g. "50x70", "11,5x30x5"',
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "detailImages",
      title: "Detail Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Additional detail shots shown in the slideshow",
    }),
    defineField({
      name: "sizeClass",
      title: "Gallery Size",
      type: "string",
      options: {
        list: [
          { title: "Nano  — 10vh", value: "nano" },
          { title: "Micro — 20vh", value: "micro" },
          { title: "Small — 40vh", value: "small" },
          { title: "Medium — 60vh", value: "medium" },
          { title: "Mega  — 90vh", value: "mega" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = appears first in gallery (newest first)",
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [orderRankOrdering],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "coverImage",
    },
    prepare({ title, year, media }) {
      return {
        title,
        subtitle: String(year),
        media,
      };
    },
  },
});
