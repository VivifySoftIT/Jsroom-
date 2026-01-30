import React, { useState } from 'react';
import { testApiConnection } from '../config/apiConfig';

const ApiTester = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState('');

  const handleTest = async () => {
    setTesting(true);
    setResult('Testing API connections...');
    
    try {
      const workingUrl = await testApiConnection();
      if (workingUrl) {
        setResult(`✅ Found working API at: ${workingUrl}`);
      } else {
        setResult('❌ No working API URL found. Check console for details.');
      }
    } catch (error) {
      setResult(`❌ Error testing API: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3>🔧 API Connection Tester</h3>
      <button onClick={handleTest} disabled={testing} style={styles.button}>
        {testing ? 'Testing...' : 'Test API Connection'}
      </button>
      {result && (
        <div style={styles.result}>
          <pre>{result}</pre>
        </div>
      )}
      <div style={styles.instructions}>
        <h4>Instructions:</h4>
        <ol>
          <li>Click "Test API Connection" to find your working API URL</li>
          <li>Check the browser console for detailed test results</li>
          <li>Update the BASE_URL in src/config/apiConfig.js with the working URL</li>
        </ol>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: '20px',
    border: '2px solid #D4AF37',
    borderRadius: '10px',
    backgroundColor: '#FAF9F7',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#D4AF37',
    color: '#1A1A1A',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
  },
  result: {
    marginTop: '15px',
    padding: '10px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    fontFamily: 'monospace',
  },
  instructions: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  }
};

export default ApiTester;