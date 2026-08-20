/**
 * Phrase corpus for the review generator.
 *
 * Reviews are composed from category aware fragments and from the product's
 * own record, so a review of a payroll product talks about EMP201 and a review
 * of a CRM talks about pipeline. Three sentiment bands: high is four and five
 * stars, mid is three, low is one and two.
 */

export type Band = "high" | "mid" | "low";

type BandedStrings = Record<Band, string[]>;
type CategoryBanded = Record<string, BandedStrings>;

export const TITLES: CategoryBanded = {
  "cat-accounting": {
    high: [
      "VAT season stopped being a crisis",
      "Our bookkeeper got two days a month back",
      "Bank feeds alone justify the subscription",
      "Finally a ledger our accountant does not complain about",
      "Solid, boring, and that is exactly what I wanted",
      "Migration was painful, the result was worth it",
      "Reconciliation went from a week to an afternoon",
      "Does the compliance work without being asked",
    ],
    mid: [
      "Does the job, will not delight you",
      "Good ledger, disappointing reporting",
      "Fine for us, would not recommend for stock heavy businesses",
      "Works well once you accept its limits",
      "Competent but the support tests your patience",
      "Right features, wrong price for our size",
    ],
    low: [
      "The bank feed problems never got fixed",
      "Support took eleven days to answer a VAT query",
      "Migrated away after fourteen months",
      "Cheaper than the alternatives, and you find out why",
      "Not built for a South African VAT vendor",
    ],
  },
  "cat-payroll": {
    high: [
      "Three tax year ends without a single correction",
      "ETI calculated correctly, with the working shown",
      "EMP501 reconciliation took forty minutes",
      "Our IRP5 files validated in e@syFile first time",
      "Payroll stopped being the worst week of the month",
      "Support actually understands South African payroll",
      "Leave finally follows the BCEA without a spreadsheet",
    ],
    mid: [
      "Compliant, but the interface fights you",
      "Fine for salaried staff, weak on wages",
      "Correct outputs, unhelpful reporting",
      "Does what it must, nothing more",
      "Good product, frustrating support queue",
    ],
    low: [
      "ETI was calculated wrong for eight months",
      "Bargaining council rules were never supported properly",
      "The March tax year end cost us a weekend",
      "Support could not explain their own UIF file",
      "Wage payroll is clearly an afterthought",
    ],
  },
  "cat-hr": {
    high: [
      "Leave requests left email and never came back",
      "Onboarding admin dropped by half",
      "Managers use it without being chased",
      "Our employment equity return took hours, not weeks",
      "The audit trail saved us at a CCMA hearing",
      "Employees actually log in, which surprised me",
    ],
    mid: [
      "Good for leave, thin everywhere else",
      "Solid core, disappointing reporting",
      "Works, but BCEA leave needed configuring",
      "Fine platform, priced above what we use",
      "Adoption took longer than the vendor suggested",
    ],
    low: [
      "Leave accruals were wrong from day one",
      "No real understanding of South African labour law",
      "We went back to spreadsheets after nine months",
      "Support hours never overlap with ours",
    ],
  },
  "cat-crm": {
    high: [
      "The pipeline is finally accurate",
      "Reps update it without being nagged",
      "Forecast is within five percent every month",
      "Set up in a week, adopted in two",
      "Quoting from the CRM removed a whole handoff",
      "Worth every rand once the automation was built",
    ],
    mid: [
      "Capable, but the team resisted it for months",
      "Good CRM, poor reporting for the price",
      "Fine once we stopped trying to use everything",
      "Does the basics well, the extras are upsells",
      "Exchange rate makes budgeting a yearly argument",
    ],
    low: [
      "Nobody used it and we cancelled",
      "The features we bought it for were one tier up",
      "Implementation quote doubled after we signed",
      "Mobile app is unusable in poor signal",
    ],
  },
  "cat-erp": {
    high: [
      "Stock and the ledger finally agree",
      "Go live was on time and under budget",
      "Traceability paid for itself in one audit",
      "Landed cost is finally accurate",
      "One system across four branches",
      "The partner made the difference, not the software",
    ],
    mid: [
      "Powerful, and it demands a specialist",
      "Right system, wrong implementation partner",
      "Works well, costs more than we planned",
      "Two years in and we still use half of it",
      "Good core, dated interface",
    ],
    low: [
      "Implementation ran eleven months over",
      "The localisation was never properly finished",
      "Renewal came in forty percent higher",
      "We are still reconciling stock by hand",
    ],
  },
  "cat-project-management": {
    high: [
      "The whole team adopted it in a fortnight",
      "Client reporting takes minutes now",
      "Time tracking in the same tool changed our billing",
      "Visibility across twelve projects, finally",
      "Simple enough that people actually use it",
    ],
    mid: [
      "Great tool, we built it badly at first",
      "Works, but the seat bands hurt at our size",
      "Fine for tasks, weak for resourcing",
      "Adoption was harder than expected",
      "Good value, occasional performance problems",
    ],
    low: [
      "Boards multiplied until nobody trusted them",
      "Too slow on our connection to be usable",
      "We paid for fifteen seats and used nine",
      "Reporting could not answer basic questions",
    ],
  },
};

