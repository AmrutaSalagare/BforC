# BforC — Career Portal (`career.bforc.in`)
### Your Build Context · Independent Work File

> **Your scope:** The fully functional career portal / job board at **career.bforc.in**.
> Your teammate is building the marketing site at `bforc.in` separately.
> This file has everything you need — no need to reference any other doc.

---

## 1. Quick Reference

| Field | Detail |
|---|---|
| **Site URL** | career.bforc.in |
| **Site Type** | Career Portal / Job Board / Talent Marketplace |
| **Organisation** | BrainsForCompassion (BforC) |
| **Org Type** | Women-led Social Impact Organisation |
| **Platform Motto** | "Where Compassion Meets Career" |
| **Target Launch** | 2026 |
| **Primary Users** | Job seekers (women-focused), Employers (NGOs / Social Enterprises) |

---

## 2. Why This Portal Exists — The Problem to Solve

India's social sector faces a critical **talent gap**:
- Passionate individuals wanting meaningful social impact careers can't find the right opportunities.
- NGOs and social enterprises doing transformative work lack access to a dedicated talent pool.
- Existing job boards (Naukri, LinkedIn) don't understand the social sector's unique needs.

**This portal is the solution** — a dedicated ecosystem connecting purpose-driven professionals with organisations that need their skills.

> 💡 The marketing site (`bforc.in`) communicates this mission emotionally. Your portal delivers it functionally.

---

## 3. User Types

### 3.1 Job Seekers
- Women (primary, but inclusive of all genders)
- Indian users, many on mobile / 3G
- Looking for: social impact roles, NGO jobs, flexible/remote work, return-to-work opportunities
- Pain point: form-filling friction, intimidating UX, lack of social-sector-specific listings

### 3.2 Employers
- NGOs, Social Enterprises, Impact-driven Corporations
- Looking for: mission-aligned candidates
- Pain point: no dedicated platform for social sector hiring, expensive third-party job boards

---

## 4. Portal Pages — Full Feature Breakdown

### Page 1: Home / Landing (career.bforc.in)

**Hero:**
- Headline: *"Careers Built for Women"* / *"Where Compassion Meets Career"*
- Sub-text: *"from global to local"*
- CTA: **Sign Up** / **Upload Resume**

**Sections:**
1. **Job Search Bar** — role, location, filters
2. **Featured Jobs** — curated job cards
3. **Featured Companies** — NGO & social enterprise logos
4. **Job Categories** — Remote · Return-to-work · Flexible · Social impact roles
5. **Testimonials / Success Stories** *(content pending from client)*
6. **Bottom CTA** — Sign up / Upload resume

---

### Page 2: Job Search / Browse Jobs

**Filters (left sidebar or top bar):**
- Role / Job Title
- Location (city, state, remote)
- Salary range
- Experience level
- Remote / On-site / Hybrid
- Women-friendly company rating
- Full-time / Part-time / Contract

**Job Card — information to display:**
- Job title
- Company name + logo
- Location + Remote badge
- Salary range
- Tags (e.g., "Women-Friendly", "Flexible Hours", "Social Impact")
- Date posted

**Job Card — actions:**
- **Quick Apply** button
- **Save Job** (bookmark)

**Other features:**
- AI-powered job recommendations (personalised feed)
- Pagination or infinite scroll

---

### Page 3: Job Detail Page

- Full job description
- Company info snippet + link to Company Profile
- Apply button (in-portal application)
- Save job
- Share job
- Similar jobs section

---

### Page 4: Company Directory

- Searchable list of all companies posting on the portal
- **Company Profile Card:**
  - Company logo + name
  - Sector / Industry
  - **Women-Friendly Rating** ⭐ ← USP of the platform
  - Benefits & policies (maternity leave, flexibility, remote work, safety policies)
  - Number of open roles
  - Link to full company profile

---

### Page 5: Candidate Dashboard (Authenticated)

Accessible after login. Personal workspace for job seekers.

| Section | Features |
|---|---|
| **My Profile** | Resume upload, skills, experience, education, personal info |
| **Saved Jobs** | List of bookmarked jobs |
| **Applied Jobs** | Application history + status tracking |
| **Alerts & Recommendations** | AI-powered job alerts based on profile |
| **Profile Strength Meter** | Visual indicator encouraging profile completion |

