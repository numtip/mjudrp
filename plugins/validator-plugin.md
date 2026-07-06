# Validator Plugin

## Status

**Architecture documented.** Core validation exists in `scripts/validate-registry.mjs`. Plugin architecture describes future extensibility.

## Role

Apply validation rules to registry entries. The validator plugin framework allows adding custom validation rules without modifying the core validation script.

## Responsibilities

- Define validation rule interface
- Support custom validation rules per project or category
- Aggregate validation results across all rules
- Report PASS/FAIL with details per rule
- Support rule severity levels (error, warning, info)

## Rule Interface

```json
{
  "rule_id": "required-share-url",
  "severity": "error",
  "scope": ["document"],
  "validate": "(entry) => entry.share_url ? null : 'Missing share_url'"
}
```

## Built-in Rules (MVP)

| Rule | Severity | Description |
|------|----------|-------------|
| Required fields | Error | Checks all required schema fields |
| Duplicate ID | Error | Detects duplicate document IDs |
| Valid share URL | Error | Share URL must be present |
| Valid owner ref | Warning | Owner must exist in owners registry |
| Valid project ref | Warning | Project ref must exist in projects registry |
| Valid category | Warning | Category must exist in categories registry |
| Valid evidence ref | Warning | Evidence ref must exist in evidence-map |

## Extension

```json
// Custom rule example
{
  "rule_id": "green-office-status-check",
  "severity": "warning",
  "scope": ["document"],
  "filter": "(entry) => entry.project_refs.includes('green-office-2026')",
  "validate": "(entry) => entry.status === 'approved' ? null : 'Green Office docs should be approved'"
}
```

## Configuration

```json
{
  "plugin": "validator",
  "enabled": true,
  "rules": ["default-rules"],
  "custom_rules_path": "./registry/validation-rules.json"
}
```
