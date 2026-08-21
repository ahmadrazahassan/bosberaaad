import { defineSoftware } from "./define";

const CATEGORY = "cat-payroll";

export const PAYROLL_SOFTWARE = [
  defineSoftware({
    name: "SimplePay",
    slug: "simplepay",
    category_id: CATEGORY,
    tagline: "The clearest payroll in the country, priced per employee",
    description_short:
      "SimplePay is a South African built cloud payroll that handles EMP201, EMP501, IRP5 and UIF properly, charged per employee with no minimum.",
    description_full: `
      <p>SimplePay is the product we recommend most often in this category, and the reason is that it does the difficult things quietly. EMP201 declarations, the biannual EMP501 reconciliation, IRP5 and IT3(a) certificates, e@syFile exports, UIF declarations, SDL and ETI all work without a consultant. The company is South African, the support desk is in South Africa, and the people answering understand what you are asking.</p>
      <p>Pricing is per employee per month with no minimum, which is the fairest structure in the category. A five person business pays for five people. A business that seasonally doubles pays for what it uses. There is no annual licence to negotiate and no per company base fee to swallow.</p>
      <h2>ETI, done properly</h2>
      <p>The Employment Tax Incentive is where payroll software separates itself. The sliding scale, the qualifying criteria, the twenty four month window and the monthly recalculation are all fiddly, and getting it wrong either costs you money you were entitled to or creates a liability on audit. SimplePay calculates it correctly and shows its working, which is what you want when SARS asks.</p>
      <h2>BCEA leave</h2>
      <p>Leave accrues the way the Act describes rather than the way an American payroll assumes. Annual leave at the statutory rate, sick leave on the three year cycle, family responsibility leave as its own entitlement. Imported systems consistently get this wrong and require a workaround. This one does not.</p>
      <h2>Where it is thin</h2>
      <p>It is a payroll, not an HR system. There is no performance management, no recruitment, no org chart. Leave requests and payslip self service exist and are adequate, but if you want an HR platform you are buying a second product. Reporting beyond the statutory pack is basic, and larger finance teams often export to a spreadsheet.</p>
      <h2>Who should buy it</h2>
      <p>Any South African business from one employee to a few hundred that wants payroll to be correct and boring. If your only requirement is compliant payroll at a fair price, this is the shortlist.</p>
    `,
    starting_price: 26,
    price_vat_inclusive: false,
    pricing_note:
      "Charged per employee per month excluding VAT, with no minimum and no company base fee. The rate steps down as employee numbers rise.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Per employee",
        price: 26,
        period: "month",
        vat_inclusive: false,
        description: "One rate per active employee per month. No minimum, no base fee.",
        user_limit: "Unlimited administrators",
        popular: true,
        features: [
          "EMP201 and EMP501",
          "IRP5 and IT3(a) certificates",
          "e@syFile export",
          "UIF declaration file",
          "ETI calculation with full working",
          "ACB payment file for all major banks",
          "BCEA compliant leave",
          "Employee self service portal",
        ],
      },
    ],
    top_features: [
      "Every SARS submission handled without a consultant",
      "ETI calculated correctly, with the working shown",
      "Per employee pricing with no minimum",
      "South African support desk that answers in South African hours",
    ],
    features: [
      "EMP201 monthly declaration",
      "EMP501 biannual reconciliation",
      "IRP5 and IT3(a) certificate generation",
      "e@syFile compatible export",
      "UIF declaration file",
      "SDL calculation",
      "ETI with sliding scale",
      "BCEA compliant leave accrual",
      "ACB payment file for Absa, FNB, Standard Bank, Nedbank and Capitec",
      "Employee self service portal",
      "Payslip email and download",
      "Multiple pay frequencies",
      "Bonus, commission and overtime handling",
      "Medical aid and retirement fund deductions",
      "Garnishee and maintenance orders",
    ],
    integrations: [
      "Xero",
      "Sage Accounting",
      "QuickBooks Online",
      "Zoho Books",
      "Sage Pastel",
      "Open API",
    ],
    compliance: [
      "EMP201",
      "EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF declarations",
      "SDL",
      "ETI",
      "BCEA leave entitlements",
      "POPIA operator agreement",
      "Data hosted in South Africa",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: [
      "Sole trader",
      "2 to 10 employees",
      "11 to 50 employees",
      "51 to 200 employees",
    ],
    best_for_role: ["Business owner", "Bookkeeper", "Payroll administrator"],
    vendor_name: "SimplePay",
    vendor_website: "https://www.simplepay.co.za/",
    founded_year: 2010,
    support_types: ["Email", "Telephone", "Knowledge base", "Guided onboarding"],
    countries_available: ["South Africa", "Namibia", "Botswana", "Zimbabwe", "Kenya", "Nigeria"],
    target_rating: 4.7,
    review_count: 358,
    featured: true,
  }),

  defineSoftware({
    name: "PaySpace",
    slug: "payspace",
    category_id: CATEGORY,
    tagline: "Enterprise payroll and HR across Africa, in one system",
    description_short:
      "PaySpace is a South African built enterprise payroll and HR platform covering more than forty African countries, with deep statutory coverage and a corresponding price.",
    description_full: `
      <p>PaySpace is what you buy when payroll has become complicated enough to need a system rather than a product. Multiple companies, multiple countries, multiple bargaining council agreements, thousands of employees and an audit trail that has to survive scrutiny.</p>
      <p>The African footprint is the differentiator. More than forty countries with local statutory rules maintained by the vendor, which for a South African group with operations in Botswana, Zambia, Kenya and Nigeria removes an enormous amount of risk. Running four separate local payrolls and consolidating them by hand is how mistakes happen.</p>
      <h2>Depth</h2>
      <p>The South African compliance set is complete: EMP201, EMP501, IRP5 and IT3(a), e@syFile, UIF, SDL, ETI, COIDA return of earnings, and bargaining council submissions for the sectors that need them. Retirement fund, medical aid and union deduction handling is properly structured rather than bolted on.</p>
      <p>The HR side is real rather than decorative. Employee records, org structure, leave, performance, learning and recruitment sit in the same database as payroll, so there is one employee record rather than two that disagree.</p>
      <h2>Cost and complexity</h2>
      <p>This is not a self service purchase. Implementation is a project, usually run with the vendor or a partner, and typically takes weeks rather than days. Pricing is quoted per employee per month and negotiated on volume, and there is a base platform fee. A twelve person business should not be looking at this.</p>
      <p>The interface reflects its enterprise nature. It is dense, it assumes you know payroll, and new administrators need training. That is the correct trade for the depth on offer, but it should be planned for.</p>
      <h2>Who should buy it</h2>
      <p>Businesses over roughly two hundred employees, any group operating in more than one African country, and organisations under bargaining council agreements. Below that scale the implementation cost is difficult to justify.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    pricing_note:
      "Quoted per employee per month on volume, plus a platform fee and an implementation project. Expect a scoping call rather than a price list.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "month",
        vat_inclusive: false,
        description:
          "Priced per employee on volume, with a platform fee and a scoped implementation.",
        features: [
          "Full South African statutory payroll",
          "Multi country African payroll",
          "Integrated HR module",
          "Employee and manager self service",
          "Bargaining council submissions",
          "Dedicated implementation consultant",
        ],
      },
    ],
    top_features: [
      "Statutory payroll maintained across more than forty African countries",
      "Payroll and HR sharing one employee record",
      "Bargaining council and COIDA submissions built in",
      "Audit trail built for organisations that get audited",
    ],
    features: [
      "EMP201 and EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF and SDL",
      "ETI",
      "COIDA return of earnings",
      "Bargaining council submissions",
      "Multi country African payroll",
      "Multi company consolidation",
      "Employee and manager self service",
      "Leave and absence management",
      "Performance management",
      "Recruitment and onboarding",
      "Learning management",
      "Org chart and position management",
      "Custom report writer",
      "Open API",
    ],
    integrations: [
      "Sage Intacct",
      "SAP",
      "Microsoft Dynamics",
      "Sage 200 Evolution",
      "Power BI",
      "Open REST API",
    ],
    compliance: [
      "EMP201",
      "EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF declarations",
      "SDL",
      "ETI",
      "COIDA return of earnings",
      "BCEA leave entitlements",
      "Bargaining council agreements",
      "POPIA operator agreement",
      "Data hosted in South Africa",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: ["201 to 500 employees", "500 plus employees", "51 to 200 employees"],
    best_for_role: ["Payroll manager", "HR director", "Financial manager"],
    vendor_name: "PaySpace by Deel",
    vendor_website: "https://www.payspace.com/",
    founded_year: 2004,
    support_types: [
      "Dedicated consultant",
      "Telephone",
      "Email",
      "Knowledge base",
      "Training academy",
    ],
    countries_available: [
      "South Africa",
      "Namibia",
      "Botswana",
      "Zambia",
      "Zimbabwe",
      "Kenya",
      "Nigeria",
      "Ghana",
      "Mauritius",
      "Tanzania",
    ],
    target_rating: 4.4,
    review_count: 287,
    featured: true,
  }),

  defineSoftware({
    name: "Sage Pastel Payroll",
    slug: "sage-pastel-payroll",
    category_id: CATEGORY,
    tagline: "The established desktop payroll, still widely trusted",
    description_short:
      "Sage Pastel Payroll is a mature desktop payroll with complete South African statutory coverage and the largest base of trained operators in the country.",
    description_full: `
      <p>If you walk into a South African accounting practice and ask what they run payroll on, this is still the most common answer. Pastel Payroll has been maintained against SARS requirements for decades, the statutory pack is complete, and there is no shortage of people who can operate it.</p>
      <p>It is a desktop product with optional cloud backup and an employee self service add on. The same argument that applies to Pastel accounting applies here: for a business with unreliable connectivity, running payroll locally is a genuine operational advantage on the last working day of the month.</p>
      <h2>Statutory coverage</h2>
      <p>Complete and reliable. EMP201, EMP501, IRP5 and IT3(a), e@syFile, UIF, SDL, ETI and COIDA. Annual compliance updates arrive before the tax year end, which is the only date that really matters. Bargaining council support is available for the sectors that need it, generally through the mid tier build.</p>
      <h2>What it costs you</h2>
      <p>The licensing model is the frustration. It is banded by employee count, so crossing a band boundary produces a step change in cost that catches people out. Additional modules are separately licensed. The all in figure for a growing business is frequently higher than a cloud per employee product at the same headcount, and it is harder to predict.</p>
      <p>The interface is dated in the same way Pastel accounting is dated. Experienced operators are extremely fast in it. New ones are slow for a while, and the training is a real cost.</p>
      <h2>Who should buy it</h2>
      <p>Businesses whose payroll administrator already knows Pastel, practices running payroll as a service for multiple clients, and anyone who needs payroll to work when the connection does not. Businesses starting fresh should compare it honestly against SimplePay on total cost before defaulting to it.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Sage publishes no list price for Sage Pastel Payroll. Its product page routes to a reseller quote, and the Sage South Africa online shop it links to was offline when we last checked. Licensing is in employee count bands rather than per employee, so cost steps rather than scales. Get the quote in writing, with the band and the module list itemised.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Payroll Essentials",
        price: null,
        period: "month",
        vat_inclusive: false,
        description: "Core statutory payroll for smaller employee bands. Quoted on band.",
        user_limit: "Banded by employee count",
        features: [
          "EMP201 and EMP501",
          "IRP5 and IT3(a)",
          "e@syFile export",
          "UIF and SDL",
          "ACB payment files",
        ],
      },
      {
        name: "Payroll Professional",
        price: null,
        period: "month",
        vat_inclusive: false,
        description:
          "Adds ETI, bargaining councils, leave and deeper reporting. Quoted on band.",
        user_limit: "Banded by employee count",
        popular: true,
        features: [
          "Everything in Essentials",
          "ETI calculation",
          "Bargaining council submissions",
          "Leave management",
          "Custom reporting",
          "Multi company",
        ],
      },
    ],
    top_features: [
      "Complete SARS statutory coverage, maintained for decades",
      "Runs locally, so month end is not a connectivity risk",
      "The largest pool of trained operators in the country",
      "Strong multi company handling for practices",
    ],
    features: [
      "EMP201 and EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF and SDL",
      "ETI",
      "COIDA return of earnings",
      "Bargaining council submissions",
      "ACB payment files",
      "Leave management",
      "Multi company",
      "Employee self service add on",
      "Custom payslip layouts",
      "Cloud backup",
    ],
    integrations: [
      "Sage 50cloud Pastel",
      "Sage Accounting",
      "Sage 200 Evolution",
      "Sage HR",
      "Bank ACB import",
    ],
    compliance: [
      "EMP201",
      "EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF declarations",
      "SDL",
      "ETI",
      "COIDA return of earnings",
      "BCEA leave entitlements",
      "Bargaining council agreements",
      "Annual statutory update releases",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Payroll administrator", "Bookkeeper", "Accountant in practice"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/products/sage-pastel-payroll/",
    founded_year: 1994,
    support_types: ["Telephone", "Email", "Partner network", "Knowledge base"],
    target_rating: 3.9,
    review_count: 342,
  }),

  defineSoftware({
    name: "Sage Payroll",
    slug: "sage-payroll",
    category_id: CATEGORY,
    tagline: "Sage compliance, delivered in the browser",
    description_short:
      "Sage Payroll brings the Pastel Payroll compliance engine to a cloud product with per employee pricing and no local installation.",
    description_full: `
      <p>This is Sage's answer to SimplePay, and it is a reasonable one. The statutory engine is inherited from a product that has been getting South African payroll right for thirty years, delivered in a browser with per employee pricing and no installation to maintain.</p>
      <p>For a business already inside the Sage ecosystem it is the path of least resistance. It posts to Sage Accounting cleanly, the employee record structure matches Sage HR, and the support desk is the one you already phone.</p>
      <h2>Compliance</h2>
      <p>EMP201, EMP501, IRP5 and IT3(a), e@syFile, UIF, SDL and ETI are all present and correct. Leave follows BCEA rules. ACB payment files work with the major banks. There is nothing missing that a typical small or medium employer needs.</p>
      <h2>Where SimplePay still wins</h2>
      <p>Two things, and they are consistent across our review set. The interface is less clear, particularly for anyone who is not a payroll professional, and the ETI screens in particular take more explaining. And support response times are slower, because it is a large support organisation handling many products rather than a small one handling a single product.</p>
      <p>Price is close enough that it is rarely the deciding factor. Compare the two on a trial with your own data and pick the one your administrator finds easier, because over a year that difference is worth more than the rand difference.</p>
      <h2>Who should buy it</h2>
      <p>Businesses running Sage Accounting who want payroll in the same account and on the same invoice. Businesses whose accountant is a Sage practice. Anyone who wants cloud payroll from a vendor that will still exist in fifteen years.</p>
    `,
    starting_price: 72,
    price_vat_inclusive: true,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Sage now markets this as Sage Payroll. Prices include VAT and are quoted from the one to two employee band; the figure rises with headcount, selected on the pricing page, up to 150 employees. Bundled discounts apply when purchased with Sage Accounting.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Payroll Essentials",
        price: 72,
        period: "month",
        vat_inclusive: true,
        description:
          "Pay employees and handle essential HR admin. Leave is limited to three types.",
        user_limit: "From 1 to 2 employees",
        features: [
          "EMP201 and EMP501",
          "IRP5 and IT3(a)",
          "e@syFile export",
          "UIF and SDL",
          "ETI calculation",
          "ACB payment files",
          "BCEA leave",
          "Employee self service",
          "Posts directly to Sage Accounting",
        ],
      },
      {
        name: "Payroll Standard",
        price: 90,
        period: "month",
        vat_inclusive: true,
        description: "Adds all leave types, an onboarding portal and mobile expenses.",
        user_limit: "From 1 to 2 employees",
        popular: true,
        features: [
          "Everything in Payroll Essentials",
          "All leave and absence types",
          "Personalised onboarding portal",
          "Mobile expense capture",
        ],
      },
      {
        name: "Payroll Premium",
        price: 128,
        period: "month",
        vat_inclusive: true,
        description: "Adds timesheets and hour tracking on top of Standard.",
        user_limit: "From 1 to 2 employees",
        features: [
          "Everything in Payroll Standard",
          "Timesheets and hour tracking",
          "Submit and approve time",
        ],
      },
    ],
    top_features: [
      "The Sage compliance engine without a local installation",
      "Posts straight into Sage Accounting with no export step",
      "Per employee pricing that scales with headcount",
      "Backed by the largest accounting software vendor in the market",
    ],
    features: [
      "EMP201 and EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF and SDL",
      "ETI",
      "BCEA compliant leave",
      "ACB payment files",
      "Employee self service portal",
      "Payslip email",
      "Multiple pay frequencies",
      "Medical aid and retirement fund deductions",
      "Direct posting to Sage Accounting",
    ],
    integrations: ["Sage Accounting", "Sage HR", "Sage 200 Evolution", "Sage 50cloud Pastel"],
    compliance: [
      "EMP201",
      "EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF declarations",
      "SDL",
      "ETI",
      "BCEA leave entitlements",
      "POPIA operator agreement",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Business owner", "Bookkeeper", "Payroll administrator"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/sage-business-cloud/payroll-1/",
    founded_year: 2015,
    support_types: ["Telephone", "Email", "Live chat", "Knowledge base"],
    target_rating: 4.1,
    review_count: 231,
  }),

  defineSoftware({
    name: "PaySoft",
    slug: "paysoft",
    category_id: CATEGORY,
    tagline: "Quiet, reliable payroll for the mid market",
    description_short:
      "PaySoft is a long standing South African payroll used heavily in manufacturing, agriculture and security, with strong shift and wage handling.",
    description_full: `
      <p>PaySoft is not a name you see advertised, and that is roughly the point. It has been running weekly and fortnightly wage payrolls in South African factories, farms and security firms for a long time, and the businesses that use it tend to stay.</p>
      <p>The strength is in the shapes of payroll that catch other systems out. Weekly wages with variable hours. Piece rate work. Shift differentials. Multiple bargaining council agreements running in one company. Large headcounts of hourly paid staff where a small calculation error multiplies fast.</p>
      <h2>Statutory work</h2>
      <p>Complete. EMP201, EMP501, IRP5 and IT3(a), e@syFile, UIF, SDL, ETI and COIDA, with bargaining council submissions for the sectors that need them. The vendor's compliance updates are prompt and the support team knows the councils.</p>
      <h2>The trade off</h2>
      <p>It looks its age. The interface is functional rather than considered, and the product is sold and implemented through a reseller network rather than self service, so getting started involves a conversation rather than a sign up form. Employee self service exists but is basic next to PaySpace or SimplePay.</p>
      <p>Documentation is thinner than the market leaders, and a great deal of the practical knowledge lives with the resellers. That is fine while your reseller relationship is good, and it is a risk worth naming.</p>
      <h2>Who should buy it</h2>
      <p>Employers with significant hourly or wage staff, particularly in manufacturing, agriculture, security and hospitality, and anyone running under bargaining council agreements who has been let down by a general purpose payroll.</p>
    `,
    starting_price: 22,
    price_vat_inclusive: false,
    pricing_note:
      "Quoted per employee per month through a reseller, excluding VAT. Rates step down significantly above two hundred employees.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Per employee",
        price: 22,
        period: "month",
        vat_inclusive: false,
        description: "Quoted per employee per month through a reseller, with volume steps.",
        popular: true,
        features: [
          "Full South African statutory payroll",
          "Weekly, fortnightly and monthly cycles",
          "Bargaining council agreements",
          "Shift and piece rate handling",
          "ACB payment files",
        ],
      },
    ],
    top_features: [
      "Weekly wage and shift handling that general purpose payrolls get wrong",
      "Bargaining council agreements as a first class feature",
      "Piece rate and variable hour calculation",
      "Strong reseller support in industrial regions",
    ],
    features: [
      "EMP201 and EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF and SDL",
      "ETI",
      "COIDA return of earnings",
      "Bargaining council submissions",
      "Weekly, fortnightly and monthly pay cycles",
      "Shift differentials",
      "Piece rate calculation",
      "Clocking system import",
      "ACB payment files",
      "Loan and advance tracking",
      "Basic employee self service",
    ],
    integrations: ["Sage 50cloud Pastel", "Sage 200 Evolution", "Clocking system imports", "CSV export"],
    compliance: [
      "EMP201",
      "EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF declarations",
      "SDL",
      "ETI",
      "COIDA return of earnings",
      "BCEA leave entitlements",
      "Bargaining council agreements",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "11 to 50 employees"],
    best_for_role: ["Payroll administrator", "HR manager", "Operations manager"],
    vendor_name: "PaySoft",
    vendor_website: "https://www.paysoft.co.za/",
    founded_year: 1998,
    support_types: ["Reseller network", "Telephone", "Email", "On site training"],
    countries_available: ["South Africa", "Namibia", "Botswana"],
    target_rating: 4.0,
    review_count: 143,
  }),

  defineSoftware({
    name: "Payroll Online",
    slug: "payroll-online",
    category_id: CATEGORY,
    tagline: "Straightforward cloud payroll for small employers",
    description_short:
      "Payroll Online is a lightweight South African cloud payroll aimed at businesses under fifty staff who want statutory compliance without complexity.",
    description_full: `
      <p>Payroll Online occupies the space just below SimplePay: small employers who need the statutory work done correctly and do not want to think about payroll for more than an hour a month.</p>
      <p>The product is deliberately narrow. You capture employees, you set up earnings and deductions, you run the period, you download the payslips and the payment file. The statutory outputs are generated. That is the whole product, and for a fifteen person business it is enough.</p>
      <h2>Compliance</h2>
      <p>EMP201, EMP501, IRP5 and IT3(a), e@syFile export, UIF and SDL are all handled. ETI is supported. BCEA leave accrues correctly. The gaps are at the edges: no bargaining council support, no COIDA return of earnings, limited handling of complex earnings structures like commission on a sliding scale.</p>
      <h2>Where it falls short</h2>
      <p>Reporting is minimal. Beyond the statutory pack and a payroll summary there is not much, and finance teams that want to analyse cost by department or cost centre will be exporting to a spreadsheet. Employee self service is basic. Integration with accounting systems is by CSV rather than a live connection.</p>
      <p>Support is email first with a small team, which is fine most of the month and can be frustrating on the twenty fifth.</p>
      <h2>Who should buy it</h2>
      <p>Small employers with simple, salaried payrolls and no bargaining council exposure. If you have hourly staff, multiple cost centres, or plans to pass fifty employees within a year, start with SimplePay instead and save yourself a migration.</p>
    `,
    starting_price: 19,
    price_vat_inclusive: false,
    pricing_note:
      "Per employee per month excluding VAT, with a monthly minimum equivalent to five employees.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Per employee",
        price: 19,
        period: "month",
        vat_inclusive: false,
        description: "Per active employee per month, minimum charge of five employees.",
        popular: true,
        features: [
          "EMP201 and EMP501",
          "IRP5 and IT3(a)",
          "e@syFile export",
          "UIF and SDL",
          "ETI",
          "BCEA leave",
          "Payslip email",
        ],
      },
    ],
    top_features: [
      "The lowest per employee price of any compliant South African payroll",
      "Genuinely simple, with almost nothing to configure",
      "Statutory pack complete for a straightforward salaried payroll",
      "No installation, no contract, month to month",
    ],
    features: [
      "EMP201 and EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF and SDL",
      "ETI",
      "BCEA compliant leave",
      "Payslip email and download",
      "ACB payment file",
      "Basic employee self service",
      "CSV export to accounting",
    ],
    integrations: ["CSV export to Sage, Xero and QuickBooks"],
    compliance: [
      "EMP201",
      "EMP501",
      "IRP5 and IT3(a)",
      "e@syFile export",
      "UIF declarations",
      "SDL",
      "ETI",
      "BCEA leave entitlements",
      "No COIDA return of earnings",
      "No bargaining council support",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank"],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Business owner", "Office manager", "Bookkeeper"],
    vendor_name: "Payroll Online",
    vendor_website: "https://www.payrollonline.co.za/",
    founded_year: 2013,
    support_types: ["Email", "Knowledge base"],
    countries_available: ["South Africa"],
    target_rating: 3.8,
    review_count: 104,
  }),
];
