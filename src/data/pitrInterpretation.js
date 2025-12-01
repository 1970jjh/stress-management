// PITR (Person in the Rain) 그림 해석 기준
// 참고: Lack's PITR scoring scale (1996) - 35 items (S1-S16, R1-R19)

export const pitrInterpretationGuide = {
  // 스트레스 지표 (Stress Indicators)
  stressIndicators: {
    rain: {
      title: "비 (Rain) - 스트레스 환경",
      description: "비는 스트레스, 외부 압력, 어려운 환경을 상징합니다.",
      criteria: [
        { condition: "비가 없음", interpretation: "현실 회피 또는 스트레스 부정, 때로는 규칙에 대한 저항을 나타낼 수 있습니다.", stress: "중간" },
        { condition: "가는 비/보슬비", interpretation: "가벼운 스트레스 상황. 관리 가능한 수준의 압박감을 느끼고 있습니다.", stress: "낮음" },
        { condition: "보통 비", interpretation: "일상적인 스트레스 수준. 적절한 대처가 필요합니다.", stress: "중간" },
        { condition: "폭우/소나기", interpretation: "강한 스트레스 상황. 현재 큰 압박감이나 위기 상황에 처해 있을 수 있습니다.", stress: "높음" },
        { condition: "비가 인물에 직접 닿음", interpretation: "스트레스로부터 보호받지 못하고 있다고 느끼며, 직접적인 영향을 받고 있습니다.", stress: "높음" },
        { condition: "비가 한 방향에서만 옴", interpretation: "특정 출처(사람, 상황)로부터의 스트레스를 경험하고 있습니다.", stress: "중간" }
      ]
    },
    clouds: {
      title: "구름 (Clouds) - 불안과 우울",
      description: "구름은 불안, 걱정, 우울한 감정을 상징합니다.",
      criteria: [
        { condition: "구름 없음", interpretation: "현재 특별한 걱정거리가 없거나, 불안을 인식하지 못하고 있습니다.", stress: "낮음" },
        { condition: "작은 구름", interpretation: "가벼운 걱정이나 불안이 있습니다.", stress: "낮음" },
        { condition: "큰 검은 구름", interpretation: "우울감, 무거운 심리적 부담, 미래에 대한 불안을 느끼고 있습니다.", stress: "높음" },
        { condition: "구름이 인물 바로 위에", interpretation: "압도적인 스트레스, 위협감을 느끼고 있습니다.", stress: "높음" },
        { condition: "여러 개의 구름", interpretation: "다양한 걱정거리와 불안 요소가 있습니다.", stress: "중간" }
      ]
    },
    puddles: {
      title: "웅덩이 (Puddles) - 축적된 스트레스",
      description: "웅덩이는 축적된 스트레스, 과거의 트라우마, 해결되지 않은 감정을 상징합니다.",
      criteria: [
        { condition: "웅덩이 없음", interpretation: "과거 스트레스가 현재에 크게 영향을 미치지 않습니다.", stress: "낮음" },
        { condition: "작은 웅덩이", interpretation: "약간의 미해결 감정이나 과거 경험이 있습니다.", stress: "낮음" },
        { condition: "큰 웅덩이", interpretation: "축적된 스트레스나 해결되지 않은 감정적 문제가 있습니다.", stress: "중간" },
        { condition: "인물이 웅덩이에 서 있음", interpretation: "과거의 문제에 갇혀 있거나, 축적된 스트레스에 영향을 받고 있습니다.", stress: "높음" },
        { condition: "물이 튀는 웅덩이", interpretation: "스트레스가 현재 진행 중이며 영향을 미치고 있습니다.", stress: "높음" }
      ]
    },
    lightning: {
      title: "번개 (Lightning) - 급성 위기",
      description: "번개는 갑작스러운 위기, 충격적 사건, 급성 스트레스를 상징합니다.",
      criteria: [
        { condition: "번개 있음", interpretation: "급성 위기 상황이나 갑작스러운 스트레스 요인이 있습니다. 즉각적인 도움이 필요할 수 있습니다.", stress: "매우 높음" }
      ]
    },
    wind: {
      title: "바람 (Wind) - 외부 압력",
      description: "바람은 외부로부터의 압력, 통제할 수 없는 상황을 상징합니다.",
      criteria: [
        { condition: "강한 바람 표현", interpretation: "외부 압력에 휘둘리고 있다고 느끼며, 상황을 통제하기 어려워합니다.", stress: "높음" },
        { condition: "비가 옆으로 내림", interpretation: "특정 방향으로부터 지속적인 압력을 받고 있습니다.", stress: "중간" }
      ]
    }
  },

  // 대처 자원 지표 (Resource Indicators)
  resourceIndicators: {
    umbrella: {
      title: "우산 (Umbrella) - 보호와 대처",
      description: "우산은 스트레스에 대한 방어 기제, 대처 능력을 상징합니다.",
      criteria: [
        { condition: "우산 없음", interpretation: "보호 수단이 부족하거나, 스트레스 대처 자원이 제한적입니다.", resource: "낮음" },
        { condition: "적절한 크기의 우산", interpretation: "건강한 대처 능력을 가지고 있으며, 스트레스를 관리할 수 있습니다.", resource: "높음" },
        { condition: "너무 작은 우산", interpretation: "대처 자원이 스트레스에 비해 불충분합니다.", resource: "낮음" },
        { condition: "너무 큰 우산", interpretation: "과도한 방어 기제, 지나친 자기 보호 성향이 있을 수 있습니다.", resource: "중간" },
        { condition: "손상된/찢어진 우산", interpretation: "대처 방법이 효과적이지 않거나, 지쳐있는 상태입니다.", resource: "낮음" },
        { condition: "우산을 들고 있지만 비를 맞음", interpretation: "대처 방법이 있지만 효과적으로 사용하지 못하고 있습니다.", resource: "중간" }
      ]
    },
    clothing: {
      title: "옷/비옷 (Clothing) - 자기 보호",
      description: "옷은 자기 보호, 사회적 페르소나, 외부와의 경계를 상징합니다.",
      criteria: [
        { condition: "비옷/레인코트", interpretation: "추가적인 보호 수단을 갖추고 있으며, 준비성이 있습니다.", resource: "높음" },
        { condition: "적절한 옷차림", interpretation: "상황에 맞는 대응을 할 수 있습니다.", resource: "중간" },
        { condition: "가벼운 옷/노출", interpretation: "취약하게 느끼거나, 보호가 부족합니다.", resource: "낮음" },
        { condition: "장화", interpretation: "실용적인 대처 능력, 준비성이 있습니다.", resource: "높음" }
      ]
    },
    shelter: {
      title: "피난처 (Shelter) - 안전한 공간",
      description: "건물, 나무 아래 등 피난처는 안전한 공간, 지지 체계를 상징합니다.",
      criteria: [
        { condition: "건물/집으로 향함", interpretation: "안전한 공간으로 돌아가려는 욕구, 지지 체계가 있습니다.", resource: "높음" },
        { condition: "나무 아래", interpretation: "자연스러운 피난처를 찾고 있으며, 일시적인 보호를 받고 있습니다.", resource: "중간" },
        { condition: "피난처가 전혀 없음", interpretation: "안전한 공간이 부족하거나, 도움을 요청하기 어려워합니다.", resource: "낮음" }
      ]
    }
  },

  // 인물 특성 (Figure Characteristics)
  figureCharacteristics: {
    size: {
      title: "인물 크기 (Figure Size) - 자아상",
      description: "인물의 크기는 자아상, 자신감, 환경과의 관계를 나타냅니다.",
      criteria: [
        { condition: "아주 작은 인물", interpretation: "낮은 자존감, 위축감, 환경에 압도당하는 느낌이 있습니다.", significance: "주의 필요" },
        { condition: "적절한 크기", interpretation: "건강한 자아상을 가지고 있습니다.", significance: "긍정적" },
        { condition: "매우 큰 인물", interpretation: "자기 과시 성향이나, 보상적 자존감을 나타낼 수 있습니다.", significance: "관찰 필요" },
        { condition: "비에 비해 작은 인물", interpretation: "스트레스에 압도당하는 느낌, 무력감을 경험하고 있습니다.", significance: "주의 필요" }
      ]
    },
    position: {
      title: "인물 위치 (Position) - 심리적 위치",
      description: "그림 속 인물의 위치는 심리적 상태와 시간 지향성을 나타냅니다.",
      criteria: [
        { condition: "중앙", interpretation: "안정적인 심리 상태, 균형 잡힌 관점을 가지고 있습니다.", significance: "긍정적" },
        { condition: "왼쪽 치우침", interpretation: "과거 지향적, 내향적 성향이 있습니다.", significance: "관찰 필요" },
        { condition: "오른쪽 치우침", interpretation: "미래 지향적, 외향적 성향이 있습니다.", significance: "관찰 필요" },
        { condition: "아래쪽", interpretation: "현실적, 안정을 추구하지만 우울감이 있을 수 있습니다.", significance: "관찰 필요" },
        { condition: "위쪽", interpretation: "이상주의적, 현실과의 괴리감이 있을 수 있습니다.", significance: "관찰 필요" }
      ]
    },
    expression: {
      title: "표정 (Expression) - 감정 상태",
      description: "얼굴 표정은 현재의 감정 상태를 직접적으로 반영합니다.",
      criteria: [
        { condition: "미소/행복한 표정", interpretation: "긍정적인 대처 태도, 스트레스 속에서도 희망을 유지합니다.", significance: "긍정적" },
        { condition: "무표정", interpretation: "감정 억제, 상황에 대한 무관심 또는 정서적 마비가 있을 수 있습니다.", significance: "관찰 필요" },
        { condition: "슬픈/우는 표정", interpretation: "슬픔, 우울감을 경험하고 있습니다.", significance: "주의 필요" },
        { condition: "화난 표정", interpretation: "분노, 좌절감을 느끼고 있습니다.", significance: "관찰 필요" },
        { condition: "얼굴 생략", interpretation: "정체성 문제, 대인관계 어려움이 있을 수 있습니다.", significance: "주의 필요" }
      ]
    },
    posture: {
      title: "자세 (Posture) - 태도와 에너지",
      description: "인물의 자세는 스트레스에 대한 태도와 에너지 수준을 나타냅니다.",
      criteria: [
        { condition: "똑바로 서 있음", interpretation: "스트레스에 당당히 맞서고 있으며, 회복력이 있습니다.", significance: "긍정적" },
        { condition: "걷고 있음", interpretation: "능동적인 대처, 상황을 헤쳐나가려는 의지가 있습니다.", significance: "긍정적" },
        { condition: "웅크림/숙임", interpretation: "보호적 자세, 위축감, 스트레스에 압도당함을 느끼고 있습니다.", significance: "주의 필요" },
        { condition: "달리고 있음", interpretation: "스트레스로부터 도망치려는 경향, 회피 성향이 있습니다.", significance: "관찰 필요" },
        { condition: "누워있음", interpretation: "무력감, 포기, 심한 피로감이 있을 수 있습니다.", significance: "주의 필요" }
      ]
    },
    action: {
      title: "행동 (Action) - 대처 방식",
      description: "인물이 무엇을 하고 있는지는 스트레스 대처 방식을 보여줍니다.",
      criteria: [
        { condition: "우산을 쓰고 걸어감", interpretation: "적극적이고 건강한 대처를 하고 있습니다.", significance: "긍정적" },
        { condition: "비를 즐기는 듯함", interpretation: "스트레스를 긍정적으로 받아들이거나, 현실 부정이 있을 수 있습니다.", significance: "관찰 필요" },
        { condition: "서서 아무것도 안 함", interpretation: "수동적 태도, 무력감, 어떻게 해야 할지 모르는 상태입니다.", significance: "관찰 필요" },
        { condition: "울고 있음", interpretation: "정서적 고통, 도움이 필요한 상태입니다.", significance: "주의 필요" }
      ]
    }
  },

  // 추가 요소 (Additional Elements)
  additionalElements: {
    ground: {
      title: "지면 (Ground Line) - 현실 기반",
      description: "지면선은 현실감, 안정감, 기반을 상징합니다.",
      criteria: [
        { condition: "지면선 없음", interpretation: "불안정감, 현실과의 연결 부족, 기반이 없다고 느낍니다.", significance: "주의 필요" },
        { condition: "명확한 지면선", interpretation: "현실적 기반, 안정감이 있습니다.", significance: "긍정적" },
        { condition: "흔들리는 지면선", interpretation: "불확실한 기반, 불안정한 상황에 있습니다.", significance: "관찰 필요" }
      ]
    },
    environment: {
      title: "주변 환경 (Environment) - 지지 체계",
      description: "나무, 건물, 다른 사람 등은 지지 체계와 사회적 환경을 상징합니다.",
      criteria: [
        { condition: "다른 사람 있음", interpretation: "사회적 지지 체계가 있거나 필요로 합니다.", significance: "긍정적" },
        { condition: "혼자만 있음", interpretation: "고립감을 느끼거나, 독립적인 대처를 합니다.", significance: "관찰 필요" },
        { condition: "자연 요소 (나무 등)", interpretation: "자연과의 연결, 성장에 대한 관심이 있습니다.", significance: "긍정적" },
        { condition: "도시/건물", interpretation: "사회적 환경, 구조적 지지를 중요시합니다.", significance: "관찰 필요" }
      ]
    },
    lineQuality: {
      title: "선의 특성 (Line Quality) - 에너지와 불안",
      description: "그림을 그린 선의 특성은 에너지 수준과 심리 상태를 반영합니다.",
      criteria: [
        { condition: "가늘고 희미한 선", interpretation: "낮은 에너지, 자신감 부족, 우울감이 있을 수 있습니다.", significance: "관찰 필요" },
        { condition: "적당한 굵기의 선", interpretation: "건강한 에너지 수준입니다.", significance: "긍정적" },
        { condition: "매우 진하고 강한 선", interpretation: "불안, 긴장감, 또는 강한 의지가 있습니다.", significance: "관찰 필요" },
        { condition: "떨리는/불안정한 선", interpretation: "불안, 스트레스, 신체적 긴장이 있습니다.", significance: "주의 필요" },
        { condition: "뾰족한 각진 선", interpretation: "공격성, 분노, 긴장감이 있습니다.", significance: "관찰 필요" }
      ]
    }
  }
};

