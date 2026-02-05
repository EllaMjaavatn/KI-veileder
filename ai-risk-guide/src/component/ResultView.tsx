import type { ResultCard } from "../rules/calculationRisk";

export default function ResultView(props: {
  card: ResultCard;
  onRestart: () => void;
}) {
  const { card } = props;

  return (
    <div className="container">
      <header className="header">
        <h1>Resultat</h1>
      </header>

      <main className="card">
        <h2>{card.title}</h2>
        <p className="lead">{card.summary}</p>
        {card.examples?.length ? (
          <>
            <h3>Eksempler</h3>
            <ul>
              {card.examples.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </>
        ) : null}

        {card.requirementsExamples?.length ? (
          <>
            <h3>Typiske krav</h3>
            <ul>
              {card.requirementsExamples.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </>
        ) : null}

        <h3>Virksomheten bør</h3>
        <ul>
          {card.recommendation.map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>

        <h3>Videre lesning</h3>
        <ul>
          {card.links.map((l, i) => (
            <li key={i}>
              <a href={l.url} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button onClick={props.onRestart}>Start på nytt</button>
      </main>
    </div>
  );
}
