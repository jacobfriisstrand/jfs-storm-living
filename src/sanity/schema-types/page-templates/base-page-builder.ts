import { defineArrayMember, defineType } from "sanity";

export function basePageBuilder(moduleTypes: string[]) {
  return defineType({
    name: "pageBuilder",
    type: "array",
    title: "Moduler",
    validation: Rule => Rule.required().min(1).error("Mindst ét modul er påkrævet"),
    of: [
      ...moduleTypes.map(moduleType => defineArrayMember({ type: moduleType })),
    ],
  });
}
