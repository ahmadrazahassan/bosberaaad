/**
 * Reviewer identity corpus. Names are drawn across the country's language
 * groups so the reviewer list looks like South Africa rather than like a
 * London directory. First and last names are combined by the generator, so
 * no individual in this file corresponds to a real person.
 */

export const FIRST_NAMES = [
  // Nguni
  "Thandiwe", "Sipho", "Nomsa", "Bongani", "Zanele", "Sibusiso", "Nokuthula", "Mandla",
  "Lindiwe", "Themba", "Nonhlanhla", "Siyabonga", "Ayanda", "Lungile", "Sanele", "Zodwa",
  "Mbali", "Andile", "Nosipho", "Musa", "Buhle", "Khanyisile", "Nkosinathi", "Phumzile",
  // Sotho, Tswana, Pedi
  "Tebogo", "Kgomotso", "Lerato", "Mpho", "Refilwe", "Katlego", "Palesa", "Neo",
  "Dineo", "Tshepo", "Boitumelo", "Karabo", "Reabetswe", "Ofentse", "Naledi", "Kabelo",
  // Venda, Tsonga
  "Rudzani", "Mulalo", "Rendani", "Hlengiwe", "Rhulani", "Tinyiko", "Nkateko", "Vhutshilo",
  // Afrikaans
  "Pieter", "Annelize", "Johan", "Marlize", "Riaan", "Elmarie", "Hendrik", "Sunette",
  "Willem", "Chantelle", "Deon", "Marisa", "Francois", "Ilze", "Jaco", "Anke",
  "Stefan", "Lizelle", "Andre", "Retha", "Christiaan", "Danielle", "Gerhard", "Nadia",
  // English
  "Michael", "Sarah", "David", "Claire", "James", "Rebecca", "Andrew", "Nicola",
  "Grant", "Megan", "Craig", "Kirsten", "Ryan", "Tracy", "Kevin", "Jenna",
  // South African Indian
  "Priya", "Rajesh", "Anisha", "Vikash", "Shalini", "Deven", "Yashika", "Naresh",
  "Kavitha", "Ravi", "Suresh", "Meera", "Ashwin", "Nirvana", "Preggie", "Sarisha",
  // Cape Muslim and Coloured community names
  "Faizel", "Shireen", "Yusuf", "Zaida", "Riedwaan", "Nadia", "Achmat", "Fatima",
  "Cheslyn", "Charmaine", "Wayne", "Denise", "Bradley", "Lucinda", "Ashley", "Michelle",
] as const;

export const LAST_NAMES = [
  "Mokoena", "Nkosi", "Dlamini", "Khumalo", "Ndlovu", "Mahlangu", "Zulu", "Mthembu",
  "Sithole", "Mabaso", "Ngcobo", "Buthelezi", "Cele", "Zwane", "Radebe", "Mnisi",
  "Molefe", "Motaung", "Sekhukhune", "Ramaphosa", "Maleka", "Phiri", "Mashaba", "Segwapa",
  "Mudau", "Netshitenzhe", "Ramavhoya", "Baloyi", "Chauke", "Mabunda", "Nkuna", "Hlungwani",
  "van der Merwe", "Botha", "Pretorius", "Nel", "du Plessis", "Venter", "Steyn", "Kruger",
  "van Wyk", "Fourie", "Coetzee", "Joubert", "Erasmus", "Swanepoel", "Lombard", "Bezuidenhout",
  "Smith", "Jones", "Williams", "Roberts", "Taylor", "Anderson", "Bennett", "Fletcher",
  "Naidoo", "Pillay", "Govender", "Reddy", "Moodley", "Singh", "Maharaj", "Chetty",
  "Adams", "Isaacs", "Jacobs", "Davids", "September", "October", "Arendse", "Petersen",
  "Hendricks", "Abrahams", "Solomons", "Cupido", "Fortuin", "Titus", "Windvogel", "Kannemeyer",
] as const;

