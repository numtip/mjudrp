# Contract Layer

## Purpose

The contract layer defines the compatibility rules between MJU-DRP and its consumers, providers, and internal components. Contracts ensure that changes in one layer do not break dependent layers.

## Contracts

| Contract | Parties | Purpose |
|----------|---------|---------|
| Consumer Contract | MJU-DRP ↔ Consumer Projects | Defines how consumer projects consume registry outputs |
| Provider Contract | MJU-DRP ↔ Storage Providers | Defines the storage provider interface |
| Registry Contract | Internal MJU-DRP components | Defines registry data format and schema evolution |
| Schema Versioning | All layers | Defines how schema versions are managed |

## Contract Principles

1. **Backward compatibility** — New versions must not break existing consumers
2. **Explicit versioning** — All contracts have explicit version numbers
3. **Deprecation policy** — Breaking changes have a deprecation notice period
4. **Documentation** — Contracts are documented before implementation

## Contract Lifecycle

```
Draft → Review → Published → Deprecated → Sunset
```

- **Draft**: Under development, may change
- **Review**: Stable enough for review
- **Published**: Official, breaking changes require version bump
- **Deprecated**: Still works but will be removed
- **Sunset**: No longer supported

## Files

| File | Content |
|------|---------|
| `consumer-contract.md` | Contract between MJU-DRP and consumer projects |
| `provider-contract.md` | Contract between MJU-DRP and storage providers |
| `registry-contract.md` | Internal registry data contract |
| `schema-versioning.md` | Schema versioning policy |
