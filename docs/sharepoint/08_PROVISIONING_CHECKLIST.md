# Provisioning Checklist

**Status:** CHECKLIST — 2026-07-06
**Next Sprint:** 3B — SharePoint Manual Provisioning Kit

---

## Manual Setup Checklist

This checklist guides the creation of the MJU Document Registry SharePoint site. No automation — all steps are manual via SharePoint UI or PowerShell.

### Phase 1: Site Creation

- [ ] **1.1** Create SharePoint Communication Site
  - Name: `MJU Document Registry`
  - URL: `https://mju365.sharepoint.com/sites/MJUDocumentRegistry`
  - Template: Communication site
  - Language: Thai
  - Description: "Central document registry for MJU-DRP consumer projects"

- [ ] **1.2** Configure site settings
  - Set site logo (optional)
  - Set site navigation
  - Enable multilingual (Thai + English) if available
  - Configure external sharing (block by default; allow on specific libraries)

### Phase 2: Document Libraries

- [ ] **2.1** Create `DRP Documents` library
  - Template: Document Library
  - Description: "Primary document storage for registered consumer project documents"
  - Versioning: Major versions only
  - Draft item security: Only users who can edit
  - Require content approval: Yes

- [ ] **2.2** Create `DRP Evidence` library
  - Template: Document Library
  - Description: "Evidence documents mapped to quality assurance criteria"
  - Versioning: Major versions only
  - Require content approval: Yes

- [ ] **2.3** Create `DRP Source Data` library
  - Template: Document Library
  - Description: "Raw data exports, CSV/Excel metadata templates, batch import files"
  - Versioning: None

- [ ] **2.4** Create `DRP Templates` library
  - Template: Document Library
  - Description: "Standardized templates for metadata import, column templates, reports"

- [ ] **2.5** Create `DRP Archive` library
  - Template: Document Library
  - Description: "Long-term preservation of superseded and archived documents"

- [ ] **2.6** Create `DRP Working Area` library
  - Template: Document Library
  - Description: "In-progress documents, drafts, collaborative workspace"

### Phase 3: Versioning

- [ ] **3.1** Configure versioning for `DRP Documents`: Major (1, 2, 3)
- [ ] **3.2** Configure versioning for `DRP Evidence`: Major (1, 2, 3)
- [ ] **3.3** Configure versioning for `DRP Templates`: Major (1, 2, 3)
- [ ] **3.4** Configure versioning for `DRP Archive`: None (frozen)
- [ ] **3.5** Configure versioning for `DRP Working Area`: Major + Minor (1.0, 1.1, 2.0)
- [ ] **3.6** Enable content approval on `DRP Documents` and `DRP Evidence`

### Phase 4: Site Columns

Create these site columns under "MJU Document Registry Columns" group:

- [ ] **4.1** DRP Document ID — Single line text, required, pattern validation
- [ ] **4.2** Title — Single line text (built-in, configure as needed)
- [ ] **4.3** Description — Multiple lines text
- [ ] **4.4** Category — Choice (values from `categories.sample.json`)
- [ ] **4.5** Subcategory — Choice (dependent on Category)
- [ ] **4.6** Fiscal Year — Single line text
- [ ] **4.7** Year — Number
- [ ] **4.8** Version — Single line text (default "1.0")
- [ ] **4.9** Status — Choice (Draft, Review, Approved, Published, Archived, Superseded)
- [ ] **4.10** Owner — Person or Group, required
- [ ] **4.11** Department — Choice (MJU departments)
- [ ] **4.12** Keywords — Multiple lines text (comma-separated)
- [ ] **4.13** Tags — Multiple lines text (comma-separated)
- [ ] **4.14** Language — Choice (th, en), default "th"
- [ ] **4.15** File Type — Choice (auto-filled by SharePoint)
- [ ] **4.16** Project Refs — Multiple lines text, required
- [ ] **4.17** Evidence Refs — Multiple lines text
- [ ] **4.18** Related Documents — Multiple lines text
- [ ] **4.19** Visibility — Choice (Public, Internal, Confidential, Restricted), default "Internal"
- [ ] **4.20** Share URL — Hyperlink (auto-filled by SharePoint)
- [ ] **4.21** Created At — Date and Time (auto)
- [ ] **4.22** Updated At — Date and Time (auto)

### Phase 5: Content Types

- [ ] **5.1** Create DRP Document content type with required columns
- [ ] **5.2** Create DRP Evidence content type
- [ ] **5.3** Create DRP Source Data content type
- [ ] **5.4** Create DRP Template content type
- [ ] **5.5** Create DRP Archive content type
- [ ] **5.6** Add content types to their respective libraries

### Phase 6: Views

- [ ] **6.1** Create All Active Documents view
- [ ] **6.2** Create Missing Metadata view
- [ ] **6.3** Create Pending Review view
- [ ] **6.4** Create Green Office Evidence view
- [ ] **6.5** Create RAE Landing Documents view
- [ ] **6.6** Create Learning Center Manuals view
- [ ] **6.7** Create Research Portal Documents view
- [ ] **6.8** Create Public Documents view
- [ ] **6.9** Create Internal Documents view
- [ ] **6.10** Create Archived Documents view
- [ ] **6.11** Create Recently Updated view
- [ ] **6.12** Create By Fiscal Year view
- [ ] **6.13** Create By Owner view

### Phase 7: SharePoint Lists

- [ ] **7.1** Create `DRP Categories` list
  - Columns: ID, Name (EN), Name (TH), Parent
  - Populate from `registry/categories.sample.json`
- [ ] **7.2** Create `DRP Projects` list
  - Columns: ID, Name, Status
  - Populate from `registry/projects.sample.json`
- [ ] **7.3** Create `DRP Owners` list
  - Columns: ID, Name, Department
  - Populate from `registry/owners.sample.json`
- [ ] **7.4** Create `Metadata QA Queue` list
  - Columns: Document ID, Title, Status, Reviewer, Notes, AI Suggestions, Created

### Phase 8: Permission Groups

- [ ] **8.1** Create DRP Owners group — Full Control
- [ ] **8.2** Create DRP Editors group — Contribute
- [ ] **8.3** Create DRP Reviewers group — Contribute (metadata only)
- [ ] **8.4** Create DRP Readers group — Read (public docs)
- [ ] **8.5** Create DRP Auditors group — Read (all content)
- [ ] **8.6** Create DRP AI Service Account group — Read (for future Graph)
- [ ] **8.7** Create Project Owners group — Read (per-project scope)
- [ ] **8.8** Break permission inheritance on restricted libraries

### Phase 9: Test Documents

- [ ] **9.1** Upload 5 test documents from Green Office 2026 project
- [ ] **9.2** Fill all required metadata fields
- [ ] **9.3** Upload 3 test evidence documents
- [ ] **9.4** Verify views display correct documents
- [ ] **9.5** Verify permission groups have correct access

### Phase 10: Export and Validate

- [ ] **10.1** Export metadata from DRP Documents as CSV
- [ ] **10.2** Validate CSV metadata against registry schemas (AJV)
- [ ] **10.3** Fix any validation errors
- [ ] **10.4** Create PR to add test documents to registry JSON
- [ ] **10.5** Run full release pipeline

### Phase 11: Approval

- [ ] **11.1** Project owner reviews site setup
- [ ] **11.2** Registry validation passes
- [ ] **11.3** Permission model verified
- [ ] **11.4** Documentation updated
- [ ] **11.5** Site approved for Graph read-only prototype
