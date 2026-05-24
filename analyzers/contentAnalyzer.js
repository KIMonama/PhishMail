import { suspiciousKeywords } from "../config/suspiciousKeywords.js";
import { scoringWeights } from "../config/scoringWeights.js";

export function analyzeContent(content) {
  const findings = [];
  let score = 0;

  suspiciousKeywords.forEach(keyword => {
    if (content.toLowerCase().includes(keyword)) {
      findings.push(`Suspicious phishing phrase detected: "${keyword}"`);
      score += scoringWeights.suspiciousKeyword;
    }
  });

  return { findings, score };
}