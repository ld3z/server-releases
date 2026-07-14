// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkIconShorthand from "./emojis.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://ld3z.github.io",
  base: "/server-releases/",

  markdown: {
    processor: unified({
      remarkPlugins: [remarkIconShorthand],
    }),
  },
});
