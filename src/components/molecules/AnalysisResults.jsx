// src/components/molecules/AnalysisResults.jsx
import React from 'react';
import './AnalysisResults.css';

const AnalysisResults = ({ syntax, semantic }) => {
  return (
    <div className="analysis-results">
      {/* Análisis Sintáctico */}
      <div className="syntax-analysis">
        <h3 className="analysis-title">Análisis sintáctico</h3>
        <p className="analysis-description">
          Debe validar la estructura de la función, condicionales, llamadas recursivas y expresiones aritméticas.
        </p>
        
        <div className={`syntax-status ${syntax.valid ? 'syntax-valid' : 'syntax-invalid'}`}>
          <span className="status-icon">{syntax.valid ? '✅' : '❌'}</span>
          <span className="status-text">
            {syntax.valid ? 'Estructura sintáctica válida' : 'Error en la estructura sintáctica'}
          </span>
        </div>
        
        {syntax.errors && syntax.errors.length > 0 && (
          <div className="error-list">
            <h4>Errores encontrados:</h4>
            <ul>
              {syntax.errors.map((error, index) => (
                <li key={index} className="error-item">{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="structure-detected">
          <h4>Estructura detectada:</h4>
          <ul className="structure-list">
            {syntax.valid && (
              <>
                <li>✓ Estructura sintáctica válida</li>
                <li>✓ Análisis completado correctamente</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Análisis Semántico */}
      <div className="semantic-analysis">
        <h3 className="analysis-title">Análisis semántico</h3>
        
        <div className="semantic-checks">
          {semantic.checks.map((check, index) => (
            <div key={index} className={`semantic-check ${check.passed ? 'check-passed' : 'check-failed'}`}>
              <span className="check-icon">{check.passed ? '✅' : '❌'}</span>
              <span className="check-description">{check.description}</span>
            </div>
          ))}
        </div>

        {/* Tabla de Símbolos */}
        <div className="symbol-table">
          <h4>Tabla de Símbolos:</h4>
          <table className="symbols">
            <thead>
              <tr>
                <th>Identificador</th>
                <th>Tipo</th>
                <th>Alcance</th>
              </tr>
            </thead>
            <tbody>
              {semantic.symbolTable.map((symbol, index) => (
                <tr key={index}>
                  <td className="symbol-name">{symbol.name}</td>
                  <td className="symbol-type">{symbol.type}</td>
                  <td className="symbol-scope">
                    {symbol.type === 'function' ? 'global' : 
                     symbol.name === 'n' ? 'local (factorial)' : 'global'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Verificaciones específicas */}
        <div className="semantic-verifications">
          <h4>Verificaciones específicas:</h4>
          <div className="verification-grid">
            {semantic.checks.map((check, index) => (
              <div key={index} className="verification-item">
                <span className="verification-label">{check.description}:</span>
                <span className="verification-value">
                  {check.passed ? '✅ Correcto' : '❌ Error'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Advertencias */}
        {semantic.warnings && semantic.warnings.length > 0 && (
          <div className="warnings-section">
            <h4>⚠️ Advertencias:</h4>
            <ul className="warnings-list">
              {semantic.warnings.map((warning, index) => (
                <li key={index} className="warning-item">{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisResults;