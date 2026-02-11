# XynoTech IT Solutions - Portfolio Website

A modern, responsive portfolio website showcasing XynoTech's IT solutions and services. Built with vanilla HTML, CSS, and JavaScript featuring advanced animations, interactive components, and premium design aesthetics.

![XynoTech](https://via.placeholder.com/1200x400/6366f1/ffffff?text=XynoTech+IT+Solutions)

## ✨ Features

### 🎯 Core Sections
- **Hero Section** - Eye-catching landing with animated statistics and gradient effects
- **About** - Company overview with feature highlights
- **Skills** - Interactive skill visualization with animated progress bars across 5 categories
- **Services** - Comprehensive IT service offerings
- **Portfolio** - Filterable project showcase with 9 featured projects and modal details
- **Process** - 4-step workflow visualization
- **Team** - Team member profiles with social links
- **Contact** - Professional contact form with validation

### 🚀 Advanced Features
- **Interactive Portfolio** - Category filtering, project modals, lazy loading
- **Skills Visualization** - Animated progress bars, category tabs, shimmer effects
- **Cursor Trail Animation** - Flowing particle effect following mouse movement across entire background
- **Smooth Animations** - Scroll-triggered reveals, micro-interactions
- **Glassmorphism Design** - Modern frosted glass effects throughout
- **Responsive Design** - Mobile-first approach, works on all devices
- **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- **Performance** - Lazy loading images, optimized assets
- **Accessibility** - ARIA labels, keyboard navigation support

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, animations, glassmorphism
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **Font Awesome** - Icon library
- **Google Fonts** - Inter font family

## 📁 Project Structure

```
xynotechprofile/
├── .gitignore              # Git ignore rules
├── index.html              # Main HTML file
├── style.css               # Custom styles and animations
├── portfolio-data.js       # Portfolio projects data
├── skills-data.js          # Skills and proficiency data
├── master_code.md          # Engineering standards documentation
├── README.md               # Project documentation
├── sitemap.xml             # SEO sitemap
├── robots.txt              # Crawler instructions
└── assets/
    ├── img/
    │   ├── team/          # Team member photos
    │   └── portfolio/     # Project screenshots
    ├── css/
    ├── fonts/
    └── js/
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/xynotechprofile.git
   cd xynotechprofile
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
   
   **Using Python:**
   ```bash
   python -m http.server 8000
   ```
   
   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```
   
   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

3. **Visit** `http://localhost:8000`

## 🎨 Customization

### Update Portfolio Projects
Edit `portfolio-data.js` to add/modify projects:
```javascript
{
    id: 10,
    title: "Your Project",
    category: "web", // web, mobile, ai, data, security
    tags: ["React", "Node.js"],
    description: "Short description",
    fullDescription: "Detailed description",
    image: "path/to/image.jpg",
    demoUrl: "https://demo.com",
    githubUrl: "https://github.com/...",
    featured: true,
    year: "2024",
    client: "Client Name"
}
```

### Update Skills
Edit `skills-data.js` to modify skills:
```javascript
frontend: [
    { name: "Your Skill", proficiency: 90, icon: "fab fa-icon" }
]
```

### Change Colors
Modify CSS custom properties in `style.css`:
```css
:root {
    --primary: #0A2540;
    --purple: #00D4FF;
    --pink: #6FE7FF;
    --dark-900: #F6F9FC;
    --text: #697386;
    /* ... */
}
```

### Update Team Members
Edit the team section in `index.html` with your team information and photos.

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📈 Performance

- Lighthouse Score: 90+ (target)
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.8s

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Wai Yan Maing** - Founder - [Website](https://waiyanmaing.space) | [LinkedIn](https://www.linkedin.com/in/waiyanmaing-dev/)
- **Zayar Lynn** - FullStack Developer - [LinkedIn](https://www.linkedin.com/in/zayar-lynn-067720248/)
- **Zay Lin** - FullStack Developer - [LinkedIn](https://www.linkedin.com/in/zay-lin-htet/)
- **Paing Pyae Thu** - Mobile Developer - [GitHub](https://github.com/paingpyaethu)

## 📧 Contact

- **Email**: support@xynotechmm.com
- **Phone**: +95 9 4543 7511 6
- **LinkedIn**: [XynoTech](https://linkedin.com/company/xynotech-mm)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- Tailwind CSS for utility classes
- Placeholder.com for placeholder images

---

**Made with ❤️ by XynoTech IT Solutions**