**Resume features:**
- Upload resume (PDF / DOC)
- AI-powered parsing using **Google Gemini 2.5 Flash-Lite** — auto-fills profile fields from resume
- Resume must work seamlessly on mobile (smartphone upload)

---

### Page 6: Employer / Recruiter Section (Authenticated)

Separate dashboard for employers.

| Section | Features |
|---|---|
| **Post a Job** | Job posting form (title, description, requirements, salary, type) |
| **My Listings** | Manage active / inactive job posts |
| **Talent Search** | Search candidate profiles |
| **Applications** | View and shortlist applicants per job |
| **Pricing / Plans** | Subscription plan selection and management |
| **Employer Branding** | Company profile page editor |

---

### Page 7: Subscription & Pricing Page

**Job Seeker Plans:**

| Tier | Price | What You Get |
|---|---|---|
| **Free** | ₹0 / year | Apply to up to **10 jobs/year** · Basic resume upload · Community support |
| **Starter** | ₹499 / year | Apply to up to **50 jobs/year** · Priority resume parsing · Basic support |
| **Premium** | ₹899 / year | Apply to up to **100 jobs/year** · Exclusive support · Featured profile visibility |

- Payment processed via **Razorpay**
- No hidden fees — transparent upgrade/downgrade flow
- No dark patterns in subscription flows

**Future (Phase 2):**
- Employer job posting fees

---

### Page 8: Authentication Pages

- Sign Up (job seeker / employer — role selection at registration)
- Log In
- Forgot Password / Reset Password
- Email verification flow

**Auth provider:** Supabase Auth

---

