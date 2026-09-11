import type { Dictionary } from "./types";
import { accents } from "@/lib/design/accents";

export const th: Dictionary = {
  meta: {
    title: "ระบบอัตโนมัติระดับองค์กร ในราคาที่ SME จ่ายได้ | stdops",
    description:
      "วิศวกรข้อมูล 8 ปี สร้างระบบให้บริษัทยุโรป ตอนนี้นำมาปรับใช้กับธุรกิจไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต",
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
    sub: "วิศวกรข้อมูล 8 ปี สร้างระบบให้บริษัทยุโรป ตอนนี้นำมาปรับใช้กับธุรกิจไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต",
    proofLabel: "ได้ใบเสนอราคาใน",
    proofValue: "48 H",
    priceLabel: "แพ็กเกจเริ่มต้น",
    priceValue: "฿20,000",
    lineCta: "แชททาง LINE",
    servicesTitle: "บริการ",
    proofTitle: "ผลงานที่พิสูจน์แล้ว",
    services: [
      { name: "ระบบอัตโนมัติ Workspace", desc: "Sheets, Forms, Gmail, Drive, Calendar ต่อกันเป็นระบบทำงานจริง", price: "จาก ฿20,000", href: "/services/workspace", color: accents.blue },
      { name: "เว็บไซต์ธุรกิจ", desc: "เว็บไซต์และเว็บแอปสำหรับธุรกิจไทย", price: "จาก ฿25,000", href: "/services/web", color: accents.yellow },
      { name: "AI Flows", desc: "LINE agent, ประมวลผลเอกสาร, บอทใบเสนอราคา", price: "จาก ฿40,000", href: "/services/ai", color: accents.red },
      { name: "Data Flows", desc: "POS, บัญชี, LINE, Shopee/Lazada ในเลเยอร์เดียว", price: "จาก ฿150,000", href: "/services/data", color: accents.green },
    ],
    proofs: [
      { num: "70%", desc: "ลดเวลาประมวลผลออเดอร์ — บริษัทยาในยุโรป", color: accents.blue },
      { num: "85%", desc: "ลดการกรอกข้อมูลมือ — บริษัทผลิตในยุโรป", color: accents.red },
      { num: "1.3M", desc: "ข้อมูลย้อนหลังย้ายสู่ BigQuery — บริษัทค้าปลีกยุโรป", color: accents.green },
    ],
  },
  services: {
    meta: {
      title: "บริการ | stdops",
      description: "ระบบอัตโนมัติ Workspace, เว็บไซต์, เว็บแอป, AI Flows และ Data Engineering สำหรับธุรกิจไทย",
    },
    title: "บริการ",
    allServices: "บริการทั้งหมด",
    // DRAFT: Thai copy needs a native review pass for tone/register before shipping.
    items: [
      { name: "ระบบอัตโนมัติ Workspace", desc: "เชื่อม Sheets/Forms/Gmail/Drive/Calendar เข้ากับงานจริงด้วย Apps Script · รวมการอบรมทีมงาน", price: "จาก ฿20,000", href: "/services/workspace", color: accents.blue },
      { name: "เว็บไซต์", desc: "เว็บไซต์ธุรกิจที่เขียนด้วยโค้ด ไม่ใช่ WordPress · รองรับไทย/อังกฤษ · โค้ดเป็นของคุณ", price: "จาก ฿25,000", href: "/services/web", color: accents.yellow },
      { name: "เว็บแอป", desc: "ระบบจองคิว พอร์ทัลลูกค้า เครื่องมือภายใน · Django/FastAPI + Next.js · เสนอราคาหลังคุยรายละเอียด", price: "จาก ฿120,000", href: "/services/web", color: accents.yellow },
      { name: "AI Flows", desc: "เอเจนต์ AI ตอบลูกค้าทาง LINE ประมวลผลเอกสาร · รวมชุดทดสอบและปรับจูน 30 วัน", price: "จาก ฿40,000", href: "/services/ai", color: accents.red },
      { name: "Data Engineering", desc: "BigQuery และแดชบอร์ด Looker Studio · ใช้แนวทางเดียวกับการย้ายข้อมูลระดับองค์กร 1.3M รายการ", price: "จาก ฿150,000", href: "/services/data", color: accents.green },
      { name: "Data Flows", desc: "เชื่อม POS บัญชี LINE Shopee/Lazada เข้าด้วยกัน · แดชบอร์ดเดียวแทนเครื่องมือแยกกันห้าตัว", price: "จาก ฿150,000", href: "/services/data", color: accents.green },
    ],
  },
  serviceWorkspace: {
    meta: {
      title: "ระบบอัตโนมัติ Google Workspace ราคาเท่าไหร่ | stdops",
      description: "เชื่อม Sheets, Forms, Gmail และ Drive เข้ากับงานจริงด้วย Apps Script และ Python ดูราคา Google Workspace และราคาระบบอัตโนมัติ เริ่มต้น ฿20,000",
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
    starting: { label: "เริ่มต้นที่", price: "฿20,000" },
    faqLabel: "คำถามที่พบบ่อย",
    faq: [
      {
        q: "Google Workspace ราคาเท่าไหร่?",
        a: "เป็นค่าสมัครใช้งานของ Google เอง แยกต่างหากจากงานที่เราทำให้ ราคาขึ้นอยู่กับแพ็กเกจ (Starter, Standard, Plus) และเปลี่ยนแปลงได้ตลอด ดูราคาปัจจุบันได้ที่[หน้าราคาทางการของ Google Workspace](https://workspace.google.com/pricing)",
      },
      {
        q: "ราคาระบบอัตโนมัติ Workspace ของเรา แยกจากค่า Google เท่าไหร่?",
        a: "เริ่มต้นที่ ฿20,000 สำหรับ 1 ระบบอัตโนมัติ (เขียนด้วย Apps Script แก้ไข 2 รอบ ซัพพอร์ต 30 วัน) — ดูแพ็กเกจทั้งหมดที่หน้าราคา",
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
      title: "รับทำเว็บไซต์บริษัท ราคาเริ่มต้น ฿25,000 | stdops",
      description: "รับทำเว็บไซต์บริษัทด้วยโค้ดจริง ไม่ใช่ WordPress เร็ว รองรับ 2 ภาษา เจ้าของโค้ดเอง เริ่มต้น ฿25,000",
    },
    title: "เว็บไซต์ & เว็บแอป",
    intro: "เว็บไซต์ธุรกิจที่เขียนด้วยโค้ดจริง ไม่ใช่ WordPress — เร็ว รองรับหลายภาษา เจ้าของโค้ดเอง และเว็บแอปภายใน: ระบบจองคิว พอร์ทัลลูกค้า ERP แบบย่อ",
    listLabel: "สองบริการ",
    offer: {
      kind: "rows",
      items: [
        // DRAFT: "แผงผู้ดูแลระบบ · analytics" needs a native-speaker pass on phrasing.
        { name: "เว็บไซต์ธุรกิจ", desc: "Next.js · TH/EN · 5-8 หน้า · แผงผู้ดูแลระบบ · analytics · ติดต่อผ่าน LINE", price: "จาก ฿25,000" },
        { name: "เว็บแอป / เครื่องมือภายใน", desc: "Django/FastAPI + Next.js · เสนอราคาคงที่หลังคุยความต้องการ", price: "จาก ฿120,000" },
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
        a: "เว็บไซต์ธุรกิจเริ่มต้นที่ ฿25,000 — Next.js รองรับไทย/อังกฤษ 5-8 หน้า เชื่อมต่อ LINE เจ้าของโค้ดเอง 100% ส่วนเว็บแอป (ระบบจองคิว พอร์ทัลลูกค้า) เสนอราคาแยกหลังคุยรายละเอียด เริ่มต้นประมาณ ฿120,000",
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
      description: "รวมข้อมูลจาก POS บัญชี LINE และ Shopee/Lazada เข้า BigQuery พร้อมแดชบอร์ด Looker Studio เริ่มต้น ฿150,000",
    },
    title: "Data Engineering & Data Flows",
    intro: "สำหรับธุรกิจที่โตเกินสเปรดชีตแล้ว: ไปป์ไลน์ข้อมูล คลังข้อมูล BigQuery แดชบอร์ด Looker Studio และการเชื่อม POS บัญชี LINE Shopee/Lazada เข้าด้วยกัน",
    listLabel: "สองบริการ",
    offer: {
      kind: "rows",
      items: [
        { name: "Data Engineering", desc: "ไปป์ไลน์ + คลังข้อมูล BigQuery + แดชบอร์ด", price: "จาก ฿150,000" },
        { name: "Data Flows", desc: "เชื่อม POS บัญชี LINE Shopee/Lazada", price: "จาก ฿150,000" },
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
        a: "งาน Data Engineering เริ่มต้นที่ ฿150,000 ครอบคลุมทั้งระบบดึงข้อมูล คลังข้อมูล BigQuery และตัวแดชบอร์ด — คุยฟรี 30 นาทีก่อนได้ใบเสนอราคาแบบตายตัว",
      },
    ],
  },
  work: {
    meta: {
      title: "ผลงาน | stdops",
      description: "ผลงานระบบอัตโนมัติและข้อมูลให้กับองค์กรยุโรป — ค้าปลีก บริษัทยา การผลิต ฟินเทค",
    },
    title: "ผลงาน",
    problemLabel: "ปัญหา",
    builtLabel: "สิ่งที่สร้าง",
    cases: [
      {
        id: "case-supermarket",
        color: accents.green,
        industry: "บริษัทค้าปลีกยุโรป",
        problem: "ข้อมูลย้อนหลัง 1.3M รายการกระจัดกระจายในระบบเก่า",
        built: "ย้ายข้อมูลทั้งหมดสู่ BigQuery พร้อมไปป์ไลน์ตรวจสอบคุณภาพข้อมูล",
        result: "1.3M รายการ",
        shotLabel: "สกรีนช็อตไปป์ไลน์",
      },
      {
        id: "case-pharma",
        color: accents.blue,
        industry: "บริษัทยายุโรป",
        problem: "ประมวลผลออเดอร์ด้วยมือ ช้าและผิดพลาดบ่อย",
        built: "ระบบ ERP อัตโนมัติเชื่อมกับ Sheets และ Gmail",
        result: "−70%",
        shotLabel: "สกรีนช็อตแดชบอร์ด",
      },
      {
        id: "case-mfg",
        color: accents.red,
        industry: "บริษัทผลิตยุโรป",
        problem: "กรอกข้อมูลการผลิตด้วยมือทุกวัน",
        built: "ระบบเก็บข้อมูลอัตโนมัติ พร้อมแดชบอร์ด KPI",
        result: "−85%",
        shotLabel: "สกรีนช็อต KPI",
      },
      {
        id: "case-fintech",
        color: accents.yellow,
        industry: "ฟินเทคยุโรป",
        problem: "กระทบยอดบัญชีด้วยมือทุกสิ้นเดือน ใช้เวลานาน",
        built: "ระบบกระทบยอดอัตโนมัติผ่าน Drive API",
        result: "Auto",
        shotLabel: "สกรีนช็อตระบบ",
      },
      {
        id: "case-royalties",
        color: accents.green,
        industry: "บริษัทค่าลิขสิทธิ์ยุโรป",
        problem: "รายงานกำไรขาดทุนและค่าลิขสิทธิ์ทำด้วยมือทุกเดือน",
        built: "รายงานที่สร้างเองอัตโนมัติทุกเดือน",
        result: "Auto",
        shotLabel: "สกรีนช็อตรายงาน",
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
      description: "แพ็กเกจคงที่ เริ่มต้น ฿20,000 — คุณภาพระดับองค์กร ในราคา SME",
    },
    title: "ราคา",
    sub: "แพ็กเกจราคาคงที่ ออกแบบมาสำหรับ SME ไทยโดยเฉพาะ — ไม่ใช่ราคาฟรีแลนซ์รายวัน ไม่ใช่ค่าจ้างเอเจนซี่ใหญ่",
    packagesLabel: "แพ็กเกจ",
    packages: [
      // DRAFT: New Business Lite/Pro copy needs a native-speaker pass before shipping.
      { name: "New Business Lite", price: "฿40,000", includes: "เว็บไซต์ (5-8 หน้า แผงผู้ดูแลระบบ analytics) · ตั้งค่า LINE OA + ริชเมนู · ระบบอัตโนมัติ 1 จุด · เป็นเจ้าของทุกอย่าง", color: accents.blue },
      { name: "New Business Pro", price: "฿65,000", includes: "ทุกอย่างใน Lite · ระบบอัตโนมัติสูงสุด 4 จุด · เพจ Facebook พร้อมเทมเพลตแบรนด์ · ตั้งค่าบัญชีธุรกิจ Instagram", color: accents.blue },
      { name: "Workspace Starter", price: "฿20,000", includes: "ระบบอัตโนมัติ 1 อย่าง · Apps Script · แก้ไข 2 ครั้ง · ซัพพอร์ต 30 วัน", color: accents.blue },
      { name: "Workspace Pro", price: "฿35,000", includes: "ระบบอัตโนมัติ 4 จุด · แดชบอร์ด Looker Studio · อบรมทีม 1 ครั้ง · ซัพพอร์ต 60 วัน", color: accents.blue },
      { name: "Workspace Ops", price: "จาก ฿90,000", includes: "ระบบปฏิบัติการเต็มรูปแบบ: รับออเดอร์ สต็อก ใบแจ้งหนี้ รายงาน AI ผู้ช่วยบน LINE", color: accents.blue },
      // DRAFT: "แผงผู้ดูแลระบบ · analytics" needs a native-speaker pass on phrasing.
      { name: "Business Website", price: "฿25,000", includes: "Next.js · TH/EN · 5-8 หน้า · แผงผู้ดูแลระบบ · analytics · ติดต่อผ่าน LINE · เจ้าของโค้ดเอง", color: accents.yellow },
      { name: "Web App / Internal Tool", price: "จาก ฿120,000", includes: "Django/FastAPI + Next.js · เสนอราคาคงที่หลังคุยความต้องการ", color: accents.yellow },
      { name: "AI Flow", price: "จาก ฿40,000", includes: "เอเจนต์ 1 ตัว (LINE / เอกสาร / ใบเสนอราคา) รวม eval set และปรับจูน 30 วัน", color: accents.red },
      { name: "Data Platform", price: "จาก ฿150,000", includes: "BigQuery + ไปป์ไลน์ + แดชบอร์ด", color: accents.green },
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
      description: "วิศวกรข้อมูลและนักพัฒนา full-stack ประจำกรุงเทพฯ มีประสบการณ์ 8 ปีกว่าในการสร้างระบบให้บริษัทยุโรป",
    },
    title: "เกี่ยวกับ Patricia",
    p1: "วิศวกรข้อมูลและนักพัฒนา full-stack ประจำกรุงเทพฯ มีประสบการณ์ 8 ปีกว่าในการสร้างระบบให้บริษัทยุโรป",
    p2: "ตอนนี้นำมาตรฐานการทำงานแบบเดียวกันมาใช้กับธุรกิจ SME ไทยที่ทำงานผ่าน Google Workspace, LINE และสเปรดชีต — เขียนด้วย Python, Django, FastAPI, Next.js, Google Cloud และ Gemini/Claude APIs",
    langLabel: "ภาษา",
    languages: "สเปน · กาตาลัน · อังกฤษ · กำลังเรียนภาษาไทย",
    photoPlaceholder: "มือถือดอกกุหลาบ",
    photoCaption: "กุหลาบจากสวนของฉัน",
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
    emailLabel: "อีเมล",
    bizLabel: "ประเภทธุรกิจ",
    msgLabel: "คุณอยากทำอะไรเป็นอัตโนมัติ?",
    sendLabel: "ส่ง",
    sendingLabel: "กำลังส่ง",
    successTitle: "รับข้อความแล้ว",
    successBody: "แชททาง LINE สั้นๆ เพื่อให้จับคู่กับข้อความนี้ได้",
    errorText: "ส่งไม่สำเร็จ ลองแชททาง LINE หรือส่งอีกครั้ง",
  },
  system: {
    notFoundTitle: "ไม่พบหน้านี้",
    notFoundBody: "ไม่มี URL นี้บนเว็บไซต์ ดูบริการ ผลงาน และราคาได้จากเมนู",
    homeLabel: "กลับหน้าแรก",
    errorTitle: "มีข้อผิดพลาด",
    errorBody: "ลองอีกครั้ง ถ้ายังไม่ได้ แชททาง LINE",
    retryLabel: "ลองอีกครั้ง",
    loadingLabel: "กำลังโหลด",
  },
  privacy: {
    meta: {
      title: "นโยบายความเป็นส่วนตัว | stdops",
      description:
        "stdops เก็บและใช้ข้อมูลจากฟอร์มติดต่อและ Google Analytics อย่างไร ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล",
    },
    title: "นโยบายความเป็นส่วนตัว",
    updated: "อัปเดต 11 กันยายน 2569",
    sections: [
      {
        heading: "ผู้ควบคุมข้อมูล",
        paragraphs: [
          "Patricia Osorio ดำเนินงานในนาม standard operations studio (stdops) กรุงเทพฯ ประเทศไทย เป็นผู้ควบคุมข้อมูลส่วนบุคคลบนเว็บไซต์ stdops.studio",
        ],
      },
      {
        heading: "ข้อมูลที่เก็บ",
        paragraphs: [
          "ฟอร์มติดต่อ: ชื่อ อีเมล ชื่อกิจการ ข้อความ และภาษาของหน้า บันทึกใน Firestore ผ่านเซิร์ฟเวอร์ของเรา เบราว์เซอร์ของคุณอ่านหรือเขียนคอลเลกชันนี้ไม่ได้ เราใช้หมายเลข IP ชั่วคราวในหน่วยความจำเพื่อจำกัดสแปม และไม่บันทึก IP คู่กับข้อความ",
          "Google Analytics 4: หน้าที่มีผู้เข้าชม ชนิดอุปกรณ์/เบราว์เซอร์ ตำแหน่งโดยประมาณ และตัวระบุคุกกี้ ประมวลผลโดย Google",
          "LINE: ถ้าคุณแชทกับบัญชีทางการ ข้อมูลแชทอยู่ภายนโยบายของ LINE เราอ่านเฉพาะข้อความที่คุณส่งมาหาเรา",
        ],
      },
      {
        heading: "วัตถุประสงค์",
        paragraphs: [
          "ใช้ข้อมูลเพื่อตอบคำถาม จัดทำใบเสนอราคา ดูแลเว็บไซต์ และดูสถิติการใช้งาน ไม่ขายข้อมูลส่วนบุคคล",
        ],
      },
      {
        heading: "ฐานทางกฎหมาย",
        paragraphs: [
          "ตาม พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562: ความยินยอมเมื่อคุณกดส่งฟอร์ม และขั้นตอนก่อนทำสัญญาเมื่อคุณขอใบเสนอราคา",
        ],
      },
      {
        heading: "การเก็บรักษาและการเปิดเผย",
        paragraphs: [
          "ข้อความติดต่อเก็บไว้จนกว่าเรื่องจะจบ หรือจนกว่าคุณจะขอให้ลบ Google Analytics เก็บตามการตั้งค่าของ Google",
          "เปิดเผยให้ Google (Firebase และ Analytics) เท่าที่จำเป็นเพื่อให้เว็บทำงาน เซิร์ฟเวอร์ของ Google อาจอยู่นอกประเทศไทย",
        ],
      },
      {
        heading: "สิทธิของคุณ",
        paragraphs: [
          "คุณมีสิทธิเข้าถึง แก้ไข ลบข้อมูล ถอนความยินยอม และร้องเรียนต่อคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล ใช้หน้าติดต่อหรือ LINE เพื่อใช้สิทธิ",
        ],
      },
      {
        heading: "คุกกี้",
        paragraphs: [
          "GA4 ใช้คุกกี้เพื่อวัดผล ขณะนี้เว็บไซต์ยังไม่มีแถบยินยอมคุกกี้ การเข้าชมหน้าที่มีสคริปต์วัดผลถือว่าคุณรับทราบการใช้คุกกี้นี้",
        ],
      },
    ],
  },
  terms: {
    meta: {
      title: "ข้อกำหนดการใช้บริการ | stdops",
      description: "ข้อกำหนดสั้นๆ สำหรับงานอัตโนมัติ เว็บไซต์ และข้อมูลของ stdops ในประเทศไทย",
    },
    title: "ข้อกำหนดการใช้บริการ",
    updated: "อัปเดต 11 กันยายน 2569",
    sections: [
      {
        heading: "บริการ",
        paragraphs: [
          "stdops รับทำงานอัตโนมัติ เว็บไซต์ เวิร์กโฟลว์ AI และข้อมูลให้ธุรกิจในประเทศไทย ตัวเลขบนเว็บเป็นราคาเริ่มต้น ใบเสนอราคาเป็นลายลักษณ์อักษรเป็นข้อตกลงของแต่ละงาน",
        ],
      },
      {
        heading: "งานที่ส่งมอบ",
        paragraphs: [
          "ขอบเขต กำหนดส่ง และความเป็นเจ้าของงานเป็นไปตามใบเสนอราคาที่ทั้งสองฝ่ายยอมรับ",
        ],
      },
      {
        heading: "เนื้อหาบนเว็บ",
        paragraphs: [
          "ข้อความ ตัวอย่าง และตัวเลขผลงานบนเว็บเป็นข้อมูล ไม่ใช่การรับประกันผลทางธุรกิจเฉพาะเจาะจงของงานของคุณ",
        ],
      },
      {
        heading: "การใช้เว็บไซต์",
        paragraphs: [
          "ห้ามส่งสแปม ห้ามใช้ฟอร์มติดต่อในทางที่ผิด และห้ามพยายามเข้าถึงระบบที่ไม่ได้ให้สิทธิ์ไว้",
        ],
      },
      {
        heading: "กฎหมาย",
        paragraphs: [
          "ใช้กฎหมายไทย ข้อพิพาทให้พิจารณาที่กรุงเทพฯ ติดต่อผ่านหน้าติดต่อหรือ LINE",
        ],
      },
    ],
  },
  footer: {
    line: "แชททาง LINE",
    copyright: `© ${new Date().getFullYear()} standard operations studio`,
    nap: "กรุงเทพฯ ประเทศไทย",
    privacyLabel: "ความเป็นส่วนตัว",
    termsLabel: "ข้อกำหนด",
  },
};
