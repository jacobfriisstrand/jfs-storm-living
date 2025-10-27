import type { StructureResolver } from "sanity/structure";

import { PAGE_TYPES } from "@/sanity/constants/page-types";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title("Menu")
    .items([
      S.divider().title("Pages"),
      S.listItem()
        .id("homePage")
        .schemaType("homePage")
        .title("Homepage")
        .child(
          S.editor()
            .id("homePage")
            .schemaType("homePage")
            .documentId("homePage"),
        ),
      // Dynamically add page types from PAGE_TYPES constant
      ...PAGE_TYPES
        .filter(pageType => pageType !== "homePage" && pageType !== "notFoundPage")
        .map(pageType =>
          S.documentTypeListItem(pageType).title(
            pageType
              .replace(/([A-Z])/g, " $1") // Add space before capital letters
              .toLowerCase() // Convert to lowercase
              .replace(/^./, str => str.toUpperCase()), // Capitalize first letter only
          ),
        ),
      S.divider().title("Settings"),
      S.listItem()
        .title("Global settings")
        .icon(() => "🔧")
        .child(
          S.editor()
            .id("globalSettings")
            .schemaType("globalSettings")
            .documentId("globalSettings"),
        ),
      S.listItem()
        .title("Navigation")
        .icon(() => "🔗")
        .child(
          S.editor()
            .id("navigation")
            .schemaType("navigation")
            .title("Navigation")
            .documentId("navigation"),
        ),
      S.listItem()
        .title("Not found page")
        .icon(() => "🚨")
        .child(
          S.editor()
            .id("notFoundPage")
            .schemaType("notFoundPage")
            .title("Not found page")
            .documentId("notFoundPage"),
        ),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId()
          && !["globalSettings", "basePage", "homePage", "navigation", "notFoundPage", ...PAGE_TYPES].includes(item.getId()!),
      ),
    ]);
