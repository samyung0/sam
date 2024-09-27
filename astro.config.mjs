// @ts-check
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import astroMetaTags from "astro-meta-tags";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://sam.partialty.com",
  output: "hybrid",
  adapter: vercel(),
  integrations: [
    sitemap(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    astroMetaTags(),
    sanity({
      useCdn: false,
      projectId: "ywfq98mg",
      dataset: "production",
    }),
  ],
  prefetch: {
    defaultStrategy: "viewport",
    prefetchAll: true,
  },
  image: {
    remotePatterns: [{ protocol: "https" }],
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "jp", "zh-TW", "zh-HK"],
    fallback: {
      jp: "en",
      "zh-TW": "en",
      "zh-HK": "zh-TW",
    },
    routing: {
      fallbackType: "redirect"
    }
  },
});
