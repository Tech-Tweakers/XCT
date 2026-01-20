# XCT Protocol Specification (v0.1)

This document defines the minimal operational contract for systems implementing
the XCT (Execution Control Transfer) principle.

XCT defines who may execute actions, how control flows, and how errors are handled.
It does not define intelligence, planning quality, or tool correctness.

---

## 1. Scope

XCT defines:
- Execution authority boundaries
- Control flow between model, system, and tools
- Error semantics as first-class signals

XCT does NOT define:
- Model intelligence or reasoning quality
- Prompt design
- Tool safety or correctness
- Performance or latency guarantees

---

## 2. Core Concepts

- **Model**: Produces proposals. Never executes actions.
- **System**: Owns the execution loop and validation.
- **Tool**: Deterministic executor of actions.
- **Decision**: A single, atomic proposal.
- **Error**: A structured signal returned by the system.

---

## 3. Model Output Contract

The model MUST return exactly one of the following per iteration.

### 3.1 Propose next action

```json
{
  "next_step": {
    "tool": "string",
    "arguments": { "key": "value" },
    "goal": "string"
  }
}
```

**Rules:**
- Only one `next_step` per response
- No side effects outside tool execution
- No loop control by the model

### 3.2 Signal completion

```json
{
  "done": true,
  "message": "string"
}
```

---

## 4. System Response Contract

### 4.1 Success

```json
{
  "status": "success",
  "result": { "any": "json" }
}
```

### 4.2 Error

```json
{
  "status": "error",
  "message": "string",
  "details": { "optional": "json" }
}
```

Errors are expected and informational.

---

## 5. Execution Loop

1. System provides context to the model
2. Model returns one decision
3. System validates the proposal
4. If rejected, return error
5. If accepted, execute tool
6. Append result to context
7. Repeat until model returns `done`

The system MAY terminate the loop at any time.

---

## 6. Error Semantics

- Errors are first-class outputs
- Errors do not imply system failure
- Errors MUST be returned to the model
- The system MAY abort or request human intervention

---

## 7. Non-goals

- Autonomous execution
- Implicit retries
- Hidden state inside the model
- Self-modifying execution loops