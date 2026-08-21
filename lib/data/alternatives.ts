import type { SoftwareAlternative } from "@/lib/types";

/**
 * Curated alternative sets. These are editorial judgements about what a buyer
 * should look at instead, not category peers picked automatically. Each entry
 * carries the reason, which is shown on the alternatives page.
 */

type AlternativeSeed = Record<string, { slug: string; reason: string }[]>;

const SEED: AlternativeSeed = {
  "sage-accounting": [
    { slug: "xero", reason: "Better daily experience and unlimited users, at the cost of manual eFiling capture." },
    { slug: "zoho-books", reason: "More capability for less money, if your accountant is comfortable outside Sage." },
    { slug: "quickbooks-online", reason: "Stronger reporting at a similar price, with weaker bank feed reliability." },
    { slug: "sage-50cloud-pastel", reason: "The step up when inventory outgrows a small business ledger." },
  ],
  xero: [
    { slug: "sage-accounting", reason: "The only meaningful advantage is VAT201 transfer straight into eFiling." },
    { slug: "zoho-books", reason: "Roughly two thirds of the price for comparable capability, plus a client portal." },
    { slug: "quickbooks-online", reason: "Similar tier pricing with better budgeting and a stronger receipt capture app." },
    { slug: "freshbooks", reason: "Better for a consultant billing hours, provided you are not VAT registered." },
  ],
  "quickbooks-online": [
    { slug: "xero", reason: "Better reconciliation experience and no user limit on any plan." },
    { slug: "sage-accounting", reason: "Broader bank feed coverage, including Capitec, and eFiling transfer." },
    { slug: "zoho-books", reason: "Cheaper, with inventory and a client portal included at the middle tier." },
  ],
  "zoho-books": [
    { slug: "sage-accounting", reason: "Choose this if your accountant works in Sage and charges by the hour." },
    { slug: "xero", reason: "Better designed and better supported by local practices, for more money." },
    { slug: "odoo", reason: "The natural next step when accounting, stock and manufacturing need one system." },
  ],
  "sage-50cloud-pastel": [
    { slug: "sage-200-evolution", reason: "The upgrade path when multi branch or manufacturing outgrows Pastel." },
    { slug: "sage-accounting", reason: "The cloud alternative from the same vendor, with a shallower inventory model." },
    { slug: "odoo", reason: "Comparable depth at a lower licence cost, if you can support it internally." },
  ],
  "sage-intacct": [
    { slug: "netsuite", reason: "The closest competitor on multi entity consolidation, with harder renewals." },
    { slug: "sage-200-evolution", reason: "Considerably cheaper if your consolidation requirement is modest." },
    { slug: "acumatica", reason: "Cloud native with unlimited users, if occasional users outnumber finance staff." },
  ],
  freshbooks: [
    { slug: "zoho-books", reason: "A real South African VAT ledger for about the same money, billed in rand." },
    { slug: "wave-accounting", reason: "Free, if invoicing and a basic ledger is genuinely all you need." },
    { slug: "xero", reason: "The right move the moment you register for VAT." },
  ],
  "wave-accounting": [
    { slug: "zoho-books", reason: "The free plan is more capable and there is somewhere to grow to." },
    { slug: "sage-accounting", reason: "The upgrade the moment you register for VAT." },
    { slug: "freshbooks", reason: "Better if you bill by the hour and want to be paid faster." },
  ],

  simplepay: [
    { slug: "sage-payroll", reason: "The closest competitor. Trial both, and pick the one your administrator finds clearer." },
    { slug: "payroll-online", reason: "Cheaper for a straightforward salaried payroll under fifty staff." },
    { slug: "paysoft", reason: "The better answer if you have significant hourly or bargaining council staff." },
    { slug: "payspace", reason: "The step up at a few hundred employees or across more than one country." },
  ],
  payspace: [
    { slug: "simplepay", reason: "Far cheaper and simpler if you are a single country employer under a few hundred staff." },
    { slug: "sage-pastel-payroll", reason: "Comparable statutory depth for a South Africa only employer." },
    { slug: "paysoft", reason: "Stronger on wage and shift payroll in industrial environments." },
  ],
  "sage-pastel-payroll": [
    { slug: "sage-payroll", reason: "The same compliance engine without the local installation or the bands." },
    { slug: "simplepay", reason: "Usually cheaper at the same headcount, and easier for a non specialist." },
    { slug: "paysoft", reason: "Better for weekly wages and bargaining council agreements." },
  ],
  "sage-payroll": [
    { slug: "simplepay", reason: "Clearer interface and faster support at a comparable per employee price." },
    { slug: "sage-pastel-payroll", reason: "Choose this instead if connectivity at month end is genuinely unreliable." },
    { slug: "payspace", reason: "The move when headcount or multi country complexity grows." },
  ],
  paysoft: [
    { slug: "payspace", reason: "The enterprise answer for large wage payrolls across multiple entities." },
    { slug: "sage-pastel-payroll", reason: "Comparable bargaining council support with a larger operator pool." },
    { slug: "simplepay", reason: "Simpler and cheaper if your payroll is mostly salaried after all." },
  ],
  "payroll-online": [
    { slug: "simplepay", reason: "A little more per employee for materially better support and reporting." },
    { slug: "sage-payroll", reason: "Backed by a vendor that will still be here in fifteen years." },
  ],

  "sage-hr": [
    { slug: "bamboohr", reason: "Better onboarding and reporting, billed in dollars with leave to configure." },
    { slug: "peoplehr", reason: "Stronger applicant tracking at a similar price point." },
    { slug: "hr-companion", reason: "Choose this instead if employment equity reporting is the actual requirement." },
  ],
  bamboohr: [
    { slug: "sage-hr", reason: "BCEA leave without configuration, in rand, at a lower total cost." },
    { slug: "personio", reason: "Stronger multi entity handling and data protection controls." },
    { slug: "peoplehr", reason: "Similar capability for less money, with no local partner presence either way." },
  ],
  labournet: [
    { slug: "hr-companion", reason: "Local statutory reporting without the advisory retainer." },
    { slug: "sage-hr", reason: "A far better HR product, if you do not need the industrial relations support." },
  ],
  peoplehr: [
    { slug: "sage-hr", reason: "Rand pricing and correct BCEA leave out of the box." },
    { slug: "bamboohr", reason: "Better reporting and onboarding for more money." },
  ],
  personio: [
    { slug: "bamboohr", reason: "Better everyday experience if multi entity handling is not the driver." },
    { slug: "sage-hr", reason: "Much cheaper, with local leave rules and a local support relationship." },
  ],
  "hr-companion": [
    { slug: "labournet", reason: "Adds industrial relations advisory to the same statutory reporting." },
    { slug: "sage-hr", reason: "A better product for everything except employment equity reporting." },
  ],

  "zoho-crm": [
    { slug: "pipedrive", reason: "Simpler, with far higher sustained adoption in small sales teams." },
    { slug: "hubspot", reason: "Start free and pay later, if you can absorb the step to Professional." },
    { slug: "freshsales", reason: "Built in telephony and a gentler interface for a similar price." },
    { slug: "salesforce", reason: "The move when territories, quotas and multiple business units are real." },
  ],
  hubspot: [
    { slug: "zoho-crm", reason: "Billed in rand, with comparable capability well below HubSpot Professional." },
    { slug: "pipedrive", reason: "Cheaper and simpler if you only need sales rather than marketing too." },
    { slug: "freshsales", reason: "A free tier with more sales capability and telephony included." },
  ],
  salesforce: [
    { slug: "zoho-crm", reason: "Most of the capability at a fraction of the licence and implementation cost." },
    { slug: "hubspot", reason: "Better adoption and a much lower barrier to getting started." },
    { slug: "sage-crm", reason: "Choose this instead if live Sage back office data is the real requirement." },
  ],
  pipedrive: [
    { slug: "zoho-crm", reason: "More capability and rand billing, at the cost of a denser interface." },
    { slug: "freshsales", reason: "Similar clarity with telephony and scoring included." },
    { slug: "hubspot", reason: "Better if marketing and sales genuinely need one database." },
  ],
  freshsales: [
    { slug: "zoho-crm", reason: "Deeper automation and reporting, billed in rand." },
    { slug: "pipedrive", reason: "Cleaner pipeline model with the strongest adoption record we track." },
  ],
  "sage-crm": [
    { slug: "zoho-crm", reason: "A far better CRM if the Sage back office link is not the deciding factor." },
    { slug: "pipedrive", reason: "Much easier to adopt, with no back office integration." },
  ],

  "sage-200-evolution": [
    { slug: "odoo", reason: "Comparable capability at a much lower licence cost, if you can support it." },
    { slug: "syspro", reason: "Deeper manufacturing and traceability for regulated supply chains." },
    { slug: "sap-business-one", reason: "Choose this where a group standard or global support matters." },
    { slug: "acumatica", reason: "Cloud native with unlimited users, at the cost of a thin local partner base." },
  ],
  odoo: [
    { slug: "sage-200-evolution", reason: "Buy this instead if you want vendor maintained local compliance and many partners." },
    { slug: "acumatica", reason: "Cloud native with a comparable customisation story and vendor support." },
    { slug: "zoho-books", reason: "Step back to this if you do not actually need manufacturing or stock depth." },
  ],
  syspro: [
    { slug: "sage-x3", reason: "The alternative for process manufacturing with formulas rather than assemblies." },
    { slug: "sage-200-evolution", reason: "Cheaper and lighter where manufacturing depth is not the requirement." },
    { slug: "sap-business-one", reason: "Comparable scale with a larger global partner network." },
  ],
  "sap-business-one": [
    { slug: "sage-200-evolution", reason: "Local statutory reporting from the vendor rather than from the partner." },
    { slug: "netsuite", reason: "Stronger multi subsidiary consolidation if you operate across borders." },
    { slug: "acumatica", reason: "Unlimited users, which changes the maths where many staff need light access." },
  ],
  acumatica: [
    { slug: "netsuite", reason: "More mature, with a larger partner base, at a higher total cost." },
    { slug: "sage-200-evolution", reason: "A much larger South African partner base, which is the real risk here." },
    { slug: "odoo", reason: "Similar flexibility at a lower cost, with more responsibility on you." },
  ],
  netsuite: [
    { slug: "sage-intacct", reason: "The closest competitor on consolidation, with more predictable renewals." },
    { slug: "acumatica", reason: "Unlimited users and a simpler commercial model." },
    { slug: "sap-business-one", reason: "Better where group finance wants a name it already knows." },
  ],
  "sage-x3": [
    { slug: "syspro", reason: "The other serious manufacturing option, stronger on discrete and traceability." },
    { slug: "sage-200-evolution", reason: "Step down to this if multi site and process manufacturing are not required." },
    { slug: "sap-business-one", reason: "Comparable scale with a broader partner ecosystem." },
  ],

  "monday-com": [
    { slug: "asana", reason: "Clearer ownership model and linear per seat pricing rather than bands." },
    { slug: "clickup", reason: "More capability for less money, including native time tracking." },
    { slug: "trello", reason: "Step down to this if the work is genuinely simple." },
    { slug: "smartsheet", reason: "The right answer when scheduling and dependencies are the real problem." },
  ],
  asana: [
    { slug: "monday-com", reason: "More visual and easier for non technical managers to build in." },
    { slug: "clickup", reason: "Native time tracking, which Asana does not have." },
    { slug: "wrike", reason: "Better where creative work goes through formal review cycles." },
  ],
  trello: [
    { slug: "asana", reason: "The step up when dependencies and reporting start to matter." },
    { slug: "clickup", reason: "Far more capability at a comparable price." },
    { slug: "monday-com", reason: "Better for repeatable processes across several teams." },
  ],
  clickup: [
    { slug: "asana", reason: "Simpler and faster, if the extra capability is not being used." },
    { slug: "monday-com", reason: "Easier for a non technical team to configure and adopt." },
    { slug: "wrike", reason: "Better proofing and approvals for creative teams." },
  ],
  smartsheet: [
    { slug: "asana", reason: "Better everyday experience where scheduling complexity is modest." },
    { slug: "monday-com", reason: "Far more approachable for teams outside a project office." },
    { slug: "wrike", reason: "Comparable capability with better creative review tooling." },
  ],
  wrike: [
    { slug: "asana", reason: "Cleaner and easier to adopt, without the proofing tools." },
    { slug: "clickup", reason: "Cheaper, with native time tracking and a similar breadth." },
    { slug: "monday-com", reason: "More visual, and easier for a marketing team to run unaided." },
  ],
};

export const SOFTWARE_ALTERNATIVES: (SoftwareAlternative & { reason: string })[] = Object.entries(
  SEED,
).flatMap(([slug, alternatives]) =>
  alternatives.map((alternative, index) => ({
    software_id: `sw-${slug}`,
    alternative_id: `sw-${alternative.slug}`,
    display_order: index + 1,
    reason: alternative.reason,
  })),
);

export function alternativesFor(softwareId: string) {
  return SOFTWARE_ALTERNATIVES.filter((entry) => entry.software_id === softwareId).sort(
    (a, b) => a.display_order - b.display_order,
  );
}
