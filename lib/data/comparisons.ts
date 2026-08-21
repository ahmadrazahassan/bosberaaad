import type { Comparison } from "@/lib/types";

type ComparisonSeed = {
  a: string;
  b: string;
  verdict: string;
  meta_description: string;
};

const SEED: ComparisonSeed[] = [
  {
    a: "sage-accounting",
    b: "xero",
    meta_description:
      "Sage Accounting against Xero for South African businesses: VAT201 transfer, bank feed coverage, user limits and what each one really costs in rand.",
    verdict:
      "<p>These two are close enough that the deciding factor is rarely the software. Sage Accounting transfers VAT201 figures straight into SARS eFiling and has the broadest bank feed coverage in the market, including Capitec. Xero has the better daily experience by a clear margin, unlimited users on every plan, and stronger multi currency handling.</p><p>Our recommendation splits on two questions. If you file more than a handful of VAT returns, or your accountant is a Sage practice, take Sage. If your finance team lives in the system every day, you invoice in more than one currency, or you want several people in the file without paying per seat, take Xero and accept fifteen minutes of manual capture every two months.</p><p>On price, Sage Standard at R495 excluding VAT against Xero Grow at R560 excluding VAT is close enough to ignore. Xero's unlimited users usually make it cheaper in practice for a team of four or more.</p>",
  },
  {
    a: "simplepay",
    b: "sage-payroll",
    meta_description:
      "SimplePay against Sage Payroll: statutory coverage, ETI handling, support responsiveness and per employee cost.",
    verdict:
      "<p>Both handle the full South African statutory set correctly. EMP201, EMP501, IRP5 and IT3(a), e@syFile, UIF, SDL, ETI and BCEA leave are all present and reliable in each. There is no compliance argument between them.</p><p>The difference is everyday clarity and support. Our review corpus is consistent that SimplePay's interface is easier for a non specialist, that the ETI screens in particular are clearer, and that support responds faster because it is a small team on a single product rather than a large organisation covering many.</p><p>Sage wins on one thing: if you already run Sage Accounting, the payroll journal posts straight through with no export step, on one invoice, from one support desk. For a business with a complex departmental allocation that integration is worth real money. For a business posting one journal a month it saves fifteen minutes.</p><p>We recommend SimplePay for most employers. Trial both with your own payroll and let your administrator decide.</p>",
  },
  {
    a: "zoho-crm",
    b: "hubspot",
    meta_description:
      "Zoho CRM against HubSpot for South African sales teams: rand billing against dollar billing, free tiers, and what each costs at fifteen users.",
    verdict:
      "<p>HubSpot has the better free tier and the better adoption record. Zoho has the better economics for a South African business, and it is not close.</p><p>Zoho bills natively in rand, which removes exchange rate exposure entirely. HubSpot bills in US dollars, has a minimum seat count on Sales Hub Professional and adds a first year onboarding fee. At fifteen users the annual difference runs well into six figures in rand, and the capability gap does not justify it.</p><p>Where HubSpot earns its price is when marketing and sales genuinely need one database, and when you value a team that will use the system without being pushed. Both are real advantages.</p><p>Our recommendation: start on HubSpot Free if you are moving off a spreadsheet, and be honest with yourself about the Professional cost before you build your process on it. If you already know you will need automation, custom reporting and required fields, price Zoho CRM Professional first.</p>",
  },
  {
    a: "sage-200-evolution",
    b: "odoo",
    meta_description:
      "Sage 200 Evolution against Odoo for South African manufacturers and distributors: licence cost, local compliance and partner availability.",
    verdict:
      "<p>This comparison is about where you want the cost to sit. Evolution puts it in licence and partner fees, and gives you vendor maintained local compliance and a partner in every industrial centre. Odoo puts it in expertise, and gives you a much lower licence cost with more responsibility on you.</p><p>Evolution is the safer choice for a business that wants to buy a system and get on with trading. Local statutory reporting is maintained by Sage, the partner base is the largest in the country, and you are not dependent on one relationship.</p><p>Odoo is the better choice for a business with technical capacity, particularly manufacturers, because the manufacturing depth is genuinely strong for the price and the module coverage is broader. The risks are real: version upgrades are projects, heavy customisation can freeze you on an old version, and South African VAT201 comes from a partner maintained localisation rather than from the vendor.</p><p>If you do not have someone in the business who will own the system, buy Evolution.</p>",
  },
  {
    a: "asana",
    b: "monday-com",
    meta_description:
      "Asana against monday.com: seat bands against linear pricing, ownership models, and which teams each one actually suits.",
    verdict:
      "<p>monday.com is easier to adopt and Asana is easier to trust. That is the whole comparison.</p><p>A non technical manager builds a working process in monday.com in an afternoon, and teams pick it up without training. The cost of that flexibility is governance: six months of unrestricted board creation produces a mess, and cleaning it up is a project.</p><p>Asana is opinionated. One owner per task, projects rolling into portfolios rolling into goals. Organisations that adopt the opinion get real clarity, and the portfolio view gives a director an honest picture of what is in flight without a status meeting.</p><p>Pricing is the practical tiebreaker. monday.com sells in fixed seat bands, so a team of eleven pays for fifteen. Asana charges per seat linearly. If your headcount sits just above a band boundary, Asana is meaningfully cheaper for the same team.</p><p>Neither has native time tracking. Agencies billing hours should look at ClickUp instead.</p>",
  },
  {
    a: "xero",
    b: "quickbooks-online",
    meta_description:
      "Xero against QuickBooks Online in South Africa: bank feed reliability, user limits, reporting depth and rand pricing.",
    verdict:
      "<p>Xero wins this on two structural advantages. Unlimited users on every plan, where QuickBooks counts your accountant against the plan limit on lower tiers. And a materially better bank reconciliation experience, which is where a bookkeeper spends most of their time.</p><p>QuickBooks has the better reporting and budgeting for the price, and the best mobile receipt capture in the category. If your requirement is management reporting rather than efficient processing, that matters.</p><p>The deciding factor for most South African buyers is bank feed reliability. QuickBooks draws the most complaints in our review set about connections dropping and needing reauthorisation, and Capitec support has historically been its weakest point. Test your actual accounts during the trial and leave them connected for two weeks before you decide.</p><p>Neither transfers VAT201 figures to eFiling. Both require manual capture.</p>",
  },
  {
    a: "simplepay",
    b: "payspace",
    meta_description:
      "SimplePay against PaySpace: where per employee simplicity stops being enough and enterprise payroll starts being worth the implementation.",
    verdict:
      "<p>These serve different businesses and the crossover point is roughly two hundred employees, or the moment you employ people in a second African country.</p><p>Below that, SimplePay is the clear recommendation. Per employee pricing with no minimum, complete South African statutory coverage, a local support desk and nothing to implement. A fifty person employer gets everything they need without a project.</p><p>PaySpace earns its cost through breadth. Statutory rules maintained across more than forty African countries, payroll and HR sharing one employee record, bargaining council submissions, COIDA returns and an audit trail built for organisations that get audited. For a group running four country payrolls and consolidating by hand, that removes real risk.</p><p>The cost is an implementation project measured in weeks, a platform fee on top of per employee pricing, and an interface that assumes you know payroll. Below a few hundred staff that is difficult to justify.</p>",
  },
  {
    a: "sage-hr",
    b: "bamboohr",
    meta_description:
      "Sage HR against BambooHR for South African employers: BCEA leave handling, rand pricing against dollar pricing, and onboarding quality.",
    verdict:
      "<p>BambooHR is the better product. Sage HR is the better purchase for most South African employers, and the reason is leave.</p><p>Sage HR models BCEA leave correctly out of the box: annual leave accruing at the statutory rate, sick leave on the three year cycle, family responsibility leave as its own entitlement. BambooHR can be configured to do all of that and does not ship that way, so someone who understands the Act has to build it and then test it. That is an afternoon with a consultant, or a persistent low grade problem without one.</p><p>Sage HR is also billed in rand and priced per module, so a business that only needs leave management pays for leave management.</p><p>BambooHR wins on onboarding workflows, reporting and the everyday employee experience, and it has a minimum monthly charge that makes it expensive below about twenty five employees. Above fifty staff, hiring at pace, with HR experience as a stated priority, it is worth the difference.</p>",
  },
  {
    a: "pipedrive",
    b: "zoho-crm",
    meta_description:
      "Pipedrive against Zoho CRM: adoption against capability, and which one a fifteen person sales team should actually buy.",
    verdict:
      "<p>Pipedrive has the highest sustained adoption rate of any CRM we track. Zoho has more capability per rand than anything else in the category. Choose based on which problem you actually have.</p><p>If your problem is that nobody updates the CRM, buy Pipedrive. Activity based selling keeps the pipeline current because updating it is how a rep does their job rather than a separate admin task, and a new rep is productive in a morning.</p><p>If your problem is that you need quoting, approval chains, territory management or genuine workflow automation, buy Zoho. Pipedrive has no custom objects, thin marketing automation and no service module, and bolting those on will cost more than the difference.</p><p>Zoho also bills in rand where Pipedrive bills in dollars, which removes exchange rate exposure. For a fifteen user team on an annual commitment that is a real number.</p>",
  },
  {
    a: "sage-50cloud-pastel",
    b: "sage-accounting",
    meta_description:
      "Sage 50cloud Pastel against Sage Accounting: desktop depth and offline capability against cloud convenience.",
    verdict:
      "<p>Same vendor, genuinely different products, and the choice is not about old against new.</p><p>Pastel is deeper. Multi warehouse inventory, serial and lot tracking, bill of materials, landed costs, a report writer that will produce almost anything. It runs locally, so month end survives a power cut or a dead fibre node, which for a manufacturer in an industrial area is an operational argument rather than nostalgia.</p><p>Sage Accounting is easier, cheaper to run, accessible from anywhere and has no network to maintain. Its inventory is adequate for a small retailer and not good enough for a distributor.</p><p>Buy Pastel if you have real inventory complexity or unreliable connectivity, and accept the training cost and the hosted desktop for remote access. Buy Sage Accounting for anything else. Note that Sage is investing in the cloud products, so Pastel is a mature choice rather than a growing one.</p>",
  },
  {
    a: "clickup",
    b: "asana",
    meta_description:
      "ClickUp against Asana: native time tracking and breadth against a disciplined task model and better performance.",
    verdict:
      "<p>For an agency billing hours, ClickUp wins on one feature: native time tracking, in the same product as the tasks, from the free tier. That removes an integration and a reconciliation and makes invoicing accurate. Asana has no native time tracking, so you are budgeting for Harvest or Everhour alongside it.</p><p>For everyone else, Asana is the better tool. The one owner per task rule removes the most common cause of dropped work, portfolios give directors a truthful in flight picture, and the product is faster and more consistent.</p><p>ClickUp's breadth is its risk. There are many ways to do the same thing, and a team without a configuration decision will build something inconsistent that takes a project to fix. Performance on large workspaces draws consistent complaints, and that is felt more acutely on a marginal South African connection.</p><p>Test ClickUp on your actual office connection with realistic data volume before committing a large team.</p>",
  },
  {
    a: "salesforce",
    b: "zoho-crm",
    meta_description:
      "Salesforce against Zoho CRM: total cost of ownership in rand, configurability and when the enterprise platform is genuinely necessary.",
    verdict:
      "<p>Salesforce will model any sales process you can describe. The question is whether you need that, because the total cost gap is enormous.</p><p>Zoho CRM Enterprise gives you territory management, custom modules, a scripting layer and full workflow automation, billed in rand, at a fraction of Salesforce Enterprise licensing. For a South African business under about fifty users, Zoho does what you actually need.</p><p>Salesforce becomes the right answer at genuine complexity: multiple business units, formal territory and quota structures, a sales process that spans several systems, or an existing group standard. It also has the deepest local partner community and the largest application ecosystem in business software.</p><p>The number buyers most often miss is implementation. Budget two to three times the year one licence cost, and plan for an administrator, either a person or a retained partner. Businesses that budget the licence alone are the ones we see struggling two years later.</p>",
  },
  {
    a: "sap-business-one",
    b: "sage-200-evolution",
    meta_description:
      "SAP Business One against Sage 200 Evolution for South African mid market businesses: localisation, partner depth and total cost.",
    verdict:
      "<p>The decisive difference is where South African statutory reporting comes from. Sage maintains Evolution's VAT201, IT14SD schedules and annual compliance updates itself. SAP Business One's local reporting comes from partner maintained localisation packages, and quality varies between partners.</p><p>That makes the partner selection question much sharper for SAP. Ask them to demonstrate a VAT201 produced from live data, not from a slide. If they cannot, that is your answer.</p><p>SAP wins where a group standard applies, where global support across several countries matters, and where financial controls need to satisfy an international group finance function without argument. The data model is more rigorous and it resists bad practice in a way Evolution does not.</p><p>Evolution wins on local partner depth, which in this category is worth more than a feature comparison, and on total cost. For a South African business with no international parent, we would generally start with Evolution.</p>",
  },
  {
    a: "zoho-books",
    b: "sage-accounting",
    meta_description:
      "Zoho Books against Sage Accounting: capability per rand against local compliance depth and accountant familiarity.",
    verdict:
      "<p>Zoho Books gives you more for less. A client portal, workflow automation, project billing, full inventory at the Professional tier and a free plan that is genuinely usable, at prices below Sage at every level.</p><p>Sage gives you two things Zoho does not. VAT201 figures that transfer straight into SARS eFiling, and an accountant who almost certainly already knows the system.</p><p>That second point is the one buyers underweight. A cheaper system your accountant charges more to work in is not cheaper. Ask them before you migrate, and get a number rather than an opinion.</p><p>Our recommendation: if you have an in house bookkeeper and an accountant who is comfortable outside Sage, Zoho Books Standard at R380 excluding VAT is the better value by a clear margin. If your accountant does your bookkeeping, take Sage.</p>",
  },
  {
    a: "trello",
    b: "asana",
    meta_description:
      "Trello against Asana: when simplicity is the right answer and when a team has outgrown a kanban board.",
    verdict:
      "<p>Trello is the simplest thing that could possibly work and for a lot of teams that is enough. Learnable in two minutes, a free tier that small teams genuinely stay on for years, and the lowest paid tier price in the category.</p><p>You have outgrown it when three things become true: work has dependencies that matter, more than one team needs a shared view, and somebody senior is asking questions the board cannot answer. At that point Asana is the natural step, and the migration is straightforward because the underlying model is compatible.</p><p>The mistake to avoid is bolting five Power-Ups onto Trello to make it behave like Asana. That produces something more fragile and frequently more expensive than just buying Asana.</p><p>If your projects have fewer than fifty active items and no cross team dependencies, stay on Trello and spend the money elsewhere.</p>",
  },
];

export const COMPARISONS: Comparison[] = SEED.map((seed) => ({
  id: `cmp-${seed.a}-vs-${seed.b}`,
  software_a_id: `sw-${seed.a}`,
  software_b_id: `sw-${seed.b}`,
  custom_verdict: seed.verdict,
  meta_title: null,
  meta_description: seed.meta_description,
  status: "published",
}));

/** Canonical pair slug, always in the order the comparison was authored. */
export function comparisonSlug(comparison: Comparison): string {
  return `${comparison.software_a_id.replace("sw-", "")}-vs-${comparison.software_b_id.replace("sw-", "")}`;
}
