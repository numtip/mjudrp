# Lessons Learned

## From MJU-DRP Enterprise Resource Certification (ERC)

### 1. Documentation Is Not Verification

The most important lesson: a tool can look perfect in documentation but fail against real data. AJV looked ideal for schema validation — until we tested it with our actual schema and found `format: "uri"` validation failed because `ajv-formats` was needed. We also discovered that our sample data used empty strings for optional URL fields, which failed URI validation.

**Fix:** Always run practical verification with real project data before certifying a technology.

### 2. Scale Testing Reveals Hidden Constraints

MiniSearch worked instantly with 7 sample documents. Testing at 500, then 5000 documents revealed:
- Index size scales linearly (~250 bytes/doc)
- Add+index time scales linearly (67ms at 5000 docs)
- Search time remains sub-millisecond regardless of scale
- Memory overhead is manageable even at 5000 docs

Without scale testing, we wouldn't know the 5000-doc boundary for browser-side feasibility.

### 3. Optional Fields Need Careful Schema Design

Fields that are "optional" but present with empty strings caused AJV validation failures. The schema used `"format": "uri"` on optional URL fields, which rejects empty strings. The fix was `anyOf` to accept either a valid URI or an empty string.

**Pattern:** Optional URL/identifier fields in JSON Schema should use:

```json
{
  "anyOf": [
    { "type": "string", "format": "uri" },
    { "type": "string", "maxLength": 0 }
  ]
}
```

### 4. MCP Configuration Is Standard but Must Be Documented

Filesystem MCP and GitHub MCP both require Cursor configuration that isn't part of the repository. Without documentation, the next developer won't know:
- Where to add MCP config (`~/.cursor/mcp.json`)
- What tokens are needed
- What paths to use

**Fix:** Document MCP configuration in the certification report and project memory.

### 5. Thai Language Search Requires Testing

Our sample data has no Thai content, so we couldn't verify Thai search quality during certification. MiniSearch supports Unicode/UTF-8 but Thai tokenization quality varies. This is a risk that should be addressed when real Thai metadata is added.

**Action:** Add Thai search verification to the Sprint 2 integration tests.

### 6. Dependency Bloat Is Real

AJV's ecosystem is simple (`ajv` + `ajv-formats` = 2 packages). MiniSearch has zero dependencies. Both are excellent examples of lean, focused libraries. Avoid libraries that pull in large dependency trees for a single feature.

**Rule of thumb:** If a library has more dependencies than features, look for alternatives.

### 7. Certify Before Commit

The ERC sprint caught issues (empty string URI validation, ajv-formats requirement, schema design) that would have caused CI failures if discovered during Sprint 2 integration. Certifying before committing to integration saves development time.

**Principle:** Research → Certify → Integrate. Never skip to integration.
