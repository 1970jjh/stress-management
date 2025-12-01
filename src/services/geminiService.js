// Gemini API Service for PITR Analysis
import { pitrInterpretationGuide, stressLevelGuide, copingCapacityGuide } from '../data/pitrInterpretation';
import { stressQuestions, stressManagementSolutions } from '../data/questions';

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// PITR 해석 가이드 요약 생성
const getPITRGuidePrompt = () => {
  return `
## PITR(빗속의 사람) 그림 해석 가이드

### 스트레스 지표 (그림에서 찾아야 할 요소)

1. **비 (Rain)** - 스트레스 환경
   - 비가 없음: 현실 회피, 스트레스 부정
   - 가는 비/보슬비: 낮은 스트레스
   - 보통 비: 중간 스트레스
   - 폭우/소나기: 높은 스트레스
   - 비가 인물에 직접 닿음: 보호받지 못함

2. **구름 (Clouds)** - 불안과 우울
   - 구름 없음: 낮은 불안
   - 큰 검은 구름: 우울감, 심리적 부담
   - 구름이 인물 바로 위: 압도적 스트레스

3. **웅덩이 (Puddles)** - 축적된 스트레스
   - 웅덩이 없음: 과거 스트레스 영향 적음
   - 인물이 웅덩이에 서 있음: 과거 문제에 갇힘

4. **번개** - 급성 위기 (있으면 매우 높은 스트레스)

### 대처 자원 지표

1. **우산** - 보호와 대처
   - 없음: 보호 수단 부족
   - 적절한 크기: 건강한 대처 능력
   - 너무 작음: 대처 자원 불충분
   - 손상됨: 효과적이지 않은 대처

2. **옷/비옷** - 자기 보호
   - 비옷/장화: 준비성 있음
   - 가벼운 옷: 취약함

3. **피난처** (건물, 나무 아래 등) - 안전한 공간, 지지 체계

### 인물 특성

1. **크기**
   - 매우 작음: 낮은 자존감, 위축
   - 적절함: 건강한 자아상
   - 비에 비해 작음: 무력감

2. **위치**
   - 중앙: 안정적 심리
   - 왼쪽: 과거 지향
   - 오른쪽: 미래 지향

3. **표정**
   - 미소: 긍정적 대처
   - 무표정: 감정 억제
   - 슬픔/울음: 정서적 고통
   - 얼굴 생략: 정체성 문제

4. **자세**
   - 똑바로/걷는 중: 능동적 대처
   - 웅크림: 위축감
   - 달리기: 회피 성향

5. **지면선**
   - 없음: 불안정감, 현실 연결 부족
   - 명확함: 안정감

6. **선의 특성**
   - 희미함: 낮은 에너지
   - 강하고 진함: 불안, 긴장
   - 떨림: 스트레스
`;
};

