
export type RiskLevel = "unsure" | "minimal" | "limited" | "high" | "unacceptable";

export type Option = {
  id: string;
  text: string;
  rank: number;
  riskId?: RiskLevel;
};

export type Question = {
  id: string;
  step: number;
  title: string;
  prompt?: string;
  options: Option[];
};

export type ResultCard = {
  title: string;
  summary: string;
  recommendation: string[];
  links: { url: string; label: string }[];
  examples?: string[];
  requirementsExamples?: string[];
};


export const RISK: Record<RiskLevel, { label:string; rank:number}> = {
    unsure: { label: "Usikker", rank: 0 },
    minimal: { label: "Minimal eller ingen risiko", rank: 1 },
    limited: { label: "Begrenset risiko", rank: 2 },
    high: { label: "Høyrisiko", rank: 3 },
    unacceptable: { label: "Uakseptabel risiko (forbudt KI)", rank: 4 },
}

const rank: Record<RiskLevel,number> = {
    unsure: 0,
    minimal: 1,
    limited: 2,
    high: 3,
    unacceptable: 4,
}

// Returnerer den "høyeste" risikonivået
export const compareRisk = (a: RiskLevel, b: RiskLevel): RiskLevel => 
rank[a] > rank[b] ? a : b;

// Map fra tall-rank til RiskLevel
export function rankToRiskLevel(value: number): RiskLevel {
    if (value >= 4) return "unacceptable";
    if (value >= 3) return "high";
    if (value >= 2) return "limited";
    if (value >= 1) return "minimal";
    return "unsure";
}

export function calculateRisk(ranks: number[]): RiskLevel {
    if (!ranks || ranks.length === 0) return "minimal";

    const max = Math.max(...ranks);
    return rankToRiskLevel(max);
}

export function calculateRiskByReducing(ranks: number[]): RiskLevel {
    if (!ranks || ranks.length === 0) return "minimal";

    return ranks.map(rankToRiskLevel).reduce((acc, curr)=> compareRisk(curr, acc), "minimal");
}