export const OPENERS: CategoryBanded = {
  "cat-accounting": {
    high: [
      "We moved across from a desktop package eighteen months ago and I would not go back.",
      "I run the books for three related companies and this is the first system that has kept up.",
      "Our practice put four clients on this before we moved our own business across.",
      "After two years I can say the reconciliation time saving is real and it is significant.",
    ],
    mid: [
      "It does what we need and I have no strong feelings about it either way.",
      "We chose this on price and mostly that decision has held up.",
      "Good enough that changing again is not worth the disruption.",
      "It has been fine, with a couple of persistent irritations.",
    ],
    low: [
      "We committed to this on a recommendation and I regret not testing it properly first.",
      "The trial went well. Live use with real volume did not.",
      "I have spent more time working around this than working in it.",
    ],
  },
  "cat-payroll": {
    high: [
      "We run about ninety staff on this and it has not missed a submission.",
      "I have run payroll on four different systems and this is the one I would choose again.",
      "The tax year end is what convinced me. Nothing broke.",
      "We switched after our previous provider got an ETI calculation wrong.",
    ],
    mid: [
      "Compliance side is solid, the day to day is more of a slog than it should be.",
      "It works. It is not enjoyable, but payroll rarely is.",
      "We use maybe sixty percent of what we pay for.",
    ],
    low: [
      "The compliance errors were the problem, and they took too long to acknowledge.",
      "We had to rebuild two EMP501 submissions by hand.",
      "It was sold as suitable for wage staff. It is not.",
    ],
  },
  "cat-hr": {
    high: [
      "We had leave in a shared spreadsheet for six years. This was overdue.",
      "Managers approve leave from their phones now, which was the whole point.",
      "The employee file being in one place made our last inspection straightforward.",
    ],
    mid: [
      "Solid for the core, but we still keep a spreadsheet for the reporting we actually need.",
      "It has reduced admin, just not as much as the demo suggested.",
      "The configuration took longer than promised, and it works well now.",
    ],
    low: [
      "The leave rules never matched the BCEA properly and we gave up correcting them.",
      "It was clearly built for a different labour market.",
    ],
  },
  "cat-crm": {
    high: [
      "Six reps, eighteen months in, and the pipeline is the most accurate it has ever been.",
      "We moved off a spreadsheet and the difference in forecast quality was immediate.",
      "The automation removed about four hours a week of follow up admin per rep.",
    ],
    mid: [
      "It is capable. Getting the team to use it consistently took much longer than the software took to set up.",
      "Fine product, and the dollar billing makes the budget conversation annoying.",
      "We use about a third of it and pay for all of it.",
    ],
    low: [
      "Adoption failed and that is partly on us and partly on the product.",
      "The tier we needed turned out to cost three times the tier we were quoted.",
    ],
  },
  "cat-erp": {
    high: [
      "Two years post go live and I would make the same decision.",
      "We run four warehouses and two companies on this and the consolidation works.",
      "The implementation partner was excellent, which I think matters more than the badge.",
    ],
    mid: [
      "The software is capable. Our implementation was mediocre and we are still paying for that.",
      "It does everything we asked for and none of it was quick.",
      "Good system, and you must budget for the support relationship indefinitely.",
    ],
    low: [
      "Under scoped implementation, and we discovered it after go live.",
      "The local statutory reporting was never delivered as promised.",
    ],
  },
  "cat-project-management": {
    high: [
      "We rolled it out to twenty two people and adoption was close to complete within a month.",
      "Client status reporting used to take a morning a week. Now it takes ten minutes.",
      "The team asked to keep it after the trial, which has never happened before.",
    ],
    mid: [
      "It works, we just had to redo our structure after four months of getting it wrong.",
      "Good tool. The pricing bands do not suit a team of our size.",
      "Half the team lives in it and half still work from email.",
    ],
    low: [
      "It became a graveyard of half finished boards nobody trusted.",
      "Performance on our office connection made it a chore.",
    ],
  },
};

