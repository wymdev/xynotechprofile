// Content for the XynoTech site. Edit here — every section reads from this file.

export type Category = "web" | "mobile" | "ai" | "data" | "security";

export interface Project {
  id: number;
  title: string;
  category: Category;
  tags: string[];
  description: string;
  fullDescription: string;
  /** Optional screenshot path under /public. When empty, generated artwork is shown. */
  image?: string;
  /** Leave empty to hide the button in the project modal. */
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  year: string;
  client: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Enterprise Resource Planning System",
    category: "web",
    tags: ["Laravel", "Vue.js", "MySQL", "Docker"],
    description: "Comprehensive ERP solution for a manufacturing company with inventory, HR and financial modules.",
    fullDescription:
      "Developed a full-scale ERP system handling 500+ daily users across multiple departments. Features include real-time inventory tracking, automated reporting, role-based access control, and integration with existing legacy systems.",
    featured: true,
    year: "2024",
    client: "Manufacturing Corp",
  },
  {
    id: 2,
    title: "Mobile Banking Application",
    category: "mobile",
    tags: ["React Native", "Node.js", "MongoDB", "AWS"],
    description: "Secure mobile banking app with biometric authentication and real-time transaction processing.",
    fullDescription:
      "Built a cross-platform mobile banking solution with end-to-end encryption, fingerprint/face ID authentication, instant fund transfers, bill payments, and comprehensive transaction history. Deployed on both iOS and Android platforms.",
    featured: true,
    year: "2023",
    client: "FinTech Startup",
  },
  {
    id: 3,
    title: "AI-Powered Analytics Dashboard",
    category: "ai",
    tags: ["Python", "TensorFlow", "React", "PostgreSQL"],
    description: "Machine learning dashboard for predictive analytics and business intelligence.",
    fullDescription:
      "Developed an AI-powered analytics platform that processes large datasets to provide predictive insights, trend analysis, and automated reporting. Features include custom ML models, interactive visualizations, and real-time data processing.",
    featured: true,
    year: "2024",
    client: "Data Analytics Inc",
  },
  {
    id: 4,
    title: "E-Commerce Platform",
    category: "web",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Vercel"],
    description: "Modern e-commerce platform with advanced product filtering and payment integration.",
    fullDescription:
      "Created a high-performance e-commerce solution with server-side rendering, advanced search capabilities, multi-currency support, inventory management, and seamless payment processing through Stripe integration.",
    year: "2023",
    client: "Retail Business",
  },
  {
    id: 5,
    title: "Healthcare Management System",
    category: "web",
    tags: ["PHP", "MySQL", "Bootstrap", "Chart.js"],
    description: "Patient management system for clinics with appointment scheduling and medical records.",
    fullDescription:
      "Comprehensive healthcare management platform featuring patient registration, appointment scheduling, electronic medical records, prescription management, and billing integration, built with robust security measures.",
    year: "2023",
    client: "Medical Clinic",
  },
  {
    id: 6,
    title: "IoT Smart Home App",
    category: "mobile",
    tags: ["Flutter", "Firebase", "MQTT", "IoT"],
    description: "Smart home control application with real-time device monitoring and automation.",
    fullDescription:
      "Developed a comprehensive IoT solution for smart home automation, allowing users to control lights, thermostats, security cameras, and appliances remotely. Features include voice control integration, scheduling, and energy consumption monitoring.",
    year: "2024",
    client: "Smart Home Tech",
  },
  {
    id: 7,
    title: "Business Intelligence Dashboard",
    category: "data",
    tags: ["Power BI", "SQL Server", "DAX", "Azure"],
    description: "Interactive Power BI dashboards for executive decision-making and KPI tracking.",
    fullDescription:
      "Designed and implemented comprehensive Power BI dashboards integrating data from multiple sources. Features include real-time KPI monitoring, drill-down capabilities, automated refresh schedules, and mobile-optimized reports.",
    year: "2023",
    client: "Enterprise Corp",
  },
  {
    id: 8,
    title: "Cybersecurity Audit Platform",
    category: "security",
    tags: ["Python", "Django", "Celery", "Redis"],
    description: "Automated security audit tool for vulnerability scanning and compliance reporting.",
    fullDescription:
      "Built an enterprise-grade security audit platform that performs automated vulnerability scans, generates compliance reports (ISO 27001, GDPR), and provides actionable remediation recommendations. Includes scheduled scanning and email alerts.",
    year: "2024",
    client: "Security Firm",
  },
  {
    id: 9,
    title: "Restaurant Management System",
    category: "web",
    tags: ["Laravel", "Vue.js", "MySQL", "Pusher"],
    description: "Complete restaurant POS system with kitchen display and inventory management.",
    fullDescription:
      "Comprehensive restaurant management solution featuring POS, kitchen display system, table management, inventory tracking, employee scheduling, and detailed sales analytics. Real-time order updates using WebSocket technology.",
    year: "2023",
    client: "Restaurant Chain",
  },
];

