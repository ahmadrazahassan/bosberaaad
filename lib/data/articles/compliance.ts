import { defineArticle } from "./define";

export const COMPLIANCE_ARTICLES = [
  defineArticle({
    title: "VAT201: what your accounting software has to get right",
    slug: "vat201-accounting-software-requirements",
    category_tag: "Compliance",
    author: "sipho",
    published_date: "2026-07-02",
    featured: true,
    excerpt:
      "The VAT201 is where accounting software either saves you time or quietly creates work. Here is what to test before you commit to a package.",
    content: `
      <p>The VAT201 return is the clearest test of whether an accounting package was built for this market. Every vendor will tell you they support South African VAT. Fewer of them mean that the return comes out complete, in the right boxes, reconciled to the ledger, without anyone rebuilding it in a spreadsheet.</p>
      <h2>What the return actually requires</h2>
      <p>The VAT201 separates supplies into categories, and your system has to track them at transaction level rather than derive them at reporting time. Standard rated supplies at 15%. Zero rated supplies, which include exports and certain basic foodstuffs. Exempt supplies, which include financial services and residential rent. Capital goods, which are declared separately from other input tax.</p>
      <p>A system that offers a single "VAT" tax code and a rate does not do this. You will spend every second month splitting figures by hand.</p>
      <h2>The five things to test in a trial</h2>
      <ol>
        <li><strong>Capture a zero rated export sale and an exempt supply.</strong> Then run the VAT201. If both land in the correct boxes without you adjusting anything, the tax code structure is real.</li>
        <li><strong>Capture a capital purchase.</strong> It should appear in the capital goods input field rather than lumped with other inputs.</li>
        <li><strong>Run the VAT reconciliation report.</strong> The output tax on the return must agree with the sales in the ledger for the period, and the system must show you the difference if it does not.</li>
        <li><strong>Post a correction into a closed period.</strong> Every business does this. The system must handle it as an adjustment in the current return rather than silently changing a return you have already submitted.</li>
        <li><strong>Export or transfer to eFiling.</strong> Ask specifically whether figures transfer or whether someone retypes them.</li>
      </ol>
      <h2>Who transfers to eFiling and who does not</h2>
      <p>Of the cloud packages sold here, Sage Accounting and Sage 50cloud Pastel transfer VAT201 figures to SARS eFiling. Xero, QuickBooks Online and Zoho Books produce a correct VAT201 report and require manual capture into eFiling.</p>
      <p>For a single company this is fifteen minutes every two months and entirely tolerable. For an accounting practice filing forty returns a period it is roughly a week a year of billable time, and it is the main reason practices here still steer clients to Sage.</p>
      <h2>The IT14SD question</h2>
      <p>Where SARS raises a supplementary declaration, you need to reconcile VAT declared against income tax turnover, and payroll declared against the ledger. Sage Accounting, Sage 50cloud Pastel and Sage 200 Evolution produce supporting schedules for this. The international packages generally do not, and a practice ends up building the reconciliation outside the system.</p>
      <p>If you are large enough to expect an IT14SD, that is worth weighting in the decision.</p>
      <h2>A note on VAT inclusive pricing</h2>
      <p>Software vendors publish South African prices inconsistently. Sage, Xero, QuickBooks and Zoho all quote excluding VAT. Some smaller local vendors quote including. Before you compare two figures, confirm which basis each is on, because the difference is 15% and it is enough to reverse a decision.</p>
      <h2>Keep the evidence</h2>
      <p>Whatever system you use, SARS can request supporting documentation for five years. Confirm during evaluation that you can attach a supplier invoice to a transaction, that attachments are included in a data export, and that an export is possible without the vendor's assistance. A system you cannot get your data out of is a system you cannot leave.</p>
    `,
  }),

  defineArticle({
    title: "POPIA and your business software: what actually applies",
    slug: "popia-business-software-compliance",
    category_tag: "Compliance",
    author: "hanli",
    published_date: "2026-06-18",
    excerpt:
      "Every vendor claims POPIA compliance. Here is what the Act actually requires of the systems you buy, and the questions that separate a real answer from a marketing one.",
    content: `
      <p>POPIA has been fully in force since July 2021 and most South African businesses have done the visible work: a privacy notice on the website, a consent checkbox on a form, an information officer registered. The systems layer gets less attention, and that is where the practical obligations sit.</p>
      <h2>Operator agreements are not optional</h2>
      <p>When a software vendor processes personal information on your behalf, they are an operator in the terms of the Act and you are the responsible party. Section 21 requires a written contract obliging the operator to establish and maintain the security measures the Act requires, and to notify you of a compromise.</p>
      <p>Most reputable vendors publish a data processing addendum that serves this purpose. Ask for it by name. If a vendor cannot produce one, that is a straightforward answer to whether you should buy from them.</p>
      <h2>Cross border transfer</h2>
      <p>Section 72 restricts sending personal information outside South Africa. It is permitted where the receiving jurisdiction has substantially similar protection, or where the operator agreement binds the recipient to equivalent standards, or with the data subject's consent.</p>
      <p>In practice, most cloud software you buy hosts data outside South Africa, and the route through section 72 is the operator agreement. This is workable and it is not automatic. Your information officer should read the agreement rather than assume the vendor's compliance page covers it.</p>
      <p>Where data residency genuinely matters, SimplePay, PaySpace, LabourNet and HR Companion host in South Africa, and on premises deployments of Sage Pastel, Sage 200 Evolution and SYSPRO keep the data in your building.</p>
      <h2>Special personal information</h2>
      <p>Section 26 sets a higher bar for certain categories, including health, biometrics, religious belief, trade union membership and criminal behaviour. An HR system routinely holds several of these: medical aid details, disciplinary records, union membership.</p>
      <p>The practical requirement is that access is restricted to people who need it for a lawful purpose. A permission model that only works at module level fails this, because a line manager approving leave should not thereby be able to read a disciplinary record. Ask to see field level or record level restriction demonstrated.</p>
      <h2>The four questions worth asking every vendor</h2>
      <ol>
        <li>Can you produce a signed operator agreement that references POPIA, not only GDPR?</li>
        <li>Where is the data hosted, and what happens to it if we terminate?</li>
        <li>Can I find and permanently delete one individual's record across the whole system, and can you show me?</li>
        <li>What is your breach notification commitment, in hours, and to whom?</li>
      </ol>
      <h2>Retention is the part everyone skips</h2>
      <p>Section 14 says you may not keep personal information longer than necessary for the purpose it was collected for, unless another law requires it. Other laws frequently do: tax records for five years, employment records under the BCEA, and so on.</p>
      <p>The practical implication is that you need a retention schedule and a system that can act on it. Very few businesses have either. Where your software supports configurable retention rules, use them. Where it does not, at minimum document the schedule so the decision is deliberate rather than accidental.</p>
      <h2>The marketing consent trap</h2>
      <p>Section 69 governs direct marketing by electronic means. For people who are not existing customers, you need consent, and you may only ask once. An existing customer may be marketed to for similar products, provided you gave them an opportunity to object at collection and in every message.</p>
      <p>If your CRM cannot record the basis on which each contact is being marketed to, and the date and source of consent where consent applies, you cannot demonstrate compliance if you are asked. That capability is worth checking in a CRM trial.</p>
    `,
  }),

  defineArticle({
    title: "ETI: the calculation your payroll system must get right",
    slug: "eti-employment-tax-incentive-payroll",
    category_tag: "Compliance",
    author: "reneile",
    published_date: "2026-06-03",
    excerpt:
      "The Employment Tax Incentive is worth real money and the calculation is fiddly. Here is how it works and how to check your payroll is doing it correctly.",
    content: `
      <p>The Employment Tax Incentive reduces the PAYE an employer pays over to SARS for qualifying young employees. It is a genuine cash benefit and a great many employers either underclaim it or claim it incorrectly, and both outcomes are expensive in different ways.</p>
      <h2>Who qualifies</h2>
      <p>Broadly, an employee qualifies where they are between eighteen and twenty nine years old, hold a South African identity document or an asylum seeker or refugee permit, were employed on or after 1 October 2013, and earn below the monthly remuneration ceiling. The employer must be registered for PAYE and must not be in the public sector.</p>
      <p>Employees in special economic zones and certain designated industries qualify without the age restriction.</p>
      <h2>The part systems get wrong</h2>
      <p>Three things, consistently.</p>
      <h3>The twenty four month window</h3>
      <p>ETI is claimable for twenty four qualifying months per employee, split into a first twelve months at a higher rate and a second twelve months at a lower rate. The months are counted per employee across employers, and they need not be consecutive.</p>
      <p>Employers who do not track this per employee keep claiming after the window closes. On audit that becomes a repayment with interest and, in some cases, a penalty. If your payroll cannot show you the months remaining for each employee, you are exposed.</p>
      <h3>The sliding scale</h3>
      <p>The incentive is not a flat amount. It rises with remuneration to a plateau and then tapers to zero at the ceiling. Getting the taper wrong on employees near the top of the band produces small errors on many employees, which is the hardest kind to spot.</p>
      <h3>Part month employment</h3>
      <p>Where an employee works less than a full month, the remuneration must be grossed up to a monthly equivalent to determine the band, and then the incentive apportioned. Systems that skip the gross up put employees in the wrong band and understate the claim.</p>
      <h2>How to check your payroll</h2>
      <p>Ask your system for an ETI report that shows, per employee per month: the remuneration used, the band applied, the months claimed to date, the months remaining, and the resulting incentive. If your payroll cannot produce that, ask the vendor how you are expected to substantiate the claim on audit.</p>
      <p>Of the systems we assess, SimplePay, PaySpace, Sage Pastel Payroll, Sage Business Cloud Payroll and PaySoft all produce a working per employee ETI schedule. Payroll Online supports ETI with thinner reporting.</p>
      <h2>The unclaimed balance</h2>
      <p>Where the ETI you are entitled to exceeds the PAYE payable in a month, the excess is not lost immediately. It rolls forward within the reconciliation period and is refunded on the EMP501 if it remains unused, provided you are tax compliant at that point.</p>
      <p>That last condition matters. An employer with an outstanding return or an unpaid liability forfeits the refund. It is worth checking your compliance status before the reconciliation rather than after.</p>
      <h2>Practical advice</h2>
      <p>Run an ETI review annually, ideally before the August reconciliation. Pull the per employee schedule, confirm identity document validity, confirm the age at each claim month rather than today, and confirm nobody has passed twenty four months. It takes a morning and it is the cheapest audit insurance available to a South African employer.</p>
    `,
  }),

  defineArticle({
    title: "BCEA leave rules and why imported HR software gets them wrong",
    slug: "bcea-leave-rules-hr-software",
    category_tag: "Compliance",
    author: "reneile",
    published_date: "2026-05-20",
    excerpt:
      "Annual, sick and family responsibility leave under the BCEA, and the specific configuration failures that produce wrong balances in international HR systems.",
    content: `
      <p>The Basic Conditions of Employment Act sets leave entitlements that do not match the assumptions built into most international HR software. The result is systems that produce plausible looking balances which are quietly wrong, and nobody notices until an employee leaves and the payout is disputed.</p>
      <h2>Annual leave</h2>
      <p>The Act gives twenty one consecutive days of annual leave on full pay per annual leave cycle, which for an employee working a five day week is fifteen working days. The alternative formulations permitted are one day for every seventeen days worked, or one hour for every seventeen hours worked.</p>
      <p>The practical point is that leave accrues as it is earned rather than being granted in full on day one. A system that credits the full annual entitlement in January and lets an employee take all of it in February has created an overpayment risk on termination.</p>
      <p>Leave must be granted within six months after the end of the cycle. Accumulating leave indefinitely is not permitted, and a system that shows an employee with sixty days accrued is describing a liability that should not exist.</p>
      <h2>Sick leave</h2>
      <p>This is the entitlement international software handles worst. Sick leave operates on a three year cycle, not an annual one. Over the cycle an employee is entitled to the number of days they would normally work in six weeks. For a five day week that is thirty days over three years.</p>
      <p>During the first six months of employment the entitlement is one day for every twenty six days worked.</p>
      <p>A system that resets sick leave every January is wrong. It will show an employee as having entitlement they have already used, and the error compounds across the cycle.</p>
      <h2>Family responsibility leave</h2>
      <p>Three days per annual leave cycle for employees who have been employed longer than four months and work at least four days a week. It applies on the birth or illness of a child, or the death of specified family members.</p>
      <p>It is a separate entitlement. Systems that fold it into sick leave or annual leave are understating one balance and overstating another.</p>
      <h2>Parental leave</h2>
      <p>Maternity leave is four consecutive months, unpaid by the employer, with the employee claiming from the UIF. Parental leave is ten consecutive days for the other parent. Adoption and commissioning parental leave have their own provisions.</p>
      <p>Since the 2023 judgment on parental leave provisions, employers should take advice on their specific policy position rather than relying on a system default.</p>
      <h2>What to test in an HR trial</h2>
      <ol>
        <li>Set up an employee with a start date two years ago, book sick leave in year one, and confirm the balance in year three reflects the cycle rather than an annual reset.</li>
        <li>Confirm annual leave accrues monthly rather than being granted in full.</li>
        <li>Confirm family responsibility leave exists as its own type with its own balance.</li>
        <li>Book leave over a public holiday and confirm the holiday is not deducted.</li>
        <li>Terminate a test employee mid cycle and confirm the leave payout calculation.</li>
      </ol>
      <h2>Which systems ship it correctly</h2>
      <p>Sage HR and HR Companion model BCEA leave without configuration. SimplePay, PaySpace, Sage Pastel Payroll and Sage Business Cloud Payroll all handle it correctly on the payroll side. BambooHR, PeopleHR and Personio are flexible enough to be configured correctly and do not ship that way, so budget for someone who knows the Act to set it up and then test it against the scenarios above.</p>
    `,
  }),

  defineArticle({
    title: "SARS eFiling integration: which accounting packages actually connect",
    slug: "sars-efiling-accounting-software-integration",
    category_tag: "Compliance",
    author: "sipho",
    published_date: "2026-04-22",
    excerpt:
      "The difference between software that produces a VAT201 report and software that submits one, and what that difference costs across a year.",
    content: `
      <p>Vendors describe eFiling support in language that covers a wide range of behaviour. It is worth being precise about what the options actually are, because the difference is measured in hours.</p>
      <h2>Three levels of support</h2>
      <h3>Level one: a correct report</h3>
      <p>The system produces a VAT201 report with the right figures in fields that correspond to the return. Someone opens eFiling, types the figures in and submits. This is what Xero, QuickBooks Online, Zoho Books and most international packages do.</p>
      <p>It is not a problem for a single company. It is roughly fifteen minutes a period, and the risk is transcription error rather than calculation error.</p>
      <h3>Level two: transfer</h3>
      <p>The system pushes figures into eFiling so the return is populated and you review and submit. This is what Sage Accounting and Sage 50cloud Pastel do for VAT201.</p>
      <p>For an accounting practice this is the meaningful difference. Forty returns a period at fifteen minutes each is ten hours, six times a year.</p>
      <h3>Level three: full submission with acknowledgement</h3>
      <p>The system submits and stores the acknowledgement against the period. This exists in the payroll world, where e@syFile handles the employer submissions, but no small business accounting package we assess does it end to end for VAT.</p>
      <h2>Payroll is a different story</h2>
      <p>On the payroll side, the picture is better. e@syFile is SARS's own employer application, and every credible South African payroll produces an import file for it. SimplePay, PaySpace, Sage Pastel Payroll, Sage Business Cloud Payroll, PaySoft and Payroll Online all do.</p>
      <p>The test worth applying is whether the file validates in e@syFile on the first attempt. Systems that produce files requiring correction turn a one hour job into a day, twice a year. Ask a vendor's existing customers about this specifically rather than asking the vendor.</p>
      <h2>What to ask a vendor</h2>
      <p>Use precise language, because "integrates with SARS" is a claim that covers all three levels above.</p>
      <ul>
        <li>Does the VAT201 transfer to eFiling, or is it captured manually?</li>
        <li>Does the IRP5 file validate in e@syFile without correction, and can you show me a recent one?</li>
        <li>Do you produce IT14SD supporting schedules?</li>
        <li>How quickly do you release compliance updates after a budget change to the VAT rate or tax tables?</li>
      </ul>
      <p>That last question matters more than it sounds. When tax tables change, a payroll vendor that ships the update in the week is worth paying for. One that ships it a month later has cost you a correction run.</p>
      <h2>A practical recommendation</h2>
      <p>If you are a business filing your own returns, level one support is fine and you should choose your accounting package on other criteria. If you are a practice filing on behalf of clients, transfer capability is worth real money and it is a legitimate reason to standardise your client base on one system.</p>
    `,
  }),

  defineArticle({
    title: "What load shedding should change about your software choices",
    slug: "load-shedding-business-software-choices",
    category_tag: "Opinion",
    author: "hanli",
    published_date: "2026-04-09",
    excerpt:
      "Cloud software assumes a connection. In a country where the connection is not guaranteed, that assumption deserves more scrutiny than it usually gets.",
    content: `
      <p>The received wisdom is that desktop software is legacy and cloud software is the future. As a general statement about the industry that is obviously true. As advice to a South African business, it deserves a caveat that rarely gets stated.</p>
      <p>Cloud software stops when your connection stops. Your connection depends on power, at your building and at the exchange or tower serving it. Backup power at your desk does not help if the fibre node is dark.</p>
      <h2>Who this actually affects</h2>
      <p>Not everyone. If you are a consultancy in Sandton with fibre, a UPS and a mobile fallback, this is a non issue and you should buy cloud software without a second thought.</p>
      <p>It matters for businesses in industrial areas with marginal connectivity, for operations in smaller towns, for anyone whose work is time bound in a way that cannot slip. A payroll that must run on the twenty fifth. A factory that must issue stock to a production run. A retailer that must take a payment.</p>
      <h2>The honest positions</h2>
      <h3>Desktop with cloud backup</h3>
      <p>Sage 50cloud Pastel and Sage Pastel Payroll keep working with no connection and sync when it returns. For a payroll administrator finishing a run during an outage, that is not nostalgia, it is the job getting done.</p>
      <p>The cost is real: remote access needs a hosted desktop or a VPN, multi user setups need someone who understands the network, and the vendors are investing in their cloud products rather than these.</p>
      <h3>Cloud with genuine offline capability</h3>
      <p>Some cloud products cache and queue. Zoho CRM's mobile app captures offline and syncs later. A few point of sale products do the same. Where offline capability is real it is usually confined to the mobile app rather than the full product, so test the specific workflow you care about.</p>
      <h3>Cloud with nothing</h3>
      <p>Most of the category. Xero, QuickBooks, Sage Accounting, monday.com, Asana. When the connection goes, work stops. For most businesses most of the time that is an inconvenience rather than a crisis.</p>
      <h2>Practical mitigations that work</h2>
      <ol>
        <li>A mobile fallback on a different network to your fixed line, configured to fail over automatically rather than requiring someone to switch it.</li>
        <li>Enough battery on the router and the switch, not just the laptop. The most common failure we hear about is a fully charged laptop with no network to talk to.</li>
        <li>Scheduling the jobs that cannot slip away from the published schedule where one exists, and building slack into the ones that can.</li>
        <li>Exporting a current copy of critical data on a schedule. If your ledger is unreachable for two days, having last week's trial balance locally is worth something.</li>
      </ol>
      <h2>The conclusion</h2>
      <p>Buy cloud software. It is better in almost every respect and the direction of the industry is not reversing. Just do the assessment honestly: identify the two or three processes in your business that genuinely cannot wait four hours, and make sure you have an answer for those specifically. For most businesses that answer is a mobile fallback and a UPS on the router, and it costs less than one month of the software.</p>
    `,
  }),

  defineArticle({
    title: "Do you have to give your accountant a licence? What software access really costs",
    slug: "accountant-access-software-licences",
    category_tag: "Practical",
    author: "sipho",
    published_date: "2026-03-26",
    excerpt:
      "Free accountant access sounds like a small feature until you price a second seat. Here is how each major package handles it.",
    content: `
      <p>It is a small line in a comparison table and it changes the total cost of ownership more than most features do. If your accountant or auditor needs a seat and the vendor charges for it, that is another user price every month for the life of the system.</p>
      <h2>Who gives it away</h2>
      <p>Sage Accounting includes accountant access on every plan at no cost, with its own permissions, and the accountant can work in the file at the same time as your bookkeeper. Zoho Books includes one accountant seat even on the free plan.</p>
      <p>Xero takes a different and arguably better approach: every plan has unlimited users. There is no accountant seat because there is no seat limit at all. For a business with a bookkeeper, an owner, an accountant and an auditor, that is four seats that cost nothing.</p>
      <h2>Who charges</h2>
      <p>QuickBooks Online counts your accountant against the plan user limit on the lower tiers, so a Simple Start subscription with one user means either you or your accountant, not both. In practice that pushes businesses onto Essentials.</p>
      <p>Desktop products are their own category. Sage 50cloud Pastel licenses per concurrent user, so an accountant working in the file occupies a seat while they are in it. Practices generally handle this by taking a backup and working on a copy, which is workable and means you are not looking at live data together.</p>
      <h2>The related question: can they get the data out</h2>
      <p>More important than the seat, honestly. At year end your accountant needs a trial balance, a general ledger detail, an age analysis and the supporting documentation. Ask two things during evaluation.</p>
      <p>First, can the accountant export a full general ledger detail to a file they can work in, without the vendor's help. Second, are transaction attachments included in an export, or do they live only in the interface. The second question catches people out at audit time, when three hundred supplier invoices turn out to be viewable but not extractable in bulk.</p>
      <h2>What we would recommend</h2>
      <p>Ask your accountant which systems they hold current certification in before you shortlist. A practice working in a system they know charges less and finds more. If they have no preference, weight unlimited or free accountant access meaningfully, because over three years it is a real number.</p>
      <p>And if a vendor cannot give you a straight answer about bulk data export, treat that as information about the relationship you are entering into rather than as a technical detail.</p>
    `,
  }),

  defineArticle({
    title: "Bank feeds in South Africa: which banks work with which software",
    slug: "bank-feeds-south-africa-accounting-software",
    category_tag: "Practical",
    author: "sipho",
    published_date: "2026-03-12",
    excerpt:
      "A direct feed and a scheduled import are not the same thing. Coverage across Absa, FNB, Standard Bank, Nedbank, Capitec, Investec and TymeBank.",
    content: `
      <p>Bank reconciliation is the single largest consumer of bookkeeping time in a small business, and a working feed is the difference between a morning a month and a week. It is also the area where vendors are least precise about what they offer.</p>
      <h2>Three things that get called a feed</h2>
      <h3>A direct feed</h3>
      <p>The bank sends transactions to the software on a schedule, through an agreed connection. Nobody logs in, nothing is downloaded, and reconnection is rare. This is what you want.</p>
      <h3>An aggregator connection</h3>
      <p>A third party service logs into your bank on your behalf using stored credentials and scrapes the transactions. It works, and it breaks more often, usually when the bank changes its login flow or enforces a new authentication step. Reconnection is a regular chore.</p>
      <h3>A statement import</h3>
      <p>You download an OFX or CSV file from your bank and upload it. This is not a feed. It is fine, and it is manual, and it should be priced as such when comparing products.</p>
      <h2>Coverage as we assess it</h2>
      <p>Sage Accounting has the broadest direct coverage: Absa, FNB, Standard Bank, Nedbank, Capitec, Investec and TymeBank. That Capitec inclusion matters, because Capitec has grown enormously among small businesses and is the most common gap elsewhere.</p>
      <p>Xero covers Absa, FNB, Standard Bank, Nedbank and Investec. QuickBooks Online covers the big four, and draws the most complaints in our review set about connections dropping and needing reauthorisation. Zoho Books covers the big four through a mix of direct and aggregator connections.</p>
      <p>Desktop products, Sage 50cloud Pastel and Sage 200 Evolution, work on statement import for all major banks.</p>
      <h2>Test this properly in the trial</h2>
      <p>Connect your actual bank account, not a demo. Then leave it for two weeks and see whether it is still connected. A feed that works on day one and needs reauthorising on day nine is not going to save you time.</p>
      <p>Check how far back the initial import goes. Some feeds only bring ninety days, which matters if you are migrating mid year and need the full period.</p>
      <p>Check what happens with a multi currency account, if you have one. Feed support for foreign currency accounts is thinner than for rand accounts across every product here.</p>
      <h2>Getting the most from a feed</h2>
      <p>Build reconciliation rules early and specifically. A rule that matches on a supplier reference and a fixed amount is reliable. A rule that matches on a partial description and a range is going to miscode something eventually, and finding that at year end is expensive.</p>
      <p>Review rules quarterly. Suppliers change their payment references, and a rule that silently stops matching is the same as no rule at all, except that you think you have one.</p>
    `,
  }),
];
