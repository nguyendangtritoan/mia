# AGENTS.md

## Module Purpose

This repository is the `mia` npm package: a Vite + React + TypeScript single-page portfolio for Phan My Anh Nguyen. The current app is browser-only and mostly implemented in `src/App.tsx`, with static deployment targets for GitHub Pages and Cloudflare Pages.

## Important Directories

- `src/`: React source. `App.tsx` contains most page content, state, section navigation, modal behavior, bilingual text, Google Drive PDF/profile URLs, and project data.
- `src/*Logo.tsx` and `src/JourneyDivider.tsx`: inline SVG/React visual components used by the portfolio.
- `src/index.css`: Tailwind entry file. `src/App.css` is a tracked Vite template leftover and is not imported by the current entry path.
- `src/assets/`: static source assets. `profile.jpg`, `encoway-logo.svg`, and `react.svg` are present; verify usage before editing because current profile imagery is loaded from Google Drive URLs in `App.tsx`.
- `public/`: public assets copied by Vite, including `favicon.svg` and the public CV PDF.
- `dist/`: built Vite output. It is currently tracked in git, so `npm run build` can create source-control diffs.
- `.wrangler/`: local Cloudflare tooling cache. Do not treat it as source.

## Runtime And Deployment

- The runtime is a static client-side React app. There is no local backend or API layer in this repo.
- External runtime dependencies include Google Drive preview/thumbnail URLs for project/profile media, LinkedIn links, and `mailto:` contact links embedded in `src/App.tsx`. The CV is served locally from `public/PhanMyAnh_Nguyen_CV.pdf`.
- `vite.config.ts` sets `base: './'`, which supports relative asset paths for static hosting.
- The live custom domain is `https://www.myanh.de/`. It is served by the Cloudflare Pages project `mia`, and deployment should use Cloudflare Pages unless the user explicitly asks for the GitHub Pages fallback.
- Deployment scripts:
  - `npm run deploy:pages`: builds and runs `npx wrangler pages deploy dist --project-name mia`. Use this for publishing to `https://www.myanh.de/`. `wrangler` must be authenticated, either via `npx wrangler login` locally or `CLOUDFLARE_API_TOKEN` in non-interactive environments.
  - `npm run deploy`: builds through `predeploy`, then publishes `dist` with `gh-pages`. This updates the `gh-pages` branch and the default GitHub Pages route, not the custom domain currently serving users.
- After Cloudflare Pages deploys, verify the custom domain by fetching `https://www.myanh.de/` and confirming the HTML references the newest hashed assets from `dist/assets/`.

## Key Dependencies

- `react` and `react-dom`: UI framework and browser rendering.
- `vite` plus `@vitejs/plugin-react`: dev server and production bundling.
- `typescript`: strict type checking via project references.
- `tailwindcss`, `postcss`, `autoprefixer`: utility-first styling pipeline.
- `lucide-react`: icon set used throughout navigation, buttons, cards, and contact links.
- `swiper`: profile image card carousel in `App.tsx`.
- `gh-pages` and Wrangler via `npx`: deployment tooling.

## Configuration Files

- `package.json`: package name, npm scripts, dependencies.
- `package-lock.json`: npm lockfile; keep it in sync with dependency changes.
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: TypeScript project references and strict app/node compiler settings. `noUnusedLocals`, `noUnusedParameters`, and `noUncheckedSideEffectImports` are enabled.
- `eslint.config.js`: flat ESLint config for TypeScript, React Hooks, and Vite React Refresh.
- `tailwind.config.js`: scans `index.html` and `src/**/*.{js,ts,jsx,tsx}`.
- `postcss.config.js`: wires Tailwind and Autoprefixer.

## Validation Commands

- `npm run dev`: start the local Vite dev server.
- `npm run lint`: run ESLint. At inspection time this passes, with a stale `baseline-browser-mapping` warning.
- `npm run build`: run `tsc && vite build`. At inspection time this succeeds, with stale `baseline-browser-mapping` and Browserslist/caniuse-lite warnings.
- `npm run preview`: serve the production build locally.

## Coding Cautions

- Treat `src/App.tsx` as the content and behavior hub until the app is split into smaller components. Changes there can affect navigation, modal previews, project cards, language switching, and profile carousel behavior at once.
- Keep bilingual German/English text in `translationsData` aligned when changing visible copy.
- Mobile behavior intentionally opens resume/project PDFs in a new tab, while desktop uses in-page iframe modals.
- Avoid assuming assets in `src/assets/` are active; several source assets appear to be leftovers or unused by the current component tree.
- Because `dist/` is tracked, decide intentionally whether a change should update built artifacts. If you run `npm run build` only for validation, check and clean resulting `dist/` diffs before finishing.
- If the user asks to publish changes visible on `www.myanh.de`, run `npm run deploy:pages`; running only `npm run deploy` can leave the custom domain on an older Cloudflare build.
- The README is still the default Vite template; verify project behavior from source and scripts rather than relying on it.

## Known Traps

- `src/main.tsx` imports the default app as `Porfolio`; this local name is misspelled but works because it is only an import alias.
- Swiper is used for the profile carousel; keep its CSS side-effect imports intact unless replacing the carousel implementation.
- There is no test suite configured beyond linting and TypeScript/build validation.
