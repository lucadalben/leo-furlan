import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
    defineField({
      name: "artistName",
      title: "Nome artista",
      type: "string",
      description: "Appare nella navbar e nella homepage.",
      initialValue: "Leonardo Furlan",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline homepage",
      type: "string",
      description: "Riga descrittiva sotto il nome nella homepage.",
      initialValue: "Italian artist based in Venice (IT).",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Telefono",
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: "Instagram handle (es. @_eonard_)",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "worksSort",
      title: "Ordinamento opere",
      type: "string",
      options: {
        list: [
          { title: "Manuale (campo order)", value: "manual" },
          { title: "Più recenti (year desc)", value: "newest" },
          { title: "Più vecchie (year asc)", value: "oldest" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
      validation: (R) => R.required(),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Impostazioni sito" }),
  },
});
