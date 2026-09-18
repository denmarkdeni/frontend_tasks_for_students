import { useState, useEffect } from 'react';

function Task7() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      {/* Green Date Block */}
      <span style={styles.dateBlock}>
        {dateTime.toLocaleDateString()}
      </span>
      
      {/* Orange Time Block */}
      <span style={styles.timeBlock}>
        {dateTime.toLocaleTimeString()}
      </span>
    </div>
  );
}

// Simple layout with vibrant, colorful parts
const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    backgroundColor: '#f8fafc'
  },
  dateBlock: {
    color: '#10b981', // Emerald Green
    backgroundColor: '#ecfdf5',
    padding: '10px 20px',
    borderRadius: '8px'
  },
  timeBlock: {
    color: '#f97316', // Bright Orange
    backgroundColor: '#fff7ed',
    padding: '10px 20px',
    borderRadius: '8px',
    fontFamily: 'monospace' // Keeps digits from shifting
  }
};

export default Task7;
