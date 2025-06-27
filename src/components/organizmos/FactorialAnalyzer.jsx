// src/components/organisms/FactorialAnalyzer.jsx
import React, { useState } from 'react';
import Button from '../atoms/Button';
import Textarea from '../atoms/Textarea';
import TokenTable from '../molecules/TokenTable';
import AnalysisResults from '../molecules/AnalysisResults';
import './FactorialAnalyzer.css';

const FactorialAnalyzer = () => {
  const [code, setCode] = useState('');
  
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const analyzeCode = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      
      if (!response.ok) {
        throw new Error('Error en el análisis');
      }
      
      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError('Error conectando con el servidor: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="factorial-analyzer">
      {/* Header */}
      <div className="analyzer-header">
        <h1 className="main-title">
          Analizador Léxico, sintáctico y Semántico de un Factorial
        </h1>
        <p className="subtitle">
          Sistema de análisis completo para código Python
        </p>
      </div>

      {/* Main Content */}
      <div className="analyzer-content">
        {/* Editor Section */}
        <div className="editor-section">
          <div className="code-editor-container">
            <h3 className="section-title">Editor de Código</h3>
            <div className="editor-wrapper">
              <label className="input-label">
                Código Python:
              </label>
              <Textarea
                value={code}
                onChange={handleCodeChange}
                rows={12}
                placeholder="Ingresa tu código Python aquí..."
              />
            </div>
            
            <div className="action-buttons">
              <Button
                onClick={analyzeCode}
                disabled={loading}
                variant="primary"
                className="analyze-btn"
              >
                {loading ? 'Analizando...' : 'Analizar Código'}
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="error-display">
                <span className="error-icon">⚠️</span>
                <span className="error-message">{error}</span>
              </div>
            )}
          </div>

          {/* Example Code - Removed */}
        </div>

        {/* Results Section */}
        <div className="results-section">
          {analysis ? (
            <div className="analysis-container">
              {/* Análisis Léxico con tabla como PDF */}
              <TokenTable tokens={analysis.lexical.tokens} />
              
              {/* Análisis Sintáctico y Semántico */}
              <AnalysisResults 
                syntax={analysis.syntax} 
                semantic={analysis.semantic} 
              />
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <span className="no-results-icon">🔍</span>
                <h3>Sin análisis</h3>
                <p>Escribe código y presiona "Analizar" para ver los resultados</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FactorialAnalyzer;