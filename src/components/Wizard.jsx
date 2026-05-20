import { useState } from 'react'
import { getQuestions } from '../data/questions'

export default function Wizard({ category, service, onComplete, onBack }) {
  const questions = getQuestions(category, service.id)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [animKey, setAnimKey] = useState(0)

  const current = questions[step]
  const total = questions.length
  const progress = ((step) / total) * 100
  const selectedValue = answers[current.id]
  const canAdvance = !!selectedValue
  const isAddon = !!current.isAddon

  function handleAnswer(value) {
    setAnswers(prev => ({ ...prev, [current.id]: value }))
  }

  function handleNext() {
    if (!canAdvance) return
    if (step < total - 1) {
      setStep(s => s + 1)
      setAnimKey(k => k + 1)
    } else {
      onComplete(answers)
    }
  }

  function handleBack() {
    if (step === 0) {
      onBack()
    } else {
      setStep(s => s - 1)
      setAnimKey(k => k + 1)
    }
  }

  return (
    <div className="wizard-screen">
      <header className="wizard-header">
        <div className="header-inner">
          <button className="back-btn" onClick={handleBack}>
            ← {step === 0 ? 'Services' : 'Back'}
          </button>
          <div className="wizard-meta">
            <span className="wizard-service">{service.label}</span>
            <span className="wizard-step-count">{step + 1} / {total}</span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress + (1 / total) * 100}%` }} />
        </div>
      </header>

      <main className="wizard-main">
        <div className="question-wrap" key={animKey}>
          <div className="step-indicator">
            {isAddon
              ? <><span className="addon-badge">Add-on</span> affects total price</>
              : `Question ${step + 1} of ${total}`
            }
          </div>
          <h2 className="question-text">{current.question}</h2>
          {current.hint && (
            <p className="question-hint">{current.hint}</p>
          )}

          <div className="options-list">
            {current.options.map(option => (
              <button
                key={option.value}
                className={`option-card ${selectedValue === option.value ? 'option-card--selected' : ''}`}
                onClick={() => handleAnswer(option.value)}
              >
                <span className="option-radio">
                  {selectedValue === option.value ? '●' : '○'}
                </span>
                <span className="option-label">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <div className="wizard-footer">
        <div className="wizard-footer-inner">
          <button
            className={`cta-btn ${!canAdvance ? 'cta-btn--disabled' : ''}`}
            onClick={handleNext}
            disabled={!canAdvance}
          >
            {step === total - 1 ? 'Calculate Pricing →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}
