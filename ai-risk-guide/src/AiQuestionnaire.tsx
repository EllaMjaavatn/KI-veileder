import { useMemo, useState } from "react";
import questionsData from "./data/questions.json";
import resultsData from "./data/results.json";
import {
  calculateRisk,
  type Question,
  type ResultCard,
  type RiskLevel,
} from "./rules/calculationRisk";
import QuestionStep from "./component/QuestionStep";
import ResultView from "./component/ResultView";

export default function AiQuestionnaire() {
  const questions = useMemo(() => questionsData.questions as Question[], []);
  const results = useMemo(
    () => resultsData.results as Record<RiskLevel, ResultCard>,
    [],
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);
  const question = questions[stepIndex];
  const [answersByQuestion, setAnswersByQuestion] = useState<
    Record<string, string>
  >({});

  const selectedOption = useMemo(() => {
    const selectedId = answersByQuestion[question.id];
    return question.options.find((o) => o.id === selectedId);
  }, [answersByQuestion, question]);

  const ranksSoFar = useMemo(() => {
    return questions
      .filter((q) => answersByQuestion[q.id])
      .map(
        (q) => q.options.find((o) => o.id === answersByQuestion[q.id])!.rank,
      );
  }, [answersByQuestion, questions]);

  const currentRisk = useMemo(
    () => calculateRisk(ranksSoFar) as RiskLevel,
    [ranksSoFar],
  );

  function onSelect(optionId: string) {
    const opt = question.options.find((o) => o.id === optionId);
    if (!opt) return;
    setAnswersByQuestion((prev) => ({ ...prev, [question.id]: optionId }));

    if (opt.rank === 4) {
      setDone(true);
    }
  }

  function onNext() {
    if (!answersByQuestion[question.id]) return;
    const isLast = stepIndex === questions.length - 1;
    if (isLast) {
      setDone(true);
      return;
    }
    setStepIndex((i) => i + 1);
  }

  function onBack() {
    if (stepIndex === 0) return;
    setStepIndex((i) => i - 1);
  }

  function onRestart() {
    setStepIndex(0);
    setAnswersByQuestion({});
    setDone(false);
  }

  // ---- RESULTATVISNING ----
  const finalRanks = questions
    .filter((q) => answersByQuestion[q.id])
    .map((q) => q.options.find((o) => o.id === answersByQuestion[q.id])!.rank);
  const finalRisk = calculateRisk(finalRanks) as RiskLevel;
  const card = results[finalRisk];

  if (done) {
    return (
      <main className="container">
        <header className="pageHeader">
          <h1>KI-veileder</h1>
        </header>
        <ResultView card={card} onRestart={onRestart} />
      </main>
    );
  }

  return (
    <main className="container">
      <header className="pageHeader">
        <h1>KI-veileder - Hvilke risikonivå er min KI-løsning?</h1>
        <div className="lead">
          <p>
            Dette er en forenklet veileder basert på KI-forordningens
            risikobaserte modell.
          </p>
          <p>Resultatet er veiledende og erstatter ikke juridisk vurdering.</p>
          <p>
            Formålet er å hjelpe virksomheter med å få en indikasjon på hvilke
            krav som mest sannsynlig gjelder for deres KI-løsning, og hvilke
            steg de bør ta videre.
          </p>
        </div>
      </header>
      <QuestionStep
        totalSteps={questions.length}
        step={stepIndex + 1}
        question={question}
        selectedOptionId={answersByQuestion[question.id] ?? null}
        onSelect={onSelect}
        onNext={onNext}
        onBack={onBack}
        canGoNext={!!selectedOption}
        canGoBack={stepIndex > 0}
        isLastStep={stepIndex === questions.length - 1}
        currentRiskLabel={results[currentRisk]?.title ?? currentRisk}
      />
    </main>
  );
}
