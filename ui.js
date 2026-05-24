/**
 * PhishMail - UI Controller & DOM Manipulation Module
 */
import { runThreatAnalysis } from "./app.js";

document.addEventListener("DOMContentLoaded", () => {
    // Input Fields DOM Elements
    const senderEmailInput = document.getElementById("senderEmail");
    const displayNameInput = document.getElementById("displayName");
    const subjectLineInput = document.getElementById("subjectLine");
    const emailContentInput = document.getElementById("emailContent");
    const suspiciousUrlInput = document.getElementById("suspiciousUrl");
    const emailHeadersInput = document.getElementById("emailHeaders");

    // Interactive Action DOM Elements
    const btnAnalyze = document.getElementById("btnAnalyze");
    const btnText = document.getElementById("btnText");
    const btnSpinner = document.getElementById("btnSpinner");
    const resultsSection = document.getElementById("resultsSection");
    const resultsContainer = document.getElementById("resultsContainer");
    const btnFillExampleHeader = document.getElementById("btnFillExampleHeader");

    // Injectable debug mock header tool action
    if (btnFillExampleHeader) {
        btnFillExampleHeader.addEventListener("click", () => {
            emailHeadersInput.value = `From: bounce-alert@micr0soft-security.com\nReply-To: tracker-handler@attacker-server.ru\nReceived: from hidden-relay.ru (185.220.101.5)\nSubject: Security Threat Detected`;
        });
    }

    /**
     * Primary Submission Core UI Pipeline Event Listener
     */
    btnAnalyze.addEventListener("click", () => {
        // 1. Trigger visual processing status states
        btnAnalyze.disabled = true;
        btnSpinner.classList.remove("d-none");
        btnText.textContent = "Processing Security Vector...";
        resultsSection.classList.add("d-none"); // Hide stale results if running a re-scan

        // 2. Extract input values into structural configuration payload format
        const analysisPayload = {
            senderEmail: senderEmailInput.value.trim(),
            displayName: displayNameInput.value.trim(),
            subject: subjectLineInput.value.trim(),
            content: emailContentInput.value.trim(),
            url: suspiciousUrlInput.value.trim(),
            headers: emailHeadersInput.value.trim()
        };

        // 3. Simulate realistic async scanning engine delay latency (1.8s)
        setTimeout(() => {
            try {
                // Execute backend threat scoring logic calculation pipeline modules
                const data = runThreatAnalysis(analysisPayload);
                console.log(data);                // Build and update HTML components into target DOM container nodes
                renderAnalysisResults(data, analysisPayload.url);

                // Reveal results section and perform smooth scroll adjustments
                resultsSection.classList.remove("d-none");
                resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });

            } catch (error) {
                console.error("Analysis Pipeline Exception Failure Event Checked:", error);
                alert("An internal parsing error compromised telemetry analysis calculations.");
            } finally {
                // Restore primary CTA button interactive status indicators
                btnAnalyze.disabled = false;
                btnSpinner.classList.add("d-none");
                btnText.innerHTML = `<i class="bi bi-cpu-fill me-2"></i>Analyze Threat`;
            }
        }, 1800);
    });

    /**
     * Generates and mounts dynamic component UI nodes inside results layout grid wrapper
     */
    function renderAnalysisResults(data, plainUrlInput) {
        // Clear old DOM child layout instances safely before writing append sweeps
        resultsContainer.innerHTML = "";

        // Component 1: Risk Score Display Card
        const progressBarColor = data.riskScore > 70 ? "bg-danger" : data.riskScore > 40 ? "bg-warning" : "bg-success";
        const riskScoreCard = `
            <div class="col-md-4">
                <div class="card custom-card bg-white p-4 text-center border h-100 d-flex flex-column justify-content-center">
                    <span class="text-muted fw-semibold small text-uppercase tracking-wider">Threat Level</span>
                    <h2 class="display-3 fw-black text-phish my-2">${data.threatLevel}</h2>
                    <div class="progress mb-2 rounded-pill" style="height: 10px;">
                        <div class="progress-bar ${progressBarColor}" role="progressbar" style="width: ${data.riskScore}%"></div>
                    </div>
                    <span class="fw-bold text-dark">Risk Score: ${data.riskScore}/100</span>
                </div>
            </div>
        `;

        // Component 2: Key Indicators Findings List Card
        let indicatorsListItems = `<li class="list-group-item px-0 text-muted small py-3">No suspicious behavioral indicators flagged inside threat inputs.</li>`;
        if (data.keyIndicators && data.keyIndicators.length > 0) {
            indicatorsListItems = data.keyIndicators.map(finding => `
                <li class="list-group-item px-0 d-flex align-items-start gap-3 border-0">
                    <i class="bi bi-x-circle-fill text-phish fs-5 mt-0.5"></i>
                    <div>
                        <strong class="text-dark d-block">${finding}</strong>
                    </div>
                </li>
            `).join('');
        }

        const findingsCard = `
            <div class="col-md-8">
                <div class="card custom-card bg-white p-4 border h-100">
                    <h4 class="h6 fw-bold text-dark text-uppercase mb-3">
                        <i class="bi bi-exclamation-triangle-fill text-phish me-2"></i>Key Indicators Found
                    </h4>
                    <ul class="list-group list-group-flush">
                        ${indicatorsListItems}
                    </ul>
                </div>
            </div>
        `;

        // Component 3: Dynamic URL Vector Breakdown Inspection Panel Card
        const displayUrl = plainUrlInput ? plainUrlInput : "No URL target link strings provided for evaluation sweeps.";
        const urlCertText = data.urlInspection.usesHttp ? "Insecure Connection (Plain HTTP)" : "Encrypted Active Connection (HTTPS Verified)";
        const urlCertIcon = data.urlInspection.usesHttp ? "bi-unlock-fill text-danger" : "bi-lock-fill text-success";
        
        const urlInspectionCard = `
            <div class="col-md-6">
                <div class="card custom-card bg-white p-4 border">
                    <h4 class="h6 fw-bold text-dark text-uppercase mb-3"><i class="bi bi-globe me-2 text-phish"></i>URL Inspection Vector</h4>
                    <div class="bg-light p-3 rounded-3 mb-3">
                        <code class="text-break text-phish">${displayUrl}</code>
                    </div>
                    <div class="d-flex justify-content-between border-bottom py-2 small">
                        <span class="text-muted">Transport Layer Layer Status</span>
                        <span class="fw-medium"><i class="bi ${urlCertIcon}"></i> ${urlCertText}</span>
                    </div>
                    <div class="d-flex justify-content-between py-2 small">
                        <span class="text-muted">Typosquatting Match Signature</span>
                        <span class="${data.urlInspection.detectedTyposquatting ? 'text-danger' : 'text-success'} fw-medium">
                            <i class="bi ${data.urlInspection.detectedTyposquatting ? 'bi-shield-slash-fill' : 'bi-shield-check-fill'}"></i> 
                            ${data.urlInspection.detectedTyposquatting ? 'High-risk lookalike signature flagged' : 'No pattern distortions detected'}
                        </span>
                    </div>
                </div>
            </div>
        `;

        // Component 4: Actionable Playbook Defense Recommendations Container Card
        let recommendationsItems = data.recommendations.map(tip => `
            <div class="d-flex gap-2 small">
                <i class="bi bi-arrow-right-short text-phish fw-bold"></i>
                <span class="text-dark">${tip}</span>
            </div>
        `).join('');

        const recommendationsCard = `
            <div class="col-md-6">
                <div class="card custom-card bg-white p-4 border border-dark">
                    <h4 class="h6 fw-bold text-dark text-uppercase mb-3"><i class="bi bi-shield-check text-success me-2"></i>Actionable Defensive Playbook</h4>
                    <div class="d-flex flex-column gap-2.5">
                        ${recommendationsItems}
                    </div>
                </div>
            </div>
        `;

        // Inject compiled string modules sequentially inside unified inner HTML targets
        resultsContainer.innerHTML = riskScoreCard + findingsCard + urlInspectionCard + recommendationsCard;
    }
});