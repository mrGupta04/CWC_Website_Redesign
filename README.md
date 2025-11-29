
  # Redesign Central Water Commission

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Synthetic water data for MongoDB

  1. Set `MONGODB_URI` (and optional `MONGODB_DB`) inside `.env`.
  2. Install dependencies if you haven't yet: `npm install`.
  3. Generate realistic baseline datasets by running `npm run seed:water`.

  The seeding script inserts five collections, each tagged with `sourceTag: "seed-water-v1"` so you can safely delete or refresh the synthetic docs:

  - `reservoir_levels`: 10-day history for major reservoirs (storage, level, inflow/outflow).
  - `basin_discharges`: Daily discharge metrics and status bands for representative basins.
  - `rainfall_daily`: Regional rainfall, departures from normal, and qualitative category labels.
  - `flood_alerts`: Current advisories with severity, impact, and expected peak dates.
  - `water_projects`: Portfolio snapshot for key national water projects (phase, budget, issues).

  Front-end components can query these collections via your API layer, filtering by `date`, `basin`, or `sourceTag` depending on the view. Replace the synthetic data with live feeds later by swapping out the seeding pipeline.

  ## Connecting the dashboard UI

  - The live dashboard presented in `src/components/pages/WaterDataPage.tsx` consumes a typed façade in `src/data/waterData.ts`. Those objects mirror the Mongo collections so UI work can continue even before the API endpoints are wired up.
  - When your backend endpoints are ready, replace the static exports in `waterData.ts` with fetch hooks (REST, GraphQL, tRPC, etc.) that surface the same shapes. Because the UI only depends on the shape, no design refactor is needed.
  - If you want to drive the front end straight from Mongo, expose endpoints such as `/api/reservoir-levels?limit=5&order=percentLiveStorage` that return documents with the `sourceTag` filter already applied.
  - Keep `waterData.ts` around as a Storybook-style fixture set for unit tests and offline prototyping, even after real APIs are live.
  
