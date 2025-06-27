import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary',
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn--${variant} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;