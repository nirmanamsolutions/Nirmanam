import React, { useRef } from 'react';
import { MessageSquare, Code, TestTube, Rocket, HeartHandshake, CheckCircle2 } from 'lucide-react';
import Reveal from '../animations/Reveal';
import { ExpandableBentoGrid } from './ui/expandable-bento-grid';

const HowWeWork = () => {
  const sectionRef = useRef(null);

  const processItems = [
    {
      id: 1,
      subtitle: "Phase 01",
      title: "Discovery & Architecture",
      description: "Defining scope, technical specifications, and project roadmap.",
      icon: <MessageSquare className="w-6 h-6" />,
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-base text-slate-300 leading-relaxed">
            We start by immersing ourselves in your domain, business goals, and user requirements. This phase produces a comprehensive architectural blueprint.
          </p>
          <ul className="flex flex-col gap-3.5 mt-3">
            <li className="flex items-start sm:items-center gap-3.5 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>In-depth requirements analysis & scoping workshops</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Scalable system architecture & database schema design</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Clear milestones, delivery timeline & tech stack selection</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      subtitle: "Phase 02",
      title: "Agile Development Sprint",
      description: "Iterative building with continuous feedback and staging previews.",
      icon: <Code className="w-6 h-6" />,
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-base text-slate-300 leading-relaxed">
            Our core engineering phase follows modern agile methodologies to build clean, maintainable code with high velocity and total transparency.
          </p>
          <ul className="flex flex-col gap-3.5 mt-3">
            <li className="flex items-start sm:items-center gap-3.5 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Iterative bi-weekly build cycles with clear deliverables</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Live demo staging environments for continuous review</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Clean, well-documented code repository with CI integration</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      subtitle: "Phase 03",
      title: "Quality & Security Audit",
      description: "Thorough testing, optimization, and security vulnerability checks.",
      icon: <TestTube className="w-6 h-6" />,
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-base text-slate-300 leading-relaxed">
            Before reaching production, every line of code undergo rigorous testing across performance, security, and user experience standards.
          </p>
          <ul className="flex flex-col gap-3.5 mt-3">
            <li className="flex items-start sm:items-center gap-3.5 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>End-to-end user flow & automated unit testing</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Performance optimization & Core Web Vitals audit</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Security, authentication & payload vulnerability checks</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 4,
      subtitle: "Phase 04",
      title: "Production Deployment",
      icon: <Rocket className="w-6 h-6" />,
      description: "Automated pipelines, SSL setup, domain routing & code handover.",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-base text-slate-300 leading-relaxed">
            Seamless transition to production servers with zero downtime deployment strategies and complete technical documentation handover.
          </p>
          <ul className="flex flex-col gap-3.5 mt-3">
            <li className="flex items-start sm:items-center gap-3.5 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Automated CI/CD deployment pipeline configuration</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Custom domain, DNS & SSL security certificate setup</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Comprehensive code handover & operations documentation</span>
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 5,
      subtitle: "Phase 05",
      title: "Growth & SLA Support",
      icon: <HeartHandshake className="w-6 h-6" />,
      description: "Post-launch maintenance, scalability monitoring, and feature iteration.",
      content: (
        <div className="flex flex-col gap-4">
          <p className="text-base text-slate-300 leading-relaxed">
            We stand by our work long after launch, ensuring your application remains fast, secure, and continuously evolving with your user base.
          </p>
          <ul className="flex flex-col gap-3.5 mt-3">
            <li className="flex items-start sm:items-center gap-3.5 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Dedicated post-launch bug fix guarantee</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>24/7 performance monitoring & traffic scale tuning</span>
            </li>
            <li className="flex items-start sm:items-center gap-3 text-sm sm:text-base text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>Long-term strategic enhancements & feature roadmap</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <section className="how-we-work py-20 px-4" id="process" ref={sectionRef} style={{ background: 'var(--bg-secondary)' }}>
      <div className="container max-w-6xl mx-auto">
        <Reveal>
          <div className="section-header text-center mb-14">
            <div className="section-tag inline-block px-3 py-1 text-xs font-semibold rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 mb-3 uppercase tracking-wider">
              Our Process
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How we <span className="gradient-text">approach projects</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
              A transparent, collaborative workflow from discovery to deployment. You're involved at every step.
            </p>
          </div>
        </Reveal>

        <ExpandableBentoGrid items={processItems} />
      </div>
    </section>
  );
};

export default HowWeWork;
