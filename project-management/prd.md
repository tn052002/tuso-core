# TUSO MVP — Product Requirements Document

**Document status:** Draft v0.1  
**Product:** TUSO  
**Target:** Web-first responsive MVP  
**Primary market:** Vietnam  
**Source of truth:** `project-management/tuso-master.md`

## 1. Purpose

This document defines the first product release that validates TUSO's core promise:

> Help a person see their nature, understand their current season, and choose an aligned next move—without presenting interpretation as prediction.

The MVP is not intended to express the whole TUSO vision. It should test whether a question-led, personally contextualized orientation is meaningful enough for users to complete, trust, save, recommend, and pay for.

## 2. Problem Statement

People often seek astrology, divination, personality systems, or self-help during moments of uncertainty. Existing options commonly fail in one of four ways:

- they predict events and weaken personal agency;
- they provide generic language with little personal recognition;
- they expose complex traditional systems without interpretation;
- they produce insight without helping the person move.

TUSO should connect an actual question to personal nature, current timing, and a grounded next step.

## 3. Goals

### Product goals

- Deliver a coherent orientation from question to next move.
- Make the result feel personally recognizable rather than generic.
- Establish trust through transparency, calm interaction, and non-deterministic language.
- Validate willingness to exchange personal data for deeper orientation.
- Validate willingness to create an account, save a result, and consider a paid continuation.

### Business goals

- Validate the Personal Meaning offer as the first value transaction.
- Establish a measurable path from anonymous visitor to identified user.
- Learn which value surface drives payment: Blueprint, Season, Personal Meaning, or guided Moves.
- Build a foundation that can later support reports, journeys, and membership.

## 4. Non-Goals

The MVP will not include:

- native iOS or Android applications;
- a public social feed or community;
- practitioner marketplace or live consultations;
- compatibility or relationship matching;
- exhaustive traditional charts as the default interface;
- broad horoscope publishing;
- push-notification programs;
- token, blockchain, or reward mechanics;
- diagnosis, treatment, or professional decision-making;
- fully automated long-term lifecycle marketing.

## 5. Users and Jobs to Be Done

### Persona A — The Seeker at a Crossroads

**Situation:** Facing a career, relationship, location, or identity decision.  
**Job:** “Help me understand what this moment is asking of me before I act.”  
**Success:** Leaves with clearer tension, choice criteria, and one next move.

### Persona B — The Pattern Recognizer

**Situation:** Repeating a behavior or conflict without understanding why.  
**Job:** “Help me see the pattern beneath what keeps happening.”  
**Success:** Recognizes a personal dynamic and a new way to relate to it.

### Persona C — The Quietly Curious

**Situation:** Interested in traditional wisdom but distrustful of fortune-telling.  
**Job:** “Show me something personally useful without asking me to believe blindly.”  
**Success:** Understands source, interpretation, uncertainty, and practical relevance.

## 6. Core User Journey

### First session

1. User lands on Compass Home.
2. User sees a quiet prompt and enters one real question.
3. User completes a short breathing pause.
4. User performs six I Ching throws.
5. System reveals primary and, when applicable, changed hexagram.
6. User can inspect the raw symbolic reading.
7. Gateway offers a personal interpretation.
8. User provides birth date, birth time, birthplace/timezone, and gender where required by the calculation model.
9. System calculates Nature and current Season context.
10. System generates Personal Meaning.
11. User receives:
    - what is present;
    - why this question may be appearing now;
    - the central tension or invitation;
    - one aligned Move;
    - a reflection question.
12. User chooses to explore Blueprint, save the reading by creating an account, or continue to an offer.

### Returning session

1. User signs in.
2. Compass Home displays a concise current orientation.
3. User can reopen saved readings, view North, view Season, or begin a new Oracle ritual.
4. New readings use the saved personal profile unless the user edits it.

## 7. Information Architecture

