import type { Question } from "../rules/calculationRisk";

type Props = {
  question: Question;
  step: number;
  totalSteps: number;
  selectedOptionId: string | null;
  currentRiskLabel: string;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoNext: boolean;
  canGoBack: boolean;
  isLastStep: boolean;
};

export default function QuestionStep({
  question,
  step,
  totalSteps,
  selectedOptionId,
  currentRiskLabel,
  onSelect,
  onNext,
  onBack,
  canGoNext,
  canGoBack,
  isLastStep,
}: Props) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <section className="card" aria-labelledby="question-title">
      <header className="headerRow">
        <div>
          Steg {step} av {totalSteps}
        </div>
        <div className="badge" aria-live="polite">
          Forløpig risikonivå: {currentRiskLabel}
        </div>
      </header>

      <h2 id="question-title">
        Spørsmål {step} : {question.title}
      </h2>
      {question.prompt ? <p className="prompt">{question.prompt}</p> : null}

      <form onSubmit={handleSubmit}>
        <fieldset className="options">
          <legend className="srOnly">Svaralternativer</legend>
          {question.options.map((opt) => (
            <label key={opt.id} className="option">
              <input
                type="radio"
                name={question.id}
                checked={selectedOptionId === opt.id}
                onChange={() => onSelect(opt.id)}
              />
              <span>{opt.text}</span>
            </label>
          ))}
        </fieldset>
        <div className="actions">
          <button type="button" onClick={onBack} disabled={!canGoBack}>
            Tilbake
          </button>
          <button type="submit" disabled={!canGoNext}>
            {isLastStep ? "Fullfør" : "Neste"}
          </button>
        </div>
      </form>
    </section>
  );
}
