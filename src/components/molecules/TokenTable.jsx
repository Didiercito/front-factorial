import './TokenTable.css';

const TokenTable = ({ tokens }) => {
  const stats = tokens.reduce((acc, token) => {
    acc[token.type] = (acc[token.type] || 0) + 1;
    return acc;
  }, {});

  const categories = {
    'PR': tokens.filter(t => t.type === 'KEYWORD').length,
    'ID': tokens.filter(t => t.type === 'IDENTIFIER').length,
    'Números': tokens.filter(t => t.type === 'NUMBER').length,
    'Símbolos': tokens.filter(t => ['SYMBOL', 'OPERATOR'].includes(t.type)).length,
    'Error': 0 
  };

  const totalTokens = tokens.length;

  return (
    <div className="token-analysis">
      <div className="analysis-header">
        <h3>Analizador Léxico, si tiene la siguiente estructura</h3>
      </div>

      <div className="code-display">
        <pre className="code-content">
{`def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

x = 5
print("El factorial de", x, "es", factorial(x))`}
        </pre>
      </div>

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
    </div>
  );
};

export default TokenTable;