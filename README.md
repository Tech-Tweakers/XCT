# XCT — Execution Control Transfer

**A protocol for safe LLM integration in production systems.**

XCT inverts the sovereignty model: the model *operates*, but does not *execute*.  
Control remains with deterministic tools.

---

## What is XCT?

XCT emerged from real-world deployment of LLMs in high-stakes operational environments where reliability isn't optional.

Traditional approaches—like the Model Context Protocol (MCP)—delegate executive authority to the model:
- The model decides, plans, and executes
- Tools extend the model's agency
- The system reacts to model choices

**XCT inverts this paradigm:**
- The model **proposes** actions
- The system **validates** proposals  
- Tools **execute** deterministically
- Results (including errors) return as **structured signals**
- The model **reacts** and adjusts

The model becomes a supervised operator within a controlled loop, not an autonomous executor.

---

## Why XCT?

### The Problem

Autonomous LLM execution introduces systemic operational risk:
- **Unintended state mutations** — unpredictable side effects in live systems
- **Non-auditable decision chains** — opaque reasoning, impossible to debug
- **Non-deterministic failures** — unreproducible error modes
- **Difficult rollback paths** — cascading changes are hard to undo

In low-risk contexts, this may be acceptable.  
In production infrastructure, **it is not**.

### The Solution

**Relocate authority** from model to system:
- Tools are **sovereign executors** with built-in validation
- Errors are **signals**, not exceptions—they inform the next step
- The execution loop is **external and interruptible**
- State transitions are **traceable and auditable**

> **Core principle:** Decision is cheap. Execution is expensive. Keep them separate.

---

## Protocol Overview

XCT follows a simple request/response contract with clear separation of concerns.

### Model Output

**1. Propose next action:**
```json
{
  "next_step": {
    "tool": "fs.write",
    "arguments": {
      "path": "config/app.yaml",
      "content": "..."
    },
    "goal": "Update deployment configuration for blue-green switch"
  }
}
```

**2. Signal completion:**
```json
{
  "done": true,
  "message": "Successfully migrated 47 user records to new schema"
}
```

### System Response

**Success:**
```json
{
  "status": "success",
  "result": { 
    "bytes_written": 2048,
    "checksum": "a3f5b..."
  }
}
```

**Error:**
```json
{
  "status": "error",
  "message": "fs.write failed: insufficient permissions for /etc/config",
  "code": "PERMISSION_DENIED"
}
```

The model reads the response and adapts.  
**Error is information, not failure.**

---

## See XCT in Action

<div align="center">
  <video width="800" controls>
    <source src="assets/xct-demo-01.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  **Watch how XCT maintains control while the model operates safely in production.**
</div>

---

## Core Rules

1. **No action without explicit tool invocation** — the model cannot execute directly
2. **One step per iteration** — atomic operations enable rollback and auditing
3. **The model is stateless between calls** — context is external, not embedded
4. **Errors are first-class signals** — they guide adaptation, not halt execution
5. **The system has veto power** — validation happens before execution

---

## Design Philosophy

XCT is built on three principles:

**1. Separation of Concerns**  
Thinking (model) and doing (tools) are separate responsibilities.

**2. Fail-Safe Defaults**  
Every action requires explicit approval. Uncertainty defaults to no-op.

**3. Observability First**  
Every state transition is logged, traceable, and reversible.

---

## Use Cases

XCT applies to environments where mistakes are costly:

- **Infrastructure automation** — cloud provisioning, configuration management
- **Database migrations** — schema changes, data transformations  
- **Financial systems** — transaction processing, reconciliation
- **Healthcare workflows** — patient data handling, clinical decision support
- **Compliance-heavy domains** — audit trails are mandatory

---

## Contributing

XCT is an open protocol. Contributions are welcome:
- Protocol extensions and improvements
- Reference implementations in different languages
- Case studies from production deployments

See `CONTRIBUTING.md` for guidelines.

---

## License

Apache 2.0

---

## Citation
```bibtex
@misc{xct2026,
  title={XCT: Execution Control Transfer for Safe LLM Integration},
  author={Pereira, André Luís Torres},
  year={2026},
  url={https://github.com/Tech-Tweakers/xct},
  note={A protocol for supervised LLM execution in production systems}
}
```

---

## Acknowledgments

XCT was developed through lessons learned deploying LLMs in production environments where downtime carries real cost. Thanks to the teams who provided feedback during early iterations.

**Questions?** Open an issue or start a discussion.