### Legal & Trust Pages (Required)
- **Privacy Policy** — explain clearly how resume data is used
- **Terms of Service**
- **Data Protection** *(important for India)*
- **Anti-Harassment Policy** *(core to the platform's women-centric values)*

> ⚠️ **Content Gap:** Legal text to be provided or drafted and approved by client.

---

## 5. Tech Stack (Your Portal)

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS with custom design tokens |
| **UI Components** | shadcn/ui |
| **Animations** | Framer Motion |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **File Storage** | Supabase Storage (resume files) |
| **AI — Resume Parsing** | Google Gemini 2.5 Flash-Lite |
| **Payments** | Razorpay |
| **Email** | Resend (transactional emails — alerts, confirmations) |
| **Hosting** | Vercel |
| **CDN** | Cloudflare |
| **Monorepo** | Turborepo (shared with main marketing site) |

> 💡 You share the **Turborepo monorepo** with your teammate's marketing site. Coordinate on the monorepo root setup and shared packages (design tokens, UI components) before starting.

---

## 6. AI Resume Parsing — How It Works

1. User uploads resume (PDF / DOC) on mobile or desktop
2. File is stored in **Supabase Storage**
3. File is sent to **Google Gemini 2.5 Flash-Lite** for extraction
4. Extracted data (name, experience, skills, education) auto-populates the candidate profile form
5. User reviews and confirms extracted data
6. Resume malware scanning must be implemented before storage

**Goal:** Reduce form-filling friction — especially important for mobile users who find typing on small screens tedious.

---

## 7. Database Design Considerations (Supabase / PostgreSQL)

Key entities to plan for:

| Entity | Key Fields |
|---|---|
| **users** | id, email, role (seeker/employer), created_at, subscription_tier |
| **seeker_profiles** | user_id, name, skills, experience, education, resume_url, profile_strength |
| **employer_profiles** | user_id, company_name, logo_url, women_friendly_rating, description |
| **jobs** | id, employer_id, title, description, location, salary_range, type, status, created_at |
| **applications** | id, job_id, seeker_id, status, applied_at |
| **saved_jobs** | seeker_id, job_id, saved_at |
| **subscriptions** | user_id, tier, start_date, end_date, razorpay_id |

> Schema must be growth-ready with horizontal scaling in mind.

---

## 8. Non-Functional Requirements

### Performance
- Pages load in **under 2 seconds on 3G networks**
- Images and assets aggressively optimized and cached
- API responses feel instantaneous

### Accessibility
- **WCAG 2.1 AA** compliance minimum
- Full keyboard navigation
- Screen reader compatible
- Adequate color contrast ratios

### Mobile-First (Critical for this portal)
- All design decisions start from mobile
- Appropriate touch targets
- Forms optimized for mobile input
- Resume upload must work seamlessly on smartphones
- Most Indian users access via smartphone on 3G/4G

### Security
- HTTPS for all data transmission
- **Resume malware scanning** before storage
- Secure authentication tokens (Supabase handles this)
- Regular security audits

### Privacy & Trust
- Clear policies on how resume data is used (shown during upload)
- No hidden fees or dark patterns in subscription flows
- **Employer verification process** — prevent fraudulent job postings
- User data ownership — users can **export or delete their data at any time**
- GDPR-inspired data handling
- Minimal data collection
- No sale of user data
- Clear data retention policies

### Scalability
- Growth-ready database schema (plan for 10,000+ users from day one in schema)
- File storage optimized (Supabase Storage with CDN)
- Edge-cached API responses
- Horizontal scaling readiness

---

## 9. Design Philosophy (Apply to Your Portal)

- **Women-Centric by Default:** Visual language conveying strength, warmth, and professionalism — no stereotypes. Imagery reflecting diversity of Indian women in professional settings.
- **Simplicity Without Compromise:** Clean UX — never intimidating, never bare.
- **Impact Over Vanity:** No bloated features. Build only what serves the mission of connecting people to meaningful work.
- **Zero-Cost Start, Scale with Purpose:** Free-tier Supabase/Vercel during startup. Revenue from subscriptions funds upgrades.

### Tone of Voice
- Empowering, not pitying
- Professional, not corporate
- Warm, not casual
- Welcoming to all genders while centred on women's progress

---

## 10. Business Model — Your Portal Runs It

The career portal **is** the revenue engine for BforC.

### Primary Revenue: Job Seeker Subscriptions
- Free → Starter (₹499/yr) → Premium (₹899/yr)
- Processed via **Razorpay**

### Secondary Revenue (Phase 2)
- Employer job posting fees

### Cost Discipline
- Platform must operate at **near-zero fixed cost** during startup phase
- Use free tiers of Supabase, Vercel, and Cloudflare
- Infrastructure costs increase only when user growth justifies investment

---

## 11. Success Metrics — Your Portal Owns These

| Phase | Target | Key Metrics |
|---|---|---|
| **Phase 1 — Launch** | 0–1,000 users | Platform stability, uptime, NPS, mobile vs desktop split |
| **Phase 2 — Growth** | 1,000–10,000 users | Daily active seekers, application completion rate, resume parsing accuracy, subscription conversion rate, employer job posting volume |
| **Phase 3 — Scale** | 10,000+ users | Revenue sustainability, successful placements, partner org satisfaction, performance under load |

---

## 12. Long-Term / Future Scope (Phase 2+)

Keep these in mind so you don't paint yourself into a corner architecturally:

- Skills assessment and certification partnerships
- Mentorship matching (seeker ↔ mentor)
- Regional language support (Hindi, Tamil, etc.)
- Native mobile application
- Analytics dashboard for employers and admins

---

## 13. Content Gaps — Items Needed from Client

| # | Item | Where Needed |
|---|---|---|
| 1 | Testimonials / success stories (with names & photos) | Home + Testimonials section |
| 2 | Platform description (for meta tags, SEO) | All pages |
| 3 | Privacy Policy text | Legal pages |
| 4 | Anti-harassment policy text | Legal pages |
| 5 | Social media handles / links | Footer |
| 6 | Additional BforC email IDs | Contact / Support |

---

## 14. Coordination Notes with Main Site Teammate

| Topic | Action |
|---|---|
| **Monorepo setup** | Set up Turborepo root first; agree on shared packages |
| **Design tokens** | Define shared colour palette, typography, spacing — both sites must feel like one brand |
| **Featured jobs feed** | Expose an API endpoint from this portal so the main site (`bforc.in`) can display featured jobs on its home page |
| **Navigation links** | Main site links to this portal for: job search, sign up, apply. Ensure the URLs and routes are agreed upon early. |
| **Auth** | Auth lives **here** on career.bforc.in. The main site does NOT handle login. |

---

*This file covers only `career.bforc.in`. For the marketing site (`bforc.in`) refer to `main.md`.*
