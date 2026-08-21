import { defineArticle } from "./define";

export const PRACTICAL_ARTICLES = [
  defineArticle({
    title: "Accounting software for sole traders in South Africa",
    slug: "accounting-software-sole-traders-south-africa",
    category_tag: "Buying guide",
    author: "kanizan",
    published_date: "2026-07-15",
    excerpt:
      "Below the VAT threshold your requirements are genuinely simpler, and paying for a package built for a fifty person business is money wasted.",
    content: `
      <p>A sole trader turning over four hundred thousand rand a year does not need what a wholesaler with three warehouses needs, and the market does a poor job of saying so. Here is the honest version.</p>
      <h2>Start with the VAT question</h2>
      <p>Compulsory VAT registration applies above one million rand in taxable supplies over twelve months. Voluntary registration is possible from fifty thousand rand. Whether you are registered changes the software decision more than anything else about your business.</p>
      <p>If you are not registered, you do not need a VAT201, and that removes the single biggest local compliance requirement. Your options widen considerably and your budget should narrow.</p>
      <h2>Not registered for VAT</h2>
      <p>Zoho Books Free is the strongest option. A thousand invoices a year, a client portal, bank reconciliation and an accountant seat, at no cost, with a real upgrade path when you grow.</p>
      <p>If you bill by the hour, FreshBooks Lite is worth the dollar cost purely for the time tracking to invoice pipeline and the payment chasing, which measurably improves how quickly independents get paid. It is not a South African ledger and at this scale that does not matter yet.</p>
      <p>Wave is free and functional if all you need is a legitimate set of books and a manual statement import once a month.</p>
      <h2>Registered for VAT</h2>
      <p>The free tier options stop being sensible. Sage Accounting Start at around R220 a month excluding VAT gives you a working VAT201 and every major bank feed. Zoho Books Standard at around R380 gives you more capability for more money.</p>
      <p>The deciding factor at this size is usually your accountant. Ask them.</p>
      <h2>Things you do not need</h2>
      <p>Inventory, unless you actually hold stock. Multi currency, unless you actually invoice in another currency. Project costing, unless you actually cost projects. Vendors sell tiers by bundling these, and it is worth checking whether the tier above is genuinely giving you something you will use.</p>
      <h2>The one thing worth spending on</h2>
      <p>Receipt capture. Photographing a slip at the till and having it attach to the transaction is the difference between a clean set of books and a shoebox in February. QuickBooks has the best mobile capture in the category, and Sage, Xero and Zoho all have workable versions.</p>
      <p>For a sole trader, the failure mode is not choosing the wrong software. It is not doing the bookkeeping at all until year end. Choose the thing you will actually open.</p>
    `,
  }),

  defineArticle({
    title: "Payroll software for small employers under twenty staff",
    slug: "payroll-software-small-employers-south-africa",
    category_tag: "Buying guide",
    author: "haseeba",
    published_date: "2026-07-01",
    excerpt:
      "Statutory obligations do not scale down. A five person employer files the same EMP201 as a five hundred person one, and needs software that does it correctly.",
    content: `
      <p>The compliance burden on a small employer is disproportionate. Whether you employ four people or four hundred, you file a monthly EMP201, reconcile twice a year on EMP501, issue IRP5 certificates, declare to the UIF and calculate ETI. The volume differs. The obligations do not.</p>
      <p>Which means a small employer needs real payroll software, and the temptation to run it in a spreadsheet is the most expensive shortcut available.</p>
      <h2>What per employee pricing actually costs you</h2>
      <p>At this size the pricing model matters more than the feature list.</p>
      <ul>
        <li><strong>SimplePay</strong> at around R26 per employee per month excluding VAT, with no minimum. Eight employees costs about R208 a month excluding VAT.</li>
        <li><strong>Payroll Online</strong> at around R19 per employee, with a five employee minimum. Eight employees costs about R152.</li>
        <li><strong>Sage Payroll</strong> from R72 a month including VAT. It is banded by headcount rather than charged per employee, so ask for the figure at your own band before comparing it with a per employee product.</li>
        <li><strong>Sage Pastel Payroll</strong> is banded rather than per employee, so a small employer pays a band price whether they have four staff or fifteen. At this size it is usually the most expensive option.</li>
      </ul>
      <h2>Our recommendation</h2>
      <p>SimplePay. The per employee rate with no minimum is the fairest structure available, the statutory work is complete, and the support desk is local and competent. For a small employer without a payroll specialist on staff, that last point is worth more than the rand difference against a cheaper competitor.</p>
      <p>Payroll Online is a legitimate cheaper alternative if your payroll is entirely salaried, you have no bargaining council exposure and you do not expect to grow past fifty staff. If any of those change you will be migrating, and mid year payroll migrations are unpleasant.</p>
      <h2>The things small employers most often get wrong</h2>
      <ol>
        <li><strong>Not registering for SDL when they cross the threshold.</strong> The levy applies where annual payroll exceeds five hundred thousand rand. Growing past it without registering creates a liability with interest.</li>
        <li><strong>Missing ETI entirely.</strong> A small employer with three qualifying young employees is leaving real money with SARS every month. It is worth checking.</li>
        <li><strong>Treating contractors as contractors when SARS would not.</strong> The independent contractor test is about control and integration, not about what the agreement says. Getting this wrong creates a PAYE liability for the employer.</li>
        <li><strong>Leave balances in a spreadsheet.</strong> Every payroll here handles BCEA leave. Use it. The balance you argue about at termination is always the one nobody was tracking.</li>
      </ol>
      <h2>Setting up properly</h2>
      <p>Take a day. Load your employees with correct start dates, correct identity numbers and correct historical leave. Run one parallel month against your current process and reconcile them to the cent before you switch. It is the single highest value day of work available to a small employer, and almost nobody does it.</p>
    `,
  }),

  defineArticle({
    title: "How much does business software actually cost in South Africa?",
    slug: "business-software-cost-south-africa",
    category_tag: "Practical",
    author: "kinza",
    published_date: "2026-06-27",
    excerpt:
      "Sticker price, VAT, exchange rate exposure, seat bands, implementation and the renewal. A realistic three year budget for a fifteen person business.",
    content: `
      <p>The number on the pricing page is rarely the number you pay. Here is what a realistic budget looks like for a fifteen person South African business running a normal software stack, and where the surprises come from.</p>
      <h2>The six things that move the price</h2>
      <h3>1. VAT</h3>
      <p>Most vendors quote South African prices excluding VAT. Add 15% to every figure before comparing. It is the simplest adjustment and the one most often skipped.</p>
      <h3>2. The exchange rate</h3>
      <p>Anything billed in dollars, pounds or euros is a variable cost. A ten percent move against the rand over a year is unremarkable, and on a stack costing eight thousand rand a month that is nine and a half thousand rand over the year that nobody budgeted.</p>
      <p>Cards also carry an international transaction fee, typically two to three percent, which is invisible until you look at a statement line.</p>
      <h3>3. Seat bands</h3>
      <p>monday.com sells in fixed bands. A team of eleven pays for fifteen seats. Wrike and Smartsheet have minimum user counts. Always calculate what you will pay, not what the per seat figure implies.</p>
      <h3>4. The tier that actually has the features</h3>
      <p>This is the most common overrun. The demo shows automation, custom reporting and required fields. Those are usually on the tier above the one being quoted. Get the tier confirmed in writing against a list of the specific features you were shown.</p>
      <h3>5. Implementation</h3>
      <p>For anything above small business software, implementation is a real number and it usually exceeds year one licence cost. For ERP, budget two to three times. For a CRM at Salesforce scale, the same. For payroll and small business accounting, budget a few days of a consultant if your data needs migrating.</p>
      <h3>6. The renewal</h3>
      <p>Vendors discount to win and correct at renewal. Negotiate multi year terms with capped increases at the outset. This is standard practice and vendors expect to be asked. Not asking is how a fifteen percent uplift arrives in year two.</p>
      <h2>A worked three year budget</h2>
      <p>Fifteen people. Accounting, payroll, CRM and project management. Figures excluding VAT, dollar items converted at a conservative rate.</p>
      <table>
        <thead><tr><th>Item</th><th>Monthly</th><th>Year 1</th><th>3 years</th></tr></thead>
        <tbody>
          <tr><td>Sage Accounting Standard</td><td>R495</td><td>R5 940</td><td>R18 900</td></tr>
          <tr><td>SimplePay, 15 employees</td><td>R390</td><td>R4 680</td><td>R14 900</td></tr>
          <tr><td>Zoho CRM Professional, 6 users</td><td>R2 700</td><td>R32 400</td><td>R103 000</td></tr>
          <tr><td>Asana Starter, 15 seats</td><td>R3 100</td><td>R37 200</td><td>R124 000</td></tr>
          <tr><td>Setup and migration, once off</td><td></td><td>R18 000</td><td>R18 000</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>R6 685</strong></td><td><strong>R98 220</strong></td><td><strong>R278 800</strong></td></tr>
        </tbody>
      </table>
      <p>Add 15% VAT for the invoiced figure. Add a contingency of around ten percent for exchange rate movement on the dollar denominated items, which here are two of the four.</p>
      <h2>Where to save without regretting it</h2>
      <p>Annual billing usually saves fifteen to twenty percent and is worth taking where you are confident in the product. Do not take it in the first year.</p>
      <p>Audit your seats every quarter. Software subscriptions accumulate seats for people who left, and nobody notices because the amount does not change enough to trigger a question.</p>
      <p>Choose rand billed products where the capability is comparable. Zoho against HubSpot is the clearest example: the exchange rate exposure is a real cost and it buys you nothing.</p>
    `,
  }),

  defineArticle({
    title: "Migrating accounting software without losing your history",
    slug: "migrating-accounting-software-guide",
    category_tag: "Practical",
    author: "kanizan",
    published_date: "2026-06-06",
    excerpt:
      "A migration plan that survives an audit: what to move, what to archive, when to switch and how to prove the opening balances are right.",
    content: `
      <p>Most accounting migrations go wrong in the same three ways: they happen mid period, the opening balances are not verified, and the historical detail turns out to be unreachable when the auditors ask for it. All three are avoidable with a plan.</p>
      <h2>When to switch</h2>
      <p>The start of a financial year, first choice. The start of a VAT period, acceptable. Any other time, avoid. Migrating mid period means producing one VAT201 from two systems, and every error we see in migration work traces back to that.</p>
      <p>Give yourself six weeks between deciding and switching. Not because the work takes six weeks, but because the questions you have not thought of surface in week three.</p>
      <h2>What to move</h2>
      <p>Move balances, not history. Specifically:</p>
      <ul>
        <li>Trial balance as at the conversion date, agreeing to your last signed or reviewed set</li>
        <li>Open customer invoices with their original dates, so the age analysis is correct from day one</li>
        <li>Open supplier invoices, same</li>
        <li>Bank balances per account, reconciled to a statement</li>
        <li>Stock on hand with quantities and values, where you carry stock</li>
        <li>Fixed asset register with cost, accumulated depreciation and remaining life</li>
        <li>Customer and supplier master data, cleaned first</li>
      </ul>
      <p>Do not attempt to move three years of transaction detail. It is slow, it is error prone, and the receiving system will not hold it in a shape that satisfies anyone. Keep the old system readable instead.</p>
      <h2>Keeping the old system readable</h2>
      <p>This is the step people skip and regret. SARS can request supporting documentation for five years, and your auditors will want prior year detail.</p>
      <p>If the old system was desktop, keep a working installation on a machine that will still boot, plus the licence details. If it was cloud, export everything before you cancel, because access ends when billing does. Export the general ledger detail, the customer and supplier ledgers, the trial balances, and critically the transaction attachments if the system holds them.</p>
      <p>Test that the export opens and is readable before you cancel the subscription. A twelve gigabyte archive that turns out to be in a proprietary format is not a record.</p>
      <h2>Proving the opening balances</h2>
      <p>After loading, run a trial balance in the new system as at the conversion date and place it next to the old one. They must agree line for line. Where they do not, find out why before you process a single transaction.</p>
      <p>Then run the age analysis in both systems and agree the totals and the ageing buckets. An age analysis that agrees in total but not by bucket means invoice dates were loaded as the conversion date, which produces a wrong debtors report every month afterwards.</p>
      <p>Have your accountant sign off the opening balances. It costs a couple of hours and it is what you produce if the position is ever questioned.</p>
      <h2>Run parallel for one period</h2>
      <p>Process one month in both systems. It is duplicated work and it is the only way to find the differences while they are still cheap to fix. Reconcile the two at the end of the month and only then decommission the old process.</p>
      <h2>Tell the people who need to know</h2>
      <p>Your accountant, before you start rather than after. Your auditors, if the year is under audit. Your bank, if statements feed the system. And your customers, if invoice numbering or bank details change, because a changed bank detail on an invoice is exactly the shape of a common fraud and your customers are right to query it.</p>
    `,
  }),

  defineArticle({
    title: "Free accounting software in South Africa: what you actually get",
    slug: "free-accounting-software-south-africa",
    category_tag: "Practical",
    author: "kanizan",
    published_date: "2026-05-08",
    excerpt:
      "Three genuinely free options, what each one gives you, and the point at which free becomes more expensive than paying.",
    content: `
      <p>Free accounting software exists and some of it is genuinely useful. The question worth asking is not whether it is free but where the cost has moved to, because it has always moved somewhere.</p>
      <h2>Zoho Books Free</h2>
      <p>The strongest free offering available here. A thousand invoices a year, a client portal, bank reconciliation, VAT tracking, recurring invoices, and one accountant seat. It is limited by your annual revenue rather than by crippling features, which is an honest way to structure a free tier.</p>
      <p>The cost has moved to the ecosystem. Zoho is happiest surrounded by other Zoho products, and few South African accounting practices are fluent in it. Ask your accountant before committing.</p>
      <h2>Wave</h2>
      <p>A real double entry ledger with unlimited invoices, unlimited users and unlimited transactions, at no cost. The financial statements are legitimate and an accountant can work from them.</p>
      <p>The cost has moved to your time. No South African VAT201, no supply category treatment, no local bank feeds and no telephone support. Every statement is a manual import. Below the VAT threshold with one bank account this is genuinely fine. The moment you register for VAT it starts costing you your bookkeeper's hours.</p>
      <h2>Odoo Community</h2>
      <p>Open source, self hosted, and the licence genuinely costs nothing. Accounting, inventory, purchasing, sales, manufacturing and project management, all included.</p>
      <p>The cost has moved to expertise and infrastructure. You provide the server, the backups, the security patching, the upgrades and the person who understands it. For a business with technical capacity this can be excellent value. For a business without it, the free licence is the cheapest part of the total.</p>
      <h2>The honest test</h2>
      <p>Free is the right choice when three things are true: you are below the VAT threshold, your transaction volume is low enough that manual work is tolerable, and you have somewhere to grow to when that changes.</p>
      <p>Free is the wrong choice when you are VAT registered, when you carry stock, when more than one person needs to work in the books, or when your accountant charges by the hour and the system makes their work harder. In those situations a R220 a month subscription is the cheapest line item in the business.</p>
      <h2>What free tiers are actually for</h2>
      <p>Two things. Evaluating properly, with your own data, before you commit budget. And carrying a genuinely small business until it is not small. Both are legitimate. Building a business that will employ fifteen people on a free tier is not, and the migration you will do in year three will cost more than the subscription you avoided.</p>
    `,
  }),

  defineArticle({
    title: "Should you buy accounting and payroll from the same vendor?",
    slug: "accounting-payroll-same-vendor",
    category_tag: "Opinion",
    author: "haseeba",
    published_date: "2026-04-16",
    excerpt:
      "Bundling is convenient and it is not free. The case for and against buying your ledger and your payroll from one company.",
    content: `
      <p>Sage will sell you accounting and payroll. Zoho will sell you accounting, CRM and HR. The pitch is always integration, and it is a real benefit. It is also the argument every vendor makes about every adjacent product they sell, so it deserves scrutiny.</p>
      <h2>The case for bundling</h2>
      <p>The payroll journal posting straight into the ledger with no export, import or reconciliation is a genuine time saving, and more importantly it removes a place where errors hide. A monthly payroll journal captured by hand is a monthly opportunity to transpose a figure.</p>
      <p>One vendor also means one support relationship, one invoice and one renewal conversation. When something breaks across the boundary between two systems, having one company that cannot blame another is worth something.</p>
      <h2>The case against</h2>
      <p>You are almost never buying the best product in both categories. Sage Payroll is good. SimplePay is better, on interface clarity and support responsiveness, and our review corpus is consistent about that. Choosing Sage payroll to match Sage accounting means choosing the second best payroll to save an export step.</p>
      <p>Bundles also create lock in. Migrating one system is a project. Migrating two interlocked systems is a bigger one, and vendors know this when they price the renewal.</p>
      <h2>How to decide</h2>
      <p>Ask how much work the integration actually saves. For most small businesses the payroll journal is one entry a month. If integration saves fifteen minutes a month, it should not outweigh a payroll product that is materially better to use every single pay run.</p>
      <p>For a larger employer with departmental cost allocation, multiple companies and complex deduction structures, the journal is not one entry and the integration argument gets much stronger.</p>
      <h2>The middle path</h2>
      <p>SimplePay integrates with Sage Accounting, Xero, QuickBooks Online and Zoho Books, and posts journals automatically. That is the integration benefit without the compromise, and it is why it is the combination we recommend most often: best in class payroll, your choice of ledger, and a supported connection between them.</p>
      <p>Check the integration during the trial rather than trusting the logo on a website. Post a real payroll journal and look at what lands in the ledger. Some integrations post a single summarised journal, which is fine. Some post per employee, which nobody wants in their general ledger.</p>
    `,
  }),

  defineArticle({
    title: "The questions to ask an ERP implementation partner",
    slug: "erp-implementation-partner-questions",
    category_tag: "Practical",
    author: "kanizan",
    published_date: "2026-03-19",
    excerpt:
      "In ERP the partner matters more than the product. Fourteen questions that separate a firm that will deliver from one that will learn on your project.",
    content: `
      <p>We say it in every ERP review and it is worth a piece of its own: the implementation partner determines the outcome more than the software does. The same product delivers a smooth go live with one firm and a nine month ordeal with another.</p>
      <p>Here is what to ask, and what a good answer sounds like.</p>
      <h2>About their experience</h2>
      <ol>
        <li><strong>How many implementations of this product have you completed in my industry, at my scale, in the last three years?</strong> You want a number and you want to hear specifics, not a claim about the firm's total experience.</li>
        <li><strong>Can I speak to three references who went live in the last two years?</strong> A partner who cannot produce this is telling you something. Phone the references and ask what went wrong, not what went well.</li>
        <li><strong>Who specifically will be on my project, and what else are they working on?</strong> The people in the sales meeting are frequently not the people who do the work.</li>
        <li><strong>What is your consultant turnover?</strong> Losing your lead consultant mid project is a real risk and it is worth knowing the firm's history.</li>
      </ol>
      <h2>About the local specifics</h2>
      <ol start="5">
        <li><strong>Show me a VAT201 produced from live data in this system.</strong> Not a slide, not a demo database. This is the single most revealing request you can make, particularly for SAP Business One, Acumatica and NetSuite where localisation comes from the partner.</li>
        <li><strong>How do you handle the payroll interface?</strong> Most of these systems have no South African payroll, so the journal comes from SimplePay, PaySpace or Sage. Ask who owns that interface.</li>
        <li><strong>What happens when the tax rate or a statutory requirement changes?</strong> Who ships the update, how quickly, and is it covered by the support agreement.</li>
      </ol>
      <h2>About the project</h2>
      <ol start="8">
        <li><strong>What is your estimate, and what are the three things most likely to make it wrong?</strong> A partner who says nothing will make it wrong is either inexperienced or not being straight with you.</li>
        <li><strong>Who owns data migration, and have you looked at our current data?</strong> Dirty opening data is the most common cause of a bad go live and the least often scoped properly.</li>
        <li><strong>What does your change control process look like?</strong> Scope will change. You want to know how that is priced before it happens, not after.</li>
        <li><strong>How much of our team's time do you need, from whom, and when?</strong> Implementations fail when the business assumes the partner will do it all. Get the internal effort quantified up front.</li>
      </ol>
      <h2>About afterwards</h2>
      <ol start="12">
        <li><strong>What does support cost once we are live, and what does it cover?</strong> The ongoing relationship is where the total cost really lives.</li>
        <li><strong>What can we do ourselves, and what will always need you?</strong> A system where every field change needs a paid consultant is a permanent overhead.</li>
        <li><strong>What happens if we want to move to a different partner?</strong> Ask it. The answer tells you how the relationship is structured.</li>
      </ol>
      <h2>The red flags</h2>
      <p>A quote produced without anyone having seen your processes. A refusal to give references. An estimate that assumes no change requests. A statement that the software does something out of the box that you have not seen demonstrated. And any pressure to sign before a deadline that belongs to the partner rather than to you.</p>
    `,
  }),

  defineArticle({
    title: "How we test and rate software at Bosberaaad",
    slug: "how-we-test-and-rate-software",
    category_tag: "Editorial",
    author: "kinza",
    published_date: "2026-02-26",
    featured: true,
    excerpt:
      "Our method, our ranking mathematics, how affiliate relationships are handled and what would make us change a rating.",
    content: `
      <p>A review site earns trust by explaining its method and then following it. This is ours.</p>
      <h2>How a product gets on the list</h2>
      <p>We include products that South African businesses actually shortlist. That means local incumbents, international products with a real local presence, and anything that appears often enough in buyer conversations to need a considered answer. We do not include products we cannot assess properly.</p>
      <p>Nobody pays to be listed and nobody can pay to be ranked higher. Products are added because they belong on the list.</p>
      <h2>How we assess</h2>
      <p>Every product is assessed against five dimensions: ease of use, value for money, customer service, functionality and an overall judgement. Where the category has a local statutory dimension, we assess that explicitly against a fixed checklist rather than against the vendor's claims.</p>
      <p>For accounting, that checklist is VAT201 output, eFiling transfer, supply category handling, bank feed coverage across the major South African banks, and accountant access. For payroll it is EMP201, EMP501, IRP5 and IT3(a), e@syFile validation, UIF, SDL, ETI, BCEA leave and the ACB payment file. For HR it is BCEA leave, employment equity reporting and POPIA handling of special personal information.</p>
      <p>Where a product fails an item on the checklist we say so plainly, including where the product is otherwise excellent.</p>
      <h2>How ratings are calculated</h2>
      <p>Aggregate ratings come from verified user reviews and nothing else. Our editorial view shapes what we write, not the star average. The averages are computed by the database from published reviews and are never written by hand.</p>
      <p>Ranking is a different question. We rank using a Bayesian weighted average rather than a raw star average, because a raw average lets a product with eleven reviews at 4.8 outrank one with four hundred at 4.4, and that is not useful to a buyer. Each product's score is blended towards the platform mean, weighted by its review volume, with the median review count as the prior weight. A product with a lot of reviews sits close to its own average. A product with few sits closer to the middle until it earns its position.</p>
      <h2>How reviews are verified</h2>
      <p>Reviewers state their role, industry, company size and how long they have used the product. Where we can confirm a reviewer's professional identity, the review carries a verified badge. Reviews that read as vendor written, competitor written or incentivised are removed.</p>
      <p>We do not remove negative reviews at a vendor's request. Vendors may respond publicly and their response is published alongside the review.</p>
      <h2>How we make money</h2>
      <p>Affiliate commission when a reader clicks through to a vendor and subscribes, and display advertising. Both are disclosed. Every commercial link carries a visible disclosure next to it and the sponsored attribute in the markup.</p>
      <p>The rule we hold ourselves to is that commercial relationships never affect a rating, a ranking or the wording of an assessment. The clearest evidence is that several products we rate highly pay us nothing, and several products with affiliate programmes are rated below products without them.</p>
      <h2>What would make us change a rating</h2>
      <p>New review volume shifting the average. A vendor fixing something we criticised, which we re test. A vendor removing something we praised. A material price change, which we re verify quarterly. And errors, which we correct openly rather than quietly.</p>
      <p>If you believe we have something wrong, tell us. Corrections that turn out to be justified are made with a note explaining what changed.</p>
    `,
  }),

  defineArticle({
    title: "CRM adoption: why your team stopped using it",
    slug: "crm-adoption-why-teams-stop-using-it",
    category_tag: "Opinion",
    author: "kinza",
    published_date: "2026-02-12",
    excerpt:
      "Failed CRM projects almost never fail because the software was incapable. Five causes, in the order we see them.",
    content: `
      <p>Every CRM vendor sells capability and every failed CRM project we look at had enough capability. The failures are about how the thing was introduced and what it was asked to do.</p>
      <h2>1. It was built for the report, not the rep</h2>
      <p>The most common cause by a distance. Management specifies the fields it wants in the pipeline report, those become required fields, and a rep now has fourteen boxes to fill in to log a call. The rep stops logging calls. The report gets worse, so more fields are added.</p>
      <p>Start with what a rep needs to do their job, and derive the report from what naturally accumulates. If a field does not help the person entering it, it should not be required.</p>
      <h2>2. Nobody removed the old way</h2>
      <p>If the sales meeting still runs off a spreadsheet, the spreadsheet is the system and the CRM is data entry. The single most effective adoption intervention is to run the sales meeting off the CRM, in the CRM, from week one, and to refuse to discuss anything that is not in it.</p>
      <p>That is uncomfortable for two meetings and then it is normal.</p>
      <h2>3. The data was dirty on day one</h2>
      <p>Importing four thousand contacts from three spreadsheets with duplicates, dead email addresses and no owner produces a system nobody trusts, and trust does not recover. Import less. Import the accounts that matter, cleaned, with an owner on each. Add the rest later or not at all.</p>
      <h2>4. It was too slow on a real connection</h2>
      <p>Worth testing seriously here. A rep in a car outside a client's premises on a weak signal has ninety seconds to log a call before they walk into the next meeting. If the mobile app takes forty of those seconds to load, they will not do it, and no amount of management pressure will change that.</p>
      <h2>5. Nobody owned it</h2>
      <p>A CRM needs an owner: someone whose job includes keeping it clean, fixing the things that annoy people, and saying no to field requests. Without that person it degrades within six months, and degradation is one way.</p>
      <p>This does not need to be a full time role in a small business, and it does need to be somebody's explicit responsibility rather than everyone's vague one.</p>
      <h2>What good adoption looks like</h2>
      <p>Deals move stages without anyone being chased. The forecast in the CRM is the forecast management uses. A rep who is off sick can be covered because the history is there. Nobody maintains a private spreadsheet.</p>
      <p>If any of those are untrue six months in, the problem is the process rather than the product, and changing CRM will not fix it.</p>
    `,
  }),

  defineArticle({
    title: "What to check before signing an annual software contract",
    slug: "annual-software-contract-checklist",
    category_tag: "Practical",
    author: "kinza",
    published_date: "2026-01-29",
    excerpt:
      "Auto renewal, price uplift caps, data export rights and notice periods. The clauses that matter and the ones vendors expect you to negotiate.",
    content: `
      <p>Annual software contracts are usually presented as standard terms, and a good deal of what is in them is negotiable if you ask before you sign. Nobody negotiates after.</p>
      <h2>Auto renewal and notice</h2>
      <p>Most agreements renew automatically unless cancelled a set period before the anniversary, frequently thirty, sixty or ninety days. Ninety day notice on an annual contract means you must decide to leave nine months into a twelve month term.</p>
      <p>Diarise the notice date the day you sign. Not the renewal date, the notice date. This one habit prevents the most common and most avoidable software cost in business.</p>
      <h2>Price uplift</h2>
      <p>Ask for a cap on renewal increases, expressed as a percentage or tied to CPI. Vendors expect this request from customers of any size and frequently agree to it. Without a cap, the renewal price is whatever the vendor decides, and the most consistent complaint in our enterprise review set is uplift at renewal.</p>
      <p>If you can, negotiate a multi year term with fixed pricing. The discount for doing so is usually meaningful and the certainty is worth more than the discount.</p>
      <h2>Data export rights</h2>
      <p>Confirm in the agreement, not in a support article, that you can export your complete data in a usable format at any time, including after termination, and for how long after. Cloud access ends when billing ends, and businesses discover this at exactly the wrong moment.</p>
      <p>Ask specifically about attachments. Many systems export transactional data cleanly and leave the attached documents behind, which is a problem when SARS asks for supporting documentation from three years ago.</p>
      <h2>The POPIA operator agreement</h2>
      <p>If the vendor processes personal information for you, section 21 requires a written contract. Ask for the data processing addendum by name and have your information officer read it. Check that it references POPIA rather than only GDPR, and that it commits the vendor to notifying you of a compromise.</p>
      <h2>Seat changes</h2>
      <p>Can you reduce seats mid term, or only add them? Many agreements allow additions at any time and reductions only at renewal. For a business with seasonal headcount that asymmetry is expensive, and it is worth asking whether a true up model is available instead.</p>
      <h2>Service levels</h2>
      <p>For anything business critical, ask what the uptime commitment is and what the remedy is when it is missed. A commitment with no remedy is a statement of intent. Ask also for the support response time by severity, in writing, because "priority support" means whatever the vendor decides it means.</p>
      <h2>What is genuinely not negotiable</h2>
      <p>For self service products bought with a card, almost everything above is fixed and the effort is not worth it. For anything with a salesperson attached, all of it is on the table. The rule of thumb is simple: if a human sent you a quote, a human can change the terms.</p>
    `,
  }),

  defineArticle({
    title: "Choosing software when your accountant and your team disagree",
    slug: "choosing-software-accountant-team-disagree",
    category_tag: "Opinion",
    author: "kinza",
    published_date: "2026-01-15",
    excerpt:
      "Your accountant wants the system they know. Your team wants the one they enjoy. Both positions are legitimate and here is how to resolve them.",
    content: `
      <p>It comes up in almost every accounting software decision. The accountant recommends Sage because their practice runs on it. The finance manager who has used Xero wants Xero. Both are arguing from real experience and neither is being unreasonable.</p>
      <h2>Take the disagreement seriously</h2>
      <p>The temptation is to treat this as a preference to be overruled. It is not. Your accountant working in an unfamiliar system will be slower, will charge more, and will find fewer of the things you pay them to find. Your finance manager working in a system they find obstructive will do less of the discretionary work that makes the numbers useful.</p>
      <p>Both costs are real. The question is which is larger in your specific business.</p>
      <h2>The test that usually resolves it</h2>
      <p>Ask two questions.</p>
      <p>First: how much of the monthly work happens inside the system, and who does it? If your finance manager is in the ledger every day and your accountant looks at it quarterly, weight the person who lives there. If you have no internal finance function and your accountant does the bookkeeping, weight the accountant.</p>
      <p>Second: how much would your accountant charge to work in the alternative? Ask them directly and get a number. Frequently the answer is that the difference is small, and the disagreement dissolves. Occasionally the answer is that they will not take the work, which is also useful information.</p>
      <h2>When the accountant should win</h2>
      <p>Where the compliance requirement is genuinely different. A practice filing forty VAT201 returns benefits materially from a system that transfers to eFiling, and that is not a preference, it is a workflow. Where you are audited, an auditor familiar with the system asks fewer questions and charges for fewer hours.</p>
      <h2>When the team should win</h2>
      <p>Where the daily experience differs sharply and the compliance outcomes do not. Sage Accounting and Xero produce equally correct VAT201 figures. One transfers to eFiling and one does not. If you file six returns a year yourself, that difference is ninety minutes annually, and it should not outweigh a system your team will actually use well.</p>
      <h2>The compromise that works</h2>
      <p>Trial both, with your own data, for a full month, with both parties using them. Not a demo. A real month, with real transactions and a real month end. Then make the decision with evidence instead of with preference.</p>
      <p>It costs a month and it settles the argument permanently, which is worth more than the month.</p>
    `,
  }),
];
