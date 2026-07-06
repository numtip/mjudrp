# List Guide

## Overview

Five SharePoint Lists support the MJU-DRP operational workflow.

## Lists

| List | Purpose | Records | Source of Truth |
|------|---------|---------|-----------------|
| DRP Categories | Category taxonomy reference | 22 | registry/categories.sample.json |
| DRP Projects | Active project reference | 12 | registry/projects.sample.json |
| DRP Owners | Department owner reference | 12 | registry/owners.sample.json |
| Metadata QA Queue | Metadata review workflow | Variable | SharePoint (operational) |
| Registry Review Queue | Registry integration tracking | Variable | SharePoint (operational) |

## List Templates

See `provisioning/lists/` for complete list definitions.

## Populating Reference Lists

Initial population comes from the MJU-DRP GitHub repository:

```bash
# Extract categories for import
node -e "const c = require('./registry/categories.sample.json'); c.forEach(e => console.log(e.id + ',' + e.name_en + ',' + e.name_th));"
```

Then import the CSV into the SharePoint list using "Export to Excel" → "Import Spreadsheet".

## Workflow Lists

- **Metadata QA Queue:** AI reviews → Human approves → Ready for registry
- **Registry Review Queue:** Document ready → Validate (AJV) → Create GitHub PR → Merge → Package release
