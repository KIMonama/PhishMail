import { scoringWeights } from "../config/scoringWeights.js";

import {
  extractHeaderValue,
  normalizeText
} from "../utils/parserHelpers.js";

export function analyzeHeaders(headers) {
  const findings = [];

  let score = 0;

  const result = {
    spf: "NOT PROVIDED",
    dkim: "NOT PROVIDED",
    dmarc: "NOT PROVIDED",
    replyToMismatch: false
  };

  if (!headers || headers.trim() === "") {
    return { findings, score, result };
  }

  const normalizedHeaders = normalizeText(headers);

  const replyTo =
    extractHeaderValue(headers, "Reply-To");

  if (normalizedHeaders.includes("spf: fail")) {
    findings.push("SPF authentication failed");

    result.spf = "FAIL";

    score += scoringWeights.spfFail;
  }

  if (normalizedHeaders.includes("dkim: fail")) {
    findings.push("DKIM validation failed");

    result.dkim = "FAIL";

    score += scoringWeights.dkimFail;
  }

  if (normalizedHeaders.includes("dkim: pass")) {
    result.dkim = "PASS";
  }

  if (normalizedHeaders.includes("dmarc")) {
    result.dmarc = "PRESENT";
  } else {
    findings.push("DMARC policy missing");

    result.dmarc = "MISSING";

    score += scoringWeights.dmarcMissing;
  }

  if (
    replyTo &&
    normalizeText(replyTo).includes(".ru")
  ) {
    findings.push(
      "Suspicious Reply-To domain detected"
    );

    result.replyToMismatch = true;

    score += scoringWeights.replyToMismatch;
  }

  return { findings, score, result };
}