import './Textarea.css';

const Textarea = ({ 
  value, 
  onChange, 
  placeholder = '', 
  rows = 4,
  className = ''
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`textarea ${className}`}
    />
  );
};

export default Textarea;