| Area | Purpose | MVP |
| --- | --- | --- |
| Compass Home | Entry, navigation, current orientation | Required |
| Oracle | Question, breathing, six throws | Required |
| Raw Result | Primary/changed hexagram and source text | Required |
| Gateway | Explain value and collect personal details | Required |
| Personal Meaning | Contextual interpretation for the question | Required |
| North | Personal Blueprint | Required |
| Season | Current chapter and yearly climate | Required |
| Move | One practical aligned response | Required |
| Account | Authentication, profile, saved readings | Required |
| Settings | Personal data, language, privacy, deletion | Required |
| Billing | Purchase and entitlement state | Required if payment launches |
| Admin/QA | Inspect generation inputs and outputs | Internal requirement |

## 8. Functional Requirements

### FR-01 — Question entry

- User can enter a question in free text.
- UI encourages open, present-tense questions rather than binary prediction.
- Empty submissions are blocked.
- The system should detect obviously high-stakes medical, legal, financial, self-harm, or harmful questions and respond with the appropriate safety experience.
- The question remains visible through the reading.

**Acceptance criteria**

- A valid question advances to the breathing state.
- Refresh or accidental navigation does not silently lose an in-progress cast within the same session.
- User can edit the question before the first throw.

### FR-02 — Breathing pause

- A short animated breathing state precedes casting.
- User can skip after a minimal deliberate pause.
- Motion respects reduced-motion preferences.
- No health or therapeutic claim is made.

**Acceptance criteria**

- Animation works on mobile and desktop.
- Reduced-motion mode presents a still timed pause.
- Completing or skipping advances to casting.

### FR-03 — I Ching casting

- User completes six sequential throws.
- Each throw records its generated line value and order.
- System derives the primary hexagram and changed hexagram when moving lines exist.
- Cast cannot be silently rerolled after completion.
- Timestamp and timezone are stored with the reading.

**Acceptance criteria**

- Six lines always map deterministically to the correct hexagram identifiers.
- Moving lines produce the correct changed hexagram.
- Reload recovery does not create a different result.
- Unit tests cover line generation and transformation logic.

### FR-04 — Raw symbolic result

- Show hexagram number, name, visual lines, core image, and concise structural meaning.
- Show changed hexagram and moving lines when present.
- Clearly distinguish source-derived content from TUSO interpretation.
- Technical details are progressively disclosed.

**Acceptance criteria**

- User can understand the primary and changed situations without creating an account.
- Content never presents the result as a guaranteed future event.
- Missing changed hexagram is handled as a valid state.

### FR-05 — Personal information capture

- Collect:
  - display name or preferred form of address;
  - date of birth;
  - birth time, including an “unknown” path;
  - birthplace;
  - resolved timezone;
  - gender only when technically required and with a brief explanation.
- Explain why each sensitive field is requested.
- Require explicit consent before calculation and storage.
- Allow correction before final generation.

**Acceptance criteria**

- Validation catches impossible dates and malformed times.
- Timezone is not inferred solely from the user's current device location.
- Unknown birth time degrades gracefully and identifies reduced precision.
- User can continue without marketing consent.

### FR-06 — Personal calculation

The engine must produce a stable structured profile suitable for interpretation, including:

- Bát Tự pillars and hidden stems;
- Day Master and Five Element relationships;
- strength inputs: season, root, support, and drain;
- useful strategy/role outputs used by the product;
- decade phase and annual environmental climate;
- Tử Vi outputs included in the approved MVP scope.

**Acceptance criteria**

- Same normalized input always returns the same structured output.
- Engine version is stored with each generated reading.
- Calculation outputs are separated from generated prose.
- A test fixture set covers known birth profiles and timezone boundaries.

### FR-07 — Personal Blueprint / North

North must provide the following chapters:

1. See
2. Perceive
3. Speak
4. Move
5. Build
6. Connect
7. Balance
8. Return

Each chapter contains a concise recognition statement, explanation, tension, and reflection. The full experience may also expose Current Chapter, Blind Spots, and Life Areas.

**Acceptance criteria**

