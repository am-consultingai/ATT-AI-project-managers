/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Linkedin,
  Mail,
  ArrowRight,
  Check,
  X,
  Zap,
  Brain,
  Bot,
  Info,
  Calendar,
  Layout,
  Terminal,
  FileText,
  BookOpen,
  Github,
  Download,
  ExternalLink
} from 'lucide-react';

// --- Constants & Assets ---
const BRAND_LOGO = "https://github.com/israelichamberit-cmd/images/blob/main/AM_Logo.png?raw=true";
const ATNT_LOGO = "https://cdn.jsdelivr.net/gh/israelichamberit-cmd/images@main/customers/atnt%20-%20Copy.png";
const STAGE_PHOTO = "https://github.com/israelichamberit-cmd/images/blob/main/AI_Chamber_Stage.jpeg?raw=true";
const STAGE_PHOTO_FALLBACK = "https://github.com/israelichamberit-cmd/images/blob/main/AI_Chamber_stage_2.JPG?raw=true";
const INSTRUCTOR_PHOTO = "https://github.com/israelichamberit-cmd/images/blob/main/avishay_casual_nw.png?raw=true";
const LINKEDIN_ICON = "https://github.com/israelichamberit-cmd/images/blob/main/linkedin.png?raw=true";

const MAILTO_LINK = "mailto:office@amconsultingai.com?subject=Request%20for%20a%20tailored%20keynote/workshop&body=Hi%20AM%20Consulting%20team%2C%0A%0AI'd%20love%20to%20hop%20on%20a%20brief%20call%20to%20provide%20more%20context%20on%20my%20specific%20needs%20and%20explore%20potential%20collaboration.%0A%0ACould%20you%20please%20suggest%20three%20available%20time%20slots%20for%20a%20Zoom%20call%20sometime%20next%20week%3F%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D";

// --- Components ---

const TypewriterHeader = () => {
  const words = ['Orchestrating', 'Building', 'Automating'];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Typewriter effect
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const wait = setTimeout(() => setReverse(true), 1500);
      return () => clearTimeout(wait);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 40 : 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  // Cursor blink
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  return (
    <div className="min-h-[2.4em] md:min-h-[2.8em] mb-8">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.1] text-white"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-500">
          Stop Prompting.
        </span>
        <br />
        <div className="inline-flex items-baseline">
          <span className="whitespace-nowrap">Start&nbsp;</span>
          <div className="relative inline-block">
            {/* Invisibly render the longest word to reserve space and prevent "dancing" */}
            <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">
              Orchestrating
            </span>
            <div className="absolute left-0 top-0 flex items-baseline">
              <span className="bg-gradient-to-r from-accent-blue to-accent-indigo bg-clip-text text-transparent whitespace-nowrap">
                {words[index].substring(0, subIndex)}
              </span>
              <span className={`${blink ? 'opacity-100' : 'opacity-0'} text-accent-blue ml-1 inline-block w-[3px] h-[0.8em] bg-accent-blue transition-opacity duration-100`}></span>
            </div>
          </div>
        </div>
      </motion.h1>
    </div>
  );
};

const WorkshopCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({days: 0, hours: 0, minutes: 0, seconds: 0});

  useEffect(() => {
    // Workshop starts: May 6, 2026 09:30 AM Israel Time (UTC+3)
    const targetDate = new Date("2026-05-06T09:30:00+03:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-4 px-6 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-4 font-mono">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-white lining-nums">{format(timeLeft.days)}</span>
          <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Days</span>
        </div>
        <span className="text-white/20 text-2xl font-light mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-white lining-nums">{format(timeLeft.hours)}</span>
          <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Hrs</span>
        </div>
        <span className="text-white/20 text-2xl font-light mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-white lining-nums">{format(timeLeft.minutes)}</span>
          <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Min</span>
        </div>
        <span className="text-accent-blue/40 text-2xl font-light mb-4">:</span>
        <div className="flex flex-col items-center">
          <span className="text-3xl font-black text-accent-blue lining-nums">{format(timeLeft.seconds)}</span>
          <span className="text-[8px] uppercase tracking-widest text-accent-blue font-bold">Sec</span>
        </div>
      </div>
      <div className="ml-4 pl-6 border-l border-white/10 flex flex-col justify-center">
        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] font-mono mb-1">Kickoff</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse"></div>
          <span className="text-[11px] text-accent-blue font-bold font-mono uppercase">Live</span>
        </div>
      </div>
    </div>
  );
};

const CanvasAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: any[] = [];
    const w = canvas.width = canvas.offsetWidth;
    const h = canvas.height = canvas.offsetHeight;
    const nodeCount = Math.min(65, Math.floor(w / 18));

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = 'rgba(74, 144, 217, 0.15)';
      ctx.fillStyle = 'rgba(74, 144, 217, 0.38)';

      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.sqrt((node.x - other.x) ** 2 + (node.y - other.y) ** 2);
          if (dist < 155) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.lineWidth = (1 - dist / 155) * 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-55 pointer-events-none" />;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[62px] flex items-center px-6 ${scrolled ? 'bg-bg-deep/80 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-transparent border-b border-white/5'}`}>
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <a href="https://www.amconsultingai.com" target="_blank" rel="noopener noreferrer">
            <img src={BRAND_LOGO} alt="AM Consulting" className="h-8 brightness-110" referrerPolicy="no-referrer" />
          </a>
          <div className="flex items-center gap-2">
            <img src={ATNT_LOGO} alt="AT&T" className="h-6 opacity-80" referrerPolicy="no-referrer" />
            <span className="px-2 py-1 rounded bg-accent-blue/20 border border-accent-blue/30 text-accent-blue text-[10px] uppercase tracking-widest font-bold font-mono">
              AT&T Internal
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-slate-400">
          <a href="#challenge" className="hover:text-white transition-colors">The Challenge</a>
          <a href="#shifts" className="hover:text-white transition-colors">What Changes</a>
          <a href="#syllabus" className="hover:text-white transition-colors">Syllabus</a>
          <a href="#materials" className="hover:text-white transition-colors">Materials</a>
          <a href="#who" className="hover:text-white transition-colors">Who It's For</a>
          <a href="#about" className="hover:text-white transition-colors">Instructor</a>
          <a 
            href={MAILTO_LINK}
            className="bg-white text-bg-deep px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 group shadow-lg shadow-white/5 active:scale-95"
          >
            Request Training <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden flex flex-col md:flex-row pt-[62px]">
      <div className="flex-1 relative flex flex-col justify-center px-6 md:px-12 py-12 z-10">
        <CanvasAnimation />
        
        <div className="max-w-2xl relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-[10px] font-bold tracking-widest uppercase font-mono">
              Two-Day Intensive · May 6–7, 2026 · VS Code
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/5 border border-white/10 text-white/50 text-[10px] font-bold tracking-widest uppercase font-mono">
              <Check className="w-3 h-3 text-accent-blue" />
              Designed for AT&T Project Managers
            </div>
          </motion.div>
          
          <TypewriterHeader />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 leading-relaxed"
          >
            You've moved past basic AI chat. Now build the infrastructure that runs your project delivery — autonomously.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a 
              href={MAILTO_LINK}
              className="bg-white text-bg-deep px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-white/5 group active:scale-95"
            >
              Request your training now!! <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#syllabus"
              className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all"
            >
              See the full syllabus
            </a>
          </motion.div>

          {/* Date Chips & Countdown */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col gap-10"
          >
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Wednesday</span>
                <span className="text-4xl font-extrabold text-white">6</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">May 2026</span>
              </div>
              <ArrowRight className="w-6 h-6 text-white/10 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Thursday</span>
                <span className="text-4xl font-extrabold text-white">7</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-1">May 2026</span>
              </div>
            </div>
            
          </motion.div>
        </div>
      </div>

      <div className="md:w-[45%] relative h-[400px] md:h-auto min-h-[500px]">
        <img 
          src={STAGE_PHOTO} 
          alt="Speaker on stage" 
          className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100 duration-1000" 
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = STAGE_PHOTO_FALLBACK;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep via-bg-deep/40 to-transparent md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-transparent to-transparent" />
      </div>
    </section>
  );
};

