import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Studio")
          .items([
            S.listItem()
              .title("Pagine")
              .child(
                S.list()
                  .title("Pagine")
                  .items([
                    S.listItem()
                      .title("Homepage")
                      .schemaType("homepage")
                      .child(S.document().schemaType("homepage").documentId("homepage")),
                    S.listItem()
                      .title("Works")
                      .schemaType("worksPage")
                      .child(S.document().schemaType("worksPage").documentId("worksPage")),
                    S.listItem()
                      .title("Info")
                      .schemaType("about")
                      .child(S.document().schemaType("about").documentId("about")),
                  ])
              ),
            S.divider(),
            orderableDocumentListDeskItem({ type: "artwork", title: "Opere", S, context }),
            S.divider(),
            S.listItem()
              .title("Impostazioni globali")
              .schemaType("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