- All eight chapters are available after a successful profile calculation.
- Claims trace back to structured profile inputs or clearly marked synthesis.
- Chapters do not contradict one another without naming the tension.
- User can navigate, resume, and share only through an explicit privacy-aware action.

### FR-08 — Current Season

- Describe the user's longer phase and current annual climate.
- Explain what is supported, what may require care, and what is changing.
- Connect Season to Nature without forecasting fixed events.
- Display applicable date boundaries and timezone assumptions.

**Acceptance criteria**

- Current Season updates from structured timing data.
- The content states conditions and tendencies, not event certainty.
- Users can distinguish longer chapter from annual climate.

### FR-09 — Personal Meaning

Personal Meaning synthesizes:

- the user's exact question;
- primary hexagram;
- moving lines and changed hexagram, if any;
- relevant Nature signals;
- relevant Season signals;
- one aligned Move;
- one reflection question.

Recommended response structure:

1. **The moment** — what the cast depicts.
2. **Why this may be here now** — personal and seasonal context.
3. **The tension** — what cannot be resolved by a simplistic yes/no.
4. **What alignment looks like** — orientation, not command.
5. **One move** — a small practical step.
6. **Carry this question** — reflection.

**Acceptance criteria**

- Output explicitly addresses the user's question.
- Every interpretation passes response-style and safety checks.
- Unsupported certainty and fear language are blocked or regenerated.
- The result stores model, prompt, engine, content, and policy versions.
- User feedback can identify “recognizable,” “useful,” and “too generic.”

### FR-10 — Move With Life

- Provide one move proportional to the situation.
- Move may be an action, conversation, experiment, boundary, observation, or pause.
- Avoid irreversible or high-stakes directives.
- Explain the connection between the Move and the interpretation.

**Acceptance criteria**

- Move is specific enough to attempt.
- Move does not require belief in the underlying system.
- User can mark it as carried, not relevant, or completed.
- Completion is optional and non-gamified.

### FR-11 — Authentication and account

- Support secure email-based authentication.
- Account creation should preserve the current reading and profile.
- Signed-in user can view saved readings and manage personal data.
- Product should not require an account before demonstrating meaningful value unless a later experiment changes the gate.

**Acceptance criteria**

- Account creation does not lose the current session.
- Users can sign out, reset access, export core data, and request deletion.
- Readings are private by default and authorization is enforced server-side.

### FR-12 — Saved readings

- Store question, cast, timestamp, interpretation, Move, and version metadata.
- User can assign a private title.
- User can reopen or delete a reading.
- No public URL is generated by default.

**Acceptance criteria**

- Only the owning user can access a saved reading.
- Deleted readings follow the documented retention policy.
- A later engine update does not silently rewrite historical readings.

### FR-13 — Payment and entitlement

If payment is enabled in MVP:

- User sees exactly what is free and what is paid before purchase.
- System supports a one-time Personal Meaning or orientation-package entitlement.
- Payment success unlocks content without manual intervention.
- Failure, cancellation, duplicate events, and refund states are handled idempotently.

**Acceptance criteria**

- No fear-based upsell or artificial “bad result” gate.
- Purchase state survives refresh and cross-device sign-in.
- Refund and support pathways are visible.
- Payment records do not store raw card data in TUSO systems.

### FR-14 — Feedback

- Ask lightweight feedback after the user reads a result.
- Capture:
  - recognition;
  - usefulness;
  - clarity;
  - genericness;
  - optional free-text note.
- Feedback is linked to content versions, not exposed publicly.

**Acceptance criteria**

- Feedback is optional.
- Submission succeeds without interrupting reading access.
- Internal reporting can segment by user journey and interpretation version.

### FR-15 — Internal quality review

- Authorized internal users can inspect calculation inputs, structured signals, generated output, safety flags, and user feedback.
- Personally identifiable data is minimized in operational views.
- Reviewers can flag content for revision without altering historical user-visible content silently.

**Acceptance criteria**

