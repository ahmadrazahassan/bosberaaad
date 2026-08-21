import { defineSoftware } from "./define";

const CATEGORY = "cat-crm";

export const CRM_SOFTWARE = [
  defineSoftware({
    name: "Zoho CRM",
    slug: "zoho-crm",
    category_id: CATEGORY,
    tagline: "The most capable CRM per rand, with real rand pricing",
    description_short:
      "Zoho CRM is priced in rand, carries functionality that competitors charge three times as much for, and is the pragmatic choice for most South African sales teams.",
    description_full: `
      <p>Zoho CRM is the value leader in this category and the gap is not small. Workflow automation, custom modules, territory management, forecasting and a scripting layer are all available at price points where Salesforce is still selling you the entry edition.</p>
      <p>Crucially for a South African buyer, Zoho publishes rand pricing and bills in rand. That removes the exchange rate exposure that makes budgeting for Salesforce or HubSpot an annual argument with the finance director.</p>
      <h2>Capability</h2>
      <p>Everything a normal sales operation needs is here: pipeline and deal stages, quoting, email integration with both Microsoft 365 and Google Workspace, activity tracking, forecasting and reporting. Above that sits a workflow engine that will handle approval chains, escalations and scheduled actions without code, and a scripting language for the cases that need it.</p>
      <p>The mobile app is good enough for a rep working out of a car, including offline capture, which matters more than vendors admit in a country with patchy coverage between towns.</p>
      <h2>The honest weaknesses</h2>
      <p>The interface is dense. There is a lot of it, and a new user without training will find it overwhelming next to Pipedrive. Budget for proper onboarding rather than assuming the team will pick it up.</p>
      <p>The upgrade path is also a known frustration. Features you assumed were included frequently sit one tier up, and the practical edition for a real sales team is usually Professional rather than Standard. Price the tier you will actually use.</p>
      <h2>POPIA</h2>
      <p>Consent handling is better than most. Zoho ships GDPR tooling that maps well onto POPIA requirements: consent capture on records, data subject request handling and configurable retention. Data residency can be selected by region.</p>
      <h2>Who should buy it</h2>
      <p>Most South African sales teams between three and a hundred users. If you already run Zoho Books, the case is close to automatic.</p>
    `,
    starting_price: 260,
    price_vat_inclusive: false,
    pricing_note:
      "Zoho bills in rand, which removes exchange rate exposure. Prices exclude VAT and annual billing is discounted against monthly.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Three users, basic contact and deal management.",
        user_limit: "3 users",
        features: ["Leads, contacts and deals", "Tasks and events", "Basic reporting", "Mobile app"],
      },
      {
        name: "Standard",
        price: 260,
        period: "month",
        vat_inclusive: false,
        description: "Per user per month. Pipelines, scoring and basic automation.",
        user_limit: "Per user",
        features: [
          "Custom fields and layouts",
          "Multiple pipelines",
          "Scoring rules",
          "Email insights",
          "Basic workflow rules",
        ],
      },
      {
        name: "Professional",
        price: 450,
        period: "month",
        vat_inclusive: false,
        description: "The realistic tier for a working sales team.",
        user_limit: "Per user",
        popular: true,
        features: [
          "Everything in Standard",
          "Quotes, orders and invoices",
          "Inventory linked to deals",
          "Blueprint process automation",
          "Validation rules",
          "Email integration with Microsoft 365 and Google Workspace",
        ],
      },
      {
        name: "Enterprise",
        price: 780,
        period: "month",
        vat_inclusive: false,
        description: "Adds territory management, custom modules and the scripting layer.",
        user_limit: "Per user",
        features: [
          "Everything in Professional",
          "Territory management",
          "Custom modules and buttons",
          "Deluge scripting",
          "Advanced customisation",
          "Multi user portals",
        ],
      },
    ],
    top_features: [
      "Billed natively in rand, so the budget does not move with the exchange rate",
      "Workflow automation competitors reserve for enterprise tiers",
      "Offline capable mobile app for reps between towns",
      "Consent and data subject tooling that maps onto POPIA",
    ],
    features: [
      "Leads, contacts, accounts and deals",
      "Multiple pipelines",
      "Quotes, sales orders and invoices",
      "Email integration with Microsoft 365 and Google Workspace",
      "Workflow rules and approval chains",
      "Blueprint process automation",
      "Territory management",
      "Forecasting",
      "Custom modules and fields",
      "Deluge scripting",
      "Reports and dashboards",
      "Offline capable mobile app",
      "Consent capture and data subject requests",
      "Open REST API",
    ],
    integrations: [
      "Zoho Books",
      "Zoho People",
      "Microsoft 365",
      "Google Workspace",
      "Xero",
      "Sage Accounting",
      "Mailchimp",
      "Slack",
      "Zapier",
      "WhatsApp Business",
    ],
    compliance: [
      "POPIA aligned consent capture",
      "Data subject request handling",
      "Configurable retention rules",
      "Selectable data residency by region",
      "Operator agreement available",
    ],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Sales manager", "Business owner", "Sales operations lead"],
    vendor_name: "Zoho Corporation",
    vendor_website: "https://www.zoho.com/za/crm/",
    founded_year: 1996,
    support_types: ["Email", "Live chat", "Telephone", "Knowledge base", "Community forum"],
    target_rating: 4.3,
    review_count: 264,
    featured: true,
  }),

  defineSoftware({
    name: "HubSpot",
    slug: "hubspot",
    category_id: CATEGORY,
    tagline: "The easiest CRM to start, and the easiest to overspend on",
    description_short:
      "HubSpot has the best free CRM tier and the smoothest onboarding in the category, but the step from free to properly useful is a large one in rand.",
    description_full: `
      <p>HubSpot's free CRM is the most generous genuine free tier in business software. Unlimited users, a million contacts, a working pipeline, email tracking and meeting scheduling, at no cost, forever. For a small sales team moving off a spreadsheet it is the obvious first step and there is no catch at that level.</p>
      <p>The catch arrives later, and it is worth understanding before you build your process on it.</p>
      <h2>The pricing cliff</h2>
      <p>The features that turn HubSpot from a contact list into a sales system, automation, sequences, custom reporting and required fields, sit in Sales Hub Professional. That tier is priced per seat in US dollars, has a minimum seat count, and carries a mandatory onboarding fee in the first year. The jump from free to Professional is not incremental, it is a step of an order of magnitude, and businesses regularly discover this after they have committed.</p>
      <p>Marketing Hub has the same shape and its pricing scales on marketing contacts, so a growing list raises the bill without anyone making a decision.</p>
      <h2>What it is genuinely best at</h2>
      <p>Adoption. Sales people use HubSpot without being forced to, which is not true of most CRMs. The interface is clear, the email and calendar integration works properly, and the mobile app is good. Alignment between marketing and sales in one database is real and valuable if you run both.</p>
      <p>The education content and certification programme are also legitimately excellent, and a great deal of it applies whatever CRM you end up using.</p>
      <h2>South African considerations</h2>
      <p>Billing is in dollars, so budget as a variable cost. Support hours cover South African business hours reasonably from the European operation. There is a small but growing local partner community. Consent tooling is GDPR built and maps onto POPIA well.</p>
      <h2>Who should buy it</h2>
      <p>Teams that want to start free and are honest with themselves about what the paid tier will cost in eighteen months. Marketing led businesses where the sales and marketing database really should be one thing.</p>
    `,
    starting_price: 0,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "The free tier is genuinely free. Paid tiers are billed in US dollars per seat with minimum seat counts and a first year onboarding fee on Professional and above.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited users, one million contacts, working pipeline.",
        user_limit: "Unlimited users",
        features: [
          "Contact and deal management",
          "Email tracking and templates",
          "Meeting scheduling",
          "Live chat",
          "Basic reporting dashboards",
        ],
      },
      {
        name: "Sales Hub Starter",
        price: 20,
        period: "month",
        vat_inclusive: false,
        description: "Per seat. Removes branding and adds simple automation.",
        user_limit: "Per seat",
        features: [
          "Everything in Free",
          "HubSpot branding removed",
          "Simple automation",
          "Goals",
          "Multiple currencies",
        ],
      },
      {
        name: "Sales Hub Professional",
        price: 100,
        period: "month",
        vat_inclusive: false,
        description: "The tier where HubSpot becomes a sales system. Onboarding fee applies.",
        user_limit: "Per seat, minimum seat count",
        popular: true,
        features: [
          "Everything in Starter",
          "Sequences and workflow automation",
          "Custom reporting",
          "Forecasting",
          "Playbooks",
          "Required fields and deal stage rules",
        ],
      },
    ],
    top_features: [
      "The most generous genuine free tier in business software",
      "Sales teams adopt it voluntarily, which is rare",
      "Marketing and sales in one database when you run both",
      "Excellent free education and certification content",
    ],
    features: [
      "Contact, company and deal management",
      "Email tracking, templates and sequences",
      "Meeting scheduling",
      "Live chat and chatbots",
      "Workflow automation",
      "Custom reporting and dashboards",
      "Forecasting",
      "Quotes",
      "Playbooks",
      "Marketing email and landing pages",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Xero",
      "QuickBooks Online",
      "Slack",
      "WhatsApp Business",
      "Zapier",
      "Shopify",
      "WooCommerce",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Consent capture and subscription types",
      "Data subject request handling",
      "Data hosted in the United States and European Union",
    ],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Sales manager", "Marketing manager", "Business owner"],
    vendor_name: "HubSpot Inc.",
    vendor_website: "https://www.hubspot.com/",
    founded_year: 2006,
    support_types: ["Email", "Live chat", "Telephone on paid tiers", "Knowledge base", "Academy"],
    target_rating: 4.4,
    review_count: 302,
    featured: true,
  }),

  defineSoftware({
    name: "Salesforce Sales Cloud",
    slug: "salesforce",
    category_id: CATEGORY,
    tagline: "It will do anything, and it will cost what that implies",
    description_short:
      "Salesforce is the most configurable CRM in existence and the right answer for complex sales organisations, provided you budget for the implementation as well as the licence.",
    description_full: `
      <p>Salesforce is the enterprise standard for a reason. Given enough configuration it will model any sales process you can describe, integrate with anything, and report on it in any shape a board asks for. There is no capability question. There is a cost question, and it has two parts.</p>
      <h2>Licence and implementation</h2>
      <p>The licence is billed per user per month in US dollars on an annual commitment. That is the visible number. The invisible number is implementation, and in South Africa a realistic Sales Cloud implementation through a local partner runs into six figures in rand for a mid sized business. The rule of thumb our reviewers keep repeating is that year one total cost is two to three times the licence.</p>
      <p>Then there is the ongoing administration. A serious Salesforce deployment needs an administrator, either a person or a retained partner. Budgeting for the licence alone is the single most common mistake we see.</p>
      <h2>What you get</h2>
      <p>Complete configurability without code for most requirements, and a development platform for the rest. Territory and quota management that actually works at scale. Forecasting a CFO will trust. An ecosystem, AppExchange, that has an answer for almost any adjacent requirement. And a local partner community in Johannesburg and Cape Town with real depth.</p>
      <h2>What frustrates people</h2>
      <p>Complexity, consistently. Simple changes need an administrator. The interface has more of everything than most users need. New sales people take longer to become productive than on any other CRM in this list.</p>
      <p>Costs also creep. Sandboxes, additional API calls, extra storage, premium support and each additional cloud all carry a price, and the renewal conversation is rarely a happy one.</p>
      <h2>Who should buy it</h2>
      <p>Organisations with genuinely complex sales processes, multiple business units, formal territory and quota structures, or an existing group standard. Businesses under about twenty users are almost always better served elsewhere.</p>
    `,
    starting_price: 25,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per user per month on an annual commitment. Budget implementation at two to three times the year one licence cost.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Starter Suite",
        price: 25,
        period: "month",
        vat_inclusive: false,
        description: "Simplified edition for small teams, with limited customisation.",
        user_limit: "Per user",
        features: [
          "Accounts, contacts, leads and opportunities",
          "Email integration",
          "Simple pipeline",
          "Standard reports",
        ],
      },
      {
        name: "Pro Suite",
        price: 100,
        period: "month",
        vat_inclusive: false,
        description: "Adds customisation, quoting and forecasting.",
        user_limit: "Per user",
        popular: true,
        features: [
          "Everything in Starter",
          "Customisable sales process",
          "Quotes and orders",
          "Forecast management",
          "Workflow automation",
        ],
      },
      {
        name: "Enterprise",
        price: 165,
        period: "month",
        vat_inclusive: false,
        description: "The full platform, with territory management and advanced permissions.",
        user_limit: "Per user",
        features: [
          "Everything in Pro Suite",
          "Territory and quota management",
          "Advanced permissions and sharing rules",
          "Approval processes",
          "Sandbox environments",
          "Full API access",
        ],
      },
    ],
    top_features: [
      "Will model any sales process you can describe",
      "Territory, quota and forecasting that hold up at scale",
      "The largest application ecosystem in business software",
      "Deep local partner community in Johannesburg and Cape Town",
    ],
    features: [
      "Accounts, contacts, leads and opportunities",
      "Customisable sales processes",
      "Territory and quota management",
      "Forecasting",
      "Quotes and orders",
      "Approval processes",
      "Workflow and process automation",
      "Custom objects and fields",
      "Apex development platform",
      "Sandbox environments",
      "Reports and dashboards",
      "AppExchange marketplace",
      "Full REST and SOAP APIs",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Slack",
      "Sage Intacct",
      "NetSuite",
      "DocuSign",
      "Mailchimp",
      "Power BI",
      "AppExchange marketplace",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Consent and data subject request handling",
      "Field level encryption available",
      "Detailed audit trail",
      "Data hosted outside South Africa",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "500 plus employees"],
    best_for_role: ["Sales director", "Sales operations lead", "Chief revenue officer"],
    vendor_name: "Salesforce Inc.",
    vendor_website: "https://www.salesforce.com/za/",
    founded_year: 1999,
    support_types: [
      "Partner network",
      "Telephone on premium tiers",
      "Email",
      "Trailhead training",
      "Community",
    ],
    target_rating: 4.1,
    review_count: 219,
  }),

  defineSoftware({
    name: "Pipedrive",
    slug: "pipedrive",
    category_id: CATEGORY,
    tagline: "A sales pipeline that sales people actually keep updated",
    description_short:
      "Pipedrive does one thing extremely well, which is move deals through a pipeline, and it is the easiest CRM in this list to get a team to adopt.",
    description_full: `
      <p>Pipedrive was built by sales people who were tired of CRMs designed for managers to report from rather than for reps to work in. That origin still shows. The pipeline view is the whole product, every deal has a next action, and the system nags gently until you set one.</p>
      <p>If your problem is that nobody updates the CRM, this is the most likely solution on this page.</p>
      <h2>Strengths</h2>
      <p>Adoption, first and foremost. A new rep is productive in a morning. The activity based model means the pipeline stays current because updating it is how you do your job rather than a separate admin task. Email integration is clean, and the mobile app is genuinely good for someone working between meetings.</p>
      <p>Automation on the middle tiers is more capable than the price suggests, covering the routine follow up sequences that consume a rep's morning.</p>
      <h2>Limitations</h2>
      <p>It is a sales tool, not a customer platform. Marketing automation is an add on and a thin one. Customer service and ticketing are not present. Reporting is good for pipeline and activity, and thin for anything else. Custom objects do not exist, so if your business needs to model something that is not a person, an organisation or a deal, you will be improvising.</p>
      <p>Pricing is in dollars, and the useful tier is Professional rather than the entry one, so price accordingly.</p>
      <h2>Who should buy it</h2>
      <p>Sales led businesses of three to fifty reps with a straightforward pipeline. Agencies, professional services, equipment sales, anything where a person moves an opportunity through stages. If you need marketing automation and service in one place, look at Zoho or HubSpot instead.</p>
    `,
    starting_price: 24,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per seat per month, discounted annually. The Professional tier is the realistic starting point for a team using automation.",
    free_trial: true,
    pricing_plans: [
      {
        name: "Essential",
        price: 24,
        period: "month",
        vat_inclusive: false,
        description: "Pipeline, activities and basic reporting.",
        user_limit: "Per seat",
        features: [
          "Customisable pipelines",
          "Activity reminders",
          "Contact and deal management",
          "Basic reporting",
          "Mobile app",
        ],
      },
      {
        name: "Advanced",
        price: 39,
        period: "month",
        vat_inclusive: false,
        description: "Adds email sync, sequences and workflow automation.",
        user_limit: "Per seat",
        features: [
          "Everything in Essential",
          "Two way email sync",
          "Email sequences",
          "Workflow automation",
          "Meeting scheduler",
        ],
      },
      {
        name: "Professional",
        price: 64,
        period: "month",
        vat_inclusive: false,
        description: "Adds forecasting, documents, e signature and team management.",
        user_limit: "Per seat",
        popular: true,
        features: [
          "Everything in Advanced",
          "Revenue forecasting",
          "Documents and e signature",
          "Team management",
          "Advanced reporting",
        ],
      },
    ],
    top_features: [
      "The highest CRM adoption rate we see in our review set",
      "Activity based selling keeps the pipeline current by design",
      "New reps productive within a morning",
      "Strong mobile app for people working between meetings",
    ],
    features: [
      "Customisable pipelines and stages",
      "Activity based selling with next action prompts",
      "Two way email sync",
      "Email sequences",
      "Workflow automation",
      "Meeting scheduler",
      "Revenue forecasting",
      "Documents and e signature",
      "Products and quoting",
      "Reports and dashboards",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Xero",
      "QuickBooks Online",
      "Slack",
      "Mailchimp",
      "Zapier",
      "WhatsApp Business",
      "Trello",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Consent capture",
      "Data subject request handling",
      "Data hosted in the European Union",
    ],
    best_for_size: ["2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Sales manager", "Business owner", "Account executive"],
    vendor_name: "Pipedrive OU",
    vendor_website: "https://www.pipedrive.com/",
    founded_year: 2010,
    support_types: ["Live chat", "Email", "Knowledge base", "Community"],
    target_rating: 4.5,
    review_count: 187,
  }),

  defineSoftware({
    name: "Freshsales",
    slug: "freshsales",
    category_id: CATEGORY,
    tagline: "A well judged middle ground between simple and capable",
    description_short:
      "Freshsales offers built in telephony, sensible automation and a free tier, sitting between Pipedrive and Zoho on both capability and price.",
    description_full: `
      <p>Freshsales is the CRM that most often surprises people on a shortlist. It has the clarity of Pipedrive with more of the capability of Zoho, a usable free tier, and built in telephony that nobody else in this price range offers without an add on.</p>
      <p>The telephony matters more than it sounds. Being able to call from inside the record, with the call logged and recorded automatically, removes a category of admin that sales managers otherwise spend their time policing.</p>
      <h2>Where it lands well</h2>
      <p>Contact scoring is built in rather than a premium feature. The visual workflow builder is easy enough that a sales manager can build automations without help. Email, chat and phone all sit in the same timeline on the contact record, which is the thing every CRM promises and few deliver cleanly.</p>
      <p>The free tier supports a small team properly, which makes it a low risk trial.</p>
      <h2>Where it falls short</h2>
      <p>The reporting is adequate rather than good, and teams with a strong analytics culture will find it limiting. The integration catalogue is smaller than Zoho's or HubSpot's, and there is no local accounting integration to speak of, so a link to Sage or Xero means Zapier or a developer.</p>
      <p>Support quality in our review set is inconsistent, with several reviewers reporting slow escalation on technical issues.</p>
      <h2>South African considerations</h2>
      <p>Billed in dollars. Support hours are broad because the company operates across time zones, which works well from here. Telephony numbers are not available in South Africa on every plan, so confirm local number provisioning during the trial if that is part of why you are buying it.</p>
      <h2>Who should buy it</h2>
      <p>Small to mid sized sales teams that make a lot of calls, businesses that want automation without Zoho's density, and anyone who wants to trial properly on a free tier before committing budget.</p>
    `,
    starting_price: 0,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per user per month. Confirm South African telephony number availability during the trial if built in calling is part of the decision.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Up to three users with contact and account management.",
        user_limit: "3 users",
        features: ["Contact and account management", "Built in chat", "Email templates", "Mobile app"],
      },
      {
        name: "Growth",
        price: 11,
        period: "month",
        vat_inclusive: false,
        description: "Per user. Pipeline, scoring and basic workflows.",
        user_limit: "Per user",
        features: [
          "Visual sales pipeline",
          "Contact scoring",
          "Workflow automation",
          "Built in telephony",
          "Custom fields",
        ],
      },
      {
        name: "Pro",
        price: 47,
        period: "month",
        vat_inclusive: false,
        description: "Adds multiple pipelines, territories and advanced automation.",
        user_limit: "Per user",
        popular: true,
        features: [
          "Everything in Growth",
          "Multiple sales pipelines",
          "Territory management",
          "Advanced workflow automation",
          "Sales sequences",
          "Custom reports",
        ],
      },
    ],
    top_features: [
      "Built in telephony with automatic call logging and recording",
      "Contact scoring included rather than sold as a premium tier",
      "A workflow builder a sales manager can drive unaided",
      "A free tier good enough for a genuine trial",
    ],
    features: [
      "Contact, account and deal management",
      "Visual sales pipeline",
      "Built in telephony with recording",
      "Contact scoring",
      "Email, chat and phone on one timeline",
      "Workflow automation",
      "Sales sequences",
      "Territory management",
      "Custom reports and dashboards",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Freshdesk",
      "Mailchimp",
      "Slack",
      "Zapier",
      "QuickBooks Online",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Consent capture",
      "Data subject request handling",
      "Selectable data region",
    ],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Sales manager", "Inside sales lead", "Business owner"],
    vendor_name: "Freshworks Inc.",
    vendor_website: "https://www.freshworks.com/crm/sales/",
    founded_year: 2010,
    support_types: ["Email", "Live chat", "Telephone", "Knowledge base"],
    target_rating: 4.0,
    review_count: 152,
  }),

  defineSoftware({
    name: "Sage CRM",
    slug: "sage-crm",
    category_id: CATEGORY,
    tagline: "Chosen for its accounting link rather than its own merits",
    description_short:
      "Sage CRM integrates tightly with Sage 200 Evolution and other Sage back offices, which is the main and often the only reason to choose it.",
    description_full: `
      <p>Sage CRM is a competent, unexciting CRM whose principal argument is that it sits directly on top of a Sage back office. If you run Sage 200 Evolution and want your sales team to see live credit limits, real stock availability and actual order history without an integration project, this is the shortest path to that.</p>
      <p>Assessed purely as a CRM against Pipedrive or Zoho, it does not win. Assessed as the sales front end of a Sage finance system, it makes sense.</p>
      <h2>The integration argument</h2>
      <p>A rep quoting from the CRM sees the customer's current balance, their credit limit and whether the stock is actually on the shelf. An order raised in the CRM becomes a sales order in the back office without a synchronisation job that someone has to monitor. For a distribution business this removes a genuine daily friction.</p>
      <h2>As a CRM</h2>
      <p>Contact and opportunity management, quoting, campaign tracking, case management and reasonable reporting. Workflow customisation is available but generally needs a partner rather than an in house administrator. The interface is dated and the mobile app is weak, which is the most common complaint in our review set.</p>
      <h2>Deployment and cost</h2>
      <p>Available on premises or hosted, and sold through the Sage partner network rather than self service. Pricing is quoted rather than listed, per user, and implementation is a partner project. Expect a scoping conversation.</p>
      <h2>Who should buy it</h2>
      <p>Existing Sage 200 Evolution or Sage 300 sites where the sales team needs live back office data. If you are not on a Sage back office, there is no reason to be looking at this instead of Zoho or Pipedrive.</p>
    `,
    starting_price: null,
    price_vat_inclusive: false,
    price_checked_at: "2026-08-12",
    pricing_note:
      "Quoted per user through the Sage partner network, with implementation charged separately. Available on premises or hosted.",
    free_trial: false,
    pricing_plans: [
      {
        name: "Quoted",
        price: null,
        period: "month",
        vat_inclusive: false,
        description: "Priced per user through a Sage partner, plus implementation.",
        features: [
          "Contact and opportunity management",
          "Quotes and orders into the Sage back office",
          "Live credit limit and stock visibility",
          "Case management",
          "Campaign tracking",
        ],
      },
    ],
    top_features: [
      "Live credit limit and stock availability inside the sales record",
      "Orders flow into the Sage back office without a sync job",
      "Sold and supported by the existing Sage partner network",
      "On premises deployment available where cloud is not an option",
    ],
    features: [
      "Contact and account management",
      "Opportunity and pipeline management",
      "Quotes and sales orders",
      "Live back office integration",
      "Case management",
      "Campaign tracking",
      "Reports and dashboards",
      "Workflow customisation",
      "On premises or hosted deployment",
    ],
    integrations: [
      "Sage 200 Evolution",
      "Sage 300",
      "Sage 50cloud Pastel",
      "Microsoft 365",
      "Microsoft Exchange",
    ],
    compliance: [
      "POPIA operator agreement",
      "On premises deployment keeps data in South Africa",
      "Role based access controls",
      "Audit trail on records",
    ],
    best_for_size: ["11 to 50 employees", "51 to 200 employees", "201 to 500 employees"],
    best_for_role: ["Sales manager", "Financial manager", "Operations director"],
    vendor_name: "Sage Group plc",
    vendor_website: "https://www.sage.com/en-za/products/sage-crm/",
    founded_year: 1998,
    support_types: ["Partner network", "Telephone", "Email", "Knowledge base"],
    target_rating: 3.6,
    review_count: 108,
  }),
];
