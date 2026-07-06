# Resource Certification Plan

## Purpose

Define test plans to verify each candidate capability is actually usable before committing to integration.

## Certification Statuses

| Status | Meaning |
|--------|---------|
| Not Tested | Discovery complete, not yet tested |
| Candidate | Meets criteria, ready for testing |
| Certified | Tested and verified |
| Rejected | Failed testing or unsuitable |
| Future | Will test later |

---

### SharePoint Document Library

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Create a test document library in MJU SharePoint tenant 2. Upload a sample document 3. Generate a share URL 4. Verify URL is accessible in browser 5. Record the URL pattern for documentation |
| Success criteria | Share URL is accessible; URL format matches `https://mju365.sharepoint.com/sites/{site}/Shared%20Documents/{path}` |
| Dependencies | SharePoint site access; test user with permissions |

### OneDrive Folder

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Create a folder structure in OneDrive matching registry categories 2. Upload a test document 3. Generate a share URL 4. Verify URL is accessible 5. Record URL pattern |
| Success criteria | Share URL matches `https://mju365-my.sharepoint.com/personal/{user}/Documents/{path}` |
| Dependencies | OneDrive account with MJU tenant |

### Microsoft Graph Read Access

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Register a test app in Entra ID 2. Grant `Sites.Read.All` and `Files.Read.All` 3. Authenticate with device code flow 4. Call `GET /v1.0/sites/root` 5. List files in a test SharePoint library |
| Success criteria | Can read site info and file list from Graph API |
| Dependencies | Entra ID admin; app registration permission |
| Risk | May need IT approval; skip if blocked |

### Excel Online Metadata Sheet

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Create Excel Online sheet with columns matching document schema 2. Enter 3 test document entries 3. Export as CSV 4. Write a script to convert CSV to registry JSON format 5. Validate the resulting JSON |
| Success criteria | CSV → JSON conversion produces valid registry entries |
| Dependencies | Excel Online access; Node.js for conversion script |

### SharePoint List Metadata

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Create SharePoint List with columns matching document schema 2. Add 3 test entries 3. Export list to JSON (via Graph API or UI) 4. Compare with registry schema 5. Document field mapping |
| Success criteria | SharePoint List data maps cleanly to registry schema |
| Dependencies | SharePoint site with List creation permission |

### GitHub Actions

| Field | Value |
|-------|-------|
| Status | Certified |
| Test | 1. Push to main triggers validate.yml 2. Workflow runs `node scripts/validate-registry.mjs` 3. Workflow runs `node scripts/generate-search-index.mjs` 4. Artifacts are uploaded |
| Success criteria | Green check on commit; validation passes; artifacts generated |
| Dependencies | GitHub Actions enabled |
| Result | ✅ Already passing |

### AJV Validation

| Field | Value |
|-------|-------|
| Status | Candidate |
| Test | 1. Install AJV (`npm install ajv`) 2. Load document schema 3. Validate sample documents 4. Compare error output with current custom validation 5. Document integration into `validate-registry.mjs` |
| Success criteria | AJV reports same errors as current script; error messages are clear |
| Dependencies | Node.js, npm |

### Pagefind / MiniSearch

| Field | Value |
|-------|-------|
| Status | Candidate |
| Test | 1. Install MiniSearch (`npm install minisearch`) 2. Write script to generate MiniSearch index from document registry 3. Install Pagefind CLI in a test project 4. Run Pagefind indexing against sample HTML 5. Compare index sizes and search quality |
| Success criteria | Both produce working search; MiniSearch index <10KB; Pagefind index <50KB |
| Dependencies | Node.js; test HTML page for Pagefind |

### MCP Server Candidates

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Configure GitHub MCP in Cursor mcp.json 2. Test: list files in repository 3. Configure Filesystem MCP 4. Test: read a registry JSON file 5. Document configuration |
| Success criteria | Both MCP servers respond correctly in Cursor |
| Dependencies | Cursor IDE; MCP configuration permissions |

### Consumer JSON Loading

| Field | Value |
|-------|-------|
| Status | Not Tested |
| Test | 1. Create a minimal test HTML page 2. Fetch `document-registry.json` from GitHub raw URL 3. Filter by a project_ref 4. Render document cards 5. Measure load time |
| Success criteria | JSON loads in <2 seconds; filtering works; cards render correctly |
| Dependencies | Public GitHub raw URL access; test could hit rate limits |

---

## Certification Priority

| Resource | Priority | Certify By |
|----------|:--------:|------------|
| GitHub Actions | ✅ Certified | Already done |
| SharePoint Document Library | High | Sprint 2 |
| Excel Online Metadata Sheet | High | Sprint 2 |
| Consumer JSON Loading | High | Sprint 2 |
| AJV Validation | Medium | Sprint 2 |
| MiniSearch | Medium | Sprint 2-3 |
| MCP Servers (GitHub, Filesystem) | Medium | Sprint 2 |
| OneDrive Folder | Medium | Sprint 3 |
| SharePoint List Metadata | Low | Sprint 3 |
| Pagefind | Low | Sprint 3-4 |
| Microsoft Graph Read Access | Low | When approved |
