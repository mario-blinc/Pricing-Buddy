import { useState } from 'react'
import ServiceSelector from './components/ServiceSelector'
import Wizard from './components/Wizard'
import ResultsDashboard from './components/ResultsDashboard'
import { getQuestions } from './data/questions'
import { calculateScores, getComplexityLevel, getRiskLevel, getScopeCreepRisk } from './engines/scoringEngine'
import { calculatePricing, getPaymentStructure } from './engines/pricingEngine'
import { generateFlags, generateMarginWarnings, calculateClientFit, generateUpsells, generateChecklist } from './engines/resultsEngine'

export default function App() {
  const [screen, setScreen] = useState('selection')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)

  function handleServiceSelected(category, service) {
    setSelectedCategory(category)
    setSelectedService(service)
    setAnswers({})
    setResults(null)
    setScreen('wizard')
  }

  function handleWizardComplete(finalAnswers) {
    const questions = getQuestions(selectedCategory, selectedService.id)
    const { complexityScore, riskScore } = calculateScores(finalAnswers, questions)

    // Extract add-on selections and calculate total
    const addonItems = questions
      .filter(q => q.isAddon)
      .map(q => {
        const answer = finalAnswers[q.id]
        const option = q.options.find(o => o.value === answer)
        if (!option || !option.addonPrice) return null
        return { label: q.addonLabel, price: option.addonPrice }
      })
      .filter(Boolean)
    const addonTotal = addonItems.reduce((sum, item) => sum + item.price, 0)

    const pricing = calculatePricing({
      fixedPrice: selectedService.fixedPrice,
      fromPrice: selectedService.fromPrice,
      monthly: selectedService.monthly,
      minCommitment: selectedService.minCommitment,
      minDays: selectedService.minDays,
      maxDays: selectedService.maxDays,
      addonItems,
      addonTotal,
    })
    const paymentStructure = getPaymentStructure(riskScore)
    const flags = generateFlags(finalAnswers, selectedCategory, selectedService.id)
    const marginWarnings = generateMarginWarnings(finalAnswers, selectedService)
    const clientFit = calculateClientFit(finalAnswers)
    const upsells = generateUpsells(finalAnswers, selectedCategory, selectedService.id)
    const checklist = generateChecklist(finalAnswers, selectedCategory, selectedService, paymentStructure, riskScore)
    const scopeCreepRisk = getScopeCreepRisk(finalAnswers)

    setAnswers(finalAnswers)
    setResults({
      ...pricing,
      complexityScore,
      riskScore,
      complexityLevel: getComplexityLevel(complexityScore),
      riskLevel: getRiskLevel(riskScore),
      scopeCreepRisk,
      flags,
      marginWarnings,
      paymentStructure,
      clientFit,
      upsells,
      checklist,
    })
    setScreen('results')
  }

  function handleReset() {
    setScreen('selection')
    setSelectedCategory(null)
    setSelectedService(null)
    setAnswers({})
    setResults(null)
  }

  function handleRestartWizard() {
    setAnswers({})
    setResults(null)
    setScreen('wizard')
  }

  return (
    <div className="app">
      {screen === 'selection' && (
        <ServiceSelector onSelect={handleServiceSelected} />
      )}
      {screen === 'wizard' && (
        <Wizard
          category={selectedCategory}
          service={selectedService}
          onComplete={handleWizardComplete}
          onBack={handleReset}
        />
      )}
      {screen === 'results' && results && (
        <ResultsDashboard
          service={selectedService}
          category={selectedCategory}
          results={results}
          onReset={handleReset}
          onRestart={handleRestartWizard}
        />
      )}
    </div>
  )
}
