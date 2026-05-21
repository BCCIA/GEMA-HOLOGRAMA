# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static single-page web app that embeds a D-ID AI avatar chat agent ("Luna") inside an iframe. There is no build step, no package manager, and no framework — open `index.html` directly in a browser or serve it with any static file server.

## Running Locally

Open `index.html` in a browser, or serve it with a simple HTTP server (required for some browser security policies around iframes):

```
npx serve .
# or
python -m http.server 8080
```

## Architecture

The app has three files:

- **`index.html`** — Single page. Left side shows the "Luna" branding text; right side renders `#chat-container` which holds the D-ID iframe.
- **`style.css`** — All styling. Uses CSS custom properties (`--first-color`, z-index layers). Three staggered `.overlay` divs produce the GSAP entrance animation. `#lock-overlay` is the invisible ghost layer that intercepts clicks until the PIN is entered.
- **`main.js`** — All logic, no dependencies except GSAP (loaded from CDN). Four sections:
  1. **PIN lock** — A transparent `#lock-overlay` div covers the chat. On click it calls `prompt()` for a PIN (`PIN_CORRECTO = "5703"`). Authorization state is stored in `localStorage("pinAccesoAutorizado")`.
  2. **DIDChat class** — Creates and appends an `<iframe>` pointing to the D-ID agent share URL (`this.chatUrl` at line 81). To swap the AI agent, change only that URL string.
  3. **GSAP animations** — Entrance overlays sweep off-screen, then home elements fade in with staggered delays.
  4. **Auto-refresh** — After 5 minutes of inactivity, shows a "still there?" message and reloads after 5 s if no interaction. Any click/touch cancels it.

## Key Details

- **To change the D-ID agent**: edit `this.chatUrl` on line 81 of `main.js`. The value must be a quoted string.
- **To change the PIN**: edit `PIN_CORRECTO` on line 2 of `main.js`.
- The lock/refresh control buttons (top-right, `.control-buttons`) use Ionicons loaded from CDN. The lock button clears `localStorage` and reloads; the refresh button optionally clears storage before a cache-busted reload.
- DevTools are blocked client-side (F12, Ctrl+Shift+I/J/C, Ctrl+U, right-click are all suppressed).
- The app has no backend, no API keys in code, and no build artifacts to ignore.
