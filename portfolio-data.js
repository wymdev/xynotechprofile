/**
 * Portfolio Projects Data
 * XynoTech IT Solutions - Project Showcase
 */

const portfolioData = [
    {
        id: 1,
        title: "Enterprise Resource Planning System",
        category: "web",
        tags: ["Laravel", "Vue.js", "MySQL", "Docker"],
        description: "Comprehensive ERP solution for manufacturing company with inventory management, HR, and financial modules.",
        fullDescription: "Developed a full-scale ERP system handling 500+ daily users across multiple departments. Features include real-time inventory tracking, automated reporting, role-based access control, and integration with existing legacy systems.",
        image: "https://via.placeholder.com/800x600/6366f1/ffffff?text=ERP+System",
        demoUrl: "#",
        githubUrl: "#",
        featured: true,
        year: "2024",
        client: "Manufacturing Corp"
    },
    {
        id: 2,
        title: "Mobile Banking Application",
        category: "mobile",
        tags: ["React Native", "Node.js", "MongoDB", "AWS"],
        description: "Secure mobile banking app with biometric authentication and real-time transaction processing.",
        fullDescription: "Built a cross-platform mobile banking solution with end-to-end encryption, fingerprint/face ID authentication, instant fund transfers, bill payments, and comprehensive transaction history. Deployed on both iOS and Android platforms.",
        image: "https://via.placeholder.com/800x600/8b5cf6/ffffff?text=Mobile+Banking",
        demoUrl: "#",
        githubUrl: "#",
        featured: true,
        year: "2023",
        client: "FinTech Startup"
    },
    {
        id: 3,
        title: "AI-Powered Analytics Dashboard",
        category: "ai",
        tags: ["Python", "TensorFlow", "React", "PostgreSQL"],
        description: "Machine learning dashboard for predictive analytics and business intelligence.",
        fullDescription: "Developed an AI-powered analytics platform that processes large datasets to provide predictive insights, trend analysis, and automated reporting. Features include custom ML models, interactive visualizations, and real-time data processing.",
        image: "https://via.placeholder.com/800x600/ec4899/ffffff?text=AI+Analytics",
        demoUrl: "#",
        githubUrl: "#",
        featured: true,
        year: "2024",
        client: "Data Analytics Inc"
    },
    {
        id: 4,
        title: "E-Commerce Platform",
        category: "web",
        tags: ["Next.js", "Stripe", "Tailwind CSS", "Vercel"],
        description: "Modern e-commerce platform with advanced product filtering and payment integration.",
        fullDescription: "Created a high-performance e-commerce solution with server-side rendering, advanced search capabilities, multi-currency support, inventory management, and seamless payment processing through Stripe integration.",
        image: "https://via.placeholder.com/800x600/06b6d4/ffffff?text=E-Commerce",
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2023",
        client: "Retail Business"
    },
    {
        id: 5,
        title: "Healthcare Management System",
        category: "web",
        tags: ["PHP", "MySQL", "Bootstrap", "Chart.js"],
        description: "Patient management system for clinics with appointment scheduling and medical records.",
        fullDescription: "Comprehensive healthcare management platform featuring patient registration, appointment scheduling, electronic medical records, prescription management, and billing integration. HIPAA-compliant with robust security measures.",
        image: "https://via.placeholder.com/800x600/4f46e5/ffffff?text=Healthcare+System",
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2023",
        client: "Medical Clinic"
    },
    {
        id: 6,
        title: "IoT Smart Home App",
        category: "mobile",
        tags: ["Flutter", "Firebase", "MQTT", "IoT"],
        description: "Smart home control application with real-time device monitoring and automation.",
        fullDescription: "Developed a comprehensive IoT solution for smart home automation, allowing users to control lights, thermostats, security cameras, and appliances remotely. Features include voice control integration, scheduling, and energy consumption monitoring.",
        image: "https://via.placeholder.com/800x600/7c3aed/ffffff?text=Smart+Home",
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2024",
        client: "Smart Home Tech"
    },
    {
        id: 7,
        title: "Business Intelligence Dashboard",
        category: "data",
        tags: ["Power BI", "SQL Server", "DAX", "Azure"],
        description: "Interactive Power BI dashboards for executive decision-making and KPI tracking.",
        fullDescription: "Designed and implemented comprehensive Power BI dashboards integrating data from multiple sources. Features include real-time KPI monitoring, drill-down capabilities, automated refresh schedules, and mobile-optimized reports.",
        image: "https://via.placeholder.com/800x600/0891b2/ffffff?text=Power+BI",
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2023",
        client: "Enterprise Corp"
    },
    {
        id: 8,
        title: "Cybersecurity Audit Platform",
        category: "security",
        tags: ["Python", "Django", "Celery", "Redis"],
        description: "Automated security audit tool for vulnerability scanning and compliance reporting.",
        fullDescription: "Built an enterprise-grade security audit platform that performs automated vulnerability scans, generates compliance reports (ISO 27001, GDPR), and provides actionable remediation recommendations. Includes scheduled scanning and email alerts.",
        image: "https://via.placeholder.com/800x600/db2777/ffffff?text=Security+Audit",
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2024",
        client: "Security Firm"
    },
    {
        id: 9,
        title: "Restaurant Management System",
        category: "web",
        tags: ["Laravel", "Vue.js", "MySQL", "Pusher"],
        description: "Complete restaurant POS system with kitchen display and inventory management.",
        fullDescription: "Comprehensive restaurant management solution featuring POS, kitchen display system, table management, inventory tracking, employee scheduling, and detailed sales analytics. Real-time order updates using WebSocket technology.",
        image: "https://via.placeholder.com/800x600/6366f1/ffffff?text=Restaurant+POS",
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
        year: "2023",
        client: "Restaurant Chain"
    }
];

// Portfolio categories for filtering
const portfolioCategories = [
    { id: "all", name: "All Projects", icon: "fa-th" },
    { id: "web", name: "Web Development", icon: "fa-globe" },
    { id: "mobile", name: "Mobile Apps", icon: "fa-mobile-alt" },
    { id: "ai", name: "AI & ML", icon: "fa-brain" },
    { id: "data", name: "Data Analytics", icon: "fa-chart-line" },
    { id: "security", name: "Cybersecurity", icon: "fa-shield-alt" }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { portfolioData, portfolioCategories };
}
