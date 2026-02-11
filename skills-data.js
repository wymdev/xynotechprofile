/**
 * Skills Data
 * XynoTech IT Solutions - Technical Skills & Expertise
 */

const skillsData = {
    frontend: [
        { name: "HTML5 & CSS3", proficiency: 95, icon: "fab fa-html5" },
        { name: "JavaScript (ES6+)", proficiency: 90, icon: "fab fa-js" },
        { name: "React.js", proficiency: 88, icon: "fab fa-react" },
        { name: "Vue.js", proficiency: 85, icon: "fab fa-vuejs" },
        { name: "Next.js", proficiency: 82, icon: "fas fa-code" },
        { name: "Tailwind CSS", proficiency: 90, icon: "fas fa-palette" }
    ],
    backend: [
        { name: "Node.js", proficiency: 87, icon: "fab fa-node-js" },
        { name: "PHP & Laravel", proficiency: 92, icon: "fab fa-php" },
        { name: "Python & Django", proficiency: 85, icon: "fab fa-python" },
        { name: "MySQL & PostgreSQL", proficiency: 88, icon: "fas fa-database" },
        { name: "MongoDB", proficiency: 80, icon: "fas fa-leaf" },
        { name: "RESTful APIs", proficiency: 90, icon: "fas fa-exchange-alt" }
    ],
    mobile: [
        { name: "React Native", proficiency: 85, icon: "fab fa-react" },
        { name: "Flutter", proficiency: 80, icon: "fas fa-mobile-alt" },
        { name: "iOS Development", proficiency: 75, icon: "fab fa-apple" },
        { name: "Android Development", proficiency: 78, icon: "fab fa-android" },
        { name: "Firebase", proficiency: 82, icon: "fas fa-fire" },
        { name: "Mobile UI/UX", proficiency: 88, icon: "fas fa-paint-brush" }
    ],
    tools: [
        { name: "Git & GitHub", proficiency: 92, icon: "fab fa-git-alt" },
        { name: "Docker", proficiency: 85, icon: "fab fa-docker" },
        { name: "AWS Services", proficiency: 80, icon: "fab fa-aws" },
        { name: "CI/CD Pipelines", proficiency: 78, icon: "fas fa-cogs" },
        { name: "Figma & Adobe XD", proficiency: 85, icon: "fab fa-figma" },
        { name: "Power BI", proficiency: 90, icon: "fas fa-chart-bar" }
    ],
    other: [
        { name: "Machine Learning", proficiency: 75, icon: "fas fa-brain" },
        { name: "Data Analytics", proficiency: 88, icon: "fas fa-chart-line" },
        { name: "Cybersecurity", proficiency: 80, icon: "fas fa-shield-alt" },
        { name: "Cloud Architecture", proficiency: 82, icon: "fas fa-cloud" },
        { name: "Agile & Scrum", proficiency: 90, icon: "fas fa-tasks" },
        { name: "Technical Writing", proficiency: 85, icon: "fas fa-file-alt" }
    ]
};

const skillCategories = [
    { id: "frontend", name: "Frontend", icon: "fas fa-laptop-code", color: "#00D4FF" },
    { id: "backend", name: "Backend", icon: "fas fa-server", color: "#0A2540" },
    { id: "mobile", name: "Mobile", icon: "fas fa-mobile-alt", color: "#6FE7FF" },
    { id: "tools", name: "Tools & DevOps", icon: "fas fa-tools", color: "#0099B8" },
    { id: "other", name: "Other Skills", icon: "fas fa-star", color: "#1B3A5C" }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { skillsData, skillCategories };
}