- Admin access is role-restricted and audited.
- Sensitive fields are redacted where not necessary.
- Quality flags can be analyzed by content and engine version.

## 9. Content and Interpretation Requirements

### Required qualities

Every interpretation must be:

- specific to the available evidence;
- non-deterministic;
- internally coherent;
- clear about uncertainty;
- useful without technical knowledge;
- respectful of cultural source material;
- concluded with agency and a proportionate next move.

### Prohibited patterns

- “This will definitely happen.”
- claims of death, illness, betrayal, pregnancy, crime, or financial outcome;
- declarations that a user is cursed, doomed, spiritually impure, or cosmically punished;
- instructions to replace professional care;
- manipulative urgency or payment pressure;
- ungrounded personality praise;
- language that encourages compulsive repeated casting.

### Casting behavior

The experience should gently discourage repeated casting of the same question in a short period. It may invite the user to sit with the prior reading rather than block all future access.

## 10. Safety Requirements

- High-stakes questions receive limited reflective support and appropriate professional-help framing.
- Self-harm or immediate-danger content follows a dedicated crisis-safe response path.
- The product does not diagnose mental health conditions.
- The product avoids definitive claims about third parties' motives or actions.
- Minors are outside the initial self-service audience.
- Safety policy version is stored with each generated response.

## 11. Privacy and Data Requirements

Birth data, questions, and readings are sensitive personal data.

The MVP must:

- collect only fields required for the experience;
- explain collection at the point of entry;
- encrypt data in transit and at rest using platform capabilities;
- enforce row-level or equivalent ownership controls;
- separate analytics identifiers from sensitive reading text where practical;
- provide deletion and retention rules;
- never use private questions or birth profiles for model training without explicit, separate consent;
- avoid exposing sensitive content in logs, URLs, notifications, or client-side error reports.

## 12. Accessibility Requirements

Target WCAG 2.2 AA for core flows.

- Keyboard-accessible navigation and casting.
- Visible focus states.
- Semantic headings and form labels.
- Screen-reader descriptions for hexagram lines and changes.
- Sufficient color contrast.
- Reduced-motion support.
- Touch targets appropriate for mobile use.
- Error messages associated with affected fields.

## 13. Performance and Reliability

Initial targets:

- Core landing content visible within 2.5 seconds at p75 on a typical mobile connection.
- Interaction to next casting state within 100 ms for local UI actions.
- Calculation and interpretation progress is clearly communicated.
- No duplicate cast or purchase caused by retries.
- In-progress state is recoverable within the active session.
- User sees a graceful fallback when interpretation generation fails.

## 14. Analytics and Events

Track only what is necessary to evaluate the product loop.

| Event | Purpose |
| --- | --- |
| `question_started` | Entry intent |
| `question_submitted` | Question conversion |
| `breathing_completed` / `skipped` | Ritual behavior |
| `cast_started` | Casting entry |
| `cast_completed` | Core ritual completion |
| `raw_result_viewed` | Free value reached |
| `personal_gateway_viewed` | Upsell exposure |
| `profile_started` | Data willingness |
| `profile_completed` | Personalization conversion |
| `personal_meaning_viewed` | Core value reached |
| `north_viewed` | Blueprint engagement |
| `season_viewed` | Timing engagement |
| `move_viewed` | Action reached |
| `account_created` | Identity conversion |
| `purchase_started` | Commercial intent |
| `purchase_completed` | Revenue |
| `feedback_submitted` | Quality signal |

Do not send raw question text, birth details, or interpretation content to general-purpose analytics.

## 15. Success Metrics

### North-star validation metric

**Meaningful Orientation Rate:** percentage of users who view Personal Meaning and report it as both recognizable and useful.

### Funnel metrics

- landing → question submitted;
- question submitted → cast completed;
- cast completed → raw result viewed;
- raw result → profile completed;
- profile completed → Personal Meaning viewed;
- Personal Meaning → account created;
- paid gateway viewed → purchase completed.

### Quality guardrails

