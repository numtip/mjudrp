# Best Practices

## From MJU-DRP Enterprise Resource Certification (ERC)

### 1. Multi-Scale Testing

Always test tools at realistic scales, not just the minimum viable size.

```
Unit test → Small batch → Medium batch → Large batch
(1 doc)    (50 docs)     (500 docs)      (5000 docs)
```

This reveals performance characteristics, memory usage, and scaling bottlenecks.

### 2. Test with Real (or Realistic) Data

Sample data should approximate real data in structure, size, and variety. Include:
- Edge cases (empty fields, missing fields, null values)
- Unicode/Thai content
- Various categories and states
- Cross-references that may be broken

### 3. Document Dependencies Completely

For every dependency, document:
- Name and version
- Installation command
- License
- All sub-dependencies
- CI compatibility
- Any native modules

### 4. Separate Certification from Integration

| Phase | Activity |
|-------|----------|
| Discovery | Evaluate options, document trade-offs |
| Certification | Verify selected tools with real data |
| Integration | Add verified tools to codebase |

Never integrate without certifying first.

### 5. Schema-Validate Optional Fields

Optional fields should be truly optional:

```json
{
  "anyOf": [
    { "type": "string", "format": "uri" },
    { "type": "string", "maxLength": 0 }
  ]
}
```

Or simply omit the field when not in use. Empty strings with format validators will fail.

### 6. MCP Configuration Checklist

When configuring MCP servers in Cursor:

- [ ] Install via `npx` (auto-installs on first use)
- [ ] Add to `~/.cursor/mcp.json` (user-level) or `.cursor/mcp.json` (project-level)
- [ ] Test with a simple prompt ("read the README.md and summarize it")
- [ ] Store tokens in environment variables, never in the repository
- [ ] Document the configuration in the project memory

### 7. Keep Zero-Dependency Libraries Where Possible

MiniSearch (zero dependencies) is preferable to a comparable library with 50+ transitive dependencies. Fewer dependencies means:
- Faster `npm install`
- Smaller `node_modules`
- Lower security surface
- Fewer maintenance surprises

### 8. CI Testing for Validation Tools

Schema validation tools should be tested in CI:

```yaml
- name: Validate schemas
  run: node scripts/certify-ajv.mjs
```

This catches schema/data mismatches before they reach production.

### 9. Performance Benchmarks

Always measure and document:
- Cold start time (first validation after npm install)
- Hot validation time (sequential runs)
- Memory usage at rest
- Memory usage under load

### 10. Knowledge Transfer

When completing a certification sprint, create:
1. Certification reports (detailed per-technology)
2. Knowledge base (reusable across projects)
3. Memory updates (for the project's AI agents)
4. Updated sprint plan (for the next human developer)
