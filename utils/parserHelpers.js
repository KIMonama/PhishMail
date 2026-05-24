export function extractHeaderValue(headers, key) {
  const regex = new RegExp(`${key}:\\s(.+)`, "i");

  const match = headers.match(regex);

  return match ? match[1].trim() : null;
}

export function normalizeText(text) {
  return text.toLowerCase().trim();
}