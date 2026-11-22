import type { CSSProperties } from "react";
import Effects from "../components/effects";
import Nav from "../components/nav";
import GravityStage from "../components/gravity-stage";
import { Globe, HeroScene } from "../components/three-client";
import Projects from "../components/projects";
import { Orbit, SkillTabs } from "../components/skills";
import Team from "../components/team";
import CodeTyper from "../components/code-typer";
import ContactForm from "../components/contact-form";
import { team } from "../lib/data";

const d = (n: number) => ({ ["--d" as string]: n }) as CSSProperties;

const FAQ = [
  [
    "How long does a typical project take?",
    "It depends on scope. After the discovery step we give you a written timeline with milestones, and you see working software at every sprint demo — never a surprise at the end.",
  ],
  [
    "Do you work with clients outside Myanmar?",
    "Yes. We're based in Yangon and work remotely with teams worldwide, using async updates, shared boards and regular video calls across time zones.",
  ],
  [
    "Which technologies do you use?",
    "Laravel, Node.js, Python, React, Vue, Next.js, React Native, Flutter, Docker, AWS and Power BI, among others. We recommend the stack that fits your problem, not the trend.",
  ],
  [
    "What happens after launch?",
    "We keep supporting you — bug fixes, monitoring, performance tuning and new features. Support plans are tailored to how critical the system is to your business.",
  ],
  [
    "How do we get started?",
    "Send us a short message about your idea. We'll schedule a free consultation, ask the right questions and come back with a clear proposal.",
  ],
];

