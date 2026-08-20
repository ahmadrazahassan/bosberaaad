import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  INFORMATION_OFFICER,
  SITE_DOMAIN,
  SITE_LOCATION,
  SITE_NAME,
} from "@/lib/site";
import type { StaticPage } from "@/lib/types";

const UPDATED = "2026-07-01T00:00:00.000Z";
const UPDATED_LABEL = "1 July 2026";

function page(seed: {
  slug: string;
  title: string;
  meta_description: string;
  content: string;
}): StaticPage {
  return {
    id: `page-${seed.slug}`,
    slug: seed.slug,
    title: seed.title,
    content: seed.content,
    meta_title: seed.title,
    meta_description: seed.meta_description,
    status: "published",
    updated_at: UPDATED,
  };
}

export const STATIC_PAGES: StaticPage[] = [
  page({
    slug: "privacy-policy",
    title: "Privacy policy",
    meta_description:
      "How Bosberaaad collects, uses and protects personal information, and your rights under the Protection of Personal Information Act.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. This policy explains what personal information ${SITE_NAME} collects, why we collect it, what we do with it and what rights you have under the Protection of Personal Information Act 4 of 2013.</p>

      <h2>Who we are</h2>
      <p>${SITE_NAME} is an independent business software review and comparison publication based in ${SITE_LOCATION}. We are the responsible party for the personal information described in this policy. Our information officer is ${INFORMATION_OFFICER}, who can be reached at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or on ${CONTACT_PHONE}.</p>

      <h2>What we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li><strong>When you submit a review:</strong> your name, job title, company, industry, company size, country and the content of your review. If you ask us to verify you, we may process a professional profile link for that purpose only.</li>
        <li><strong>When you subscribe to the newsletter:</strong> your email address, the topics you select, and the date, source and technical details of your consent.</li>
        <li><strong>When you contact us:</strong> your name, email address and the content of your message.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li><strong>Analytics:</strong> aggregate page views, referrers and approximate country. We use privacy respecting analytics and do not build individual visitor profiles.</li>
        <li><strong>Affiliate clicks:</strong> when you click through to a vendor we record the vendor, the time, the referring page, your browser user agent and your country. Your IP address is hashed with a secret salt before storage and the original address is never written to our database.</li>
      </ul>

      <h2>Why we process it, and on what basis</h2>
      <table>
        <thead><tr><th>Purpose</th><th>Lawful basis</th></tr></thead>
        <tbody>
          <tr><td>Publishing your review</td><td>Consent, given when you submit it</td></tr>
          <tr><td>Sending the newsletter</td><td>Consent, confirmed by double opt in</td></tr>
          <tr><td>Answering your enquiry</td><td>Legitimate interest in responding to you</td></tr>
          <tr><td>Measuring affiliate referrals</td><td>Legitimate interest in operating the publication</td></tr>
          <tr><td>Detecting fraudulent or abusive submissions</td><td>Legitimate interest in protecting the service</td></tr>
        </tbody>
      </table>

      <h2>Who we share it with</h2>
      <p>We use a small number of operators who process personal information on our behalf under written agreements that comply with section 21 of POPIA. These are our hosting provider, our database provider, our email delivery provider and our analytics provider.</p>
      <p>We do not sell personal information. We do not share your email address with software vendors. When you click an affiliate link, the vendor receives only what your browser sends them in the normal course of visiting their website, and we pass no personal information to them.</p>

      <h2>Cross border transfer</h2>
      <p>Some of our operators host data outside South Africa. Where that happens, the transfer is made under agreements that bind the recipient to standards substantially similar to those required by POPIA, as permitted by section 72.</p>

      <h2>How long we keep it</h2>
      <ul>
        <li><strong>Published reviews:</strong> for as long as the review remains published, unless you ask us to remove it.</li>
        <li><strong>Newsletter subscriptions:</strong> until you unsubscribe, plus a suppression record so we do not email you again.</li>
        <li><strong>Contact messages:</strong> twenty four months.</li>
        <li><strong>Affiliate click records:</strong> twenty four months, in hashed form.</li>
      </ul>

      <h2>Your rights</h2>
      <p>Under POPIA you have the right to:</p>
      <ul>
        <li>ask what personal information we hold about you</li>
        <li>ask us to correct or delete information that is inaccurate, irrelevant, excessive or obtained unlawfully</li>
        <li>object to processing based on legitimate interest</li>
        <li>withdraw consent at any time, which does not affect processing already carried out</li>
        <li>complain to the Information Regulator</li>
      </ul>
      <p>To exercise any of these, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. We will respond within thirty days.</p>

      <h2>The Information Regulator</h2>
      <p>You may complain to the Information Regulator of South Africa. Their contact details are published at <a href="https://inforegulator.org.za" rel="noopener noreferrer" target="_blank">inforegulator.org.za</a>.</p>

      <h2>Changes to this policy</h2>
      <p>We will update this page when our practices change and will change the date at the top. Material changes affecting how we use information you have already given us will be notified to newsletter subscribers by email.</p>
    `,
  }),

  page({
    slug: "cookie-policy",
    title: "Cookie policy",
    meta_description:
      "What cookies and similar technologies Bosberaaad uses, what each one does, and how to control them.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. This page explains the cookies and similar technologies used on ${SITE_DOMAIN}.</p>

      <h2>Our approach</h2>
      <p>We keep this deliberately minimal. We do not run advertising trackers that follow you across other websites, and we do not use cookies to build a profile of you as an individual.</p>

      <h2>What we set</h2>
      <table>
        <thead><tr><th>Name</th><th>Purpose</th><th>Duration</th></tr></thead>
        <tbody>
          <tr><td>theme</td><td>Remembers whether you chose light or dark mode</td><td>1 year</td></tr>
          <tr><td>Supabase session cookies</td><td>Keeps an administrator signed in. Only set for our own staff.</td><td>Session</td></tr>
        </tbody>
      </table>

      <h2>Analytics</h2>
      <p>We use Vercel Analytics to understand which pages are read. It measures page views without cookies and without collecting information that identifies you individually.</p>

      <h2>Advertising</h2>
      <p>Where we display advertising, the advertising network may set its own cookies subject to your consent. Advertising units are labelled as sponsored wherever they appear. You can manage advertising personalisation through your Google account settings at <a href="https://adssettings.google.com" rel="noopener noreferrer" target="_blank">adssettings.google.com</a>.</p>

      <h2>Affiliate links</h2>
      <p>When you click through to a vendor, the vendor may set a cookie to attribute the referral to us. That cookie is set by the vendor on their own domain and is governed by their privacy policy, not ours. We explain the commercial arrangement on our <a href="/affiliate-disclosure">affiliate disclosure</a> page.</p>

      <h2>Controlling cookies</h2>
      <p>Every major browser lets you view, block and delete cookies. Blocking all cookies will not prevent you from reading this site. It will mean your theme preference is forgotten between visits.</p>
    `,
  }),

  page({
    slug: "terms",
    title: "Terms of use",
    meta_description:
      "The terms governing your use of Bosberaaad, including review submission rules and the limits of our editorial content.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. By using ${SITE_DOMAIN} you agree to these terms.</p>

      <h2>What this site is</h2>
      <p>${SITE_NAME} is an editorial publication. We publish independent assessments of business software, user submitted reviews and comparison content. We are not a reseller, a vendor, a consultancy or a licensed financial services provider.</p>

      <h2>What this site is not</h2>
      <p>Nothing on this site is professional advice. Our assessments are informed opinion and reader submitted experience. Software selection carries commercial and compliance consequences, and you should take advice from your accountant, your attorney or a suitably qualified consultant before committing.</p>
      <p>Statements about tax, payroll and labour law are general and current at the date of publication. Legislation changes. Verify anything material against SARS, the Department of Employment and Labour, or a professional adviser.</p>

      <h2>Pricing information</h2>
      <p>Prices shown are the vendor's published list prices at the date stated on each product page, converted or quoted in rand and marked as including or excluding VAT. Vendors change prices without notice and run promotions we may not be aware of. Always confirm current pricing with the vendor before you buy.</p>

      <h2>Submitting a review</h2>
      <p>When you submit a review you confirm that:</p>
      <ul>
        <li>you have genuinely used the product in a business context</li>
        <li>you are not employed by, contracted to or compensated by the vendor or a competitor</li>
        <li>the review is your own honest opinion</li>
        <li>you have not been offered anything of value in exchange for it</li>
      </ul>
      <p>You grant us a non exclusive, perpetual licence to publish, edit for length and clarity, and reproduce your review. We do not change the substance of a review. We remove reviews that appear to be vendor written, competitor written, incentivised or defamatory.</p>

      <h2>Acceptable use</h2>
      <p>Do not scrape the site at a rate that degrades it for other readers, attempt to access the administration area, submit content that is unlawful or defamatory, or use our content commercially without permission. Reasonable quotation with attribution and a link is welcome.</p>

      <h2>Intellectual property</h2>
      <p>Editorial content, assessments, comparison structures and design are ours. Product names, logos and trade marks belong to their owners and appear here for identification.</p>

      <h2>Liability</h2>
      <p>We take care to be accurate and we do not warrant that the site is free of error. To the extent permitted by law, we are not liable for loss arising from reliance on the content, from software you buy after reading it, or from the availability of the site.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of South Africa.</p>

      <h2>Contact</h2>
      <p>Questions about these terms go to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
    `,
  }),

  page({
    slug: "affiliate-disclosure",
    title: "Affiliate disclosure",
    meta_description:
      "How Bosberaaad makes money, which relationships are commercial, and the rules that keep our ratings independent of them.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. This page explains exactly how we make money, because you should be able to judge our independence for yourself rather than take our word for it.</p>

      <h2>The short version</h2>
      <p>We earn a commission when a reader clicks through to certain vendors and subscribes. It costs you nothing extra. It never affects a rating, a ranking or the wording of an assessment.</p>

      <h2>How it works in practice</h2>
      <p>Some vendors run affiliate programmes. Where we have joined one, a link from our product page to that vendor carries a tracking reference, and if you subscribe within the vendor's attribution window we receive a payment. The price you pay is the vendor's normal price.</p>
      <p>Every commercial link on this site is marked with the <code>sponsored</code> attribute in the page markup and carries a visible disclosure next to it. There is no such thing as an undisclosed affiliate link here.</p>

      <h2>The rules we hold ourselves to</h2>
      <ol>
        <li><strong>No vendor can pay to be listed.</strong> Products are included because South African businesses shortlist them.</li>
        <li><strong>No vendor can pay to be ranked higher.</strong> Ranking is calculated from verified user reviews using a fixed formula described on our <a href="/editorial-policy">editorial policy</a> page.</li>
        <li><strong>No vendor sees a review before it is published.</strong> They may respond publicly afterwards, and their response is published alongside.</li>
        <li><strong>Commercial relationships do not change wording.</strong> We criticise products we earn from and recommend products we earn nothing from.</li>
        <li><strong>We disclose at the point of decision,</strong> not only on this page.</li>
      </ol>

      <h2>The evidence</h2>
      <p>The clearest test of the above is whether our recommendations track our commercial relationships. They do not. Several of the products we recommend most often pay us nothing at all, and several products with generous affiliate programmes are rated below products without one. Our top rated payroll product earns us no commission.</p>

      <h2>Display advertising</h2>
      <p>We also sell display advertising. Advertising units are visually distinct, carry a "Sponsored" label and are served by a third party network. Advertisers have no influence on editorial content and are not told in advance what we are publishing.</p>

      <h2>What we will never do</h2>
      <p>Write a review in exchange for payment. Remove a negative review because a vendor asked. Accept a fee to add or move a product in a ranking. Publish sponsored content that is not clearly labelled as such.</p>

      <h2>Questions</h2>
      <p>If you think a specific piece of content has been influenced by a commercial relationship, tell us at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> and we will respond with the actual position on that product.</p>
    `,
  }),

  page({
    slug: "editorial-policy",
    title: "Editorial policy",
    meta_description:
      "How Bosberaaad researches, rates and ranks business software, how reviews are verified, and how we handle corrections.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. This is how we work.</p>

      <h2>Independence</h2>
      <p>Editorial decisions are made by the editorial team alone. No vendor, advertiser or affiliate partner has any input into what we publish, how a product is rated or where it appears in a ranking. Our commercial arrangements are set out in full on the <a href="/affiliate-disclosure">affiliate disclosure</a> page.</p>

      <h2>How products are selected</h2>
      <p>We include products that South African businesses genuinely shortlist: local incumbents, international products with a real local presence, and anything that appears often enough in buyer conversations to deserve an answer. We exclude products we cannot assess properly. Nobody pays to be included.</p>

      <h2>How products are assessed</h2>
      <p>Every product is assessed on ease of use, value for money, customer service, functionality and an overall judgement. In addition, each category is measured against a fixed local checklist:</p>
      <ul>
        <li><strong>Accounting:</strong> VAT201 output at 15%, treatment of standard, zero rated and exempt supplies, SARS eFiling transfer, bank feed coverage across Absa, FNB, Standard Bank, Nedbank and Capitec, and accountant access.</li>
        <li><strong>Payroll:</strong> EMP201, EMP501, IRP5 and IT3(a), e@syFile validation, UIF declarations, SDL, ETI on the correct sliding scale, BCEA leave accrual and the ACB payment file.</li>
        <li><strong>HR:</strong> BCEA annual, sick and family responsibility leave, Employment Equity reporting, skills development submissions, and POPIA handling of special personal information.</li>
        <li><strong>CRM and project management:</strong> rand cost including exchange rate exposure, seat and band structures, local support hours, POPIA consent handling and real world adoption.</li>
      </ul>
      <p>Where a product fails a checklist item we say so plainly, including where the product is otherwise excellent.</p>

      <h2>How ratings are calculated</h2>
      <p>Star ratings come from verified user reviews and nothing else. Our editorial view shapes what we write, not the average. Aggregate ratings are computed automatically from published reviews and are never written by hand.</p>

      <h2>How ranking works</h2>
      <p>We rank using a Bayesian weighted average rather than a raw star average. A raw average lets a product with eleven reviews at 4.8 outrank one with four hundred at 4.4, which is not useful to a buyer.</p>
      <p>Each product's score is blended towards the platform mean, weighted by its review volume, using the median review count across the catalogue as the prior weight. A product with many reviews sits close to its own average. A product with few sits closer to the middle until it has earned its position.</p>

      <h2>How reviews are verified</h2>
      <p>Reviewers state their role, industry, company size, country and how long they have used the product. Where we can confirm a reviewer's professional identity, the review carries a verified badge.</p>
      <p>We remove reviews that appear to be written by the vendor, by a competitor, or in exchange for something of value. We do not remove negative reviews at a vendor's request. Vendors may respond publicly and the response is published with the review.</p>

      <h2>Pricing</h2>
      <p>Prices are taken from the vendor's own South African pricing page or official shop, quoted in rand, with the VAT basis stated because vendors are not consistent about it. Each product page shows the date the price was last checked. We re verify quarterly and run an automated check weekly that flags products whose vendor page no longer matches our stored figure.</p>

      <h2>Corrections</h2>
      <p>We correct errors openly rather than quietly. Where a correction changes the substance of an assessment, we add a dated note explaining what changed and why. If you believe something here is wrong, write to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> with the detail and we will look at it.</p>

      <h2>Use of AI</h2>
      <p>Editorial assessments, comparisons and buying guides are written and edited by people. We use software for research assistance, transcription and routine formatting. We do not publish generated text as editorial opinion, and every published assessment carries a named author who stands behind it.</p>
    `,
  }),

  page({
    slug: "accessibility",
    title: "Accessibility statement",
    meta_description:
      "Bosberaaad's accessibility commitments, the standard we work to, known limitations and how to report a problem.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. We want this site to be usable by everyone, including people using screen readers, keyboard navigation, magnification or reduced motion settings.</p>

      <h2>The standard we work to</h2>
      <p>We aim to meet the Web Content Accessibility Guidelines 2.2 at level AA. That is a target we test against rather than a certification we hold.</p>

      <h2>What we have done</h2>
      <ul>
        <li>Every interactive element is reachable and operable by keyboard, with a visible focus indicator.</li>
        <li>A skip to content link is the first thing a keyboard user reaches on every page.</li>
        <li>Colour is never the only way information is conveyed. Star ratings always show a number beside them, and status is always labelled in text.</li>
        <li>Text contrast meets the AA ratio in both light and dark themes. Our brand lime is used only as a background fill with dark text on it, never as text on a light surface.</li>
        <li>Images carry alternative text. Decorative images are hidden from assistive technology.</li>
        <li>Headings follow a single logical order, with one first level heading per page.</li>
        <li>Form fields have real labels, and errors are announced rather than only shown in colour.</li>
        <li>All motion respects the reduced motion setting in your operating system. If you have it on, animations do not run.</li>
        <li>Text resizes to 200 percent without loss of content or function, and the layout reflows rather than requiring horizontal scrolling.</li>
      </ul>

      <h2>Known limitations</h2>
      <ul>
        <li>Some comparison tables are wide by nature. They scroll horizontally within their own container rather than forcing the page to scroll, and every table has a caption describing its contents.</li>
        <li>Third party advertising units are outside our control and may not meet the same standard. They are labelled and can be skipped by keyboard.</li>
        <li>Charts convey data visually. Every chart is accompanied by the same information in text or in a table.</li>
      </ul>

      <h2>Telling us about a problem</h2>
      <p>If something on this site is difficult or impossible for you to use, please tell us. Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or phone ${CONTACT_PHONE}. Describe the page and what happened, and we will respond within five working days with either a fix or a date for one.</p>
      <p>If you need information from this site in an alternative format, ask and we will provide it.</p>
    `,
  }),

  page({
    slug: "paia-manual",
    title: "PAIA manual",
    meta_description:
      "Bosberaaad's manual under the Promotion of Access to Information Act, including the records we hold and how to request access.",
    content: `
      <p>Last updated ${UPDATED_LABEL}. This manual is published in terms of section 51 of the Promotion of Access to Information Act 2 of 2000.</p>

      <h2>1. Particulars of the body</h2>
      <table>
        <tbody>
          <tr><th>Name</th><td>${SITE_NAME}</td></tr>
          <tr><th>Nature</th><td>Private body, online editorial publication</td></tr>
          <tr><th>Physical address</th><td>${SITE_LOCATION}</td></tr>
          <tr><th>Postal address</th><td>Available on request</td></tr>
          <tr><th>Telephone</th><td>${CONTACT_PHONE}</td></tr>
          <tr><th>Email</th><td>${CONTACT_EMAIL}</td></tr>
          <tr><th>Website</th><td>${SITE_DOMAIN}</td></tr>
          <tr><th>Information officer</th><td>${INFORMATION_OFFICER}, contactable at ${CONTACT_EMAIL}</td></tr>
        </tbody>
      </table>

      <h2>2. The PAIA guide</h2>
      <p>The Information Regulator has published a guide on how to use the Act, in terms of section 10. It is available from the Information Regulator at <a href="https://inforegulator.org.za" rel="noopener noreferrer" target="_blank">inforegulator.org.za</a>, or on request from the Regulator's offices.</p>

      <h2>3. Records available without a formal request</h2>
      <p>The following are freely available on our website and require no request:</p>
      <ul>
        <li>All published editorial content, reviews, comparisons and buying guides</li>
        <li>Our <a href="/editorial-policy">editorial policy</a>, including how ratings and rankings are calculated</li>
        <li>Our <a href="/affiliate-disclosure">affiliate disclosure</a></li>
        <li>Our <a href="/privacy-policy">privacy policy</a> and <a href="/cookie-policy">cookie policy</a></li>
        <li>Our <a href="/terms">terms of use</a> and this manual</li>
      </ul>

      <h2>4. Categories of records held</h2>
      <table>
        <thead><tr><th>Category</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>Editorial</td><td>Published and draft assessments, research notes, correspondence with vendors</td></tr>
          <tr><td>User submitted</td><td>Reviews, including unpublished and removed submissions</td></tr>
          <tr><td>Subscriber</td><td>Newsletter subscriptions and consent records</td></tr>
          <tr><td>Commercial</td><td>Affiliate agreements, advertising agreements, referral records</td></tr>
          <tr><td>Corporate</td><td>Company registration, financial records, tax records, insurance</td></tr>
          <tr><td>Employment</td><td>Contracts, payroll records, statutory employment records</td></tr>
          <tr><td>Technical</td><td>Source code, infrastructure configuration, security records</td></tr>
        </tbody>
      </table>

      <h2>5. Records held under other legislation</h2>
      <p>Records are held in terms of, among others, the Companies Act 71 of 2008, the Income Tax Act 58 of 1962, the Value Added Tax Act 89 of 1991, the Basic Conditions of Employment Act 75 of 1997, the Labour Relations Act 66 of 1995 and the Protection of Personal Information Act 4 of 2013.</p>

      <h2>6. How to request access</h2>
      <ol>
        <li>Complete the prescribed form under PAIA, available from the Information Regulator's website.</li>
        <li>Send it to the information officer at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</li>
        <li>Identify the record clearly, state the form of access you want, and give the postal or email address for the reply.</li>
        <li>If the request is to exercise or protect a right, state which right and how the record relates to it.</li>
        <li>Pay the prescribed request fee where one applies. Requests for your own personal information carry no request fee.</li>
      </ol>
      <p>We will decide within thirty days and tell you in writing. Where the request is complex or involves a third party, that period may be extended by a further thirty days, and we will tell you if it is.</p>

      <h2>7. Fees</h2>
      <p>The fees prescribed under PAIA apply. These cover a request fee where applicable, and access fees for reproduction, search, preparation and postage. We will give you an estimate before proceeding where the access fee will exceed the prescribed threshold, and we may require a deposit.</p>

      <h2>8. Grounds for refusal</h2>
      <p>Access may be refused on the grounds set out in Chapter 4 of Part 3 of the Act, including the mandatory protection of the privacy of a third party, the commercial information of a third party, records privileged from production in legal proceedings, and the protection of research information. Where we refuse, we will give reasons and explain your remedies.</p>

      <h2>9. Remedies</h2>
      <p>If your request is refused you may lodge a complaint with the Information Regulator or apply to a court for appropriate relief, in terms of the Act.</p>

      <h2>10. Availability of this manual</h2>
      <p>This manual is available on this website free of charge, and on request from the information officer in printed form at the prescribed fee.</p>
    `,
  }),
];

export const PAGE_BY_SLUG = new Map(STATIC_PAGES.map((p) => [p.slug, p]));
