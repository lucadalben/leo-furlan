import { defineField, defineType } from "sanity";

export const worksPageSchema = defineType({
  name: "worksPage",
  title: "Works",
  type: "document",
  fields: [
    defineField({
      name: "worksSort",
      title: "Ordinamento opere",
      type: "string",
      options: {
        list: [
          { title: "Manuale (trascina le opere per riordinare)", value: "manual" },
          { title: "Più recenti (year desc)", value: "newest" },
          { title: "Più vecchie (year asc)", value: "oldest" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Works" }),
  },
});
