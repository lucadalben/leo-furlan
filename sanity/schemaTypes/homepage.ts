import { defineField, defineType } from "sanity";

export const homepageSchema = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "artistName",
      title: "Nome artista",
      type: "string",
      description: "Appare nella navbar e nel menu principale.",
      initialValue: "Leonardo Furlan",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Riga descrittiva sotto il nome.",
      initialValue: "Italian artist based in Venice (IT).",
    }),
    defineField({
      name: "ball",
      title: "Pallina 3D",
      type: "object",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "lightColor",
          title: "Colore luce (hex)",
          type: "string",
          description: "Es. #daf5ff — azzurro chiaro di default.",
          initialValue: "#daf5ff",
        }),
        defineField({
          name: "lightIntensity",
          title: "Intensità luce",
          type: "number",
          description: "Default 1. Aumenta per più luce, diminuisci per più scuro.",
          initialValue: 1,
        }),
        defineField({
          name: "sensitivityY",
          title: "Sensibilità rotazione orizzontale",
          type: "number",
          description: "Range rotazione sull'asse Y in radianti. Default 3.",
          initialValue: 3,
        }),
        defineField({
          name: "sensitivityX",
          title: "Sensibilità rotazione verticale",
          type: "number",
          description: "Range rotazione sull'asse X in radianti. Default 2.5.",
          initialValue: 2.5,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
