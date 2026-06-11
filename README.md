# Die Hard's World Cup Tracker

A playful, interactive dashboard for mainstream fans to track the 2026 World Cup. Built with a focus on clarifying group scenarios, tie-breakers, and the consequences of each individual match.

## Architecture

- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion (via `motion`).
- **State**: React Context API (`lib/AppState.tsx`) handles lightweight state such as the user's selected "supported team", storing the preference via URL and `localStorage`.
- **Logic**: Client-side parsing and derivation of standings, tie-breaks, and match scenarios ensuring the app doesn’t need a backend server and remains lightweight.
- **Data Flow**: `src/data/tournamentData.ts` holds normalized mock definitions for teams and fixtures. In production, a separate Node.js build script or scheduled worker would ingest official FIFA JSON feeds and output updated static snapshots into this format.

### Data Ingestion Assumptions
- **FIFA Data Formatting**: The prototype assumes we can fetch/scrape a schedule mapping 48 teams into 12 groups.
- **Client-Side Simulation**: Because we do not have a live FIFA feed integration yet, `tournamentData` acts as our precomputed JSON endpoint.
- **Scenario Engine**: `lib/scenarios.ts` generates contextual English explanations for match scenarios based on the matchday and current points.

## How to run locally

1. Ensure Node.js 18+ is installed.
2. Run `npm install` to grab dependencies.
3. Run `npm run dev` to start the Vite dev server.

## Cloudflare Pages Deployment

This application is built as a fully static React SPA, making it perfect for Cloudflare Pages Preview & Production deployments.

1. **Connect Repository**: In the Cloudflare Dashboard, go to **Pages** > **Connect to Git** and select this repository.
2. **Build Settings**:
   - **Framework preset**: `Create React App` or `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. **Environment**: Optionally add your `NODE_VERSION` (20 is recommended).
4. **Deploy**: Cloudflare will automatically build and publish a preview URL. Production gets deployed from the `main` branch.

## Features

- **Selected Team Expanding**: Picking your team auto-expands their related scenarios so you don't have to go digging.
- **Current Week View**: Highlights the current tournament week, avoiding a giant wall of fixtures.
- **Third-Place Tracking**: Because 8 third-place teams advance, a dedicated widget surfaces this competitive aspect out of the box.
