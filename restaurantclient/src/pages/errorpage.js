import React, { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    document.title = "404 Not Found";
    
    // Cleanup function
    return () => {
      document.title = "My App"; // Reset to your default title
    };
  }, []);

  // Styles
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
      fontFamily: '"Poppins", sans-serif',
    },
    content: {
      textAlign: 'center',
      zIndex: 2,
      maxWidth: '600px',
    },
    animated404: {
      fontSize: '8rem',
      marginBottom: '1rem',
      background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      textShadow: '0 0 10px rgba(106, 17, 203, 0.3)',
      animation: 'pulse 3s ease-in-out infinite',
    },
    title: {
      fontSize: '2rem',
      marginBottom: '1rem',
      animation: 'float 6s ease-in-out infinite',
    },
    description: {
      fontSize: '1.2rem',
      marginBottom: '2rem',
      opacity: 0.8,
    },
    homeButton: {
      display: 'inline-block',
      padding: '12px 30px',
      background: 'linear-gradient(45deg, #6a11cb, #2575fc)',
      color: 'white',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: 600,
      transition: 'all 0.3s ease',
      animation: 'glow 2s ease-in-out infinite',
    },
    floatingElement: {
      position: 'absolute',
      width: '20px',
      height: '20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      animation: 'float 10s ease-in-out infinite',
    },
    glowingOrb: {
      position: 'absolute',
      width: '300px',
      height: '300px',
      background: 'radial-gradient(circle, rgba(106, 17, 203, 0.2) 0%, rgba(37, 117, 252, 0) 70%)',
      borderRadius: '50%',
      filter: 'blur(30px)',
      zIndex: 1,
      animation: 'float 8s ease-in-out infinite',
    },
    floatingElements: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 0,
    },
  };

  // Keyframes as style tag
  const keyframesStyle = `
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    @keyframes pulse {
      0% { transform: scale(1); opacity: 0.8; }
      50% { transform: scale(1.05); opacity: 1; }
      100% { transform: scale(1); opacity: 0.8; }
    }
    @keyframes glow {
      0% { box-shadow: 0 0 20px rgba(100, 100, 255, 0.3); }
      50% { box-shadow: 0 0 40px rgba(100, 100, 255, 0.6); }
      100% { box-shadow: 0 0 20px rgba(100, 100, 255, 0.3); }
    }
  `;

  return (
    <div style={styles.container}>
      {/* Inject keyframes */}
      <style>{keyframesStyle}</style>
      
      {/* Glowing orb */}
      <div style={styles.glowingOrb}></div>
      
      {/* Main content */}
      <div style={styles.content}>
        <h1 style={styles.animated404}>404</h1>
        <h2 style={styles.title}>Oops! Page Not Found</h2>
        <p style={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <a href="/" style={styles.homeButton}>Go Back Home</a>
      </div>
      
      {/* Floating elements */}
      <div style={styles.floatingElements}>
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            style={{
              ...styles.floatingElement,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
              transform: `scale(${Math.random() * 0.5 + 0.5})`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFoundPage;