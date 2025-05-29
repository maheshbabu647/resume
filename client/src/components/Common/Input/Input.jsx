import React from 'react';

const Input = ({
  label,
  id,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error = null,
  required = false,
  className = '',
  inputClassName = '',
  helperText,
  ...props
}) => {
  const inputClasses = `
    w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
    focus:ring-1 focus:ring-blue-500 focus:border-blue-500
    ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
    ${inputClassName}
  `.trim();

  const InputElement = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-600">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </label>
      )}
      <InputElement
        type={type === 'textarea' ? undefined : type}
        id={id}
        name={name || id}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
        {...props}
      />
      {helperText && !error && (
        <small id={`${id}-helper`} className="text-sm text-gray-500">
          {helperText}
        </small>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;