const titleEl = document.getElementById("title");
const statusEl = document.getElementById("status");
const copyBtn = document.getElementById("copyBtn");

// Title Cleanup: normalizes whitespace, line breaks, and trims the title
function cleanTitle(rawTitle) {
  if (!rawTitle) return "";
  return rawTitle
    .replace(/[\r\n\t]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Fallback for cases where the async clipboard API is refused
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
  statusEl.textContent = "✓ Copied to clipboard";
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: async () => {
        // 1. Normal case: the browser already parsed <title>
        if (document.title) return document.title;

        // 2. Fallback: match "</script><title>TITLE</title>" in the raw source
        const html = await (await fetch(location.href)).text();
        const m = html.match(/<\/script>\s*<title[^>]*>([\s\S]*?)<\/title>/i);
        
        return m ? m[1].trim() : "";
      },
    });

    const title = cleanTitle(result);

    if (!title) {
      titleEl.textContent = "(no title found)";
      return;
    }

    titleEl.textContent = title;
    copyBtn.disabled = false;
    copyBtn.addEventListener("click", () => copyToClipboard(title));

    await copyToClipboard(title); // auto-copy when the popup opens
  } catch (err) {
    titleEl.textContent = "Error: " + err.message;
  }
});