/** Positive observations, blended with the product's own top features. */
export const PROS: CategoryBanded = {
  "cat-accounting": {
    high: [
      "Bank feeds match transactions accurately and the rules learn quickly",
      "VAT201 figures come out right without a manual working paper",
      "Our accountant has their own login at no extra cost",
      "Invoices go out looking professional with no design work",
      "Multi currency handling is genuinely correct on unrealised gains",
      "Month end close has dropped from six days to two",
      "The audit trail has answered every query our auditors raised",
    ],
    mid: [
      "The core ledger is reliable",
      "Invoicing is quick once the templates are set",
      "Pricing is predictable with no surprise increases",
      "The mobile app is useful for approving payments",
    ],
    low: [
      "It is inexpensive",
      "The invoicing side works",
      "Setup was quick",
    ],
  },
  "cat-payroll": {
    high: [
      "EMP201 and EMP501 submissions have been correct every period",
      "IRP5 files validated in e@syFile without a single rejection",
      "ETI is calculated on the sliding scale and shows its working",
      "BCEA leave accruals are right without configuration",
      "The ACB file imports into our bank without a support call",
      "Employee self service cut payslip queries almost to zero",
      "Support answers in South African hours and understands the question",
    ],
    mid: [
      "Statutory outputs are correct",
      "Payslips are clear and employees understand them",
      "Per employee pricing is fair for a small team",
      "Setup was straightforward",
    ],
    low: [
      "The payslip layout is clean",
      "It is cheaper than the alternatives",
    ],
  },
  "cat-hr": {
    high: [
      "Leave requests and approvals happen on the phone without training",
      "The employee file holds everything in one place with proper permissions",
      "Onboarding checklists removed most of the first week paperwork",
      "Reporting on headcount and turnover is available without asking IT",
      "Document storage with e signature removed a printing step entirely",
    ],
    mid: [
      "Leave management works reliably",
      "The employee record is well organised",
      "Managers found it easy enough to use",
    ],
    low: [
      "The employee database itself is fine",
      "Document storage works",
    ],
  },
  "cat-crm": {
    high: [
      "The pipeline view gives an honest picture of the month",
      "Email sync captures conversations without anyone copying anything",
      "Automation handles the follow up sequence reps used to forget",
      "Quoting from the record removed a handoff to admin",
      "Reporting answers the questions the sales meeting actually asks",
      "The mobile app works well enough for a rep between meetings",
    ],
    mid: [
      "Contact and deal management are solid",
      "Setup was fast",
      "The interface is clear once you learn it",
    ],
    low: [
      "The free tier let us evaluate properly",
      "Contact management works",
    ],
  },
  "cat-erp": {
    high: [
      "Stock on hand matches the physical count for the first time in years",
      "Landed cost calculations are accurate including duty and clearing",
      "Multi warehouse transfers are visible and auditable",
      "Traceability from raw material to finished goods is complete",
      "Branch reporting comes out without a spreadsheet in between",
      "Consolidation across our companies takes days rather than weeks",
    ],
    mid: [
      "The financials module is solid",
      "Reporting is capable once configured",
      "The partner network means help is available",
    ],
    low: [
      "The core accounting works",
      "It is stable once running",
    ],
  },
  "cat-project-management": {
    high: [
      "Everyone can see what is due this week without asking",
      "Automation handles the routine handoffs between teams",
      "Time tracking sits with the tasks, so billing is accurate",
      "Client facing views mean fewer status emails",
      "Templates mean a new project is set up in minutes",
      "The mobile app is good enough for approvals on the road",
    ],
    mid: [
      "Task management is reliable",
      "The views are flexible",
      "Setup was quick",
    ],
    low: [
      "The free tier is generous",
      "It looks good",
    ],
  },
};

