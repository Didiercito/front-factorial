// src/components/molecules/TokenTable.jsx
import React from 'react';
import './TokenTable.css';

const TokenTable = ({ tokens, originalCode }) => {
  if (!tokens || tokens.length === 0) {
    return (
      <div className="token-analysis">
        <div className="analysis-header">
          <h3>Analizador Léxico</h3>
        </div>
        <div className="no-tokens">
          <p>No hay tokens para analizar. Ingresa código para comenzar.</p>
        </div>
      </div>
    );
  }

  // Contar tokens por tipo
  const categories = {
    'PR': tokens.filter(t => t.type === 'KEYWORD').length,
    'ID': tokens.filter(t => t.type === 'IDENTIFIER').length,
    'Números': tokens.filter(t => t.type === 'NUMBER').length,
    'Símbolos': tokens.filter(t => ['SYMBOL', 'OPERATOR'].includes(t.type)).length,
    'Error': tokens.filter(t => t.type === 'ERROR').length || 0
  };

  const totalTokens = tokens.length;

  return (
    <div className="token-analysis">
      <div className="analysis-header">
        <h3>Analizador Léxico</h3>
      </div>

      {/* Código analizado */}
      {originalCode && (
        <div className="code-display">
          <pre className="code-content">{originalCode}</pre>
        </div>
      )}

      {/* Tabla de análisis como en el PDF */}
      <div className="analysis-table-container">
        <table className="analysis-table">
          <thead>
            <tr className="table-header">
              <th>Tokens</th>
              <th>PR</th>
              <th>ID</th>
              <th>Números</th>
              <th>Símbolos</th>
              <th>Error</th>
            </tr>
          </thead>
          <tbody>
            <tr className="inicio-row">
              <td className="inicio-cell">inicio</td>
              <td className="count-cell">{categories.PR}</td>
              <td className="count-cell">{categories.ID}</td>
              <td className="count-cell">{categories.Números}</td>
              <td className="count-cell">{categories.Símbolos}</td>
              <td className="count-cell error-cell">{categories.Error}</td>
            </tr>
            <tr className="total-row">
              <td><strong>Total</strong></td>
              <td className="total-pr">{categories.PR}</td>
              <td className="total-id">{categories.ID}</td>
              <td className="total-num">{categories.Números}</td>
              <td className="total-sym">{categories.Símbolos}</td>
              <td className="total-err">{categories.Error}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="total-tokens">
          Total de tokens analizados: {totalTokens}
        </div>
      </div>

      {/* Lista detallada de tokens */}
      <div className="detailed-tokens">
        <h4>Detalle de Tokens:</h4>
        <div className="tokens-grid">
          {tokens.map((token, index) => (
            <div key={index} className={`token-item token-${token.type.toLowerCase()}`}>
              <span className="token-value">{token.value}</span>
              <span className="token-type">{token.type}</span>
              <span className="token-line">L{token.line}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Estadísticas adicionales */}
      <div className="token-stats">
        <h4>Estadísticas:</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Keywords:</span>
            <span className="stat-value">{categories.PR}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Identificadores:</span>
            <span className="stat-value">{categories.ID}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Números:</span>
            <span className="stat-value">{categories.Números}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Símbolos/Operadores:</span>
            <span className="stat-value">{categories.Símbolos}</span>
          </div>
          {categories.Error > 0 && (
            <div className="stat-item error">
              <span className="stat-label">Errores:</span>
              <span className="stat-value">{categories.Error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenTable;