# AI Workflow

## Overview

AI agents assist at multiple stages of the MJU-DRP document lifecycle. This document defines the AI workflow boundaries: AI suggests, human decides, registry validates.

## AI Agent Types

| Agent | Where | Capability |
|-------|-------|-----------|
| Microsoft 365 Copilot | SharePoint | Answer questions, locate documents, suggest metadata |
| Cursor Agent | GitHub/MJU-DRP | Manage repo, validate data, generate packages, write docs |
| External AI (ChatGPT/Claude/Gemini) | Anywhere | Summarize, classify, detect duplicates, review quality |
| Future Graph Adapter | CI pipeline | Read metadata from SharePoint, no write-back |

## Workflow Stages

```
1. Staff uploads document to SharePoint
    ↓
2. AI suggests metadata (category, keywords, description)
    [Copilot or External AI]
    ↓
3. Human reviews AI suggestions, accepts or modifies
    [DRP Editor or Reviewer]
    ↓
4. Document enters Metadata QA Queue
    [AI quality review → Human approval]
    ↓
5. Document approved → Export metadata
    ↓
6. Registry validation (AJV)
    [Cursor Agent — validates against schemas]
    ↓
7. GitHub PR created, reviewed, merged
    [Cursor Agent or Maintainer]
    ↓
8. Registry package regenerated
    [Cursor Agent or CI pipeline]
    ↓
9. Consumer projects fetch updated package
```

## Safe AI Principles

- AI ALWAYS suggests, NEVER decides
- Human ALWAYS approves before registry integration
- Validation ALWAYS runs before package release
- No AI writes directly to SharePoint or GitHub without human review
