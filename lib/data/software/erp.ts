import { defineSoftware } from "./define";
import { SAGE_AFFILIATE_URL } from "@/lib/affiliates";

const CATEGORY = "cat-erp";

export const ERP_SOFTWARE = [
  defineSoftware({
    name: "Sage 200 Evolution",
    slug: "sage-200-evolution",
    category_id: CATEGORY,
    tagline: "The South African mid market default, and the largest local partner base",
    description_short:
      "Sage 200 Evolution is the most widely implemented mid market ERP in South Africa, with local statutory reporting built in and partners in every major centre.",
    description_full: `
      <p>Evolution is where South African businesses go when Pastel stops coping. It is a genuine mid market ERP: full financials, multi warehouse inventory, manufacturing, point of sale, job costing and business intelligence, built for this market and maintained against local statutory requirements.</p>
      <p>The single biggest argument for it is the partner base. There are implementation partners in Johannesburg, Cape Town, Durban, Gqeberha, Bloemfontein and most industrial centres, which means you can find someone competent nearby and you are not dependent on one relationship. In this category that is worth more than a feature comparison.</p>
      <h2>Fit</h2>
      <p>It suits distribution, light manufacturing, wholesale and multi branch retail particularly well. Multi warehouse handling is strong, the inventory model supports serial, lot, bill of materials and landed cost, and branch level reporting works without heroics. Multi company consolidation is available and used widely by groups.</p>
      <h2>Statutory work</h2>
      <p>VAT201 at 15% with correct supply treatment, IT14SD supporting schedules, and reporting shaped for South African audit expectations. Annual compliance updates arrive on time. This is the area where local products earn their keep against international mid market ERPs, and Evolution does it well.</p>
      <h2>The honest criticisms</h2>
      <p>It is a Windows application with a browser add on rather than a cloud native product, and it feels that way. Remote access generally means a hosted desktop. The interface is dense and dated, and the learning curve for a new user is weeks rather than days.</p>
      <p>Implementation quality varies enormously by partner. The same software delivers a smooth go live with one firm and a nine month ordeal with another. Reference check the partner harder than you reference check the software.</p>
      <h2>Cost</h2>
      <p>Licensed per module and per user, quoted through a partner. Implementation typically exceeds first year licence cost. Budget for data migration, training and a support retainer.</p>
      <h2>Who should buy it</h2>
      <p>Distribution, wholesale, light manufacturing and multi branch businesses between roughly thirty and five hundred staff who have outgrown a small business ledger and want a system with local depth and local support.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Licensed per module and per user through a Sage partner. Implementation usually exceeds the first year licence cost, so budget the total rather than the licence.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description: "Priced on modules, users and implementation scope through a partner.",
        features: [
          "Core financials",
          "Multi warehouse inventory",
          "Manufacturing and bill of materials",
          "Job costing",
          "Point of sale",
          "Business intelligence",
        ],
      },
    ],
    top_features: [
      "The largest ERP implementation partner base in South Africa",
      "Local statutory reporting maintained by the vendor",
      "Strong multi warehouse and multi branch handling",
      "Manufacturing and bill of materials without moving up a tier",
    ],
    features: [
      "Full general ledger and financials",
      "Multi warehouse inventory",
      "Serial and lot tracking",
      "Bill of materials and manufacturing",
      "Landed cost tracking",
      "Job costing",
      "Point of sale",
      "Multi company and consolidation",
      "Branch accounting",
      "Fixed assets",
      "Business intelligence",
      "VAT201 and SARS reporting",
      "Debtors and creditors management",
      "Procurement and purchase requisitions",
    ],
    integrations: [
      "Sage Pastel Payroll",
      "Sage Payroll",
      "PaySpace",
      "Sage CRM",
      "Power BI",
      "EDI connectors",
      "Bank statement import",
    ],
    compliance: [
      "VAT201 at 15%",
      "IT14SD supporting schedules",
      "Zero rated and exempt supply handling",
      "Annual statutory update releases",
      "On premises deployment keeps data in South Africa",
    ],
    bank_feeds: ["Absa", "FNB", "Standard Bank", "Nedbank", "Capitec"],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "11 to 50 employees"],
    best_for_role: ["Financial manager", "Operations director", "Supply chain manager"],
    vendor_name: "Sage Group plc",
    affiliate_url: SAGE_AFFILIATE_URL,
    vendor_website: "https://www.sage.com/en-za/products/sage-200-evolution/",
    founded_year: 2002,
    support_types: ["Partner network", "Telephone", "Email", "On site training"],
    target_rating: 4.0,
    review_count: 284,
    featured: true,
  }),

  defineSoftware({
    name: "Odoo",
    slug: "odoo",
    category_id: CATEGORY,
    tagline: "Open source ERP with a genuinely modular price",
    description_short:
      "Odoo covers almost every business function in one open source suite, at a fraction of traditional ERP licence cost, provided you can support it properly.",
    description_full: `
      <p>Odoo is the most interesting product in this category because it breaks the usual ERP price model. It is open source, the paid edition is priced per user with all applications included, and there is a genuinely free community edition. A business that would be quoted a seven figure implementation for a traditional ERP can often get to production on Odoo for a fraction of that.</p>
      <p>It covers a remarkable surface area: accounting, inventory, manufacturing, purchasing, sales, CRM, project management, timesheets, field service, ecommerce, point of sale, HR and more. Modules install in minutes and share one database, so the data model is genuinely integrated rather than interfaced.</p>
      <h2>The South African position</h2>
      <p>VAT at 15% is configured rather than native, and it works well once set up. There is a growing local partner community, particularly in Johannesburg and Cape Town, and several partners maintain South African localisation modules covering VAT201 layouts and local chart of accounts templates. Payroll localisation is the weak spot and most South African implementations run payroll in SimplePay or PaySpace and post journals across.</p>
      <h2>The catch</h2>
      <p>Odoo transfers cost from licence to expertise. It needs someone who understands it, either in house or on retainer. Version upgrades are real projects, particularly where custom modules are involved, and businesses that customise heavily can find themselves effectively frozen on an old version.</p>
      <p>The community edition is free in licence terms only. Hosting, maintenance, security patching and support are all yours.</p>
      <h2>Where it excels</h2>
      <p>Manufacturing is unusually strong for the price, with work orders, routings, quality checks and maintenance. Inventory handles multi warehouse, lots, serials and putaway strategies. Ecommerce integrated with stock and accounting in one system is a real advantage for retail.</p>
      <h2>Who should buy it</h2>
      <p>Manufacturers and distributors between twenty and three hundred staff who want ERP capability without ERP pricing, and who have or will build the internal capacity to support it. Businesses that want to buy a system and forget about it should look at Evolution instead.</p>
    `,
    starting_price: 380,
    price_vat_inclusive: false,
    pricing_note:
      "The Standard and Custom plans are priced per user per month with all applications included. The community edition is free to licence, and you carry hosting, maintenance and support yourself.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Community",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Open source, self hosted. Free to licence, not free to run.",
        user_limit: "Unlimited users",
        features: [
          "Core accounting, inventory, sales and purchasing",
          "Manufacturing",
          "Project management",
          "Self hosted",
          "Community support only",
        ],
      },
      {
        name: "Standard",
        price: 380,
        period: "month",
        vat_inclusive: false,
        description: "Per user per month, hosted by Odoo, all applications included.",
        user_limit: "Per user",
        popular: true,
        features: [
          "All Odoo applications",
          "Hosted on Odoo Online",
          "Automatic upgrades",
          "Vendor support included",
          "No custom code",
        ],
      },
      {
        name: "Custom",
        price: 580,
        period: "month",
        vat_inclusive: false,
        description: "Adds custom development, external API and multi company.",
        user_limit: "Per user",
        features: [
          "Everything in Standard",
          "Custom modules and code",
          "External API access",
          "Multi company",
          "Odoo Studio",
          "Developer and staging environments",
        ],
      },
    ],
    top_features: [
      "One licence covering every application rather than module by module pricing",
      "Manufacturing depth well beyond its price point",
      "Integrated ecommerce, stock and accounting in a single database",
      "A free community edition for businesses that can self host",
    ],
    features: [
      "Accounting and financials",
      "Multi warehouse inventory",
      "Manufacturing with work orders and routings",
      "Quality control and maintenance",
      "Purchasing and procurement",
      "Sales and CRM",
      "Ecommerce and point of sale",
      "Project management and timesheets",
      "Field service",
      "Multi company",
      "Studio low code customisation",
      "Open source codebase",
      "REST and XML-RPC APIs",
    ],
    integrations: [
      "SimplePay",
      "PaySpace",
      "PayFast",
      "Yoco",
      "Shopify",
      "WooCommerce",
      "Microsoft 365",
      "Google Workspace",
      "Open API",
    ],
    compliance: [
      "VAT201 through a South African localisation module",
      "Chart of accounts templates for South Africa",
      "No native South African payroll, journal posting from SimplePay or PaySpace",
      "Self hosting allows full South African data residency",
    ],
    bank_feeds: ["Statement import, direct feeds through third party connectors"],
    best_for_size: ["11 to 50 employees", "51 to 200 employees", "201 to 500 employees"],
    best_for_role: ["Operations director", "Financial manager", "Systems manager"],
    vendor_name: "Odoo SA",
    vendor_website: "https://www.odoo.com/",
    founded_year: 2005,
    support_types: ["Partner network", "Email", "Community forum", "Documentation", "Odoo support"],
    target_rating: 4.2,
    review_count: 231,
  }),

  defineSoftware({
    name: "SYSPRO",
    slug: "syspro",
    category_id: CATEGORY,
    tagline: "South African built ERP for manufacturers and distributors",
    description_short:
      "SYSPRO is a South African founded manufacturing and distribution ERP with deep production capability and a long established local support network.",
    description_full: `
      <p>SYSPRO was founded in Johannesburg in 1978 and remains one of the few genuinely South African enterprise software products with an international footprint. For manufacturers, that origin story matters practically: the product understands local statutory requirements, the support is local, and the consultants have seen South African factories.</p>
      <p>It is specialised rather than general. SYSPRO is built for manufacturing and distribution, and if you are neither of those things you should be looking elsewhere.</p>
      <h2>Manufacturing depth</h2>
      <p>This is where it earns its place. Bill of materials with multiple levels, work in progress tracking, capacity planning, shop floor data collection, lot traceability from raw material to finished goods, and quality management. Businesses in food, pharmaceutical and automotive supply chains rely on the traceability specifically because a recall has to be provable.</p>
      <p>Material requirements planning is mature, and the forecasting is credible rather than decorative.</p>
      <h2>Distribution</h2>
      <p>Multi warehouse, landed cost tracking that handles the full import chain including duty and clearing, consignment stock and branch replenishment. For an importer, the landed cost handling alone is a strong argument, because getting true cost of imported stock wrong distorts every margin in the business.</p>
      <h2>The trade offs</h2>
      <p>The interface is functional and dated. Implementation is a substantial project measured in months and requires a competent partner. Cost is quoted, and the total across licence, implementation, training and support is a serious capital decision.</p>
      <p>It is also less flexible than a modern cloud ERP for businesses whose processes do not look like manufacturing. Bending it to fit an unusual model is expensive.</p>
      <h2>Who should buy it</h2>
      <p>Manufacturers and importing distributors from roughly fifty staff upwards, particularly those with traceability obligations or complex landed cost calculations. It is a specialist tool and it rewards being used for what it was built for.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    pricing_note:
      "Quoted on users, modules and deployment. Implementation runs into months and should be budgeted as a capital project.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description: "Priced on user count, modules and deployment model through a partner.",
        features: [
          "Manufacturing and MRP",
          "Multi warehouse distribution",
          "Landed cost tracking",
          "Lot and serial traceability",
          "Quality management",
          "Financials",
        ],
      },
    ],
    top_features: [
      "Lot traceability from raw material to finished goods",
      "Landed cost handling that covers the full import chain",
      "Mature material requirements planning",
      "South African founded, with local consultants and support",
    ],
    features: [
      "Multi level bill of materials",
      "Work in progress tracking",
      "Material requirements planning",
      "Capacity planning",
      "Shop floor data collection",
      "Lot and serial traceability",
      "Quality management",
      "Multi warehouse inventory",
      "Landed cost tracking",
      "Consignment stock",
      "Financials and fixed assets",
      "Business intelligence",
      "Cloud or on premises deployment",
    ],
    integrations: ["PaySpace", "Sage Pastel Payroll", "Salesforce", "Power BI", "EDI", "Open API"],
    compliance: [
      "VAT201 at 15%",
      "IT14SD supporting schedules",
      "SARS aligned reporting",
      "On premises deployment keeps data in South Africa",
      "Full audit trail",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "500 plus employees"],
    best_for_role: ["Operations director", "Production manager", "Supply chain manager"],
    vendor_name: "SYSPRO",
    vendor_website: "https://www.syspro.com/",
    founded_year: 1978,
    support_types: ["Partner network", "Telephone", "Email", "On site consulting", "Training"],
    target_rating: 4.1,
    review_count: 164,
  }),

  defineSoftware({
    name: "SAP Business One",
    slug: "sap-business-one",
    category_id: CATEGORY,
    tagline: "The SAP name at mid market scale, with mid market implementation risk",
    description_short:
      "SAP Business One brings SAP's discipline to smaller businesses, with strong financials and a wide partner network, though localisation depends on the partner.",
    description_full: `
      <p>Business One is SAP's product for companies well below the scale of S/4HANA. It carries the SAP name, the SAP data discipline and a global partner network, and it is a legitimate mid market ERP rather than a cut down version of something larger.</p>
      <p>For South African subsidiaries of international groups it is often the group standard, and the local question is implementation rather than selection.</p>
      <h2>Strengths</h2>
      <p>Financials are rigorous. The audit trail is complete, the controls are strong, and it produces the kind of reporting that satisfies a group finance function and an external auditor without argument. Inventory and production are solid. Analytics through the HANA edition are genuinely fast on large datasets.</p>
      <p>The global partner network means support wherever the group operates, which matters for a business with operations across several countries.</p>
      <h2>The localisation question</h2>
      <p>South African VAT201, IT14SD support and local statutory reporting come through localisation packages maintained by partners rather than by SAP directly. Quality varies. This is the single most important thing to interrogate during selection: ask the partner to demonstrate a VAT201 from live data, not a slide.</p>
      <h2>Cost and complexity</h2>
      <p>Licensing is per user with professional and limited user types, quoted through the partner. Implementation is a project of several months. The system rewards being implemented properly and punishes shortcuts, and the most common failure mode we see in reviews is an under scoped implementation followed by two years of workarounds.</p>
      <h2>Who should buy it</h2>
      <p>South African subsidiaries of international groups, businesses with strong governance requirements, and manufacturers or distributors between one hundred and one thousand staff who want a globally supported platform. Confirm the local statutory reporting before signing anything.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    pricing_note:
      "Quoted per user through an SAP partner, with professional and limited user types priced differently. South African statutory reporting comes from partner maintained localisation.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description: "Priced per named user by type, plus implementation and annual maintenance.",
        features: [
          "Financials and controlling",
          "Inventory and production",
          "Purchasing and sales",
          "Business intelligence with HANA",
          "Partner maintained South African localisation",
        ],
      },
    ],
    top_features: [
      "Financial controls and audit trail that satisfy group finance",
      "Global partner network for multi country groups",
      "Fast analytics on large datasets through the HANA edition",
      "Rigorous data model that resists bad practice",
    ],
    features: [
      "General ledger and financials",
      "Cost centres and profit centres",
      "Inventory and warehouse management",
      "Production and bill of materials",
      "Material requirements planning",
      "Purchasing and sales",
      "Service management",
      "Fixed assets",
      "Business intelligence with HANA",
      "Multi currency and multi company",
      "Extensive audit trail",
      "Open API and integration framework",
    ],
    integrations: ["PaySpace", "Salesforce", "Power BI", "EDI", "SAP ecosystem", "Open API"],
    compliance: [
      "VAT201 through partner maintained localisation",
      "IT14SD support depends on the localisation package",
      "IFRS reporting",
      "Full audit trail and controls",
      "Cloud or on premises deployment",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "500 plus employees"],
    best_for_role: ["Financial manager", "Group financial director", "Operations director"],
    vendor_name: "SAP SE",
    vendor_website: "https://www.sap.com/africa/products/erp/business-one.html",
    founded_year: 1972,
    support_types: ["Partner network", "Telephone", "Email", "SAP support portal"],
    target_rating: 3.9,
    review_count: 178,
  }),

  defineSoftware({
    name: "Acumatica",
    slug: "acumatica",
    category_id: CATEGORY,
    tagline: "Cloud ERP with unlimited users, priced on resources instead",
    description_short:
      "Acumatica charges for computing resources rather than per user, which changes the economics for businesses that need many light users.",
    description_full: `
      <p>Acumatica's licensing model is the reason it belongs on this list. Instead of charging per user, it charges for the transaction volume and resources you consume, and gives you unlimited users. For a business where fifty people need to look something up and five people do the real work, that inverts the usual ERP cost calculation.</p>
      <p>Warehouse staff, field technicians, branch managers and sales people can all have access without a licence conversation every time someone joins.</p>
      <h2>The product</h2>
      <p>Cloud native, genuinely so, with a modern browser interface and a proper mobile application. Financials, distribution, manufacturing, project accounting, field service and construction editions are all available. The customisation platform is well designed and lets a competent partner build real extensions without forking the product.</p>
      <p>The API is comprehensive, which makes it a good choice for a business that intends to integrate rather than to buy everything from one vendor.</p>
      <h2>The South African reality</h2>
      <p>This is the caution. The local partner ecosystem is small. There are capable Acumatica partners in South Africa but not many, and your choice of implementer is narrow. South African VAT and statutory reporting are configured by the partner rather than shipped, so the partner's local experience matters enormously.</p>
      <p>Pricing is in dollars and quoted on resource tier, which is harder to budget than a per user figure until you have a year of history.</p>
      <h2>Who should buy it</h2>
      <p>Businesses with many occasional users, particularly distribution, field service and construction. Companies that want a cloud native ERP with a real API. Buyers who have found a South African partner they trust, because that is the deciding factor here more than in any other product on this page.</p>
    `,
    starting_price: null,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Priced on computing resources and modules rather than per user, quoted in US dollars through a partner. Unlimited users is included at every tier.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description: "Priced on transaction volume, modules and resource tier. Unlimited users.",
        features: [
          "Unlimited users at every tier",
          "Financials and distribution",
          "Manufacturing edition",
          "Project accounting",
          "Field service",
          "Full REST API",
        ],
      },
    ],
    top_features: [
      "Unlimited users, priced on resources instead of seats",
      "Cloud native with a browser interface that was designed this decade",
      "Comprehensive REST API for businesses that intend to integrate",
      "Customisation platform that survives version upgrades",
    ],
    features: [
      "General ledger and financials",
      "Multi warehouse distribution",
      "Manufacturing with MRP",
      "Project accounting",
      "Field service management",
      "Construction edition",
      "Customer management",
      "Multi entity and multi currency",
      "Unlimited users",
      "Customisation platform",
      "Full REST API",
      "Mobile application",
    ],
    integrations: ["Salesforce", "Shopify", "BigCommerce", "Power BI", "Avalara", "Open REST API"],
    compliance: [
      "VAT configured at 15% by the implementation partner",
      "IFRS reporting",
      "Audit trail and role based controls",
      "Data hosted outside South Africa unless privately deployed",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees"],
    best_for_role: ["Financial manager", "Operations director", "Systems manager"],
    vendor_name: "Acumatica Inc.",
    vendor_website: "https://www.acumatica.com/",
    founded_year: 2008,
    support_types: ["Partner network", "Email", "Community", "Documentation"],
    target_rating: 4.2,
    review_count: 92,
  }),

  defineSoftware({
    name: "NetSuite",
    slug: "netsuite",
    category_id: CATEGORY,
    tagline: "Mature cloud ERP for groups, with a renewal conversation to plan for",
    description_short:
      "NetSuite is the most established cloud ERP available, strong on multi entity consolidation and reporting, with pricing and renewals that require careful management.",
    description_full: `
      <p>NetSuite has been a cloud ERP since before that was a category, and the maturity shows. Multi subsidiary consolidation, multi currency, revenue recognition and reporting are all genuinely good, and for a group with entities in several countries it solves the consolidation problem properly.</p>
      <p>It is a serious platform and it is sold seriously. Expect a structured sales process, an annual contract and a renewal that will be negotiated rather than renewed.</p>
      <h2>Where it is strong</h2>
      <p>OneWorld, the multi subsidiary module, handles consolidation, inter company elimination and currency translation cleanly across entities and jurisdictions. For a South African group with a Mauritian holding company and operations in three countries, that is the problem worth paying to solve.</p>
      <p>Reporting and the saved search engine are powerful, once someone learns them. Financial controls and audit trails are strong. The SuiteCloud platform allows real customisation.</p>
      <h2>Where buyers get hurt</h2>
      <p>Cost management. The base licence is only the beginning: each module, each additional user, sandbox environments and premium support all add. The renewal is where this becomes visible, and uplift at renewal is the most consistent complaint in our review set. Negotiate multi year terms with capped increases at the outset rather than discovering the position in year two.</p>
      <p>Implementation is a project of several months. South African statutory reporting is configured by the partner rather than shipped, and the local partner ecosystem is small.</p>
      <h2>Who should buy it</h2>
      <p>Groups with multiple legal entities and a real consolidation burden, particularly those operating across borders. Businesses with a single South African entity will generally find Evolution or Acumatica better value.</p>
    `,
    starting_price: null,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Annual contract quoted in US dollars on modules and user count. Negotiate multi year terms with capped renewal increases before signing.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description: "Base platform plus modules plus users, on an annual contract.",
        features: [
          "Core financials",
          "OneWorld multi subsidiary consolidation",
          "Multi currency",
          "Revenue recognition",
          "SuiteAnalytics reporting",
          "SuiteCloud customisation platform",
        ],
      },
    ],
    top_features: [
      "Multi subsidiary consolidation with inter company elimination",
      "Revenue recognition that satisfies IFRS 15 without spreadsheets",
      "The most mature cloud ERP platform available",
      "Saved search and reporting engine with real depth",
    ],
    features: [
      "General ledger and financials",
      "Multi subsidiary consolidation",
      "Multi currency and multi jurisdiction",
      "Revenue recognition",
      "Order and billing management",
      "Inventory and warehouse management",
      "Procurement",
      "Project accounting",
      "SuiteAnalytics reporting",
      "SuiteCloud customisation platform",
      "Audit trail and controls",
      "Open API",
    ],
    integrations: ["Salesforce", "Shopify", "Avalara", "Power BI", "Boomi", "Open REST API"],
    compliance: [
      "VAT configured at 15% by the implementation partner",
      "IFRS and IFRS 15 revenue recognition",
      "Strong audit trail and segregation of duties",
      "Data hosted outside South Africa",
    ],
    best_for_size: ["201 to 500 employees", "500 plus employees", "51 to 200 employees"],
    best_for_role: ["Group financial director", "Financial manager", "Finance systems lead"],
    vendor_name: "Oracle NetSuite",
    vendor_website: "https://www.netsuite.com/",
    founded_year: 1998,
    support_types: ["Partner network", "Telephone", "Email", "SuiteAnswers knowledge base"],
    target_rating: 3.8,
    review_count: 141,
  }),

  defineSoftware({
    name: "Sage X3",
    slug: "sage-x3",
    category_id: CATEGORY,
    tagline: "Sage's upper mid market ERP for process manufacturing and distribution",
    description_short:
      "Sage X3 sits above Evolution, aimed at larger manufacturers and distributors with multi site, multi country and process manufacturing requirements.",
    description_full: `
      <p>X3 is Sage's answer for businesses that have outgrown Evolution but do not want SAP pricing. It is aimed at the upper mid market: multi site manufacturers, process industries, larger distributors and businesses operating across several countries.</p>
      <p>The strongest fit is process manufacturing, which is a genuinely different problem to discrete manufacturing. Formulas and recipes rather than bills of material, yield variance, potency and grade handling, co products and by products, and batch traceability. Food, beverage, chemical and pharmaceutical manufacturers need this and most mid market ERPs cannot do it.</p>
      <h2>Capability</h2>
      <p>Multi site, multi company, multi currency and multi legislation in one instance. Quality control integrated into production rather than bolted on. Warehouse management with directed putaway and picking. Financials with proper multi legislation support, so a group operating in South Africa, Kenya and Mauritius runs one system.</p>
      <h2>Cost and effort</h2>
      <p>This is a substantial commitment. Licensing is quoted, implementation runs six to twelve months for a typical mid market manufacturer, and the partner relationship will last years. The South African partner base for X3 is smaller than for Evolution but the firms in it are specialised.</p>
      <p>Total cost of ownership sits meaningfully above Evolution and meaningfully below a tier one ERP, which is exactly the space it is designed for.</p>
      <h2>The criticisms</h2>
      <p>The interface, consistently. It is dense and dated even by ERP standards, and user training is a real line item. Configuration is complex enough that changes generally need the partner rather than an internal administrator, which creates an ongoing dependency and an ongoing cost.</p>
      <h2>Who should buy it</h2>
      <p>Process manufacturers, multi site operations, and groups running across several African jurisdictions who need one system with real manufacturing depth. Discrete manufacturers below two hundred staff should look hard at Evolution first.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Quoted on users, modules and deployment through a specialised Sage partner. Implementation typically runs six to twelve months.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "year",
        vat_inclusive: false,
        description: "Priced on user count, modules, sites and deployment model.",
        features: [
          "Process and discrete manufacturing",
          "Multi site and multi legislation",
          "Warehouse management",
          "Quality control",
          "Financials and consolidation",
        ],
      },
    ],
    top_features: [
      "Process manufacturing with formulas, yield, potency and grade",
      "Batch traceability built for food, beverage and pharmaceutical audit",
      "Multi legislation financials in one instance across African jurisdictions",
      "Warehouse management with directed putaway and picking",
    ],
    features: [
      "Process and discrete manufacturing",
      "Formula and recipe management",
      "Co product and by product handling",
      "Batch and lot traceability",
      "Quality control integrated into production",
      "Warehouse management",
      "Multi site, multi company and multi currency",
      "Multi legislation financials",
      "Procurement",
      "Sales and customer service",
      "Business intelligence",
      "Cloud or on premises deployment",
    ],
    integrations: ["PaySpace", "Sage HR", "Salesforce", "Power BI", "EDI", "Open API"],
    compliance: [
      "VAT201 at 15%",
      "Multi legislation statutory reporting across African jurisdictions",
      "IFRS reporting",
      "Batch traceability for regulated industries",
      "Cloud or on premises deployment",
    ],
    best_for_size: ["201 to 500 employees", "500 plus employees", "51 to 200 employees"],
    best_for_role: ["Operations director", "Production manager", "Group financial director"],
    vendor_name: "Sage Group plc",
    affiliate_url: SAGE_AFFILIATE_URL,
    vendor_website: "https://www.sage.com/en-za/sage-business-cloud/sage-x3/",
    founded_year: 1979,
    support_types: ["Partner network", "Telephone", "Email", "On site consulting"],
    target_rating: 3.9,
    review_count: 118,
  }),
];
