import { suspiciousKeywords } from "../config/suspiciousKeywords.js";
import { scoringWeights } from "../config/scoringWeights.js";

export function analyzeSubject(subject) {
  const findings = [];
  let score = 0;

  suspiciousKeywords.forEach(keyword => {
    if (subject.toLowerCase().includes(keyword)) {
      findings.push(`Suspicious subject keyword detected: "${keyword}"`);
      score += scoringWeights.suspiciousKeyword;
    }
  });

  return { findings, score };
}