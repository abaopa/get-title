# Get Page Title

A lightweight Chrome Extension (Manifest V3) that extracts the title of the active web page and automatically copies it to your clipboard.

## Features

- **Auto-Copy on Click**: Click the extension icon and the page title is immediately copied to your clipboard.
- **Title Cleanup**: Automatically trims unnecessary whitespace and line breaks from page titles.
- **Smart Fallback**: If the browser has not finished parsing `<title>` in `document.title`, it falls back to inspecting the raw page HTML source.
- **Robust Clipboard Support**: Uses the modern Clipboard API with an automatic `document.execCommand` textarea fallback for restricted contexts.
- **Manual Copy**: Includes a "Copy again" button in the popup.

## File Structure

- [`manifest.json`](manifest.json) — Extension configuration (Manifest V3).
- [`popup.html`](popup.html) — Popup UI displaying the title and copy status.
- [`popup.js`](popup.js) — Tab querying, title extraction logic, and clipboard handling.

## Installation

1. Clone or download this repository to your local machine.
2. Open Google Chrome (or any Chromium-based browser like Brave or Microsoft Edge).
3. Navigate to `chrome://extensions` (or `edge://extensions`).
4. Enable **Developer mode** (toggle in the top-right corner).
5. Click **Load unpacked** and select this directory (`get-title`).
6. The extension is now installed. Pin it to your toolbar for quick access!

## Permissions

- `activeTab`: Accesses the currently active tab when the extension icon is clicked.
- `scripting`: Executes the title extraction script inside the active tab.
- `clipboardWrite`: Writes the formatted title into your clipboard.

## License

MIT
