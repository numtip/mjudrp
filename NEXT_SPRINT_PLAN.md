# Next Sprint Plan

## Sprint 2: Registry Population & Integration

### Objectives
1. Populate registry with real (or more realistic) document metadata
2. Establish Microsoft 365 / SharePoint folder structure aligned with registry taxonomy
3. Create initial consumer project integration examples
4. Add relationship entries between documents
5. Enhance validation scripts with additional checks
6. Set up GitHub Pages or static hosting for JSON outputs

### Tasks

#### Registry Population
- [ ] Add more sample documents for Research Portal project
- [ ] Add real document metadata from Green Office 2026
- [ ] Add relationship entries between related documents
- [ ] Populate `registry/relationship.sample.json` with cross-document links

#### Microsoft 365 Integration
- [ ] Document SharePoint site structure for each project
- [ ] Create folder hierarchy guidelines matching registry taxonomy
- [ ] Test share URL generation and access patterns

#### Consumer Integration
- [ ] Create example HTML page that fetches and displays registry data
- [ ] Document integration pattern in consumer project READMEs
- [ ] Test JSON output consumption from GitHub raw URLs

#### Tooling
- [ ] Add schema validation against registry data in CI
- [ ] Add markdown link checker for documentation
- [ ] Create convenience script for full pipeline: validate → generate → update-memory

#### Documentation
- [ ] Review all 17 docs/ files for completeness
- [ ] Add diagrams to architecture docs
- [ ] Create quick-start guide for new consumer projects

### Allowed Actions
- Add and update registry data files
- Enhance validation and generation scripts
- Create consumer integration examples
- Update memory files
- Configure static hosting

### Forbidden Actions
- Do not add a database
- Do not implement Microsoft Graph integration
- Do not implement SharePoint synchronization
- Do not create authentication or RBAC
- Do not build an admin panel
- Do not modify Microsoft 365 via automation
- Do not add AI chatbot or OCR

### Risks
- Real document metadata may require coordination with project owners
- SharePoint access may need IT approval
- Consumer projects may need updates to integrate registry outputs
