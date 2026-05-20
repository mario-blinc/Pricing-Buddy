export function calculateScores(answers, questions) {
  let totalComplexity = 0
  let totalRisk = 0

  const maxComplexity = questions.reduce((sum, q) => {
    return sum + Math.max(...q.options.map(o => o.complexityPoints || 0))
  }, 0)

  const maxRisk = questions.reduce((sum, q) => {
    return sum + Math.max(...q.options.map(o => o.riskPoints || 0))
  }, 0)

  questions.forEach(q => {
    const answer = answers[q.id]
    if (!answer) return
    const option = q.options.find(o => o.value === answer)
    if (!option) return
    totalComplexity += option.complexityPoints || 0
    totalRisk += option.riskPoints || 0
  })

  const complexityScore = Math.min(100, Math.round((totalComplexity / maxComplexity) * 100))
  const riskScore = Math.min(100, Math.round((totalRisk / maxRisk) * 100))

  return { complexityScore, riskScore }
}

export function getComplexityLevel(score) {
  if (score >= 75) return 'extreme'
  if (score >= 50) return 'high'
  if (score >= 25) return 'medium'
  return 'low'
}

export function getRiskLevel(score) {
  if (score >= 75) return 'critical'
  if (score >= 50) return 'high'
  if (score >= 25) return 'medium'
  return 'low'
}

export function getScopeCreepRisk(answers) {
  const dm = answers.decision_makers || answers.revision_process
  const brief = answers.brief_clarity
  const revisions = answers.revision_rounds
  const timeline = answers.timeline

  let score = 0
  if (dm === '4+' || dm === 'unclear') score += 3
  else if (dm === '2-3' || dm === 'stakeholders') score += 1
  if (brief === 'none') score += 3
  else if (brief === 'vague') score += 2
  else if (brief === 'partial') score += 1
  if (revisions === '5+') score += 2
  if (timeline === 'asap') score += 2
  else if (timeline === 'urgent') score += 1

  if (score >= 5) return 'high'
  if (score >= 2) return 'medium'
  return 'low'
}
