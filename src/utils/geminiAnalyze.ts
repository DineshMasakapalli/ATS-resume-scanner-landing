export interface AnalysisResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  missing_keywords: string[];
  improved_bullets: string[];
  isMock?: boolean;
}

const SYSTEM_PROMPT = `You are an expert ATS (Applicant Tracking System) resume analyzer.
You are given the raw text extracted from a user's resume PDF.

Analyze the resume for ATS compatibility and return a JSON object with these exact keys:

- "score": integer 0-100 representing overall ATS compatibility
- "strengths": array of strings — what the resume does well for ATS
- "weaknesses": array of strings — what hurts the resume's ATS score
- "missing_keywords": array of strings — common ATS keywords that are absent or underused
- "improved_bullets": array of strings — rewritten versions of weak bullet points using strong action verbs and quantifiable results

Scoring guidelines:
- 80-100: well-structured, keyword-rich, good action verbs, quantifiable results
- 50-79: passes some ATS filters but has gaps in keywords, formatting, or impact
- 0-49: major issues — poor formatting, missing keywords, weak verbs, no quantification

Return ONLY valid JSON. No markdown, no explanation, no code fences.`;

export function getApiKeyPreview(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  if (!key) return 'Not configured';
  return key.slice(0, 10) + '…';
}

function generateMockResult(): AnalysisResult {
  const score = Math.floor(Math.random() * 21) + 65;
  return {
    score,
    isMock: true,
    strengths: [
      'Resume uses a standard section structure (Experience, Education, Skills).',
      'Contact information is present and easy to locate.',
      'Bullet-point format in experience section is ATS-readable.',
    ],
    weaknesses: [
      'Some bullet points lack quantifiable results (numbers, percentages, metrics).',
      'Action verbs could be stronger — consider replacing passive phrases.',
      'Skills section may not match common ATS keyword filters for your target role.',
    ],
    missing_keywords: [
      'Stakeholder management',
      'Cross-functional collaboration',
      'Data-driven decision making',
      'Project lifecycle',
      'KPI tracking',
    ],
    improved_bullets: [
      'Spearheaded a cross-functional initiative that reduced processing time by 30%, saving 15 hours per week.',
      'Managed stakeholder relationships across 5 departments, delivering projects on time with 95% satisfaction rate.',
      'Implemented data-driven reporting dashboards that improved decision-making speed by 40%.',
    ],
  };
}

export async function analyzeResume(resumeText: string): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

  if (!apiKey) {
    console.warn('[Gemini] No API key found, using mock result.');
    return generateMockResult();
  }

  const model = 'gemini-1.5-flash-latest';
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=` +
    encodeURIComponent(apiKey);

  const body = {
    contents: [
      {
        parts: [
          { text: SYSTEM_PROMPT },
          { text: `Here is the resume text:\n\n${resumeText}` },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      responseMimeType: 'application/json',
    },
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.error('[Gemini] Network error:', err);
    return generateMockResult();
  }

  if (!res.ok) {
    const errText = await res.text();
    let googleMessage = errText;

    try {
      const errJson = JSON.parse(errText);
      googleMessage = errJson?.error?.message ?? errText;
    } catch {
      // not JSON, use raw text
    }

    console.error(`[Gemini] API error ${res.status}:`, googleMessage);

    // For 400/403/429, show the exact Google error to the user
    if (res.status === 400 || res.status === 403 || res.status === 429) {
      throw new Error(`Gemini API error (${res.status}): ${googleMessage}`);
    }

    // For other errors, fall back to mock
    console.warn('[Gemini] Falling back to mock result.');
    return generateMockResult();
  }

  const data = await res.json();

  // Check for blocked content / safety filters
  const candidate = data?.candidates?.[0];
  if (candidate?.finishReason === 'SAFETY') {
    console.warn('[Gemini] Content blocked by safety filters, using mock.');
    return generateMockResult();
  }

  const text: string | undefined = candidate?.content?.parts?.[0]?.text;

  if (!text) {
    console.warn('[Gemini] Empty response, using mock.');
    return generateMockResult();
  }

  try {
    const parsed = JSON.parse(text) as AnalysisResult;

    return {
      score: Math.max(0, Math.min(100, Math.round(parsed.score))),
      strengths: parsed.strengths ?? [],
      weaknesses: parsed.weaknesses ?? [],
      missing_keywords: parsed.missing_keywords ?? [],
      improved_bullets: parsed.improved_bullets ?? [],
    };
  } catch {
    console.warn('[Gemini] JSON parse failed, using mock.');
    return generateMockResult();
  }
}
