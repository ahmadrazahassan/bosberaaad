import { defineSoftware } from "./define";

const CATEGORY = "cat-project-management";

export const PROJECT_MANAGEMENT_SOFTWARE = [
  defineSoftware({
    name: "monday.com",
    slug: "monday-com",
    category_id: CATEGORY,
    tagline: "Flexible enough to run anything, which is the risk as much as the appeal",
    description_short:
      "monday.com is a highly visual work platform that teams adopt quickly, with pricing bands that punish teams whose headcount sits just above a boundary.",
    description_full: `
      <p>monday.com is the product most likely to be chosen by someone who is not in IT, and that is a compliment. The boards are visual, colour coded and immediately legible, a non technical manager can build a working process in an afternoon, and teams adopt it without a training programme.</p>
      <p>It has grown well beyond project management into a general work platform: marketing calendars, recruitment pipelines, client onboarding, sales pipelines and support queues all run on the same board structure.</p>
      <h2>The strength and the weakness are the same thing</h2>
      <p>Because anyone can build a board, everyone does. Six months in, an organisation with two hundred boards, no naming convention and four versions of the same process is common, and cleaning that up is a real project. Governance needs to be decided at the start, not discovered later.</p>
      <h2>Pricing, read this carefully</h2>
      <p>monday.com sells in seat bands: three, five, ten, fifteen, twenty five and so on. A team of eleven pays for fifteen seats. A team of sixteen pays for twenty five. If your headcount sits just above a boundary you are paying for people who do not exist, and this catches South African buyers out regularly because the published per seat figure looks competitive until you multiply by the band.</p>
      <p>Billing is in dollars, so budget the rand cost as variable. Annual billing carries a meaningful discount over monthly.</p>
      <h2>What it does well</h2>
      <p>Automation without code is genuinely good. Dashboards that aggregate across boards give a manager real visibility. Time tracking, workload views and Gantt charts are all present on the higher tiers. The mobile app is capable.</p>
      <h2>Who should buy it</h2>
      <p>Teams that need to see work rather than read about it, marketing and creative teams, operations teams running repeatable processes, and businesses whose headcount lands neatly on a seat band. Software teams running sprints will be happier in Jira or ClickUp.</p>
    `,
    starting_price: 9,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per seat per month, sold in fixed seat bands. A team of eleven pays for fifteen seats, so calculate the band cost rather than the per seat figure.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Two seats, three boards. A demonstration rather than a working plan.",
        user_limit: "2 seats",
        features: ["3 boards", "Unlimited documents", "200 templates", "Mobile app"],
      },
      {
        name: "Basic",
        price: 9,
        period: "month",
        vat_inclusive: false,
        description: "Per seat, sold in bands. Unlimited boards and viewers.",
        user_limit: "Minimum 3 seats, sold in bands",
        features: [
          "Unlimited boards",
          "Unlimited free viewers",
          "5 GB storage",
          "Prioritised support",
        ],
      },
      {
        name: "Standard",
        price: 12,
        period: "month",
        vat_inclusive: false,
        description: "Adds timeline, calendar, guest access and automations.",
        user_limit: "Minimum 3 seats, sold in bands",
        popular: true,
        features: [
          "Everything in Basic",
          "Timeline and Gantt views",
          "Calendar view",
          "250 automation actions a month",
          "Guest access",
        ],
      },
      {
        name: "Pro",
        price: 19,
        period: "month",
        vat_inclusive: false,
        description: "Adds time tracking, dependencies, private boards and workload.",
        user_limit: "Minimum 3 seats, sold in bands",
        features: [
          "Everything in Standard",
          "Time tracking",
          "Dependency management",
          "Workload view",
          "Private boards",
          "25 000 automation actions a month",
        ],
      },
    ],
    top_features: [
      "Non technical managers build working processes in an afternoon",
      "Dashboards that aggregate across many boards for real visibility",
      "Automation that needs no code and genuinely removes admin",
      "Unlimited free viewers, so stakeholders cost nothing",
    ],
    features: [
      "Board, table, kanban and timeline views",
      "Gantt charts and dependencies",
      "Calendar view",
      "Workload management",
      "Time tracking",
      "No code automation",
      "Cross board dashboards",
      "Forms",
      "Guest and viewer access",
      "Document collaboration",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Slack",
      "Microsoft Teams",
      "HubSpot",
      "Xero",
      "Zapier",
      "Jira",
      "Dropbox",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Role based permissions",
      "Data hosted outside South Africa",
      "Audit log on enterprise tiers",
    ],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Project manager", "Marketing manager", "Operations manager"],
    vendor_name: "monday.com Ltd.",
    vendor_website: "https://monday.com/",
    founded_year: 2012,
    support_types: ["Email", "Knowledge base", "Webinars", "Community"],
    target_rating: 4.3,
    review_count: 276,
    featured: true,
  }),

  defineSoftware({
    name: "Asana",
    slug: "asana",
    category_id: CATEGORY,
    tagline: "The most disciplined task model in the category",
    description_short:
      "Asana has the clearest structure for work that spans teams, with a strong free tier and a per seat price that scales linearly rather than in bands.",
    description_full: `
      <p>Asana's model is the most rigorous in this category. Every piece of work has one owner and one due date, tasks belong to projects, projects roll into portfolios, and portfolios roll into goals. It is opinionated, and organisations that adopt the opinion get real clarity from it.</p>
      <p>The free tier is unusually generous, supporting up to ten collaborators with unlimited tasks and projects, which is enough to run a small business properly rather than just to evaluate.</p>
      <h2>Where it excels</h2>
      <p>Cross functional work. When a project involves marketing, operations and finance, Asana keeps the dependencies visible and the ownership unambiguous. Portfolio views give a director a truthful picture of what is in flight without a status meeting.</p>
      <p>The rules engine handles routine handoffs, the forms feature turns intake requests into structured tasks, and the timeline view is a proper dependency aware Gantt rather than a decorative one.</p>
      <h2>Where it frustrates</h2>
      <p>The one assignee rule is philosophically correct and practically annoying for work genuinely shared between two people. There is no native time tracking, which for an agency billing hours is a significant gap requiring Harvest or Everhour alongside it. Reporting is adequate rather than strong.</p>
      <p>Pricing in dollars per seat, with the useful features on the Advanced tier, means the real cost for a fifteen person team is higher than the headline suggests.</p>
      <h2>Who should buy it</h2>
      <p>Organisations running cross functional projects, teams that want structure rather than flexibility, and businesses that value clear ownership. Agencies billing time should budget for a time tracking add on from day one.</p>
    `,
    starting_price: 0,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per seat per month, discounted annually. There is no native time tracking, so agencies should budget for an add on.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Personal",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Up to ten collaborators with unlimited tasks and projects.",
        user_limit: "10 collaborators",
        features: [
          "Unlimited tasks and projects",
          "List, board and calendar views",
          "Assignees and due dates",
          "Mobile app",
        ],
      },
      {
        name: "Starter",
        price: 11,
        period: "month",
        vat_inclusive: false,
        description: "Adds timeline, dashboards, forms and rules.",
        user_limit: "Per seat",
        popular: true,
        features: [
          "Everything in Personal",
          "Timeline and Gantt view",
          "Dashboards",
          "Forms",
          "Rules automation",
          "Custom fields",
        ],
      },
      {
        name: "Advanced",
        price: 26,
        period: "month",
        vat_inclusive: false,
        description: "Adds portfolios, goals, workload and approvals.",
        user_limit: "Per seat",
        features: [
          "Everything in Starter",
          "Portfolios",
          "Goals",
          "Workload management",
          "Approvals",
          "Advanced reporting",
          "Time tracking fields",
        ],
      },
    ],
    top_features: [
      "One owner per task, which removes the most common cause of dropped work",
      "Portfolios and goals that give directors a truthful in flight picture",
      "A free tier good enough to run a small business on",
      "Forms that turn intake requests into structured, owned tasks",
    ],
    features: [
      "List, board, calendar and timeline views",
      "Dependencies",
      "Portfolios and goals",
      "Workload management",
      "Rules automation",
      "Forms and intake management",
      "Approvals",
      "Custom fields",
      "Dashboards and reporting",
      "Guest access",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Slack",
      "Microsoft Teams",
      "Harvest",
      "Everhour",
      "Zapier",
      "Jira",
      "Salesforce",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Role based permissions",
      "Data hosted outside South Africa",
      "Audit log on enterprise tiers",
    ],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Project manager", "Operations manager", "Programme director"],
    vendor_name: "Asana Inc.",
    vendor_website: "https://asana.com/",
    founded_year: 2008,
    support_types: ["Email", "Knowledge base", "Academy", "Community forum"],
    target_rating: 4.4,
    review_count: 241,
  }),

  defineSoftware({
    name: "Trello",
    slug: "trello",
    category_id: CATEGORY,
    tagline: "The simplest thing that could possibly work, and often enough",
    description_short:
      "Trello is a kanban board and very little else, which is exactly why small teams adopt it in an afternoon and keep using it for years.",
    description_full: `
      <p>Trello does one thing. Cards move across columns. You can teach it to anyone in two minutes, and the free tier is genuinely usable with unlimited cards and up to ten boards per workspace.</p>
      <p>For a small team that needs to see who is doing what this week, that is often all that is required, and there is a strong argument that a simple tool everyone uses beats a capable one half the team ignores.</p>
      <h2>What it will not do</h2>
      <p>Dependencies, resource management, portfolio views, and any real reporting. There is no native time tracking. Once a project has more than roughly fifty active cards the board becomes hard to read. Anything resembling programme management will need something else.</p>
      <p>Power-Ups extend it, and the ecosystem is large, but bolting five Power-Ups onto Trello to make it behave like Asana produces something more fragile and often more expensive than just buying Asana.</p>
      <h2>Pricing</h2>
      <p>Billed in dollars per user per month. The free tier is real. The Standard tier removes the board limit and adds advanced checklists and custom fields, which is usually enough. Premium adds the alternative views that other tools include by default.</p>
      <h2>Who should buy it</h2>
      <p>Small teams, simple workflows, and anyone whose current system is a WhatsApp group. Also excellent as a personal or single team board alongside a heavier system used by the wider organisation. Teams running complex, dependency heavy projects should look elsewhere.</p>
    `,
    starting_price: 0,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per user per month. The free tier is genuinely usable and many small teams never leave it.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited cards, up to ten boards per workspace.",
        user_limit: "Unlimited collaborators",
        features: [
          "Unlimited cards",
          "10 boards per workspace",
          "Unlimited storage at 10 MB per file",
          "Mobile app",
        ],
      },
      {
        name: "Standard",
        price: 6,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited boards, advanced checklists and custom fields.",
        user_limit: "Per user",
        popular: true,
        features: [
          "Unlimited boards",
          "Advanced checklists",
          "Custom fields",
          "Unlimited storage at 250 MB per file",
          "Saved searches",
        ],
      },
      {
        name: "Premium",
        price: 12.5,
        period: "month",
        vat_inclusive: false,
        description: "Adds calendar, timeline, table, dashboard and map views.",
        user_limit: "Per user",
        features: [
          "Everything in Standard",
          "Calendar, timeline and table views",
          "Dashboard view",
          "Workspace level automation",
          "Admin controls",
        ],
      },
    ],
    top_features: [
      "Learnable in two minutes by anyone",
      "A free tier small teams genuinely stay on for years",
      "Large Power-Up ecosystem for targeted additions",
      "The lowest paid tier price in the category",
    ],
    features: [
      "Kanban boards",
      "Cards with checklists, due dates and attachments",
      "Labels and filters",
      "Butler automation",
      "Calendar, timeline and table views on Premium",
      "Power-Up integrations",
      "Guest access",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Slack",
      "Microsoft Teams",
      "Google Workspace",
      "Jira",
      "Confluence",
      "Harvest",
      "Zapier",
      "Dropbox",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Role based permissions on paid tiers",
      "Data hosted outside South Africa",
    ],
    best_for_size: ["Sole trader", "2 to 10 employees", "11 to 50 employees"],
    best_for_role: ["Team lead", "Business owner", "Project coordinator"],
    vendor_name: "Atlassian Corporation",
    vendor_website: "https://trello.com/",
    founded_year: 2011,
    support_types: ["Email", "Knowledge base", "Community forum"],
    target_rating: 4.2,
    review_count: 209,
  }),

  defineSoftware({
    name: "ClickUp",
    slug: "clickup",
    category_id: CATEGORY,
    tagline: "Everything, in one product, for less than everything else costs",
    description_short:
      "ClickUp packs docs, tasks, goals, time tracking and whiteboards into one low priced product, at the cost of a steeper learning curve and occasional performance complaints.",
    description_full: `
      <p>ClickUp's strategy is to replace your whole stack. Tasks, documents, goals, time tracking, whiteboards, dashboards, forms, chat and mind maps all sit in one product at a price well below the sum of the specialised tools it is trying to displace.</p>
      <p>For a cost conscious South African business paying in dollars for three or four separate subscriptions, consolidating into ClickUp is a genuinely attractive proposition, and the free tier is the most feature rich of any product on this page.</p>
      <h2>Native time tracking</h2>
      <p>Worth calling out because Asana and Trello do not have it. For an agency or consultancy billing hours, having time tracking in the same tool as the tasks removes an integration and a reconciliation. The reporting on it is adequate for invoicing.</p>
      <h2>The cost of doing everything</h2>
      <p>Complexity. There are many ways to do the same thing, the settings are extensive, and a new team without a clear configuration decision will build something inconsistent. Plan the hierarchy, spaces, folders, lists and statuses, before rolling it out, not after.</p>
      <p>Performance is the other recurring complaint in our review set. Large workspaces load slowly, and on a marginal connection that is felt more acutely here than in markets with better average bandwidth. Test it on your actual connection with a realistic data volume before committing a large team.</p>
      <h2>Who should buy it</h2>
      <p>Agencies and consultancies that bill time, cost conscious teams consolidating several subscriptions, and organisations with someone willing to own the configuration properly. Teams that want to open a tool and start working without a setup project should look at Asana or Trello.</p>
    `,
    starting_price: 0,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per user per month. The free tier is the most capable in this category, and native time tracking removes the need for a separate subscription.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free Forever",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited tasks and members, with feature usage limits.",
        user_limit: "Unlimited members",
        features: [
          "Unlimited tasks",
          "Unlimited members",
          "Time tracking",
          "Kanban, list and calendar views",
          "100 MB storage",
        ],
      },
      {
        name: "Unlimited",
        price: 7,
        period: "month",
        vat_inclusive: false,
        description: "Removes storage and view limits, adds dashboards and guests.",
        user_limit: "Per user",
        popular: true,
        features: [
          "Unlimited storage",
          "Unlimited dashboards",
          "Gantt charts",
          "Custom fields",
          "Guest access",
          "Native time tracking with reporting",
        ],
      },
      {
        name: "Business",
        price: 12,
        period: "month",
        vat_inclusive: false,
        description: "Adds workload, timelines, advanced automation and goal folders.",
        user_limit: "Per user",
        features: [
          "Everything in Unlimited",
          "Workload and timeline views",
          "Advanced automation",
          "Goal folders",
          "Custom exporting",
          "Granular time estimates",
        ],
      },
    ],
    top_features: [
      "Native time tracking included from the free tier",
      "Documents, whiteboards and tasks in one product",
      "The most capable free tier in the category",
      "Replaces three or four separate dollar subscriptions",
    ],
    features: [
      "Tasks with custom statuses",
      "List, board, calendar, Gantt and timeline views",
      "Native time tracking and estimates",
      "Documents and wikis",
      "Whiteboards and mind maps",
      "Goals and targets",
      "Dashboards",
      "Forms",
      "Automation",
      "Workload management",
      "Guest access",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Slack",
      "Microsoft Teams",
      "Google Workspace",
      "Microsoft 365",
      "GitHub",
      "Zapier",
      "HubSpot",
      "Xero",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Role based permissions",
      "Data hosted outside South Africa",
      "Audit log on enterprise tiers",
    ],
    best_for_size: ["2 to 10 employees", "11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Agency owner", "Project manager", "Operations manager"],
    vendor_name: "ClickUp",
    vendor_website: "https://clickup.com/",
    founded_year: 2017,
    support_types: ["Email", "Live chat", "Knowledge base", "University"],
    target_rating: 4.1,
    review_count: 223,
  }),

  defineSoftware({
    name: "Smartsheet",
    slug: "smartsheet",
    category_id: CATEGORY,
    tagline: "For people who think in spreadsheets and need more than one",
    description_short:
      "Smartsheet keeps the spreadsheet grid and adds dependencies, resource management and automation, which suits construction, engineering and formal project offices.",
    description_full: `
      <p>Smartsheet's insight is that a great many project managers already run their projects in Excel and do not want to stop. So it keeps the grid, the formulas and the familiar mental model, and adds the things a spreadsheet cannot do: dependency aware scheduling, resource management, automated approvals, forms and a real audit trail.</p>
      <p>In South Africa it shows up most often in construction, engineering, mining services and formal project management offices, which is exactly where it fits.</p>
      <h2>Where it is the right answer</h2>
      <p>Critical path scheduling with dependencies and baselines. Resource allocation across many concurrent projects. Approval workflows that need a documented trail. Portfolio roll ups where a programme director needs one view across thirty projects. Cross project reporting that actually works.</p>
      <p>The formula language is close enough to Excel that a competent spreadsheet user is productive immediately, which is a real adoption advantage over tools that require a new way of thinking.</p>
      <h2>Where it disappoints</h2>
      <p>The interface is utilitarian. It is a grid, and next to monday.com it looks like work. Teams used to visual boards find it dry. The learning curve for the advanced features, particularly resource management and cross sheet formulas, is genuine.</p>
      <p>Pricing is in dollars per user per month, and the tier that includes resource management and portfolio reporting is the expensive one. Small teams will find better value elsewhere.</p>
      <h2>Who should buy it</h2>
      <p>Construction and engineering firms, project management offices, and organisations running many concurrent projects with shared resources. Teams whose projects are simple should not pay for this.</p>
    `,
    starting_price: 9,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per user per month with a minimum user count on paid tiers. Resource management and portfolio reporting sit on the higher tier.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "One user, two sheets. An evaluation tier.",
        user_limit: "1 user",
        features: ["2 sheets", "Grid, Gantt, card and calendar views", "100 automations a month"],
      },
      {
        name: "Pro",
        price: 9,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited sheets, dependencies and forms.",
        user_limit: "Per user, minimum count applies",
        popular: true,
        features: [
          "Unlimited sheets",
          "Gantt with dependencies",
          "Forms",
          "250 automations a month",
          "Unlimited free viewers",
        ],
      },
      {
        name: "Business",
        price: 19,
        period: "month",
        vat_inclusive: false,
        description: "Adds resource management, portfolio reporting and baselines.",
        user_limit: "Per user, minimum count applies",
        features: [
          "Everything in Pro",
          "Resource management",
          "Portfolio and cross sheet reporting",
          "Baselines",
          "Document builder",
          "Unlimited automations",
        ],
      },
    ],
    top_features: [
      "Critical path scheduling with dependencies and baselines",
      "Resource allocation across many concurrent projects",
      "An Excel like formula language spreadsheet users already know",
      "Portfolio roll ups that give a programme director one honest view",
    ],
    features: [
      "Grid, Gantt, card and calendar views",
      "Dependencies and critical path",
      "Baselines",
      "Resource management",
      "Cross sheet formulas and reporting",
      "Portfolio dashboards",
      "Approval workflows",
      "Forms",
      "Automation",
      "Document builder",
      "Audit trail",
      "Open API",
    ],
    integrations: [
      "Microsoft 365",
      "Google Workspace",
      "Slack",
      "Microsoft Teams",
      "Jira",
      "Salesforce",
      "Power BI",
      "DocuSign",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Role based permissions and sheet level access",
      "Full audit trail",
      "Data hosted outside South Africa",
    ],
    best_for_size: ["51 to 200 employees", "201 to 500 employees", "11 to 50 employees"],
    best_for_role: ["Project manager", "Programme director", "Engineering manager"],
    vendor_name: "Smartsheet Inc.",
    vendor_website: "https://www.smartsheet.com/",
    founded_year: 2005,
    support_types: ["Email", "Telephone on higher tiers", "Knowledge base", "Learning centre"],
    target_rating: 4.0,
    review_count: 156,
  }),

  defineSoftware({
    name: "Wrike",
    slug: "wrike",
    category_id: CATEGORY,
    tagline: "Built for agencies and marketing teams that review creative work",
    description_short:
      "Wrike combines solid project management with proofing and approval tools for creative work, which is where it beats more general competitors.",
    description_full: `
      <p>Wrike is a capable general project management tool with one feature set that genuinely distinguishes it: proofing and approval for creative assets. Reviewers mark up images, video and PDFs directly in the browser, comments attach to a point on the artwork, and versions are tracked properly.</p>
      <p>For an agency or an in house marketing team, this replaces the email chain of screenshots with red circles drawn in PowerPoint, and that alone is often the reason Wrike wins the evaluation.</p>
      <h2>The rest of the product</h2>
      <p>Solid. Custom request forms route intake into the right team with the right fields. Workload and capacity views work. Time tracking is native. Dashboards are configurable. Dependencies and Gantt views are present from the mid tier.</p>
      <p>The custom item types feature lets you model things that are not tasks, campaigns, assets, briefs, which is more flexible than most competitors allow.</p>
      <h2>The reservations</h2>
      <p>The interface is dense and takes time to learn. Wrike has been adding features for years and it shows in the navigation. New users need onboarding, and our reviewers consistently mention a slow first month.</p>
      <p>Pricing is in dollars per user with the proofing features on the Business tier and above, so the feature you are buying it for is not on the cheap plan. There are also minimum user counts that make small teams pay for capacity they do not use.</p>
      <h2>Who should buy it</h2>
      <p>Creative agencies, in house marketing teams, and any organisation where work products go through formal review cycles. Teams that do not review creative assets are paying for a differentiator they will never use.</p>
    `,
    starting_price: 10,
    price_currency: "USD",
    price_vat_inclusive: false,
    pricing_note:
      "Billed in US dollars per user per month with minimum user counts. Proofing and approval, the main reason to choose Wrike, sits on the Business tier and above.",
    free_trial: true,
    free_version: true,
    pricing_plans: [
      {
        name: "Free",
        price: 0,
        period: "month",
        vat_inclusive: false,
        description: "Unlimited users, board and table views, limited storage.",
        user_limit: "Unlimited users",
        features: ["Board and table views", "Task management", "File sharing", "2 GB storage"],
      },
      {
        name: "Team",
        price: 10,
        period: "month",
        vat_inclusive: false,
        description: "Adds Gantt, dashboards, automation and integrations.",
        user_limit: "2 to 25 users",
        features: [
          "Gantt charts",
          "Custom dashboards",
          "50 automation actions a user a month",
          "Custom fields",
          "Integrations",
        ],
      },
      {
        name: "Business",
        price: 25,
        period: "month",
        vat_inclusive: false,
        description: "Adds proofing, approvals, custom item types and resource management.",
        user_limit: "5 to 200 users",
        popular: true,
        features: [
          "Everything in Team",
          "Proofing and approvals",
          "Custom item types",
          "Resource management",
          "Time tracking",
          "Custom request forms",
          "200 automation actions a user a month",
        ],
      },
    ],
    top_features: [
      "In browser proofing and mark up for images, video and PDFs",
      "Version tracked approval cycles that replace email chains",
      "Custom request forms that route intake with the right fields",
      "Custom item types for modelling briefs, campaigns and assets",
    ],
    features: [
      "Board, table, Gantt and calendar views",
      "Proofing and approvals",
      "Custom item types",
      "Custom request forms",
      "Resource management and workload",
      "Native time tracking",
      "Dashboards and reporting",
      "Automation",
      "Dependencies",
      "Guest reviewers",
      "Mobile app for iOS and Android",
      "Open API",
    ],
    integrations: [
      "Adobe Creative Cloud",
      "Microsoft 365",
      "Google Workspace",
      "Slack",
      "Salesforce",
      "Jira",
      "Zapier",
      "Dropbox",
    ],
    compliance: [
      "GDPR tooling that maps onto POPIA",
      "Role based permissions",
      "Data hosted outside South Africa",
      "Audit reports on enterprise tiers",
    ],
    best_for_size: ["11 to 50 employees", "51 to 200 employees"],
    best_for_role: ["Agency owner", "Marketing manager", "Creative director"],
    vendor_name: "Wrike Inc.",
    vendor_website: "https://www.wrike.com/",
    founded_year: 2006,
    support_types: ["Email", "Live chat", "Knowledge base", "Onboarding support"],
    target_rating: 4.0,
    review_count: 168,
  }),
];