// 분석 프롬프트 생성
const createAnalysisPrompt = (answers) => {
  // 설문 결과 요약
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = stressQuestions.length * 4;
  const stressPercentage = Math.round((totalScore / maxScore) * 100);

  const answersDetail = stressQuestions.map(q => {
    const answer = answers[q.id];
    const selectedOption = q.options.find(opt => opt.value === answer);
    return `- ${q.category}: ${selectedOption?.label || '미응답'}`;
  }).join('\n');

  return `
당신은 전문 심리상담사이자 PITR(Person in the Rain, 빗속의 사람) 그림 검사 전문가입니다.
사용자가 제출한 '빗속의 사람' 그림과 스트레스 설문 결과를 종합적으로 분석해주세요.

${getPITRGuidePrompt()}

## 사용자 설문 결과
스트레스 점수: ${totalScore}/${maxScore} (${stressPercentage}%)

${answersDetail}

## 분석 요청

위 PITR 해석 가이드를 바탕으로 업로드된 그림을 상세히 분석하고, 설문 결과와 종합하여 다음 형식의 JSON으로 응답해주세요:

{
  "drawingAnalysis": {
    "overview": "그림의 전체적인 인상과 주요 특징 (2-3문장)",
    "stressIndicators": {
      "rain": {
        "observed": "관찰된 비의 특성 설명",
        "interpretation": "해석"
      },
      "clouds": {
        "observed": "관찰된 구름의 특성",
        "interpretation": "해석"
      },
      "puddles": {
        "observed": "웅덩이 유무 및 특성",
        "interpretation": "해석"
      },
      "additionalStressors": "기타 스트레스 요소 (번개, 바람 등)"
    },
    "resourceIndicators": {
      "umbrella": {
        "observed": "우산의 유무, 크기, 상태",
        "interpretation": "해석"
      },
      "clothing": {
        "observed": "옷차림 설명",
        "interpretation": "해석"
      },
      "shelter": {
        "observed": "피난처 유무",
        "interpretation": "해석"
      }
    },
    "figureAnalysis": {
      "size": "인물 크기 분석",
      "position": "인물 위치 분석",
      "expression": "표정 분석",
      "posture": "자세 분석",
      "action": "행동 분석"
    },
    "technicalElements": {
      "groundLine": "지면선 분석",
      "lineQuality": "선의 특성 분석",
      "overallComposition": "전체 구도 분석"
    }
  },
  "overallAssessment": {
    "stressLevel": {
      "level": "낮음/중간/높음/매우 높음 중 하나",
      "percentage": 숫자 (0-100),
      "description": "스트레스 수준에 대한 설명"
    },
    "copingCapacity": {
      "level": "낮음/중간/높음/매우 높음 중 하나",
      "percentage": 숫자 (0-100),
      "description": "대처 능력에 대한 설명"
    },
    "emotionalState": "현재 감정 상태 요약",
    "keyFindings": ["핵심 발견 1", "핵심 발견 2", "핵심 발견 3"]
  },
  "psychologicalProfile": {
    "strengths": ["강점 1", "강점 2"],
    "challenges": ["도전 과제 1", "도전 과제 2"],
    "copingStyle": "대처 스타일 설명",
    "supportNeeds": "필요한 지원 유형"
  },
  "recommendations": {
    "immediate": ["즉시 실천할 수 있는 조언 1", "조언 2"],
    "shortTerm": ["단기적으로 도움이 될 활동 1", "활동 2"],
    "longTerm": ["장기적인 개선을 위한 제안 1", "제안 2"],
    "professional": "전문적 도움이 필요한 경우 안내"
  },
  "personalizedMessage": "사용자에게 전하는 따뜻하고 격려가 되는 개인화된 메시지 (3-4문장)"
}

중요:
1. 그림에서 실제로 관찰되는 요소만 분석하세요
2. 과도한 병리화를 피하고 균형 잡힌 해석을 제공하세요
3. 설문 결과와 그림 분석을 연관지어 종합적인 관점을 제시하세요
4. 반드시 유효한 JSON 형식으로 응답하세요
`;
};

