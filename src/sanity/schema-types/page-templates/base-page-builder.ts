import { defineArrayMember, defineType } from "sanity";

export function basePageBuilder(moduleTypes: string[]) {
  return defineType({
    name: "pageBuilder",
    type: "array",
    title: "Modules",
    validation: Rule => Rule.required().min(1).error("At least one module is required"),
    of: [
      ...moduleTypes.map(moduleType => defineArrayMember({ type: moduleType })),
    ],
  });
}
