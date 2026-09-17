# VeoForge — AI Text-to-Video Generator

## GitHub Pages deployment

This version is configured as a **static Next.js export** for a repository named `AI-Text-to-Video-Generator`.

### Next.js static-export settings

`next.config.ts` contains:

- `output: "export"`
- `basePath: "/AI-Text-to-Video-Generator"`
- `images.unoptimized: true`

### GitHub Actions

`.github/workflows/deploy.yml` builds the static `out/` directory and publishes it to the `gh-pages` branch on every push to `main`.

### Important: GitHub Pages cannot run the Next.js API routes

Static GitHub Pages can host the frontend, but it cannot execute the server-side `/api/generate`, `/api/status`, and `/api/video` route handlers that were in the original application. Those routes were removed from the static build and the client now uses `NEXT_PUBLIC_API_BASE_URL` to call a separately hosted secure backend.

This is required to keep the Gemini/Veo API key private. **Never put `GEMINI_API_KEY` in the frontend or any `NEXT_PUBLIC_*` variable.**

### GitHub setup

1. Create/push a GitHub repository named exactly `AI-Text-to-Video-Generator`.
2. Go to **Settings → Pages** and select **GitHub Actions** as the source.
3. Go to **Settings → Secrets and variables → Actions → Variables**.
4. Add repository variable:

   `NEXT_PUBLIC_API_BASE_URL=https://YOUR-BACKEND.example.com/api`

5. Push to `main`.
6. The workflow builds Next.js and deploys `out/` to `gh-pages`.

Your site will be:

`https://YOUR_USERNAME.github.io/AI-Text-to-Video-Generator/`

### Backend API contract

The secure backend should expose:

- `POST /generate` → `{ "operationId": "..." }`
- `GET /status?id=...` → `{ "status": "processing|completed|failed", "progress": 0-100, "videoUrl": "..." }`
- `GET /video?uri=...` → streams/proxies the provider video securely

The existing Google Veo server implementation from the original project can be hosted separately as this backend. Keep its `GEMINI_API_KEY` on the server.
