import { defineField, defineType } from "sanity";

export const aboutSchema = defineType({
  name: "about",
  title: "Pagina Info",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Biografia",
      type: "text",
      rows: 6,
      description: "Separa i paragrafi con una riga vuota.",
    }),
    defineField({
      name: "education",
      title: "Formazione",
      type: "array",
      of: [
        {
          type: "object",
          name: "educationEntry",
          fields: [
            defineField({ name: "period", title: "Periodo", type: "string" }),
            defineField({ name: "description", title: "Descrizione", type: "string" }),
          ],
          preview: { select: { title: "period", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "exhibitions",
      title: "Mostre",
      type: "array",
      of: [
        {
          type: "object",
          name: "exhibitionEntry",
          fields: [
            defineField({ name: "period", title: "Periodo", type: "string" }),
            defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "period", subtitle: "description" } },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Pagina Info" }),
  },
});
