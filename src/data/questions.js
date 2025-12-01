// 스트레스 진단을 위한 16가지 질문
// 기반: PSS (Perceived Stress Scale), DASS-21, 한국형 스트레스 척도

export const stressQuestions = [
  {
    id: 1,
    category: "일상 스트레스",
    question: "최근 한 달간, 예상치 못한 일이 생겼을 때 얼마나 자주 당황하셨나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 2,
    category: "통제감",
    question: "최근 한 달간, 자신의 삶에서 중요한 일들을 통제할 수 없다고 느낀 적이 얼마나 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 3,
    category: "불안/긴장",
    question: "최근 한 달간, 신경이 예민하고 스트레스를 받는다고 느낀 적이 얼마나 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 4,
    category: "자기효능감",
    question: "최근 한 달간, 개인적인 문제들을 처리하는 자신의 능력에 얼마나 자신감을 느끼셨나요?",
    options: [
      { value: 4, label: "전혀 자신 없다" },
      { value: 3, label: "별로 자신 없다" },
      { value: 2, label: "보통이다" },
      { value: 1, label: "자신 있다" },
      { value: 0, label: "매우 자신 있다" }
    ]
  },
  {
    id: 5,
    category: "일상 대처",
    question: "최근 한 달간, 일이 자신의 뜻대로 진행되고 있다고 얼마나 느끼셨나요?",
    options: [
      { value: 4, label: "거의 그렇지 않다" },
      { value: 3, label: "가끔 그렇다" },
      { value: 2, label: "보통이다" },
      { value: 1, label: "자주 그렇다" },
      { value: 0, label: "매우 자주 그렇다" }
    ]
  },
  {
    id: 6,
    category: "감정 조절",
    question: "최근 한 달간, 해야 할 일들이 너무 많아서 감당하기 어렵다고 느낀 적이 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 7,
    category: "짜증/화",
    question: "최근 한 달간, 사소한 일에도 쉽게 짜증이 난 적이 얼마나 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 8,
    category: "수면",
    question: "최근 한 달간, 수면의 질은 어떠셨나요?",
    options: [
      { value: 0, label: "매우 좋다" },
      { value: 1, label: "좋은 편이다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "나쁜 편이다" },
      { value: 4, label: "매우 나쁘다" }
    ]
  },
  {
    id: 9,
    category: "신체 증상",
    question: "최근 한 달간, 스트레스로 인한 두통, 소화불량, 근육 긴장 등의 신체 증상이 있었나요?",
    options: [
      { value: 0, label: "전혀 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "종종 있다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "거의 매일 있다" }
    ]
  },
  {
    id: 10,
    category: "사회적 지지",
    question: "힘들 때 의지할 수 있는 사람(가족, 친구 등)이 있다고 느끼시나요?",
    options: [
      { value: 4, label: "전혀 없다" },
      { value: 3, label: "별로 없다" },
      { value: 2, label: "보통이다" },
      { value: 1, label: "있는 편이다" },
      { value: 0, label: "많이 있다" }
    ]
  },
  {
    id: 11,
    category: "미래 불안",
    question: "최근 한 달간, 미래에 대해 불안하거나 걱정이 된 적이 얼마나 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 12,
    category: "집중력",
    question: "최근 한 달간, 일이나 공부에 집중하기 어려웠던 적이 얼마나 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 13,
    category: "에너지",
    question: "최근 한 달간, 피로하거나 에너지가 없다고 느낀 적이 얼마나 있나요?",
    options: [
      { value: 0, label: "거의 없다" },
      { value: 1, label: "가끔 있다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "자주 있다" },
      { value: 4, label: "매우 자주 있다" }
    ]
  },
  {
    id: 14,
    category: "대처 방식",
    question: "스트레스를 받을 때, 어떻게 대처하는 편인가요?",
    options: [
      { value: 0, label: "문제를 직접 해결하려고 노력한다" },
      { value: 1, label: "누군가와 이야기를 나눈다" },
      { value: 2, label: "운동이나 취미활동을 한다" },
      { value: 3, label: "혼자 참고 넘긴다" },
      { value: 4, label: "특별한 방법이 없다" }
    ]
  },
  {
    id: 15,
    category: "자기 돌봄",
    question: "최근 한 달간, 자신을 위한 휴식이나 여가 시간을 가진 적이 있나요?",
    options: [
      { value: 0, label: "충분히 가졌다" },
      { value: 1, label: "적당히 가졌다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "부족했다" },
      { value: 4, label: "거의 없었다" }
    ]
  },
  {
    id: 16,
    category: "전반적 만족",
    question: "현재 자신의 삶에 대해 전반적으로 어떻게 느끼시나요?",
    options: [
      { value: 0, label: "매우 만족한다" },
      { value: 1, label: "만족하는 편이다" },
      { value: 2, label: "보통이다" },
      { value: 3, label: "불만족스러운 편이다" },
      { value: 4, label: "매우 불만족스럽다" }
    ]
  }
];

// 스트레스 관리 솔루션
export const stressManagementSolutions = {
  immediate: {
    title: "즉각적인 스트레스 해소법",
    solutions: [
      {
        name: "4-7-8 호흡법",
        description: "4초 들이마시고, 7초 참고, 8초 내쉬기를 3-4회 반복합니다.",
        benefit: "즉각적인 긴장 완화, 자율신경 안정"
      },
      {
        name: "점진적 근육 이완",
        description: "발부터 얼굴까지 각 근육을 5초간 긴장시킨 후 이완합니다.",
        benefit: "신체 긴장 해소, 불안 감소"
      },
      {
        name: "5-4-3-2-1 그라운딩",
        description: "5가지 보이는 것, 4가지 느껴지는 것, 3가지 들리는 것, 2가지 냄새, 1가지 맛에 집중합니다.",
        benefit: "현재 순간에 집중, 불안 감소"
      }
    ]
  },
  daily: {
    title: "일상적인 스트레스 관리",
    solutions: [
      {
        name: "규칙적인 운동",
        description: "주 3-5회, 30분 이상의 유산소 운동을 합니다.",
        benefit: "스트레스 호르몬 감소, 기분 개선"
      },
      {
        name: "충분한 수면",
        description: "매일 7-8시간의 수면을 취하고, 규칙적인 취침 시간을 유지합니다.",
        benefit: "심신 회복, 스트레스 저항력 강화"
      },
      {
        name: "마음챙김 명상",
        description: "매일 10-20분씩 호흡에 집중하며 명상합니다.",
        benefit: "마음 안정, 자기 인식 향상"
      },
      {
        name: "감사 일기",
        description: "매일 감사한 일 3가지를 기록합니다.",
        benefit: "긍정적 관점 강화, 행복감 증가"
      }
    ]
  },
  social: {
    title: "사회적 지지 강화",
    solutions: [
      {
        name: "대화 나누기",
        description: "신뢰할 수 있는 사람과 고민을 나눕니다.",
        benefit: "정서적 지지, 문제 해결의 새 관점"
      },
      {
        name: "사회적 활동 참여",
        description: "관심 있는 모임이나 커뮤니티 활동에 참여합니다.",
        benefit: "소속감, 사회적 연결감 강화"
      },
      {
        name: "도움 요청하기",
        description: "필요할 때 주변에 도움을 요청하는 연습을 합니다.",
        benefit: "지지 체계 활용, 부담 분산"
      }
    ]
  },
  professional: {
    title: "전문적 도움",
    solutions: [
      {
        name: "상담 서비스 이용",
        description: "심리상담사나 정신건강전문가의 도움을 받습니다.",
        benefit: "전문적 평가 및 맞춤형 지원"
      },
      {
        name: "스트레스 관리 프로그램",
        description: "체계적인 스트레스 관리 프로그램에 참여합니다.",
        benefit: "효과적인 대처 기술 습득"
      }
    ]
  },
  lifestyle: {
    title: "생활습관 개선",
    solutions: [
      {
        name: "카페인/알코올 조절",
        description: "카페인과 알코올 섭취를 줄입니다.",
        benefit: "수면의 질 향상, 불안 감소"
      },
      {
        name: "균형 잡힌 식사",
        description: "규칙적이고 영양가 있는 식사를 합니다.",
        benefit: "신체 건강 유지, 에너지 안정"
      },
      {
        name: "디지털 디톡스",
        description: "하루 일정 시간 스마트폰과 SNS를 내려놓습니다.",
        benefit: "정신적 휴식, 현실 집중"
      },
      {
        name: "자연과의 교류",
        description: "공원 산책, 자연 속에서 시간을 보냅니다.",
        benefit: "스트레스 호르몬 감소, 기분 개선"
      }
    ]
  }
};

export default stressQuestions;