export const CITIES = [
  "Johannesburg", "Cape Town", "Durban", "Pretoria", "Gqeberha", "Bloemfontein",
  "East London", "Polokwane", "Nelspruit", "Kimberley", "Rustenburg", "Pietermaritzburg",
  "George", "Stellenbosch", "Centurion", "Sandton", "Midrand", "Randburg",
  "Somerset West", "Paarl", "Vereeniging", "Witbank", "Klerksdorp", "Richards Bay",
] as const;

export const INDUSTRIES = [
  "Accounting", "Legal services", "Manufacturing", "Retail", "Wholesale and distribution",
  "Construction", "Engineering", "Information technology", "Marketing and advertising",
  "Financial services", "Insurance", "Healthcare", "Education", "Non profit",
  "Logistics and transport", "Hospitality", "Agriculture", "Mining services",
  "Property and real estate", "Security services", "Professional consulting",
  "Motor trade", "Food and beverage", "Telecommunications", "Recruitment",
] as const;

export const JOB_TITLES: Record<string, string[]> = {
  finance: [
    "Financial Manager", "Financial Director", "Group Financial Manager", "Bookkeeper",
    "Senior Bookkeeper", "Accountant", "Management Accountant", "Financial Controller",
    "Practice Manager", "Audit Manager", "Creditors Clerk", "Debtors Manager",
  ],
  payroll: [
    "Payroll Administrator", "Payroll Manager", "Payroll and Benefits Officer",
    "HR and Payroll Manager", "Senior Payroll Consultant", "Wages Clerk",
  ],
  hr: [
    "HR Manager", "HR Director", "HR Business Partner", "HR Officer",
    "Talent Acquisition Lead", "Learning and Development Manager",
    "Industrial Relations Manager", "Employment Equity Officer", "People Operations Lead",
  ],
  sales: [
    "Sales Manager", "Sales Director", "Business Development Manager", "Account Executive",
    "Head of Revenue", "Regional Sales Manager", "Inside Sales Lead", "Key Accounts Manager",
  ],
  operations: [
    "Operations Manager", "Operations Director", "Supply Chain Manager", "Production Manager",
    "Warehouse Manager", "Procurement Manager", "Logistics Coordinator", "Plant Manager",
  ],
  project: [
    "Project Manager", "Senior Project Manager", "Programme Director", "Project Coordinator",
    "Delivery Manager", "Head of Delivery", "PMO Lead", "Scrum Master",
  ],
  owner: [
    "Managing Director", "Founder", "Owner", "Chief Executive Officer",
    "Chief Operating Officer", "General Manager", "Partner",
  ],
  marketing: [
    "Marketing Manager", "Head of Marketing", "Digital Marketing Manager",
    "Brand Manager", "Creative Director", "Studio Manager",
  ],
  it: [
    "IT Manager", "Systems Administrator", "Head of IT", "Business Systems Analyst",
    "IT Director", "Solutions Architect",
  ],
};

/** Which job title pools suit which category, in weighting order. */
export const CATEGORY_ROLE_POOLS: Record<string, (keyof typeof JOB_TITLES)[]> = {
  "cat-accounting": ["finance", "finance", "owner", "operations"],
  "cat-payroll": ["payroll", "payroll", "finance", "hr", "owner"],
  "cat-hr": ["hr", "hr", "owner", "operations"],
  "cat-crm": ["sales", "sales", "marketing", "owner"],
  "cat-erp": ["operations", "finance", "it", "owner"],
  "cat-project-management": ["project", "project", "marketing", "operations", "it"],
};

export const COMPANY_PREFIXES = [
  "Ubuntu", "Kalahari", "Highveld", "Karoo", "Table Bay", "Drakensberg", "Sandveld",
  "Vaal", "Zambezi", "Cederberg", "Overberg", "Bushveld", "Amatola", "Winelands",
  "Maluti", "Tugela", "Magaliesberg", "Boland", "Lowveld", "Suikerbos",
] as const;

export const COMPANY_SUFFIXES = [
  "Holdings", "Group", "Trading", "Solutions", "Industries", "Distributors",
  "Manufacturing", "Consulting", "Services", "Logistics", "Partners", "Projects",
  "Supplies", "Systems", "Associates", "Engineering",
] as const;
