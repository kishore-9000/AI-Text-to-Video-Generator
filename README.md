# VeoForge — AI Text-to-Video Generator

A Next.js App Router application that sends text prompts to the real Google Gemini API video-generation endpoint for Veo 3.1, monitors the asynchronous operation, and securely proxies the finished video to the browser.

## Provider

This project integrates **Google Veo 3.1** through the Gemini API. The integration uses the documented `predictLongRunning` endpoint and polls the returned operation until `done` is true.

Current Veo 3.1 Gemini API constraints are reflected in the UI: 8-second text-to-video output, with 16:9 or 9:16 aspect ratios. 1:1 is displayed because the product requested that control, but is intentionally disabled at generation time rather than pretending it works.

## API key

1. Create a Google AI Studio / Gemini API key with access to the selected Veo model.
2. Copy `.env.example` to `.env.local`.
3. Put the key in `GEMINI_API_KEY`.
4. Never use `NEXT_PUBLIC_GEMINI_API_KEY`; the key must remain server-side.

## Run locally

```bash
npm install
cp .env.example .env.local
# edit .env.local and set GEMINI_API_KEY
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

When prompted, link/create the project. In the Vercel project settings, add `GEMINI_API_KEY` as an Environment Variable for Production (and Preview if desired). Then deploy:

```bash
vercel --prod
```

You can also connect the Git repository in Vercel and deploy automatically.

## Switching providers/models

The UI and API routes depend on the small `VideoProvider` interface in `lib/providers/types.ts`. Add a new provider implementation under `lib/providers/`, implement `start()` and `status()`, then update `lib/video-service.ts`. No frontend changes are required.

For a different Google Veo model, change `VEO_MODEL` in the environment. Confirm that the model supports the same request fields before enabling additional controls.

## Security / architecture

- API keys are read only in server-side modules.
- The browser calls `/api/generate`, never Google's API directly.
- Generation is asynchronous: start -> operation ID -> polling -> video URI.
- `/api/video` validates the upstream hostname and streams the generated video with the server-held API key.
- Generation history is local browser storage; add a database/auth layer if history must be shared across devices/users.
