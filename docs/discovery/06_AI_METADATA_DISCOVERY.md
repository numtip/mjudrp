# AI-Assisted Metadata Discovery

## Principle

MJU-DRP does **not** build an AI engine. It uses existing AI tools available to the project owner for metadata assistance.

## Available AI Tools

### ChatGPT

| Field | Value |
|-------|-------|
| Access | Browser, API (pay-per-use) |
| Use cases | Metadata suggestion, keyword generation, summary generation, category suggestion, quality review |
| Strengths | Good Thai language support; can process document text for metadata extraction |
| Workflow | Owner pastes document info → ChatGPT returns suggested metadata → Owner reviews and commits |
| Recommendation | ✅ **Use** for ad-hoc metadata generation during registry population. |

### Gemini

| Field | Value |
|-------|-------|
| Access | Browser (free), API (pay-per-use) |
| Use cases | Metadata suggestion, keyword generation, document analysis |
| Strengths | Google ecosystem; long context window; multilingual (Thai) |
| Recommendation | ✅ **Use** as alternative to ChatGPT. Free tier sufficient for MVP. |

### Claude

| Field | Value |
|-------|-------|
| Access | Browser, API (pay-per-use) |
| Use cases | Metadata suggestion, quality review, evidence mapping suggestion |
| Strengths | Long context window; structured output; good with JSON |
| Recommendation | ✅ **Use** for quality review and evidence mapping suggestions. |

### OpenRouter

| Field | Value |
|-------|-------|
| Access | API (pay-per-use, unified access to multiple models) |
| Use cases | Programmatic API access to multiple AI providers |
| Strengths | One API for many models; fallback between providers |
| Recommendation | ⚠️ **Future** — If automated AI metadata becomes needed, OpenRouter provides unified API. Not needed during manual MVP phase. |

### Cloudflare AI

| Field | Value |
|-------|-------|
| Access | API (Cloudflare Workers AI, pay-per-use) |
| Use cases | Edge-deployed AI tasks |
| Strengths | Workers integration; no server management |
| Recommendation | Low priority — not needed for git-based registry workflow. |

### Cursor Agent

| Field | Value |
|-------|-------|
| Access | Cursor IDE (current session) |
| Use cases | Registry editing, validation, schema updates, memory management |
| Strengths | Already in use; can manipulate JSON directly |
| Recommendation | ✅ **Already in use** — Primary tool for registry operations. |

### Local Scripts

| Field | Value |
|-------|-------|
| Access | Node.js scripts in this repository |
| Use cases | Batch metadata suggestions via API calls (future) |
| Recommendation | ⚠️ **Future** — Scripts can call AI APIs for batch processing when approved. |

---

## Use Cases

| Use Case | Recommended Tool | Workflow |
|----------|-----------------|----------|
| Metadata suggestion | ChatGPT / Gemini | Owner uploads/describes document → AI suggests title, description, keywords, category |
| Keyword generation | ChatGPT / Gemini | AI extracts keywords from document description |
| Summary generation | ChatGPT / Claude | AI writes concise document summary from full content |
| Duplicate detection | Claude (long context) | AI reviews registry for potential duplicates |
| Category suggestion | ChatGPT | AI suggests best category from taxonomy |
| Evidence mapping suggestion | Claude | AI suggests which evidence criteria a document satisfies |
| Relationship suggestion | Claude | AI suggests related documents based on content similarity |
| Quality review | Claude / ChatGPT | AI reviews registry entries for completeness and consistency |

## Manual Workflow (MVP)

```
1. Owner has document (in SharePoint or local)
2. Owner copies document title, description, category into AI chat
3. AI suggests metadata fields
4. Owner reviews, adjusts, approves
5. Owner adds entry to registry JSON
6. Run validation
7. Commit
```

## Anti-Patterns

- ❌ Do not build an AI chatbot
- ❌ Do not automate AI API calls from CI
- ❌ Do not store API keys in this repository
- ❌ Do not create an AI-powered admin panel
- ❌ Do not use AI for automatic registry updates without human review
