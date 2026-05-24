# PhishMail

## Overview

PhishMail is a lightweight cybersecurity-focused phishing analysis platform designed to simulate how suspicious emails can be investigated using threat indicators commonly associated with phishing and social engineering attacks.

The project was built as a cybersecurity portfolio project to demonstrate practical skills in:

- Threat analysis
- Detection engineering
- SOC analyst thinking
- Email threat investigation
- Rule-based phishing detection
- Frontend security tooling
- Secure UI/UX design principles

Rather than functioning as a fully commercial email security platform, PhishMail focuses on showcasing how phishing attacks can be analyzed through observable indicators and lightweight detection logic directly inside the browser.

---

# Project Goal

The goal of this project is to educate users and demonstrate how phishing emails can be identified using:

- Sender analysis
- Subject line inspection
- Suspicious language detection
- URL inspection
- Email header analysis
- Risk scoring logic
- Threat correlation

The application aims to simulate the workflow of a junior SOC analyst or threat investigator performing initial phishing triage.

---

# Why This Project Was Built

Phishing remains one of the most common cyber attack vectors used in:

- Credential theft
- Malware delivery
- Business email compromise (BEC)
- Social engineering attacks
- Financial fraud

Many users struggle to identify malicious emails because phishing attacks often imitate trusted brands and exploit urgency, fear, and trust.

PhishMail was created to demonstrate how common phishing indicators can be detected programmatically using modular JavaScript analyzers.

---

# Core Detection Parameters

The platform analyzes multiple indicators across an email to determine a potential threat score.

## 1. Sender Email Analysis

Checks include:

- Suspicious domains
- Typosquatting attempts
- Fake brand impersonation
- Unusual top-level domains (TLDs)

### Example
```text
micr0soft-security-alert.xyz
```

---

## 2. Display Name Mismatch Detection

The application compares:

- Display name
- Actual sender domain

This helps identify spoofing attempts where attackers imitate trusted companies.

### Example
```text
Display Name: Microsoft Security
Sender Email: attacker-domain.ru
```

---

## 3. Subject Line Inspection

The analyzer detects phishing-related urgency and manipulation language such as:

- "Urgent"
- "Verify immediately"
- "Account suspended"
- "Security alert"
- "Reset password"

These are commonly used in social engineering attacks.

---

## 4. Email Content Analysis

The body of the email is analyzed for:

- Credential harvesting attempts
- Threatening language
- Financial scams
- Suspicious phishing phrases
- Psychological manipulation patterns

---

## 5. URL Inspection Engine

URLs are analyzed for:

- Insecure HTTP usage
- Raw IP addresses
- Suspicious TLDs
- Typosquatting patterns
- Fake login domains

### Example Indicators
```text
http://paypal-login-secure.xyz
http://192.168.1.55/login
```

---

## 6. Advanced Email Header Analysis (Optional)

For advanced users, the application can inspect raw email headers to analyze:

- SPF validation
- DKIM validation
- DMARC presence
- Reply-To mismatches
- Suspicious routing paths

This simulates lightweight forensic email analysis techniques used in SOC environments.

---

# Threat Scoring System

Each analyzer contributes to a cumulative risk score out of 100.

The application then categorizes threats into:

| Risk Score | Threat Level |
|------------|--------------|
| 0 - 39     | LOW          |
| 40 - 69    | MEDIUM       |
| 70 - 100   | HIGH         |

The scoring engine uses weighted detection logic to simulate rule-based threat correlation.

---

# Technical Architecture

PhishMail follows a modular frontend-only architecture.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Bootstrap 5

---

# Architectural Design

The project is separated into:

## Analyzers
Responsible for:
- Threat detection
- Pattern matching
- Security checks

## Utility Helpers
Responsible for:
- Regex patterns
- Header parsing
- Reusable helper logic

## Config Files
Responsible for:
- Suspicious keyword lists
- Scoring weights
- Domain signatures

---

# Security Philosophy

This project prioritizes:

- Explainable detections
- User education
- Accessibility
- Lightweight analysis
- Browser-based security tooling

The platform is intentionally designed to remain understandable to both technical and non-technical users.

---

# Educational Objective

PhishMail was built to strengthen practical cybersecurity skills in:

- SOC analysis
- Threat detection
- Detection engineering
- Security tooling development
- Secure frontend architecture
- Cybersecurity project design

The project also demonstrates how cybersecurity concepts can be translated into usable and interactive tooling.

---

# Future Improvements

Potential future enhancements include:

- VirusTotal API integration
- Threat intelligence feeds
- Machine learning classification
- Persistent scan history
- PDF report exporting
- User authentication
- Real-time domain reputation checks

---

# Disclaimer

PhishMail is an educational cybersecurity project intended for learning, portfolio development, and phishing awareness demonstrations.

It is not intended to replace enterprise-grade email security solutions.