- “too generic” feedback rate;
- unsafe or deterministic output rate;
- regeneration/failure rate;
- user-reported contradiction rate;
- deletion and privacy complaint rate;
- repeated same-question casting within a short window.

### Initial hypotheses, not final targets

Targets should be set after a baseline test cohort. The first objective is reliable measurement and qualitative learning rather than optimizing arbitrary percentages.

## 16. Technical Product Requirements

Expected architecture:

- Next.js web application;
- client state suitable for multi-stage sheets and recoverable ritual flow;
- authenticated backend and relational data store;
- deterministic calculation service;
- versioned interpretation orchestration service;
- versioned content library for hexagrams and product copy;
- payment provider abstraction if monetization is enabled.

### Separation of concerns

1. **Calculation:** deterministic structured facts.
2. **Interpretation:** synthesis of approved structured inputs.
3. **Presentation:** progressive disclosure and user interaction.
4. **Policy:** safety, voice, and prohibited-claim enforcement.
5. **Observability:** versions, errors, latency, and feedback.

Generated prose must never be the source of truth for calculations.

## 17. Core Data Objects

### UserProfile

- user ID;
- preferred name;
- normalized birth data;
- birthplace and timezone;
- gender field if required;
- consent timestamps;
- calculation version;
- created/updated timestamps.

### PersonalProfile

- normalized pillars and source structures;
- elemental dynamics;
- strength model outputs;
- strategy roles and lanes;
- timing phases;
- approved Tử Vi outputs;
- derived identity labels;
- engine version.

### Reading

- reading ID and owner;
- question;
- cast timestamp/timezone;
- six line values;
- primary/changed hexagram;
- moving lines;
- relevant profile snapshot reference;
- interpretation content;
- Move;
- model/prompt/content/policy versions;
- entitlement;
- feedback;
- created timestamp.

## 18. MVP Release Criteria

The MVP is releasable when:

- the complete guest journey works on mobile and desktop;
- calculation fixtures pass;
- hexagram transformations pass unit tests;
- account creation preserves the active reading;
- access control tests confirm readings are private;
- interpretation outputs pass a documented evaluation set;
- deterministic and prohibited claims are blocked at an acceptable threshold;
- payment and refunds work if included;
- analytics exclude sensitive payloads;
- accessibility review finds no blocking issue;
- error and recovery states are tested;
- privacy notice, terms, and product limitations are visible;
- product owner approves a representative set of end-to-end readings.

## 19. Delivery Sequence

### Phase 0 — Foundation

- confirm product language and response policy;
- define canonical content and calculation schemas;
- create test fixtures and interpretation evaluation set;
- decide free/paid boundary.

### Phase 1 — Raw Oracle

- Compass Home;
- question and breathing;
- six throws;
- primary/changed hexagram;
- raw result.

### Phase 2 — Personal Context

- personal information capture;
- Bát Tự calculation;
- approved Tử Vi scope;
- North and Season structured outputs.

### Phase 3 — Personal Meaning

- synthesis pipeline;
- safety and style checks;
- Move;
- feedback.

### Phase 4 — Identity and Commerce

- authentication;
- saved readings;
- payment and entitlement;
- privacy controls.

### Phase 5 — Private Beta

- curated tester cohort;
- manual quality review;
- funnel and qualitative learning;
- revision before wider launch.

## 20. Product Decisions Still Required

1. What is free at first launch: raw result, partial Personal Meaning, North preview, or a combination?
2. Is the launch gateway 0₫, 10,000₫, or a higher validated price?
3. Is Personal Meaning available before account creation?
4. Which exact Tử Vi calculations are required for MVP rather than post-MVP?
5. What happens when birth time is unknown?
6. Which payment provider and refund workflow fit the Vietnam launch?
7. How long are anonymous casts retained?
8. What level of explanation exposes calculation provenance without overwhelming users?
9. What retention experience supports practice without turning TUSO into a daily prediction habit?
10. Which languages ship in the private beta?
