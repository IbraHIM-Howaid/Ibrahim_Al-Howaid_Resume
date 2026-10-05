// Visit counting with GoatCounter (https://www.goatcounter.com): free, open source, no cookies.

// Your GoatCounter site code, e.g. 'alhowaid' for alhowaid.goatcounter.com. Empty = analytics off.
export const GOATCOUNTER_CODE = '';

// Show the total in the footer once it reaches this many visits (small numbers can look worse than none).
// Needs "Allow adding visitor counts on your website" turned on in GoatCounter's settings.
export const SHOW_VISIT_COUNTER = true;
export const MIN_VISITS_TO_SHOW = 250;

const ENDPOINT = GOATCOUNTER_CODE && `https://${GOATCOUNTER_CODE}.goatcounter.com`;

// Only count the real site, so local dev, previews, and the github.io mirror don't inflate the numbers.
const isProduction = () => window.location.hostname === 'al-howaid.me';

export function startAnalytics() {
  if (!ENDPOINT || !isProduction()) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://gc.zgo.at/count.js';
  script.dataset.goatcounter = `${ENDPOINT}/count`;
  document.head.appendChild(script);
}

// Total visits for the whole site, or null if unavailable (analytics off, counter not public, blocked).
export async function fetchTotalVisits() {
  if (!ENDPOINT || !SHOW_VISIT_COUNTER) return null;
  try {
    const res = await fetch(`${ENDPOINT}/counter/TOTAL.json`);
    if (!res.ok) return null;
    const { count } = await res.json();
    // GoatCounter formats the number for display (e.g. "1,284" or "1 284"), so keep only the digits.
    const total = parseInt(String(count).replace(/\D/g, ''), 10);
    return Number.isFinite(total) ? total : null;
  } catch {
    return null;
  }
}
