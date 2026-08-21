import { defineSoftware } from "./define";

const CATEGORY = "cat-hr";

export const HR_SOFTWARE = [
  defineSoftware({
    name: "Sage HR",
    slug: "sage-hr",
    category_id: CATEGORY,
    tagline: "Modular HR that starts with leave and grows from there",
    description_short:
      "Sage HR is a modular cloud HR system with genuinely BCEA aware leave, sold module by module so you only pay for what you switch on.",
    description_full: `
      <p>Sage HR started life as CakeHR and the acquisition did it good. It is the most approachable HR system in this list, and the modular pricing means a fifty person business can start with leave management for a sensible monthly figure and add performance or recruitment later without renegotiating anything.</p>
      <p>Leave is the module most businesses buy first and it is the one that matters locally. BCEA rules are properly modelled: annual leave accruing at the statutory rate, sick leave on the three year cycle, family responsibility leave as its own entitlement, and public holidays that fall on a Sunday handled the way the Act requires. Systems built for the United States get this wrong and require a spreadsheet alongside them.</p>
      <h2>The modules</h2>
      <p>Core HR holds the employee record and org chart. Leave management handles requests, approvals and balances. Performance runs reviews, goals and one to ones. Shift scheduling covers rostering for hourly teams. Recruitment handles vacancies through to offer. Expenses and timesheets are separate again. Each is priced per employee per month.</p>
      <p>The upside is control over cost. The downside is that the all in price for a business that wants everything is no longer cheap, and it is worth pricing the full stack before you commit to the entry module.</p>
      <h2>POPIA</h2>
      <p>Data is hosted outside South Africa, which is permitted under POPIA where the receiving jurisdiction has adequate protection or the operator agreement carries the right commitments. Sage's operator agreement does. Your information officer should still read it rather than assume, because HR data includes special personal information.</p>
      <h2>Who should buy it</h2>
      <p>Businesses between twenty and three hundred employees who want to get leave off email and out of spreadsheets, and who value being able to add capability gradually. It pairs naturally with Sage payroll but does not require it.</p>
    `,
    starting_price: 28,
    price_vat_inclusive: false,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Priced per employee per month, per module. Sage does not state a VAT basis on the Sage HR pricing page, unlike its accounting and payroll pages, so confirm it before budgeting. Recruitment is the exception to the per employee model and is charged at a flat R1 850 a month. Price the full module set you expect to need before comparing against bundled competitors.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Core HR and Leave Management",
        price: 28,
        period: "month",
        vat_inclusive: false,
        description: "Employee records, org chart and BCEA compliant leave management.",
        user_limit: "Per employee",
        popular: true,
        features: [
          "Employee database",
          "Org chart",
          "BCEA compliant leave accrual",
          "Leave requests and approvals",
          "Company calendar",
          "Document storage",
        ],
      },
      {
        name: "Performance",
        price: 14,
        period: "month",
        vat_inclusive: false,
        description: "Added per employee on top of Core HR.",
        user_limit: "Per employee",
        features: [
          "Goal setting and tracking",
          "Review cycles",
          "360 degree feedback",
          "One to one meeting notes",
        ],
      },
      {
        name: "Shift scheduling",
        price: 14,
        period: "month",
        vat_inclusive: false,
        description: "Added per employee, for hourly and rostered teams.",
        user_limit: "Per employee",
        features: [
          "Shift rostering",
          "Availability capture",
          "Clock in and clock out",
          "Timesheet approval",
        ],
      },
      {
        name: "Timesheets",
        price: 14,
        period: "month",
        vat_inclusive: false,
        description: "Track hours against projects and clients.",
        user_limit: "Per employee",
        features: ["Time capture", "Project and client allocation", "Approval workflow"],
      },
      {
        name: "Expenses",
        price: 10,
        period: "month",
        vat_inclusive: false,
        description: "Mobile expense capture and reimbursement approval.",
        user_limit: "Per employee",
        features: ["Photograph a receipt", "Approval workflow", "Reimbursement tracking"],
      },
      {
        name: "Recruitment",
        price: 1850,
        period: "month",
        vat_inclusive: false,
        description: "Added per employee, covering vacancy through to offer.",
        user_limit: "Flat rate, any headcount",
        features: [
          "Vacancy management",
          "Careers page",
          "Applicant tracking",
          "Interview scheduling",
          "Offer management",
        ],
      },
    ],
    top_features: [
      "Leave accrual that follows BCEA rather than a US default",
      "Modular pricing, so you pay only for what you switch on",
      "Genuinely easy for line managers to use without training",
      "Clean mobile app for leave requests and approvals",
    ],
    features: [
      "Employee database and documents",
      "Org chart",
      "BCEA compliant leave accrual",
      "Leave requests and approvals",
      "Public holiday handling",
      "Performance reviews and goals",
      "360 degree feedback",
      "Shift scheduling",
      "Clock in and clock out",
      "Timesheets",
      "Expense claims",
      "Recruitment and applicant tracking",
      "Onboarding checklists",
      "Employee self service",
      "Reporting and headcount analytics",
    ],
    integrations: [
      "Sage Business Cloud Payroll",
      "Sage Pastel Payroll",
      "SimplePay",
      "Slack",
      "Microsoft Teams",
      "Google Workspace",
      "Zapier",
    ],
    compliance: [
      "BCEA leave entitlements",
      "Employment Equity reporting support",
      "POPIA operator agreement",
      "Role based access to personal information",
      "Data hosted outside South Africa",
    ],
    best_for_size: ["11 to 50 employees", "51 to 200 employees", "201 to 500 employees"],
    best_for_role: ["HR manager", "Business owner", "Office manager"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/sage-business-cloud/hr/",
    founded_year: 2012,
    support_types: ["Email", "Live chat", "Knowledge base", "Onboarding support"],
    target_rating: 4.3,
    review_count: 246,
    featured: true,
  }),

  defineSoftware({
    name: "BambooHR",
    slug: "bamboohr",
    category_id: CATEGORY,
    tagline: "The best HR experience on the market, at a US price",
    description_short:
      "BambooHR is the most polished HR platform available, with excellent onboarding and reporting, but it is billed in dollars and needs configuration for BCEA leave.",
    description_full: `
      <p>BambooHR is what every other HR product is measured against, and deservedly. The employee record is beautifully organised, onboarding workflows are the best in the category, and the reporting turns HR data into something a board will actually read. Employees like using it, which is rarer than it should be.</p>
      <p>For a South African buyer there are two questions to settle before the polish wins you over.</p>
      <h2>Leave</h2>
      <p>BambooHR models time off as policies with accrual rules, and you can build a BCEA compliant policy set. It does not ship with one. Someone has to configure annual leave at the statutory accrual, sick leave on the three year cycle and family responsibility leave as a separate entitlement, and get it right. That is an afternoon of work with a consultant, or a persistent low grade problem without one.</p>
      <h2>Price</h2>
      <p>Billing is in US dollars per employee per month with an annual commitment. At two hundred employees the rand figure is substantial and it moves with the exchange rate. Budget it as a variable cost. There is also a floor: below roughly twenty five employees you pay a minimum that makes the effective per person cost high.</p>
      <h2>What you get for it</h2>
      <p>Onboarding that genuinely reduces first week admin. Applicant tracking that hiring managers use without complaint. Reporting and headcount analytics well beyond anything in the local products. An open API and a large integration catalogue. Employee self service that people actually log into.</p>
      <h2>Who should buy it</h2>
      <p>Businesses over fifty employees where HR experience is a stated priority, particularly those hiring at pace or operating across borders. If your requirement is leave tracking and a compliant employee file, Sage HR does that for less money and less configuration.</p>
    `,
    starting_price: 9,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per employee per month on an annual commitment, with a minimum monthly charge. BCEA leave rules must be configured rather than selected.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Core",
        price: 9,
        period: "month",
        vat_inclusive: false,
        description: "Employee records, leave, reporting and self service.",
        user_limit: "Per employee, minimum charge applies",
        features: [
          "Employee database",
          "Configurable time off policies",
          "Org chart",
          "Standard reporting",
          "Employee self service",
          "Document storage",
        ],
      },
      {
        name: "Pro",
        price: 15,
        period: "month",
        vat_inclusive: false,
        description: "Adds performance management, onboarding workflows and advanced reporting.",
        user_limit: "Per employee, minimum charge applies",
        popular: true,
        features: [
          "Everything in Core",
          "Performance management",
          "Onboarding and offboarding workflows",
          "Advanced reporting and analytics",
          "Employee wellbeing surveys",
          "Open API access",
        ],
      },
    ],
    top_features: [
      "The best onboarding workflow in the category",
      "Reporting a board will actually read",
      "Employees log in voluntarily, which is rare",
      "Large integration catalogue and a proper open API",
    ],
    features: [
      "Employee database",
      "Configurable time off policies",
      "Org chart",
      "Onboarding and offboarding workflows",
      "Applicant tracking",
      "Performance management",
      "Employee wellbeing surveys",
      "Advanced reporting and analytics",
      "Document storage and e signature",
      "Employee self service",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "PaySpace",
      "Slack",
      "Microsoft Teams",
      "Google Workspace",
      "Greenhouse",
      "Zapier",
      "Open REST API",
    ],
    compliance: [
      "BCEA leave requires manual policy configuration",
      "Employment Equity reporting by custom report",
      "POPIA operator agreement",
      "Data hosted in the United States",
      "Role based access controls",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "11 to 50 employees"],
    best_for_role: ["HR manager", "HR director", "Talent lead"],
    vendor_name: "BambooHR LLC",
    vendor_website: "https://www.bamboohr.com/",
    founded_year: 2008,
    support_types: ["Email", "Telephone", "Knowledge base", "Implementation support"],
    target_rating: 4.4,
    review_count: 198,
  }),

  defineSoftware({
    name: "LabourNet",
    slug: "labournet",
    category_id: CATEGORY,
    tagline: "HR software wrapped around South African labour law advice",
    description_short:
      "LabourNet sells software alongside industrial relations, health and safety and skills development services, which is a different proposition to a pure HR platform.",
    description_full: `
      <p>LabourNet is not really a software company and comparing it to BambooHR misses the point. It is a labour law and compliance services business that provides software as part of the relationship. For a South African employer with a CCMA problem, that distinction matters more than any feature list.</p>
      <p>What you buy is access to industrial relations specialists who will sit in a disciplinary hearing with you, health and safety compliance support, skills development and B-BBEE scorecard assistance, employment equity reporting, and a system to keep the records that all of that produces.</p>
      <h2>The software</h2>
      <p>Honest assessment: adequate rather than good. Employee records, leave, disciplinary tracking, training records and document storage all work. The interface is dated and slow next to the international products, reporting is limited, and the mobile experience is poor. Nobody chooses LabourNet for the user experience.</p>
      <h2>The services</h2>
      <p>This is the actual product and it is genuinely valuable. Disciplinary and grievance procedures documented properly the first time. Someone who has run hundreds of CCMA matters advising before you dismiss rather than after. Employment equity plans that will survive a Department of Employment and Labour inspection. Section 189 processes handled correctly.</p>
      <p>For a manufacturer or a retailer with a unionised workforce, the cost of one badly handled dismissal exceeds a year of this contract.</p>
      <h2>The cost model</h2>
      <p>Retainer based and quoted on headcount and service mix. It is not comparable to per employee software pricing because you are buying advisory time. Ask specifically what is included in the retainer and what is billed hourly, because that boundary is where disputes arise.</p>
      <h2>Who should buy it</h2>
      <p>Employers with meaningful industrial relations exposure, unionised workforces, high risk operational environments, or B-BBEE scorecard obligations. Businesses that just want to track leave should buy leave software.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    pricing_note:
      "Retainer based, quoted on headcount and the mix of advisory services. Clarify what the retainer covers and what is billed hourly.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted retainer",
        price: null,
        period: "month",
        vat_inclusive: false,
        description: "Monthly retainer covering software plus a defined bundle of advisory hours.",
        features: [
          "HR and employee records software",
          "Industrial relations advisory",
          "CCMA representation",
          "Health and safety compliance",
          "Employment equity reporting",
          "Skills development and B-BBEE support",
        ],
      },
    ],
    top_features: [
      "Industrial relations specialists who will attend the CCMA with you",
      "Employment equity plans built to survive an inspection",
      "Health and safety compliance handled as part of the relationship",
      "Skills development and B-BBEE scorecard support",
    ],
    features: [
      "Employee records",
      "Leave management",
      "Disciplinary and grievance tracking",
      "Training and skills records",
      "Employment equity reporting",
      "Health and safety registers",
      "Document storage",
      "Payroll integration",
      "CCMA case management",
    ],
    integrations: ["Sage Pastel Payroll", "PaySpace", "SimplePay", "CSV import and export"],
    compliance: [
      "BCEA leave entitlements",
      "LRA disciplinary and grievance procedures",
      "Employment Equity Act reporting",
      "Skills Development Act and SETA submissions",
      "Occupational Health and Safety Act registers",
      "B-BBEE scorecard support",
      "POPIA operator agreement",
      "Data hosted in South Africa",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "500 plus employees"],
    best_for_role: ["HR manager", "Industrial relations manager", "Operations director"],
    vendor_name: "LabourNet",
    vendor_website: "https://www.labournet.com/",
    founded_year: 2000,
    support_types: [
      "Dedicated consultant",
      "Telephone",
      "Email",
      "On site attendance",
      "Training workshops",
    ],
    countries_available: ["South Africa", "Namibia", "Botswana"],
    target_rating: 3.8,
    review_count: 176,
  }),

  defineSoftware({
    name: "PeopleHR",
    slug: "peoplehr",
    category_id: CATEGORY,
    tagline: "Solid mid market HR with a strong applicant tracker",
    description_short:
      "PeopleHR is a capable cloud HR system with good recruitment tooling and flexible leave rules, sold in pounds with limited South African presence.",
    description_full: `
      <p>PeopleHR sits comfortably between Sage HR and BambooHR in both capability and price. It does the core HR work well, the applicant tracking is better than the price suggests, and the workflow builder lets you automate the small approvals that otherwise clog up a manager's inbox.</p>
      <p>The leave engine is flexible enough to model BCEA entitlements properly, though as with BambooHR it is configuration rather than a preset. Set it up once with someone who understands the Act and it behaves correctly thereafter.</p>
      <h2>Recruitment</h2>
      <p>The applicant tracking module is the standout. Vacancy publishing to job boards, a careers page you can brand without a developer, structured interview scorecards and offer management. For a business hiring more than a handful of people a year this alone can justify the subscription.</p>
      <h2>Reporting and analytics</h2>
      <p>Better than Sage HR, not as good as BambooHR. The standard reports cover headcount, turnover, absence and cost, and the custom report builder is usable by an HR manager without help from IT.</p>
      <h2>The South African caveats</h2>
      <p>Billing is in pounds, so budget it as a variable rand cost. There is no local partner presence to speak of, so implementation is self service or done remotely. Support hours follow the United Kingdom, which is workable given the small time difference but means nothing after roughly 18:00 South African time. There is no local payroll integration, so payroll data moves by file.</p>
      <h2>Who should buy it</h2>
      <p>Mid sized businesses that hire regularly, that want automation of routine HR approvals, and that are comfortable running an international product without a local partner.</p>
    `,
    starting_price: 5,
    price_currency: "GBP",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in pounds per employee per month with a monthly minimum. BCEA leave requires configuration and there is no South African payroll integration.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Professional",
        price: 5,
        period: "month",
        vat_inclusive: false,
        description: "Core HR, leave, documents and self service.",
        user_limit: "Per employee, minimum charge applies",
        features: [
          "Employee records",
          "Configurable leave rules",
          "Document storage",
          "Employee self service",
          "Standard reporting",
        ],
      },
      {
        name: "Professional Plus",
        price: 8,
        period: "month",
        vat_inclusive: false,
        description: "Adds applicant tracking, performance and the workflow builder.",
        user_limit: "Per employee, minimum charge applies",
        popular: true,
        features: [
          "Everything in Professional",
          "Applicant tracking and careers page",
          "Performance management",
          "Workflow automation",
          "Custom report builder",
          "API access",
        ],
      },
    ],
    top_features: [
      "Applicant tracking well above its price point",
      "A workflow builder that removes routine approval admin",
      "Flexible enough leave rules to model BCEA correctly",
      "Custom reporting an HR manager can drive unaided",
    ],
    features: [
      "Employee records",
      "Configurable leave and absence rules",
      "Applicant tracking",
      "Branded careers page",
      "Interview scorecards",
      "Performance reviews",
      "Workflow automation",
      "Document storage and e signature",
      "Custom report builder",
      "Employee self service",
      "Mobile app",
      "API access",
    ],
    integrations: ["Slack", "Microsoft Teams", "Google Workspace", "Zapier", "REST API"],
    compliance: [
      "BCEA leave requires manual policy configuration",
      "POPIA operator agreement",
      "Data hosted in the United Kingdom and European Union",
      "Role based access controls",
      "No South African payroll integration",
    ],
    best_for_size: ["11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["HR manager", "Talent lead", "Operations manager"],
    vendor_name: "Access PeopleHR",
    vendor_website: "https://www.peoplehr.com/",
    founded_year: 2012,
    support_types: ["Email", "Live chat", "Knowledge base"],
    target_rating: 4.0,
    review_count: 134,
  }),

  defineSoftware({
    name: "Personio",
    slug: "personio",
    category_id: CATEGORY,
    tagline: "European HR depth, priced for organisations that have outgrown spreadsheets",
    description_short:
      "Personio is a well built European HR platform with strong compliance tooling and document handling, sold on quotation with a minimum contract size.",
    description_full: `
      <p>Personio is built for European mid market companies and it shows in the right ways. Document handling, approval chains, audit trails and data protection controls are all first class, because the product grew up under GDPR. Since POPIA is closely modelled on GDPR, a great deal of that work transfers directly.</p>
      <p>For a South African organisation with a European parent or European investors, this is often the system the group already runs, and the question is whether it works locally rather than whether to buy it.</p>
      <h2>What works locally</h2>
      <p>The employee record model is flexible enough for South African requirements, including identity number handling, and the permission system is granular enough to restrict special personal information properly. Leave is rules based and can be configured to BCEA entitlements. Multi entity handling is genuinely good, which matters for groups.</p>
      <h2>What does not</h2>
      <p>There is no South African payroll module and no local payroll integration, so payroll runs elsewhere and data moves by file or API. There is no local support presence and support hours follow central European time. There is no local partner network, so implementation is remote.</p>
      <h2>Cost</h2>
      <p>Quoted rather than listed, in euros, with a minimum contract size that rules out small businesses. Expect an annual commitment and an implementation fee. It is a considered purchase, not a sign up.</p>
      <h2>Who should buy it</h2>
      <p>South African subsidiaries of European groups, organisations with strong data protection requirements, and multi entity businesses that need one HR system across several companies. Standalone South African businesses will generally get better value elsewhere.</p>
    `,
    starting_price: null,
    price_currency: "EUR",
    price_vat_inclusive: false,
    pricing_note:
      "Quoted in euros per employee per month with a minimum contract size and an implementation fee. No South African payroll integration.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "month",
        vat_inclusive: false,
        description: "Priced per employee in euros, with modules selected at contract.",
        features: [
          "Core HR and employee records",
          "Absence and leave management",
          "Recruitment",
          "Performance and development",
          "Multi entity handling",
          "Granular permission model",
        ],
      },
    ],
    top_features: [
      "Data protection controls built for GDPR, which POPIA closely follows",
      "Granular permissions that properly restrict special personal information",
      "Strong multi entity handling for groups",
      "Document and approval workflows with a full audit trail",
    ],
    features: [
      "Employee records with custom attributes",
      "Absence and leave management",
      "Approval workflows",
      "Recruitment and applicant tracking",
      "Performance and development",
      "Compensation management",
      "Multi entity and multi country",
      "Document management with e signature",
      "Granular role based permissions",
      "Reporting and analytics",
      "Open API",
    ],
    integrations: ["Slack", "Microsoft Teams", "Google Workspace", "DATEV", "Open REST API"],
    compliance: [
      "BCEA leave requires manual policy configuration",
      "GDPR aligned controls that map closely to POPIA",
      "Granular access to special personal information",
      "Data hosted in the European Union",
      "No South African payroll integration",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "500 plus employees"],
    best_for_role: ["HR director", "HR manager", "Group operations lead"],
    vendor_name: "Personio SE",
    vendor_website: "https://www.personio.com/",
    founded_year: 2015,
    support_types: ["Email", "Telephone", "Implementation consultant", "Knowledge base"],
    countries_available: ["South Africa", "Namibia", "Kenya", "Nigeria", "Other"],
    target_rating: 4.1,
    review_count: 88,
  }),

  defineSoftware({
    name: "HR Companion",
    slug: "hr-companion",
    category_id: CATEGORY,
    tagline: "Local HR built around South African statutory reporting",
    description_short:
      "HR Companion is a South African HR system with employment equity and skills development reporting built in rather than configured.",
    description_full: `
      <p>HR Companion exists because South African statutory HR reporting is specific enough that international products treat it as a custom report. Employment equity returns, workplace skills plans, annual training reports and B-BBEE scorecard inputs are all built in here rather than assembled from exports.</p>
      <p>For an HR manager who currently spends two weeks a year building an EEA2 return from a spreadsheet, that is the entire value proposition and it is a real one.</p>
      <h2>What it does well</h2>
      <p>Employment equity reporting is the strongest feature. Occupational levels, designated groups, numerical goals and the barrier analysis all sit in the data model rather than being derived at reporting time. The workplace skills plan and annual training report output in the format the SETAs accept.</p>
      <p>BCEA leave is correct out of the box, disciplinary and grievance records are properly structured, and the document storage understands South African employment document types.</p>
      <h2>What it does not</h2>
      <p>It is not a modern piece of software. The interface is functional and dated, the mobile experience is weak, and the reporting outside the statutory pack is limited. There is no recruitment module worth the name and performance management is basic.</p>
      <p>The integration story is thin. Payroll data moves by file. There is no public API. If you want an HR system that connects to a wider stack, this is not it.</p>
      <h2>Who should buy it</h2>
      <p>Designated employers with employment equity obligations, businesses with active SETA relationships and skills development targets, and organisations where B-BBEE scorecard points are commercially important. Everyone else should buy a better general purpose HR system.</p>
    `,
    starting_price: 38,
    price_vat_inclusive: false,
    pricing_note:
      "Per employee per month excluding VAT with an annual commitment. Statutory reporting modules are included rather than charged separately.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Standard",
        price: 38,
        period: "month",
        vat_inclusive: false,
        description: "Employee records, leave, disciplinary tracking and statutory reporting.",
        user_limit: "Per employee",
        popular: true,
        features: [
          "Employee records",
          "BCEA compliant leave",
          "Disciplinary and grievance records",
          "Employment equity reporting",
          "Workplace skills plan and annual training report",
          "Document storage",
        ],
      },
    ],
    top_features: [
      "Employment equity reporting built into the data model",
      "Workplace skills plan and annual training report in SETA format",
      "BCEA leave correct with no configuration",
      "B-BBEE scorecard inputs produced directly",
    ],
    features: [
      "Employee records",
      "BCEA compliant leave",
      "Disciplinary and grievance records",
      "Employment equity plans and EEA returns",
      "Workplace skills plan",
      "Annual training report",
      "B-BBEE scorecard inputs",
      "Training and qualification records",
      "Document storage",
      "Basic performance reviews",
      "Employee self service",
    ],
    integrations: ["Sage Pastel Payroll", "PaySoft", "CSV import and export"],
    compliance: [
      "BCEA leave entitlements",
      "Employment Equity Act reporting",
      "Skills Development Act and SETA submissions",
      "B-BBEE scorecard support",
      "LRA disciplinary records",
      "POPIA operator agreement",
      "Data hosted in South Africa",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees"],
    best_for_role: ["HR manager", "Employment equity officer", "Skills development facilitator"],
    vendor_name: "HR Companion",
    vendor_website: "https://www.hrcompanion.co.za/",
    founded_year: 2009,
    support_types: ["Telephone", "Email", "On site training"],
    countries_available: ["South Africa"],
    target_rating: 3.7,
    review_count: 97,
  }),
];
