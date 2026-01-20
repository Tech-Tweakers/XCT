let done = false
const context: any[] = []

while (!done) {
  const decision = callModel(context)

  if (decision.done) {
    done = true
    break
  }

  const proposal = decision.next_step

  const validation = validate(proposal)
  if (!validation.ok) {
    context.push({
      status: "error",
      message: validation.reason
    })
    continue
  }

  try {
    const result = executeTool(proposal)
    context.push({
      status: "success",
      result
    })
  } catch (err: any) {
    context.push({
      status: "error",
      message: err.message
    })
  }
}