const STEPS = [
  ["fa-comments", "Collect requirements", "We collaborate to understand your goals, users and constraints.", ["Discovery workshop", "Scope & requirements brief"]],
  ["fa-diagram-project", "Analyze & plan", "We turn requirements into a clear, realistic roadmap.", ["Architecture & tech stack", "Timeline & milestones"]],
  ["fa-code", "Develop solution", "Built with modern technologies and engineering best practices.", ["Agile sprints & demos", "Code review & QA"]],
  ["fa-rocket", "Deliver & support", "Seamless deployment followed by ongoing support.", ["Launch & handover", "Monitoring & maintenance"]],
] as const;

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div id="preloader" className="preloader" aria-hidden="true">
        <div className="preloader-word">
          {"XYNOTECH".split("").map((c, i) => (
            <span key={i} className={i > 3 ? "accent" : undefined} style={{ ["--i" as string]: i }}>
              {c}
            </span>
          ))}
        </div>
        <div className="preloader-bar">
          <span />
        </div>
      </div>

      <div className="scroll-progress" aria-hidden="true">
        <span id="scroll-progress" />
      </div>
      <div className="cursor-glow" id="cursor-glow" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <Effects />
      <Nav />

      <main id="main">
        {/* ============ HERO ============ */}
        <section id="home" className="hero" data-label="Home">
          <div className="hero-bg" aria-hidden="true">
            <div className="aurora a1" />
            <div className="aurora a2" />
            <div className="aurora a3" />
            <div className="hero-grid" />
          </div>
          <HeroScene />

          <div className="container hero-inner">
            <div className="hero-copy">
              <span className="eyebrow-pill" data-solid>
                <span className="live-dot" />
                XynoTech IT Solutions · Yangon, Myanmar
              </span>
              <h1 className="hero-title">
                <span className="line">
                  <span className="line-inner" data-solid>
                    We build software
                  </span>
                </span>
                <span className="line">
                  <span className="line-inner" data-solid>
                    that defies
                  </span>
                </span>
                <span className="line">
                  <span className="line-inner grad-text" data-solid>
                    gravity.
                  </span>
                </span>
              </h1>
              <p className="hero-lede" data-solid>
                Web platforms, mobile apps, data dashboards and AI systems — designed, engineered and supported by one focused team for 9+ years.
              </p>
              <div className="hero-ctas">
                <a href="#contact" className="btn btn-primary btn-lg magnetic" data-solid>
                  <span>Start a project</span>
                  <i className="fas fa-arrow-right" />
                </a>
                <a href="#portfolio" className="btn btn-ghost btn-lg magnetic" data-solid>
                  <i className="fas fa-play" />
                  <span>See our work</span>
                </a>
              </div>
              <div className="hero-proof" data-solid>
                <div className="avatar-stack">
                  {team.map((m) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={m.name} src={m.photo} alt="" width={36} height={36} />
                  ))}
                </div>
                <p>
                  <strong>36+ projects</strong> shipped for <strong>15+ clients</strong>
                </p>
              </div>
            </div>
          </div>

          <GravityStage />
        </section>

        {/* ============ MARQUEE ============ */}
        <section className="marquee-band" aria-label="Technologies we use">
          {[0, 1].map((row) => (
            <div key={row} className={`marquee${row ? " reverse" : ""}`} aria-hidden={row === 1}>
              {[0, 1].map((copy) => (
                <div key={copy} className="marquee-track" aria-hidden={copy === 1}>
                  {row === 0
                    ? [
                        ["fab fa-react", "React"],
                        ["fab fa-laravel", "Laravel"],
                        ["fab fa-vuejs", "Vue.js"],
                        ["fab fa-node-js", "Node.js"],
                        ["fab fa-python", "Python"],
                        ["fab fa-docker", "Docker"],
                        ["fab fa-aws", "AWS"],
                        ["fas fa-chart-column", "Power BI"],
                        ["fas fa-feather", "Flutter"],
                        ["fab fa-figma", "Figma"],
                      ].map(([icon, label]) => (
                        <span key={label}>
                          <i className={icon} /> {label}
                        </span>
                      ))
                    : ["Web Platforms", "Mobile Apps", "Data & BI", "AI Systems", "Cloud & DevOps", "Cybersecurity"].map((t) => (
                        <span key={t}>
                          <span className="outline">{t}</span>
                          <span className="star">✦</span>
                        </span>
                      ))}
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="section" data-label="About">
          <div className="container">
            <div className="about-grid">
              <div className="about-copy">
                <span className="eyebrow reveal">About XynoTech</span>
                <h2 className="section-title reveal">
                  Expert IT solutions for <span className="grad-text">modern business.</span>
                </h2>
                <p className="section-lede reveal">
                  XynoTech is a dynamic IT company specializing in software development, cloud solutions, cybersecurity and technical consulting. We pair senior
                  engineering with honest guidance so your technology drives efficiency and growth — not headaches.
                </p>
                <div className="feature-list">
                  {[
                    ["fa-users", "Professional consultants", "Expert guidance that keeps every decision tied to your business goals."],
                    ["fa-laptop-code", "Digital IT solutions", "Modern, maintainable systems that streamline operations and scale with you."],
                    ["fa-headset", "Support that stays", "We don't disappear after launch — monitoring, fixes and new features included."],
                  ].map(([icon, title, text], i) => (
                    <div key={title} className="feature reveal" style={d(i)}>
                      <div className="feature-icon">
                        <i className={`fas ${icon}`} />
                      </div>
                      <div>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="about-visual reveal">
                <div className="globe-wrap" data-tilt="5">
                  <Globe />
                  <div className="globe-card gc-1">
                    <i className="fas fa-location-dot" />
                    <div>
                      <strong>Yangon HQ</strong>
                      <span>Serving clients worldwide</span>
                    </div>
                  </div>
                  <div className="globe-card gc-2">
                    <i className="fas fa-bolt" />
                    <div>
                      <strong>Fast delivery</strong>
                      <span>Agile sprints &amp; weekly demos</span>
                    </div>
                  </div>
                  <div className="globe-card gc-3">
                    <i className="fas fa-shield-halved" />
                    <div>
                      <strong>Secure by default</strong>
                      <span>Clean, reviewed code</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats">
              {[
                [36, "+", "Projects delivered"],
                [15, "+", "Happy clients"],
                [9, "+", "Years of excellence"],
                [24, "/7", "Support coverage"],
              ].map(([n, suffix, label], i) => (
                <div key={label} className="stat reveal" style={d(i)}>
                  <div className="stat-num">
                    <span className="counter" data-target={n}>
                      {n}
                    </span>
                    <sup>{suffix}</sup>
                  </div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SERVICES ============ */}
        <section id="services" className="section" data-label="Services">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">What we do</span>
                <h2 className="section-title reveal">
                  Comprehensive IT <span className="grad-text">solutions.</span>
                </h2>
              </div>
              <p className="section-lede reveal">From the first line of code to the last dashboard — one team for your entire digital stack.</p>
            </div>

            <div className="bento">
              <article className="bento-card b-xl reveal" data-tilt="4" style={d(0)}>
                <div className="bento-body">
                  <div className="card-icon ci-blue">
                    <i className="fas fa-code" />
                  </div>
                  <h3>Custom Software &amp; Web Platforms</h3>
                  <p>ERP systems, e-commerce, portals and internal tools built on Laravel, Node.js, React and Next.js — fast, secure and built to last.</p>
                  <ul className="tag-row">
                    {["Laravel", "React", "Next.js", "Node.js"].map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
                <div className="code-window" aria-hidden="true">
                  <div className="cw-bar">
                    <i />
                    <i />
                    <i />
                    <span>deploy.ts</span>
                  </div>
                  <pre>
                    <CodeTyper />
                    <span className="caret" />
                  </pre>
                </div>
              </article>

              <article className="bento-card b-tall reveal" data-tilt="6" style={d(1)}>
                <div className="bento-body">
                  <div className="card-icon ci-violet">
                    <i className="fas fa-mobile-screen" />
                  </div>
                  <h3>Mobile App Development</h3>
                  <p>Cross-platform iOS &amp; Android apps with React Native and Flutter.</p>
                </div>
                <div className="phone-visual" aria-hidden="true">
                  <div className="phone">
                    <div className="phone-notch" />
                    <div className="notif n1">
                      <i className="fas fa-circle-check" /> Payment received
                    </div>
                    <div className="notif n2">
                      <i className="fas fa-bell" /> New order #1042
                    </div>
                    <div className="notif n3">
                      <i className="fas fa-star" /> 5-star review
                    </div>
                    <div className="phone-bars">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                </div>
              </article>

              <article className="bento-card reveal" data-tilt="8" style={d(2)}>
                <div className="card-icon ci-green">
                  <i className="fas fa-chart-column" />
                </div>
                <h3>Data &amp; Power BI</h3>
                <p>Dashboards and KPI tracking leaders actually use.</p>
                <div className="mini-bars" aria-hidden="true">
                  {[40, 70, 55, 90, 65, 80].map((h, i) => (
                    <i key={i} style={{ ["--h" as string]: `${h}%` }} />
                  ))}
                </div>
              </article>

              <article className="bento-card reveal" data-tilt="8" style={d(3)}>
                <div className="card-icon ci-pink">
                  <i className="fas fa-brain" />
                </div>
                <h3>AI &amp; Automation</h3>
                <p>Machine learning, predictive analytics and smart workflows.</p>
                <div className="neural" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </article>

              {[
                ["ci-cyan", "fa-cloud", "Cloud & DevOps", "Docker, AWS and CI/CD pipelines for reliable releases."],
                ["ci-amber", "fa-pen-nib", "UX/UI Strategy", "Research-driven interfaces that feel effortless."],
                ["ci-red", "fa-shield-halved", "Cybersecurity", "Audits, vulnerability scanning and compliance reports."],
                ["ci-blue", "fa-comments", "IT Consultancy", "The right technology and roadmap, chosen with you."],
              ].map(([color, icon, title, text], i) => (
                <article key={title} className="bento-card reveal" data-tilt="8" style={d(4 + i)}>
                  <div className={`card-icon ${color}`}>
                    <i className={`fas ${icon}`} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ PORTFOLIO ============ */}
        <section id="portfolio" className="section" data-label="Work">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">Selected work</span>
                <h2 className="section-title reveal">
                  Featured <span className="grad-text">projects.</span>
                </h2>
              </div>
              <p className="section-lede reveal">Real systems running real businesses — across web, mobile, AI, data and security.</p>
            </div>
            <Projects />
          </div>
        </section>

        {/* ============ PROCESS (light "paper" section) ============ */}
        <section id="process" className="section" data-label="Process" data-theme="light">
          <div className="container">
            <div className="section-head center">
              <div>
                <span className="eyebrow reveal">How we work</span>
                <h2 className="section-title reveal">
                  From idea to launch in <span className="grad-text">four moves.</span>
                </h2>
              </div>
            </div>
            <div className="timeline" id="timeline">
              <div className="timeline-line">
                <span id="timeline-fill" />
              </div>
              {STEPS.map(([icon, title, text, items], i) => (
                <div key={title} className="step reveal" style={d(i)}>
                  <div className="step-node">
                    <i className={`fas ${icon}`} />
                  </div>
                  <div className="step-card" data-tilt="6">
                    <span className="step-num">0{i + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <ul>
                      {items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section id="skills" className="section" data-label="Expertise">
          <div className="container skills-grid">
            <Orbit />
            <div>
              <span className="eyebrow reveal">Our expertise</span>
              <h2 className="section-title reveal">
                A full-stack <span className="grad-text">toolbox.</span>
              </h2>
              <p className="section-lede reveal">The technologies our team uses every day to design, build and run your product.</p>
              <SkillTabs />
            </div>
          </div>
        </section>

        {/* ============ TEAM ============ */}
        <section id="team" className="section" data-label="Team">
          <div className="container">
            <div className="section-head">
              <div>
                <span className="eyebrow reveal">The people</span>
                <h2 className="section-title reveal">
                  Meet the <span className="grad-text">experts.</span>
                </h2>
              </div>
              <p className="section-lede reveal">
                A small senior team — the people you meet are the people who build.
                <span className="hint-inline">Tap a card to flip it.</span>
              </p>
            </div>
            <Team />
          </div>
        </section>

        {/* ============ FAQ ============ */}
        <section id="faq" className="section" data-label="FAQ">
          <div className="container faq-grid">
            <div>
              <span className="eyebrow reveal">FAQ</span>
              <h2 className="section-title reveal">
                Questions, <span className="grad-text">answered.</span>
              </h2>
              <p className="section-lede reveal">
                Can&apos;t find what you need?{" "}
                <a href="#contact" className="link">
                  Send us a message
                </a>{" "}
                — we reply within one business day.
              </p>
            </div>
            <div className="faq-list">
              {FAQ.map(([q, a], i) => (
                <details key={q} className="faq reveal" style={d(i)} open={i === 0}>
                  <summary>
                    {q}
                    <i className="fas fa-plus" />
                  </summary>
                  <div className="faq-body">
                    <p>{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="section" data-label="Contact">
          <div className="container">
            <div className="contact-shell reveal">
              <div className="contact-glow" aria-hidden="true" />
              <div className="contact-grid">
                <div className="contact-copy">
                  <span className="eyebrow">Get in touch</span>
                  <h2 className="section-title">
                    Let&apos;s build something <span className="grad-text">amazing.</span>
                  </h2>
                  <p className="section-lede">Ready to turn your idea into reality? Tell us about it and get a free consultation.</p>
                  <div className="contact-cards">
                    <a className="contact-card" href="mailto:support@xynotechmm.com">
                      <span className="contact-icon">
                        <i className="fas fa-envelope" />
                      </span>
                      <span>
                        <small>Email us</small>support@xynotechmm.com
                      </span>
                    </a>
                    <a className="contact-card" href="tel:+959454375116">
                      <span className="contact-icon">
                        <i className="fas fa-phone" />
                      </span>
                      <span>
                        <small>Call us</small>+95 9 4543 7511 6
                      </span>
                    </a>
                    <div className="contact-card">
                      <span className="contact-icon">
                        <i className="fas fa-clock" />
                      </span>
                      <span>
                        <small>Business hours</small>Mon – Fri · 9:00 AM – 6:00 PM
                      </span>
                    </div>
                  </div>
                  <div className="socials">
                    <a href="https://linkedin.com/company/xynotech-mm" target="_blank" rel="noopener" aria-label="XynoTech on LinkedIn">
                      <i className="fab fa-linkedin-in" />
                    </a>
                    <a href="mailto:support@xynotechmm.com" aria-label="Email XynoTech">
                      <i className="fas fa-at" />
                    </a>
                  </div>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-big" aria-hidden="true">
            XYNOTECH
          </div>
          <div className="footer-grid">
            <div>
              <a href="#home" className="brand">
                <span className="brand-mark">XT</span>
                <span className="brand-word">
                  XYNO<span>TECH</span>
                </span>
              </a>
              <p className="footer-text">IT solutions &amp; software engineering from Yangon, Myanmar.</p>
            </div>
            <div>
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#team">Team</a>
              <a href="#process">Process</a>
              <a href="#faq">FAQ</a>
            </div>
            <div>
              <h4>Services</h4>
              <a href="#services">Web platforms</a>
              <a href="#services">Mobile apps</a>
              <a href="#services">Data &amp; BI</a>
              <a href="#services">AI &amp; automation</a>
            </div>
            <div>
              <h4>Contact</h4>
              <a href="mailto:support@xynotechmm.com">support@xynotechmm.com</a>
              <a href="tel:+959454375116">+95 9 4543 7511 6</a>
              <a href="https://linkedin.com/company/xynotech-mm" target="_blank" rel="noopener">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} XynoTech IT Solutions. All rights reserved.</span>
            <a href="#home" className="to-top">
              Back to top <i className="fas fa-arrow-up" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
