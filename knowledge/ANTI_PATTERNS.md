# Anti-Patterns

## From MJU-DRP Enterprise Resource Certification (ERC)

### 1. Empty Strings in URI Fields

**Anti-pattern:** Putting empty string `""` in optional fields with `"format": "uri"` constraint.

**Why it's bad:** Validators (AJV + ajv-formats) reject empty strings as invalid URIs.

**Fix:** Use `anyOf` in the schema to accept empty strings, or omit the field entirely when not in use.

**Detected:** During AJV certification — 14 validation errors avoided by fixing the schema.

### 2. Assuming Format Validation Works Without the Format Plugin

**Anti-pattern:** Installing AJV without `ajv-formats` and assuming `"format": "uri"` is validated.

**Why it's bad:** Base AJV ignores format constraints by default (for performance). Documents with invalid URLs pass validation silently.

**Fix:** Always install `ajv-formats` and call `addFormats(ajv)` when using format constraints.

### 3. Certifying with Only Sample-Scale Data

**Anti-pattern:** Testing a library with only the minimum dataset (e.g., 7 documents) and declaring it certified.

**Why it's bad:** Performance, memory, and edge-case issues only appear at larger scales. MiniSearch at 7 docs takes <1ms. At 5000 docs, it takes 67ms — still fast, but we didn't know that until we tested.

**Fix:** Test at minimum 3 scales: sample, 10x, 100x.

### 4. Documenting Without Verifying

**Anti-pattern:** Writing documentation about a tool's capabilities without running the actual tool.

**Why it's bad:** Documentation can be wrong, outdated, or based on assumptions. ECD v1.3 documented AJV as "certified" based on documentation alone. ERC v1.4 found the ajv-formats dependency.

**Fix:** Never certify without practical verification. Discovery documents state "candidate" status; certification documents provide verified status.

### 5. Single-Vendor Lock-in

**Anti-pattern:** Selecting a tool ecosystem that ties the project to a single vendor.

**Why it's bad:** Vendor pricing changes, EOL announcements, or strategic shifts can force costly migrations.

**Fix:** Prefer open standards (JSON Schema, Dublin Core, ISO) and multi-vendor tools (AJV is MIT, MiniSearch is MIT, not proprietary).

### 6. Over-Abstraction Before Need

**Anti-pattern:** Building adapter/plugin/provider layers before there are multiple actual implementations.

**Why it's bad:** Abstractions designed without concrete implementations are usually wrong. The provider/plugin/adapter layers documented in Foundation Hardening v1.2 are architectural placeholders, not implementations.

**Fix:** Implement the simplest possible solution first. Abstract when you have at least two concrete implementations.

### 7. Ignoring Thai Language in Multilingual Projects

**Anti-pattern:** Evaluating search/validation tools without testing Thai language support.

**Why it's bad:** Many excellent search libraries (Lunr) have poor or undocumented Thai support. What works for English may not work for Thai.

**Fix:** Always include Thai search in certification tests, even if no real Thai data exists yet. Create minimal Thai test data.

### 8. Committing Secrets

**Anti-pattern:** Storing API keys, tokens, or passwords in the repository.

**Why it's bad:** GitHub scans for secrets. Exposed tokens can be used by attackers. Revoking and rotating secrets is painful.

**Fix:** Use environment variables in MCP configs. Never commit `.env` files. Add `.env` to `.gitignore`.
