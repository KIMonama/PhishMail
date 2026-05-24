import { suspiciousDomains } from "../config/suspiciousDomains.js";
import { scoringWeights } from "../config/scoringWeights.js";
import { normalizeText } from "../utils/parserHelpers.js";

export function analyzeSender(senderEmail, displayName) {
  const findings = [];
  let score = 0;

  const normalizedSender = normalizeText(senderEmail);

  suspiciousDomains.forEach(domain => {
    if (normalizedSender.includes(domain)) {
      findings.push(
        `Suspicious sender pattern detected: ${domain}`
      );

      score += scoringWeights.suspiciousDomain;
    }
  });

  if (
    normalizeText(displayName).includes("microsoft") &&
    !normalizedSender.includes("microsoft")
  ) {
    findings.push("Sender display name mismatch detected");

    score += 15;
  }

  return { findings, score };
}