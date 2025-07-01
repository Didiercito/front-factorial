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
          Validación de la estructura del código Python: funciones, condicionales y sintaxis general.
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
                <li>✓ Definiciones de función válidas</li>
                <li>✓ Estructuras condicionales correctas</li>
                <li>✓ Paréntesis balanceados</li>
                <li>✓ Sintaxis Python válida</li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Análisis Semántico */}
      <div className="semantic-analysis">
        <h3 className="analysis-title">Análisis semántico</h3>
        
        {/* Errores Semánticos */}
        {semantic.checks && semantic.checks.length > 0 && (
          <div className="semantic-errors">
            <h4>Errores semánticos encontrados:</h4>
            <div className="error-list">
              {semantic.checks.map((error, index) => (
                <div key={index} className="semantic-error-item">
                  <span className="error-icon">❌</span>
                  <span className="error-message">{error.message || error}</span>
                </div>
              ))}
            </div>
          </div>
        )}

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
              {semantic.symbolTable && semantic.symbolTable.length > 0 ? (
                semantic.symbolTable.map((symbol, index) => (
                  <tr key={index}>
                    <td className="symbol-name">{symbol.name}</td>
                    <td className="symbol-type">{symbol.type}</td>
                    <td className="symbol-scope">{symbol.scope || 'global'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="no-symbols">No hay símbolos detectados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Estadísticas de Variables y Funciones */}
        <div className="semantic-stats">
          <h4>Estadísticas del análisis:</h4>
          <div className="stats-grid">
            {semantic.symbolTable && semantic.symbolTable.map((item, index) => (
              <div key={index} className="stat-item">
                <span className="stat-label">{item.name}:</span>
                <span className="stat-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del análisis */}
        <div className="semantic-summary">
          <h4>Resumen del análisis semántico:</h4>
          <div className="summary-content">
            {semantic.checks && semantic.checks.length > 0 ? (
              <div className="summary-item error">
                <span className="summary-icon">⚠️</span>
                <span className="summary-text">
                  Se encontraron {semantic.checks.length} errores semánticos. 
                  Principalmente variables usadas sin declaración previa.
                </span>
              </div>
            ) : (
              <div className="summary-item success">
                <span className="summary-icon">✅</span>
                <span className="summary-text">No se encontraron errores semánticos.</span>
              </div>
            )}
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