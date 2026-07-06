# Health Check Guide

## Overview

The Health Check Kit monitors and verifies the MJU Document Registry environment. It checks libraries, views, lists, columns, permissions, versioning, and metadata completeness.

## Health Check Assets

| Asset | Purpose |
|-------|---------|
| `health-check.ps1` | Comprehensive health check script |
| `health-rules.json` | Rule definitions and thresholds |
| `health-report-template.md` | Report template for manual review |

## Running a Health Check

```powershell
.\deployment\health\health-check.ps1 -SiteUrl $SiteUrl -Detailed:$true
```

## What is Checked

| Category | Checks |
|----------|--------|
| Libraries | 6 libraries exist, versioning config matches, approval settings |
| Lists | 5 lists exist |
| Columns | 22 columns in correct group |
| Permissions | 7 groups exist |
| Versioning | Each library has correct versioning settings |
| Metadata Completeness | Required fields are present and populated |

## Health Rules

Rules are defined in `deployment/health/health-rules.json`:

```json
{
  "health_rules": {
    "libraries": { "total_expected": 6, ... },
    "lists": { "total_expected": 5, ... },
    "columns": { "total_expected": 22, ... },
    "permission_groups": { "total_expected": 7, ... },
    "views": { "total_expected": 10, ... }
  },
  "thresholds": {
    "critical_score": 0.9,
    "warning_score": 0.75
  }
}
```

## Health Status

| Status | Criteria | Action |
|--------|----------|--------|
| HEALTHY | Score >= 90%, no critical failures | No action needed |
| ISSUES_FOUND | Score >= 75%, some warnings | Review and address warnings |
| CRITICAL | Score < 75%, or critical failures | Immediate investigation required |