// 스트레스 수준 계산을 위한 가이드
export const stressLevelGuide = {
  low: {
    range: "0-30%",
    title: "낮은 스트레스",
    description: "현재 스트레스 수준이 관리 가능한 범위입니다.",
    color: "#10b981"
  },
  moderate: {
    range: "31-60%",
    title: "중간 스트레스",
    description: "적정 수준의 스트레스가 있으며, 관리가 필요합니다.",
    color: "#f59e0b"
  },
  high: {
    range: "61-80%",
    title: "높은 스트레스",
    description: "스트레스 수준이 높아 적극적인 관리가 필요합니다.",
    color: "#f97316"
  },
  veryHigh: {
    range: "81-100%",
    title: "매우 높은 스트레스",
    description: "심각한 스트레스 상태이며, 전문적인 도움이 권장됩니다.",
    color: "#ef4444"
  }
};

// 대처 능력 수준 가이드
export const copingCapacityGuide = {
  low: {
    range: "0-30%",
    title: "낮은 대처 능력",
    description: "스트레스 대처 자원이 부족합니다. 새로운 대처 전략을 배우는 것이 도움이 됩니다.",
    color: "#ef4444"
  },
  moderate: {
    range: "31-60%",
    title: "중간 대처 능력",
    description: "기본적인 대처 능력이 있지만, 강화가 필요합니다.",
    color: "#f59e0b"
  },
  high: {
    range: "61-80%",
    title: "좋은 대처 능력",
    description: "건강한 대처 전략을 가지고 있습니다.",
    color: "#84cc16"
  },
  veryHigh: {
    range: "81-100%",
    title: "매우 좋은 대처 능력",
    description: "우수한 스트레스 대처 능력과 자원을 보유하고 있습니다.",
    color: "#10b981"
  }
};

export default pitrInterpretationGuide;
