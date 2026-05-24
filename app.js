import { analyzeSender } from "./analyzers/senderAnalyzer.js";
import { analyzeSubject } from "./analyzers/subjectAnalyzer.js";
import { analyzeContent } from "./analyzers/contentAnalyzer.js";
import { analyzeUrl } from "./analyzers/urlAnalyzer.js";
import { analyzeHeaders } from "./analyzers/headerAnalyzer.js";
import { calculateThreatLevel } from "./analyzers/scoringEngine.js";

export function runThreatAnalysis(payload) {
  let totalScore = 0;

  const indicators = [];

  const senderAnalysis = analyzeSender(
    payload.senderEmail,
    payload.displayName
  );

  const subjectAnalysis = analyzeSubject(payload.subject);

  const contentAnalysis = analyzeContent(payload.content);

  const urlAnalysis = analyzeUrl(payload.url);

  const headerAnalysis = analyzeHeaders(payload.headers);

  const analyses = [
    senderAnalysis,
    subjectAnalysis,
    contentAnalysis,
    urlAnalysis,
    headerAnalysis
  ];

  analyses.forEach(analysis => {
    totalScore += analysis.score;
    indicators.push(...analysis.findings);
  });

  const threatLevel = calculateThreatLevel(totalScore);

  return {
    threatLevel,
    riskScore: Math.min(totalScore, 100),

    keyIndicators: indicators,

    urlInspection: urlAnalysis.result,

    headerAnalysis: headerAnalysis.result,

    recommendations: [
      "Do not click suspicious links",
      "Verify sender independently",
      "Avoid downloading unexpected attachments",
      "Report suspicious emails to your IT/security team"
    ]
  };
}