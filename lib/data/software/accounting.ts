import { defineSoftware } from "./define";

const CATEGORY = "cat-accounting";

export const ACCOUNTING_SOFTWARE = [
  defineSoftware({
    name: "Sage Accounting",
    slug: "sage-accounting",
    category_id: CATEGORY,
    tagline: "The default cloud ledger for South African small business",
    description_short:
      "Sage Accounting is the most widely used cloud ledger in South Africa, built around SARS compliance and supported by the largest pool of trained bookkeepers in the country.",
    description_full: `
      <p>Sage Accounting is the product most South African bookkeepers reach for first, and the reason is not that it is the best designed. It is that the compliance work is already done, the bank feeds cover every major local bank, and there are more people in this country who can walk into your business and use it than for any competing product.</p>
      <p>The VAT engine is the strongest argument. Standard, zero rated and exempt supplies are handled properly at 15%, the VAT201 report comes out in the shape SARS expects, and the figures transfer to eFiling without anyone rebuilding a return in Excel. That sounds like a low bar. It is not. Several well regarded international packages still require a manual reconciliation step at the end of every VAT period, and over a year that is days of billable time.</p>
      <h2>Where it is strong</h2>
      <p>Bank feeds are the second reason people stay. Absa, FNB, Standard Bank, Nedbank and Capitec all have working direct feeds rather than a scheduled CSV import, and the matching rules learn quickly. For a business processing four hundred transactions a month, this is the difference between a morning and a week.</p>
      <p>The accountant access model is also correct. Your accountant in practice gets their own login at no extra cost, with their own permissions, and can work in the file at the same time as your bookkeeper. Products that charge for a second seat here are quietly expensive.</p>
      <h2>Where it disappoints</h2>
      <p>The interface has aged. It works, and it is fast, but it looks like software designed to be used rather than enjoyed, and staff coming from Xero notice it immediately. Reporting is the more substantive complaint. The standard report pack is adequate and the customisation is limited, so anything beyond a trial balance, an income statement and an age analysis tends to end up in a spreadsheet anyway.</p>
      <p>Inventory is the other honest weakness. It is present, it will track quantities and cost, and it is not good enough to run a distribution business on. If stock is the centre of your operation you should be looking at Sage 200 Evolution or an ERP rather than stretching this product past its design.</p>
      <h2>Who should buy it</h2>
      <p>A services business, a small retailer or a professional practice with up to roughly twenty staff, especially one whose accountant already works in Sage. If you are choosing between this and Xero and your accountant has a preference, take the preference. The compliance outcomes are close enough that the deciding factor is who is going to fix it at year end.</p>
    `,
    starting_price: 240,
    price_vat_inclusive: true,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Sage quotes Sage Accounting including VAT, unlike Sage 50cloud Pastel which it quotes excluding. The figures here are the monthly prices; an annual commitment is offered at checkout. Extra users are R75 a month and an extra company is R410 a month.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Accounting Start",
        price: 240,
        period: "month",
        vat_inclusive: true,
        description: "One user, invoicing, banking and VAT for a sole trader or micro business.",
        user_limit: "1 user",
        features: [
          "Unlimited invoices and quotes",
          "VAT201 reporting",
          "Bank feeds for all major SA banks",
          "Free accountant access",
          "Customer and supplier records",
        ],
      },
      {
        name: "Accounting Standard",
        price: 435,
        period: "month",
        vat_inclusive: true,
        description:
          "Adds multi user access, inventory and full financial reporting. The base package covers two users and one company.",
        user_limit: "2 to 5 users",
        popular: true,
        features: [
          "Everything in Start",
          "Up to 3 users",
          "Basic inventory tracking",
          "Multi currency invoicing",
          "Budget and cash flow reporting",
          "Purchase orders",
        ],
      },
    ],
    top_features: [
      "VAT201 output that transfers cleanly to SARS eFiling",
      "Direct bank feeds for Absa, FNB, Standard Bank, Nedbank and Capitec",
      "Free accountant login on every plan",
      "The deepest pool of trained local bookkeepers in the country",
    ],
    features: [
      "Invoicing and quoting",
      "VAT201 and VAT reconciliation",
      "Bank feeds and automatic matching",
      "Customer and supplier ledgers",
      "Age analysis",
      "Multi currency invoicing",
      "Basic inventory",
      "Purchase orders",
      "Project and job costing",
      "Budgeting and cash flow forecasts",
      "Fixed asset register",
      "Recurring invoices and debit orders",
      "Mobile app for iOS and Android",
      "Free accountant and auditor access",
      "Audit trail on every transaction",
    ],
    integrations: [
      "Sage Pastel Payroll",
      "Sage Business Cloud Payroll",
      "SimplePay",
      "Yoco",
      "PayFast",
      "Shopify",
      "WooCommerce",
      "Zapier",
      "Receipt Bank",
      "Draftworx",
    ],
    compliance: [
      "VAT201 at 15%",
      "SARS eFiling transfer",
      "Zero rated and exempt supply handling",
      "IT14SD supporting schedules",
      "POPIA operator agreement",
      "CIPC annual return support via accountant",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec", "Investec", "TymeBank"],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Business owner", "Bookkeeper", "Accountant in practice"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/sage-business-cloud/accounting/",
    founded_year: 1981,
    support_types: ["Telephone", "Email", "Live chat", "Knowledge base", "Partner network"],
    target_rating: 4.2,
    review_count: 412,
    featured: true,
  }),

  defineSoftware({
    name: "Xero",
    slug: "xero",
    category_id: CATEGORY,
    tagline: "The best designed cloud ledger, with a strong local following",
    description_short:
      "Xero is the cleanest cloud accounting product on the market and has built a serious South African base, though its VAT201 workflow still needs a manual step at submission.",
    description_full: `
      <p>Xero is what happens when a company decides accounting software should be pleasant. The bank reconciliation screen alone converts people, because it turns the single most tedious job in bookkeeping into something that takes minutes. Small business owners who have never enjoyed looking at their books tend to actually open Xero, and that has real value that does not show up on a feature matrix.</p>
      <p>The South African position has strengthened considerably. Pricing is quoted in rand, the major bank feeds work, and there is now a substantial community of Xero certified advisors in Johannesburg, Cape Town and Durban. Ten years ago recommending Xero here meant recommending a support problem. That is no longer true.</p>
      <h2>The VAT question</h2>
      <p>This is where honesty matters. Xero handles South African VAT correctly at 15% and will produce a VAT201 report with the right figures in the right boxes. What it does not do is push that return into SARS eFiling. Someone types the figures across. For most businesses that is fifteen minutes every two months and entirely tolerable. For a practice filing forty returns it is a real cost, and it is the single most common reason accountants here still steer clients to Sage.</p>
      <h2>Where it beats everything else</h2>
      <p>The app ecosystem is the strongest in the category by a wide margin. Over a thousand connected applications means that whatever your business does, something already talks to Xero. Multi currency is genuinely good, with automatic rate updates and correct unrealised gain and loss treatment, which matters if you export.</p>
      <p>Reporting is also a level above the local incumbents. Report layouts can be built once and reused across clients, comparative periods are easy, and the output looks like something you would put in front of a bank.</p>
      <h2>Where it costs you</h2>
      <p>Price. The entry plan is genuinely limited, capping invoices and bills at a level most real businesses pass in the first month, so the practical starting point is the middle tier. Payroll is not included in the South African product, so budget for SimplePay or PaySpace alongside it.</p>
      <p>Support is online only. There is no telephone number, and for a business owner at 16:00 on the day a VAT return is due, that is a genuine frustration. The help content is excellent and the community forums are active, but they are not a person on a phone.</p>
      <h2>Who should buy it</h2>
      <p>Growing businesses that value the day to day experience, anyone with a multi currency element, and teams that want to build a stack of connected apps rather than one monolith. If your accountant is Xero certified, this is an easy recommendation.</p>
    `,
    starting_price: 330,
    price_vat_inclusive: false,
    pricing_note:
      "Xero quotes South African prices in rand excluding VAT. The Ignite plan caps invoices, bills and quotes, so most businesses start on Grow.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Ignite",
        price: 330,
        period: "month",
        vat_inclusive: false,
        description: "Entry level, with hard caps that most trading businesses pass quickly.",
        user_limit: "Unlimited users",
        features: [
          "20 invoices and quotes a month",
          "10 bills a month",
          "Bank reconciliation",
          "VAT201 reporting",
          "Unlimited users on every plan",
        ],
      },
      {
        name: "Grow",
        price: 560,
        period: "month",
        vat_inclusive: false,
        description: "The realistic starting point. Uncapped invoicing and bills.",
        user_limit: "Unlimited users",
        popular: true,
        features: [
          "Unlimited invoices, quotes and bills",
          "Bulk reconcile transactions",
          "Short term cash flow projection",
          "Multi currency at extra cost",
          "Full reporting suite",
        ],
      },
      {
        name: "Comprehensive",
        price: 760,
        period: "month",
        vat_inclusive: false,
        description: "Adds multi currency, projects and expense claims.",
        user_limit: "Unlimited users",
        features: [
          "Everything in Grow",
          "Multi currency included",
          "Project tracking and job costing",
          "Employee expense claims",
          "Analytics with cash flow forecasting",
        ],
      },
      {
        name: "Ultimate",
        price: 950,
        period: "month",
        vat_inclusive: false,
        description: "For larger teams needing deeper analytics and employee tools.",
        user_limit: "Unlimited users",
        features: [
          "Everything in Comprehensive",
          "Advanced analytics",
          "Higher expense and project limits",
          "Priority onboarding support",
        ],
      },
    ],
    top_features: [
      "The best bank reconciliation experience in the category",
      "Unlimited users on every plan, which no local competitor matches",
      "Over a thousand connected applications",
      "Genuinely strong multi currency handling",
    ],
    features: [
      "Bank reconciliation with rule learning",
      "Invoicing, quoting and online payment links",
      "VAT201 reporting at 15%",
      "Multi currency with automatic rates",
      "Project and job costing",
      "Expense claims",
      "Fixed asset register",
      "Inventory tracking",
      "Purchase orders",
      "Cash flow forecasting",
      "Custom report builder",
      "Unlimited users on all plans",
      "Mobile app for iOS and Android",
      "Two factor authentication as standard",
    ],
    integrations: [
      "SimplePay",
      "PaySpace",
      "Hubdoc",
      "Dext",
      "Shopify",
      "WooCommerce",
      "Yoco",
      "PayFast",
      "Stripe",
      "HubSpot",
      "Zapier",
      "Vend",
    ],
    compliance: [
      "VAT201 at 15%",
      "Zero rated and exempt supply handling",
      "Manual eFiling capture, no direct SARS transfer",
      "POPIA operator agreement",
      "Data hosted outside South Africa",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Investec"],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Business owner", "Financial manager", "Accountant in practice"],
    vendor_name: "Xero Limited",
    vendor_website: "https://www.xero.com/za/",
    founded_year: 2006,
    support_types: ["Email", "Online support ticket", "Knowledge base", "Advisor network"],
    target_rating: 4.5,
    review_count: 386,
    featured: true,
  }),

  defineSoftware({
    name: "QuickBooks Online",
    slug: "quickbooks-online",
    category_id: CATEGORY,
    tagline: "Capable, well priced, and thinner on local compliance than it looks",
    description_short:
      "QuickBooks Online is a strong general ledger at a competitive rand price, but South African VAT and bank feed coverage lag behind the local incumbents.",
    description_full: `
      <p>QuickBooks is the largest small business accounting brand in the world, and the online product is a genuinely good piece of software. The reporting is better than Sage Accounting, the interface is better than Sage Accounting, and the price sits between the two local leaders. On paper it should be an easy shortlist entry.</p>
      <p>The complication is that Intuit's centre of gravity is North America, and the South African edition receives local features later and in less depth. This is not a fatal problem. It is a real one, and you should know about it before you migrate three years of history.</p>
      <h2>VAT and SARS</h2>
      <p>VAT is handled at 15% with the correct treatment for standard, zero rated and exempt supplies, and the VAT201 report is usable. There is no direct eFiling transfer, so submission is a manual capture, the same as Xero. Where QuickBooks is weaker is in the supporting detail that South African accountants expect at year end, particularly around the IT14SD reconciliation, and most practices end up building a working paper outside the system.</p>
      <h2>Bank feeds</h2>
      <p>Coverage is the real gap. The major four are supported, but feed reliability is the most common complaint in our review set, with users reporting connections that drop and need reauthorising more often than they should. Capitec support has historically been the weakest point. If your business banks with Capitec, test this properly during the trial rather than assuming it.</p>
      <h2>Where it is genuinely good</h2>
      <p>Reporting and budgeting are strong for the price, the mobile app is the best in the category for capturing receipts on the road, and the mileage tracker is a small thing that sales heavy businesses end up loving. Multi currency is included from the middle tier rather than treated as an upsell.</p>
      <h2>Who should buy it</h2>
      <p>Businesses that want better reporting than Sage Accounting offers at a similar price, that bank with one of the big four, and whose accountant is comfortable working outside the Sage ecosystem. Test the bank feeds during the trial. That is the decision.</p>
    `,
    starting_price: 290,
    price_vat_inclusive: false,
    pricing_note:
      "Intuit quotes South African prices excluding VAT and runs frequent introductory discounts. Check the discounted period length before committing.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Simple Start",
        price: 290,
        period: "month",
        vat_inclusive: false,
        description: "One user, full invoicing and VAT for a sole trader.",
        user_limit: "1 user",
        features: [
          "Unlimited invoices",
          "VAT tracking at 15%",
          "Bank feeds",
          "Receipt capture",
          "Basic reporting",
        ],
      },
      {
        name: "Essentials",
        price: 450,
        period: "month",
        vat_inclusive: false,
        description: "Adds bill management, multi currency and two more users.",
        user_limit: "3 users",
        popular: true,
        features: [
          "Everything in Simple Start",
          "Bill and supplier management",
          "Multi currency",
          "Time tracking",
          "Enhanced reporting",
        ],
      },
      {
        name: "Plus",
        price: 620,
        period: "month",
        vat_inclusive: false,
        description: "Adds inventory, project profitability and budgeting.",
        user_limit: "5 users",
        features: [
          "Everything in Essentials",
          "Inventory tracking",
          "Project profitability",
          "Budgeting",
          "Class and location tracking",
        ],
      },
    ],
    top_features: [
      "Reporting and budgeting well ahead of its price point",
      "The best mobile receipt capture in the category",
      "Multi currency from the middle tier",
      "Large global template and app ecosystem",
    ],
    features: [
      "Invoicing and quoting",
      "VAT tracking and VAT201 report",
      "Bank feeds",
      "Receipt capture with OCR",
      "Mileage tracking",
      "Bill and supplier management",
      "Multi currency",
      "Inventory tracking",
      "Project profitability",
      "Budgeting",
      "Class and location tracking",
      "Custom reports",
      "Mobile app for iOS and Android",
    ],
    integrations: [
      "SimplePay",
      "PayFast",
      "Yoco",
      "Shopify",
      "WooCommerce",
      "Stripe",
      "Zapier",
      "HubSpot",
      "Dext",
    ],
    compliance: [
      "VAT201 at 15%",
      "Zero rated and exempt supply handling",
      "Manual eFiling capture, no direct SARS transfer",
      "Limited IT14SD supporting detail",
      "POPIA operator agreement",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank"],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Business owner", "Bookkeeper"],
    vendor_name: "Intuit Inc.",
    vendor_website: "https://quickbooks.intuit.com/za/",
    founded_year: 1983,
    support_types: ["Telephone", "Live chat", "Email", "Knowledge base"],
    target_rating: 4.0,
    review_count: 268,
  }),

  defineSoftware({
    name: "Zoho Books",
    slug: "zoho-books",
    category_id: CATEGORY,
    tagline: "Extraordinary value, if you can live inside the Zoho ecosystem",
    description_short:
      "Zoho Books offers more functionality per rand than anything else on this list, with a free tier for very small businesses and a genuinely capable paid range.",
    description_full: `
      <p>Zoho Books is the value outlier in this category and it is not close. For roughly the price of the entry plan elsewhere you get functionality that the local incumbents put behind their top tier: full inventory, project billing, a client portal, recurring billing, automated payment reminders and a workflow engine that will do things the competition cannot do at any price.</p>
      <p>There is also a free plan, and unlike most free plans it is usable. Businesses below the revenue threshold get real invoicing, real bank reconciliation and real VAT tracking without paying anything. For a startup in its first year this is a serious option rather than a trap.</p>
      <h2>The catch</h2>
      <p>Zoho's design philosophy is that every business problem is a Zoho product, and Books is happiest when it sits next to Zoho CRM, Zoho Inventory and Zoho People. If you want to run Books alongside a non Zoho stack you can, and the integrations exist, but you are working against the grain and you will feel it.</p>
      <p>The second catch is the local accountant question. Very few South African practices are Zoho fluent. If you use an external accountant, ask them before you migrate. A cheaper system your accountant charges more to work in is not cheaper.</p>
      <h2>South African compliance</h2>
      <p>VAT is handled correctly at 15% with the right supply categories, and the VAT201 report is clean. As with Xero and QuickBooks, submission to eFiling is a manual capture. Bank feeds work for the major banks through a mix of direct connections and a third party aggregator, and the aggregator route is less reliable than a direct feed. Test it.</p>
      <h2>Who should buy it</h2>
      <p>Cost conscious businesses with an in house bookkeeper, anyone already using Zoho CRM, and product businesses that need real inventory without paying ERP prices. If your accountant is a Sage or Xero practice, factor in what they will charge to work outside their comfort zone.</p>
    `,
    starting_price: 0,
    price_vat_inclusive: false,
    pricing_note:
      "Zoho publishes rand pricing excluding VAT and discounts annual billing heavily. The free plan is limited by annual revenue rather than by feature crippling.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "For businesses under the published annual revenue threshold.",
        user_limit: "1 user plus 1 accountant",
        features: [
          "1 000 invoices a year",
          "Client portal",
          "Bank reconciliation",
          "VAT tracking",
          "Recurring invoices",
        ],
      },
      {
        name: "Standard",
        price: 380,
        period: "month",
        vat_inclusive: false,
        description: "The realistic starting point for a trading business.",
        user_limit: "3 users",
        popular: true,
        features: [
          "Everything in Free",
          "Bills and supplier credits",
          "Recurring expenses",
          "Project time tracking",
          "Custom reports",
          "Workflow rules",
        ],
      },
      {
        name: "Professional",
        price: 760,
        period: "month",
        vat_inclusive: false,
        description: "Adds full inventory, purchase orders and multi currency.",
        user_limit: "5 users",
        features: [
          "Everything in Standard",
          "Full inventory management",
          "Purchase orders and sales orders",
          "Multi currency",
          "Retainer invoices",
          "Custom domain for the client portal",
        ],
      },
      {
        name: "Premium",
        price: 1150,
        period: "month",
        vat_inclusive: false,
        description: "Adds a budgeting module, custom functions and vendor portal.",
        user_limit: "10 users",
        features: [
          "Everything in Professional",
          "Budgeting",
          "Custom functions and scripting",
          "Vendor portal",
          "Advanced multi currency handling",
        ],
      },
    ],
    top_features: [
      "The most functionality per rand in the category by a wide margin",
      "A free plan that is genuinely usable, not a demo",
      "Built in client portal at no extra cost",
      "A workflow engine competitors do not offer at any tier",
    ],
    features: [
      "Invoicing, quoting and retainers",
      "Client portal",
      "VAT tracking and VAT201 report",
      "Bank reconciliation",
      "Full inventory management",
      "Purchase and sales orders",
      "Project time tracking and billing",
      "Multi currency",
      "Recurring billing and payment reminders",
      "Workflow automation rules",
      "Custom functions with Deluge scripting",
      "Budgeting",
      "Vendor portal",
      "Mobile app for iOS and Android",
    ],
    integrations: [
      "Zoho CRM",
      "Zoho Inventory",
      "Zoho People",
      "SimplePay",
      "PayFast",
      "Stripe",
      "PayPal",
      "Shopify",
      "WooCommerce",
      "Zapier",
      "Slack",
    ],
    compliance: [
      "VAT201 at 15%",
      "Zero rated and exempt supply handling",
      "Manual eFiling capture, no direct SARS transfer",
      "POPIA operator agreement",
      "Data residency selectable by region",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank"],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Business owner", "Bookkeeper", "Operations manager"],
    vendor_name: "Zoho Corporation",
    vendor_website: "https://www.zoho.com/za/books/",
    founded_year: 1996,
    support_types: ["Email", "Live chat", "Telephone", "Knowledge base", "Community forum"],
    target_rating: 4.3,
    review_count: 224,
  }),

  defineSoftware({
    name: "Sage 50cloud Pastel",
    slug: "sage-50cloud-pastel",
    category_id: CATEGORY,
    tagline: "The desktop workhorse, still the right answer for some businesses",
    description_short:
      "Pastel remains a deep, fast desktop accounting package with cloud backup, and it is still the sensible choice for businesses with poor connectivity or heavy inventory.",
    description_full: `
      <p>Pastel has been the backbone of South African bookkeeping for three decades and the instinct to dismiss it as legacy is lazy. It is a desktop application with cloud backup rather than a true cloud product, and for a meaningful number of businesses that is a feature rather than a compromise.</p>
      <p>Consider a manufacturer in an industrial area on stage four load shedding with a marginal fibre connection. A cloud ledger stops when the line stops. Pastel keeps capturing, and syncs when the connection returns. That is not nostalgia, it is a real operational argument, and it is why the installed base has not collapsed the way it was predicted to.</p>
      <h2>Depth</h2>
      <p>Feature for feature Pastel is deeper than any cloud small business ledger in this list. Inventory handles multiple warehouses, serial and lot tracking, bill of materials and landed costs. Job costing is real. The report writer will produce almost anything, given someone who knows how to drive it. Businesses that have grown into it rarely find a cloud product that does everything they currently rely on.</p>
      <h2>The cost of that depth</h2>
      <p>It is not easy to learn. The interface follows conventions set long before modern UI patterns existed, and a bookkeeper coming from Xero will be slow for weeks. Remote access needs a hosted desktop or a VPN, which is an extra cost and an extra thing to break. Multi user setups need someone who understands the network, and there is a real support burden that cloud products simply do not have.</p>
      <p>Sage's own direction of travel is also a factor. Investment is going into the cloud products. Pastel is supported and updated for compliance, but it is not where the new features land, and buying it today means choosing a mature product rather than a growing one.</p>
      <h2>Who should buy it</h2>
      <p>Businesses with genuine inventory complexity, businesses with unreliable connectivity, and businesses whose finance team already knows Pastel and would lose more in retraining than they would gain in modernisation. Everyone else should look at Sage Accounting or Xero first.</p>
    `,
    starting_price: 1375,
    price_vat_inclusive: false,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Sage quotes Sage 50cloud Pastel excluding VAT, unlike Sage Accounting which it quotes including. Add 15% for the figure on your invoice. Extra users are R265 a month, and most of the useful modules are separate: Point of Sale R725, GL Manager R725, Advanced Reporting R650, Debtors Manager R595, and multi currency, multi warehouse, serial tracking, project billing and receipting at R460 each per month.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Start",
        price: 1375,
        period: "month",
        vat_inclusive: false,
        description: "The entry build, for a business with low administrative complexity.",
        user_limit: "2 users, 2 companies",
        features: [
          "Full general ledger",
          "Multi warehouse inventory",
          "Bill of materials",
          "VAT201 and SARS reporting",
          "Report writer",
          "Cloud backup",
        ],
      },
      {
        name: "Core",
        price: 1915,
        period: "month",
        vat_inclusive: false,
        description:
          "Adds supplier payments, recurring transactions and bespoke reporting as the finance function grows.",
        user_limit: "4 users, 4 companies",
        popular: true,
        features: [
          "Everything in Start",
          "Supplier payments",
          "Automatic discounts on invoices",
          "Recurring invoices and transactions",
          "Bespoke report builder",
          "Multiple companies, departments and budgets",
        ],
      },
      {
        name: "Plus",
        price: 2715,
        period: "month",
        vat_inclusive: false,
        description:
          "For a scaled business carrying complexity across multiple companies and branches.",
        user_limit: "Up to 5 users, 5 companies",
        features: [
          "Everything in Core",
          "Multi branch handling",
          "Higher user and company ceiling",
        ],
      },
    ],
    top_features: [
      "Works through load shedding and connection loss",
      "Multi warehouse inventory with serial, lot and bill of materials",
      "A report writer that will produce almost any layout",
      "Thirty years of trained South African operators",
    ],
    features: [
      "Full general ledger",
      "Multi warehouse inventory",
      "Serial and lot tracking",
      "Bill of materials",
      "Landed cost tracking",
      "Job costing",
      "VAT201 and SARS reporting",
      "Report writer",
      "Multi currency",
      "Fixed asset register",
      "Cloud backup and offsite storage",
      "Point of sale add on",
      "Multi company",
    ],
    integrations: [
      "Sage Pastel Payroll",
      "Sage Business Cloud Payroll",
      "Draftworx",
      "CaseWare",
      "Pastel Point of Sale",
      "Bank statement import for all major SA banks",
    ],
    compliance: [
      "VAT201 at 15%",
      "Zero rated and exempt supply handling",
      "IT14SD supporting schedules",
      "Annual statutory update releases",
      "Data held on premises, POPIA responsibility sits with you",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Bookkeeper", "Financial manager", "Accountant in practice"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/products/sage-50cloud-pastel/",
    founded_year: 1989,
    support_types: ["Telephone", "Email", "Partner network", "Knowledge base"],
    target_rating: 3.9,
    review_count: 331,
  }),

  defineSoftware({
    name: "Sage Intacct",
    slug: "sage-intacct",
    category_id: CATEGORY,
    tagline: "Serious multi entity financial management, priced accordingly",
    description_short:
      "Sage Intacct is a cloud financial management system for groups with multiple entities, currencies and consolidation requirements, sold on quotation rather than list price.",
    description_full: `
      <p>Intacct is not a small business ledger and should not be compared to one. It is a financial management system for organisations that consolidate, that operate across entities and currencies, and that have a finance team rather than a bookkeeper.</p>
      <p>The dimensional accounting model is the reason people buy it. Instead of building an ever longer general ledger account code to capture department, project, location and funding source, you tag transactions across dimensions and slice the reporting afterwards. Finance teams that have lived with a forty character account structure understand immediately why this matters.</p>
      <h2>Consolidation</h2>
      <p>Multi entity consolidation is where Intacct earns its price. Inter company eliminations, currency translation and a group level close that takes days rather than weeks. For a group with a South African operating company, a Mauritian holding structure and a Namibian subsidiary, this is the problem the product exists to solve.</p>
      <h2>Local reality</h2>
      <p>South African VAT is configured rather than native, which is normal at this tier and entirely workable with a competent implementation partner. There is no eFiling transfer. The local partner ecosystem is smaller than for Sage's mid market products, so partner selection deserves as much diligence as the software selection.</p>
      <h2>Cost</h2>
      <p>There is no list price and there will not be one. Expect a meaningful annual subscription plus an implementation that runs into six figures in rand. Anyone quoting you a number for Intacct without scoping your entity structure is guessing.</p>
      <h2>Who should buy it</h2>
      <p>Groups with three or more legal entities, organisations with a genuine consolidation burden, non profits with fund accounting requirements, and businesses whose finance function is being held back by a ledger that cannot report the way the board asks.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    pricing_note:
      "Quoted on scope. Budget for licence plus implementation, and expect implementation to be the larger number in year one.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description:
          "Priced on entity count, user count and modules. Implementation is quoted separately by the partner.",
        features: [
          "Core financials",
          "Dimensional accounting",
          "Multi entity consolidation",
          "Multi currency",
          "Optional modules for projects, revenue recognition and planning",
        ],
      },
    ],
    top_features: [
      "Dimensional accounting instead of an unmanageable account code",
      "Genuine multi entity consolidation with inter company eliminations",
      "Close cycles measured in days rather than weeks",
      "Strong audit and controls posture",
    ],
    features: [
      "Core financials",
      "Dimensional accounting",
      "Multi entity and multi currency consolidation",
      "Inter company eliminations",
      "Project accounting",
      "Revenue recognition",
      "Budgeting and planning",
      "Fixed assets",
      "Spend management",
      "Dashboards and board reporting",
      "Open API",
      "Role based access controls",
    ],
    integrations: [
      "Salesforce",
      "Sage HR",
      "PaySpace",
      "Avalara",
      "Expensify",
      "Power BI",
      "Open REST API",
    ],
    compliance: [
      "VAT configured at 15% by the implementation partner",
      "IFRS and IFRS for SMEs reporting",
      "SOX style audit controls",
      "POPIA operator agreement",
      "No direct SARS eFiling transfer",
    ],
    bank_feeds: ["Configured per bank during implementation"],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "500 plus employees"],
    best_for_role: ["Financial manager", "Group financial director", "Finance systems lead"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/sage-business-cloud/intacct/",
    founded_year: 1999,
    support_types: ["Partner network", "Telephone", "Email", "Dedicated success manager"],
    target_rating: 4.4,
    review_count: 96,
  }),

  defineSoftware({
    name: "FreshBooks",
    slug: "freshbooks",
    category_id: CATEGORY,
    tagline: "Excellent for billing time, weak as a South African ledger",
    description_short:
      "FreshBooks is the best invoicing and time billing experience available, but it is billed in US dollars and does not carry South African VAT compliance.",
    description_full: `
      <p>FreshBooks is built for people who sell their hours. Consultants, designers, developers, small agencies. The time tracking to invoice pipeline is the smoothest in this entire list, the invoices are the best looking, and the payment chasing is polite and automatic in a way that materially improves how quickly freelancers get paid.</p>
      <p>We include it because a lot of South African independents use it and like it. We rank it where we do because as a South African accounting system it has real gaps that you should understand before committing.</p>
      <h2>The compliance gap</h2>
      <p>There is no South African VAT module. You can add a tax at 15% and label it VAT, and the invoices will look right, but there is no VAT201 report, no supply category handling and no accountant workflow built for SARS. If you are VAT registered, your bookkeeper will be building the return outside the system every two months.</p>
      <p>Bank feeds for South African banks are limited to a third party aggregator where they work at all, and reconciliation is not a strength.</p>
      <h2>Currency</h2>
      <p>Billing is in US dollars. That means the cost moves with the rand and carries a card forex fee. At the entry tier the difference between a good month and a bad month for the currency is meaningful over a year, and it should be budgeted as a variable cost rather than a fixed one.</p>
      <h2>Who should buy it</h2>
      <p>Sole traders and micro consultancies below the VAT registration threshold who bill by the hour and want to get paid faster. If you are VAT registered, or you carry stock, or you need a proper ledger for an accountant, look at Zoho Books or Sage Accounting instead.</p>
    `,
    starting_price: 21,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars, so the rand cost moves with the exchange rate and carries a card forex fee. There is no South African VAT201 support.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Lite",
        price: 21,
        period: "month",
        vat_inclusive: false,
        description: "Five billable clients, unlimited invoices, time tracking.",
        user_limit: "1 user",
        features: [
          "5 billable clients",
          "Unlimited invoices",
          "Time tracking",
          "Expense capture",
          "Online payment links",
        ],
      },
      {
        name: "Plus",
        price: 38,
        period: "month",
        vat_inclusive: false,
        description: "Fifty billable clients, recurring billing, proposals.",
        user_limit: "1 user, additional seats charged separately",
        popular: true,
        features: [
          "50 billable clients",
          "Recurring invoices",
          "Proposals",
          "Client retainers",
          "Accountant access",
        ],
      },
      {
        name: "Premium",
        price: 65,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited clients, project profitability, deeper reporting.",
        user_limit: "1 user, additional seats charged separately",
        features: [
          "Unlimited billable clients",
          "Project profitability",
          "Customised email templates",
          "Advanced payment options",
        ],
      },
    ],
    top_features: [
      "The smoothest time tracking to invoice workflow available",
      "Invoices that genuinely look professional without design work",
      "Automatic, well judged payment reminders",
      "Very low learning curve",
    ],
    features: [
      "Time tracking",
      "Invoicing and estimates",
      "Proposals",
      "Client retainers",
      "Expense capture",
      "Online payments",
      "Project profitability",
      "Mileage tracking",
      "Accountant access",
      "Mobile app for iOS and Android",
    ],
    integrations: ["Stripe", "PayPal", "Gusto", "Zapier", "Trello", "Asana", "Slack"],
    compliance: [
      "No VAT201 support",
      "Generic tax rate configuration only",
      "No SARS eFiling workflow",
      "Data hosted outside South Africa",
    ],
    bank_feeds: ["Limited third party aggregator coverage"],
    best_for_size: ["Sole trader", "2 to 10 employees"],
    best_for_role: ["Freelancer", "Consultant", "Agency owner"],
    vendor_name: "FreshBooks",
    vendor_website: "https://www.freshbooks.com/",
    founded_year: 2003,
    support_types: ["Telephone", "Email", "Live chat", "Knowledge base"],
    target_rating: 3.7,
    review_count: 148,
  }),

  defineSoftware({
    name: "Wave Accounting",
    slug: "wave-accounting",
    category_id: CATEGORY,
    tagline: "Free, and you will feel every reason why",
    description_short:
      "Wave gives you a free double entry ledger with no user limits, but there is no South African VAT support, no local bank feeds and no telephone help.",
    description_full: `
      <p>Wave is a real double entry accounting system that costs nothing. That is not a marketing claim with an asterisk, the core ledger genuinely is free, funded by payment processing and payroll in the markets where those products are offered.</p>
      <p>For a South African business the honest assessment is that free is the entire argument, and it is a weaker argument than it first appears.</p>
      <h2>What you do not get</h2>
      <p>There is no South African VAT handling. You can create a 15% sales tax, but there is no VAT201 report and no supply category treatment, so a VAT registered business is doing the return by hand. There are no South African bank feeds, so every statement is a manual import. There is no telephone support on the free product, and the paid support tier is priced in US dollars.</p>
      <p>Multi currency is not supported in any useful sense, which rules out anyone invoicing outside the rand.</p>
      <h2>What you do get</h2>
      <p>A clean, genuinely double entry general ledger. Unlimited invoices, unlimited users, unlimited transactions. Decent invoice templates. Basic financial statements that an accountant can work from. For a business below the VAT threshold, banking with one account, invoicing in rand only, this is enough, and enough for free is a real proposition.</p>
      <h2>Who should buy it</h2>
      <p>Pre revenue startups, side businesses, non profits with tiny budgets, and anyone who needs a legitimate set of books without a monthly cost. Plan to migrate the moment you register for VAT, because at that point Wave stops being free and starts costing you your bookkeeper's time.</p>
    `,
    starting_price: 0,
    price_vat_inclusive: false,
    pricing_note:
      "The ledger is free. Paid add ons are priced in US dollars and the payroll and payments products are not available in South Africa.",
    free_version: true,
    pricing_plans: [
      {
        name: "Starter",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "The free double entry ledger with unlimited invoices and users.",
        user_limit: "Unlimited users",
        popular: true,
        features: [
          "Unlimited invoices",
          "Unlimited users",
          "Double entry general ledger",
          "Financial statements",
          "Manual statement import",
        ],
      },
      {
        name: "Pro",
        price: 16,
        period: "month",
        vat_inclusive: false,
        description: "Adds receipt capture and priority email support, billed in US dollars.",
        user_limit: "Unlimited users",
        features: [
          "Everything in Starter",
          "Receipt capture with OCR",
          "Automatic recurring invoices",
          "Priority email support",
        ],
      },
    ],
    top_features: [
      "A genuine double entry ledger at no cost",
      "No user limit, ever",
      "Unlimited invoices on the free plan",
      "Clean, uncluttered interface",
    ],
    features: [
      "Double entry general ledger",
      "Unlimited invoicing",
      "Unlimited users",
      "Manual bank statement import",
      "Financial statements",
      "Recurring invoices on the paid tier",
      "Receipt capture on the paid tier",
    ],
    integrations: ["Stripe", "PayPal", "Zapier", "Etsy"],
    compliance: [
      "No VAT201 support",
      "Generic sales tax configuration only",
      "No SARS workflow",
      "No local data residency",
    ],
    bank_feeds: ["None for South African banks, manual import only"],
    best_for_size: ["Sole trader", "2 to 10 employees"],
    best_for_role: ["Freelancer", "Startup founder", "Non profit administrator"],
    vendor_name: "Wave Financial Inc.",
    vendor_website: "https://www.waveapps.com/",
    founded_year: 2010,
    support_types: ["Email", "Knowledge base", "Community forum"],
    target_rating: 3.4,
    review_count: 117,
  }),
];
