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
      const margin = 15;
      let yPosition = margin;

      // 폰트 설정
      pdf.setFont('helvetica');

      // 제목
      pdf.setFontSize(20);
      pdf.setTextColor(79, 70, 229);
      pdf.text('스트레스 관리 - 빗속의 사람', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('PITR 심리 분석 리포트', pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 8;

      pdf.setFontSize(10);
      pdf.text(`분석일: ${new Date().toLocaleDateString('ko-KR')}`, pageWidth / 2, yPosition, { align: 'center' });
      yPosition += 15;

      // 이미지 추가
      if (imageData) {
        const imgWidth = 60;
        const imgHeight = 60;
        const imgX = (pageWidth - imgWidth) / 2;
        pdf.addImage(imageData, 'JPEG', imgX, yPosition, imgWidth, imgHeight);
        yPosition += imgHeight + 10;
      }

      // 구분선
      pdf.setDrawColor(200, 200, 200);
      pdf.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 10;

      // 종합 평가
      pdf.setFontSize(14);
      pdf.setTextColor(79, 70, 229);
      pdf.text('종합 평가', margin, yPosition);
      yPosition += 8;

      pdf.setFontSize(11);
      pdf.setTextColor(50, 50, 50);

      // 스트레스 수준
      const stressLevel = result.overallAssessment?.stressLevel;
      pdf.text(`스트레스 수준: ${stressLevel?.level || '분석 중'} (${stressLevel?.percentage || 0}%)`, margin, yPosition);
      yPosition += 6;

      // 대처 능력
      const copingCapacity = result.overallAssessment?.copingCapacity;
      pdf.text(`대처 능력: ${copingCapacity?.level || '분석 중'} (${copingCapacity?.percentage || 0}%)`, margin, yPosition);
      yPosition += 10;

      // 주요 발견
      pdf.setFontSize(12);
      pdf.setTextColor(79, 70, 229);
      pdf.text('주요 발견', margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);
      const findings = result.overallAssessment?.keyFindings || [];
      findings.forEach((finding, index) => {
        const lines = pdf.splitTextToSize(`${index + 1}. ${finding}`, pageWidth - margin * 2);
        lines.forEach(line => {
          if (yPosition > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
          }
          pdf.text(line, margin, yPosition);
          yPosition += 5;
        });
      });
      yPosition += 5;

      // 새 페이지 - 그림 분석
      pdf.addPage();
      yPosition = margin;

      pdf.setFontSize(14);
      pdf.setTextColor(79, 70, 229);
      pdf.text('그림 분석 상세', margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);

      const drawingAnalysis = result.drawingAnalysis;
      if (drawingAnalysis) {
        // 전체 개요
        const overviewLines = pdf.splitTextToSize(`개요: ${drawingAnalysis.overview}`, pageWidth - margin * 2);
        overviewLines.forEach(line => {
          pdf.text(line, margin, yPosition);
          yPosition += 5;
        });
        yPosition += 5;

        // 스트레스 지표
        pdf.setFontSize(11);
        pdf.setTextColor(79, 70, 229);
        pdf.text('스트레스 지표', margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(9);
        pdf.setTextColor(50, 50, 50);

        const stressIndicators = drawingAnalysis.stressIndicators;
        if (stressIndicators) {
          ['rain', 'clouds', 'puddles'].forEach(key => {
            const indicator = stressIndicators[key];
            if (indicator) {
              const text = `• ${key === 'rain' ? '비' : key === 'clouds' ? '구름' : '웅덩이'}: ${indicator.interpretation}`;
              const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - 5);
              lines.forEach(line => {
                if (yPosition > pageHeight - margin) {
                  pdf.addPage();
                  yPosition = margin;
                }
                pdf.text(line, margin + 3, yPosition);
                yPosition += 4.5;
              });
            }
          });
        }
        yPosition += 5;

        // 대처 자원
        pdf.setFontSize(11);
        pdf.setTextColor(79, 70, 229);
        pdf.text('대처 자원', margin, yPosition);
        yPosition += 6;

        pdf.setFontSize(9);
        pdf.setTextColor(50, 50, 50);

        const resourceIndicators = drawingAnalysis.resourceIndicators;
        if (resourceIndicators) {
          ['umbrella', 'clothing', 'shelter'].forEach(key => {
            const indicator = resourceIndicators[key];
            if (indicator) {
              const text = `• ${key === 'umbrella' ? '우산' : key === 'clothing' ? '옷' : '피난처'}: ${indicator.interpretation}`;
              const lines = pdf.splitTextToSize(text, pageWidth - margin * 2 - 5);
              lines.forEach(line => {
                if (yPosition > pageHeight - margin) {
                  pdf.addPage();
                  yPosition = margin;
                }
                pdf.text(line, margin + 3, yPosition);
                yPosition += 4.5;
              });
            }
          });
        }
      }

      // 새 페이지 - 권장사항
      pdf.addPage();
      yPosition = margin;

      pdf.setFontSize(14);
      pdf.setTextColor(79, 70, 229);
      pdf.text('맞춤 스트레스 관리 권장사항', margin, yPosition);
      yPosition += 10;

      const recommendations = result.recommendations;
      if (recommendations) {
        const sections = [
          { title: '즉시 실천', items: recommendations.immediate },
          { title: '단기 목표', items: recommendations.shortTerm },
          { title: '장기 목표', items: recommendations.longTerm }
        ];

        sections.forEach(section => {
          if (yPosition > pageHeight - 30) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.setFontSize(11);
          pdf.setTextColor(79, 70, 229);
          pdf.text(section.title, margin, yPosition);
          yPosition += 6;

          pdf.setFontSize(9);
          pdf.setTextColor(50, 50, 50);

          (section.items || []).forEach((item, index) => {
            const lines = pdf.splitTextToSize(`${index + 1}. ${item}`, pageWidth - margin * 2 - 5);
            lines.forEach(line => {
              if (yPosition > pageHeight - margin) {
                pdf.addPage();
                yPosition = margin;
              }
              pdf.text(line, margin + 3, yPosition);
              yPosition += 4.5;
            });
          });
          yPosition += 5;
        });
      }

      // 개인화된 메시지
      yPosition += 5;
      if (yPosition > pageHeight - 40) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFontSize(11);
      pdf.setTextColor(79, 70, 229);
      pdf.text('당신에게 전하는 메시지', margin, yPosition);
      yPosition += 7;

      pdf.setFontSize(10);
      pdf.setTextColor(50, 50, 50);
      const messageLines = pdf.splitTextToSize(result.personalizedMessage || '', pageWidth - margin * 2);
      messageLines.forEach(line => {
        if (yPosition > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += 5;
      });

      // 푸터
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `PITR 심리 분석 리포트 | 페이지 ${i}/${totalPages}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        );
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
