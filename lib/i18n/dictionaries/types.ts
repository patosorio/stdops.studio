export interface PageMeta {
  title: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
  color: string;
}

export interface ServiceEntry {
  name: string;
  desc: string;
  price: string;
  href: string;
  color: string;
}

export interface ProofEntry {
  num: string;
  desc: string;
  color: string;
}

export interface NamedPriceRow {
  name: string;
  desc: string;
  price: string;
}

export type ServiceOffer =
  | { kind: "bullets"; items: string[] }
  | { kind: "rows"; items: NamedPriceRow[] };

export interface FaqEntry {
  q: string;
  a: string;
}

export interface ServicePageCopy {
  meta: PageMeta;
  title: string;
  intro: string;
  listLabel: string;
  offer: ServiceOffer;
  exampleLabel: string;
  exampleText: string;
  exampleNum: string;
  shotPlaceholder: string;
  starting?: { label: string; price: string };
  faqLabel?: string;
  faq?: FaqEntry[];
}

export interface PricingPackage {
  name: string;
  price: string;
  includes: string;
  color: string;
}

export interface Retainer {
  name: string;
  price: string;
  desc: string;
}

export interface WorkCase {
  id: string;
  industry: string;
  problem: string;
  built: string;
  result: string;
  shotLabel: string;
  color: string;
}

export interface HowStep {
  n: string;
  text: string;
  time: string;
  color: string;
}

export interface Dictionary {
  meta: PageMeta;
  nav: { items: NavItem[]; lineLabel: string; menuOpen: string; menuClose: string };
  home: {
    headline: string;
    sub: string;
    proofLabel: string;
    proofValue: string;
    priceLabel: string;
    priceValue: string;
    lineCta: string;
    servicesTitle: string;
    proofTitle: string;
    services: ServiceEntry[];
    proofs: ProofEntry[];
  };
  services: {
    meta: PageMeta;
    title: string;
    allServices: string;
    items: ServiceEntry[];
  };
  serviceWorkspace: ServicePageCopy;
  serviceWeb: ServicePageCopy;
  serviceAi: ServicePageCopy;
  serviceData: ServicePageCopy;
  work: {
    meta: PageMeta;
    title: string;
    problemLabel: string;
    builtLabel: string;
    cases: WorkCase[];
  };
  blog: {
    meta: PageMeta;
    title: string;
    empty: string;
    allPosts: string;
  };
  pricing: {
    meta: PageMeta;
    title: string;
    sub: string;
    packagesLabel: string;
    packages: PricingPackage[];
    retainerLabel: string;
    retainers: Retainer[];
    rules: [string, string, string];
  };
  howItWorks: {
    meta: PageMeta;
    title: string;
    steps: HowStep[];
  };
  about: {
    meta: PageMeta;
    title: string;
    p1: string;
    p2: string;
    langLabel: string;
    languages: string;
    photoPlaceholder: string;
  };
  contact: {
    meta: PageMeta;
    title: string;
    sub: string;
    lineBig: string;
    messengerLabel: string;
    formLabel: string;
    nameLabel: string;
    bizLabel: string;
    msgLabel: string;
    sendLabel: string;
  };
  footer: { line: string; copyright: string };
}
