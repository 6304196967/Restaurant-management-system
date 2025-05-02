import React, { useState, useEffect } from 'react';
import '../../styles/RoyalFeastLoader.css';

const RoyalFeastLoader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const loadInterval = setInterval(() => {
      setProgress(prev => {
        const increment = prev < 30 ? 2 : prev < 70 ? 1.5 : 0.8;
        const newProgress = Math.min(prev + increment, 100);
        
        if (newProgress > 30 && phase === 0) setPhase(1);
        if (newProgress > 70 && phase === 1) setPhase(2);
        if (newProgress >= 100) clearInterval(loadInterval);
        
        return newProgress;
      });
    }, 50);

    return () => clearInterval(loadInterval);
  }, [phase]);

  return (
    <div className="royal-feast-loader">
      <div className="luxury-background"></div>
      
      <div className="title-animation">
        <div className="royal-text">ROYAL</div>
        <div className="feast-text">FEAST</div>
        <div className="title-decoration"></div>
      </div>
      
      <div className="progress-container">
        <div className="progress-track">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-percent">{Math.round(progress)}%</div>
      </div>
      
      <div className="phase-indicator">
        {phase === 0 && "Preparing your culinary journey..."}
        {phase === 1 && "Selecting premium ingredients..."}
        {phase === 2 && "Adding final touches..."}
      </div>
      
      <div className="floating-elements">
        <div className="floating-gold"></div>
        <div className="floating-silver"></div>
        <div className="floating-gem"></div>
      </div>
    </div>
  );
};

export default RoyalFeastLoader;