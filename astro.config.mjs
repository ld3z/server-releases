// @ts-check
import { defineConfig } from "astro/config";
import remarkIconShorthand from "./emojis.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://ld3z.github.io",
  base: "/server-releases/",

  markdown: {
    remarkPlugins: [remarkIconShorthand],
  },
});
