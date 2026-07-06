# Runtime Policy

## Purpose

Define rules for how the MJU-DRP runtime operates, what it can and cannot do, and how runtime state is managed.

## Core Rules

### 1. No External Dependencies
The runtime must not depend on external services for validation, generation, or memory updates. All operations must work offline with only Node.js standard library.

### 2. Deterministic Outputs
The same registry data must always produce the same outputs. No randomness, no date-dependent output variation (except explicit timestamps in memory files).

### 3. Git-Bound State
The runtime has no persistent state outside of git. All state is in committed files. Runtime cannot modify state that isn't tracked by git.

### 4. Pre-Generation, Not On-Demand
All outputs are pre-generated and committed. There is no on-demand generation from consumer requests.

### 5. Validation Gate
Outputs must not be generated from invalid registry data. Validation must pass before generation runs.

### 6. Idempotent Operations
Running the same operation twice must produce the same result. Memory updates are the only exception (timestamps differ).

## Runtime Lifecycle

```
Registry Edit → Validate → [FAIL: fix errors] → [PASS: generate] → Commit → Push
                                                                           ↓
                                                              Consumer fetches
```

## Runtime Responsibilities

| Layer | Responsibility |
|-------|---------------|
| Registry | Provide valid, structured metadata |
| Validation | Detect and report data quality issues |
| Generation | Produce consumer-ready outputs |
| Memory | Track project state and decisions |
| CI/CD | Automate validation and generation |

## Runtime Non-Responsibilities

- Not a web server
- Not an API endpoint
- Not a database
- Not a background job processor
- Not a notification system
- Not a real-time sync engine

## Policy Violations

| Violation | Consequence |
|-----------|-------------|
| Adding external dependency | Rollback, review |
| Generating from invalid data | Revert, fix validation |
| Adding runtime state outside git | Remove, document in ARCHITECTURE_LOCK |
| Running consumer operations | Halt, separation of concerns review |