export const CONS: CategoryBanded = {
  "cat-accounting": {
    high: [
      "Reporting beyond the standard pack still ends up in a spreadsheet",
      "Inventory is too basic for a stock heavy business",
      "The interface has not aged well",
      "Support response times slow noticeably at month end",
    ],
    mid: [
      "Bank feeds drop and need reauthorising more often than they should",
      "The report customisation is limited",
      "There is no direct submission to eFiling, so the return is captured by hand",
      "Getting a person on the phone is difficult",
      "Inventory cannot handle multiple warehouses",
    ],
    low: [
      "Bank feed failures went unresolved for weeks",
      "Support responses were slow and generic",
      "The VAT handling required constant manual correction",
      "Migration lost historical detail we needed for the audit",
    ],
  },
  "cat-payroll": {
    high: [
      "Reporting outside the statutory pack is thin",
      "There is no real HR functionality, so we run a second system",
      "The interface takes a while for a new administrator",
    ],
    mid: [
      "Wage and shift payroll is weaker than salaried",
      "Support queues get long towards month end",
      "The reporting cannot break cost down by department",
      "No bargaining council support",
    ],
    low: [
      "ETI required manual correction for months",
      "Support could not explain their own statutory outputs",
      "Leave accruals did not follow BCEA rules",
      "The March year end process was poorly documented",
    ],
  },
  "cat-hr": {
    high: [
      "Recruitment is a separate module at a separate price",
      "Reporting is adequate rather than strong",
      "Data is hosted offshore, which our information officer had to sign off",
    ],
    mid: [
      "BCEA leave had to be configured rather than selected",
      "The mobile experience is weaker than the desktop",
      "Performance management is basic",
      "There is no local payroll integration",
    ],
    low: [
      "Leave rules never matched South African requirements",
      "Support hours do not overlap with our working day",
      "The interface is dated and slow",
    ],
  },
  "cat-crm": {
    high: [
      "The features we needed sat one tier above the one we were quoted",
      "Billing in dollars makes the annual budget a moving target",
      "Onboarding a new rep takes longer than it should",
    ],
    mid: [
      "Reporting is limited without moving up a tier",
      "The interface is dense for a new user",
      "There is no local accounting integration without Zapier",
      "Support escalation is slow on technical issues",
    ],
    low: [
      "Adoption never happened and the vendor offered no help with it",
      "The mobile app is unreliable on a weak signal",
      "Costs rose sharply at renewal",
    ],
  },
  "cat-erp": {
    high: [
      "Implementation cost more than the licence, as expected but still painful",
      "The interface is dense and training is a real line item",
      "Configuration changes need the partner rather than an internal administrator",
    ],
    mid: [
      "The local statutory reporting depends entirely on the partner",
      "Version upgrades are projects rather than updates",
      "Remote access needs a hosted desktop",
      "Reporting requires a specialist to build",
    ],
    low: [
      "The implementation ran badly over time and budget",
      "Localisation was incomplete at go live",
      "Renewal pricing increased well beyond inflation",
      "We are still running parallel spreadsheets",
    ],
  },
  "cat-project-management": {
    high: [
      "Without governance the number of boards grows out of control",
      "Seat bands mean paying for people who do not exist",
      "Reporting is weaker than the task management",
    ],
    mid: [
      "Performance degrades on a large workspace",
      "There is no native time tracking",
      "The learning curve for the advanced features is real",
      "Dollar pricing makes the budget unpredictable",
    ],
    low: [
      "It was too slow on our connection",
      "Half the team never adopted it",
      "We paid for a tier we could not make use of",
    ],
  },
};

export const CLOSERS: Record<Band, string[]> = {
  high: [
    "I would recommend it to a business of our size without hesitation.",
    "If you are weighing it up, do the trial with your own data and you will see it.",
    "It is not perfect, and it is the right choice for us.",
    "Two years in and nobody has suggested we look at alternatives.",
    "Worth the migration effort, which is not something I say often.",
  ],
  mid: [
    "It is a reasonable choice, provided you know what it does not do.",
    "I would shortlist it, not necessarily pick it.",
    "Fine for our needs. Test it properly against your own requirements.",
    "Good value, with some real rough edges.",
  ],
  low: [
    "I would look elsewhere unless price is the only consideration.",
    "Test it hard during the trial with real volume before committing.",
    "We moved to an alternative and the difference was immediate.",
    "It may suit a simpler business than ours.",
  ],
};

export const VENDOR_RESPONSES = [
  "Thank you for the detailed feedback. Our product team has logged the reporting limitations you describe and improvements are on the roadmap for this year. Please contact our support team so we can look at your specific configuration.",
  "We appreciate you taking the time to write this up. The support delay you experienced is not the standard we hold ourselves to, and we have followed up internally. Please reach out directly and we will assist.",
  "Thank you for the review. We are glad the compliance side is working well for you. On the reporting point, we would like to show you what is possible with the custom report builder, so please book a session with our team.",
  "We value the honest assessment. The bank feed reliability issue you mention has been addressed in a recent release, and we would encourage you to reconnect the affected accounts.",
  "Thank you for this. We recognise the pricing concern and would like to review your plan with you, as there may be a better fit for your usage. Our team will be in touch.",
  "Thank you for the feedback and for being a customer. We have shared your comments on the mobile experience with our product team, and a redesigned application is currently in beta.",
];

/** Adjectives used to vary the middle of a summary paragraph. */
export const CONNECTORS = [
  "The thing worth knowing is that",
  "What surprised me was that",
  "In practice,",
  "For context,",
  "The honest position is that",
  "Where it earns its keep is that",
];
