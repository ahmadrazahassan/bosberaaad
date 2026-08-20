import type { Category } from "@/lib/types";

/**
 * Six categories, in display order. `software_count` is recomputed by a
 * database trigger in production, and derived from the dataset in dev.
 */
export const CATEGORIES: Category[] = [
  {
    id: "cat-accounting",
    name: "Accounting Software",
    slug: "accounting-software",
    icon: "Calculator",
    description:
      "Ledgers, invoicing, VAT201 returns and bank feeds for South African businesses, from sole traders to mid market groups.",
    intro:
      "<p>Accounting software is the one purchase where the local detail matters most. A package can be excellent in Sydney or Seattle and still cost your bookkeeper a week a month here, because it cannot produce a VAT201 in the shape SARS expects, or because it has no bank feed for Capitec.</p><p>When we assess accounting software for the South African market we test five things in order. Does the VAT treatment cover standard, zero rated and exempt supplies at the current 15% rate. Does the VAT201 output transfer to SARS eFiling without anyone rebuilding figures in a spreadsheet. Which of Absa, FNB, Standard Bank, Nedbank and Capitec have working feeds rather than a CSV import someone has to babysit. Whether an accountant in practice can be given their own login without buying a second licence. And whether the multi currency handling is real, because exporters get hurt badly by weak forex.</p><p>Price is quoted in rand throughout, and we state whether the vendor publishes including or excluding VAT, because they do not agree with each other and the difference is 15%.</p>",
    software_count: 0,
    display_order: 1,
  },
  {
    id: "cat-payroll",
    name: "Payroll Software",
    slug: "payroll-software",
    icon: "Banknote",
    description:
      "EMP201, EMP501, IRP5 and UIF handled properly, with ACB payment files your bank will actually accept.",
    intro:
      "<p>Payroll is where compliance risk concentrates. Get accounting wrong and you restate a figure. Get payroll wrong and you are late on an EMP201, short on a UIF declaration, or handing employees IRP5 certificates that will not validate in e@syFile.</p><p>Every payroll product on this list is judged against the same checklist. Monthly EMP201 declarations and the biannual EMP501 reconciliation. IRP5 and IT3(a) certificate generation with a clean e@syFile export. UIF declarations to the Department of Employment and Labour. SDL where the payroll crosses the threshold, and ETI calculated correctly for qualifying employees, including the sliding scale. BCEA leave accruals, which is where imported systems quietly fail because they model annual leave the American way. And an ACB payment file in the format your bank imports without a support call.</p><p>We also check what happens in March. A payroll system is only as good as its tax year end, and that is the month it either saves you or costs you a weekend.</p>",
    software_count: 0,
    display_order: 2,
  },
  {
    id: "cat-hr",
    name: "HR Software",
    slug: "hr-software",
    icon: "Users",
    description:
      "Employee records, leave, performance and onboarding, measured against BCEA leave rules and POPIA data handling.",
    intro:
      "<p>HR software in South Africa carries two obligations that international vendors often treat as configuration. The first is BCEA leave. Annual leave accrues at one day for every seventeen days worked, sick leave runs on a three year cycle, and family responsibility leave is its own entitlement. A system that only offers a flat annual allowance will need a workaround from day one.</p><p>The second is POPIA. An HR system holds identity numbers, medical aid details, disciplinary records and next of kin. That is special personal information in the terms of the Act. We look at where data is hosted, what the vendor commits to in its operator agreement, whether access can be restricted per record rather than per module, and whether an employee can be given a copy of their own file without an administrator exporting the whole database.</p><p>Beyond compliance, the useful question is whether the system reduces admin or simply moves it. We say so plainly in each review.</p>",
    software_count: 0,
    display_order: 3,
  },
  {
    id: "cat-crm",
    name: "CRM Software",
    slug: "crm-software",
    icon: "Contact",
    description:
      "Pipeline, quoting and customer records, assessed on rand pricing, local support hours and POPIA consent handling.",
    intro:
      "<p>CRM is the category where the sticker price and the real price diverge the most. Vendors quote per user per month in dollars, bill annually, and the number that lands on your card depends on the rand on the day. A team of eight can budget one figure in January and pay eleven percent more in June without changing anything.</p><p>So the first thing we do is convert everything to rand at a stated rate, note whether the vendor bills in rand natively, and say what the annual commitment actually costs. The second is support hours. A vendor whose support desk opens at 09:00 Pacific is answering at 18:00 or 19:00 South African time, which matters when a sales team cannot log a deal.</p><p>Then the ordinary work: pipeline modelling, quoting, email integration, whether the mobile app is usable by a rep in a car, and how the system handles marketing consent now that POPIA makes opt in a legal question rather than a courtesy.</p>",
    software_count: 0,
    display_order: 4,
  },
  {
    id: "cat-erp",
    name: "ERP Software",
    slug: "erp-software",
    icon: "Boxes",
    description:
      "Integrated finance, stock, manufacturing and distribution for businesses that have outgrown standalone accounting.",
    intro:
      "<p>Nobody buys an ERP because they want one. They buy it because stock, production and the general ledger have stopped agreeing with each other, and the spreadsheet holding it together has become a person's full time job.</p><p>The honest thing to say about this category is that implementation cost usually exceeds licence cost, often by a factor of two or three, and the implementation partner matters more than the badge on the software. A well implemented mid tier system beats a badly implemented tier one system every time. We name the local partner ecosystem in each review because in South Africa that is the deciding factor.</p><p>We assess local statutory reporting, multi warehouse and multi company handling, manufacturing depth where relevant, and whether the product has a genuine South African install base or is being sold here for the first time. Load shedding gets a mention too, because for a manufacturer a system that survives an unplanned power cut without corrupting a production run is worth real money.</p>",
    software_count: 0,
    display_order: 5,
  },
  {
    id: "cat-project-management",
    name: "Project Management",
    slug: "project-management",
    icon: "KanbanSquare",
    description:
      "Task tracking, resource planning and client delivery tools, priced in rand and judged on how teams actually use them.",
    intro:
      "<p>Project management software is the easiest category to buy and the hardest to keep. Adoption is the whole game. A tool that half the team ignores is worse than a shared spreadsheet, because now the truth is in two places.</p><p>Our reviews weight ease of use heavily here, and we are specific about the shape of team each product suits. Some are built for agencies billing time to clients. Some are built for software teams working in sprints. Some are general enough to run a marketing calendar and a construction schedule in the same account, which sounds like a strength and often is not.</p><p>Pricing gets close attention because per user per month adds up fast, free tiers vary wildly in how usable they are, and a few vendors charge in bands that punish a team of eleven. We show the rand cost for teams of five, ten and twenty-five so the comparison is real.</p>",
    software_count: 0,
    display_order: 6,
  },
];

export const CATEGORY_BY_ID = new Map(CATEGORIES.map((c) => [c.id, c]));
export const CATEGORY_BY_SLUG = new Map(CATEGORIES.map((c) => [c.slug, c]));
