import { useState, useRef } from 'react';
import styles from './ImageUploadPage.module.css';

export default function ImageUploadPage({ onNext, onImageUpload }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (preview) {
      onImageUpload(preview);
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={`glass-card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <span className={styles.headerIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
          </span>
          <h2 className={styles.cardTitle}>그림 업로드</h2>
        </div>

        <p className={styles.description}>
          완성된 '빗속의 사람' 그림을 촬영하여 업로드해주세요.
        </p>

        {!preview ? (
          <div
            className={`${styles.uploadArea} ${isDragging ? styles.dragging : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleInputChange}
              className={styles.fileInput}
            />
            <div className={styles.uploadIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17,8 12,3 7,8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className={styles.uploadText}>
              <span className={styles.uploadHighlight}>사진 촬영</span> 또는{' '}
              <span className={styles.uploadHighlight}>갤러리에서 선택</span>
            </p>
            <p className={styles.uploadHint}>
              JPG, PNG 형식 지원
            </p>
          </div>
        ) : (
          <div className={styles.previewArea}>
            <img src={preview} alt="업로드된 그림" className={styles.previewImage} />
            <button className={styles.removeButton} onClick={handleRemoveImage}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        <div className={styles.tips}>
          <h4 className={styles.tipsTitle}>
            <span className={styles.emoji}>&#128248;</span>
            촬영 팁
          </h4>
          <ul className={styles.tipsList}>
            <li>밝은 곳에서 촬영해주세요</li>
            <li>그림 전체가 잘 보이도록 촬영해주세요</li>
            <li>가능한 정면에서 촬영해주세요</li>
            <li>그림자가 지지 않도록 주의해주세요</li>
          </ul>
        </div>
      </div>

      <button
        className={`${styles.nextButton} ${!preview ? styles.disabled : ''}`}
        onClick={handleNext}
        disabled={!preview}
      >
        <span className={styles.buttonIcon}>&#10003;</span>
        다음 단계로
        <span className={styles.arrow}>&rarr;</span>
      </button>
    </div>
  );
}
