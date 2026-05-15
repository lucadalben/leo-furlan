import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Impostazioni sito",
  type: "document",
  fields: [
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