const PainPoints = () => {
  const points = [
    {
      emoji: "🔋",
      title: "Your AI runs out of gas mid-month",
      text: "Token exhaustion cuts your automated tools off before the sprint ends. You're manually compensating instead of staying automated."
    },
    {
      emoji: "🔁",
      title: "You re-explain the same logic every session",
      text: "Your reporting standards, UI preferences, and project logic vanish between sessions. Re-guiding the AI burns hours you don't have."
    },
    {
      emoji: "🖱️",
      title: "You're a user — not yet a builder",
      text: "You know there's a gap between \"I use AI\" and \"I build AI infrastructure.\" This workshop is exactly that on-ramp — with a working tool delivered on Day 2."
    }
  ];

  return (
    <section id="challenge" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full border border-accent-blue/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-accent-blue font-mono">The Challenge</h2>
          </div>
          <h3 className="text-4xl font-bold text-white mb-4">
            Do You Recognize This?
          </h3>
          <p className="text-lg text-slate-400">The high-performance PM threshold is shifting. Are you still manually prompting while the engine stalls?</p>
        </div>

        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6">
          {points.map((point, i) => (
            <div 
              key={i} 
              className="flex-shrink-0 w-[330px] md:w-[380px] snap-start bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl group hover:border-white/20 transition-all"
            >
              <div className="text-4xl mb-6">{point.emoji}</div>
              <h3 className="text-xl font-bold text-white mb-4">{point.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{point.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex items-center justify-center gap-2 text-slate-500 text-xs animate-pulse font-mono uppercase tracking-tighter">
          <ArrowRight className="w-3 h-3" /> Scroll to see all
        </div>
      </div>
    </section>
  );
};

const ThreeShifts = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const shifts = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Efficiency",
      label: "The Burn Rate",
      summary: "Solve token depletion.",
      detail: "Master model selection and context-window optimization inside VS Code. Choose the right model for each task so complex agents run reliably through the billing cycle without manual intervention."
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Logic",
      label: "Codifying Standards",
      summary: "Persistent Skills.",
      detail: "Transition from daily prompting to creating Persistent Skills—configurations that live inside VS Code and carry your specific logic and visual standards forward into every session."
    },
    {
      icon: <Bot className="w-5 h-5" />,
      title: "Autonomy",
      label: "Digital PMO",
      summary: "Architecting Engines.",
      detail: "Day 2 puts you in the build seat. Connect live APIs inside VS Code to create an autonomous agent that reads Jira, maps roadmaps, and generates reports without manual prompts."
    }
  ];

  return (
    <section id="shifts" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full border border-accent-indigo/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <div className="w-2 h-2 rounded-full bg-accent-indigo"></div>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-accent-indigo font-mono">The Transition</h2>
            </div>
            <h3 className="text-4xl font-bold text-white mb-6">
              The Three Shifts
            </h3>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Concrete outcomes designed to turn you from a tool-user into a tool-builder.
            </p>
            
            <div className="flex flex-col gap-3">
              {shifts.map((shift, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                  className={`group flex items-center gap-4 p-4 rounded-xl transition-all border ${activeIndex === i ? 'bg-white border-white text-bg-deep shadow-xl' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${activeIndex === i ? 'bg-bg-deep text-white' : 'bg-white/5 text-slate-500 group-hover:text-white'}`}>
                    {shift.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold uppercase tracking-wider opacity-60">{shift.title}</div>
                    <div className="font-extrabold">{shift.label}</div>
                  </div>
                  <ArrowRight className={`w-4 h-4 ml-auto transition-transform ${activeIndex === i ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 relative">
            <div className="aspect-[16/9] lg:aspect-video bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-10 flex flex-col justify-center relative overflow-hidden group min-h-[320px]">
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-indigo/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] font-black text-accent-indigo uppercase tracking-[0.3em] font-mono">Context & Detail</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <h4 className="text-3xl font-extrabold text-white mb-4">{shifts[activeIndex].summary}</h4>
                  <p className="text-xl text-slate-300 leading-relaxed max-w-xl">
                    {shifts[activeIndex].detail}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Decorative line */}
              <div className="absolute bottom-10 left-10 right-10 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-accent-indigo"
                  initial={false}
                  animate={{ width: `${((activeIndex + 1) / shifts.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Syllabus = () => {
  const [activeTab, setActiveTab] = useState(0);

  const syllabus = [
    {
      title: "Day 1",
      subtitle: "Architecture & Efficiency",
      meta: "Foundation Phase",
      goal: "Equip participants to look at their day-to-day from an AI-first perspective and spot automation opportunities.",
      description: "Learn to think of processes as input and output flows and connect systems together—essentially becoming builders rather than just users.",
      outcomes: [
        {
          title: "Token Resource Management",
          detail: "Mastering model selection and context window optimization within VS Code to eliminate quota exhaustion."
        },
        {
          title: "Structural Logic Design",
          detail: "Learning to transform manual, repetitive project management tasks into 'System Instructions' and 'Persistent Skills' that live within the AI's memory."
        },
        {
          title: "Process Mapping & Use Case Selection",
          detail: "Mapping internal project flows to identify high-impact use cases (such as Jira automation) for the hands-on session."
        }
      ]
    },
    {
      title: "Day 2",
      subtitle: "The Automation Lab",
      meta: "Implementation Phase",
      goal: "'Dirty hands' development. Take blueprints from Day 1 and build functional, autonomous PM assets directly in VS Code.",
      description: "Functional development where strategy meets code to deliver a working 'Digital PMO' infrastructure.",
      outcomes: [
        {
          title: "Autonomous Agent Implementation",
          detail: "Building a functional AI agent that connects external data sources like Jira to automate roadmap mapping or status reporting."
        },
        {
          title: "Secure Skill Configuration",
          detail: "Hard-coding visual and logical standards into VS Code using secure configurations for production-ready internal tools."
        },
        {
          title: "Scaling and Distribution",
          detail: "Learning how to package and share 'Digital PMO' tools so they can be utilized across different teams and domains."
        }
      ]
    }
  ];

  return (
    <section id="syllabus" className="py-24 px-6 relative scroll-mt-[62px]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-white font-mono">The Curriculum</h2>
          </div>
          <h3 className="text-4xl font-extrabold text-white mb-6">The "Next-Gen PM" Intensive</h3>
          <p className="text-lg text-slate-400 max-w-2xl">A structured sequence from foundational strategy to live automation tool delivery.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Tabs Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {syllabus.map((day, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`w-full p-8 rounded-2xl transition-all text-left border ${activeTab === i ? 'bg-white border-white text-bg-deep shadow-2xl scale-[1.02]' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
              >
                <div className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-60 font-mono">{day.meta}</div>
                <div className="font-extrabold text-2xl mb-1">{day.title}</div>
                <div className={`text-sm font-bold ${activeTab === i ? 'text-bg-deep/70' : 'text-slate-500'}`}>{day.subtitle}</div>
              </button>
            ))}
            
            <div className="p-6 bg-accent-blue/10 border border-accent-blue/20 rounded-2xl mt-12">
              <p className="text-[10px] font-bold text-accent-blue uppercase tracking-widest font-mono mb-4">Outlook</p>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Day 1 builds the PM's strategy; Day 2 builds the PM's engine."
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-white">{syllabus[activeTab].goal}</h4>
                  <p className="text-slate-400 leading-relaxed">{syllabus[activeTab].description}</p>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] font-mono block">Learning Outcomes</span>
                  {syllabus[activeTab].outcomes.map((outcome, j) => (
                    <div 
                      key={j} 
                      className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all flex gap-6"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white shrink-0 font-mono font-bold">
                        0{j + 1}
                      </div>
                      <div>
                        <h5 className="font-bold text-white mb-2">{outcome.title}</h5>
                        <p className="text-sm text-slate-400 leading-relaxed">{outcome.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const CourseMaterials = () => {
  const materials = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Workshop Presentation",
      subtitle: "PDF · 16 slides",
      description: "The complete workshop deck covering VS Code setup, context management, MCPs, and Skills. The foundation for building your AI-powered PM infrastructure.",
      highlight: "Includes the core principle: Plan first, execute in phases.",
      link: "./course-materials/VS_code_PM_ATT_6_7-5-2026.pdf",
      linkText: "Download PDF",
      isDownload: true
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Planning Skill Template",
      subtitle: "Markdown · Reusable Template",
      description: "A structured planning workflow you can adapt for any project. Defines vision, business logic, phased R&D plans, and deployment strategy.",
      highlight: "The secret to smooth AI interactions: invest in planning upfront.",
      link: "./course-materials/planning.md",
      linkText: "View Template",
      isDownload: true
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "Awesome AI Skills",
      subtitle: "GitHub · Community Collection",
      description: "A curated repository of production-ready AI Skills, resources, and tools. Find pre-built skills for automation, development, and workflow optimization.",
      highlight: "Includes a Project Manager skill ready to use.",
      link: "https://github.com/ComposioHQ/awesome-claude-skills",
      linkText: "Explore Repository",
      isDownload: false
    }
  ];

  return (
    <section id="materials" className="py-24 px-6 relative scroll-mt-[62px]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full border border-accent-blue/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-accent-blue font-mono">Resources</h2>
          </div>
          <h3 className="text-4xl font-extrabold text-white mb-6">Course Materials</h3>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you need to continue building after the workshop. Remember: <span className="text-white font-semibold">planning is the multiplier</span> — invest in it, and your AI interactions become dramatically smoother.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((material, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-b from-accent-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" />
              <div className="relative h-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:border-white/20 transition-all flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue mb-6 group-hover:scale-110 transition-transform">
                  {material.icon}
                </div>

                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">{material.subtitle}</div>
                <h4 className="text-xl font-bold text-white mb-3">{material.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-grow">{material.description}</p>

                <div className="bg-accent-blue/5 border border-accent-blue/10 rounded-lg p-3 mb-6">
                  <p className="text-xs text-accent-blue leading-relaxed italic">{material.highlight}</p>
                </div>

                <a
                  href={material.link}
                  target={material.isDownload ? "_self" : "_blank"}
                  rel={material.isDownload ? undefined : "noopener noreferrer"}
                  download={material.isDownload ? true : undefined}
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-white text-sm font-bold transition-all group/btn"
                >
                  {material.isDownload ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  {material.linkText}
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md text-center">
          <p className="text-slate-400 text-sm leading-relaxed">
            <span className="text-white font-semibold">Pro tip:</span> Start with the Planning Template before diving into automation.
            A clear plan means fewer iterations, less token consumption, and AI that actually delivers what you need.
          </p>
        </div>
      </div>
    </section>
  );
};

const Progression = () => {
  const steps = [
    {
      label: "Efficiency",
      d1: { title: "Architecture", text: "Token & Model Optimization." },
      d2: { title: "Stability", text: "Complex Apps, No Quota Hits." }
    },
    {
      label: "Logic",
      d1: { title: "Persistence", text: "Codifying Visual Standards." },
      d2: { title: "Consistency", text: "Tools That Never Forget." }
    },
    {
      label: "Strategy",
      d1: { title: "Mapping", text: "Jira Data Flow Blueprints." },
      d2: { title: "Automation", text: "Live, Autonomous API Tools." }
    }
  ];

  return (
    <section className="py-24 px-6 relative bg-white/2 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-widest text-white font-mono">The Progression</h2>
          </div>
          <h3 className="text-4xl font-extrabold text-white mt-4">Day 1 Strategy → Day 2 Engine</h3>
          <p className="text-slate-400 mt-6 text-sm uppercase tracking-widest font-mono">How the foundation enables the execution</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-b from-accent-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl blur-xl" />
              <div className="relative border border-white/10 rounded-2xl overflow-hidden bg-bg-deep transition-all group-hover:border-white/20">
                <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex justify-between items-center">
                  <span className="text-[10px] font-black text-accent-blue uppercase tracking-widest font-mono">{step.label}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1">Day 1: Blueprint</div>
                    <div className="text-white font-bold">{step.d1.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase italic tracking-tighter">{step.d1.text}</div>
                  </div>
                  <div className="flex justify-center">
                    <ArrowRight className="w-4 h-4 text-white/10 rotate-90" />
                  </div>
                  <div>
                    <div className="text-[8px] font-bold text-accent-blue uppercase tracking-widest mb-1">Day 2: Engine</div>
                    <div className="text-white font-bold">{step.d2.title}</div>
                    <div className="text-[10px] text-slate-500 mt-1 uppercase italic tracking-tighter">{step.d2.text}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl text-center">
          <p className="text-white/60 text-lg leading-relaxed italic max-w-3xl mx-auto">
            "Without the token management and 'Skill' definitions from the first day, the complex agents we build on Day 2 would be too expensive to run and would require constant manual correction."
          </p>
        </div>
      </div>
    </section>
  );
};

const ExcelAnimation = () => {
  const [data, setData] = useState([
    { id: '101', status: 'In Review', impact: 45, auto: 'No' },
    { id: '102', status: 'Pending', impact: 12, auto: 'No' },
    { id: '103', status: 'Draft', impact: 8, auto: 'No' },
    { id: '104', status: 'Review', impact: 32, auto: 'No' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(row => ({
        ...row,
        status: 'Optimizing...',
        auto: '...'
      })));

      setTimeout(() => {
        setData([
          { id: '101', status: 'Automated', impact: 98, auto: 'Yes' },
          { id: '102', status: 'Automated', impact: 92, auto: 'Yes' },
          { id: '103', status: 'Automated', impact: 85, auto: 'Yes' },
          { id: '104', status: 'Automated', impact: 94, auto: 'Yes' },
        ]);
      }, 1000);

      setTimeout(() => {
        setData([
          { id: '101', status: 'In Review', impact: 45, auto: 'No' },
          { id: '102', status: 'Pending', impact: 12, auto: 'No' },
          { id: '103', status: 'Draft', impact: 8, auto: 'No' },
          { id: '104', status: 'Review', impact: 32, auto: 'No' },
        ]);
      }, 4000);

    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-[10px]">
      <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <div className="w-2 h-2 rounded-full bg-green-400" />
        </div>
        <div className="text-white/40">pmo_dashboard.xlsx</div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-white/5 text-white/40">
            <th className="p-3 text-left border-r border-b border-white/5">ID</th>
            <th className="p-3 text-left border-r border-b border-white/5">Status</th>
            <th className="p-3 text-left border-r border-b border-white/5">Score</th>
            <th className="p-3 text-left border-b border-white/5">Skill</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="text-slate-300">
              <td className="p-3 border-r border-b border-white/5">{row.id}</td>
              <td className="p-3 border-r border-b border-white/5">
                <span className={`${row.status === 'Automated' ? 'text-accent-blue' : 'text-slate-500'}`}>
                  {row.status}
                </span>
              </td>
              <td className="p-3 border-r border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-accent-blue" 
                      animate={{ width: `${row.impact}%` }} 
                    />
                  </div>
                  <span>{row.impact}%</span>
                </div>
              </td>
              <td className="p-3 border-b border-white/5 text-center">
                <span className={row.auto === 'Yes' ? 'text-accent-blue' : 'text-slate-500'}>{row.auto}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const WhoItIsFor = () => {
  return (
    <section id="who" className="py-24 px-6 relative scroll-mt-[62px]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-8 rounded-full border border-accent-blue/50 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
              </div>
              <h2 className="text-xl font-bold uppercase tracking-widest text-accent-blue font-mono">Who It's For</h2>
            </div>
            <h3 className="text-4xl font-bold text-white leading-tight mb-8">Is This You?</h3>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              This workshop is for the Project Manager who has already moved past basic AI chat — and is now hitting the ceiling of what individual prompting can do.
            </p>
            
            <div className="space-y-6">
              {[
                "You're technically proficient with AI tools and use them in your daily workflow",
                "You manage complex projects across systems including Jira",
                "You're rebuilding the same logic every AI session and losing time because of it",
                "You work in VS Code, or are ready to adopt it as your primary workspace"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="mt-1 w-6 h-6 flex-shrink-0 bg-accent-blue/10 border border-accent-blue/20 rounded-lg flex items-center justify-center text-accent-blue transition-all group-hover:scale-110 group-hover:bg-accent-blue/20">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="text-slate-200 font-medium">{item}</span>
                </div>
              ))}
              <div className="flex items-start gap-4 pt-4 border-t border-white/5">
                <div className="mt-1 w-6 h-6 flex-shrink-0 bg-white/5 rounded-lg flex items-center justify-center text-slate-600">
                  <X className="w-4 h-4" />
                </div>
                <span className="text-slate-600 font-medium italic">This is not an introduction to AI — the fundamentals are skipped entirely.</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-center p-8 lg:p-12 overflow-hidden shadow-3xl">
              <div className="w-full">
                <ExcelAnimation />
                <div className="mt-6 space-y-3">
                  {[1, 2].map(i => (
                    <div key={i} className={`h-8 bg-white/5 rounded-lg border border-white/10 flex items-center px-4 gap-4 animate-pulse opacity-40`} style={{ animationDelay: `${i * 0.2}s` }}>
                      <div className="w-3 h-3 bg-accent-blue/20 rounded" />
                      <div className="h-1.5 flex-1 bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Atmospheric blob inside the card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent-blue/15 rounded-full blur-[80px] pointer-events-none" />
            </div>
            
            {/* Float accent */}
            <div className="absolute -bottom-8 -left-8 p-6 bg-slate-900/80 shadow-2xl rounded-2xl border border-white/10 flex items-center gap-4 max-w-[240px] backdrop-blur-xl">
              <div className="w-12 h-12 bg-accent-blue rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_20px_rgba(59,130,246,0.5)]">PM</div>
              <div className="text-[9px] text-white leading-tight font-mono uppercase tracking-[0.2em]">
                <span className="block font-bold mb-1">Automation ready</span>
                <span className="text-accent-blue">Digital PMO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutInstructor = () => {
  return (
    <section id="about" className="py-24 px-6 scroll-mt-[62px] relative overflow-hidden">
      {/* Decorative center line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20 relative z-10">
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border-2 border-accent-blue/30 p-2 mb-6 shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all hover:border-accent-blue/60 group">
            <img 
              src={INSTRUCTOR_PHOTO} 
              alt="Avishay Meron" 
              className="w-full h-full object-cover rounded-full bg-slate-800 grayscale transition-all group-hover:grayscale-0" 
              referrerPolicy="no-referrer"
            />
          </div>
          <h3 className="text-2xl font-extrabold mb-1 bg-clip-text bg-gradient-to-r from-white to-slate-400 text-transparent">Avishay Meron</h3>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest font-mono mb-6">CEO & Founder, AM Consulting</p>
          <a 
            href="https://www.linkedin.com/in/avishay-meron/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-all bg-white/5 border border-white/10 px-5 py-2.5 rounded-lg uppercase tracking-widest font-mono hover:bg-white/10"
          >
            <Linkedin className="w-4 h-4 text-accent-blue" />
            LinkedIn
          </a>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 font-mono">Your Facilitator</h2>
          </div>
          
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            Avishay Meron has been "taming" Artificial Intelligence for over a decade, bringing rich and unique experience to the forefront of technology. As the CEO and Founder of AM Consulting, Avishay guides organizations through the adoption and implementation of AI solutions.
          </p>
          <p className="text-lg text-slate-400 leading-relaxed mb-8">
            With over 10 patents in the field of AI, he specializes in making complex AI concepts accessible to any audience, transforming technology into a practical everyday work partner.
          </p>
          <a 
            href={MAILTO_LINK}
            className="inline-flex items-center gap-2 text-accent-blue hover:text-white font-bold transition-all group uppercase text-xs tracking-widest font-mono"
          >
            Request a tailored keynote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-32 px-6 bg-transparent relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-px h-12 bg-gradient-to-t from-accent-blue to-transparent"></div>
          <span className="text-[10px] font-bold text-accent-blue uppercase tracking-[0.3em] font-mono">Request Access</span>
          <div className="w-px h-12 bg-gradient-to-t from-accent-blue to-transparent"></div>
        </div>
        
        <h2 className="text-[clamp(2.6rem,5vw,4rem)] font-extrabold leading-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-500">
          Build Your AI Engine.
        </h2>
        <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Two focused half-days. One working AI infrastructure. Built by you, in VS Code, ready to deploy.
        </p>
        
        <div className="flex flex-col items-center gap-8">
          <a 
            href={MAILTO_LINK}
            className="bg-white text-bg-deep px-10 py-5 rounded-2xl font-extrabold text-lg flex items-center gap-3 transition-all shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)] active:scale-95 uppercase tracking-widest font-mono"
          >
            Request Training <ArrowRight className="w-6 h-6" />
          </a>
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-12 text-xs text-slate-500 font-bold uppercase tracking-[0.2em] font-mono">
          <div className="flex flex-col items-center gap-3">
             <span className="text-slate-400">Dates</span>
             <span className="text-slate-200">May 6 – 7, 2026</span>
          </div>
          <div className="flex flex-col items-center gap-3">
             <span className="text-slate-400">Environment</span>
             <span className="text-slate-200">VS Code</span>
          </div>
          <div className="flex flex-col items-center gap-3">
             <span className="text-slate-400">Type</span>
             <span className="text-slate-200">AT&T Internal Use</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="px-6 py-12 relative z-10">
      <div className="max-w-7xl mx-auto pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img src={BRAND_LOGO} alt="AM Consulting" className="h-7 opacity-60 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
          <div className="text-xs text-slate-400 font-bold uppercase tracking-[0.2em] font-mono">
            © 2026 AM Consulting Group 
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xs text-slate-500 uppercase font-bold font-mono tracking-widest">Classification</span>
            <span className="text-xs text-slate-300 font-bold font-mono">AT&T INTERNAL USE ONLY</span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xs text-slate-500 uppercase font-bold font-mono tracking-widest">Workshop ID</span>
            <span className="text-xs text-slate-300 font-bold font-mono tracking-widest">AM_AI_PMO_26</span>
          </div>
        </div>

        <div className="flex gap-4">
          <a href={MAILTO_LINK} className="px-6 py-2.5 bg-white text-bg-deep text-xs font-black rounded-lg uppercase tracking-widest font-mono hover:scale-105 transition-all shadow-lg active:scale-95">
            Contact
          </a>
          <a href="https://www.linkedin.com/in/avishay-meron/" target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-lg uppercase tracking-widest font-mono hover:bg-white/10 transition-all">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  // Handle hash navigation after React mounts
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="font-sans bg-bg-deep text-slate-100 selection:bg-accent-blue/20 selection:text-white scroll-smooth relative">
      {/* Target Audience Banner */}
      <div className="relative z-[60] bg-white text-bg-deep py-2 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] font-mono whitespace-nowrap">
            Exclusive Session: Project Managers Only
          </p>
          <div className="hidden sm:block h-px w-8 bg-bg-deep/10" />
          <p className="hidden sm:block text-[9px] font-bold uppercase tracking-widest font-mono opacity-60">
            AT&T Digital PMO Strategy Workshop 2026
          </p>
        </div>
        {/* Subtle diagonal texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 1px, #000 1px, #000 2px)', backgroundSize: '8px 8px' }}></div>
      </div>

      {/* Global Atmospheric Elements */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-blue/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent-indigo/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <PainPoints />
        <ThreeShifts />
        <Syllabus />
        <CourseMaterials />
        <Progression />
        <WhoItIsFor />
        <AboutInstructor />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
