import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Impostazioni globali",
  type: "document",
  fields: [
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Telefono", type: "string" }),
    defineField({ name: "instagram", title: "Instagram handle (es. @_eonard_)", type: "string" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
  preview: {
    prepare: () => ({ title: "Impostazioni globali" }),
  },
});
