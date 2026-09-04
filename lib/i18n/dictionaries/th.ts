import type { Dictionary } from "./types";
import { accents } from "@/lib/design/accents";

export const th: Dictionary = {
  meta: {
    title: "ระบบอัตโนมัติระดับองค์กร ในราคาที่ SME จ่ายได้ | stdops",
    description:
      "วิศวกรข้อมูล 8 ปี ในองค์กรยุโรป ตอนนี้สร้างระบบอัตโนมัติให้ธุรกิจไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต",
  },
  nav: {
    items: [
      { label: "บริการ", href: "/services", color: accents.blue },
      { label: "ผลงาน", href: "/work", color: accents.yellow },
      { label: "บล็อก", href: "/blog", color: accents.green },
      { label: "ราคา", href: "/pricing", color: accents.red },
      { label: "วิธีการทำงาน", href: "/how-it-works", color: accents.green },
      { label: "เกี่ยวกับ", href: "/about", color: accents.blue },
      { label: "ติดต่อ", href: "/contact", color: accents.yellow },
    ],
    lineLabel: "LINE",
    menuOpen: "เมนู",
    menuClose: "ปิด",
  },
  home: {
    headline: "ระบบอัตโนมัติระดับองค์กร ในราคาที่ SME จ่ายได้",
    sub: "วิศวกรข้อมูล 8 ปี ในองค์กรยุโรป ตอนนี้สร้างระบบอัตโนมัติให้ธุรกิจไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต",
    proofLabel: "พนักงานย้ายข้อมูลสำเร็จ",
    proofValue: "22,000",
    priceLabel: "แพ็กเกจเริ่มต้น",
    priceValue: "฿25,000",
    lineCta: "แชททาง LINE",
    servicesTitle: "บริการ",
    proofTitle: "ผลงานที่พิสูจน์แล้ว",
    services: [
      { name: "ระบบอัตโนมัติ Workspace", desc: "Sheets, Forms, Gmail, Drive, Calendar ต่อกันเป็นระบบทำงานจริง", price: "จาก ฿25,000", href: "/services/workspace", color: accents.blue },
      { name: "เว็บไซต์ธุรกิจ", desc: "เว็บไซต์และเว็บแอปสำหรับธุรกิจไทย", price: "จาก ฿45,000", href: "/services/web", color: accents.yellow },
      { name: "AI Flows", desc: "LINE agent, ประมวลผลเอกสาร, บอทใบเสนอราคา", price: "จาก ฿50,000", href: "/services/ai", color: accents.red },
      { name: "Data Flows", desc: "POS, บัญชี, LINE, Shopee/Lazada ในเลเยอร์เดียว", price: "จาก ฿180,000", href: "/services/data", color: accents.green },
    ],
    proofs: [
      { num: "70%", desc: "ลดเวลาประมวลผลออเดอร์ — บริษัทยาในยุโรป", color: accents.blue },
      { num: "85%", desc: "ลดการกรอกข้อมูลมือ — บริษัทผลิตในยุโรป", color: accents.red },
      { num: "22K", desc: "พนักงานย้ายข้อมูล HR สู่ BigQuery — เชนซูเปอร์มาร์เก็ตยุโรป", color: accents.green },
    ],
  },
  services: {
    meta: {
      title: "บริการ | stdops",
      description: "ระบบอัตโนมัติ Workspace, เว็บไซต์, เว็บแอป, AI Flows และ Data Engineering สำหรับธุรกิจไทย",
    },
    title: "บริการ",
    allServices: "บริการทั้งหมด",
    items: [
      { name: "ระบบอัตโนมัติ Workspace", desc: "เชื่อม Sheets/Forms/Gmail เข้ากับงานจริงด้วย Apps Script", price: "จาก ฿25,000", href: "/services/workspace", color: accents.blue },
      { name: "เว็บไซต์", desc: "เว็บไซต์ธุรกิจที่เขียนด้วยโค้ด ไม่ใช่ WordPress", price: "จาก ฿45,000", href: "/services/web", color: accents.yellow },
      { name: "เว็บแอป", desc: "ระบบจองคิว พอร์ทัลลูกค้า เครื่องมือภายใน", price: "จาก ฿150,000", href: "/services/web", color: accents.yellow },
      { name: "AI Flows", desc: "เอเจนต์ AI ตอบลูกค้าทาง LINE ประมวลผลเอกสาร", price: "จาก ฿40,000", href: "/services/ai", color: accents.red },
      { name: "Data Engineering", desc: "BigQuery และแดชบอร์ด Looker Studio", price: "จาก ฿180,000", href: "/services/data", color: accents.green },
      { name: "Data Flows", desc: "เชื่อม POS บัญชี LINE Shopee/Lazada เข้าด้วยกัน", price: "จาก ฿180,000", href: "/services/data", color: accents.green },
    ],
  },
  serviceWorkspace: {
    meta: {
      title: "ระบบอัตโนมัติ Google Workspace ราคาเท่าไหร่ | stdops",
      description: "เชื่อม Sheets, Forms, Gmail และ Drive เข้ากับงานจริงด้วย Apps Script และ Python ดูราคา Google Workspace และราคาระบบอัตโนมัติ เริ่มต้น ฿25,000",
    },
    title: "ระบบอัตโนมัติ Workspace",
    intro: "เชื่อม Sheets, Forms, Gmail, Drive, Calendar เข้ากับงานจริงด้วย Apps Script และ Python — รับออเดอร์จาก LINE เข้า Sheet ออกใบแจ้งหนี้อัตโนมัติ ตารางเวรพนักงาน แจ้งเตือนสต็อก รายงานประจำเดือนที่สร้างเอง",
    listLabel: "สิ่งที่คุณจะได้รับ",
    offer: {
      kind: "bullets",
      items: [
        "ตรวจงานและออกแบบเวิร์กโฟลว์ร่วมกับคุณ",
        "เขียน Apps Script / Python เชื่อม Sheets, Forms, Gmail, Calendar",
        "ทดสอบกับข้อมูลจริง แก้ไข 2 รอบ",
        "อบรมทีมใช้งาน + ซัพพอร์ต 30 วัน",
      ],
    },
    exampleLabel: "ตัวอย่างจริง",
    exampleText: "บริษัทยาในยุโรป: ระบบประมวลผลออเดอร์ที่เชื่อม ERP เข้ากับ Sheets และ Gmail",
    exampleNum: "−70%",
    shotPlaceholder: "สกรีนช็อตแดชบอร์ดจริง",
    starting: { label: "เริ่มต้นที่", price: "฿25,000" },
    faqLabel: "คำถามที่พบบ่อย",
    faq: [
      {
        q: "Google Workspace ราคาเท่าไหร่?",
        a: "เป็นค่าสมัครใช้งานของ Google เอง แยกต่างหากจากงานที่เราทำให้ ราคาขึ้นอยู่กับแพ็กเกจ (Starter, Standard, Plus) และเปลี่ยนแปลงได้ตลอด ดูราคาปัจจุบันได้ที่[หน้าราคาทางการของ Google Workspace](https://workspace.google.com/pricing)",
      },
      {
        q: "ราคาระบบอัตโนมัติ Workspace ของเรา แยกจากค่า Google เท่าไหร่?",
        a: "เริ่มต้นที่ ฿25,000 สำหรับ 1 ระบบอัตโนมัติ (เขียนด้วย Apps Script แก้ไข 2 รอบ ซัพพอร์ต 30 วัน) — ดูแพ็กเกจทั้งหมดที่หน้าราคา",
      },
      {
        q: "รับเขียน Apps Script ดึงข้อมูลระหว่าง Google Sheet สองไฟล์ให้อัตโนมัติไหม?",
        a: "รับ — เป็นงาน Workspace ที่ทำบ่อยที่สุด รวมถึงระบบส่งอีเมลอัตโนมัติจาก Sheet และออกเอกสาร (ใบเสนอราคา ใบแจ้งหนี้) อัตโนมัติจากฟอร์มที่ลูกค้ากรอก",
      },
      {
        q: "เชื่อม Google Form ให้แจ้งเตือนเข้า LINE อัตโนมัติได้ไหม?",
        a: "ได้ — Google Form เชื่อม LINE Notify หรือส่งข้อความผ่าน LINE OA ส่วนใหญ่ทำเสร็จได้ภายในวันเดียว เป็นงานที่เห็นผลเร็วที่สุดงานหนึ่ง",
      },
    ],
  },
  serviceWeb: {
    meta: {
      title: "รับทำเว็บไซต์บริษัท ราคาเริ่มต้น ฿45,000 | stdops",
      description: "รับทำเว็บไซต์บริษัทด้วยโค้ดจริง ไม่ใช่ WordPress เร็ว รองรับ 2 ภาษา เจ้าของโค้ดเอง เริ่มต้น ฿45,000",
    },
    title: "เว็บไซต์ & เว็บแอป",
    intro: "เว็บไซต์ธุรกิจที่เขียนด้วยโค้ดจริง ไม่ใช่ WordPress — เร็ว รองรับหลายภาษา เจ้าของโค้ดเอง และเว็บแอปภายใน: ระบบจองคิว พอร์ทัลลูกค้า ERP แบบย่อ",
    listLabel: "สองบริการ",
    offer: {
      kind: "rows",
      items: [
        { name: "เว็บไซต์ธุรกิจ", desc: "Next.js · TH/EN · 5-8 หน้า · ติดต่อผ่าน LINE", price: "จาก ฿45,000" },
        { name: "เว็บแอป / เครื่องมือภายใน", desc: "Django/FastAPI + Next.js · เสนอราคาคงที่หลังคุยความต้องการ", price: "จาก ฿150,000" },
      ],
    },
    exampleLabel: "ตัวอย่างจริง",
    exampleText: "บริษัทผลิตในยุโรป: ระบบเก็บข้อมูลอัตโนมัติแทนการกรอกมือ พร้อมแดชบอร์ด KPI",
    exampleNum: "−85%",
    shotPlaceholder: "สกรีนช็อตเว็บแอปจริง",
    faqLabel: "คำถามที่พบบ่อย",
    faq: [
      {
        q: "ทำเว็บไซต์บริษัทเท่าไหร่?",
        a: "เว็บไซต์ธุรกิจเริ่มต้นที่ ฿45,000 — Next.js รองรับไทย/อังกฤษ 5-8 หน้า เชื่อมต่อ LINE เจ้าของโค้ดเอง 100% ส่วนเว็บแอป (ระบบจองคิว พอร์ทัลลูกค้า) เสนอราคาแยกหลังคุยรายละเอียด เริ่มต้นประมาณ ฿150,000",
      },
      {
        q: "ทำเว็บพร้อม SEO ไหม?",
        a: "ทุกเว็บไซต์มาพร้อมชื่อหน้าและคำอธิบายหน้าเว็บทั้งไทย-อังกฤษ, โครงสร้าง HTML ที่เหมาะกับ SEO และความเร็วในการโหลดที่ดีตั้งแต่ต้น ไม่ใช่บริการเสริมที่ต้องจ่ายเพิ่ม",
      },
      {
        q: "ทำไมใช้โค้ดแทน WordPress หรือ Wix?",
        a: "WordPress และเครื่องมือลากวางเริ่มต้นง่ายแต่แก้ไขภายหลังยาก ทุกครั้งที่อัปเดตปลั๊กอินมีความเสี่ยง และคุณไม่ได้เป็นเจ้าของสิ่งที่ย้ายไปที่อื่นได้จริง เว็บที่เขียนด้วย Next.js เร็วกว่า ปลอดภัยกว่า และเป็นของคุณทั้งหมด ไม่มีค่าไลเซนส์ปลั๊กอิน ไม่ผูกติดกับแพลตฟอร์มใดแพลตฟอร์มหนึ่ง",
      },
    ],
  },
  serviceAi: {
    meta: {
      title: "รับทำ Chatbot LINE OA ตอบลูกค้าอัตโนมัติ | stdops",
      description: "AI ตอบแชทลูกค้าทาง LINE OA อ่านสลิปโอนเงิน ประมวลผลเอกสาร สร้างด้วย Gemini/Claude ทดสอบก่อนใช้งานจริง เริ่มต้น ฿40,000",
    },
    title: "AI Flows",
    intro: "เอเจนต์ Gemini/Claude ที่ตอบลูกค้าทาง LINE ประมวลผลเอกสาร ออกใบเสนอราคา และตรวจสอบ PDF",
    listLabel: "สิ่งที่คุณจะได้รับ",
    offer: {
      kind: "bullets",
      items: [
        "ออกแบบ agent ตาม use case ของธุรกิจคุณ",
        "ตอบลูกค้าทาง LINE, ประมวลผลเอกสาร, ออกใบเสนอราคา",
        "สร้าง eval set ทดสอบความแม่นยำก่อนใช้งานจริง",
        "ปรับจูน 30 วันหลังส่งงาน",
      ],
    },
    exampleLabel: "ตัวอย่างจริง",
    exampleText: "เครื่องมือตรวจสอบมาตรฐาน GMP ด้วย AI ลดเวลาตรวจเอกสารต่อรอบ",
    exampleNum: "AI",
    shotPlaceholder: "สกรีนช็อต agent จริง",
    starting: { label: "เริ่มต้นที่", price: "฿40,000" },
    faqLabel: "คำถามที่พบบ่อย",
    faq: [
      {
        q: "รับทำ Chatbot ตอบลูกค้าอัตโนมัติทาง LINE OA ไหม?",
        a: "รับ — เป็นงาน AI Flows หลักของเรา เริ่มต้นที่ ฿40,000 รวมการสร้าง eval set ทดสอบความแม่นยำก่อนใช้งานจริง และปรับจูนให้อีก 30 วันหลังส่งมอบ",
      },
      {
        q: "ทำระบบอ่านสลิปโอนเงินเข้า LINE OA อัตโนมัติได้ไหม?",
        a: "ได้ — ระบบอ่านสลิปโอนเงินอัตโนมัติเป็นที่ต้องการมากสำหรับธุรกิจที่ยังตรวจสลิปด้วยมือ ระบบจะดึงยอดเงินและเลขอ้างอิงมาจับคู่กับรายการที่มีอยู่ให้อัตโนมัติ",
      },
      {
        q: "ทำระบบตอบแชทอัตโนมัติ LINE OA เอง หรือจ้างทำ แบบไหนดีกว่ากัน?",
        a: "สำหรับ SME ส่วนใหญ่ การจ้างทำเร็วและคุ้มกว่าที่คิด เพราะได้ agent ที่สร้างด้วย Gemini/Claude พร้อม eval set พิสูจน์ความแม่นยำก่อนนำไปใช้กับลูกค้าจริง และปรับจูนต่ออีก 30 วัน ไม่ใช่ระบบปิดที่ต้องดูแลเองคนเดียว",
      },
    ],
  },
  serviceData: {
    meta: {
      title: "รับทำ Dashboard Looker Studio & Data Pipeline | stdops",
      description: "รวมข้อมูลจาก POS บัญชี LINE และ Shopee/Lazada เข้า BigQuery พร้อมแดชบอร์ด Looker Studio เริ่มต้น ฿180,000",
    },
    title: "Data Engineering & Data Flows",
    intro: "สำหรับธุรกิจที่โตเกินสเปรดชีตแล้ว: ไปป์ไลน์ข้อมูล คลังข้อมูล BigQuery แดชบอร์ด Looker Studio และการเชื่อม POS บัญชี LINE Shopee/Lazada เข้าด้วยกัน",
    listLabel: "สองบริการ",
    offer: {
      kind: "rows",
      items: [
        { name: "Data Engineering", desc: "ไปป์ไลน์ + คลังข้อมูล BigQuery + แดชบอร์ด", price: "จาก ฿180,000" },
        { name: "Data Flows", desc: "เชื่อม POS บัญชี LINE Shopee/Lazada", price: "จาก ฿180,000" },
      ],
    },
    exampleLabel: "ตัวอย่างจริง",
    exampleText: "บริษัทค่าลิขสิทธิ์ในยุโรป: รายงานกำไรขาดทุนและค่าลิขสิทธิ์ที่สร้างเองอัตโนมัติทุกเดือน",
    exampleNum: "BQ",
    shotPlaceholder: "สกรีนช็อตแดชบอร์ดจริง",
    faqLabel: "คำถามที่พบบ่อย",
    faq: [
      {
        q: "Looker Studio คืออะไร จำเป็นแค่ไหน?",
        a: "Looker Studio คือเครื่องมือทำแดชบอร์ดฟรีของ Google ซึ่งจะสวยหรือมีประโยชน์แค่ไหนขึ้นอยู่กับข้อมูลที่ป้อนเข้าไป ธุรกิจ SME ส่วนใหญ่ขาดส่วนนี้ คือระบบดึงข้อมูลจาก POS บัญชี LINE และมาร์เก็ตเพลสมารวมไว้ที่เดียวโดยอัตโนมัติ — นี่คือสิ่งที่เราสร้างให้ ส่วน Looker Studio เป็นแค่หน้าจอแสดงผล",
      },
      {
        q: "ทำแดชบอร์ดรวมยอดขายจากหลายสาขาได้ไหม?",
        a: "ได้ — เป็นงานที่ลูกค้าขอบ่อยที่สุด คือรวมข้อมูลจากหลายสาขา (POS, บัญชี หรือทั้งสองอย่าง) เข้า BigQuery แล้วทำแดชบอร์ด Looker Studio เดียว แทนที่จะต้องเช็คทีละสาขา",
      },
      {
        q: "ทำ Dashboard Looker Studio ราคาเท่าไหร่?",
        a: "งาน Data Engineering เริ่มต้นที่ ฿180,000 ครอบคลุมทั้งระบบดึงข้อมูล คลังข้อมูล BigQuery และตัวแดชบอร์ด — คุยฟรี 30 นาทีก่อนได้ใบเสนอราคาแบบตายตัว",
      },
    ],
  },
  work: {
    meta: {
      title: "ผลงาน | stdops",
      description: "ผลงานระบบอัตโนมัติและข้อมูลให้กับองค์กรยุโรป — ซูเปอร์มาร์เก็ต บริษัทยา การผลิต ฟินเทค",
    },
    title: "ผลงาน",
    problemLabel: "ปัญหา",
    builtLabel: "สิ่งที่สร้าง",
    cases: [
      {
        id: "case-supermarket",
        color: accents.green,
        industry: "ซูเปอร์มาร์เก็ตยุโรป",
        problem: "ข้อมูล HR ของพนักงาน 22,000 คนกระจัดกระจายในระบบเก่า",
        built: "ย้ายข้อมูลทั้งหมดสู่ BigQuery พร้อมไปป์ไลน์ตรวจสอบคุณภาพข้อมูล",
        result: "22,000",
        shotLabel: "สกรีนช็อตไปป์ไลน์จริง",
      },
      {
        id: "case-pharma",
        color: accents.blue,
        industry: "บริษัทยายุโรป",
        problem: "ประมวลผลออเดอร์ด้วยมือ ช้าและผิดพลาดบ่อย",
        built: "ระบบ ERP อัตโนมัติเชื่อมกับ Sheets และ Gmail",
        result: "−70%",
        shotLabel: "สกรีนช็อตแดชบอร์ดจริง",
      },
      {
        id: "case-mfg",
        color: accents.red,
        industry: "บริษัทผลิตยุโรป",
        problem: "กรอกข้อมูลการผลิตด้วยมือทุกวัน",
        built: "ระบบเก็บข้อมูลอัตโนมัติ พร้อมแดชบอร์ด KPI",
        result: "−85%",
        shotLabel: "สกรีนช็อต KPI จริง",
      },
      {
        id: "case-fintech",
        color: accents.yellow,
        industry: "ฟินเทคยุโรป",
        problem: "กระทบยอดบัญชีด้วยมือทุกสิ้นเดือน ใช้เวลานาน",
        built: "ระบบกระทบยอดอัตโนมัติผ่าน Drive API",
        result: "Auto",
        shotLabel: "สกรีนช็อตระบบจริง",
      },
      {
        id: "case-royalties",
        color: accents.green,
        industry: "บริษัทค่าลิขสิทธิ์ยุโรป",
        problem: "รายงานกำไรขาดทุนและค่าลิขสิทธิ์ทำด้วยมือทุกเดือน",
        built: "รายงานที่สร้างเองอัตโนมัติทุกเดือน",
        result: "Auto",
        shotLabel: "สกรีนช็อตรายงานจริง",
      },
    ],
  },
  blog: {
    meta: {
      title: "บล็อก | stdops",
      description: "บทความเรื่องระบบอัตโนมัติ ข้อมูล และเครื่องมือสำหรับธุรกิจไทย",
    },
    title: "บล็อก",
    empty: "ยังไม่มีบทความ — กำลังเขียนอยู่",
    allPosts: "บทความทั้งหมด",
  },
  pricing: {
    meta: {
      title: "ราคา | stdops",
      description: "แพ็กเกจคงที่ เริ่มต้น ฿25,000 — คุณภาพระดับองค์กร ในราคา SME",
    },
    title: "ราคา",
    sub: "ตำแหน่งราคาสูงกว่า Fastwork ต่ำกว่าเอเจนซี่ใหญ่ในกรุงเทพ — คุณภาพระดับองค์กร ในราคา SME",
    packagesLabel: "แพ็กเกจ",
    packages: [
      { name: "Workspace Starter", price: "฿25,000", includes: "ระบบอัตโนมัติ 1 อย่าง · Apps Script · แก้ไข 2 ครั้ง · ซัพพอร์ต 30 วัน", color: accents.blue },
      { name: "Workspace Pro", price: "฿65,000", includes: "ระบบอัตโนมัติ 4 จุด · แดชบอร์ด Looker Studio · อบรมทีม 1 ครั้ง · ซัพพอร์ต 60 วัน", color: accents.blue },
      { name: "Workspace Ops", price: "จาก ฿120,000", includes: "ระบบปฏิบัติการเต็มรูปแบบ: รับออเดอร์ สต็อก ใบแจ้งหนี้ รายงาน AI ผู้ช่วยบน LINE", color: accents.blue },
      { name: "Business Website", price: "฿45,000", includes: "Next.js · TH/EN · 5-8 หน้า · ติดต่อผ่าน LINE · เจ้าของโค้ดเอง", color: accents.yellow },
      { name: "Web App / Internal Tool", price: "จาก ฿150,000", includes: "Django/FastAPI + Next.js · เสนอราคาคงที่หลังคุยความต้องการ", color: accents.yellow },
      { name: "AI Flow", price: "จาก ฿40,000", includes: "เอเจนต์ 1 ตัว (LINE / เอกสาร / ใบเสนอราคา) รวม eval set และปรับจูน 30 วัน", color: accents.red },
      { name: "Data Platform", price: "จาก ฿180,000", includes: "BigQuery + ไปป์ไลน์ + แดชบอร์ด", color: accents.green },
    ],
    retainerLabel: "สัญญารายเดือน",
    retainers: [
      { name: "Maintain", price: "฿6,000/mo", desc: "ดูแลระบบ แก้ไขไม่เกิน 3 ชม./เดือน" },
      { name: "Grow", price: "฿15,000/mo", desc: "10 ชม./เดือน ระบบอัตโนมัติใหม่ ซัพพอร์ต LINE ก่อน" },
      { name: "Embedded", price: "฿40,000/mo", desc: "30 ชม./เดือน วิศวกรอัตโนมัติประจำ" },
    ],
    rules: [
      "รายชั่วโมง (งานนอกสโคป): ฿2,000/ชม. — ไม่เสนอราคาชั่วโมงเป็นตัวเลือกแรก",
      "มัดจำ 50% ก่อนเริ่ม ส่วนที่เหลือชำระเมื่อส่งงาน",
      "ปรึกษาฟรี 30 นาที เสนอราคาคงที่เป็นลายลักษณ์อักษรภายใน 48 ชม.",
    ],
  },
  howItWorks: {
    meta: {
      title: "ขั้นตอนการทำงาน | stdops",
      description: "แชททาง LINE คุย 30 นาที เสนอราคาคงที่ภายใน 48 ชม. แล้วเริ่มสร้างงาน",
    },
    title: "ขั้นตอนการทำงาน",
    steps: [
      { n: "01", color: accents.green, text: "แชทคุยงานกันทาง LINE", time: "วันนี้" },
      { n: "02", color: accents.blue, text: "คุยกัน 30 นาทีทาง Google Meet หรือโทรผ่าน LINE", time: "2-3 วัน" },
      { n: "03", color: accents.yellow, text: "เสนอราคาคงที่เป็นลายลักษณ์อักษร", time: "ภายใน 48 ชม." },
      { n: "04", color: accents.red, text: "สร้างงานจริง อัปเดตทุกสัปดาห์", time: "ตามสโคป" },
    ],
  },
  about: {
    meta: {
      title: "เกี่ยวกับ Patricia | stdops",
      description: "วิศวกรข้อมูลและนักพัฒนา full-stack ประจำกรุงเทพฯ มีประสบการณ์ 8 ปีกว่าในการสร้างระบบให้องค์กรยุโรป",
    },
    title: "เกี่ยวกับ Patricia",
    p1: "วิศวกรข้อมูลและนักพัฒนา full-stack ประจำกรุงเทพฯ มีประสบการณ์ 8 ปีกว่าในการสร้างระบบให้องค์กรยุโรป",
    p2: "ตอนนี้นำความเข้มงวดระดับองค์กรมาสู่ธุรกิจ SME ไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต — เขียนด้วย Python, Django, FastAPI, Next.js, Google Cloud และ Gemini/Claude APIs",
    langLabel: "ภาษา",
    languages: "สเปน · กาตาลัน · อังกฤษ · กำลังเรียนภาษาไทย",
    photoPlaceholder: "รูปถ่ายทำงานที่โต๊ะ",
  },
  contact: {
    meta: {
      title: "ติดต่อ | stdops",
      description: "แชททาง LINE ก่อน — เร็วที่สุด ปรึกษาฟรี 30 นาที",
    },
    title: "ติดต่อ",
    sub: "แชททาง LINE ก่อน — เร็วที่สุด ปรึกษาฟรี 30 นาที",
    lineBig: "แชททาง LINE",
    messengerLabel: "ส่งข้อความทาง Messenger",
    formLabel: "หรือส่งฟอร์ม",
    nameLabel: "ชื่อ",
    bizLabel: "ประเภทธุรกิจ",
    msgLabel: "คุณอยากทำอะไรเป็นอัตโนมัติ?",
    sendLabel: "ส่ง",
  },
  footer: { line: "แชททาง LINE", copyright: `© ${new Date().getFullYear()} stdops studio.` },
};
