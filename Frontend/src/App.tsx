import React from 'react';

const App: React.FC = () => {
  const lineStyle = {
    borderTop: '2px solid black',
    width: '100%',
    margin: '0'
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    padding: '0',
    margin: '0'
  };

  const contentStyle = {
    flex: 1,
    padding: '20px'
  };

  return (
    <div style={containerStyle}>
      <hr style={lineStyle} />
      
      <div style={contentStyle}>
        <h1>Welcome to My App</h1>
      </div>

      <hr style={lineStyle} />
    </div>
  );
};

export default App;
