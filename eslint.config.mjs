import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // The previous plain-HTML site, kept for reference only — not linted.
    "legacy-static-site/**",
    // Dev-only tooling (image sourcing, mobile audit, screenshots) run
    // manually via node — not part of the shipped app.
    "scripts/**",
    "tmp/**",
  ]),
  {
    rules: {
      // This site is a static export, so next/image's optimizer is disabled
      // anyway (`images.unoptimized`). Plain <img> is the correct primitive
      // here and avoids shipping the extra component for no benefit.
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
