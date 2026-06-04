export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  read_time: string;
  created_at: string;
  author_name: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with CQL for HEDIS Measures",
    slug: "getting-started-cql-hedis-measures",
    category: "CQL",
    excerpt:
      "Clinical Quality Language (CQL) is transforming how healthcare organizations implement digital quality measures. Here's everything you need to know to get started.",
    read_time: "8 min read",
    created_at: "May 5, 2026",
    author_name: "Asim Nipty",
    content: `
      <p>Clinical Quality Language (CQL) is transforming how healthcare organizations implement digital quality measures. Unlike older approaches, CQL provides a human-readable, machine-executable syntax that bridges the gap between clinicians and developers.</p>

      <h2>What is CQL?</h2>
      <p>CQL is an HL7 standard that provides two levels of expression: a human-readable format and a machine-processable format. It was designed specifically for the healthcare domain, making it easier to express complex clinical logic clearly.</p>

      <blockquote>"CQL is not just a query language — it's a shared vocabulary between clinical subject matter experts and software engineers."</blockquote>

      <h2>Setting Up Your First HEDIS Measure</h2>
      <p>Before writing any CQL, you need three things:</p>
      <ul>
        <li>A FHIR R4 server with patient data</li>
        <li>A CQL translation service (such as the open-source <strong>cql-translation-service</strong>)</li>
        <li>A measure execution engine</li>
      </ul>

      <h3>A Simple Example</h3>
      <p>Here's how a basic patient age filter looks in CQL:</p>
      <pre><code>library HEDISExample version '1.0.0'

using FHIR version '4.0.1'

context Patient

define "Initial Population":
  AgeInYearsAt(start of "Measurement Period") >= 18
    and AgeInYearsAt(start of "Measurement Period") &lt; 75</code></pre>

      <p>Notice how readable this is compared to raw SQL or FHIR queries. The <code>AgeInYearsAt</code> function is built into CQL's clinical model, removing the need for manual date arithmetic.</p>

      <h2>Common Pitfalls</h2>
      <p>When implementing HEDIS measures with CQL, watch out for:</p>
      <ul>
        <li><strong>Null handling</strong> — CQL uses three-valued logic (true/false/null). Always account for missing data.</li>
        <li><strong>Interval alignment</strong> — Measurement periods must be carefully aligned with encounter dates.</li>
        <li><em>Terminology binding</em> — Ensure your value sets are properly bound and versioned.</li>
      </ul>

      <h2>Next Steps</h2>
      <p>Once you have a basic measure running, explore the <strong>FHIR Measure Report</strong> resource to understand how measure results are structured and reported back to payers and registries.</p>
      <p>In the next article in this series, we'll walk through building a full Colorectal Cancer Screening (COL) measure from scratch using CQL and the Bisharod platform.</p>
    `,
  },
  {
    id: 2,
    title: "FHIR R4 vs R5: What Healthcare Teams Need to Know",
    slug: "fhir-r4-vs-r5-what-healthcare-teams-need-to-know",
    category: "FHIR",
    excerpt:
      "The transition from FHIR R4 to R5 brings significant improvements in interoperability, but also breaking changes your team needs to plan for carefully.",
    read_time: "6 min read",
    created_at: "April 28, 2026",
    author_name: "Asim Nipty",
    content: `
      <p>FHIR R5 was officially published in March 2023, and while R4 remains the dominant version in production systems today, understanding the key differences will help your team plan ahead.</p>

      <h2>Why R5 Matters</h2>
      <p>HL7's R5 release focused on three major goals:</p>
      <ul>
        <li>Improving <strong>clinical reasoning</strong> support</li>
        <li>Enhancing <strong>subscription</strong> and real-time notification models</li>
        <li>Introducing better <strong>cross-version compatibility</strong> mechanisms</li>
      </ul>

      <h2>Key Breaking Changes</h2>

      <h3>1. MedicationRequest Restructuring</h3>
      <p>The <code>MedicationRequest</code> resource saw significant changes. The <code>medication[x]</code> choice type was simplified:</p>
      <pre><code>// R4
"medicationCodeableConcept": {
  "coding": [{ "system": "...", "code": "..." }]
}

// R5
"medication": {
  "concept": {
    "coding": [{ "system": "...", "code": "..." }]
  }
}</code></pre>

      <h3>2. Subscription Overhaul</h3>
      <p>R5 completely redesigned the Subscription model. The old <em>channel-based</em> approach is replaced with a topic-based system using <code>SubscriptionTopic</code> resources — much more expressive and easier to manage at scale.</p>

      <h3>3. Evidence-Based Medicine Resources</h3>
      <p>R5 added a suite of EBM resources including <strong>ArtifactAssessment</strong>, <strong>ResearchStudy</strong> updates, and <strong>EvidenceReport</strong> — critical for organizations working with clinical guidelines and quality improvement.</p>

      <h2>What to Do Now</h2>
      <blockquote>"Don't migrate to R5 just because it's newer. Migrate when your use cases demand features that R5 uniquely provides."</blockquote>
      <ul>
        <li>Stay on <strong>R4</strong> for production payer and EHR integrations through 2026</li>
        <li>Begin <em>piloting</em> R5 for new analytics and research workloads</li>
        <li>Map your custom extensions now — many have been absorbed into R5 core resources</li>
      </ul>

      <h2>Bisharod's Approach</h2>
      <p>The Bisharod platform is designed to be version-aware. Our FHIR proxy layer can translate between R4 and R5 representations, letting your internal systems speak R5 while external integrations remain on R4 — giving you a smooth migration path without a hard cutover.</p>
    `,
  },
  {
    id: 3,
    title: "Automating Prior Authorization with FHIR and CDS Hooks",
    slug: "automating-prior-auth-fhir-cds-hooks",
    category: "Prior Auth",
    excerpt:
      "Prior authorization is one of the biggest administrative burdens in US healthcare. Learn how FHIR and CDS Hooks can automate the workflow end-to-end.",
    read_time: "10 min read",
    created_at: "April 15, 2026",
    author_name: "Asim Nipty",
    content: `
      <p>Prior authorization (PA) consumes over 10 hours of physician time per week on average. New CMS mandates require payers to implement FHIR-based PA APIs by 2026 — here's what that means in practice.</p>

      <h2>The CMS Prior Authorization Rule</h2>
      <p>The CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) requires impacted payers to implement:</p>
      <ul>
        <li>A <strong>Prior Authorization API</strong> based on FHIR R4</li>
        <li>A <strong>Provider Access API</strong> for sharing PA decisions</li>
        <li><strong>72-hour</strong> decision turnaround for urgent requests</li>
      </ul>

      <h2>CDS Hooks: The Real-Time Layer</h2>
      <p>CDS Hooks is the mechanism that brings PA intelligence into the clinical workflow at the point of care. A hook fires when a clinician is about to place an order, and the PA decision engine responds in real time.</p>
      <pre><code>// CDS Hook Service Response
{
  "cards": [{
    "summary": "Prior Authorization Required",
    "indicator": "warning",
    "detail": "Humira (adalimumab) requires PA for this patient.",
    "suggestions": [{
      "label": "Submit PA Request",
      "actions": [{
        "type": "create",
        "resource": {
          "resourceType": "Task",
          "code": { "text": "prior-auth-request" }
        }
      }]
    }]
  }]
}</code></pre>

      <h2>Architecture Overview</h2>
      <p>A complete FHIR-native PA workflow involves four layers:</p>
      <ol>
        <li><strong>EHR Integration</strong> — CDS Hooks subscription at order entry</li>
        <li><strong>Eligibility Check</strong> — Real-time check against payer's Coverage resource</li>
        <li><strong>Clinical Data Pull</strong> — Relevant diagnoses, prior treatments via <code>$everything</code></li>
        <li><strong>Decision Engine</strong> — CQL-based rules evaluate PA criteria</li>
      </ol>

      <blockquote>"The fastest PA is one that never needs to be submitted. Smart exemption logic is as important as the submission workflow itself."</blockquote>

      <h2>Getting Started with Bisharod</h2>
      <p>Bisharod's <em>Prior Auth module</em> provides a pre-built CDS Hooks service, a FHIR-native PA request builder, and a rules engine powered by CQL. Teams can go from zero to a working PA automation in days, not months.</p>
    `,
  },
];
