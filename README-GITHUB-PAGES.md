# GitHub Pages deployment

This project is configured for a static Next.js export at:

`https://YOUR_USERNAME.github.io/AI-Text-to-Video-Generator/`

## 1. Push to GitHub

Push the project to a repository named exactly `AI-Text-to-Video-Generator` and use the `main` branch.

## 2. Configure the backend URL

GitHub Pages can only host the static frontend. The original Next.js `/api` routes cannot run on GitHub Pages, so this frontend calls a separate secure backend.

In GitHub go to:
`Settings → Secrets and variables → Actions → Variables → New repository variable`

Create:

`NEXT_PUBLIC_API_BASE_URL`

with a value such as:

`https://your-backend.example.com/api`

The backend must expose:

- `POST /generate`
- `GET /status?id=<operation-id>`
- `GET /video?uri=<provider-video-uri>`

Keep `GEMINI_API_KEY` only on that backend. Never put it in GitHub Pages or a `NEXT_PUBLIC_*` variable.

## 3. Enable Pages

Go to:
`Settings → Pages`

Set the source to **GitHub Actions**.

## 4. Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, builds `out/`, and publishes it to the `gh-pages` branch.

The site is then available at:

`https://YOUR_USERNAME.github.io/AI-Text-to-Video-Generator/`

## Why the API moved out

`output: "export"` makes Next.js generate static HTML/CSS/JS. Server-side route handlers under `app/api` cannot execute on GitHub Pages. Moving the provider calls to a separately hosted backend keeps the Gemini/Veo credential private while allowing the GitHub Pages frontend to remain static.
