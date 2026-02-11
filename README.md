# XCT --- Execution Control Transfer

**A principle for safe LLM integration in production systems, expressed
as a protocol.**

XCT inverts the sovereignty model: the model operates, but does not
execute.\
Control remains with deterministic tools.

------------------------------------------------------------------------

## What is XCT?

XCT emerged from real production use of LLMs in high-risk operational
contexts.

Traditional approaches --- such as the Model Context Protocol (MCP) ---
delegate executive authority to the model:

-   The model decides
-   The model plans
-   The model executes
-   Tools extend the model's agency

**XCT inverts this:**

-   The model proposes actions
-   The system validates proposals
-   Tools execute deterministically
-   Results (including errors) return as structured signals
-   The model reacts and adjusts

The model becomes an operator within a controlled loop, not an
autonomous executor.

------------------------------------------------------------------------

## Why XCT?

### Problem

Autonomous LLM execution introduces operational risk:

-   Unintended state mutations
-   Non-auditable decision chains
-   Non-deterministic failures
-   Difficult rollback paths

In low-risk contexts this may be acceptable.\
In production infrastructure, it is not.

### Solution

Relocate authority:

-   Tools are sovereign executors
-   Errors are signals, not exceptions
-   The execution loop is external and interruptible
-   State transitions are traceable

> Decision is cheap. Execution is expensive. Keep them separate.

------------------------------------------------------------------------

## Protocol Overview

The protocol follows a simple request/response contract.

### Model returns one of:

#### 1. Propose next action

``` json
{
  "next_step": {
    "tool": "fs.write",
    "arguments": {
      "path": "file.txt",
      "content": "..."
    },
    "goal": "why this step is needed"
  }
}
```

#### 2. Signal completion

``` json
{
  "done": true,
  "message": "what was accomplished"
}
```

### System responds with:

#### Success

``` json
{
  "status": "success",
  "result": { ... }
}
```

#### Error

``` json
{
  "status": "error",
  "message": "fs.write failed: permission denied"
}
```

The model reads the response and adjusts.\
Error is information, not failure.

------------------------------------------------------------------------

## Core Rules

1.  No action without explicit tool invocation.\
2.  One step per iteration.\
3.  The model is stateless between calls.\
4.  Errors are first-class signals.\
5.  The system has veto power.

------------------------------------------------------------------------

## Comparison with MCP

  Dimension             MCP               XCT
  --------------------- ----------------- --------------------
  Loop control          Model             System
  Execution authority   Model             Tools
  Error handling        Exception         Signal
  State ownership       Model context     External
  Autonomy              High              Contained
  Use case              Flexible agents   Production systems

XCT is not a replacement for MCP. It addresses a different operational
need.\
MCP optimizes capability. XCT optimizes reliability.

------------------------------------------------------------------------

## License

Apache 2.0

------------------------------------------------------------------------

## Citation

``` bibtex
@misc{xct2025,
  title={XCT: Execution Control Transfer for Safe LLM Integration},
  author={[André Luís Torres Pereira]},
  year={2026},
  url={https://github.com/Tech-Tweakers/xct}
}
```
