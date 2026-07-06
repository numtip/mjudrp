# Architecture Change Policy

## Status

**LOCKED** — 2026-07-06

## Purpose

This policy defines the process for changing any locked component of the MJU-DRP architecture. All locked components are documented in `docs/architecture/00_ARCHITECTURE_LOCK_v1.md`.

## What Is Locked

The following components require this change process before modification:

| # | Component | Lock File | ADR Reference |
|---|-----------|-----------|---------------|
| 1 | Architecture Lock itself | `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` | ADR-011 |
| 2 | Registry Specification | `docs/architecture/01_REGISTRY_SPECIFICATION_v1.md` | ADR-011 |
| 3 | Schema Version Policy | `docs/architecture/02_SCHEMA_VERSION_POLICY.md` | ADR-011 |
| 4 | Implementation Guidelines | `docs/architecture/04_IMPLEMENTATION_GUIDELINES.md` | ADR-011 |
| 5 | Release Policy | `docs/architecture/07_RELEASE_POLICY.md` | ADR-011 |
| 6 | Deprecation Policy | `docs/architecture/08_DEPRECATION_POLICY.md` | ADR-011 |
| 7 | Consumer Contract | `contracts/consumer-contract.md` | ADR-005 |
| 8 | Core Principles | `PROJECT_CONSTITUTION.md`, `README.md` | ADR-001 through ADR-006 |
| 9 | Certification Decisions | `docs/certification/` | ADR-010 |
| 10 | Quality Gates | `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` | ADR-011 |

## Change Process

### Step 1: Identify the Need

Document the rationale for the change:
- What is the problem or requirement?
- Why does the locked component need to change?
- What happens if we don't change?

### Step 2: Create a New ADR

Create a new entry in `memory/DECISIONS.md` with:

| Field | Required |
|-------|----------|
| Decision ID | ADR-NNN (next sequential) |
| Date | Current date |
| Status | Proposed |
| Context | Why the change is needed |
| Decision | Exactly what is being changed |
| Reason | Justification for breaking the lock |
| Impact | All affected files, consumers, and processes |

### Step 3: Assess Impact

Evaluate impact on:
- **Schema** — Does schema change? Is it backward compatible?
- **Registry data** — Does existing data need migration?
- **Consumer projects** — Will consumers break? Need notification?
- **Scripts** — Do validation, generation, memory scripts need changes?
- **Documentation** — What docs need updating?
- **ADRs** — Do existing ADRs conflict with the change?
- **Certifications** — Does the change affect certified technologies?

### Step 4: Review and Approve

| Change Type | Approval Required |
|-------------|------------------|
| Non-breaking (additive) | Project owner review |
| Breaking (schema, contract) | Project owner approval + ADR |
| Architecture lock change | Project owner approval + ADR |
| Core principle change | Project owner approval + ADR |

### Step 5: Implement the Change

1. Update all affected files
2. Create migration guide (for breaking changes)
3. Run validation (must PASS)
4. Update runtime files
5. Update memory files
6. Update certification docs (if applicable)

### Step 6: Update Lock Documentation

1. Update `docs/architecture/00_ARCHITECTURE_LOCK_v1.md` to reflect new state
2. Update `memory/ARCHITECTURE_LOCK.md` with new locked rules
3. Update affected architecture documents

### Step 7: Notify Stakeholders

For breaking changes:
- Notify all registered consumer projects
- Create GitHub issue documenting the change
- Create migration guide
- Allow minimum 1 sprint transition period

## Change Categories

### Category 1: Non-Breaking Addition

Adding a new optional field, new output, or new documentation without changing existing contracts.

**Process:** Standard sprint workflow. Document in ADR if significant.

### Category 2: Breaking Schema Change

Adding required fields, removing fields, or changing field types.

**Process:** Full change process. ADR required. Consumer notification required.

### Category 3: Technology Replacement

Replacing a certified technology with a different one.

**Process:** Full certification process (ECD → ERC). ADR required. Migration guide required.

### Category 4: Architecture Principle Change

Modifying core principles, locked rules, or architecture foundations.

**Process:** Full change process. Project owner approval. ADR required. Impact assessment required.

### Category 5: Emergency Change

Security vulnerability or data integrity issue requiring immediate action.

**Process:** Can skip standard timeline but must still create ADR within 24 hours. Post-hoc review by project owner.

## Change Log

| Date | ADR | Change | Category | Status |
|------|-----|--------|----------|--------|
| 2026-07-06 | ADR-011 | Initial architecture lock | 4 | Approved |

## Lock Amendment History

This document is itself locked. Changes to this change policy require Category 4 approval.

| Version | Date | Change |
|---------|------|--------|
| v1.0 | 2026-07-06 | Initial architecture change policy |
