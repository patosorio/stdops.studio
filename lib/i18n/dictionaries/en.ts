import type { Dictionary } from "./types";
import { accents } from "@/lib/design/accents";

export const en: Dictionary = {
  meta: {
    title: "Enterprise-grade automation, priced for your business | stdops",
    description:
      "8+ years shipping production systems for European enterprises — now bringing that rigour to Thai SMBs running on Google Workspace, LINE and spreadsheets.",
  },
  nav: {
    items: [
      { label: "Services", href: "/services", color: accents.blue },
      { label: "Work", href: "/work", color: accents.yellow },
      { label: "Blog", href: "/blog", color: accents.green },
      { label: "Pricing", href: "/pricing", color: accents.red },
      { label: "How it works", href: "/how-it-works", color: accents.green },
      { label: "About", href: "/about", color: accents.blue },
      { label: "Contact", href: "/contact", color: accents.yellow },
    ],
    lineLabel: "LINE",
    menuOpen: "Menu",
    menuClose: "Close",
  },
  home: {
    headline: "Enterprise-grade automation, priced for your business.",
    sub: "8+ years shipping production systems for European enterprises — now bringing that rigour to Thai SMBs running on Google Workspace, LINE and spreadsheets.",
    proofLabel: "employees migrated",
    proofValue: "22,000",
    priceLabel: "starting package",
    priceValue: "฿25,000",
    lineCta: "Chat on LINE",
    servicesTitle: "Services",
    proofTitle: "Proven results",
    services: [
      { name: "Workspace Automation", desc: "Sheets, Forms, Gmail, Drive, Calendar wired into real workflows", price: "From ฿25,000", href: "/services/workspace", color: accents.blue },
      { name: "Business Website", desc: "Websites and web apps for Thai businesses", price: "From ฿45,000", href: "/services/web", color: accents.yellow },
      { name: "AI Flows", desc: "LINE agents, document processing, quotation bots", price: "From ฿50,000", href: "/services/ai", color: accents.red },
      { name: "Data Flows", desc: "POS, accounting, LINE, Shopee/Lazada in one layer", price: "From ฿180,000", href: "/services/data", color: accents.green },
    ],
    proofs: [
      { num: "70%", desc: "Faster order processing — European pharmaceutical company", color: accents.blue },
      { num: "85%", desc: "Less manual data entry — European manufacturing company", color: accents.red },
      { num: "22K", desc: "HR records migrated to BigQuery — European supermarket chain", color: accents.green },
    ],
  },
  services: {
    meta: {
      title: "Services | stdops",
      description: "Workspace automation, websites, web apps, AI Flows and Data Engineering for Thai businesses.",
    },
    title: "Services",
    allServices: "All services",
    items: [
      { name: "Workspace Automation", desc: "Sheets/Forms/Gmail wired into real workflows", price: "From ฿25,000", href: "/services/workspace", color: accents.blue },
      { name: "Web Development", desc: "Business sites built as code, not WordPress", price: "From ฿45,000", href: "/services/web", color: accents.yellow },
      { name: "Web Apps", desc: "Booking systems, client portals, internal tools", price: "From ฿150,000", href: "/services/web", color: accents.yellow },
      { name: "AI Flows", desc: "Gemini/Claude agents on LINE, document processing", price: "From ฿40,000", href: "/services/ai", color: accents.red },
      { name: "Data Engineering", desc: "Pipelines, BigQuery warehouses, Looker dashboards", price: "From ฿180,000", href: "/services/data", color: accents.green },
      { name: "Data Flows", desc: "POS, accounting, LINE, Shopee/Lazada in one layer", price: "From ฿180,000", href: "/services/data", color: accents.green },
    ],
  },
  serviceWorkspace: {
    meta: {
      title: "Google Workspace Automation & Pricing | stdops",
      description: "Sheets, Forms, Gmail and Drive wired into real workflows with Apps Script and Python. See Google Workspace license pricing and our automation pricing — from ฿25,000.",
    },
    title: "Workspace Automation",
    intro: "Sheets, Forms, Gmail, Drive and Calendar wired into real workflows with Apps Script and Python — LINE orders into Sheets with auto-invoicing, staff scheduling, inventory alerts, reports that build themselves.",
    listLabel: "What you get",
    offer: {
      kind: "bullets",
      items: [
        "Map the workflow together",
        "Build with Apps Script / Python across Sheets, Forms, Gmail, Calendar",
        "Test on real data, 2 revision rounds",
        "Team training + 30 days support",
      ],
    },
    exampleLabel: "Real example",
    exampleText: "European pharmaceutical company: order-processing system linking ERP to Sheets and Gmail",
    exampleNum: "−70%",
    shotPlaceholder: "Real dashboard screenshot",
    starting: { label: "Starting at", price: "฿25,000" },
    faqLabel: "FAQ",
    faq: [
      {
        q: "How much does Google Workspace cost?",
        a: "That's Google's own subscription fee, separate from anything we build — it varies by plan (Starter, Standard, Plus) and changes over time, so check [Google Workspace's official pricing page](https://workspace.google.com/pricing) for current numbers.",
      },
      {
        q: "What does your Workspace automation cost, separately from the Google licence?",
        a: "Automation projects start at ฿25,000 for one workflow (Apps Script, 2 revision rounds, 30 days support) — see the Pricing page for the full tier breakdown.",
      },
      {
        q: "Can you write a Google Apps Script that pulls data between two Google Sheets automatically?",
        a: "Yes — this is one of our most common Workspace builds, along with sending automated emails from a Sheet and generating documents (quotes, invoices) automatically from form submissions.",
      },
      {
        q: "Can you connect a Google Form to send a LINE notification automatically?",
        a: "Yes — Google Form → LINE Notify (or a LINE OA push message) is a same-day build for most setups; it's one of the fastest wins we ship.",
      },
    ],
  },
  serviceWeb: {
    meta: {
      title: "Corporate Website Development Thailand | stdops",
      description: "Company websites built as code, not WordPress — fast, bilingual (TH/EN), you own the code. Fixed pricing from ฿45,000.",
    },
    title: "Web Development & Apps",
    intro: "Business websites built as code, not WordPress — fast, multilingual, client-owned. Plus internal web apps: booking systems, client portals, ERP-lite.",
    listLabel: "Two services",
    offer: {
      kind: "rows",
      items: [
        { name: "Business website", desc: "Next.js · TH/EN · 5-8 pages · LINE contact", price: "From ฿45,000" },
        { name: "Web app / internal tool", desc: "Django/FastAPI + Next.js · fixed quote after discovery call", price: "From ฿150,000" },
      ],
    },
    exampleLabel: "Real example",
    exampleText: "European manufacturing company: automated data capture replacing manual entry, with KPI dashboards",
    exampleNum: "−85%",
    shotPlaceholder: "Real web app screenshot",
    faqLabel: "FAQ",
    faq: [
      {
        q: "How much does a corporate website cost?",
        a: "Business websites start from ฿45,000 — Next.js, TH/EN, 5–8 pages, LINE contact integration, and you own the code outright. Web apps (booking systems, client portals) are quoted separately after a discovery call, starting around ฿150,000.",
      },
      {
        q: "Do you build the website with SEO included?",
        a: "Yes — every site ships with bilingual page titles and meta descriptions, clean semantic HTML, and fast load times by default, not as a paid add-on.",
      },
      {
        q: "Why code instead of WordPress or Wix?",
        a: "WordPress and page builders are fast to start and slow to change — every plugin update is a risk, and you don't own anything portable. A Next.js site is faster, more secure, and fully yours: no plugin licences, no vendor lock-in.",
      },
    ],
  },
  serviceAi: {
    meta: {
      title: "LINE Chatbot & AI Automation for Business | stdops",
      description: "AI agents that answer customers on LINE OA, read payment slips, and process documents — built with Gemini/Claude, tested before go-live. From ฿40,000.",
    },
    title: "AI Flows",
    intro: "Gemini/Claude agents for customer support on LINE, document processing, quotation generation, and PDF validation.",
    listLabel: "What you get",
    offer: {
      kind: "bullets",
      items: [
        "Design the agent for your use case",
        "Customer support on LINE, document processing, quotation generation",
        "Build an eval set to test accuracy before go-live",
        "30 days of tuning after delivery",
      ],
    },
    exampleLabel: "Real example",
    exampleText: "AI-assisted GMP compliance tool, cutting document review time per cycle",
    exampleNum: "AI",
    shotPlaceholder: "Real agent screenshot",
    starting: { label: "Starting at", price: "฿40,000" },
    faqLabel: "FAQ",
    faq: [
      {
        q: "Can you build a chatbot that auto-replies on our LINE Official Account?",
        a: "Yes — a LINE OA chatbot that answers customer questions automatically is one of our core AI Flow builds, starting at ฿40,000 including an eval set to test accuracy before go-live and 30 days of tuning after.",
      },
      {
        q: "Can it read payment slip images and confirm them automatically?",
        a: "Yes — automated payment-slip reading into your LINE OA is a common request for businesses processing bank transfers manually; the agent extracts the amount and reference and matches it against your records.",
      },
      {
        q: "Which is better — building this in-house or hiring it out?",
        a: "For most SMEs, hiring it out is faster and cheaper than it looks: you get an agent built on Gemini/Claude with an evaluation set proving it works before it touches real customers, plus 30 days of tuning — not a black box you're stuck maintaining alone.",
      },
    ],
  },
  serviceData: {
    meta: {
      title: "Looker Studio Dashboards & Data Pipelines | stdops",
      description: "BigQuery pipelines and Looker Studio dashboards that pull POS, accounting, LINE and Shopee/Lazada into one view. Fixed pricing from ฿180,000.",
    },
    title: "Data Engineering & Data Flows",
    intro: "For businesses that have outgrown spreadsheets: data pipelines, BigQuery warehouses, Looker Studio dashboards, and connecting POS, accounting, LINE, Shopee/Lazada into one reporting layer.",
    listLabel: "Two services",
    offer: {
      kind: "rows",
      items: [
        { name: "Data Engineering", desc: "Pipelines + BigQuery warehouse + dashboards", price: "From ฿180,000" },
        { name: "Data Flows", desc: "Connect POS, accounting, LINE, Shopee/Lazada", price: "From ฿180,000" },
      ],
    },
    exampleLabel: "Real example",
    exampleText: "European royalties & publishing company: automated monthly P&L and royalties reporting",
    exampleNum: "BQ",
    shotPlaceholder: "Real dashboard screenshot",
    faqLabel: "FAQ",
    faq: [
      {
        q: "What is Looker Studio, and do I need it?",
        a: "Looker Studio is Google's free dashboard tool — the reporting layer. It's only as good as the data feeding it, which is the part most SMEs are missing: a pipeline that pulls POS, accounting, LINE and marketplace data into one place automatically. That pipeline is what we build; Looker Studio is just the screen you look at.",
      },
      {
        q: "Can you build a dashboard that combines sales data from multiple branches?",
        a: "Yes — this is one of the most common requests: consolidating multi-branch data (POS, accounting, or both) into a single BigQuery warehouse with one Looker Studio dashboard on top, instead of checking each branch separately.",
      },
      {
        q: "How much does a Looker Studio dashboard cost?",
        a: "Data Engineering projects start from ฿180,000, covering the pipeline, the BigQuery warehouse, and the dashboard itself — get a fixed quote after a free 30-minute call.",
      },
    ],
  },
  work: {
    meta: {
      title: "Work | stdops",
      description: "Automation and data systems shipped for European enterprises — supermarket, pharma, manufacturing, fintech.",
    },
    title: "Work",
    problemLabel: "Problem",
    builtLabel: "Built",
    cases: [
      {
        id: "case-supermarket",
        color: accents.green,
        industry: "European supermarket chain",
        problem: "HR data for 22,000 employees scattered across legacy systems",
        built: "Migrated all records to BigQuery with data-quality pipelines",
        result: "22,000",
        shotLabel: "Real pipeline screenshot",
      },
      {
        id: "case-pharma",
        color: accents.blue,
        industry: "European pharmaceutical company",
        problem: "Manual order processing, slow and error-prone",
        built: "Automated ERP system linked to Sheets and Gmail",
        result: "−70%",
        shotLabel: "Real dashboard screenshot",
      },
      {
        id: "case-mfg",
        color: accents.red,
        industry: "European manufacturing company",
        problem: "Manual production data entry every day",
        built: "Automated data capture with KPI dashboards",
        result: "−85%",
        shotLabel: "Real KPI screenshot",
      },
      {
        id: "case-fintech",
        color: accents.yellow,
        industry: "European fintech company",
        problem: "Manual monthly account reconciliation, slow",
        built: "Automated reconciliation via Drive API",
        result: "Auto",
        shotLabel: "Real system screenshot",
      },
      {
        id: "case-royalties",
        color: accents.green,
        industry: "European royalties & publishing company",
        problem: "Monthly P&L and royalties reports built by hand",
        built: "Fully automated monthly reporting",
        result: "Auto",
        shotLabel: "Real report screenshot",
      },
    ],
  },
  blog: {
    meta: {
      title: "Blog | stdops",
      description: "Notes on automation, data, and tools for Thai businesses.",
    },
    title: "Blog",
    empty: "No posts yet — writing the first ones.",
    allPosts: "All posts",
  },
  pricing: {
    meta: {
      title: "Pricing | stdops",
      description: "Fixed packages from ฿25,000 — enterprise quality at SMB prices.",
    },
    title: "Pricing",
    sub: "Positioned above Fastwork freelancers, below Bangkok agencies — enterprise quality at SMB prices.",
    packagesLabel: "Packages",
    packages: [
      { name: "Workspace Starter", price: "฿25,000", includes: "One automation · Apps Script · 2 revisions · 30 days support", color: accents.blue },
      { name: "Workspace Pro", price: "฿65,000", includes: "Up to 4 automations · Looker Studio dashboard · staff training · 60 days support", color: accents.blue },
      { name: "Workspace Ops", price: "From ฿120,000", includes: "Full operations layer: intake, inventory, invoicing, reporting, AI on LINE", color: accents.blue },
      { name: "Business Website", price: "฿45,000", includes: "Next.js · TH/EN · 5-8 pages · LINE contact · client owns the code", color: accents.yellow },
      { name: "Web App / Internal Tool", price: "From ฿150,000", includes: "Django/FastAPI + Next.js · fixed quote after discovery call", color: accents.yellow },
      { name: "AI Flow", price: "From ฿40,000", includes: "One agent (LINE / documents / quotes) incl. eval set + 30 days tuning", color: accents.red },
      { name: "Data Platform", price: "From ฿180,000", includes: "BigQuery + pipelines + dashboards", color: accents.green },
    ],
    retainerLabel: "Retainers",
    retainers: [
      { name: "Maintain", price: "฿6,000/mo", desc: "Monitoring, fixes, up to 3h changes" },
      { name: "Grow", price: "฿15,000/mo", desc: "10h/month, new automations, priority LINE support" },
      { name: "Embedded", price: "฿40,000/mo", desc: "30h/month, fractional automation engineer" },
    ],
    rules: [
      "Hourly (out-of-scope only): ฿2,000/h. Never quoted first.",
      "50% upfront, 50% on delivery.",
      "Free 30-minute discovery call. Written fixed quote within 48h.",
    ],
  },
  howItWorks: {
    meta: {
      title: "How it works | stdops",
      description: "Chat on LINE, a 30-minute call, a written fixed quote within 48h, then we build.",
    },
    title: "How it works",
    steps: [
      { n: "01", color: accents.green, text: "Chat on LINE", time: "Today" },
      { n: "02", color: accents.blue, text: "30-minute call on Google Meet or LINE", time: "2-3 days" },
      { n: "03", color: accents.yellow, text: "Written fixed quote", time: "Within 48h" },
      { n: "04", color: accents.red, text: "Build, with weekly updates", time: "Per scope" },
    ],
  },
  about: {
    meta: {
      title: "About Patricia | stdops",
      description: "Data engineer and full-stack developer based in Bangkok. 8+ years shipping production systems for European enterprises.",
    },
    title: "About Patricia",
    p1: "Data engineer and full-stack developer based in Bangkok. 8+ years shipping production systems for European enterprises.",
    p2: "Now bringing that enterprise rigour to Thai SMBs running on Google Workspace, LINE and spreadsheets — building with Python, Django, FastAPI, Next.js, Google Cloud, and Gemini/Claude APIs.",
    langLabel: "Languages",
    languages: "Spanish · Catalan · English · learning Thai",
    photoPlaceholder: "Photo working at a desk",
  },
  contact: {
    meta: {
      title: "Contact | stdops",
      description: "Chat on LINE first — fastest, free 30-minute call.",
    },
    title: "Contact",
    sub: "Chat on LINE first — fastest, free 30-minute call.",
    lineBig: "Chat on LINE",
    messengerLabel: "Message on Messenger",
    formLabel: "Or send a message",
    nameLabel: "Name",
    bizLabel: "Business type",
    msgLabel: "What do you want to automate?",
    sendLabel: "Send",
  },
  footer: { line: "Chat on LINE", copyright: `© ${new Date().getFullYear()} stdops studio.` },
};
