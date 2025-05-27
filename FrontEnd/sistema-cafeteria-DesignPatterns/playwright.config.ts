import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "http://localhost:4173", // ⚠️ preview do Vite usa 4173 por padrão
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run preview -- --host", // garante que escute em 0.0.0.0
    port: 4173,
    timeout: 30000,
  },
  projects: [
    {
      name: "Microsoft Edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
  ],
});
