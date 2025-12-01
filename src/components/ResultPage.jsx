import { useState, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { stressManagementSolutions } from '../data/questions';
import styles from './ResultPage.module.css';

export default function ResultPage({ result, imageData }) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const resultRef = useRef(null);

  const getStressColor = (level) => {
    switch (level) {
      case '낮음': return '#10b981';
      case '중간': return '#f59e0b';
      case '높음': return '#f97316';
      case '매우 높음': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getCopingColor = (level) => {
    switch (level) {
      case '낮음': return '#ef4444';
      case '중간': return '#f59e0b';
      case '높음': return '#84cc16';
      case '매우 높음': return '#10b981';
      default: return '#6b7280';
    }
  };

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;

      // PDF용 임시 컨테이너 생성
      const pdfContainer = document.createElement('div');
      pdfContainer.style.cssText = `
        position: absolute;
        left: -9999px;
        top: 0;
        width: 800px;
        background: white;
        padding: 40px;
        font-family: 'Noto Sans KR', sans-serif;
        color: #1a1a2e;
      `;

      // PDF 컨텐츠 HTML 생성
      pdfContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #4f46e5; font-size: 28px; margin-bottom: 8px;">스트레스 관리 - 빗속의 사람</h1>
          <p style="color: #6b7280; font-size: 14px;">PITR 심리 분석 리포트</p>
          <p style="color: #9ca3af; font-size: 12px;">분석일: ${new Date().toLocaleDateString('ko-KR')}</p>
        </div>

        ${imageData ? `
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="${imageData}" style="max-width: 200px; max-height: 200px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
          </div>
        ` : ''}

        <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-bottom: 25px;">
          <h2 style="color: #4f46e5; font-size: 20px; margin-bottom: 15px;">📊 종합 평가</h2>
          <div style="display: flex; gap: 40px; margin-bottom: 20px;">
            <div style="flex: 1; background: #f8fafc; padding: 15px; border-radius: 10px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin-bottom: 5px;">스트레스 수준</p>
              <p style="font-size: 24px; font-weight: bold; color: ${getStressColor(result.overallAssessment?.stressLevel?.level)};">
                ${result.overallAssessment?.stressLevel?.percentage || 0}%
              </p>
              <p style="font-size: 14px; color: ${getStressColor(result.overallAssessment?.stressLevel?.level)};">
                ${result.overallAssessment?.stressLevel?.level || '분석 중'}
              </p>
            </div>
            <div style="flex: 1; background: #f8fafc; padding: 15px; border-radius: 10px; text-align: center;">
              <p style="color: #6b7280; font-size: 12px; margin-bottom: 5px;">대처 능력</p>
              <p style="font-size: 24px; font-weight: bold; color: ${getCopingColor(result.overallAssessment?.copingCapacity?.level)};">
                ${result.overallAssessment?.copingCapacity?.percentage || 0}%
              </p>
              <p style="font-size: 14px; color: ${getCopingColor(result.overallAssessment?.copingCapacity?.level)};">
                ${result.overallAssessment?.copingCapacity?.level || '분석 중'}
              </p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: #4f46e5; font-size: 18px; margin-bottom: 12px;">💡 주요 발견</h2>
          <ul style="list-style: none; padding: 0;">
            ${(result.overallAssessment?.keyFindings || []).map((finding, i) => `
              <li style="display: flex; gap: 10px; margin-bottom: 8px; font-size: 14px; line-height: 1.6;">
                <span style="background: #4f46e5; color: white; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; flex-shrink: 0;">${i + 1}</span>
                <span>${finding}</span>
              </li>
            `).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: #4f46e5; font-size: 18px; margin-bottom: 12px;">🎨 그림 분석</h2>
          <p style="font-size: 14px; line-height: 1.7; color: #4a4a6a; margin-bottom: 15px;">
            ${result.drawingAnalysis?.overview || ''}
          </p>

          <h3 style="color: #6366f1; font-size: 15px; margin-bottom: 10px;">스트레스 지표</h3>
          <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            ${result.drawingAnalysis?.stressIndicators ? `
              <p style="font-size: 13px; margin-bottom: 8px;"><strong>비:</strong> ${result.drawingAnalysis.stressIndicators.rain?.interpretation || '-'}</p>
              <p style="font-size: 13px; margin-bottom: 8px;"><strong>구름:</strong> ${result.drawingAnalysis.stressIndicators.clouds?.interpretation || '-'}</p>
              <p style="font-size: 13px;"><strong>웅덩이:</strong> ${result.drawingAnalysis.stressIndicators.puddles?.interpretation || '-'}</p>
            ` : ''}
          </div>

          <h3 style="color: #6366f1; font-size: 15px; margin-bottom: 10px;">대처 자원</h3>
          <div style="background: #f8fafc; padding: 15px; border-radius: 10px; margin-bottom: 15px;">
            ${result.drawingAnalysis?.resourceIndicators ? `
              <p style="font-size: 13px; margin-bottom: 8px;"><strong>우산:</strong> ${result.drawingAnalysis.resourceIndicators.umbrella?.interpretation || '-'}</p>
              <p style="font-size: 13px; margin-bottom: 8px;"><strong>옷:</strong> ${result.drawingAnalysis.resourceIndicators.clothing?.interpretation || '-'}</p>
              <p style="font-size: 13px;"><strong>피난처:</strong> ${result.drawingAnalysis.resourceIndicators.shelter?.interpretation || '-'}</p>
            ` : ''}
          </div>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: #4f46e5; font-size: 18px; margin-bottom: 12px;">🧠 심리 프로필</h2>
          <div style="display: flex; gap: 20px; margin-bottom: 15px;">
            <div style="flex: 1; background: #ecfdf5; padding: 15px; border-radius: 10px;">
              <h4 style="color: #10b981; font-size: 14px; margin-bottom: 8px;">강점</h4>
              <ul style="font-size: 13px; padding-left: 20px; margin: 0;">
                ${(result.psychologicalProfile?.strengths || []).map(s => `<li style="margin-bottom: 4px;">${s}</li>`).join('')}
              </ul>
            </div>
            <div style="flex: 1; background: #fef3c7; padding: 15px; border-radius: 10px;">
              <h4 style="color: #f59e0b; font-size: 14px; margin-bottom: 8px;">도전 과제</h4>
              <ul style="font-size: 13px; padding-left: 20px; margin: 0;">
                ${(result.psychologicalProfile?.challenges || []).map(c => `<li style="margin-bottom: 4px;">${c}</li>`).join('')}
              </ul>
            </div>
          </div>
          <p style="font-size: 13px; color: #4a4a6a;"><strong>대처 스타일:</strong> ${result.psychologicalProfile?.copingStyle || ''}</p>
        </div>

        <div style="margin-bottom: 25px;">
          <h2 style="color: #4f46e5; font-size: 18px; margin-bottom: 12px;">✨ 맞춤 권장사항</h2>

          <h3 style="color: #6366f1; font-size: 14px; margin-bottom: 8px;">⚡ 즉시 실천</h3>
          <ul style="font-size: 13px; padding-left: 20px; margin-bottom: 15px;">
            ${(result.recommendations?.immediate || []).map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
          </ul>

          <h3 style="color: #6366f1; font-size: 14px; margin-bottom: 8px;">📅 단기 목표</h3>
          <ul style="font-size: 13px; padding-left: 20px; margin-bottom: 15px;">
            ${(result.recommendations?.shortTerm || []).map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
          </ul>

          <h3 style="color: #6366f1; font-size: 14px; margin-bottom: 8px;">🎯 장기 목표</h3>
          <ul style="font-size: 13px; padding-left: 20px; margin-bottom: 15px;">
            ${(result.recommendations?.longTerm || []).map(r => `<li style="margin-bottom: 4px;">${r}</li>`).join('')}
          </ul>
        </div>

        <div style="background: linear-gradient(135deg, #ede9fe, #e0e7ff); padding: 20px; border-radius: 12px; margin-bottom: 20px;">
          <h2 style="color: #4f46e5; font-size: 16px; margin-bottom: 10px;">💌 당신에게 전하는 메시지</h2>
          <p style="font-size: 14px; line-height: 1.8; color: #1a1a2e; font-style: italic;">
            ${result.personalizedMessage || ''}
          </p>
        </div>

        <div style="text-align: center; color: #9ca3af; font-size: 11px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          PITR(Person in the Rain) 심리 분석 리포트 | 스트레스 관리 - 빗속의 사람
        </div>
      `;

      document.body.appendChild(pdfContainer);

      // html2canvas로 이미지 캡처
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      document.body.removeChild(pdfContainer);

      // 캔버스를 PDF에 추가
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      // 첫 페이지
      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - margin * 2);

      // 추가 페이지가 필요한 경우
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= (pageHeight - margin * 2);
      }

      // PDF 저장
      pdf.save(`스트레스분석_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('PDF 생성 중 오류가 발생했습니다.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const tabs = [
    { id: 'overview', label: '종합', icon: '📊' },
    { id: 'drawing', label: '그림분석', icon: '🎨' },
    { id: 'solutions', label: '솔루션', icon: '💡' }
  ];

  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.tabIcon}>{tab.icon}</span>
            <span className={styles.tabLabel}>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent} ref={resultRef}>
        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            {/* Score Cards */}
            <div className={styles.scoreCards}>
              <div className={styles.scoreCard}>
                <div className={styles.scoreLabel}>스트레스 수준</div>
                <div
                  className={styles.scoreCircle}
                  style={{
                    background: `conic-gradient(${getStressColor(result.overallAssessment?.stressLevel?.level)} ${result.overallAssessment?.stressLevel?.percentage || 0}%, var(--glass-bg) 0%)`
                  }}
                >
                  <div className={styles.scoreInner}>
                    <span className={styles.scoreValue}>
                      {result.overallAssessment?.stressLevel?.percentage || 0}%
                    </span>
                    <span className={styles.scoreLevel} style={{ color: getStressColor(result.overallAssessment?.stressLevel?.level) }}>
                      {result.overallAssessment?.stressLevel?.level || '분석 중'}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.scoreCard}>
                <div className={styles.scoreLabel}>대처 능력</div>
                <div
                  className={styles.scoreCircle}
                  style={{
                    background: `conic-gradient(${getCopingColor(result.overallAssessment?.copingCapacity?.level)} ${result.overallAssessment?.copingCapacity?.percentage || 0}%, var(--glass-bg) 0%)`
                  }}
                >
                  <div className={styles.scoreInner}>
                    <span className={styles.scoreValue}>
                      {result.overallAssessment?.copingCapacity?.percentage || 0}%
                    </span>
                    <span className={styles.scoreLevel} style={{ color: getCopingColor(result.overallAssessment?.copingCapacity?.level) }}>
                      {result.overallAssessment?.copingCapacity?.level || '분석 중'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Findings */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128161;</span> 주요 발견
              </h3>
              <ul className={styles.findingsList}>
                {(result.overallAssessment?.keyFindings || []).map((finding, index) => (
                  <li key={index} className={styles.findingItem}>
                    <span className={styles.findingNumber}>{index + 1}</span>
                    <span>{finding}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Psychological Profile */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#129504;</span> 심리 프로필
              </h3>
              <div className={styles.profileGrid}>
                <div className={styles.profileItem}>
                  <h4 className={styles.profileLabel}>강점</h4>
                  <ul className={styles.profileList}>
                    {(result.psychologicalProfile?.strengths || []).map((item, i) => (
                      <li key={i}>&#10003; {item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.profileItem}>
                  <h4 className={styles.profileLabel}>도전 과제</h4>
                  <ul className={styles.profileList}>
                    {(result.psychologicalProfile?.challenges || []).map((item, i) => (
                      <li key={i}>&#9888; {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.copingStyle}>
                <strong>대처 스타일:</strong> {result.psychologicalProfile?.copingStyle}
              </div>
            </div>

            {/* Personal Message */}
            <div className={`glass-card ${styles.messageCard}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128140;</span> 당신에게 전하는 메시지
              </h3>
              <p className={styles.message}>{result.personalizedMessage}</p>
            </div>
          </div>
        )}

        {activeTab === 'drawing' && (
          <div className={styles.drawingTab}>
            {/* Uploaded Image */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128444;</span> 업로드된 그림
              </h3>
              <div className={styles.imageContainer}>
                <img src={imageData} alt="분석된 그림" className={styles.analyzedImage} />
              </div>
            </div>

            {/* Overview */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128065;</span> 전체 분석
              </h3>
              <p className={styles.overview}>{result.drawingAnalysis?.overview}</p>
            </div>

            {/* Stress Indicators */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#127783;</span> 스트레스 지표
              </h3>
              <div className={styles.indicatorList}>
                {result.drawingAnalysis?.stressIndicators && (
                  <>
                    <IndicatorItem
                      title="비 (Rain)"
                      icon="&#127783;"
                      data={result.drawingAnalysis.stressIndicators.rain}
                    />
                    <IndicatorItem
                      title="구름 (Clouds)"
                      icon="&#9729;"
                      data={result.drawingAnalysis.stressIndicators.clouds}
                    />
                    <IndicatorItem
                      title="웅덩이 (Puddles)"
                      icon="&#128167;"
                      data={result.drawingAnalysis.stressIndicators.puddles}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Resource Indicators */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128737;</span> 대처 자원
              </h3>
              <div className={styles.indicatorList}>
                {result.drawingAnalysis?.resourceIndicators && (
                  <>
                    <IndicatorItem
                      title="우산 (Umbrella)"
                      icon="&#9748;"
                      data={result.drawingAnalysis.resourceIndicators.umbrella}
                    />
                    <IndicatorItem
                      title="옷/비옷 (Clothing)"
                      icon="&#129509;"
                      data={result.drawingAnalysis.resourceIndicators.clothing}
                    />
                    <IndicatorItem
                      title="피난처 (Shelter)"
                      icon="&#127968;"
                      data={result.drawingAnalysis.resourceIndicators.shelter}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Figure Analysis */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128100;</span> 인물 분석
              </h3>
              <div className={styles.figureGrid}>
                {result.drawingAnalysis?.figureAnalysis && (
                  <>
                    <FigureItem label="크기" value={result.drawingAnalysis.figureAnalysis.size} />
                    <FigureItem label="위치" value={result.drawingAnalysis.figureAnalysis.position} />
                    <FigureItem label="표정" value={result.drawingAnalysis.figureAnalysis.expression} />
                    <FigureItem label="자세" value={result.drawingAnalysis.figureAnalysis.posture} />
                    <FigureItem label="행동" value={result.drawingAnalysis.figureAnalysis.action} />
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'solutions' && (
          <div className={styles.solutionsTab}>
            {/* Recommendations */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#9889;</span> 즉시 실천
              </h3>
              <ul className={styles.recommendList}>
                {(result.recommendations?.immediate || []).map((item, i) => (
                  <li key={i} className={styles.recommendItem}>
                    <span className={styles.recommendIcon}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128197;</span> 단기 목표
              </h3>
              <ul className={styles.recommendList}>
                {(result.recommendations?.shortTerm || []).map((item, i) => (
                  <li key={i} className={styles.recommendItem}>
                    <span className={styles.recommendIcon}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#127919;</span> 장기 목표
              </h3>
              <ul className={styles.recommendList}>
                {(result.recommendations?.longTerm || []).map((item, i) => (
                  <li key={i} className={styles.recommendItem}>
                    <span className={styles.recommendIcon}>&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Professional Help */}
            {result.recommendations?.professional && (
              <div className={`glass-card ${styles.section} ${styles.professionalSection}`}>
                <h3 className={styles.sectionTitle}>
                  <span>&#129658;</span> 전문적 도움
                </h3>
                <p className={styles.professionalText}>{result.recommendations.professional}</p>
              </div>
            )}

            {/* Quick Techniques */}
            <div className={`glass-card ${styles.section}`}>
              <h3 className={styles.sectionTitle}>
                <span>&#128161;</span> 즉각적인 스트레스 해소법
              </h3>
              <div className={styles.techniqueList}>
                {stressManagementSolutions.immediate.solutions.map((solution, i) => (
                  <div key={i} className={styles.techniqueItem}>
                    <h4 className={styles.techniqueName}>{solution.name}</h4>
                    <p className={styles.techniqueDesc}>{solution.description}</p>
                    <span className={styles.techniqueBenefit}>
                      &#10024; {solution.benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Download Button */}
      <button
        className={styles.downloadButton}
        onClick={handleDownloadPDF}
        disabled={isGeneratingPDF}
      >
        {isGeneratingPDF ? (
          <>
            <span className={styles.spinner}></span>
            PDF 생성 중...
          </>
        ) : (
          <>
            <span className={styles.downloadIcon}>&#128196;</span>
            분석 결과 PDF 다운로드
          </>
        )}
      </button>
    </div>
  );
}

// Helper Components
function IndicatorItem({ title, icon, data }) {
  if (!data) return null;
  return (
    <div className={styles.indicatorItem}>
      <div className={styles.indicatorHeader}>
        <span className={styles.indicatorIcon}>{icon}</span>
        <span className={styles.indicatorTitle}>{title}</span>
      </div>
      <div className={styles.indicatorContent}>
        <p className={styles.observed}><strong>관찰:</strong> {data.observed}</p>
        <p className={styles.interpretation}><strong>해석:</strong> {data.interpretation}</p>
      </div>
    </div>
  );
}

function FigureItem({ label, value }) {
  return (
    <div className={styles.figureItem}>
      <span className={styles.figureLabel}>{label}</span>
      <span className={styles.figureValue}>{value}</span>
    </div>
  );
}