// Gemini API 호출
export async function analyzeWithGemini(imageData, answers, apiKey) {
  if (!apiKey) {
    // API 키가 없으면 모의 결과 반환
    return generateMockResult(answers);
  }

  try {
    // Base64 이미지 데이터 추출
    const base64Image = imageData.split(',')[1];

    const requestBody = {
      contents: [{
        parts: [
          {
            text: createAnalysisPrompt(answers)
          },
          {
            inline_data: {
              mime_type: "image/jpeg",
              data: base64Image
            }
          }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      }
    };

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const textContent = data.candidates[0]?.content?.parts[0]?.text;

    if (!textContent) {
      throw new Error('No response from API');
    }

    // JSON 파싱 시도
    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    throw new Error('Failed to parse API response');
  } catch (error) {
    console.error('Gemini API error:', error);
    // 오류 시 모의 결과 반환
    return generateMockResult(answers);
  }
}

// 모의 결과 생성 (API 키 없거나 오류 시)
function generateMockResult(answers) {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = stressQuestions.length * 4;
  const stressPercentage = Math.round((totalScore / maxScore) * 100);
  const copingPercentage = 100 - stressPercentage;

  let stressLevel, copingLevel;

  if (stressPercentage <= 30) stressLevel = "낮음";
  else if (stressPercentage <= 50) stressLevel = "중간";
  else if (stressPercentage <= 70) stressLevel = "높음";
  else stressLevel = "매우 높음";

  if (copingPercentage <= 30) copingLevel = "낮음";
  else if (copingPercentage <= 50) copingLevel = "중간";
  else if (copingPercentage <= 70) copingLevel = "높음";
  else copingLevel = "매우 높음";

  return {
    drawingAnalysis: {
      overview: "그림에서 비와 인물의 관계가 현재 스트레스 상황과 대처 방식을 잘 보여주고 있습니다. 전체적인 구도와 요소들이 내면의 심리 상태를 반영하고 있습니다.",
      stressIndicators: {
        rain: {
          observed: "그림에 표현된 비의 양과 방향",
          interpretation: "현재 느끼고 있는 외부 스트레스의 정도를 나타냅니다."
        },
        clouds: {
          observed: "구름의 존재와 크기",
          interpretation: "심리적 부담이나 걱정의 정도를 반영합니다."
        },
        puddles: {
          observed: "웅덩이 표현 여부",
          interpretation: "축적된 감정이나 과거 경험의 영향을 보여줍니다."
        },
        additionalStressors: "기타 환경 요소들이 전체적인 스트레스 맥락을 형성합니다."
      },
      resourceIndicators: {
        umbrella: {
          observed: "우산의 존재와 상태",
          interpretation: "스트레스에 대한 보호 기제와 대처 능력을 상징합니다."
        },
        clothing: {
          observed: "인물의 옷차림",
          interpretation: "자기 보호와 외부 세계에 대한 준비 정도를 나타냅니다."
        },
        shelter: {
          observed: "피난처나 보호 공간",
          interpretation: "안전한 공간이나 지지 체계의 존재를 의미합니다."
        }
      },
      figureAnalysis: {
        size: "인물의 크기는 자아상과 자신감의 정도를 반영합니다.",
        position: "그림 속 위치는 심리적 안정감과 시간적 지향성을 보여줍니다.",
        expression: "표정은 현재의 감정 상태를 직접적으로 드러냅니다.",
        posture: "자세는 스트레스에 대한 태도와 에너지 수준을 나타냅니다.",
        action: "인물의 행동은 스트레스 상황에서의 대처 방식을 보여줍니다."
      },
      technicalElements: {
        groundLine: "지면선은 현실과의 연결감과 안정감을 상징합니다.",
        lineQuality: "선의 특성은 내면의 에너지와 감정 상태를 반영합니다.",
        overallComposition: "전체 구도는 심리적 균형과 세계관을 보여줍니다."
      }
    },
    overallAssessment: {
      stressLevel: {
        level: stressLevel,
        percentage: stressPercentage,
        description: `현재 ${stressLevel} 수준의 스트레스를 경험하고 계십니다. ${stressPercentage > 50 ? '적극적인 스트레스 관리가 필요한 시점입니다.' : '현재 관리 가능한 수준이지만, 지속적인 자기 돌봄이 중요합니다.'}`
      },
      copingCapacity: {
        level: copingLevel,
        percentage: copingPercentage,
        description: `대처 능력은 ${copingLevel} 수준으로 평가됩니다. ${copingPercentage > 50 ? '기본적인 대처 자원을 갖추고 계십니다.' : '대처 자원을 강화하는 것이 도움이 될 수 있습니다.'}`
      },
      emotionalState: "현재 일정 수준의 심리적 부담을 느끼고 있으며, 이에 대응하기 위한 자원과 전략이 필요한 상태입니다.",
      keyFindings: [
        "스트레스 상황에 대한 인식이 있으며, 이를 표현할 수 있는 능력을 갖추고 있습니다.",
        "대처 자원의 강화가 필요하며, 새로운 스트레스 관리 전략을 배우면 도움이 될 것입니다.",
        "사회적 지지 체계를 활용하고 강화하는 것이 중요합니다."
      ]
    },
    psychologicalProfile: {
      strengths: [
        "자신의 상태를 인식하고 도움을 구하려는 적극적인 태도",
        "스트레스 상황을 표현하고 소통할 수 있는 능력"
      ],
      challenges: [
        "일상적인 스트레스 요인에 대한 효과적인 대처 전략 개발",
        "자기 돌봄과 휴식의 시간 확보"
      ],
      copingStyle: "스트레스 상황에서 문제 해결과 정서적 대처를 병행하는 스타일을 보입니다.",
      supportNeeds: "규칙적인 자기 관리 루틴과 신뢰할 수 있는 지지 체계가 필요합니다."
    },
    recommendations: {
      immediate: [
        "하루 10분 깊은 호흡 명상으로 마음 안정시키기",
        "가벼운 스트레칭이나 산책으로 몸의 긴장 풀기"
      ],
      shortTerm: [
        "규칙적인 수면 패턴 만들기 (매일 같은 시간에 취침/기상)",
        "주 3회 이상 30분 운동하기",
        "감사 일기 쓰기 - 매일 좋았던 일 3가지 기록"
      ],
      longTerm: [
        "스트레스 관리 워크샵이나 마음챙김 프로그램 참여 고려",
        "취미 활동이나 자기 개발을 위한 시간 정기적으로 확보",
        "건강한 인간관계 형성과 유지에 투자하기"
      ],
      professional: stressPercentage > 70
        ? "스트레스 수준이 높게 나타났습니다. 전문 상담사와의 상담을 통해 맞춤형 도움을 받으시는 것을 권장드립니다."
        : "현재 수준에서는 자기 관리로 충분할 수 있지만, 필요시 전문가의 도움을 받는 것도 좋은 선택입니다."
    },
    personalizedMessage: `이 검사에 참여해 주셔서 감사합니다. 자신의 심리 상태에 관심을 갖고 살펴보는 것 자체가 매우 중요한 첫걸음입니다. 누구나 스트레스를 경험하며, 그것을 인식하고 관리하려는 노력이 중요합니다. 오늘 확인하신 결과를 바탕으로 작은 변화부터 시작해보세요. 당신은 충분히 잘 해나갈 수 있습니다. 필요할 때는 주변의 도움을 받는 것을 두려워하지 마세요.`
  };
}

export default analyzeWithGemini;
