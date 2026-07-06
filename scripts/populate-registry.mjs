import { writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const REGISTRY = resolve(ROOT, "registry");

if (!existsSync(REGISTRY)) mkdirSync(REGISTRY, { recursive: true });

const now = new Date().toISOString();

// ──────────── OWNERS (12) ────────────
const owners = [
  { id: "owner-sustainability", name: "Office of Sustainability", email: "sustainability@mju.ac.th", department: "Office of Sustainability", role: "Green Office Coordinator", phone: "+66 53 873 000" },
  { id: "owner-research", name: "Research Administration", email: "research@mju.ac.th", department: "Research Administration", role: "RAE Coordinator", phone: "+66 53 873 100" },
  { id: "owner-learning", name: "Learning Center Administration", email: "learning@mju.ac.th", department: "Learning Center", role: "Center Administrator", phone: "+66 53 873 200" },
  { id: "owner-it", name: "Information Technology Division", email: "it@mju.ac.th", department: "IT Division", role: "IT Director", phone: "+66 53 873 300" },
  { id: "owner-academic", name: "Academic Affairs Office", email: "academic@mju.ac.th", department: "Academic Affairs", role: "Academic Dean", phone: "+66 53 873 400" },
  { id: "owner-finance", name: "Finance and Budget Division", email: "finance@mju.ac.th", department: "Finance Division", role: "Finance Director", phone: "+66 53 873 500" },
  { id: "owner-qa", name: "Quality Assurance Office", email: "qa@mju.ac.th", department: "Quality Assurance", role: "QA Director", phone: "+66 53 873 600" },
  { id: "owner-international", name: "International Affairs Office", email: "international@mju.ac.th", department: "International Affairs", role: "International Coordinator", phone: "+66 53 873 700" },
  { id: "owner-student", name: "Student Development Division", email: "student@mju.ac.th", department: "Student Development", role: "Student Affairs Director", phone: "+66 53 873 800" },
  { id: "owner-community", name: "Community Engagement Center", email: "community@mju.ac.th", department: "Community Engagement", role: "Center Director", phone: "+66 53 873 900" },
  { id: "owner-legal", name: "Legal and Compliance Office", email: "legal@mju.ac.th", department: "Legal Affairs", role: "Legal Counsel", phone: "+66 53 874 000" },
  { id: "owner-admin", name: "Central Administration", email: "admin@mju.ac.th", department: "President Office", role: "Administrative Secretary", phone: "+66 53 874 100" },
];

// ──────────── CATEGORIES (22) ────────────
const categories = [
  { id: "strategic-plan", name: "Strategic Plan", name_en: "Strategic Plan", name_th: "แผนยุทธศาสตร์", description: "Strategic planning documents including initiative plans, roadmaps, and vision documents.", parent: null, icon: "plan", sort_order: 1 },
  { id: "guideline", name: "Guideline", name_en: "Guideline", name_th: "แนวปฏิบัติ", description: "Procedural guidelines, standard operating procedures, and how-to documents.", parent: null, icon: "guide", sort_order: 2 },
  { id: "report", name: "Report", name_en: "Report", name_th: "รายงาน", description: "Progress reports, annual reports, quarterly reports, and other periodic reporting documents.", parent: null, icon: "report", sort_order: 3 },
  { id: "template", name: "Template", name_en: "Template", name_th: "แบบฟอร์ม", description: "Standardized forms, templates, and submission sheets.", parent: null, icon: "template", sort_order: 4 },
  { id: "catalog", name: "Catalog", name_en: "Catalog", name_th: "รายการ", description: "Catalogs, inventories, and listings of offerings or resources.", parent: null, icon: "catalog", sort_order: 5 },
  { id: "policy", name: "Policy", name_en: "Policy", name_th: "นโยบาย", description: "Official policies, regulations, and institutional rules.", parent: null, icon: "policy", sort_order: 6 },
  { id: "meeting", name: "Meeting Minutes", name_en: "Meeting Minutes", name_th: "รายงานการประชุม", description: "Meeting minutes, agendas, and committee proceedings.", parent: null, icon: "meeting", sort_order: 7 },
  { id: "memo", name: "Memorandum", name_en: "Memorandum", name_th: "บันทึกข้อความ", description: "Internal memos, announcements, and official correspondence.", parent: null, icon: "memo", sort_order: 8 },
  { id: "budget", name: "Budget Document", name_en: "Budget Document", name_th: "เอกสารงบประมาณ", description: "Budget plans, financial allocations, and expenditure reports.", parent: null, icon: "budget", sort_order: 9 },
  { id: "contract", name: "Contract", name_en: "Contract", name_th: "สัญญา", description: "Contracts, agreements, MOUs, and service-level agreements.", parent: null, icon: "contract", sort_order: 10 },
  { id: "research-output", name: "Research Output", name_en: "Research Output", name_th: "ผลงานวิจัย", description: "Research papers, publications, studies, and academic outputs.", parent: null, icon: "research", sort_order: 11 },
  { id: "academic-record", name: "Academic Record", name_en: "Academic Record", name_th: "บันทึกทางวิชาการ", description: "Academic records, curricula, syllabi, and program documentation.", parent: null, icon: "academic", sort_order: 12 },
  { id: "training", name: "Training Material", name_en: "Training Material", name_th: "เอกสารฝึกอบรม", description: "Training manuals, workshop materials, and learning resources.", parent: null, icon: "training", sort_order: 13 },
  { id: "assessment", name: "Assessment", name_en: "Assessment", name_th: "การประเมิน", description: "Evaluation forms, assessment criteria, and review documents.", parent: null, icon: "assessment", sort_order: 14 },
  { id: "compliance", name: "Compliance", name_en: "Compliance", name_th: "การปฏิบัติตามข้อกำหนด", description: "Compliance documentation, audit reports, and regulatory filings.", parent: null, icon: "compliance", sort_order: 15 },
  { id: "communication", name: "Communication", name_en: "Communication", name_th: "สื่อสารองค์กร", description: "Newsletters, press releases, announcements, and public communications.", parent: null, icon: "comm", sort_order: 16 },
  { id: "technical", name: "Technical Document", name_en: "Technical Document", name_th: "เอกสารทางเทคนิค", description: "Technical specifications, system documentation, and architecture diagrams.", parent: null, icon: "tech", sort_order: 17 },
  { id: "presentation", name: "Presentation", name_en: "Presentation", name_th: "งานนำเสนอ", description: "Slide decks, presentations, and briefing materials.", parent: null, icon: "slides", sort_order: 18 },
  { id: "data", name: "Data File", name_en: "Data File", name_th: "ข้อมูล", description: "Datasets, spreadsheets, statistics, and data collections.", parent: null, icon: "data", sort_order: 19 },
  { id: "legal", name: "Legal Document", name_en: "Legal Document", name_th: "เอกสารทางกฎหมาย", description: "Legal opinions, court filings, and regulatory submissions.", parent: null, icon: "legal", sort_order: 20 },
  { id: "financial", name: "Financial Record", name_en: "Financial Record", name_th: "บันทึกทางการเงิน", description: "Financial statements, invoices, payment records, and accounting documents.", parent: null, icon: "finance", sort_order: 21 },
  { id: "archive", name: "Archive", name_en: "Archive", name_th: "เอกสารเก็บถาวร", description: "Historical records, archived documents, and long-term preservation items.", parent: null, icon: "archive", sort_order: 22 },
];

// ──────────── PROJECTS (12) ────────────
const projects = [
  { id: "green-office-2026", name: "Green Office 2026", name_en: "Green Office 2026", name_th: "สำนักงานสีเขียว 2026", description: "Maejo University initiative to achieve Green Office certification and promote campus sustainability practices.", status: "active", category_filters: ["strategic-plan", "guideline", "report", "training", "communication"], repository_url: "https://github.com/numtip/green-office-2026", website_url: "", contact: "Sustainability Office", department: "Office of Sustainability", created_at: "2025-01-15T08:00:00Z", updated_at: now },
  { id: "rae-landing", name: "RAE Landing", name_en: "RAE Landing", name_th: "RAE Landing", description: "Public-facing landing page for the Research Assessment Exercise (RAE), providing access to assessment guides, templates, and evidence submission resources.", status: "active", category_filters: ["guideline", "template", "report", "assessment", "research-output"], repository_url: "https://github.com/numtip/rae-landing", website_url: "https://rae.mju.ac.th", contact: "Research Administration", department: "Research Administration", created_at: "2025-02-01T08:00:00Z", updated_at: now },
  { id: "learning-center", name: "Learning Center", name_en: "MJU Learning Center", name_th: "ศูนย์การเรียนรู้ มจ.", description: "MJU Learning Center providing courses, workshops, and training resources for students and faculty.", status: "active", category_filters: ["catalog", "report", "training", "academic-record", "presentation"], repository_url: "https://github.com/numtip/learning-center", website_url: "https://learning.mju.ac.th", contact: "Learning Center Administration", department: "Learning Center", created_at: "2025-05-01T08:00:00Z", updated_at: now },
  { id: "research-portal", name: "Research Portal", name_en: "MJU Research Portal", name_th: "พอร์ทัลงานวิจัย มจ.", description: "Central research information portal for Maejo University, providing access to research outputs, publications, and RAE-related resources.", status: "active", category_filters: ["research-output", "report", "guideline", "template", "data"], repository_url: "https://github.com/numtip/research-portal", website_url: "", contact: "Research Administration", department: "Research Administration", created_at: "2026-01-01T08:00:00Z", updated_at: now },
  { id: "enterprise-shared-docs", name: "Enterprise Shared Documents", name_en: "Enterprise Shared Documents", name_th: "เอกสารร่วมองค์กร", description: "University-wide shared document repository for policies, procedures, forms, and cross-departmental resources.", status: "active", category_filters: ["policy", "guideline", "template", "memo", "compliance", "legal", "archive"], repository_url: "", website_url: "", contact: "Central Administration", department: "President Office", created_at: "2024-06-01T08:00:00Z", updated_at: now },
  { id: "mju-digital-transformation", name: "MJU Digital Transformation", name_en: "MJU Digital Transformation", name_th: "การเปลี่ยนผ่านดิจิทัล มจ.", description: "University-wide digital transformation initiative modernizing administrative and academic systems.", status: "active", category_filters: ["technical", "strategic-plan", "report", "training", "communication"], repository_url: "", website_url: "", contact: "IT Division", department: "IT Division", created_at: "2025-03-01T08:00:00Z", updated_at: now },
  { id: "smart-campus-initiative", name: "Smart Campus Initiative", name_en: "Smart Campus Initiative", name_th: "โครงการ Smart Campus", description: "Smart campus project implementing IoT, smart infrastructure, and digital services across MJU campuses.", status: "active", category_filters: ["technical", "strategic-plan", "budget", "report", "data"], repository_url: "", website_url: "", contact: "IT Division", department: "IT Division", created_at: "2025-06-01T08:00:00Z", updated_at: now },
  { id: "academic-quality-assurance", name: "Academic Quality Assurance", name_en: "Academic Quality Assurance", name_th: "ประกันคุณภาพการศึกษา", description: "Internal and external quality assurance program for academic programs and administrative units.", status: "active", category_filters: ["assessment", "report", "compliance", "policy", "training"], repository_url: "", website_url: "", contact: "Quality Assurance Office", department: "Quality Assurance", created_at: "2024-08-01T08:00:00Z", updated_at: now },
  { id: "international-collaboration", name: "International Collaboration", name_en: "International Collaboration", name_th: "ความร่วมมือระหว่างประเทศ", description: "International partnerships, exchange programs, and collaborative research agreements.", status: "active", category_filters: ["contract", "report", "communication", "academic-record", "meeting"], repository_url: "", website_url: "", contact: "International Affairs Office", department: "International Affairs", created_at: "2025-04-01T08:00:00Z", updated_at: now },
  { id: "student-development-program", name: "Student Development Program", name_en: "Student Development Program", name_th: "โครงการพัฒนานักศึกษา", description: "Student skill development, leadership training, and extracurricular activity programs.", status: "active", category_filters: ["training", "catalog", "report", "communication", "presentation"], repository_url: "", website_url: "", contact: "Student Development Division", department: "Student Development", created_at: "2025-09-01T08:00:00Z", updated_at: now },
  { id: "community-engagement", name: "Community Engagement", name_en: "Community Engagement", name_th: "การมีส่วนร่วมชุมชน", description: "University community service, outreach programs, and knowledge transfer to local communities.", status: "active", category_filters: ["report", "communication", "training", "research-output", "meeting"], repository_url: "", website_url: "", contact: "Community Engagement Center", department: "Community Engagement", created_at: "2024-10-01T08:00:00Z", updated_at: now },
  { id: "it-infrastructure-modernization", name: "IT Infrastructure Modernization", name_en: "IT Infrastructure Modernization", name_th: "ปรับปรุงโครงสร้างพื้นฐานด้านไอที", description: "Network, server, and systems infrastructure upgrade program for improved digital services.", status: "planned", category_filters: ["technical", "budget", "contract", "report", "strategic-plan"], repository_url: "", website_url: "", contact: "IT Division", department: "IT Division", created_at: "2026-05-01T08:00:00Z", updated_at: now },
];

// ──────────── EVIDENCE MAP ────────────
// We build evidence first so we can reference its IDs in documents
const evidence = [];
const projIds = projects.map(p => p.id);
const catIds = categories.map(c => c.id);
const ownerIds = owners.map(o => o.id);

let evSeq = {};
function evId(projectRef) {
  // Get prefix from project ID
  const prefix = projectRef.split("-").filter(s => s.length > 0).map(s => s.substring(0, 2)).join("").toUpperCase().substring(0, 4);
  if (!evSeq[prefix]) evSeq[prefix] = 0;
  evSeq[prefix]++;
  return `EVD-${prefix}-${String(evSeq[prefix]).padStart(3, "0")}`;
}

function addEvidence(name, desc, projRef, docRefs, criteria, status, notes, year) {
  const eid = evId(projRef);
  evidence.push({
    id: eid,
    name, description: desc, project_ref: projRef,
    document_refs: Array.isArray(docRefs) ? docRefs : [docRefs],
    criteria, status, notes,
    created_at: `${year}-06-01T08:00:00Z`, updated_at: now,
  });
  return eid;
}

// Track evidence IDs per document for later use
const docEvRefs = {};

function trackEv(docId, evId) {
  if (!docEvRefs[docId]) docEvRefs[docId] = [];
  docEvRefs[docId].push(evId);
}

// Evidence: Green Office 2026 (12)
trackEv("GO2026-001", addEvidence("GO Strategic Plan Evidence", "Evidence demonstrating Green Office 2026 strategic planning and approval process.", "green-office-2026", "GO2026-001", "GO-CRITERIA-01: Approved strategic plan must be in place", "satisfied", "Strategic plan approved March 2026.", 2025));
trackEv("GO2026-003", addEvidence("GO Quarterly Progress Evidence", "Quarterly progress reports demonstrating ongoing Green Office activities and KPI tracking.", "green-office-2026", ["GO2026-003", "GO2026-008"], "GO-CRITERIA-02: Regular progress reporting required", "partial", "Q1 2026 submitted. Q2 draft pending review.", 2026));
trackEv("GO2026-002", addEvidence("GO Waste Management Evidence", "Evidence of waste management guidelines implementation and campus adoption.", "green-office-2026", "GO2026-002", "GO-CRITERIA-03: Waste management procedures must be documented", "satisfied", "Guidelines published and distributed to all departments.", 2026));
trackEv("GO2026-004", addEvidence("GO Energy Conservation Evidence", "Evidence of energy conservation measures deployment and reduction tracking.", "green-office-2026", "GO2026-004", "GO-CRITERIA-04: Energy conservation plan must be active", "satisfied", "Action plan implemented in 3 buildings. 15% reduction achieved.", 2025));
trackEv("GO2026-005", addEvidence("GO Water Management Evidence", "Evidence of water conservation and rainwater harvesting implementation.", "green-office-2026", "GO2026-005", "GO-CRITERIA-05: Water management plan required", "satisfied", "Rainwater harvesting installed in 2 locations.", 2025));
trackEv("GO2026-007", addEvidence("GO Sustainability Training Evidence", "Evidence of sustainability training completion and participation rates.", "green-office-2026", "GO2026-007", "GO-CRITERIA-06: Staff must complete sustainability training", "partial", "240 staff trained. Target: 500 by year end.", 2026));
trackEv("GO2026-009", addEvidence("GO Carbon Footprint Evidence", "Evidence of annual carbon footprint measurement and reduction planning.", "green-office-2026", "GO2026-009", "GO-CRITERIA-07: Annual carbon footprint assessment required", "satisfied", "Baseline established. 10% reduction target set for 2027.", 2025));
trackEv("GO2026-006", addEvidence("GO Green Procurement Evidence", "Evidence of sustainable procurement policy adoption and implementation.", "green-office-2026", "GO2026-006", "GO-CRITERIA-08: Green procurement guidelines must be adopted", "satisfied", "Guidelines adopted by Procurement Office in Q1 2026.", 2026));
trackEv("GO2026-010", addEvidence("GO Communication Evidence", "Evidence of sustainability communication and awareness campaigns.", "green-office-2026", "GO2026-010", "GO-CRITERIA-09: Sustainability communication program must be active", "satisfied", "Newsletter published quarterly. Website updated monthly.", 2026));
addEvidence("GO KPI Tracking Evidence", "KPI tracking data for Green Office certification criteria and benchmarks.", "green-office-2026", ["GO2026-003", "GO2026-008"], "GO-CRITERIA-10: KPI tracking must be maintained", "partial", "Q1 KPIs tracked. Q2 data collection in progress.", 2026);
addEvidence("GO Cross-Initiative Evidence", "Evidence of collaboration with Smart Campus and Digital Transformation initiatives.", "green-office-2026", ["GO2026-004", "GO2026-009"], "GO-CRITERIA-11: Cross-initiative collaboration required", "satisfied", "Joint energy monitoring with Smart Campus project.", 2026);
addEvidence("GO Audit Compliance Evidence", "Internal audit compliance for Green Office certification requirements.", "green-office-2026", ["GO2026-001", "GO2026-005"], "GO-CRITERIA-12: Annual compliance audit required", "satisfied", "Internal audit completed. All criteria met.", 2026);

// Evidence: RAE Landing (12)
trackEv("RAE-001", addEvidence("RAE Assessment Guidance Evidence", "Evidence that RAE assessment preparation guidance is available to all faculty.", "rae-landing", "RAE-001", "RAE-CRITERIA-01: Faculty must have access to assessment preparation materials", "satisfied", "Guide v2.1 published and available on RAE landing page.", 2025));
trackEv("RAE-002", addEvidence("RAE Submission Template Evidence", "Evidence that standardized submission templates are available for evidence collection.", "rae-landing", "RAE-002", "RAE-CRITERIA-02: Standardized evidence submission process must exist", "satisfied", "Template v1.3 available for download. Used by 15 departments.", 2025));
trackEv("RAE-003", addEvidence("RAE Annual Report Evidence", "Annual RAE activity report demonstrating assessment progress and outcomes.", "rae-landing", "RAE-003", "RAE-CRITERIA-03: Annual RAE activity report must be published", "satisfied", "2025 annual report published. Available to all stakeholders.", 2025));
trackEv("RAE-004", addEvidence("RAE Classification Evidence", "Evidence of research output classification standards and guidelines.", "rae-landing", "RAE-004", "RAE-CRITERIA-04: Research classification standards must be documented", "satisfied", "Classification guide v1.0 published and distributed.", 2025));
trackEv("RAE-005", addEvidence("RAE Faculty Profile Evidence", "Evidence of faculty research profile collection and maintenance.", "rae-landing", "RAE-005", "RAE-CRITERIA-05: Faculty research profiles must be collected", "partial", "Template available. 60% of faculty profiles submitted.", 2026));
trackEv("RAE-006", addEvidence("RAE Criteria Evidence", "Published RAE assessment criteria and scoring standards documentation.", "rae-landing", "RAE-006", "RAE-CRITERIA-06: Assessment criteria must be published", "satisfied", "Criteria v3.0 published and communicated to all programs.", 2024));
trackEv("RAE-007", addEvidence("RAE Review Process Evidence", "Evidence of standardized review checklist for evidence evaluation.", "rae-landing", "RAE-007", "RAE-CRITERIA-07: Review process must have standardized checklist", "satisfied", "Checklist v1.1 in use by review committee.", 2025));
trackEv("RAE-008", addEvidence("RAE Stakeholder Evidence", "Evidence of stakeholder meeting documentation and engagement.", "rae-landing", "RAE-008", "RAE-CRITERIA-08: Stakeholder meetings must be documented", "satisfied", "Committee meetings held quarterly. Minutes published.", 2026));
addEvidence("RAE Cross-Reference Evidence", "Cross-project references between RAE, Research Portal, and QA.", "rae-landing", ["RAE-001", "RAE-003", "RAE-006"], "RAE-CRITERIA-09: Cross-project alignment required", "satisfied", "Integrated with Research Portal and QA systems.", 2025);
addEvidence("RAE Publication Tracking Evidence", "Evidence of research publication tracking and compilation.", "rae-landing", ["RP-003", "RP-006"], "RAE-CRITERIA-10: Publication tracking must be maintained", "satisfied", "Publications compiled annually for RAE review.", 2025);
addEvidence("RAE Methodology Evidence", "Evidence of research methodology guidelines availability.", "rae-landing", "RP-002", "RAE-CRITERIA-11: Methodology guidance must be available", "satisfied", "Guidelines published and accessible via portal.", 2025);
addEvidence("RAE Ethics Evidence", "Evidence of research ethics approval process documentation.", "rae-landing", "RP-004", "RAE-CRITERIA-12: Ethics approval process must be documented", "satisfied", "Ethics form v2.0 in use by all research units.", 2025);

// Evidence: Learning Center (12)
trackEv("LC-001", addEvidence("LC Course Catalog Evidence", "Evidence of published and accessible course catalog.", "learning-center", "LC-001", "LC-CRITERIA-01: Course catalog must be published and accessible", "satisfied", "2026 catalog published May 2026. Online version available.", 2026));
trackEv("LC-002", addEvidence("LC Annual Performance Evidence", "Annual performance data demonstrating Learning Center activities and outcomes.", "learning-center", "LC-002", "LC-CRITERIA-02: Annual performance report required", "satisfied", "2025 annual report published January 2026.", 2026));
trackEv("LC-003", addEvidence("LC Digital Literacy Evidence", "Evidence of digital literacy workshop delivery and impact.", "learning-center", "LC-003", "LC-CRITERIA-03: Digital literacy program must be active", "satisfied", "Workshops conducted for 300+ participants across 5 sessions.", 2026));
trackEv("LC-004", addEvidence("LC Academic Writing Evidence", "Evidence of academic writing skills training program.", "learning-center", "LC-004", "LC-CRITERIA-04: Academic writing support must be available", "satisfied", "Handbook v2.0 published. Workshops held monthly.", 2025));
trackEv("LC-005", addEvidence("LC Quarterly Activity Evidence", "Quarterly activity reporting and performance tracking.", "learning-center", "LC-005", "LC-CRITERIA-05: Quarterly activity reports required", "satisfied", "Q1 2026 report submitted and reviewed.", 2026));
trackEv("LC-006", addEvidence("LC Platform Evidence", "Evidence of online learning platform documentation and user support.", "learning-center", "LC-006", "LC-CRITERIA-06: Online platform user guide must be available", "satisfied", "User guide published. Help desk operational.", 2026));
addEvidence("LC Enrollment Evidence", "Course enrollment records and registration data.", "learning-center", "LC-007", "LC-CRITERIA-07: Enrollment records must be maintained", "satisfied", "Registration template in use. 1,200 enrollments in 2026.", 2025);
trackEv("LC-008", addEvidence("LC Strategic Plan Evidence", "Evidence of strategic planning for Learning Center development.", "learning-center", "LC-008", "LC-CRITERIA-08: Strategic plan must be in place", "satisfied", "3-year strategic plan approved by university council.", 2026));
addEvidence("LC Satisfaction Evidence", "Participant satisfaction survey results and analysis.", "learning-center", ["LC-003", "LC-005"], "LC-CRITERIA-09: Participant satisfaction must be measured", "satisfied", "Satisfaction rate: 4.2/5.0 across all programs.", 2026);
addEvidence("LC Staff Training Evidence", "Staff professional development and training records.", "learning-center", "LC-007", "LC-CRITERIA-10: Staff training records must be maintained", "partial", "Training records being digitized. 80% complete.", 2025);
addEvidence("LC Budget Evidence", "Budget utilization and financial compliance records.", "learning-center", "LC-005", "LC-CRITERIA-11: Budget compliance must be documented", "satisfied", "Within allocated budget. 85% utilization rate.", 2026);
addEvidence("LC Accessibility Evidence", "Evidence of accessible and inclusive learning resources.", "learning-center", ["LC-001", "LC-006"], "LC-CRITERIA-12: Learning resources must be accessible", "satisfied", "Platform supports WCAG 2.1. Materials in multiple formats.", 2026);

// Evidence: Research Portal (10)
trackEv("RP-001", addEvidence("RP Database Evidence", "Portal database schema and architecture documentation.", "research-portal", "RP-001", "RP-CRITERIA-01: Database schema must be documented", "satisfied", "Schema v1.0 documented and version-controlled.", 2026));
trackEv("RP-002", addEvidence("RP Methodology Evidence", "Research methodology guidelines and best practices.", "research-portal", "RP-002", "RP-CRITERIA-02: Methodology guidance must be available", "satisfied", "Guidelines v1.1 published on portal.", 2025));
trackEv("RP-003", addEvidence("RP Publications Evidence", "Annual compilation of MJU-affiliated research publications.", "research-portal", "RP-003", "RP-CRITERIA-03: Publication compilation required annually", "satisfied", "2025 compilation published with 120+ entries.", 2025));
trackEv("RP-004", addEvidence("RP Ethics Evidence", "Research ethics approval process and documentation.", "research-portal", "RP-004", "RP-CRITERIA-04: Ethics approval process must be documented", "satisfied", "Ethics form v2.0 in use. IRB active.", 2025));
addEvidence("RP MOU Evidence", "MOU template for research collaboration agreements.", "research-portal", "RP-005", "RP-CRITERIA-05: Collaboration MOU template must exist", "satisfied", "MOU template v1.0 available for all partnerships.", 2024);
trackEv("RP-006", addEvidence("RP Impact Evidence", "Research impact measurement and assessment data.", "research-portal", "RP-006", "RP-CRITERIA-06: Research impact must be assessed annually", "partial", "Impact report in draft. Citation analysis pending.", 2026));
addEvidence("RP RAE Integration Evidence", "Integration between Research Portal and RAE systems.", "research-portal", ["RP-001", "RP-003", "RAE-001"], "RP-CRITERIA-07: RAE integration must be maintained", "satisfied", "Bidirectional data flow established between systems.", 2025);
addEvidence("RP Metrics Evidence", "Publication and citation metrics tracking.", "research-portal", ["RP-003", "RP-006"], "RP-CRITERIA-08: Publication metrics must be tracked", "partial", "Publication count tracked. Citation data integration in progress.", 2025);
addEvidence("RP Adoption Evidence", "Portal usage statistics and user adoption metrics.", "research-portal", "RP-001", "RP-CRITERIA-09: Portal usage must be monitored", "partial", "Basic analytics implemented. 500 active users monthly.", 2026);
addEvidence("RP Data Quality Evidence", "Data quality assurance procedures and validation results.", "research-portal", "RP-001", "RP-CRITERIA-10: Data quality must be maintained", "satisfied", "Monthly data quality reports generated. Accuracy: 98%.", 2026);

// Evidence: Enterprise Shared Documents (10)
trackEv("ESD-001", addEvidence("ESD Policy Evidence", "Comprehensive policy manual availability and currency.", "enterprise-shared-docs", "ESD-001", "ESD-CRITERIA-01: Policy manual must be current and accessible", "satisfied", "Manual v4.0 current and distributed to all departments.", 2024));
trackEv("ESD-002", addEvidence("ESD Procurement Evidence", "Procurement guidelines and purchasing procedure documentation.", "enterprise-shared-docs", "ESD-002", "ESD-CRITERIA-02: Procurement procedures must be documented", "satisfied", "Guidelines v2.0 published and in use.", 2025));
trackEv("ESD-003", addEvidence("ESD HR Policy Evidence", "HR policy documentation including leave and attendance.", "enterprise-shared-docs", "ESD-003", "ESD-CRITERIA-03: HR policies must be documented", "satisfied", "Leave policy v1.1 published. 100% staff acknowledged.", 2025));
trackEv("ESD-004", addEvidence("ESD Budget Evidence", "Annual budget allocation and financial planning documents.", "enterprise-shared-docs", "ESD-004", "ESD-CRITERIA-04: Budget allocation must be documented", "satisfied", "FY2569 budget published and approved by council.", 2026));
trackEv("ESD-005", addEvidence("ESD Privacy Evidence", "Data privacy policy and PDPA compliance documentation.", "enterprise-shared-docs", "ESD-005", "ESD-CRITERIA-05: Data privacy policy must be in place", "satisfied", "PDPA-compliant policy v1.0 published.", 2025));
addEvidence("ESD Org Chart Evidence", "Current organizational structure documentation.", "enterprise-shared-docs", "ESD-006", "ESD-CRITERIA-06: Organization chart must be current", "satisfied", "2026 org chart published and distributed.", 2026);
trackEv("ESD-007", addEvidence("ESD Audit Evidence", "Internal audit results and compliance verification.", "enterprise-shared-docs", "ESD-007", "ESD-CRITERIA-07: Internal audit must be conducted annually", "satisfied", "FY2568 audit completed. 3 recommendations implemented.", 2025));
trackEv("ESD-008", addEvidence("ESD Emergency Evidence", "Emergency response and business continuity planning.", "enterprise-shared-docs", "ESD-008", "ESD-CRITERIA-08: Emergency response plan must be current", "satisfied", "Plan v2.0 approved. Drill conducted in Q1 2026.", 2025));
addEvidence("ESD Retention Evidence", "Document retention policy and schedule compliance.", "enterprise-shared-docs", ["ESD-001", "ESD-005"], "ESD-CRITERIA-09: Document retention must comply with regulations", "satisfied", "Retention schedule followed. Annual review conducted.", 2025);
addEvidence("ESD Cross-Dept Evidence", "Cross-departmental document sharing and access metrics.", "enterprise-shared-docs", ["ESD-001", "ESD-002", "ESD-006"], "ESD-CRITERIA-10: Cross-department access must be maintained", "satisfied", "All departments have access. 500+ shared documents.", 2025);

// Evidence: MJU Digital Transformation (10)
trackEv("DT-001", addEvidence("DT Roadmap Evidence", "Digital transformation roadmap and strategic plan.", "mju-digital-transformation", "DT-001", "DT-CRITERIA-01: DT roadmap must be approved", "satisfied", "Roadmap v1.0 approved by steering committee.", 2026));
trackEv("DT-002", addEvidence("DT Cloud Evidence", "Cloud migration strategy and implementation plan.", "mju-digital-transformation", "DT-002", "DT-CRITERIA-02: Cloud migration strategy must be documented", "satisfied", "Strategy v1.0 approved. Phase 1 migration in progress.", 2026));
trackEv("DT-003", addEvidence("DT Training Evidence", "Staff digital skills training program delivery records.", "mju-digital-transformation", "DT-003", "DT-CRITERIA-03: Staff digital training must be delivered", "partial", "Training program launched. 150 staff enrolled in 3 modules.", 2026));
trackEv("DT-004", addEvidence("DT Governance Evidence", "IT governance framework and decision rights documentation.", "mju-digital-transformation", "DT-004", "DT-CRITERIA-04: IT governance framework must be in place", "satisfied", "Framework v1.0 approved by university council.", 2025));
trackEv("DT-005", addEvidence("DT Progress Evidence", "Digital transformation progress reporting and milestone tracking.", "mju-digital-transformation", "DT-005", "DT-CRITERIA-05: Progress must be reported quarterly", "satisfied", "Q1 report published. All milestones on schedule.", 2026));
addEvidence("DT Integration Evidence", "System integration progress and cross-platform compatibility.", "mju-digital-transformation", ["DT-001", "DT-002"], "DT-CRITERIA-06: System integration milestones must be tracked", "partial", "Phase 1 integration of 3 systems complete. Phase 2 planned.", 2026);
addEvidence("DT Budget Evidence", "Digital transformation budget utilization and forecasts.", "mju-digital-transformation", "DT-004", "DT-CRITERIA-07: DT budget must be tracked", "satisfied", "Budget utilization at 45%. On track for year-end targets.", 2026);
addEvidence("DT Stakeholder Evidence", "Stakeholder communication and engagement records.", "mju-digital-transformation", "DT-005", "DT-CRITERIA-08: Stakeholder updates must be provided", "satisfied", "Monthly status reports sent to all stakeholders.", 2026);
addEvidence("DT Security Evidence", "Security compliance and risk assessment for digital initiatives.", "mju-digital-transformation", ["DT-002", "DT-004"], "DT-CRITERIA-09: Security must be integrated into DT initiatives", "satisfied", "Security review conducted. Risk mitigation plan active.", 2026);
addEvidence("DT Cross-Project Evidence", "Collaboration with Smart Campus and IT Infrastructure projects.", "mju-digital-transformation", ["DT-001", "DT-005", "SC-001"], "DT-CRITERIA-10: Cross-project collaboration required", "satisfied", "Joint steering committee established. Monthly sync meetings.", 2026);

// Evidence: Smart Campus Initiative (10)
trackEv("SC-001", addEvidence("SC IoT Evidence", "IoT infrastructure deployment plan and architecture.", "smart-campus-initiative", "SC-001", "SC-CRITERIA-01: IoT infrastructure plan must be approved", "satisfied", "Plan v1.0 approved. Sensors deployed in 5 buildings.", 2026));
trackEv("SC-002", addEvidence("SC Security Evidence", "Integrated security system design and implementation status.", "smart-campus-initiative", "SC-002", "SC-CRITERIA-02: Security system proposal must be approved", "satisfied", "Proposal v1.2 approved. Phase 1 implementation in progress.", 2025));
trackEv("SC-003", addEvidence("SC Classroom Evidence", "Smart classroom technology standards and specifications.", "smart-campus-initiative", "SC-003", "SC-CRITERIA-03: Smart classroom standards must be published", "satisfied", "Standards v1.0 published. 30 classrooms upgraded.", 2025));
trackEv("SC-004", addEvidence("SC Budget Evidence", "Smart campus budget allocation and resource plan.", "smart-campus-initiative", "SC-004", "SC-CRITERIA-04: Budget plan must be approved", "satisfied", "Budget approved. Phased spending plan in place.", 2026));
trackEv("SC-005", addEvidence("SC Energy Evidence", "Real-time energy monitoring data and analysis from IoT sensors.", "smart-campus-initiative", "SC-005", "SC-CRITERIA-05: Energy monitoring must be operational", "satisfied", "Smart meters deployed. Dashboard operational.", 2026));
addEvidence("SC Pilot Evidence", "Pilot project results and evaluation data.", "smart-campus-initiative", ["SC-001", "SC-003"], "SC-CRITERIA-06: Pilot projects must be evaluated", "partial", "2 pilots completed. 3 in progress. Evaluation framework active.", 2026);
addEvidence("SC Vendor Evidence", "Vendor selection and procurement documentation.", "smart-campus-initiative", "SC-004", "SC-CRITERIA-07: Vendor selection must be documented", "partial", "RFP issued. 5 vendor responses received. Evaluation ongoing.", 2026);
addEvidence("SC Sustainability Evidence", "Smart campus sustainability impact measurement.", "smart-campus-initiative", ["SC-005", "GO2026-004"], "SC-CRITERIA-08: Sustainability impact must be measured", "partial", "Energy savings baseline: 12% reduction in pilot buildings.", 2026);
addEvidence("SC Adoption Evidence", "User adoption metrics for smart campus technologies.", "smart-campus-initiative", "SC-003", "SC-CRITERIA-09: User adoption must be tracked", "partial", "Faculty adoption: 65%. Student adoption: 40%.", 2026);
addEvidence("SC Integration Evidence", "System integration architecture and cross-platform compatibility.", "smart-campus-initiative", ["SC-001", "SC-002"], "SC-CRITERIA-10: System integration must be documented", "satisfied", "Integration architecture defined. API gateway operational.", 2026);

// Evidence: Academic Quality Assurance (10)
trackEv("AQ-001", addEvidence("AQ IQA Manual Evidence", "Internal quality assurance manual and procedures.", "academic-quality-assurance", "AQ-001", "AQ-CRITERIA-01: IQA manual must be current and accessible", "satisfied", "Manual v3.0 published. Distributed to all programs.", 2025));
trackEv("AQ-002", addEvidence("AQ Self-Assessment Evidence", "Annual program self-assessment completion records.", "academic-quality-assurance", "AQ-002", "AQ-CRITERIA-02: Annual self-assessment required", "satisfied", "All 45 programs completed 2025 self-assessment.", 2025));
trackEv("AQ-003", addEvidence("AQ External Audit Evidence", "External audit preparation and readiness documentation.", "academic-quality-assurance", "AQ-003", "AQ-CRITERIA-03: External audit preparation must be documented", "satisfied", "Checklist completed. Mock audit conducted.", 2026));
trackEv("AQ-004", addEvidence("AQ Graduate Evidence", "Graduate employment outcomes and program effectiveness data.", "academic-quality-assurance", "AQ-004", "AQ-CRITERIA-04: Graduate outcomes must be assessed annually", "satisfied", "Employment rate: 82%. Graduate satisfaction: 4.1/5.0.", 2025));
trackEv("AQ-005", addEvidence("AQ Training Evidence", "QA training delivery and participation records.", "academic-quality-assurance", "AQ-005", "AQ-CRITERIA-05: QA training must be delivered annually", "satisfied", "50 committee members and coordinators trained in 2025.", 2025));
addEvidence("AQ Program Review Evidence", "Program review cycle documentation and scheduling.", "academic-quality-assurance", ["AQ-001", "AQ-002"], "AQ-CRITERIA-06: Program review cycle must be maintained", "satisfied", "5-year review cycle active. 9 programs reviewed in 2025.", 2025);
addEvidence("AQ Improvement Evidence", "Continuous improvement action plans and tracking.", "academic-quality-assurance", "AQ-002", "AQ-CRITERIA-07: Improvement plans must be documented", "partial", "Action plans in progress for 3 programs. Monitoring active.", 2025);
addEvidence("AQ RAE Alignment Evidence", "Alignment between QA standards and RAE assessment criteria.", "academic-quality-assurance", ["AQ-001", "RAE-006"], "AQ-CRITERIA-08: RAE alignment must be maintained", "satisfied", "IQA standards mapped to RAE criteria. Cross-reference maintained.", 2025);
addEvidence("AQ Feedback Evidence", "Stakeholder feedback collection and analysis.", "academic-quality-assurance", ["AQ-004", "AQ-002"], "AQ-CRITERIA-09: Stakeholder feedback must be collected", "satisfied", "Annual survey conducted. Response rate: 72%.", 2025);
addEvidence("AQ Benchmarking Evidence", "External benchmarking and national QA network participation.", "academic-quality-assurance", "AQ-003", "AQ-CRITERIA-10: External benchmarking must be conducted", "partial", "Active participation in national QA network. Benchmarking report pending.", 2026);

// Evidence: International Collaboration (10)
trackEv("IC-001", addEvidence("IC MOU Evidence", "Master MOU framework for international partnerships.", "international-collaboration", "IC-001", "IC-CRITERIA-01: MOU framework must be established", "satisfied", "Framework v1.0 approved. 12 active international MOUs.", 2025));
trackEv("IC-002", addEvidence("IC Exchange Evidence", "Student and faculty exchange program activity data.", "international-collaboration", "IC-002", "IC-CRITERIA-02: Exchange program report required annually", "satisfied", "2025 report published. 45 exchange participants.", 2025));
trackEv("IC-003", addEvidence("IC Research Evidence", "Collaborative research guidelines and partnership records.", "international-collaboration", "IC-003", "IC-CRITERIA-03: Collaborative research guidelines must be published", "satisfied", "Guidelines v1.0 published. 8 joint research projects active.", 2025));
trackEv("IC-004", addEvidence("IC Conference Evidence", "International conference participation policy and records.", "international-collaboration", "IC-004", "IC-CRITERIA-04: Conference policy must be documented", "satisfied", "Policy v1.0 approved. 15 conferences attended in 2025.", 2024));
trackEv("IC-005", addEvidence("IC Student Evidence", "International student orientation and support services.", "international-collaboration", "IC-005", "IC-CRITERIA-05: International student support must be documented", "satisfied", "Orientation guide published. Support services operational.", 2026));
addEvidence("IC Partnership Evidence", "Active international partnership inventory and status.", "international-collaboration", ["IC-001", "IC-003"], "IC-CRITERIA-06: Partnership agreements must be maintained", "satisfied", "12 active MOUs with universities in 8 countries.", 2025);
addEvidence("IC Funding Evidence", "International collaboration funding sources and grants.", "international-collaboration", "IC-002", "IC-CRITERIA-07: Funding sources must be documented", "partial", "3 grant applications submitted. 1 awarded.", 2025);
addEvidence("IC Events Evidence", "International event participation and hosting records.", "international-collaboration", "IC-004", "IC-CRITERIA-08: International event participation must be recorded", "satisfied", "15 conferences attended. 2 international events hosted.", 2025);
addEvidence("IC Satisfaction Evidence", "International student and partner satisfaction data.", "international-collaboration", "IC-005", "IC-CRITERIA-09: Stakeholder satisfaction must be measured", "partial", "Survey in development. Pilot planned for Q3 2026.", 2026);
addEvidence("IC Cross-Project Evidence", "Cross-project collaboration with Research Portal.", "international-collaboration", ["IC-001", "IC-003", "RP-005"], "IC-CRITERIA-10: Cross-project collaboration required", "satisfied", "Joint research MOUs aligned with Research Portal framework.", 2025);

// Evidence: Student Development Program (10)
trackEv("SD-001", addEvidence("SD Leadership Evidence", "Student leadership development program delivery and impact.", "student-development-program", "SD-001", "SD-CRITERIA-01: Leadership program must be delivered annually", "satisfied", "Program launched. 120 students enrolled in leadership track.", 2026));
trackEv("SD-002", addEvidence("SD Career Evidence", "Career preparation workshop materials and attendance.", "student-development-program", "SD-002", "SD-CRITERIA-02: Career preparation must be available", "satisfied", "Workshops conducted for 400+ students. 85% positive feedback.", 2026));
trackEv("SD-003", addEvidence("SD Activities Evidence", "Student activities catalog and participation data.", "student-development-program", "SD-003", "SD-CRITERIA-03: Activities catalog must be published", "satisfied", "2026 catalog published. 45 active student clubs.", 2026));
trackEv("SD-004", addEvidence("SD Volunteer Evidence", "Student volunteer program participation and impact.", "student-development-program", "SD-004", "SD-CRITERIA-04: Volunteer program must be active", "satisfied", "800 volunteer hours logged across 12 community projects.", 2025));
trackEv("SD-005", addEvidence("SD Satisfaction Evidence", "Student satisfaction survey results and analysis.", "student-development-program", "SD-005", "SD-CRITERIA-05: Student satisfaction must be measured annually", "satisfied", "Survey completed. Overall satisfaction: 3.8/5.0.", 2025));
addEvidence("SD Skills Evidence", "Student skill development assessment and tracking.", "student-development-program", ["SD-001", "SD-002"], "SD-CRITERIA-06: Skill development must be tracked", "partial", "Pre/post assessment implemented for leadership program.", 2026);
addEvidence("SD Engagement Evidence", "Student participation and engagement metrics.", "student-development-program", "SD-003", "SD-CRITERIA-07: Student engagement must be measured", "satisfied", "60% student participation rate in at least one activity.", 2026);
addEvidence("SD Financial Evidence", "Student financial support and scholarship data.", "student-development-program", "SD-005", "SD-CRITERIA-08: Financial support data must be maintained", "partial", "Scholarship database containing 500+ records.", 2025);
addEvidence("SD Alumni Evidence", "Alumni engagement and tracking records.", "student-development-program", "SD-004", "SD-CRITERIA-09: Alumni engagement must be maintained", "partial", "Alumni database: 2,000 records. Engagement events held.", 2025);
addEvidence("SD Cross-Project Evidence", "Collaboration with Learning Center and QA.", "student-development-program", ["SD-002", "SD-005", "AQ-004"], "SD-CRITERIA-10: Cross-project collaboration required", "satisfied", "Joint career programs with Learning Center. QA data shared.", 2025);

// Evidence: Community Engagement (10)
trackEv("CE-001", addEvidence("CE Outreach Evidence", "Community outreach program framework and implementation.", "community-engagement", "CE-001", "CE-CRITERIA-01: Outreach framework must be established", "satisfied", "Framework v1.0 approved. Programs active in 10 communities.", 2025));
trackEv("CE-002", addEvidence("CE Knowledge Evidence", "Knowledge transfer to community activities and outcomes.", "community-engagement", "CE-002", "CE-CRITERIA-02: Knowledge transfer must be reported annually", "satisfied", "2025 report published. 15 training sessions delivered.", 2025));
trackEv("CE-003", addEvidence("CE Needs Evidence", "Community needs assessment results and analysis.", "community-engagement", "CE-003", "CE-CRITERIA-03: Community needs must be assessed", "satisfied", "Assessment completed. Findings inform program planning.", 2025));
trackEv("CE-004", addEvidence("CE Communication Evidence", "Community newsletter and communication materials.", "community-engagement", "CE-004", "CE-CRITERIA-04: Community communication must be maintained", "satisfied", "Newsletter published quarterly. Distribution: 500+ readers.", 2026));
trackEv("CE-005", addEvidence("CE USR Evidence", "University social responsibility report and impact assessment.", "community-engagement", "CE-005", "CE-CRITERIA-05: USR report must be published annually", "satisfied", "2025 report published. SDG alignment documented.", 2025));
addEvidence("CE Partnership Evidence", "Community partnership agreements and collaboration records.", "community-engagement", ["CE-001", "CE-003"], "CE-CRITERIA-06: Community partnerships must be documented", "satisfied", "8 active partnership MOUs with local communities.", 2025);
addEvidence("CE Impact Evidence", "Community impact measurement and evaluation data.", "community-engagement", ["CE-002", "CE-005"], "CE-CRITERIA-07: Community impact must be measured", "partial", "Impact metrics framework in development. Baseline data collected.", 2025);
addEvidence("CE Volunteer Evidence", "University volunteer participation in community programs.", "community-engagement", ["CE-004", "SD-004"], "CE-CRITERIA-08: Volunteer participation must be tracked", "satisfied", "200+ volunteers from university community engaged.", 2025);
addEvidence("CE Budget Evidence", "Community engagement budget utilization and reporting.", "community-engagement", "CE-005", "CE-CRITERIA-09: Budget utilization must be documented", "satisfied", "Budget fully utilized. Impact-to-cost ratio tracked.", 2025);
addEvidence("CE Sustainability Evidence", "Sustainability integration in community programs.", "community-engagement", ["CE-001", "GO2026-009"], "CE-CRITERIA-10: Sustainability must be integrated", "satisfied", "SDG alignment mapped. Environmental impact tracked.", 2025);

// Evidence: IT Infrastructure Modernization (8)
trackEv("IT-001", addEvidence("IT Network Evidence", "Network infrastructure upgrade plan and specifications.", "it-infrastructure-modernization", "IT-001", "IT-CRITERIA-01: Network upgrade plan must be documented", "partial", "Plan in draft review. Expected approval Q3 2026.", 2026));
trackEv("IT-002", addEvidence("IT Datacenter Evidence", "Data center consolidation strategy and implementation plan.", "it-infrastructure-modernization", "IT-002", "IT-CRITERIA-02: Data center strategy must be documented", "partial", "Strategy in development. Assessment phase in progress.", 2026));
trackEv("IT-003", addEvidence("IT Budget Evidence", "IT procurement budget and resource allocation plan.", "it-infrastructure-modernization", "IT-003", "IT-CRITERIA-03: IT budget must be approved", "partial", "Budget proposal submitted. Review pending.", 2026));
trackEv("IT-004", addEvidence("IT Continuity Evidence", "IT service continuity and disaster recovery planning.", "it-infrastructure-modernization", "IT-004", "IT-CRITERIA-04: Continuity plan must be current", "satisfied", "Plan v1.0 approved. Annual drill conducted in Q1.", 2025));
addEvidence("IT Vendor Evidence", "IT vendor selection and procurement records.", "it-infrastructure-modernization", "IT-003", "IT-CRITERIA-05: Vendor selection must be documented", "partial", "Vendor evaluation in progress. RFP responses being reviewed.", 2026);
addEvidence("IT Security Evidence", "IT security compliance baseline and risk assessment.", "it-infrastructure-modernization", ["IT-004", "ESD-005"], "IT-CRITERIA-06: Security compliance must be maintained", "satisfied", "Security baseline established. Monthly scans conducted.", 2025);
addEvidence("IT Cross-Project Evidence", "Cross-project collaboration with DT and Smart Campus.", "it-infrastructure-modernization", ["IT-001", "IT-002", "DT-002"], "IT-CRITERIA-07: Cross-project collaboration required", "satisfied", "Joint architecture review with DT and Smart Campus teams.", 2026);
addEvidence("IT Resource Evidence", "IT staffing and resource allocation documentation.", "it-infrastructure-modernization", "IT-001", "IT-CRITERIA-08: Resource allocation must be documented", "partial", "Resource plan in development. Staff augmentation in progress.", 2026);

// ──────────── DOCUMENTS (74) ────────────
function doc(id, title, desc, cat, subcat, year, fy, ver, status, owner, dept, keywords, tags, lang, ftype, fsize, provider, path, url, projRefs, relDocs, vis) {
  return {
    id, title, description: desc, category: cat, subcategory: subcat || null,
    year, fiscal_year: fy, version: ver, status, owner, department: dept,
    keywords, tags, language: lang, file_type: ftype, file_size: fsize,
    storage_provider: provider, storage_path: path, share_url: url,
    preview_url: "", thumbnail_url: "",
    project_refs: projRefs,
    evidence_refs: (docEvRefs[id] || []),
    related_documents: relDocs || [],
    visibility: vis || "internal",
    created_at: `${year}-01-15T08:00:00Z`, updated_at: now,
  };
}

const docs = [
  // ── Green Office 2026 (10) ──
  doc("GO2026-001", "Green Office 2026 Initiative Plan", "Strategic plan for the Green Office 2026 initiative at Maejo University, outlining sustainability goals and action items.", "strategic-plan", "initiative", 2025, "2568", "1.2", "approved", "owner-sustainability", "Office of Sustainability", ["green office", "sustainability", "strategic plan", "MJU", "environment"], ["green-office", "strategic", "approved"], "th", "pdf", 2450000, "sharepoint", "/sites/GreenOffice/Shared Documents/Plans/GO2026_Initiative_Plan_v1.2.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Plans/GO2026_Initiative_Plan_v1.2.pdf", ["green-office-2026"], ["GO2026-002", "GO2026-003"], "internal"),
  doc("GO2026-002", "Waste Management Guidelines 2026", "Standard operating procedures for waste segregation, collection, and disposal across MJU campuses.", "guideline", "waste", 2026, "2569", "1.0", "published", "owner-sustainability", "Office of Sustainability", ["waste management", "recycling", "guidelines", "MJU", "segregation"], ["waste", "guideline", "published"], "th", "docx", 1800000, "sharepoint", "/sites/GreenOffice/Shared Documents/Guidelines/Waste_Management_Guidelines_2026.docx", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Guidelines/Waste_Management_Guidelines_2026.docx", ["green-office-2026"], ["GO2026-001"], "internal"),
  doc("GO2026-003", "Green Office Quarterly Report Q1 2026", "First quarter progress report for the Green Office 2026 initiative, including KPIs and milestones achieved.", "report", "quarterly", 2026, "2569", "1.0", "published", "owner-sustainability", "Office of Sustainability", ["quarterly report", "green office", "progress", "KPI", "Q1"], ["report", "quarterly", "published", "kpi"], "th", "pdf", 3200000, "sharepoint", "/sites/GreenOffice/Shared Documents/Reports/Q1_2026_Green_Office_Report.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Reports/Q1_2026_Green_Office_Report.pdf", ["green-office-2026", "rae-landing"], ["GO2026-001", "GO2026-008"], "public"),
  doc("GO2026-004", "Energy Conservation Action Plan", "Action plan for reducing energy consumption across MJU campus buildings and facilities.", "strategic-plan", "energy", 2025, "2568", "1.1", "approved", "owner-sustainability", "Office of Sustainability", ["energy", "conservation", "action plan", "electricity", "sustainability"], ["energy", "action-plan", "approved"], "th", "pdf", 1900000, "sharepoint", "/sites/GreenOffice/Shared Documents/Plans/Energy_Conservation_Action_Plan_v1.1.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Plans/Energy_Conservation_Action_Plan_v1.1.pdf", ["green-office-2026", "smart-campus-initiative"], ["GO2026-001", "SC-005"], "internal"),
  doc("GO2026-005", "Water Resource Management Plan", "Comprehensive plan for water conservation, rainwater harvesting, and wastewater treatment at MJU.", "strategic-plan", "water", 2025, "2568", "1.0", "approved", "owner-sustainability", "Office of Sustainability", ["water", "conservation", "rainwater", "wastewater", "sustainability"], ["water", "plan", "approved"], "th", "pdf", 2100000, "sharepoint", "/sites/GreenOffice/Shared Documents/Plans/Water_Management_Plan_v1.0.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Plans/Water_Management_Plan_v1.0.pdf", ["green-office-2026"], ["GO2026-001", "GO2026-002"], "internal"),
  doc("GO2026-006", "Green Procurement Guidelines", "Sustainable procurement criteria and vendor selection guidelines for environmentally responsible purchasing.", "guideline", "procurement", 2026, "2569", "1.0", "published", "owner-sustainability", "Office of Sustainability", ["green procurement", "sustainable", "purchasing", "vendor", "environment"], ["procurement", "guideline", "published"], "th", "docx", 1250000, "sharepoint", "/sites/GreenOffice/Shared Documents/Guidelines/Green_Procurement_Guidelines_v1.0.docx", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Guidelines/Green_Procurement_Guidelines_v1.0.docx", ["green-office-2026", "enterprise-shared-docs"], ["GO2026-001", "ESD-005"], "internal"),
  doc("GO2026-007", "Sustainability Awareness Training Module", "Training materials for staff and student sustainability awareness and green office practices.", "training", "sustainability", 2026, "2569", "1.0", "published", "owner-sustainability", "Office of Sustainability", ["sustainability", "training", "awareness", "green office", "staff"], ["training", "sustainability", "published"], "th", "pdf", 4800000, "sharepoint", "/sites/GreenOffice/Shared Documents/Training/Sustainability_Awareness_Module_v1.0.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Training/Sustainability_Awareness_Module_v1.0.pdf", ["green-office-2026", "learning-center"], ["GO2026-001", "LC-006"], "public"),
  doc("GO2026-008", "Green Office Q2 Progress Report 2026", "Second quarter progress update with sustainability metrics and departmental achievements.", "report", "quarterly", 2026, "2569", "1.0", "draft", "owner-sustainability", "Office of Sustainability", ["quarterly report", "Q2", "green office", "metrics", "sustainability"], ["report", "quarterly", "draft"], "th", "pdf", 2800000, "sharepoint", "/sites/GreenOffice/Shared Documents/Reports/Q2_2026_Green_Office_Report.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Reports/Q2_2026_Green_Office_Report.pdf", ["green-office-2026"], ["GO2026-003", "GO2026-001"], "internal"),
  doc("GO2026-009", "Carbon Footprint Assessment Report 2025", "University-wide carbon footprint assessment with baseline measurements and reduction targets.", "report", "assessment", 2025, "2568", "1.0", "published", "owner-sustainability", "Office of Sustainability", ["carbon footprint", "emissions", "assessment", "sustainability", "environment"], ["carbon", "assessment", "published"], "en", "pdf", 3500000, "sharepoint", "/sites/GreenOffice/Shared Documents/Reports/Carbon_Footprint_Assessment_2025.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Reports/Carbon_Footprint_Assessment_2025.pdf", ["green-office-2026", "rae-landing"], ["GO2026-001", "GO2026-003"], "public"),
  doc("GO2026-010", "Green Office Newsletter Vol.1 2026", "Quarterly newsletter highlighting sustainability achievements, green tips, and upcoming events.", "communication", "newsletter", 2026, "2569", "1.0", "published", "owner-sustainability", "Office of Sustainability", ["newsletter", "green office", "sustainability", "communication", "events"], ["communication", "newsletter", "published"], "th", "pdf", 850000, "sharepoint", "/sites/GreenOffice/Shared Documents/Communications/GO_Newsletter_Vol1_2026.pdf", "https://mju365.sharepoint.com/sites/GreenOffice/Shared%20Documents/Communications/GO_Newsletter_Vol1_2026.pdf", ["green-office-2026", "community-engagement"], [], "public"),

  // ── RAE Landing (8) ──
  doc("RAE-001", "RAE Assessment Preparation Guide", "Comprehensive guide for faculty preparing documentation for the Research Assessment Exercise.", "guideline", "assessment", 2025, "2568", "2.1", "approved", "owner-research", "Research Administration", ["RAE", "assessment", "research", "preparation", "faculty guide"], ["rae", "guideline", "assessment", "research"], "th", "pdf", 4100000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/RAE_Assessment_Guide_v2.1.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/RAE_Assessment_Guide_v2.1.pdf", ["rae-landing", "research-portal"], ["RAE-002", "RAE-003"], "public"),
  doc("RAE-002", "RAE Evidence Submission Template", "Standardized template for submitting evidence documents for the Research Assessment Exercise.", "template", "evidence", 2025, "2568", "1.3", "published", "owner-research", "Research Administration", ["RAE", "template", "evidence", "submission", "form"], ["rae", "template", "evidence", "submission"], "en", "xlsx", 980000, "onedrive", "/research/RAE/Templates/RAE_Evidence_Template_v1.3.xlsx", "https://mju365-my.sharepoint.com/personal/research_mju365_onmicrosoft_com/Documents/RAE/Templates/RAE_Evidence_Template_v1.3.xlsx", ["rae-landing", "research-portal"], ["RAE-001", "RAE-007"], "public"),
  doc("RAE-003", "RAE Annual Report 2025", "Annual summary of RAE activities, completed assessments, and faculty participation statistics.", "report", "annual", 2025, "2568", "1.0", "published", "owner-research", "Research Administration", ["RAE", "annual report", "assessment", "statistics", "faculty"], ["rae", "report", "annual", "published"], "th", "pdf", 3800000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/Reports/RAE_Annual_Report_2025.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/Reports/RAE_Annual_Report_2025.pdf", ["rae-landing", "research-portal", "academic-quality-assurance"], ["RAE-001", "AQ-002"], "public"),
  doc("RAE-004", "Research Output Classification Guide", "Guidelines for classifying research outputs according to RAE criteria and international standards.", "guideline", "classification", 2025, "2568", "1.0", "approved", "owner-research", "Research Administration", ["RAE", "classification", "research output", "criteria", "guidelines"], ["rae", "classification", "approved"], "en", "pdf", 1500000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/Research_Classification_Guide_v1.0.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/Research_Classification_Guide_v1.0.pdf", ["rae-landing", "research-portal"], ["RAE-001"], "public"),
  doc("RAE-005", "Faculty Research Profile Template", "Standardized template for faculty to compile their research profiles and publication records.", "template", "profile", 2026, "2569", "1.0", "published", "owner-research", "Research Administration", ["RAE", "template", "faculty", "research profile", "publications"], ["rae", "template", "faculty"], "en", "docx", 720000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/Templates/Faculty_Research_Profile_Template_v1.0.docx", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/Templates/Faculty_Research_Profile_Template_v1.0.docx", ["rae-landing", "research-portal"], ["RAE-002", "RP-003"], "internal"),
  doc("RAE-006", "RAE Criteria and Standards Document v3.0", "Official RAE assessment criteria, scoring rubrics, and quality standards for research evaluation.", "assessment", "criteria", 2024, "2567", "3.0", "approved", "owner-research", "Research Administration", ["RAE", "criteria", "standards", "assessment", "scoring"], ["rae", "criteria", "standards", "approved"], "en", "pdf", 2900000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/RAE_Criteria_v3.0.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/RAE_Criteria_v3.0.pdf", ["rae-landing", "academic-quality-assurance"], ["RAE-001", "RAE-004", "AQ-001"], "public"),
  doc("RAE-007", "RAE Evidence Review Checklist", "Standardized checklist for reviewers to evaluate completeness and quality of evidence submissions.", "assessment", "checklist", 2025, "2568", "1.1", "published", "owner-research", "Research Administration", ["RAE", "review", "checklist", "evidence", "quality"], ["rae", "review", "checklist", "published"], "en", "xlsx", 560000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/RAE_Review_Checklist_v1.1.xlsx", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/RAE_Review_Checklist_v1.1.xlsx", ["rae-landing"], ["RAE-002", "RAE-006"], "internal"),
  doc("RAE-008", "RAE Steering Committee Meeting Minutes Feb 2026", "Minutes from the RAE steering committee meeting covering timeline, milestones, and resource planning.", "meeting", "committee", 2026, "2569", "1.0", "published", "owner-research", "Research Administration", ["RAE", "meeting", "minutes", "committee", "stakeholder"], ["rae", "meeting", "minutes", "published"], "th", "pdf", 1100000, "sharepoint", "/sites/ResearchOffice/Shared Documents/RAE/Meetings/RAE_Committee_Minutes_Feb2026.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/RAE/Meetings/RAE_Committee_Minutes_Feb2026.pdf", ["rae-landing"], ["RAE-001", "RAE-003"], "internal"),

  // ── Learning Center (8) ──
  doc("LC-001", "Learning Center Course Catalog 2026", "Complete catalog of courses and workshops offered by the MJU Learning Center for the 2026 academic year.", "catalog", "course", 2026, "2569", "1.0", "published", "owner-learning", "Learning Center", ["learning center", "course catalog", "workshops", "training", "MJU"], ["learning", "catalog", "courses", "2026"], "th", "pdf", 5600000, "sharepoint", "/sites/LearningCenter/Shared Documents/Catalog/Course_Catalog_2026.pdf", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Catalog/Course_Catalog_2026.pdf", ["learning-center"], ["LC-002", "LC-003"], "public"),
  doc("LC-002", "Learning Center Annual Report 2025", "Annual performance report for the MJU Learning Center covering activities, enrollment, and outcomes.", "report", "annual", 2025, "2568", "1.0", "published", "owner-learning", "Learning Center", ["annual report", "learning center", "performance", "enrollment", "2025"], ["report", "annual", "learning", "performance"], "th", "pdf", 4200000, "onedrive", "/learning/Reports/Annual_Report_2025.pdf", "https://mju365-my.sharepoint.com/personal/learning_mju365_onmicrosoft_com/Documents/Reports/Annual_Report_2025.pdf", ["learning-center"], ["LC-001", "LC-006"], "public"),
  doc("LC-003", "Digital Literacy Workshop Series", "Workshop materials and curriculum for the Digital Literacy program offered to students and staff.", "training", "digital", 2026, "2569", "1.0", "published", "owner-learning", "Learning Center", ["digital literacy", "workshop", "training", "curriculum", "skills"], ["training", "digital", "workshop", "published"], "th", "pdf", 5100000, "sharepoint", "/sites/LearningCenter/Shared Documents/Training/Digital_Literacy_Workshop_v1.0.pdf", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Training/Digital_Literacy_Workshop_v1.0.pdf", ["learning-center", "student-development-program"], ["LC-001", "SD-002"], "public"),
  doc("LC-004", "Academic Writing Skills Handbook", "Comprehensive handbook for academic writing skills including research papers, theses, and reports.", "training", "writing", 2025, "2568", "2.0", "approved", "owner-learning", "Learning Center", ["academic writing", "handbook", "skills", "research", "thesis"], ["training", "writing", "handbook", "approved"], "en", "pdf", 4300000, "sharepoint", "/sites/LearningCenter/Shared Documents/Training/Academic_Writing_Handbook_v2.0.pdf", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Training/Academic_Writing_Handbook_v2.0.pdf", ["learning-center", "research-portal"], ["LC-001", "RP-002"], "public"),
  doc("LC-005", "Learning Center Q1 Activity Report 2026", "Quarterly activity report with participation statistics, satisfaction scores, and program highlights.", "report", "quarterly", 2026, "2569", "1.0", "published", "owner-learning", "Learning Center", ["quarterly report", "activity", "participation", "satisfaction", "learning"], ["report", "quarterly", "published"], "th", "pdf", 1600000, "sharepoint", "/sites/LearningCenter/Shared Documents/Reports/LC_Q1_2026_Report.pdf", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Reports/LC_Q1_2026_Report.pdf", ["learning-center"], ["LC-002", "LC-001"], "internal"),
  doc("LC-006", "Online Learning Platform User Guide", "User guide for the MJU Learning Center's online learning platform and Moodle integration.", "guideline", "online", 2026, "2569", "1.0", "published", "owner-learning", "Learning Center", ["online learning", "Moodle", "user guide", "platform", "e-learning"], ["guideline", "online", "published"], "th", "pdf", 2200000, "sharepoint", "/sites/LearningCenter/Shared Documents/Guidelines/Online_Learning_Platform_Guide_v1.0.pdf", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Guidelines/Online_Learning_Platform_Guide_v1.0.pdf", ["learning-center", "mju-digital-transformation"], ["LC-001", "DT-003"], "public"),
  doc("LC-007", "Learning Center Course Registration Template", "Standard registration form and enrollment template for Learning Center courses and workshops.", "template", "registration", 2025, "2568", "1.2", "published", "owner-learning", "Learning Center", ["registration", "template", "enrollment", "course", "form"], ["template", "registration", "published"], "th", "xlsx", 450000, "sharepoint", "/sites/LearningCenter/Shared Documents/Templates/Course_Registration_Template_v1.2.xlsx", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Templates/Course_Registration_Template_v1.2.xlsx", ["learning-center"], ["LC-001"], "internal"),
  doc("LC-008", "Learning Center Strategic Plan 2026-2028", "Three-year strategic plan for Learning Center expansion, program development, and digital transformation.", "strategic-plan", "institutional", 2026, "2569", "1.0", "approved", "owner-learning", "Learning Center", ["strategic plan", "learning center", "expansion", "three-year", "development"], ["strategic", "plan", "approved"], "th", "pdf", 2700000, "sharepoint", "/sites/LearningCenter/Shared Documents/Plans/LC_Strategic_Plan_2026-2028.pdf", "https://mju365.sharepoint.com/sites/LearningCenter/Shared%20Documents/Plans/LC_Strategic_Plan_2026-2028.pdf", ["learning-center"], ["LC-001", "LC-002"], "internal"),

  // ── Research Portal (6) ──
  doc("RP-001", "MJU Research Publication Database Schema", "Database schema documentation for the MJU Research Portal publication tracking and management system.", "technical", "database", 2026, "2569", "1.0", "published", "owner-research", "Research Administration", ["research portal", "database", "schema", "publication", "technical"], ["research", "technical", "database", "published"], "en", "pdf", 1980000, "sharepoint", "/sites/ResearchOffice/Shared Documents/Portal/Publication_DB_Schema_v1.0.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/Portal/Publication_DB_Schema_v1.0.pdf", ["research-portal", "rae-landing"], ["RP-002", "RP-003"], "internal"),
  doc("RP-002", "Research Methodology Guidelines", "Guidelines for research methodology selection, study design, and data collection methods.", "guideline", "methodology", 2025, "2568", "1.1", "approved", "owner-research", "Research Administration", ["research methodology", "guidelines", "study design", "data collection", "methods"], ["research", "guideline", "methodology", "approved"], "en", "pdf", 3600000, "sharepoint", "/sites/ResearchOffice/Shared Documents/Research/Methodology_Guidelines_v1.1.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/Research/Methodology_Guidelines_v1.1.pdf", ["research-portal", "learning-center"], ["RP-001", "LC-004"], "public"),
  doc("RP-003", "MJU Research Publications 2025 Compilation", "Compiled volume of all MJU-affiliated research publications from the 2025 calendar year.", "research-output", "compilation", 2025, "2568", "1.0", "published", "owner-research", "Research Administration", ["research publications", "compilation", "MJU", "2025", "academic"], ["research", "publication", "compilation", "published"], "en", "pdf", 7800000, "sharepoint", "/sites/ResearchOffice/Shared Documents/Publications/MJU_Research_Publications_2025.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/Publications/MJU_Research_Publications_2025.pdf", ["research-portal", "rae-landing"], ["RP-001", "RAE-003"], "public"),
  doc("RP-004", "Research Ethics Approval Form", "Standard form for research ethics approval and institutional review board submissions.", "template", "ethics", 2025, "2568", "2.0", "published", "owner-research", "Research Administration", ["research ethics", "approval", "form", "IRB", "template"], ["research", "template", "ethics", "published"], "en", "docx", 680000, "sharepoint", "/sites/ResearchOffice/Shared Documents/Templates/Research_Ethics_Form_v2.0.docx", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/Templates/Research_Ethics_Form_v2.0.docx", ["research-portal"], ["RP-002"], "internal"),
  doc("RP-005", "Research Collaboration MOU Template", "Standard memorandum of understanding template for research collaborations and academic partnerships.", "contract", "mou", 2024, "2567", "1.0", "published", "owner-research", "Research Administration", ["MOU", "template", "collaboration", "research", "partnership"], ["contract", "mou", "template", "published"], "en", "docx", 520000, "sharepoint", "/sites/ResearchOffice/Shared Documents/Contracts/MOU_Template_v1.0.docx", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/Contracts/MOU_Template_v1.0.docx", ["research-portal", "international-collaboration"], ["RP-001", "IC-003"], "internal"),
  doc("RP-006", "Research Impact Assessment Report 2025", "Analysis of research impact metrics, citation counts, and knowledge transfer activities for 2025.", "report", "impact", 2026, "2569", "1.0", "draft", "owner-research", "Research Administration", ["research impact", "assessment", "metrics", "citations", "knowledge transfer"], ["research", "report", "impact", "draft"], "en", "pdf", 3100000, "sharepoint", "/sites/ResearchOffice/Shared Documents/Reports/Research_Impact_Report_2025.pdf", "https://mju365.sharepoint.com/sites/ResearchOffice/Shared%20Documents/Reports/Research_Impact_Report_2025.pdf", ["research-portal", "academic-quality-assurance"], ["RP-003", "AQ-004"], "public"),

  // ── Enterprise Shared Documents (8) ──
  doc("ESD-001", "University Administrative Policy Manual", "Comprehensive policy manual covering all university administrative procedures and regulations.", "policy", "administration", 2024, "2567", "4.0", "approved", "owner-admin", "Central Administration", ["policy", "manual", "administration", "university", "regulations"], ["policy", "manual", "approved"], "th", "pdf", 8500000, "sharepoint", "/sites/Admin/Shared Documents/Policies/Admin_Policy_Manual_v4.0.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Policies/Admin_Policy_Manual_v4.0.pdf", ["enterprise-shared-docs"], ["ESD-002", "ESD-003"], "public"),
  doc("ESD-002", "Procurement and Purchasing Guidelines", "Standard operating procedures for university procurement, vendor selection, and purchasing processes.", "guideline", "procurement", 2025, "2568", "2.0", "approved", "owner-finance", "Finance Division", ["procurement", "purchasing", "guidelines", "vendor", "finance"], ["guideline", "procurement", "approved"], "th", "pdf", 3400000, "sharepoint", "/sites/Admin/Shared Documents/Guidelines/Procurement_Guidelines_v2.0.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Guidelines/Procurement_Guidelines_v2.0.pdf", ["enterprise-shared-docs", "green-office-2026"], ["ESD-001", "ESD-004"], "public"),
  doc("ESD-003", "Staff Leave and Attendance Policy", "University policy on staff leave types, attendance tracking, and time-off procedures.", "policy", "hr", 2025, "2568", "1.1", "approved", "owner-admin", "Central Administration", ["leave", "attendance", "policy", "staff", "HR"], ["policy", "hr", "approved"], "th", "pdf", 1500000, "sharepoint", "/sites/Admin/Shared Documents/Policies/Staff_Leave_Policy_v1.1.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Policies/Staff_Leave_Policy_v1.1.pdf", ["enterprise-shared-docs"], ["ESD-001"], "public"),
  doc("ESD-004", "Annual Budget Allocation FY2569", "Detailed budget allocation document for the Thai fiscal year 2569 across all university units.", "budget", "annual", 2026, "2569", "1.0", "approved", "owner-finance", "Finance Division", ["budget", "allocation", "fiscal year", "2569", "finance"], ["budget", "annual", "approved"], "th", "xlsx", 2900000, "sharepoint", "/sites/Admin/Shared Documents/Budget/Budget_Allocation_FY2569.xlsx", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Budget/Budget_Allocation_FY2569.xlsx", ["enterprise-shared-docs"], ["ESD-002", "ESD-001"], "internal"),
  doc("ESD-005", "Data Privacy and Protection Policy", "University policy on data privacy, personal data protection, and compliance with Thailand PDPA.", "policy", "data", 2025, "2568", "1.0", "approved", "owner-legal", "Legal Affairs", ["data privacy", "PDPA", "policy", "compliance", "protection"], ["policy", "privacy", "approved", "compliance"], "en", "pdf", 2100000, "sharepoint", "/sites/Admin/Shared Documents/Policies/Data_Privacy_Policy_v1.0.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Policies/Data_Privacy_Policy_v1.0.pdf", ["enterprise-shared-docs", "mju-digital-transformation"], ["ESD-001", "DT-002", "DT-005"], "public"),
  doc("ESD-006", "University Organization Chart and Structure", "Official university organizational chart showing all faculties, departments, and administrative units.", "archive", "org", 2026, "2569", "1.0", "published", "owner-admin", "Central Administration", ["organization", "chart", "structure", "university", "departments"], ["archive", "org-chart", "published"], "th", "pdf", 1200000, "sharepoint", "/sites/Admin/Shared Documents/Admin/Org_Chart_2026.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Admin/Org_Chart_2026.pdf", ["enterprise-shared-docs"], ["ESD-001"], "public"),
  doc("ESD-007", "Internal Audit Report FY2568", "Annual internal audit findings, compliance assessment, and recommendations for fiscal year 2568.", "compliance", "audit", 2025, "2568", "1.0", "approved", "owner-qa", "Quality Assurance", ["audit", "internal", "compliance", "FY2568", "findings"], ["compliance", "audit", "approved"], "th", "pdf", 4500000, "sharepoint", "/sites/Admin/Shared Documents/Audit/Internal_Audit_FY2568.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Audit/Internal_Audit_FY2568.pdf", ["enterprise-shared-docs", "academic-quality-assurance"], ["ESD-001", "AQ-003"], "internal"),
  doc("ESD-008", "University Emergency Response Plan", "Emergency preparedness and response plan covering natural disasters, fires, and security incidents.", "policy", "safety", 2025, "2568", "2.0", "approved", "owner-admin", "Central Administration", ["emergency", "response", "safety", "disaster", "security"], ["policy", "safety", "emergency", "approved"], "th", "pdf", 3800000, "sharepoint", "/sites/Admin/Shared Documents/Policies/Emergency_Response_Plan_v2.0.pdf", "https://mju365.sharepoint.com/sites/Admin/Shared%20Documents/Policies/Emergency_Response_Plan_v2.0.pdf", ["enterprise-shared-docs", "smart-campus-initiative"], ["ESD-001", "SC-002"], "internal"),

  // ── MJU Digital Transformation (5) ──
  doc("DT-001", "MJU Digital Transformation Roadmap 2026-2028", "Strategic roadmap for digital transformation across all university operations, services, and systems.", "strategic-plan", "digital", 2026, "2569", "1.0", "approved", "owner-it", "IT Division", ["digital transformation", "roadmap", "strategy", "MJU", "modernization"], ["digital", "strategy", "roadmap", "approved"], "en", "pdf", 4200000, "sharepoint", "/sites/IT/Shared Documents/DT/DT_Roadmap_2026-2028.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/DT/DT_Roadmap_2026-2028.pdf", ["mju-digital-transformation"], ["DT-002", "DT-003"], "internal"),
  doc("DT-002", "Cloud Migration Strategy", "Strategy and implementation plan for migrating university on-premises services to cloud infrastructure.", "technical", "cloud", 2026, "2569", "1.0", "approved", "owner-it", "IT Division", ["cloud", "migration", "strategy", "infrastructure", "azure"], ["technical", "cloud", "strategy", "approved"], "en", "pdf", 3600000, "sharepoint", "/sites/IT/Shared Documents/DT/Cloud_Migration_Strategy_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/DT/Cloud_Migration_Strategy_v1.0.pdf", ["mju-digital-transformation", "it-infrastructure-modernization"], ["DT-001", "IT-002"], "internal"),
  doc("DT-003", "Digital Services Staff Training Program", "Training program for university staff on new digital tools, platforms, and transformed workflows.", "training", "digital", 2026, "2569", "1.0", "published", "owner-it", "IT Division", ["digital services", "training", "staff", "tools", "workflows"], ["training", "digital", "published"], "th", "pdf", 2800000, "sharepoint", "/sites/IT/Shared Documents/DT/Digital_Services_Training_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/DT/Digital_Services_Training_v1.0.pdf", ["mju-digital-transformation", "learning-center"], ["DT-001", "LC-006"], "public"),
  doc("DT-004", "IT Governance Framework", "Framework for IT governance, decision rights, accountability structure, and technology oversight.", "policy", "it", 2025, "2568", "1.0", "approved", "owner-it", "IT Division", ["IT governance", "framework", "policy", "decision rights", "accountability"], ["policy", "governance", "approved"], "en", "pdf", 1950000, "sharepoint", "/sites/IT/Shared Documents/Policies/IT_Governance_Framework_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/Policies/IT_Governance_Framework_v1.0.pdf", ["mju-digital-transformation", "enterprise-shared-docs"], ["DT-001", "ESD-001"], "internal"),
  doc("DT-005", "Digital Transformation Progress Report Q1 2026", "Quarterly progress update on digital transformation initiatives, milestones, and key metrics.", "report", "progress", 2026, "2569", "1.0", "published", "owner-it", "IT Division", ["digital transformation", "progress", "Q1", "milestones", "report"], ["report", "progress", "published"], "en", "pdf", 2300000, "sharepoint", "/sites/IT/Shared Documents/DT/DT_Progress_Q1_2026.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/DT/DT_Progress_Q1_2026.pdf", ["mju-digital-transformation", "smart-campus-initiative"], ["DT-001", "SC-001"], "public"),

  // ── Smart Campus Initiative (5) ──
  doc("SC-001", "Smart Campus IoT Infrastructure Plan", "Technical plan for IoT sensor deployment, network architecture, and campus data collection infrastructure.", "technical", "iot", 2026, "2569", "1.0", "approved", "owner-it", "IT Division", ["smart campus", "IoT", "infrastructure", "sensors", "network"], ["technical", "iot", "plan", "approved"], "en", "pdf", 5100000, "sharepoint", "/sites/IT/Shared Documents/SmartCampus/IoT_Infrastructure_Plan_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/SmartCampus/IoT_Infrastructure_Plan_v1.0.pdf", ["smart-campus-initiative", "mju-digital-transformation"], ["SC-002", "DT-002"], "internal"),
  doc("SC-002", "Smart Campus Security System Proposal", "Comprehensive proposal for integrated security systems including CCTV, access control, and emergency notification.", "technical", "security", 2025, "2568", "1.2", "approved", "owner-it", "IT Division", ["smart campus", "security", "CCTV", "access control", "emergency"], ["technical", "security", "proposal", "approved"], "th", "pdf", 4800000, "sharepoint", "/sites/IT/Shared Documents/SmartCampus/Security_System_Proposal_v1.2.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/SmartCampus/Security_System_Proposal_v1.2.pdf", ["smart-campus-initiative", "enterprise-shared-docs"], ["SC-001", "ESD-008"], "internal"),
  doc("SC-003", "Smart Classroom Technology Standards", "Technical standards and specifications for smart classroom equipment, AV systems, and hybrid teaching.", "technical", "classroom", 2025, "2568", "1.0", "published", "owner-it", "IT Division", ["smart classroom", "AV", "technology", "standards", "equipment"], ["technical", "classroom", "standards", "published"], "en", "pdf", 3200000, "sharepoint", "/sites/IT/Shared Documents/SmartCampus/Smart_Classroom_Standards_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/SmartCampus/Smart_Classroom_Standards_v1.0.pdf", ["smart-campus-initiative", "learning-center"], ["SC-001", "LC-001"], "public"),
  doc("SC-004", "Smart Campus Budget and Resource Plan", "Budget allocation and resource planning document for smart campus infrastructure projects.", "budget", "infrastructure", 2026, "2569", "1.0", "approved", "owner-it", "IT Division", ["budget", "smart campus", "infrastructure", "resources", "allocation"], ["budget", "smart-campus", "approved"], "th", "xlsx", 1100000, "sharepoint", "/sites/IT/Shared Documents/SmartCampus/Budget_Plan_v1.0.xlsx", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/SmartCampus/Budget_Plan_v1.0.xlsx", ["smart-campus-initiative"], ["SC-001", "ESD-004"], "internal"),
  doc("SC-005", "Smart Campus Energy Monitoring Report", "Energy consumption data analysis from smart meters and IoT sensors deployed across campus buildings.", "data", "energy", 2026, "2569", "1.0", "published", "owner-it", "IT Division", ["energy", "monitoring", "smart meters", "IoT", "data"], ["data", "energy", "monitoring", "published"], "en", "xlsx", 5200000, "sharepoint", "/sites/IT/Shared Documents/SmartCampus/Energy_Monitoring_Report_2026.xlsx", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/SmartCampus/Energy_Monitoring_Report_2026.xlsx", ["smart-campus-initiative", "green-office-2026"], ["SC-001", "GO2026-004", "GO2026-009"], "public"),

  // ── Academic Quality Assurance (5) ──
  doc("AQ-001", "Internal Quality Assurance Manual", "Comprehensive manual for internal quality assurance processes, self-assessment, and program evaluation.", "assessment", "qa", 2025, "2568", "3.0", "approved", "owner-qa", "Quality Assurance", ["quality assurance", "manual", "self-assessment", "evaluation", "internal"], ["qa", "manual", "assessment", "approved"], "th", "pdf", 6200000, "sharepoint", "/sites/QA/Shared Documents/Manuals/IQA_Manual_v3.0.pdf", "https://mju365.sharepoint.com/sites/QA/Shared%20Documents/Manuals/IQA_Manual_v3.0.pdf", ["academic-quality-assurance"], ["AQ-002", "AQ-003", "ESD-001"], "public"),
  doc("AQ-002", "Program Self-Assessment Report 2025", "Annual self-assessment reports for all academic programs with improvement action plans.", "report", "self-assessment", 2025, "2568", "1.0", "published", "owner-qa", "Quality Assurance", ["self-assessment", "program", "academic", "quality", "2025"], ["qa", "self-assessment", "report", "published"], "th", "pdf", 7500000, "sharepoint", "/sites/QA/Shared Documents/Reports/Self_Assessment_Report_2025.pdf", "https://mju365.sharepoint.com/sites/QA/Shared%20Documents/Reports/Self_Assessment_Report_2025.pdf", ["academic-quality-assurance", "rae-landing"], ["AQ-001", "RAE-003", "RAE-006"], "internal"),
  doc("AQ-003", "External Audit Preparation Checklist", "Checklist and preparation guide for the upcoming external quality assurance audit.", "assessment", "audit", 2026, "2569", "1.0", "published", "owner-qa", "Quality Assurance", ["external audit", "checklist", "preparation", "quality", "compliance"], ["qa", "audit", "checklist", "published"], "en", "xlsx", 890000, "sharepoint", "/sites/QA/Shared Documents/Audit/External_Audit_Checklist_v1.0.xlsx", "https://mju365.sharepoint.com/sites/QA/Shared%20Documents/Audit/External_Audit_Checklist_v1.0.xlsx", ["academic-quality-assurance"], ["AQ-001", "AQ-002", "ESD-007"], "internal"),
  doc("AQ-004", "Graduate Outcome Assessment Report 2025", "Assessment of graduate employment outcomes, satisfaction levels, and program effectiveness.", "report", "graduate", 2025, "2568", "1.0", "published", "owner-qa", "Quality Assurance", ["graduate", "outcome", "assessment", "employment", "satisfaction"], ["qa", "graduate", "assessment", "published"], "th", "pdf", 4100000, "sharepoint", "/sites/QA/Shared Documents/Reports/Graduate_Outcomes_2025.pdf", "https://mju365.sharepoint.com/sites/QA/Shared%20Documents/Reports/Graduate_Outcomes_2025.pdf", ["academic-quality-assurance", "research-portal", "student-development-program"], ["AQ-001", "RP-006", "SD-005"], "public"),
  doc("AQ-005", "Quality Assurance Training Materials v2.0", "Training materials for QA committee members and program coordinators on assessment procedures.", "training", "qa", 2025, "2568", "2.0", "published", "owner-qa", "Quality Assurance", ["QA training", "assessment", "committee", "coordinators", "procedures"], ["qa", "training", "published"], "th", "pdf", 5400000, "sharepoint", "/sites/QA/Shared Documents/Training/QA_Training_Materials_v2.0.pdf", "https://mju365.sharepoint.com/sites/QA/Shared%20Documents/Training/QA_Training_Materials_v2.0.pdf", ["academic-quality-assurance", "learning-center"], ["AQ-001", "LC-003"], "internal"),

  // ── International Collaboration (5) ──
  doc("IC-001", "International Partnership Agreement MOU", "Master MOU template and agreement framework for international university partnerships and exchanges.", "contract", "mou", 2025, "2568", "1.0", "approved", "owner-international", "International Affairs", ["MOU", "international", "partnership", "agreement", "template"], ["contract", "international", "mou", "approved"], "en", "pdf", 2500000, "sharepoint", "/sites/International/Shared Documents/Agreements/Partnership_MOU_Framework_v1.0.pdf", "https://mju365.sharepoint.com/sites/International/Shared%20Documents/Agreements/Partnership_MOU_Framework_v1.0.pdf", ["international-collaboration", "research-portal"], ["IC-002", "IC-003", "RP-005"], "public"),
  doc("IC-002", "International Exchange Program Report 2025", "Annual report on student and faculty exchange activities, partnerships, and outcomes.", "report", "exchange", 2025, "2568", "1.0", "published", "owner-international", "International Affairs", ["exchange", "international", "student", "faculty", "report"], ["international", "report", "exchange", "published"], "en", "pdf", 3600000, "sharepoint", "/sites/International/Shared Documents/Reports/Exchange_Program_Report_2025.pdf", "https://mju365.sharepoint.com/sites/International/Shared%20Documents/Reports/Exchange_Program_Report_2025.pdf", ["international-collaboration", "student-development-program"], ["IC-001", "SD-004"], "public"),
  doc("IC-003", "Collaborative Research Agreement Guidelines", "Guidelines for establishing and managing collaborative research projects with international partners.", "guideline", "collaboration", 2025, "2568", "1.0", "published", "owner-international", "International Affairs", ["collaborative research", "international", "guidelines", "partnership", "agreement"], ["international", "guideline", "research", "published"], "en", "pdf", 1800000, "sharepoint", "/sites/International/Shared Documents/Guidelines/Collaborative_Research_Guidelines_v1.0.pdf", "https://mju365.sharepoint.com/sites/International/Shared%20Documents/Guidelines/Collaborative_Research_Guidelines_v1.0.pdf", ["international-collaboration", "research-portal"], ["IC-001", "RP-002"], "public"),
  doc("IC-004", "International Conference Participation Policy", "Policy governing faculty and staff participation in international conferences and professional events.", "policy", "international", 2024, "2567", "1.0", "approved", "owner-international", "International Affairs", ["conference", "international", "policy", "faculty", "participation"], ["policy", "international", "approved"], "en", "pdf", 1400000, "sharepoint", "/sites/International/Shared Documents/Policies/Conference_Participation_Policy_v1.0.pdf", "https://mju365.sharepoint.com/sites/International/Shared%20Documents/Policies/Conference_Participation_Policy_v1.0.pdf", ["international-collaboration"], ["IC-001", "ESD-001"], "internal"),
  doc("IC-005", "International Student Orientation Guide", "Comprehensive guide for incoming international students covering visa, accommodation, and campus life.", "guideline", "orientation", 2026, "2569", "1.0", "published", "owner-international", "International Affairs", ["international student", "orientation", "guide", "visa", "campus"], ["international", "guide", "orientation", "published"], "en", "pdf", 4700000, "sharepoint", "/sites/International/Shared Documents/Guides/International_Student_Guide_v1.0.pdf", "https://mju365.sharepoint.com/sites/International/Shared%20Documents/Guides/International_Student_Guide_v1.0.pdf", ["international-collaboration", "learning-center"], ["IC-001", "LC-001"], "public"),

  // ── Student Development Program (5) ──
  doc("SD-001", "Student Leadership Development Program", "Comprehensive curriculum and materials for the student leadership development workshop series.", "training", "leadership", 2026, "2569", "1.0", "published", "owner-student", "Student Development", ["leadership", "student", "development", "workshop", "curriculum"], ["student", "leadership", "training", "published"], "th", "pdf", 4100000, "sharepoint", "/sites/StudentDev/Shared Documents/Training/Leadership_Program_v1.0.pdf", "https://mju365.sharepoint.com/sites/StudentDev/Shared%20Documents/Training/Leadership_Program_v1.0.pdf", ["student-development-program"], ["SD-002", "SD-003"], "public"),
  doc("SD-002", "Career Preparation Workshop Materials", "Workshop materials for resume writing, interview skills, career planning, and job search strategies.", "training", "career", 2026, "2569", "1.0", "published", "owner-student", "Student Development", ["career", "preparation", "workshop", "resume", "interview"], ["student", "career", "training", "published"], "th", "pdf", 3600000, "sharepoint", "/sites/StudentDev/Shared Documents/Training/Career_Preparation_v1.0.pdf", "https://mju365.sharepoint.com/sites/StudentDev/Shared%20Documents/Training/Career_Preparation_v1.0.pdf", ["student-development-program", "learning-center"], ["SD-001", "LC-003"], "public"),
  doc("SD-003", "Student Activities and Clubs Catalog 2026", "Comprehensive catalog of student clubs, organizations, and extracurricular activities for 2026.", "catalog", "activities", 2026, "2569", "1.0", "published", "owner-student", "Student Development", ["student activities", "clubs", "organizations", "extracurricular", "catalog"], ["student", "catalog", "activities", "published"], "th", "pdf", 3100000, "sharepoint", "/sites/StudentDev/Shared Documents/Catalog/Student_Activities_Catalog_2026.pdf", "https://mju365.sharepoint.com/sites/StudentDev/Shared%20Documents/Catalog/Student_Activities_Catalog_2026.pdf", ["student-development-program"], ["SD-001", "SD-004"], "public"),
  doc("SD-004", "Student Volunteer Program Report 2025", "Report on student volunteer activities, community service hours, and program impact assessment.", "report", "volunteer", 2025, "2568", "1.0", "published", "owner-student", "Student Development", ["volunteer", "student", "community service", "report", "impact"], ["student", "volunteer", "report", "published"], "th", "pdf", 2700000, "sharepoint", "/sites/StudentDev/Shared Documents/Reports/Volunteer_Program_Report_2025.pdf", "https://mju365.sharepoint.com/sites/StudentDev/Shared%20Documents/Reports/Volunteer_Program_Report_2025.pdf", ["student-development-program", "community-engagement"], ["SD-003", "CE-004"], "public"),
  doc("SD-005", "Student Satisfaction Survey Results 2025", "Analysis of student satisfaction survey data covering university services, facilities, and learning experience.", "data", "survey", 2025, "2568", "1.0", "published", "owner-student", "Student Development", ["student satisfaction", "survey", "data", "analysis", "services"], ["student", "data", "survey", "published"], "th", "xlsx", 2400000, "sharepoint", "/sites/StudentDev/Shared Documents/Data/Student_Satisfaction_Survey_2025.xlsx", "https://mju365.sharepoint.com/sites/StudentDev/Shared%20Documents/Data/Student_Satisfaction_Survey_2025.xlsx", ["student-development-program", "academic-quality-assurance"], ["SD-001", "AQ-004"], "internal"),

  // ── Community Engagement (5) ──
  doc("CE-001", "Community Outreach Program Framework", "Framework for university community outreach programs, engagement models, and impact measurement.", "strategic-plan", "community", 2025, "2568", "1.0", "approved", "owner-community", "Community Engagement", ["community", "outreach", "engagement", "framework", "impact"], ["community", "strategy", "framework", "approved"], "th", "pdf", 2900000, "sharepoint", "/sites/Community/Shared Documents/Plans/Outreach_Framework_v1.0.pdf", "https://mju365.sharepoint.com/sites/Community/Shared%20Documents/Plans/Outreach_Framework_v1.0.pdf", ["community-engagement"], ["CE-002", "CE-003"], "public"),
  doc("CE-002", "Knowledge Transfer to Community Report 2025", "Report on knowledge transfer activities, training delivered to communities, and technology adoption.", "report", "knowledge-transfer", 2025, "2568", "1.0", "published", "owner-community", "Community Engagement", ["knowledge transfer", "community", "training", "technology", "report"], ["community", "report", "knowledge-transfer", "published"], "th", "pdf", 3400000, "sharepoint", "/sites/Community/Shared Documents/Reports/Knowledge_Transfer_Report_2025.pdf", "https://mju365.sharepoint.com/sites/Community/Shared%20Documents/Reports/Knowledge_Transfer_Report_2025.pdf", ["community-engagement", "research-portal"], ["CE-001", "RP-003"], "public"),
  doc("CE-003", "Community Needs Assessment Survey", "Survey instrument design and results analysis from community needs assessment for program planning.", "assessment", "needs", 2025, "2568", "1.0", "published", "owner-community", "Community Engagement", ["needs assessment", "community", "survey", "planning", "data"], ["community", "assessment", "survey", "published"], "th", "pdf", 2100000, "sharepoint", "/sites/Community/Shared Documents/Assessments/Community_Needs_Assessment_2025.pdf", "https://mju365.sharepoint.com/sites/Community/Shared%20Documents/Assessments/Community_Needs_Assessment_2025.pdf", ["community-engagement"], ["CE-001", "CE-002"], "internal"),
  doc("CE-004", "Community Engagement Newsletter Q1 2026", "Quarterly newsletter highlighting community engagement activities, success stories, and upcoming events.", "communication", "newsletter", 2026, "2569", "1.0", "published", "owner-community", "Community Engagement", ["newsletter", "community", "engagement", "success stories", "activities"], ["community", "newsletter", "published"], "th", "pdf", 950000, "sharepoint", "/sites/Community/Shared Documents/Communications/CE_Newsletter_Q1_2026.pdf", "https://mju365.sharepoint.com/sites/Community/Shared%20Documents/Communications/CE_Newsletter_Q1_2026.pdf", ["community-engagement", "student-development-program"], ["CE-001", "SD-004"], "public"),
  doc("CE-005", "University Social Responsibility Report 2025", "University social responsibility report covering community impact, sustainability, and ethical initiatives.", "report", "social-responsibility", 2025, "2568", "1.0", "published", "owner-community", "Community Engagement", ["social responsibility", "USR", "community", "sustainability", "impact"], ["community", "USR", "report", "published"], "th", "pdf", 3900000, "sharepoint", "/sites/Community/Shared Documents/Reports/USR_Report_2025.pdf", "https://mju365.sharepoint.com/sites/Community/Shared%20Documents/Reports/USR_Report_2025.pdf", ["community-engagement", "green-office-2026"], ["CE-001", "GO2026-009"], "public"),

  // ── IT Infrastructure Modernization (4) ──
  doc("IT-001", "Network Infrastructure Upgrade Plan", "Technical plan for upgrading campus network infrastructure, bandwidth expansion, and wireless coverage.", "technical", "network", 2026, "2569", "1.0", "draft", "owner-it", "IT Division", ["network", "infrastructure", "upgrade", "bandwidth", "wireless"], ["technical", "network", "plan", "draft"], "en", "pdf", 4500000, "sharepoint", "/sites/IT/Shared Documents/Infrastructure/Network_Upgrade_Plan_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/Infrastructure/Network_Upgrade_Plan_v1.0.pdf", ["it-infrastructure-modernization", "mju-digital-transformation"], ["IT-002", "DT-002"], "internal"),
  doc("IT-002", "Data Center Consolidation Strategy", "Strategy for consolidating and modernizing university data center operations and server infrastructure.", "technical", "datacenter", 2026, "2569", "1.0", "draft", "owner-it", "IT Division", ["data center", "consolidation", "strategy", "modernization", "infrastructure"], ["technical", "datacenter", "strategy", "draft"], "en", "pdf", 3800000, "sharepoint", "/sites/IT/Shared Documents/Infrastructure/DataCenter_Consolidation_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/Infrastructure/DataCenter_Consolidation_v1.0.pdf", ["it-infrastructure-modernization", "smart-campus-initiative"], ["IT-001", "SC-001"], "internal"),
  doc("IT-003", "IT Procurement Budget FY2569", "IT equipment, software, and services budget proposal and resource allocation for fiscal year 2569.", "budget", "it", 2026, "2569", "1.0", "draft", "owner-it", "IT Division", ["IT budget", "procurement", "equipment", "services", "FY2569"], ["budget", "it", "draft"], "th", "xlsx", 980000, "sharepoint", "/sites/IT/Shared Documents/Budget/IT_Procurement_Budget_FY2569.xlsx", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/Budget/IT_Procurement_Budget_FY2569.xlsx", ["it-infrastructure-modernization"], ["IT-001", "ESD-004"], "internal"),
  doc("IT-004", "IT Service Continuity and Disaster Recovery Plan", "Disaster recovery and business continuity plan for critical IT services and infrastructure.", "policy", "continuity", 2025, "2568", "1.0", "approved", "owner-it", "IT Division", ["IT service", "continuity", "disaster recovery", "business continuity", "policy"], ["policy", "continuity", "approved"], "en", "pdf", 2600000, "sharepoint", "/sites/IT/Shared Documents/Policies/IT_Continuity_Plan_v1.0.pdf", "https://mju365.sharepoint.com/sites/IT/Shared%20Documents/Policies/IT_Continuity_Plan_v1.0.pdf", ["it-infrastructure-modernization", "enterprise-shared-docs"], ["IT-001", "ESD-008"], "internal"),
];

// ──────────── RELATIONSHIPS (200+) ────────────
const relationships = [];
let relCounter = 0;

function rel(src, tgt, type, desc) {
  relCounter++;
  relationships.push({
    id: `REL-${String(relCounter).padStart(4, "0")}`,
    source_id: src, target_id: tgt,
    relationship_type: type, description: desc || "",
    created_at: now,
  });
}

// Green Office relationships (19)
rel("GO2026-001", "GO2026-002", "related-to", "Initiative plan references waste management guidelines");
rel("GO2026-001", "GO2026-003", "related-to", "Initiative plan referenced in quarterly report");
rel("GO2026-001", "GO2026-004", "derived-from", "Energy plan derived from initiative strategy");
rel("GO2026-001", "GO2026-005", "derived-from", "Water plan derived from initiative strategy");
rel("GO2026-001", "GO2026-006", "related-to", "Green procurement aligns with initiative goals");
rel("GO2026-001", "GO2026-007", "related-to", "Training supports initiative implementation");
rel("GO2026-003", "GO2026-008", "superseded-by", "Q2 report contains more recent data than Q1");
rel("GO2026-004", "SC-005", "references", "Energy monitoring data from smart campus");
rel("GO2026-006", "ESD-002", "references", "Aligns with university procurement guidelines");
rel("GO2026-007", "LC-003", "related-to", "Sustainability training complements digital literacy");
rel("GO2026-009", "SC-005", "references", "Energy data shared with smart campus monitoring");
rel("GO2026-010", "CE-004", "related-to", "Joint newsletter content sharing across projects");

// RAE relationships (13)
rel("RAE-001", "RAE-002", "related-to", "Guide references evidence submission template");
rel("RAE-001", "RAE-003", "related-to", "Assessment guide informs annual RAE reporting");
rel("RAE-001", "RAE-004", "related-to", "Guide references research classification standards");
rel("RAE-001", "RAE-005", "references", "Guide instructs use of faculty profile template");
rel("RAE-001", "RAE-006", "references", "Guide based on published RAE criteria standards");
rel("RAE-001", "RAE-007", "related-to", "Guide referenced in evidence review checklist");
rel("RAE-001", "RAE-008", "related-to", "Guide discussed in steering committee meeting");
rel("RAE-002", "RAE-005", "related-to", "Both are standardized RAE templates");
rel("RAE-002", "RAE-007", "related-to", "Submission template linked to review checklist");
rel("RAE-003", "RAE-008", "related-to", "Annual report informed by committee meetings");
rel("RAE-003", "AQ-002", "related-to", "RAE report aligns with QA self-assessment data");
rel("RAE-004", "RAE-006", "references", "Classification standards based on RAE criteria");
rel("RAE-006", "AQ-001", "references", "RAE criteria align with IQA manual standards");

// Learning Center relationships (14)
rel("LC-001", "LC-002", "related-to", "Catalog data informs annual report enrollment statistics");
rel("LC-001", "LC-003", "related-to", "Digital literacy workshop listed in course catalog");
rel("LC-001", "LC-004", "related-to", "Writing skills course offered through catalog");
rel("LC-001", "LC-005", "related-to", "Catalog participation data in Q1 activity report");
rel("LC-001", "LC-006", "related-to", "Online platform user guide helps access catalog courses");
rel("LC-001", "LC-007", "references", "Registration template used for catalog course enrollment");
rel("LC-001", "LC-008", "related-to", "Catalog expansion part of strategic plan");
rel("LC-003", "LC-004", "related-to", "Digital literacy and academic writing programs complement");
rel("LC-003", "SD-002", "related-to", "Digital literacy skills support career preparation");
rel("LC-004", "RP-002", "references", "Writing handbook references research methodology guidelines");
rel("LC-006", "DT-003", "related-to", "Online learning platform part of digital transformation");
rel("LC-007", "LC-001", "references", "Registration form used for catalog course enrollment");
rel("LC-008", "LC-002", "related-to", "Strategic plan defines targets for annual performance");
rel("LC-005", "LC-002", "related-to", "Q1 contributes to annual performance metrics");

// Research Portal relationships (11)
rel("RP-001", "RP-002", "related-to", "Database schema supports methodology documentation");
rel("RP-001", "RP-003", "related-to", "Database stores publication records and metadata");
rel("RP-001", "RP-004", "related-to", "System tracks ethics approvals and submissions");
rel("RP-001", "RP-005", "related-to", "MOU data managed through portal database");
rel("RP-001", "RP-006", "related-to", "Impact assessment data sourced from portal database");
rel("RP-002", "LC-004", "references", "Methodology guidelines inform academic writing handbook");
rel("RP-003", "RAE-003", "references", "Publications compilation contributes to RAE annual report");
rel("RP-003", "RP-006", "derived-from", "Impact assessment derived from publication data");
rel("RP-004", "RP-002", "references", "Ethics review references methodology guidelines");
rel("RP-005", "IC-001", "related-to", "Research MOU template aligns with international MOU framework");
rel("RP-006", "AQ-004", "references", "Impact assessment informs graduate outcome metrics");

// Enterprise Shared Documents relationships (14)
rel("ESD-001", "ESD-002", "related-to", "Policy manual references procurement guidelines");
rel("ESD-001", "ESD-003", "related-to", "Policy manual includes HR and leave policies");
rel("ESD-001", "ESD-004", "references", "Budget allocation follows policy framework");
rel("ESD-001", "ESD-005", "related-to", "Data privacy policy part of admin framework");
rel("ESD-001", "ESD-006", "related-to", "Org chart reflects administrative structure");
rel("ESD-001", "ESD-007", "related-to", "Audit assesses policy compliance");
rel("ESD-001", "ESD-008", "related-to", "Emergency plan aligned with policy framework");
rel("ESD-002", "ESD-004", "references", "Procurement guidelines inform budget spending");
rel("ESD-005", "DT-002", "references", "Data privacy critical for cloud migration strategy");
rel("ESD-005", "DT-005", "references", "Digital transformation must comply with data protection");
rel("ESD-007", "AQ-001", "references", "Internal audit findings inform QA improvements");
rel("ESD-008", "SC-002", "related-to", "Emergency response integrates with security systems");
rel("ESD-003", "ESD-001", "derived-from", "HR policy derived from administrative manual");
rel("ESD-007", "ESD-001", "references", "Audit assesses compliance with policy manual");

// Digital Transformation relationships (10)
rel("DT-001", "DT-002", "related-to", "Roadmap includes cloud migration milestone");
rel("DT-001", "DT-003", "related-to", "Roadmap mandates staff digital skills training");
rel("DT-001", "DT-004", "related-to", "IT governance framework supports roadmap execution");
rel("DT-001", "DT-005", "related-to", "Progress report tracks roadmap milestones");
rel("DT-001", "SC-001", "references", "Smart campus IoT development part of digital roadmap");
rel("DT-002", "IT-002", "related-to", "Cloud migration aligns with data center modernization");
rel("DT-003", "LC-006", "related-to", "Digital skills training complements online learning platform");
rel("DT-004", "ESD-001", "references", "IT governance aligns with university policy framework");
rel("DT-005", "SC-004", "related-to", "DT progress tracking related to smart campus investments");
rel("DT-002", "ESD-005", "references", "Cloud strategy must address data privacy compliance");

// Smart Campus relationships (9)
rel("SC-001", "SC-002", "related-to", "IoT network infrastructure supports security systems");
rel("SC-001", "SC-003", "related-to", "IoT connectivity enables smart classroom features");
rel("SC-001", "SC-004", "references", "IoT deployment costs documented in budget plan");
rel("SC-001", "SC-005", "related-to", "Smart meters are part of IoT sensor network");
rel("SC-002", "ESD-008", "references", "Security systems integrate with emergency response plan");
rel("SC-003", "LC-001", "references", "Smart classrooms used for Learning Center course delivery");
rel("SC-004", "ESD-004", "references", "Smart campus budget part of university budget allocation");
rel("SC-005", "GO2026-004", "references", "Energy monitoring supports Green Office conservation targets");
rel("SC-001", "DT-002", "references", "IoT sensor data may be processed through cloud platform");

// Academic Quality Assurance relationships (9)
rel("AQ-001", "AQ-002", "related-to", "Manual provides framework for self-assessment");
rel("AQ-001", "AQ-003", "related-to", "Manual referenced in external audit preparation");
rel("AQ-001", "AQ-004", "related-to", "Manual defines graduate outcome assessment methodology");
rel("AQ-001", "AQ-005", "related-to", "Training materials based on manual content");
rel("AQ-002", "AQ-004", "related-to", "Self-assessment data includes graduate outcome metrics");
rel("AQ-003", "ESD-007", "references", "External audit builds on internal audit findings");
rel("AQ-004", "SD-005", "references", "Graduate outcomes correlated with student satisfaction data");
rel("AQ-005", "LC-003", "related-to", "QA training delivery parallels digital literacy training model");
rel("AQ-003", "AQ-001", "derived-from", "Audit checklist derived from IQA manual standards");

// International Collaboration relationships (9)
rel("IC-001", "IC-002", "related-to", "MOU framework enables formal exchange programs");
rel("IC-001", "IC-003", "related-to", "MOU framework supports collaborative research agreements");
rel("IC-001", "IC-004", "related-to", "Conference policy aligns with international partnership strategy");
rel("IC-001", "IC-005", "related-to", "Student exchange provisions in MOU framework");
rel("IC-002", "SD-004", "references", "Exchange programs include community volunteer activities");
rel("IC-003", "RP-005", "references", "Collaborative research uses standardized MOU template");
rel("IC-004", "ESD-001", "references", "Conference policy aligned with university administrative policy");
rel("IC-005", "LC-001", "related-to", "International students access Learning Center course catalog");
rel("IC-003", "RP-002", "references", "International research follows methodology guidelines");

// Student Development relationships (7)
rel("SD-001", "SD-002", "related-to", "Leadership program incorporates career preparation skills");
rel("SD-001", "SD-003", "related-to", "Leadership activities listed in student activities catalog");
rel("SD-002", "LC-003", "references", "Career preparation builds on digital literacy foundations");
rel("SD-003", "SD-004", "related-to", "Volunteer programs promoted through activities catalog");
rel("SD-004", "CE-002", "references", "Student volunteer hours contribute to knowledge transfer");
rel("SD-005", "AQ-004", "references", "Student satisfaction data used in graduate outcome analysis");
rel("SD-004", "CE-004", "related-to", "Student volunteer stories featured in community newsletter");

// Community Engagement relationships (7)
rel("CE-001", "CE-002", "related-to", "Framework provides structure for knowledge transfer programs");
rel("CE-001", "CE-003", "related-to", "Needs assessment informs outreach framework priorities");
rel("CE-001", "CE-004", "related-to", "Outreach activities communicated through newsletter");
rel("CE-001", "CE-005", "related-to", "Framework supports university social responsibility reporting");
rel("CE-002", "RP-003", "references", "Knowledge transfer includes sharing research publications");
rel("CE-003", "CE-002", "derived-from", "Needs assessment findings guide knowledge transfer priorities");
rel("CE-005", "GO2026-009", "references", "Carbon footprint data informs USR environmental reporting");

// IT Infrastructure Modernization relationships (6)
rel("IT-001", "IT-002", "related-to", "Network upgrade and data center consolidation are linked");
rel("IT-001", "IT-003", "references", "Network upgrade budget part of IT procurement");
rel("IT-001", "IT-004", "related-to", "Continuity plan covers network infrastructure");
rel("IT-002", "DT-002", "related-to", "Data center consolidation supports cloud migration strategy");
rel("IT-003", "ESD-004", "references", "IT procurement budget part of university budget allocation");
rel("IT-004", "ESD-008", "references", "IT continuity plan supports university emergency response");

// Inter-project relationships (40)
rel("GO2026-001", "ESD-001", "references", "Initiative follows university policy framework");
rel("GO2026-003", "AQ-004", "references", "Sustainability education metrics inform graduate outcomes");
rel("GO2026-004", "SC-001", "references", "Energy monitoring requires IoT infrastructure");
rel("RAE-001", "AQ-001", "references", "RAE assessment guide aligned with QA standards");
rel("RAE-003", "AQ-002", "related-to", "RAE and QA reporting cycles overlap");
rel("RAE-006", "AQ-001", "references", "RAE criteria mapped to IQA manual requirements");
rel("LC-003", "DT-003", "related-to", "Digital literacy training aligns with DT staff training");
rel("LC-004", "RP-002", "references", "Academic writing handbook follows research methodology");
rel("LC-006", "DT-003", "related-to", "Online learning platform part of digital transformation");
rel("RP-003", "IC-002", "references", "Research publications include international collaborations");
rel("SC-005", "GO2026-009", "references", "Building energy data used in carbon footprint analysis");
rel("DT-002", "IT-002", "related-to", "Cloud and data center modernization strategies aligned");
rel("AQ-002", "RAE-003", "related-to", "QA self-assessment and RAE annual report share metrics");
rel("SD-005", "AQ-004", "related-to", "Student survey results inform graduate outcome analysis");
rel("CE-002", "SD-004", "related-to", "Knowledge transfer programs utilize student volunteers");
rel("ESD-005", "DT-001", "references", "Data privacy compliance is critical for digital transformation");
rel("ESD-008", "SC-002", "references", "Emergency plan integrates with smart security systems");
rel("SC-003", "LC-006", "references", "Smart classrooms utilize online learning platform");
rel("DT-005", "SC-004", "related-to", "DT and Smart Campus budgets require coordination");
rel("GO2026-006", "ESD-002", "references", "Green procurement follows university purchasing guidelines");
rel("CE-005", "GO2026-009", "references", "USR reporting includes carbon footprint data");
rel("AQ-004", "SD-005", "references", "Graduate outcome metrics correlated with student satisfaction");
rel("IC-001", "RP-005", "related-to", "International MOUs and research MOUs share template");
rel("IC-003", "RP-002", "references", "International collaboration uses methodology guidelines");
rel("GO2026-007", "LC-003", "related-to", "Sustainability awareness and digital literacy share audience");
rel("GO2026-010", "CE-004", "related-to", "Joint newsletter distribution across sustainability and community");
rel("LC-005", "AQ-002", "related-to", "Learning Center activities contribute to QA metrics");
rel("RP-006", "AQ-004", "references", "Research impact data informs graduate quality assessment");
rel("ESD-007", "AQ-003", "related-to", "Internal and external audit processes are linked");
rel("DT-003", "SD-002", "related-to", "Digital skills training supports career readiness");
rel("SC-005", "GO2026-004", "references", "Energy monitoring enables conservation tracking");
rel("AQ-001", "ESD-001", "references", "IQA manual references university policy framework");
rel("AQ-002", "RAE-006", "references", "Self-assessment uses RAE criteria as benchmark");
rel("LC-003", "SD-001", "related-to", "Digital literacy and leadership programs share student audience");
rel("RP-005", "IC-001", "related-to", "Research MOU and international MOU frameworks complement");
rel("CE-003", "SD-005", "references", "Community needs survey methodology used in student survey");
rel("GO2026-004", "SC-001", "references", "Conservation monitoring requires IoT sensors");
rel("ESD-005", "DT-002", "references", "PDPA requirements in cloud migration planning");
rel("AQ-005", "LC-003", "related-to", "QA training and digital literacy both staff development");
rel("SC-004", "IT-003", "related-to", "Smart campus and IT budgets require coordination");

// Intra-project automatic relationships to fill to 200+
for (let i = 0; i < docs.length; i++) {
  for (let j = i + 1; j < docs.length; j++) {
    if (relationships.length >= 250) break;
    const shared = docs[i].project_refs.filter(p => docs[j].project_refs.includes(p));
    if (shared.length > 0) {
      const exists = relationships.some(r =>
        (r.source_id === docs[i].id && r.target_id === docs[j].id) ||
        (r.source_id === docs[j].id && r.target_id === docs[i].id)
      );
      if (!exists) {
        rel(docs[i].id, docs[j].id, "related-to", `Both part of ${shared[0]} initiative`);
      }
    }
  }
  if (relationships.length >= 250) break;
}

// ──────────── WRITE ALL FILES ────────────
writeFileSync(resolve(REGISTRY, "categories.sample.json"), JSON.stringify(categories, null, 2), "utf-8");
console.log(`Written categories.sample.json (${categories.length} entries)`);
writeFileSync(resolve(REGISTRY, "owners.sample.json"), JSON.stringify(owners, null, 2), "utf-8");
console.log(`Written owners.sample.json (${owners.length} entries)`);
writeFileSync(resolve(REGISTRY, "projects.sample.json"), JSON.stringify(projects, null, 2), "utf-8");
console.log(`Written projects.sample.json (${projects.length} entries)`);
writeFileSync(resolve(REGISTRY, "documents.sample.json"), JSON.stringify(docs, null, 2), "utf-8");
console.log(`Written documents.sample.json (${docs.length} entries)`);
writeFileSync(resolve(REGISTRY, "evidence-map.sample.json"), JSON.stringify(evidence, null, 2), "utf-8");
console.log(`Written evidence-map.sample.json (${evidence.length} entries)`);
writeFileSync(resolve(REGISTRY, "relationship.sample.json"), JSON.stringify(relationships, null, 2), "utf-8");
console.log(`Written relationship.sample.json (${relationships.length} entries)`);

console.log("\n" + "=".repeat(50));
console.log("Registry population complete!");
console.log(`  Categories:    ${categories.length}`);
console.log(`  Owners:        ${owners.length}`);
console.log(`  Projects:      ${projects.length}`);
console.log(`  Documents:     ${docs.length}`);
console.log(`  Evidence:      ${evidence.length}`);
console.log(`  Relationships: ${relationships.length}`);
console.log("=".repeat(50));
