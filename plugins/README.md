# Plugin Layer

## Purpose

The plugin layer defines extension points for MJU-DRP functionality. Plugins allow modular, swappable capabilities that can be enabled or disabled without modifying the registry core.

## Design Principle

Plugins operate on registry data through defined interfaces. They do not modify the registry core or storage layer. Each plugin has a specific responsibility and a defined input/output contract.

## Plugin Types

| Plugin | Responsibility |
|--------|---------------|
| Metadata | Enrich, transform, and validate document metadata |
| Validator | Apply validation rules to registry entries |
| Search | Generate and optimize search indexes |
| Export | Produce registry outputs in various formats |
| Import | Parse external data into registry format |

## Plugin Lifecycle

```
Registered → Configured → Enabled → Active
                                  → Disabled (runtime toggle)
```

- **Registered**: Plugin is known to the plugin registry
- **Configured**: Plugin settings are provided
- **Enabled**: Plugin is active for the current operation
- **Active**: Plugin is processing data

## Current Status

**Architecture only.** Plugin implementations are not built during MVP. The plugin framework is documented as an extension point.

## Files

| File | Content |
|------|---------|
| `metadata-plugin.md` | Metadata enrichment and transformation plugin |
| `validator-plugin.md` | Registry validation extension plugin |
| `search-plugin.md` | Search index generation and optimization plugin |
| `export-plugin.md` | Registry data export plugin |
| `import-plugin.md` | External data import plugin |
