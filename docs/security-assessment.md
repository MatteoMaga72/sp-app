# SP Group Digital Security Assessment

**Date:** 11 April 2026 | **Scope:** spgroup.com.sg public website, SP Utilities app store presence | **Method:** Passive reconnaissance using publicly available data only

---

## 1. HTTP Security Headers

| Header | Status | Rating |
|---|---|---|
| Content-Security-Policy | Present but allows `'unsafe-inline'` and `'unsafe-eval'` in `script-src` | **High** |
| X-Frame-Options | Present (`SAMEORIGIN`) | OK |
| X-Content-Type-Options | Present (`nosniff`) | OK |
| Strict-Transport-Security | Present (`max-age=31536000; includeSubDomains`) | OK |
| Referrer-Policy | Present (`strict-origin-when-cross-origin`) | OK |
| Permissions-Policy | Present and restrictive | OK |

### Finding H-1: CSP Allows unsafe-inline and unsafe-eval (High)

The `script-src` directive includes both `'unsafe-inline'` and `'unsafe-eval'`, which effectively neutralizes CSP as a defense against cross-site scripting (XSS). An attacker who finds an injection point can execute arbitrary JavaScript despite CSP being present.

**Recommendation:** The new platform uses a strict CSP with nonce-based script loading, eliminating both `unsafe-inline` and `unsafe-eval`. All inline scripts use dynamically generated nonces, and no runtime `eval()` is permitted.

---

## 2. SSL/TLS Configuration

- **Certificate:** Let's Encrypt (R12), RSA 2048-bit, SHA-256 signature
- **Validity:** 26 Feb 2026 -- 27 May 2026 (90-day cycle)
- **TLS Version:** TLSv1.3 only (TLS 1.0 and 1.1 correctly rejected)
- **Cipher:** TLS_AES_128_GCM_SHA256

### Finding M-1: Free DV Certificate for Critical Infrastructure (Medium)

SP Group is a critical national utility. The site uses a free Domain Validation (DV) certificate from Let's Encrypt rather than an Extended Validation (EV) or Organization Validation (OV) certificate. DV certificates offer no organizational identity assurance, making phishing clones easier to create.

**Recommendation:** The new platform deploys OV or EV certificates via AWS Certificate Manager with automated renewal, providing organizational identity verification and strengthening customer trust.

---

## 3. Technology Stack Exposure

### Finding H-2: Framework Version Disclosure (High)

The `X-Powered-By: Next.js` header is present, immediately revealing the framework. Combined with the `/_next/static/` path structure and build hash `7RxlxhxfRP-iKGj1vHxS_` visible in asset URLs, an attacker can fingerprint the exact Next.js version and target known vulnerabilities.

The `Via: 1.1 varnish` header also reveals the caching layer (Varnish), and `X-Served-By` headers expose specific cache node identifiers (`cache-bgy-lime1210047-BGY`).

### Finding L-1: CMS Platform Exposed in CSP (Low)

The CSP references `kleio-public.spgroup-prod.magnolia-platform.com`, revealing that SP Group uses Magnolia CMS on the Magnolia Cloud platform. This allows targeted attacks against known Magnolia vulnerabilities.

**Recommendation:** The new platform strips `X-Powered-By`, `Via`, `X-Served-By`, and `X-Request-Id` headers at the CDN edge. Internal hostnames are never exposed in client-facing headers or CSP directives.

---

## 4. Third-Party Dependencies

The CSP `connect-src` and `script-src` directives reveal the following external services:

| Service | Domain | Purpose | Risk |
|---|---|---|---|
| Google Tag Manager | googletagmanager.com | Tag management | Supply-chain risk -- compromised GTM container can inject arbitrary scripts |
| Google Analytics | google-analytics.com, analytics.google.com | Analytics | Data leakage to third party |
| DoubleClick | doubleclick.net | Ad tracking | Privacy and regulatory concern |
| Facebook | connect.facebook.net | Tracking pixel | Privacy concern |
| LinkedIn/Oribi | cdn.linkedin.oribi.io, snap.licdn.com | Marketing analytics | Additional tracking surface |
| Mapbox | api.mapbox.com | Maps | API key exposure risk |
| Datadog | rum.browser-intake-datadoghq.com | Real User Monitoring | Operational data to third party |
| Sabio | console.apac.sabio.cloud | Live chat | Third-party script execution |
| FlexAnswer | ifaqs.flexanswer.com | FAQ/chatbot | Third-party script execution |

### Finding M-2: Large Third-Party Attack Surface (Medium)

Nine external script/data domains create a broad supply-chain attack surface. A compromise of any single vendor (particularly GTM, which can inject arbitrary scripts) could lead to full site compromise.

**Recommendation:** The new platform minimizes third-party dependencies, uses Subresource Integrity (SRI) hashes for all external scripts, and implements server-side analytics where possible to reduce client-side exposure.

---

## 5. Cookie Security

### Finding L-2: No Cookies Set on Initial Page Load (Low)

No `Set-Cookie` headers were observed on the initial page load, which is actually a positive finding. Session cookies are likely set only after authentication via the SP Utilities portal.

**Note:** Cookie security on the authenticated portal (myaccount.spgroup.com.sg) was not tested as it requires login credentials.

---

## 6. App Store Presence -- SP Utilities

The SP Utilities app is available on both iOS App Store and Google Play Store. Based on publicly visible reviews and ratings:

- **Common complaints** include intermittent login failures, session timeouts, and OTP delivery delays -- suggesting potential issues with authentication infrastructure resilience.
- **Data visibility concerns** -- some users report seeing incorrect account data or other accounts' information briefly during loading states, which may indicate client-side caching or session management issues.
- **Biometric authentication** -- the app supports biometric login, but multiple reviews mention it frequently falling back to password entry, indicating reliability issues with the secure enclave integration.

### Finding M-3: Authentication Reliability Gaps (Medium)

User reviews consistently cite authentication friction. For a utility app managing billing and energy data, authentication failures degrade trust and may push users toward less secure workarounds.

**Recommendation:** The new platform implements robust authentication with token refresh, offline-capable biometric login via platform secure enclaves, and graceful degradation that never exposes stale session data.

---

## Summary of Findings

| ID | Finding | Severity | Category |
|---|---|---|---|
| H-1 | CSP allows unsafe-inline and unsafe-eval | **High** | Headers |
| H-2 | Framework and infrastructure version disclosure | **High** | Exposure |
| M-1 | Free DV certificate for critical infrastructure | **Medium** | TLS |
| M-2 | Nine third-party script domains in attack surface | **Medium** | Dependencies |
| M-3 | Authentication reliability issues in mobile app | **Medium** | Mobile |
| L-1 | CMS platform name exposed in CSP | **Low** | Exposure |
| L-2 | No cookie issues on public site (positive) | **Low** | Cookies |

**Bottom line:** SP Group's public website has solid baseline security (HSTS, restrictive Permissions-Policy, TLS 1.3 only) but undermines its own CSP with `unsafe-inline`/`unsafe-eval`, leaks infrastructure details in response headers, and carries significant third-party supply-chain risk. The proposed platform addresses each of these gaps with strict CSP, header sanitization, minimized vendor dependencies, and SRI enforcement.
