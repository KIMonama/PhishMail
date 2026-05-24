import { scoringWeights } from "../config/scoringWeights.js";

import { suspiciousDomains } from "../config/suspiciousDomains.js";

import { regexPatterns } from "../utils/regexHelpers.js";

export function analyzeUrl(url) {
  const findings = [];
  let score = 0;

  const result = {
    hasUrl: !!url,
    usesHttp: false,
    containsIpAddress: false,
    suspiciousTld: false,
    detectedTyposquatting: false
  };

  if (!url) {
    return { findings, score, result };
  }

  if (regexPatterns.httpProtocol.test(url)) {
    findings.push("URL uses insecure HTTP protocol");

    result.usesHttp = true;

    score += scoringWeights.httpUsage;
  }

  if (regexPatterns.ipAddress.test(url)) {
    findings.push("URL contains raw IP address");

    result.containsIpAddress = true;

    score += scoringWeights.suspiciousUrl;
  }

  suspiciousDomains.forEach(domain => {
    if (url.includes(domain)) {
      findings.push(
        `Suspicious domain pattern detected: ${domain}`
      );

      result.suspiciousTld = true;

      score += scoringWeights.suspiciousUrl;
    }
  });

  return { findings, score, result };
}