export const categories: { id: "all" | Category; name: string; icon: string }[] = [
  { id: "all", name: "All", icon: "fa-border-all" },
  { id: "web", name: "Web", icon: "fa-globe" },
  { id: "mobile", name: "Mobile", icon: "fa-mobile-screen" },
  { id: "ai", name: "AI & ML", icon: "fa-brain" },
  { id: "data", name: "Data", icon: "fa-chart-line" },
  { id: "security", name: "Security", icon: "fa-shield-halved" },
];

export const categoryName: Record<Category, string> = {
  web: "Web Development",
  mobile: "Mobile App",
  ai: "AI & ML",
  data: "Data Analytics",
  security: "Cybersecurity",
};

export interface Skill {
  name: string;
  proficiency: number;
  icon: string;
}

export const skillGroups: { id: string; name: string; icon: string; skills: Skill[] }[] = [
  {
    id: "frontend",
    name: "Frontend",
    icon: "fas fa-laptop-code",
    skills: [
      { name: "HTML5 & CSS3", proficiency: 95, icon: "fab fa-html5" },
      { name: "JavaScript (ES6+)", proficiency: 90, icon: "fab fa-js" },
      { name: "React.js", proficiency: 88, icon: "fab fa-react" },
      { name: "Vue.js", proficiency: 85, icon: "fab fa-vuejs" },
      { name: "Next.js", proficiency: 82, icon: "fas fa-n" },
      { name: "Tailwind CSS", proficiency: 90, icon: "fas fa-wind" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    icon: "fas fa-server",
    skills: [
      { name: "Node.js", proficiency: 87, icon: "fab fa-node-js" },
      { name: "PHP & Laravel", proficiency: 92, icon: "fab fa-laravel" },
      { name: "Python & Django", proficiency: 85, icon: "fab fa-python" },
      { name: "MySQL & PostgreSQL", proficiency: 88, icon: "fas fa-database" },
      { name: "MongoDB", proficiency: 80, icon: "fas fa-leaf" },
      { name: "RESTful APIs", proficiency: 90, icon: "fas fa-plug" },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    icon: "fas fa-mobile-screen",
    skills: [
      { name: "React Native", proficiency: 85, icon: "fab fa-react" },
      { name: "Flutter", proficiency: 80, icon: "fas fa-feather" },
      { name: "iOS Development", proficiency: 75, icon: "fab fa-apple" },
      { name: "Android Development", proficiency: 78, icon: "fab fa-android" },
      { name: "Firebase", proficiency: 82, icon: "fas fa-fire" },
      { name: "Mobile UI/UX", proficiency: 88, icon: "fas fa-paintbrush" },
    ],
  },
  {
    id: "tools",
    name: "DevOps",
    icon: "fas fa-screwdriver-wrench",
    skills: [
      { name: "Git & GitHub", proficiency: 92, icon: "fab fa-git-alt" },
      { name: "Docker", proficiency: 85, icon: "fab fa-docker" },
      { name: "AWS Services", proficiency: 80, icon: "fab fa-aws" },
      { name: "CI/CD Pipelines", proficiency: 78, icon: "fas fa-gears" },
      { name: "Figma & Adobe XD", proficiency: 85, icon: "fab fa-figma" },
      { name: "Power BI", proficiency: 90, icon: "fas fa-chart-column" },
    ],
  },
  {
    id: "other",
    name: "More",
    icon: "fas fa-star",
    skills: [
      { name: "Machine Learning", proficiency: 75, icon: "fas fa-brain" },
      { name: "Data Analytics", proficiency: 88, icon: "fas fa-chart-line" },
      { name: "Cybersecurity", proficiency: 80, icon: "fas fa-shield-halved" },
      { name: "Cloud Architecture", proficiency: 82, icon: "fas fa-cloud" },
      { name: "Agile & Scrum", proficiency: 90, icon: "fas fa-list-check" },
      { name: "Technical Writing", proficiency: 85, icon: "fas fa-file-lines" },
    ],
  },
];

export interface Member {
  name: string;
  role: string;
  photo: string;
  bio: string;
  tags: string[];
  links: { label: string; href: string; icon: string }[];
}

export const team: Member[] = [
  {
    name: "Wai Yan Maing",
    role: "Founder",
    photo: "/team/wymprofile.jpg",
    bio: "Leads XynoTech's vision and delivery — working alongside every client from the first conversation to launch and beyond.",
    tags: ["Leadership", "Full-stack", "Delivery"],
    links: [
      { label: "Website", href: "https://waiyanmaing.space", icon: "fas fa-globe" },
      { label: "Facebook", href: "https://www.facebook.com/waiyanmaingdev", icon: "fab fa-facebook-f" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/waiyanmaing-dev/", icon: "fab fa-linkedin-in" },
      { label: "GitHub", href: "https://github.com/wymdev", icon: "fab fa-github" },
    ],
  },
  {
    name: "Zayar Lynn",
    role: "Full-Stack Developer",
    photo: "/team/zayarlynn.jpg",
    bio: "Builds end-to-end web platforms — from database design and APIs to polished, responsive front-ends.",
    tags: ["Web", "APIs", "Databases"],
    links: [
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100037102381937", icon: "fab fa-facebook-f" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/zayar-lynn-067720248/", icon: "fab fa-linkedin-in" },
      { label: "GitHub", href: "https://github.com/Zayar-lynn", icon: "fab fa-github" },
    ],
  },
  {
    name: "Zay Lin",
    role: "Full-Stack Developer",
    photo: "/team/zaylin.jpg",
    bio: "Ships robust web applications and back-end services with a focus on performance and clean, maintainable code.",
    tags: ["Web", "Back-end", "Performance"],
    links: [
      { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100008503519319", icon: "fab fa-facebook-f" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/zay-lin-htet/", icon: "fab fa-linkedin-in" },
      { label: "GitHub", href: "https://github.com/ZayLin799", icon: "fab fa-github" },
    ],
  },
  {
    name: "Paing Pyae Thu",
    role: "Mobile Developer",
    photo: "/team/ppt.jpg",
    bio: "Crafts cross-platform mobile apps with smooth, native-feeling experiences on iOS and Android.",
    tags: ["React Native", "iOS", "Android"],
    links: [{ label: "GitHub", href: "https://github.com/paingpyaethu", icon: "fab fa-github" }],
  },
];

/** Chips that fall in the hero gravity playground. */
export const gravityChips: { label?: string; icon: string; color: string; orb?: boolean }[] = [
  { label: "React", icon: "fab fa-react", color: "c-blue" },
  { label: "Laravel", icon: "fab fa-laravel", color: "c-pink" },
  { label: "Next.js", icon: "fas fa-n", color: "c-white" },
  { label: "Flutter", icon: "fas fa-feather", color: "c-cyan" },
  { label: "Node.js", icon: "fab fa-node-js", color: "c-green" },
  { label: "Python", icon: "fab fa-python", color: "c-amber" },
  { label: "Docker", icon: "fab fa-docker", color: "c-blue" },
  { label: "AWS", icon: "fab fa-aws", color: "c-glass" },
  { label: "Power BI", icon: "fas fa-chart-column", color: "c-amber" },
  { label: "AI / ML", icon: "fas fa-microchip", color: "c-violet" },
  { label: "Vue.js", icon: "fab fa-vuejs", color: "c-green" },
  { label: "React Native", icon: "fab fa-react", color: "c-violet" },
  { icon: "fas fa-bolt", color: "c-amber", orb: true },
  { label: "Cybersecurity", icon: "fas fa-shield-halved", color: "c-glass" },
  { label: "Figma", icon: "fab fa-figma", color: "c-pink" },
  { label: "PostgreSQL", icon: "fas fa-database", color: "c-blue" },
  { icon: "fas fa-code", color: "c-cyan", orb: true },
  { label: "Cloud", icon: "fas fa-cloud", color: "c-glass" },
  { label: "UX / UI", icon: "fas fa-pen-nib", color: "c-white" },
  { label: "Firebase", icon: "fas fa-fire", color: "c-amber" },
  { label: "Android", icon: "fab fa-android", color: "c-green" },
  { label: "iOS", icon: "fab fa-apple", color: "c-white" },
  { icon: "fas fa-rocket", color: "c-pink", orb: true },
  { label: "TensorFlow", icon: "fas fa-brain", color: "c-violet" },
  { label: "MySQL", icon: "fas fa-database", color: "c-cyan" },
  { label: "APIs", icon: "fas fa-plug", color: "c-glass" },
  { label: "Git", icon: "fab fa-git-alt", color: "c-pink" },
  { icon: "fas fa-heart", color: "c-violet", orb: true },
  { label: "Tailwind", icon: "fas fa-wind", color: "c-cyan" },
  { label: "JavaScript", icon: "fab fa-js", color: "c-amber" },
];

export const orbitIcons = [
  "fab fa-react",
  "fab fa-laravel",
  "fab fa-vuejs",
  "fab fa-node-js",
  "fab fa-python",
  "fab fa-docker",
  "fab fa-aws",
  "fab fa-figma",
  "fab fa-git-alt",
  "fab fa-android",
  "fab fa-apple",
  "fab fa-js",
];
