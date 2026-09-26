# LectureMind AI — Windows Desktop App

This repository packages the supplied `LectureMind_AI_app.html` as a Windows desktop application using Electron and electron-builder.

## Files

- `LectureMind_AI_app.html` — the supplied LectureMind AI application
- `main.js` — Electron main process
- `preload.js` — isolated Electron preload bridge
- `package.json` — Electron and Windows build configuration
- `.github/workflows/build-windows.yml` — GitHub Actions Windows build
- `.gitignore` — files that should not be committed

## Build on GitHub

1. Create an empty GitHub repository.
2. Upload the files/folders from this project to the repository root.
3. Make sure `.github/workflows/build-windows.yml` is present exactly at that path.
4. Open **Actions**.
5. Select **Build LectureMind AI for Windows**.
6. Click **Run workflow** and select `main`.
7. When the job is green, open the workflow run and download the `LectureMind-AI-Windows` artifact.

The workflow intentionally does **not** use `actions/setup-node` npm caching. Therefore a `package-lock.json` is not required for the GitHub Actions setup step.

## Local build

Install Node.js 20 or newer, then run:

```bash
npm install
npm start
```

To build Windows installers:

```bash
npm run build:win
```

Outputs are placed in `dist/`.

## Windows outputs

The build creates:

- an NSIS installer `.exe`
- a portable `.exe`

The Windows build targets 64-bit Windows (`x64`).

## Important: API keys

Do not commit private API keys to this repository. The supplied HTML has been prepared without the previously embedded provider key strings. Configure your own provider/API key from the app's Settings when needed.

## Internet-dependent features

The supplied HTML references browser libraries from public CDNs and uses remote AI providers. Those features require Internet access. Local application data continues to use browser IndexedDB inside the Electron app profile.

## Windows security warning

The GitHub-built installer is not code-signed with a commercial Windows certificate. Windows SmartScreen may therefore display an unknown-publisher warning on first installation. That warning is about the signing status, not necessarily about the application contents.
